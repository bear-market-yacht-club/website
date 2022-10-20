import { z } from "zod";

export const applyValidator = z.object({
  whyDoYouWantToJoin: z.string().trim().min(10).nullable(),
  twitterHandle: z.string().trim().min(1),
  discordHandle: z.string().trim().min(1),
  ethAddress: z.string().trim().startsWith("0x").length(42).optional(),
});

export const getApplicationValidator = z.object({
  ethAddress: z.string().startsWith("0x").length(42).optional(),
  twitterHandle: z.string().optional(),
});

export const rsvpTrack = z.object({
  twitterHandle: z.string().trim().min(1),
});

export const getByTwitterValidator = z.object({
  twitterHandle: z.string().trim().min(1),
});


export const highscoreValidator = z.object({
  twitter_handle: z.string().trim().min(1),
  highscore: z.number(),
});

export const endGameValidator = z.object({
  twitter_handle: z.string().trim().min(1),
  score: z.number(),
});

export const bestTimeValidator = z.object({
  twitter_handle: z.string().trim().min(1),
  best_time: z.number(),
});

export const muteValidator = z.object({
  twitter_handle: z.string().trim().min(1),
  muted: z.boolean(),
});
