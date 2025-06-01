// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { mongoose } from "mongoose";

/* eslint-disable no-var */

declare global {
  var mongoose:
    | {
        conn: typeof mongoose.Connection | null;
        promise: Promise<typeof mongoose.Connection> | null;
      }
    | undefined;
}
/* eslint-enable no-var */
