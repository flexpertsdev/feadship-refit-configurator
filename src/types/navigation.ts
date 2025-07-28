// ==================================================
// AI EXPLANATION: navigation.ts
// ==================================================
// WHAT: TypeScript interfaces defining hierarchical navigation structure - NavigationItem for menu items and FullNavigationState for 3-level navigation state management
// WHY: Without this, navigation components lack type safety - defines the contract for navigation items, active states, and navigation methods (next/back/reset)
// USED BY: NavigationBar, Level1Navigation, Level2Navigation, MobileNavigation, navigationUtils, navigation hooks
// CRITICAL: YES - Core navigation type definitions, breaking these affects all navigation components and routing logic
// ==================================================


export interface NavigationItem {
  id: string;
  name: string;
  level: number;
  path: string;
  parentId?: string;
  expandable?: boolean;
  subItems: NavigationItem[];
}

export interface FullNavigationState {
  activeLevel1: string | null;
  activeLevel2: string | null;
  activeLevel3: string | null;
  setActiveItem: (level: number, id: string | null) => void;
  next: () => { path: string | null };
  back: () => { path: string | null };
  reset: () => void;
}
