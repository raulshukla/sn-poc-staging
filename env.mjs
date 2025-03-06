import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXT_PUBLIC_API_URL: z.string().min(1),
    NEXT_PUBLIC_API_TOKEN: z.string().min(1)
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().min(1),
    NEXT_PUBLIC_API_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_API_TOKEN: z.string().min(1)
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_API_TOKEN: process.env.NEXT_PUBLIC_API_TOKEN
  },
});
