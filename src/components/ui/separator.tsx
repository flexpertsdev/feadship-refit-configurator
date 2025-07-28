// ==================================================
// AI EXPLANATION: separator.tsx
// ==================================================
// WHAT: UI component wrapper around Radix UI's separator primitive for horizontal/vertical divider lines with consistent styling
// WHY: Without this, developers would need to manually style divider lines - provides consistent visual separation between content sections
// USED BY: Various components that need visual separation (summary sections, forms, lists)
// CRITICAL: NO - UI utility component, breaking this only affects visual dividers not functionality
// ==================================================

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
