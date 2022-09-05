import { createRouter } from "./context";
import { applyValidator } from "../../types/validators";

export const apply = createRouter().mutation("apply", {
  input: applyValidator,
  async resolve({ input, ctx }) {
    await ctx.prisma.applicationForm.create({ data: input });
    return input;
  },
});
