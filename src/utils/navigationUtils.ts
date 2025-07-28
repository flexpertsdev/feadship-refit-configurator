// ==================================================
// AI EXPLANATION: navigationUtils.ts
// ==================================================
// WHAT: Navigation helper utilities defining the complete navigation tree structure and functions to calculate next/previous navigation states for the multi-step configurator
// WHY: Without this, navigation between configuration steps wouldn't work - it defines all routes and the logic for moving forward/backward through the flow
// USED BY: NavigationBar component (for next/prev), navigation components (for tree structure), navigationStore (for state management)
// CRITICAL: YES - Defines entire navigation structure and flow logic, breaking this prevents navigation between pages
// ==================================================

/**
 * Navigation utilities for FlexOS
 * This replaces the old navigationStore with simple utility functions
 * Navigation state is stored in yacht config (active_level_1, active_level_2, active_level_3)
 */

import { NavigationItem } from '../types/navigation';

/**
 * Color options for paint section
 */
const COLOR_OPTIONS = [
  'Custom Colours',
  'White & Beiges',
  'Golds & Browns',
  'Black & Greys',
  'Blues',
  'Greens',
  'Reds, Oranges & Yellows'
];

/**
 * Navigation Items – Full three‑level navigation tree
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'DESIGN',
    name: 'DESIGN PREFERENCES',
    level: 1,
    path: '/design/1',
    subItems: [
      { id: 'clean', name: 'Clean / Complex', level: 2, path: '/design/1', parentId: 'DESIGN', subItems: [] },
      { id: 'vintage', name: 'Vintage / Modern', level: 2, path: '/design/2', parentId: 'DESIGN', subItems: [] },
      { id: 'traditional', name: 'Traditional / Radical', level: 2, path: '/design/3', parentId: 'DESIGN', subItems: [] }
    ]
  },
  {
    id: 'OPERATION',
    name: 'OPERATING PROFILE',
    level: 1,
    path: '/operations1',
    subItems: [
      { id: 'where', name: 'Where', level: 2, path: '/operations1', parentId: 'OPERATION', subItems: [] },
      { id: 'who', name: 'Who', level: 2, path: '/operations2', parentId: 'OPERATION', subItems: [] },
      { id: 'what', name: 'What', level: 2, path: '/operations3', parentId: 'OPERATION', subItems: [] }
    ]
  },
  {
    id: 'PAINT',
    name: 'PAINT',
    level: 1,
    path: '/configurator',
    subItems: [
      {
        id: 'hull',
        name: 'Hull',
        level: 2,
        path: '/configurator',
        parentId: 'PAINT',
        expandable: true,
        subItems: COLOR_OPTIONS.map((color) => ({
          id: color.toLowerCase().replace(/\s/g, '-'),
          name: color,
          level: 3,
          path: '/configurator',
          parentId: 'hull',
          subItems: []
        }))
      },
      {
        id: 'superstructure',
        name: 'Superstructure',
        level: 2,
        path: '/configurator',
        parentId: 'PAINT',
        expandable: true,
        subItems: COLOR_OPTIONS.map((color) => ({
          id: color.toLowerCase().replace(/\s/g, '-'),
          name: color,
          level: 3,
          path: '/configurator',
          parentId: 'superstructure',
          subItems: []
        }))
      },
      {
        id: 'deckhouse',
        name: 'Deckhouse',
        level: 2,
        path: '/configurator',
        parentId: 'PAINT',
        expandable: true,
        subItems: COLOR_OPTIONS.map((color) => ({
          id: color.toLowerCase().replace(/\s/g, '-'),
          name: color,
          level: 3,
          path: '/configurator',
          parentId: 'deckhouse',
          subItems: []
        }))
      },
      {
        id: 'mast',
        name: 'Mast',
        level: 2,
        path: '/configurator',
        parentId: 'PAINT',
        expandable: true,
        subItems: COLOR_OPTIONS.map((color) => ({
          id: color.toLowerCase().replace(/\s/g, '-'),
          name: color,
          level: 3,
          path: '/configurator',
          parentId: 'mast',
          subItems: []
        }))
      },
      {
        id: 'bootstripe',
        name: 'Bootstripe',
        level: 2,
        path: '/configurator',
        parentId: 'PAINT',
        expandable: true,
        subItems: COLOR_OPTIONS.map((color) => ({
          id: color.toLowerCase().replace(/\s/g, '-'),
          name: color,
          level: 3,
          path: '/configurator',
          parentId: 'bootstripe',
          subItems: []
        }))
      }
    ]
  },
  {
    id: 'EXTENSIONS',
    name: 'EXTENSIONS',
    level: 1,
    path: '/extensions',
    subItems: []
  },
  {
    id: 'FEATURES',
    name: 'FEATURES',
    level: 1,
    path: '/features',
    subItems: [
      { id: 'exterior', name: 'Exterior', level: 2, path: '/features', parentId: 'FEATURES', subItems: [] },
      { id: 'interior', name: 'Interior', level: 2, path: '/features', parentId: 'FEATURES', subItems: [] },
      { id: 'toys', name: 'Toys & Tenders', level: 2, path: '/features', parentId: 'FEATURES', subItems: [] }, 
      { id: 'additional', name: 'Additional Features', level: 2, path: '/features', parentId: 'FEATURES', subItems: [] }
    ]
  },
  {
    id: 'SUSTAINABILITY',
    name: 'SUSTAINABILITY',
    level: 1,
    path: '/sustainability',
    subItems: [ 
      { id: 'power', name: 'Power Supply & Propulsion', level: 2, path: '/sustainability', parentId: 'SUSTAINABILITY', subItems: [] },
      { id: 'energy', name: 'Energy Efficiency', level: 2, path: '/sustainability', parentId: 'SUSTAINABILITY', subItems: [] }
    ]
  },
  {
    id: 'SERVICES',
    name: 'SERVICES',
    level: 1,
    path: '/services',
    subItems: [ 
      { id: 'suite', name: 'Suite of services', level: 2, path: '/services', parentId: 'SERVICES', subItems: [] }
    ]
  },
  {
    id: 'SUMMARY',
    name: 'SUMMARY',
    level: 1,
    path: '/summary',
    subItems: []
  }
];

/**
 * Get the next navigation state based on current state
 */
