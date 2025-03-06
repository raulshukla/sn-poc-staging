import { default as Xior } from "xior";
import { env } from "../env.mjs";

/* --------------------------------------------------------------------------------------
Moments API
-------------------------------------------------------------------------------------- */
export const api = Xior.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${env.NEXT_PUBLIC_API_TOKEN}`, // Add token dynamically
  },
});
