/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    APPLICATION_URL: z.string().optional(),
    OAUTH_MOCK_ENDPOINT: z.string().optional(),
  },

  client: {},
  experimental__runtimeEnv: process.env,
  skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === "lint",
})
