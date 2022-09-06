import { createRouter } from "./context";
import {
  applyValidator,
  getApplicationValidator,
} from "../../types/validators";

export const apply = createRouter()
  .mutation("apply", {
    input: applyValidator,
    async resolve({ input, ctx }) {
      await ctx.prisma.applicationForm.create({ data: input });
      return input;
    },
  })
  .query("getApplication", {
    input: getApplicationValidator,
    async resolve({ input, ctx }) {
      return await ctx.prisma.applicationForm.findUnique({
        where: { ethAddress: input.ethAddress },
      });
    },
  });
