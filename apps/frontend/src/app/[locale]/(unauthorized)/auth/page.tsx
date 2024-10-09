import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { auth, providers } from "@acme/auth"
import { getI18n } from "@acme/locales/server"
import { Button } from "@acme/ui/button"

interface LoginPageProps {
  searchParams: {
    error?: string
    redirectTo?: string
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n()

  return {
    title: t("auth.title"),
  }
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const t = await getI18n()
  const { session } = await auth()

  // check if the user is already logged in
  if (session) {
    if (searchParams.redirectTo) {
      redirect(searchParams.redirectTo)
    }
    redirect("/")
  }

  const errors: Record<string, string> = {
    AUTH_INVALID_PROVIDER: t("auth.error.invalid_provider"),
    AUTH_CODE_ERROR: t("auth.error.code_error"),
    AUTH_CALLBACK_ERROR: t("auth.error.callback_error"),
    AUTH_UNKNOWN_ERROR: t("auth.error.unknown_error"),
  }

  return (
    <div className="xl:min-h-[800px h-full w-full lg:grid lg:min-h-[600px] lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[450px] gap-6">
          <div className="mb-4 flex justify-center">
            <div className="mx-auto flex items-center space-x-2 font-bold"></div>
          </div>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t("auth.page_title")}</h1>
            {/* <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p> */}
          </div>
          {searchParams.error && <>{errors[searchParams.error] ?? errors.AUTH_UNKNOWN_ERROR}</>}
          <div className="grid gap-4">
            {Object.entries(providers).map(([providerKey, provider], index) => (
              <Button
                variant="outline"
                className="w-full"
                type="button"
                asChild
                key={index}
                id={providerKey}
              >
                <Link
                  href={`/api/auth/${providerKey}/login?redirectTo=${encodeURIComponent(searchParams.redirectTo ?? "/")}`}
                  prefetch={false}
                >
                  {t("auth.signin_button")} {provider.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block"></div>
    </div>
  )
}
