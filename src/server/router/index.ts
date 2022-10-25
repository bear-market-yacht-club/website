// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { apply } from "./apply";
import { tracking } from "./tracking";
import { mint } from "./mint";
import { flap } from "./flap";
import { fudballs } from "./fudballs";
import { gameSettings } from "./game_settings";
import { mailing } from "./mailing";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("form.", apply)
  .merge("track.", tracking)
  .merge("mint.", mint)
  .merge("mailing.", mailing)
  .merge("flap.", flap)
  .merge("fudballs.", fudballs)
  .merge("game_settings.", gameSettings);

// export type definition of API
export type AppRouter = typeof appRouter;