export function getNextNavigation(
  activeLevel1: string | null,
  activeLevel2: string | null,
  activeLevel3?: string | null
): { level1: string | null; level2: string | null; level3: string | null; path: string | null } {
  const navItems = NAVIGATION_ITEMS;
  
  // Find current level 1 index
  const level1Index = navItems.findIndex((item) => item.id === activeLevel1);
  if (level1Index === -1) return { level1: null, level2: null, level3: null, path: null };
  
  const currentLevel1 = navItems[level1Index];
  const level2Items = currentLevel1.subItems || [];
  const level2Index = level2Items.findIndex((item) => item.id === activeLevel2);
  
  // Special case: if we're in PAINT/bootstripe, go to EXTENSIONS
  if (activeLevel1 === 'PAINT' && activeLevel2 === 'bootstripe') {
    const extensionsIndex = navItems.findIndex(item => item.id === 'EXTENSIONS');
    if (extensionsIndex >= 0) {
      const extensionsItem = navItems[extensionsIndex];
      return {
        level1: 'EXTENSIONS',
        level2: null,
        level3: null,
        path: extensionsItem.path
      };
    }
  }
  
  // Special case: if we're in EXTENSIONS, go to FEATURES
  if (activeLevel1 === 'EXTENSIONS') {
    const featuresIndex = navItems.findIndex(item => item.id === 'FEATURES');
    if (featuresIndex >= 0) {
      const featuresItem = navItems[featuresIndex];
      const firstLevel2 = featuresItem.subItems && featuresItem.subItems.length > 0 
        ? featuresItem.subItems[0] 
        : null;
      
      return {
        level1: 'FEATURES',
        level2: firstLevel2 ? firstLevel2.id : null,
        level3: null,
        path: featuresItem.path
      };
    }
  }
  
  // Case: No active level 2 item, but we have level 2 items
  if (level2Index === -1) {
    if (level2Items.length > 0) {
      return {
        level1: activeLevel1,
        level2: level2Items[0].id,
        level3: level2Items[0].subItems && level2Items[0].subItems.length > 0
          ? level2Items[0].subItems[0].id
          : null,
        path: level2Items[0].path
      };
    }
    // No level 2 items, move to next level 1
    if (level1Index < navItems.length - 1) {
      let nextIndex = level1Index + 1;
      const nextLevel1 = navItems[nextIndex];
      const firstLevel2 = nextLevel1.subItems && nextLevel1.subItems.length > 0 
        ? nextLevel1.subItems[0] 
        : null;
      
      return {
        level1: nextLevel1.id,
        level2: firstLevel2 ? firstLevel2.id : null,
        level3: null,
        path: nextLevel1.path
      };
    }
    return { level1: null, level2: null, level3: null, path: null };
  }
  
  // Case: Move to next level 2 item
  if (level2Index < level2Items.length - 1) {
    const nextLevel2 = level2Items[level2Index + 1];
    return {
      level1: activeLevel1,
      level2: nextLevel2.id,
      level3: nextLevel2.subItems && nextLevel2.subItems.length > 0
        ? nextLevel2.subItems[0].id
        : null,
      path: nextLevel2.path
    };
  } 
  
  // Case: Move to next level 1 item
  if (level1Index < navItems.length - 1) {
    let nextIndex = level1Index + 1;
    const nextLevel1 = navItems[nextIndex];
    const firstLevel2 = nextLevel1.subItems && nextLevel1.subItems.length > 0 
      ? nextLevel1.subItems[0] 
      : null;
      
    return {
      level1: nextLevel1.id,
      level2: firstLevel2 ? firstLevel2.id : null,
      level3: null,
      path: nextLevel1.path
    };
  }
  
  return { level1: null, level2: null, level3: null, path: null };
}

/**
 * Get the previous navigation state based on current state
 */
