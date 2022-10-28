import { createRouter } from "./context";
import {
  addressValidator,
  applyValidator,
  getApplicationValidator,
  getByTwitterValidator,
} from "../../types/validators";

export const apply = createRouter()
  .mutation("apply", {
    input: applyValidator,
    async resolve({ input, ctx }) {
      await ctx.prisma.applicationForm.create({ data: input });
      return input;
    },
  })
  .query("isAccepted", {
    input: addressValidator,
    async resolve({ input, ctx }) {
      const applicationForm = await ctx.prisma.applicationForm.findFirst({
        where: {
          OR: [
            {
              ethAddress: input.ethAddress,
            },
          ],
        },
      });
      return !!applicationForm;
    },
  });
