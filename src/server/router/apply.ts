import { createRouter } from "./context";
import {
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
  .query("getApplication", {
    input: getApplicationValidator,
    async resolve({ input, ctx }) {
      return await ctx.prisma.applicationForm.findFirst({
        where: {
          OR: [
            {
              ethAddress: input.ethAddress,
            },
            { twitterHandle: input.twitterHandle },
          ],
        },
      });
    },
  })
  .query("getByTwitter", {
    input: getByTwitterValidator,
    async resolve({ input, ctx }) {
      const find = await ctx.prisma.acceptedTwitterAccounts.findFirst({
        where: {
          twitterHandle: {
            equals: input.twitterHandle.toLowerCase().trim(),
            mode: "insensitive",
          },
        },
      });
      return find?.twitterHandle;
    },
  })
  // select ata.* from "ApplicationForm" af
  //   left join "AcceptedTwitterAccounts" ata
  // 	 on ata."twitterHandle" = af."twitterHandle"
  // where af."ethAddress" = $1
  .query("getByEthereum", {
    input: getApplicationValidator,
    async resolve({ input, ctx }) {
      const applicationForm = await ctx.prisma.applicationForm.findFirst({
        where: {
          OR: [
            {
              ethAddress: input.ethAddress,
            },
            {
              twitterHandle: input.twitterHandle,
            },
          ],
        },
      });
      return await ctx.prisma.acceptedTwitterAccounts.findUnique({
        where: { twitterHandle: applicationForm?.twitterHandle },
      });
    },
  });
