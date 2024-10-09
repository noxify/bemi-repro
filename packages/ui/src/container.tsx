import React from "react"

import { cn } from "."

const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className }, ref) => (
    <div className="container gap-6" ref={ref}>
      <div className={cn("py-4", className)}>{children}</div>
    </div>
  ),
)
Container.displayName = "Container"

export { Container }
