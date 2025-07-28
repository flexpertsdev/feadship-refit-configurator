// ==================================================
// AI EXPLANATION: utils.ts
// ==================================================
// WHAT: Utility function 'cn' that merges Tailwind CSS classes using clsx and tailwind-merge to handle class conflicts
// WHY: Without this, conditional classes would conflict - it intelligently merges Tailwind classes preventing style conflicts
// USED BY: Every UI component that uses conditional styling - button, card, dialog, navigation components, etc.
// CRITICAL: YES - Core styling utility used throughout the entire component library, breaking this affects all component styling
// ==================================================

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
