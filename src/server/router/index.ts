// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { apply } from "./apply";
import { tracking } from "./tracking";
import { premint } from "./premint";
import { flap } from "./flap";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("form.", apply)
  .merge("track.", tracking)
  .merge("premint.", premint)
  .merge("flap.", flap);

// export type definition of API
export type AppRouter = typeof appRouter;
