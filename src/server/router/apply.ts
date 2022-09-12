import { createRouter } from "./context";
import {
  applyValidator,
  ethAddressValidator,
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
    input: ethAddressValidator,
    async resolve({ input, ctx }) {
      return await ctx.prisma.applicationForm.findUnique({
        where: { ethAddress: input.ethAddress },
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
    input: ethAddressValidator,
    async resolve({ input, ctx }) {
      const applicationForm = await ctx.prisma.applicationForm.findUnique({
        where: {
          ethAddress: input.ethAddress,
        },
      });
      return await ctx.prisma.acceptedTwitterAccounts.findUnique({
        where: { twitterHandle: applicationForm?.twitterHandle },
      });
    },
  });
