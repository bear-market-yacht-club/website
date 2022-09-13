import { createRouter } from "./context";
import { rsvpTrack } from "../../types/validators";

export const tracking = createRouter().mutation("getNFT", {
  input: rsvpTrack,
  async resolve({ input, ctx }) {
    return 0;
  },
});
