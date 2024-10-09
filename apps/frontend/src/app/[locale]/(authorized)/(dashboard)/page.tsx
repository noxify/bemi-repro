import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { auth } from "@acme/auth"
import { getI18n } from "@acme/locales/server"
import { Container } from "@acme/ui/container"
import { PageHeader, PageHeaderTitle } from "@acme/ui/page-header"

import { logoutAction } from "~/actions/logout"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n()

  return {
    title: t("dashboard.overview.title"),
  }
}

export default async function DashboardPage() {
  const { user } = await auth()
  const t = await getI18n()

  if (!user) {
    redirect("/auth")
  }

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{t("dashboard.overview.title")}</PageHeaderTitle>
      </PageHeader>

      <Container>
        <p>Hello {user.name}!</p>

        <form action={logoutAction}>
          <button type="submit">Logout</button>
        </form>
      </Container>
    </>
  )
}
