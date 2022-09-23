import { createRouter } from "./context";
import { rsvpTrack } from "../../types/validators";

export const tracking = createRouter().mutation("rsvpTrack", {
  input: rsvpTrack,
  async resolve({ input, ctx }) {
    await ctx.prisma.trackCheckStatus.create({
      data: {
        checkedTwitterHandle: input.twitterHandle
          .toLowerCase()
          .trim()
          .replace(/^@+/, "")
          .trim(),
      },
    });
  },
});
