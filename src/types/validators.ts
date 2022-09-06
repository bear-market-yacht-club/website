import { z } from "zod";

export const applyValidator = z.object({
  howWillYouHelp: z.string().min(10),
  longTerm: z.string().min(10),
  twitterHandle: z.string().min(1),
  discordHandle: z.string().min(1),
  ethAddress: z.string().startsWith("0x").length(42),
});

export const getApplicationValidator = z.object({
  ethAddress: z.string().startsWith("0x").length(42),
});

export const rsvpTrack = z.object({
  twitterHandle: z.string().min(1),
});

export const getByTwitterValidator = z.object({
  twitterHandle: z.string().min(1),
});
