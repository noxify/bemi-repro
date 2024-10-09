import * as React from "react"

import { cn } from "./index"

const PageHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children }, ref) => (
    <div className="container gap-6 border-b 2xl:border-none" ref={ref}>
      <div className="py-4 md:flex md:items-center md:justify-between 2xl:border-b">{children}</div>
    </div>
  ),
)
PageHeader.displayName = "PageHeader"

const PageHeaderTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn("text-4xl font-bold tracking-tight text-gray-900 dark:text-white", className)}
    {...props}
  />
))
PageHeaderTitle.displayName = "PageHeaderTitle"

const PageHeaderDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-2 text-lg leading-8 text-gray-600 dark:text-gray-200", className)}
    {...props}
  />
))
PageHeaderDescription.displayName = "PageHeaderDescription"

const PageHeaderHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("min-w-0 flex-1", className)} {...props} />
  ),
)
PageHeaderHeader.displayName = "PageHeaderHeader"

const PageHeaderActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-4 flex flex-shrink-0 md:ml-4 md:mt-0", className)}
      {...props}
    />
  ),
)
PageHeaderActions.displayName = "PageHeaderActions"

export { PageHeader, PageHeaderHeader, PageHeaderTitle, PageHeaderDescription, PageHeaderActions }
