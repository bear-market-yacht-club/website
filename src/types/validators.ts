import { z } from "zod";

export const discordHandleValidator = z.object({
  discordHandle: z.string().trim().min(1),
});

export const twitterHandleValidator = z.object({
  twitterHandle: z.string().trim().min(1),
});

export const addressValidator = z.object({
  ethAddress: z.string().trim().startsWith("0x").length(42),
});

export const emailValidator = z.object({
  email: z.string().email(),
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

export const applyValidator = z
  .object({
    whyDoYouWantToJoin: z.string().trim().min(10).nullable(),
  })
  .merge(discordHandleValidator)
  .merge(twitterHandleValidator)
  .merge(addressValidator)
  .merge(emailValidator);
