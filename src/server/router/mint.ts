import { createRouter } from "./context";

export const mint = createRouter().query("whitelists", {
  async resolve({ ctx }) {
    return await ctx.prisma.whitelists.findMany();
  },
});
