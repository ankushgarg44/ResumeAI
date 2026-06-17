import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.ComponentProps<"div"> {
  title: string
  description: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-xl border border-dashed border-border bg-card/30 backdrop-blur-sm shadow-sm py-12 animate-in fade-in duration-300",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary shrink-0">
          {icon}
        </div>
      )}
      <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs sm:max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      {action && <div className="flex justify-center w-full">{action}</div>}
    </div>
  )
}
