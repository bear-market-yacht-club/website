import { createRouter } from "./context";
import { emailValidator, getByTwitterValidator } from "../../types/validators";

export const mailing = createRouter().mutation("addEmail", {
  input: emailValidator.merge(getByTwitterValidator.partial()),
  async resolve({ input, ctx }) {
    const email = input.email.toLowerCase().trim();
    const twitter_handle = input.twitterHandle
      ?.toLowerCase()
      .trim()
      .replace(/^@+/, "")
      .trim();

    await ctx.prisma.mailing_list.create({ data: { email, twitter_handle } });
  },
});
