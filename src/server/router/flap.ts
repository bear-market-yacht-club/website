import { createRouter } from "./context";
import { flapValidator, getByTwitterValidator } from "../../types/validators";

export const flap = createRouter()
  .mutation("setScore", {
    input: flapValidator,
    async resolve({ input, ctx }) {
      const user = await ctx.prisma.flappy_bear.findFirst({
        where: {
          twitter_handle: {
            equals: input.twitter_handle,
            mode: "insensitive",
          },
        },
      });

      if (
        user?.game_started &&
        Date.now() - user.game_started.getTime() >= (input.highscore - 1) * 1700
      ) {
        await ctx.prisma.flappy_bear.upsert({
          create: {
            twitter_handle: input.twitter_handle,
            highscore: input.highscore,
          },
          update: {
            highscore: input.highscore,
          },
          where: { twitter_handle: user.twitter_handle },
        });
      }
    },
  })
  .mutation("startGame", {
    input: getByTwitterValidator,
    async resolve({ input, ctx }) {
      const user = await ctx.prisma.flappy_bear.findFirst({
        where: {
          OR: [
            {
              twitter_handle: {
                equals: input.twitterHandle,
                mode: "insensitive",
              },
            },
            {
              twitter_handle: {
                equals: `@${input.twitterHandle}`,
                mode: "insensitive",
              },
            },
          ],
        },
      });

      await ctx.prisma.flappy_bear.upsert({
        create: {
          twitter_handle: input.twitterHandle,
          highscore: 0,
          game_started: new Date(),
        },
        update: {
          twitter_handle: input.twitterHandle,
          game_started: new Date(),
        },
        where: {
          twitter_handle: user?.twitter_handle || input.twitterHandle,
        },
      });
    },
  })
  .mutation("endGame", {
    input: getByTwitterValidator,
    async resolve({ input, ctx }) {
      const time_played =
        Date.now() -
        (await ctx.prisma.flappy_bear.findFirst({
          select: { game_started: true },
          where: { twitter_handle: input.twitterHandle },
        }))!.game_started!.getTime();
      await ctx.prisma.$executeRaw`
        UPDATE flappy_bear
        SET time_played = time_played + ${time_played} , game_started = null
        WHERE twitter_handle = ${input.twitterHandle}
      `;
    },
  })
  .query("getHighscore", {
    input: getByTwitterValidator,
    async resolve({ input, ctx }) {
      const res = await ctx.prisma.flappy_bear.findFirst({
        where: {
          OR: [
            {
              twitter_handle: {
                equals: input.twitterHandle,
                mode: "insensitive",
              },
            },
            {
              twitter_handle: {
                equals: `@${input.twitterHandle}`,
                mode: "insensitive",
              },
            },
          ],
        },
      });
      return res?.highscore;
    },
  })
  .query("leaderboards", {
    async resolve({ ctx }) {
      return await ctx.prisma.flappy_bear.findMany({
        select: { twitter_handle: true, highscore: true },
        orderBy: { highscore: "desc" },
        take: 25,
      });
    },
  });
