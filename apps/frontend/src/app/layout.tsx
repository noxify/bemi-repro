import type { Metadata, Viewport } from "next"

import { cn } from "@acme/ui"
import { ThemeProvider } from "@acme/ui/theme"

import "~/app/globals.css"

import { env } from "~/env"

export const metadata: Metadata = {
  metadataBase: new URL(
    (env.APPLICATION_URL ?? env.LOCAL_HTTPS) ? "https://localhost:3000" : "http://localhost:3000",
  ),
  title: {
    template: "Bemi Repro - %s",
    default: "Bemi Repro",
  },
  description: "Simple monorepo with shared backend for web & mobile apps",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={cn("h-full bg-background font-sans text-foreground antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  )
}
