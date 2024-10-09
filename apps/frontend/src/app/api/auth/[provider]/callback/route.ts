import type { Providers } from "@acme/auth"
import type { NextRequest } from "next/server"
import { cookies } from "next/headers"
import { OAuth2RequestError } from "arctic"

import { lucia, providers } from "@acme/auth"
import { createLogger } from "@acme/logging"

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

  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const storedState = cookies().get(`oauth_state`)?.value ?? null
  const codeVerifier = cookies().get(`code_verifier`)?.value ?? null
  const redirectUrl = cookies().get("redirect_to_url")?.value ?? "/"

  if (!code || !codeVerifier || !state || !storedState || state !== storedState) {
    logger.error(
      "token mismatch",
      "Could be an old cookie value or without a secured connection (https://...).",
    )

    return new Response(null, {
      status: 200,
      headers: {
        Location: `/auth?error=AUTH_CODE_ERROR&redirectTo=${encodeURIComponent(redirectUrl)}`,
      },
    })
  }

  try {
    // @TODO: with the current implementation for the mock providers
    //        we could have `undefined` as value - Currently, i don't care, but we should fix it somehow

    const currentProvider = providers[params.provider as Providers]

    const userId = await currentProvider.handleCallback(code)

    const session = await lucia.createSession(userId, {
      ipAddress: request.ip ?? request.headers.get("X-Forwarded-For") ?? "127.0.0.1",
      userAgent: request.headers.get("user-agent"),
    })
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl,
      },
    })
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      logger.withError(e).info("oauth error")

      return new Response(null, {
        status: 200,
        headers: {
          Location: `/auth?error=AUTH_CALLBACK_ERROR&redirectTo=${encodeURIComponent(redirectUrl)}`,
        },
      })
    }
    logger.withError(e).error("Something went totally wrong inside the auth callback")
    return new Response(null, {
      status: 200,
      headers: {
        Location: `/auth?error=AUTH_UNKNOWN_ERROR&redirectTo=${encodeURIComponent(redirectUrl)}`,
      },
    })
  }
}
