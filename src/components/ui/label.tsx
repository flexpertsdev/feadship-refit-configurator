// ==================================================
// AI EXPLANATION: label.tsx
// ==================================================
// WHAT: Form label component built on Radix UI for accessible form field labeling with proper association
// WHY: Without this, form fields would lack proper labels - provides semantic HTML labels for accessibility
// USED BY: AuthPage forms, configuration forms, anywhere form inputs need labels
// CRITICAL: NO - Accessibility component for forms, breaking this affects screen readers but not functionality
// ==================================================

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
