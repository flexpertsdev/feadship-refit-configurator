// ==================================================
// AI EXPLANATION: navigationTheme.ts
// ==================================================
// WHAT: Central theme configuration for all navigation components containing colors, spacing, fonts, transitions, and styling constants
// WHY: Without this, navigation styling would be inconsistent - provides single source of truth for nav component styling
// USED BY: Level1Navigation, Level2Navigation, NavigationBar components for consistent theming
// CRITICAL: NO - Changes only affect visual styling, won't break functionality but may impact design consistency
// ==================================================


// Theme object for easy modifications across navigation components
export const THEME = {
  colors: {
    primary: '#0a003e',
    accent: '#00a1c7',
    accentHover: '#0092b8',
    text: '#ffffff',
    activeBackground: 'rgba(255, 255, 255, 0.05)', // Semi-transparent white for active items
  },
  spacing: {
    level1Padding: 'py-3 px-3',
    level2Padding: 'py-3 px-3',
    level3Padding: 'py-2 px-3',
  },
  fontSize: {
    level1: 'text-base',
    level2: 'text-base',
    level3: 'text-sm',
  },
  transitions: {
    default: 'transition-all duration-200',
  },
  borderWidth: {
    active: '3px',
  },
};

// Navigation theme interface
export interface NavigationTheme {
  primary: string;
  accent: string;
  accentHover: string;
  text: string;
}
