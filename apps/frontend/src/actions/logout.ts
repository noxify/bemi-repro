"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { auth, lucia } from "@acme/auth"

export async function logoutAction() {
  const { session } = await auth()
  if (!session) {
    redirect("/auth")
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  redirect("/auth")
}
