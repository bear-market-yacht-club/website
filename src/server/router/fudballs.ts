import { createRouter } from "./context";
import {
  highscoreValidator,
  getByTwitterValidator,
  bestTimeValidator,
  endGameValidator,
} from "../../types/validators";

export const fudballs = createRouter()
  .mutation("setHighcore", {
    input: highscoreValidator,
    async resolve({ input, ctx }) {
      const handle = input.twitter_handle
        .toLowerCase()
        .trim()
        .replace(/^@+/, "")
        .trim();

      const user = await ctx.prisma.fudballs.findFirst({
        where: {
          twitter_handle: {
            equals: handle,
            mode: "insensitive",
          },
        },
      });

      if (user?.game_started) {
        const time_played_seconds =
          Date.now() - user.game_started.getTime() / 1000;
        // you can get 4 coins a second until 10s in, when it switches to 2 coins a second
        if (
          (time_played_seconds < 10 && input.highscore < 40) ||
          time_played_seconds >= input.highscore / 2
        ) {
          await ctx.prisma.fudballs.update({
            data: {
              highscore: input.highscore,
            },
            where: { twitter_handle: handle },
          });
        }
      }
    },
  })
  .mutation("setBestTime", {
    input: bestTimeValidator,
    async resolve({ input, ctx }) {
      const handle = input.twitter_handle
        .toLowerCase()
        .trim()
        .replace(/^@+/, "")
        .trim();

      const user = await ctx.prisma.fudballs.findFirst({
        where: {
          twitter_handle: {
            equals: handle,
            mode: "insensitive",
          },
        },
      });

      if (
        user?.game_started &&
        input.best_time - 1000 <= Date.now() - user.game_started.getTime() // time elapsed for highscore has to match with server
      ) {
        await ctx.prisma.fudballs.update({
          data: {
            best_time: input.best_time,
          },
          where: { twitter_handle: handle },
        });
      }
    },
  })
  .mutation("startGame", {
    input: getByTwitterValidator,
    async resolve({ input, ctx }) {
      const handle = input.twitterHandle
        .toLowerCase()
        .trim()
        .replace(/^@+/, "")
        .trim();

      await ctx.prisma.fudballs.upsert({
        create: {
          twitter_handle: handle,
          game_started: new Date(),
        },
        update: {
          game_started: new Date(),
        },
        where: {
          twitter_handle: handle,
        },
      });
    },
  })
  .mutation("endGame", {
    input: endGameValidator,
    async resolve({ input, ctx }) {
      const handle = input.twitter_handle
        .toLowerCase()
        .trim()
        .replace(/^@+/, "")
        .trim();

      const game_started = (
        await ctx.prisma.fudballs.findFirst({
          select: { game_started: true },
          where: { twitter_handle: handle },
        })
      )?.game_started;
      if (game_started) {
        const time_played = Date.now() - game_started.getTime();
        await ctx.prisma.$executeRaw`
        UPDATE fudballs
        SET time_played = time_played + ${time_played} , game_started = null
        WHERE twitter_handle = ${handle}
      `;
        await ctx.prisma.fudball_games.create({
          data: {
            twitter_handle: handle,
            time_survived: time_played,
            score: input.score,
          },
        });
      } else {
        console.error("Game hasn't started");
      }
    },
  })
  .query("getHighscore", {
    input: getByTwitterValidator,
    async resolve({ input, ctx }) {
      const handle = input.twitterHandle
        .toLowerCase()
        .trim()
        .replace(/^@+/, "")
        .trim();

      const res = await ctx.prisma.fudballs.findFirst({
        where: {
          twitter_handle: handle,
        },
      });
      return res?.highscore;
    },
  })
  .query("getBestTime", {
    input: getByTwitterValidator,
    async resolve({ input, ctx }) {
      const handle = input.twitterHandle
        .toLowerCase()
        .trim()
        .replace(/^@+/, "")
        .trim();

      const res = await ctx.prisma.fudballs.findFirst({
        where: {
          twitter_handle: handle,
        },
      });
      return res?.best_time;
    },
  })
  .query("scoreLeaderboards", {
    async resolve({ ctx }) {
      return await ctx.prisma.fudballs.findMany({
        select: { twitter_handle: true, highscore: true },
        where: { highscore: { gt: 0 } },
        orderBy: { highscore: "desc" },
        take: 50,
      });
    },
  })
  .query("timeLeaderboards", {
    async resolve({ ctx }) {
      return await ctx.prisma.fudballs.findMany({
        select: { twitter_handle: true, best_time: true },
        where: { best_time: { gt: 0 } },
        orderBy: { best_time: "desc" },
        take: 50,
      });
    },
  });
