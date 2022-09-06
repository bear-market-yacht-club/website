// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { apply } from "./apply";
import { tracking } from "./tracking";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("form.", apply)
  .merge("track.", tracking);

// export type definition of API
export type AppRouter = typeof appRouter;
