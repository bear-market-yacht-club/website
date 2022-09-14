import { z } from "zod";

export const applyValidator = z.object({
  whyDoYouWantToJoin: z.string().trim().min(10).nullable(),
  twitterHandle: z.string().trim().min(1),
  discordHandle: z.string().trim().min(1),
  ethAddress: z.string().trim().startsWith("0x").length(42),
});

export const ethAddressValidator = z.object({
  ethAddress: z.string().startsWith("0x").length(42),
});

export const rsvpTrack = z.object({
  twitterHandle: z.string().trim().min(1),
});

export const getByTwitterValidator = z.object({
  twitterHandle: z.string().trim().min(1),
});
