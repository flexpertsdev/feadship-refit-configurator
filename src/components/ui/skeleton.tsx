// ==================================================
// AI EXPLANATION: skeleton.tsx
// ==================================================
// WHAT: Loading skeleton component with animated pulse effect for showing content placeholders while data loads
// WHY: Without this, loading states would show blank spaces - provides visual feedback during data fetching
// USED BY: Loading states in lists, cards, and content areas throughout the app
// CRITICAL: NO - UI loading state component, breaking this only affects loading animations
// ==================================================

import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
