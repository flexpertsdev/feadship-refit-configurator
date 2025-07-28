// ==================================================
// AI EXPLANATION: input.tsx
// ==================================================
// WHAT: Basic input field component with consistent styling, focus states, and accessibility support for forms
// WHY: Without this, form inputs would lack consistent styling - provides standard text input with theme-aware borders and focus rings
// USED BY: AuthPage (email/password inputs), YachtNameEditor, search fields, and other form components
// CRITICAL: NO - UI component for forms, breaking this affects input styling but not core functionality
// ==================================================

import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
