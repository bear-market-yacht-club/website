// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { apply } from "./apply";
import { tracking } from "./tracking";
import { premint } from "./premint";
import { flap } from "./flap";
import { fudballs } from "./fudballs";
import { gameSettings } from "./game_settings";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("form.", apply)
  .merge("track.", tracking)
  .merge("premint.", premint)
  .merge("flap.", flap)
  .merge("fudballs.", fudballs)
  .merge("game_settings.", gameSettings);

// export type definition of API
export type AppRouter = typeof appRouter;
