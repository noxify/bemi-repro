import { chainMiddleware } from "~/middlewares/chain-middleware"
import { withI18n } from "~/middlewares/i18n"
import { withAuth } from "./middlewares/auth"

export default chainMiddleware([withI18n, withAuth])

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
}
