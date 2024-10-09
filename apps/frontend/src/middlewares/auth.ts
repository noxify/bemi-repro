import type { NextFetchEvent, NextRequest } from "next/server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import type { CustomMiddleware } from "~/middlewares/chain-middleware"

/*
 * Helper function to create the exclude urls in a "dynamic" way
 * Even with the "rewrite" option in the `i18n` middleware
 * the value of `pathname` is always `/[locale]/[pathname]`
 */
function getExcludePaths({ currentLanguage }: { currentLanguage: string }) {
  return [`/${currentLanguage}/auth`]
}

export function withAuth(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const pathname = request.nextUrl.pathname
    // eslint-disable-next-line no-restricted-properties
    const origin = process.env.APPLICATION_URL
      ? // eslint-disable-next-line no-restricted-properties
        `https://${process.env.APPLICATION_URL}`
      : request.nextUrl.origin

    if (
      getExcludePaths({
        currentLanguage: response.headers.get("x-next-locale") ?? "en",
      }).includes(pathname)
    ) {
      return middleware(request, event, response)
    }

    const verifyRequest = await fetch(`${origin}/api/auth/verify-session`, {
      headers: { Cookie: cookies().toString() },
    })

    const verifySession = (await verifyRequest.json()) as {
      valid: boolean
    }

    if (!verifySession.valid) {
      const redirectTo = encodeURIComponent(
        new URL(
          `${origin}${request.nextUrl.pathname}${request.nextUrl.search}${request.nextUrl.hash}`,
        ).toString(),
      )
      response = NextResponse.redirect(new URL(`/auth?redirectTo=${redirectTo}`, request.nextUrl))
    }

    return middleware(request, event, response)
  }
}
