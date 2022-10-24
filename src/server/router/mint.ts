import { env } from "../../env/server.mjs";
import { createRouter } from "./context";

export const mint = createRouter()
  .query("premintList", {
    async resolve() {
      const list = await fetch(
        `https://api.premint.xyz/v1/${env.PREMINT_KEY}`
      ).then((res) => res.json());
      return list as { data: { create_time: string; wallet: string }[] };
    },
  })
  .query("whitelists", {
    async resolve({ ctx }) {
      return await ctx.prisma.whitelists.findMany();
    },
  });
