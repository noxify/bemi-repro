import type { prismaExport } from "@acme/db"
import type { Session, User } from "lucia"
import { cache } from "react"
import { cookies } from "next/headers"
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import { Lucia, TimeSpan } from "lucia"

import { db } from "@acme/db"

import { env } from "./env"
import * as mockMockUserProvider from "./providers/mock/mock_user"

const adapter = new PrismaAdapter(db.session, db.user)

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(8, "h"),
  sessionCookie: {
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },

  getSessionAttributes(databaseSessionAttributes) {
    return {
      userAgent: databaseSessionAttributes.userAgent,
      ipAddress: databaseSessionAttributes.ipAddress,
    }
  },

  getUserAttributes: (attributes) => {
    return attributes
  },
})

export const auth = cache(async (): Promise<AuthResponse> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
  if (!sessionId) {
    return {
      user: null,
      session: null,
    }
  }

  const result = await lucia.validateSession(sessionId)
  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
  } catch {
    /* empty */
  }
  return result
})

export const providers = {
  mock_mock_user: mockMockUserProvider,
} as const

export type Providers = keyof typeof providers

export type LuciaUser = User

export type AuthResponse = { user: User; session: Session } | { user: null; session: null }
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: Omit<prismaExport.User, "id">
    DatabaseSessionAttributes: Pick<prismaExport.Session, "ipAddress" | "userAgent">
  }
}
