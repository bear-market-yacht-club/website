import { createRouter } from "./context";
import { getByTwitterValidator, muteValidator } from "../../types/validators";

export const gameSettings = createRouter()
  .mutation("setMuted", {
    input: muteValidator,
    async resolve({ input, ctx }) {
      const handle = input.twitter_handle
        .toLowerCase()
        .trim()
        .replace(/^@+/, "")
        .trim();

      await ctx.prisma.game_settings.upsert({
        create: {
          twitter_handle: handle,
          muted: input.muted,
        },
        update: {
          muted: input.muted,
        },
        where: { twitter_handle: handle },
      });
    },
  })
  .query("getMuted", {
    input: getByTwitterValidator,
    async resolve({ ctx, input }) {
      const handle = input.twitterHandle
        .toLowerCase()
        .trim()
        .replace(/^@+/, "")
        .trim();

      return await ctx.prisma.game_settings.findFirst({
        select: { muted: true },
        where: { twitter_handle: handle },
      });
    },
  });
