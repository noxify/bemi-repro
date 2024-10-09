import type { Providers } from "@acme/auth"
import type { NextRequest } from "next/server"
import { cookies } from "next/headers"
import { generateCodeVerifier, generateState } from "arctic"

import { providers } from "@acme/auth"
import { createLogger } from "@acme/logging"

import { env } from "~/env"

const logger = createLogger()

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { provider: string }
  },
): Promise<Response> {
  if (!Object.keys(providers).includes(params.provider)) {
    logger.withContext({ provider: params.provider }).error("Invalid oauth provider")
    return new Response(null, {
      status: 200,
      headers: {
        Location: "/auth?error=AUTH_INVALID_PROVIDER",
      },
    })
  }

  const state = generateState()
  const codeVerifier = generateCodeVerifier()

  cookies().set("redirect_to_url", request.nextUrl.searchParams.get("redirectTo") ?? "/", {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
  })

  // @TODO: with the current implementation for the mock providers
  //        we could have `undefined` as value - Currently, i don't care, but we should fix it somehow

  const currentProvider = providers[params.provider as Providers]
  const url = await currentProvider.getAuthorizationUrl(state)
  cookies().set(`oauth_state`, state, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  })

  cookies().set("code_verifier", codeVerifier, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
  })

  return Response.redirect(url)
}
