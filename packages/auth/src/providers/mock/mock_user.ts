import type { UserRole } from "@acme/db/enums"

import { db } from "@acme/db"

import { env } from "../../env"
import { MockProvider } from "../mock-provider"

const callbackUrl = env.APPLICATION_URL ? `https://${env.APPLICATION_URL}` : "http://localhost:3000"

const oauthMock = new MockProvider("dummy-client-id", "dummy-client-secret", {
  baseUrl: env.OAUTH_MOCK_ENDPOINT ?? "http://localhost",
  redirectURI: `${callbackUrl}/api/auth/mock_mock_user/callback`,
})

export const name = "Mock GmbH - Test User"

export const getAuthorizationUrl = async (state: string) => {
  return await oauthMock.createAuthorizationURL(state, {
    scopes: ["email"],
  })
}

export const handleCallback = async (code: string) => {
  await oauthMock.validateAuthorizationCode(code)

  const userId = "mock_mock_user"
  const role = "user" as UserRole

  const existingAccount = await db.oAuthAccount.findFirst({
    select: {
      userId: true,
    },

    where: {
      providerId: "mock",
      providerUserId: userId,
    },
  })

  if (existingAccount) {
    await db.user.update({
      data: {
        role,
      },
      where: { id: userId },
    })

    return existingAccount.userId
  }
  await db.oAuthAccount.create({
    data: {
      providerId: "mock",
      providerUserId: userId,
      user: {
        connectOrCreate: {
          create: {
            id: userId,

            name: userId,
            email: `${userId}@dmock.com`,
            role,
          },
          where: {
            email: `${userId}@mock.com`,
          },
        },
      },
    },
  })

  return userId
}