export function getPreviousNavigation(
  activeLevel1: string | null,
  activeLevel2: string | null,
  activeLevel3?: string | null
): { level1: string | null; level2: string | null; level3: string | null; path: string | null } {
  const navItems = NAVIGATION_ITEMS;
  
  // Special case: if we're in FEATURES and on the first item (Exterior), go back to EXTENSIONS
  if (activeLevel1 === 'FEATURES' && activeLevel2 === 'exterior') {
    const extensionsIndex = navItems.findIndex(item => item.id === 'EXTENSIONS');
    if (extensionsIndex >= 0) {
      const extensionsItem = navItems[extensionsIndex];
      return {
        level1: 'EXTENSIONS',
        level2: null,
        level3: null,
        path: extensionsItem.path
      };
    }
  }
  
  // Special case: if we're in EXTENSIONS, go back to PAINT/bootstripe
  if (activeLevel1 === 'EXTENSIONS') {
    const paintIndex = navItems.findIndex(item => item.id === 'PAINT');
    if (paintIndex >= 0) {
      const paintItem = navItems[paintIndex];
      const bootstripeLevel2 = paintItem.subItems.find(item => item.id === 'bootstripe');
      
      if (bootstripeLevel2) {
        return {
          level1: 'PAINT',
          level2: 'bootstripe',
          level3: bootstripeLevel2.subItems && bootstripeLevel2.subItems.length > 0
            ? bootstripeLevel2.subItems[0].id
            : null,
          path: bootstripeLevel2.path
        };
      }
    }
  }
  
  // Find current positions in hierarchy
  const level1Index = navItems.findIndex((item) => item.id === activeLevel1);
  if (level1Index === -1) return { level1: null, level2: null, level3: null, path: null };
  
  const currentLevel1 = navItems[level1Index];
  const level2Items = currentLevel1.subItems || [];
  const level2Index = level2Items.findIndex((item) => item.id === activeLevel2);
  
  // No active level 2, but we have level 2 items
  if (level2Index === -1 && level2Items.length > 0) {
    // Go to the last level 2 item of current level 1
    const lastLevel2 = level2Items[level2Items.length - 1];
    return {
      level1: activeLevel1,
      level2: lastLevel2.id,
      level3: lastLevel2.subItems && lastLevel2.subItems.length > 0
        ? lastLevel2.subItems[0].id
        : null,
      path: lastLevel2.path
    };
  }
  
  // No level 2 items available or no active level 2, move to previous level 1
  if (level2Index === -1 || level2Items.length === 0) {
    // If first level 1 item, stay there
    if (level1Index === 0) {
      return { level1: null, level2: null, level3: null, path: null };
    }
    
    // Move to previous level 1 item
    const prevLevel1 = navItems[level1Index - 1];
    const lastLevel2 = prevLevel1.subItems && prevLevel1.subItems.length > 0
      ? prevLevel1.subItems[prevLevel1.subItems.length - 1]
      : null;
    
    return {
      level1: prevLevel1.id,
      level2: lastLevel2 ? lastLevel2.id : null,
      level3: null,
      path: prevLevel1.path
    };
  }
  
  // At level 2 item, try to move to previous level 2 item
  if (level2Index > 0) {
    const prevLevel2 = level2Items[level2Index - 1];
    return {
      level1: activeLevel1,
      level2: prevLevel2.id,
      level3: prevLevel2.subItems && prevLevel2.subItems.length > 0
        ? prevLevel2.subItems[0].id
        : null,
      path: prevLevel2.path
    };
  } 
  
  // At first level 2 item, move to previous level 1 item's last level 2
  if (level1Index > 0) {
    const prevLevel1 = navItems[level1Index - 1];
    const lastLevel2 = prevLevel1.subItems && prevLevel1.subItems.length > 0
      ? prevLevel1.subItems[prevLevel1.subItems.length - 1]
      : null;
    
    return {
      level1: prevLevel1.id,
      level2: lastLevel2 ? lastLevel2.id : null,
      level3: null,
      path: prevLevel1.path
    };
  }
  
  // At first level 1 item, stay there
  return { level1: null, level2: null, level3: null, path: null };
}

/**
 * Find a navigation item by its ID
 */
export function findNavigationItem(
  itemId: string,
  items: NavigationItem[] = NAVIGATION_ITEMS
): NavigationItem | null {
  for (const item of items) {
    if (item.id === itemId) return item;
    if (item.subItems) {
      const found = findNavigationItem(itemId, item.subItems);
      if (found) return found;
    }
  }
  return null;
}

/**
 * Get the full path to a navigation item (level1 > level2 > level3)
 */
export function getNavigationPath(
  level1: string | null,
  level2: string | null,
  level3: string | null
): string[] {
  const path: string[] = [];
  
  if (level1) {
    const item1 = findNavigationItem(level1);
    if (item1) path.push(item1.name);
  }
  
  if (level2) {
    const item2 = findNavigationItem(level2);
    if (item2) path.push(item2.name);
  }
  
  if (level3) {
    const item3 = findNavigationItem(level3);
    if (item3) path.push(item3.name);
  }
  
  return path;
}