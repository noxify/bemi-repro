import type { ReactNode } from "react"

export interface AuthorizedLayoutProps {
  children: ReactNode
}

export default function AuthorizedLayout({ children }: AuthorizedLayoutProps) {
  return (
    <>
      <div className="">{children}</div>
    </>
  )
}
