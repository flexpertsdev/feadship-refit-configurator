// ==================================================
// AI EXPLANATION: navigationHelpers.ts
// ==================================================
// WHAT: Helper functions for navigation state management including Level 2/3 defaults and paint group mapping
// WHY: Without this, navigation state wouldn't sync properly between Level 1/2/3 selections and paint color groups
// USED BY: Level1Navigation, NavigationBar, SimplePaintPanel, ConfiguratorPage for navigation state updates
// CRITICAL: YES - Ensures navigation state consistency across all levels and paint color filtering
// ==================================================

import { YachtConfigV2 } from '@/types/yacht-v2';

// Get default Level 2 for each Level 1 item
export function getDefaultLevel2ForLevel1(level1: string): string | null {
  const defaults: Record<string, string | null> = {
    'DESIGN': 'clean',
    'OPERATION': 'where',
    'PAINT': 'hull',
    'FEATURES': 'exterior',
    'SUSTAINABILITY': 'power',
    'SERVICES': 'suite',
    'EXTENSIONS': null,
    'SUMMARY': null
  };
  return defaults[level1] || null;
}

// Convert paint group to Level 3 navigation ID
export function getLevel3FromPaintGroup(group: string): string {
  // Paint groups are already normalized in v2 (e.g., 'whites-beiges', 'greens')
  // Just return the group as-is since it should match navigation IDs
  return group;
}

// Get paint group from yacht's current paint config for a part
export function getPaintGroupFromYacht(yacht: YachtConfigV2, part: string): string | null {
  const paintConfig = yacht.paint[part as keyof YachtConfigV2['paint']];
  return paintConfig?.group || null;
}

// Get appropriate Level 3 when navigating to a paint part
export function getLevel3ForPaintPart(yacht: YachtConfigV2, part: string): string {
  const group = getPaintGroupFromYacht(yacht, part);
  if (!group) {
    // Default groups if no paint config exists (should not happen as yachts have defaults)
    const defaults: Record<string, string> = {
      'hull': 'greens', // Default hull is green
      'superstructure': 'whites-beiges',
      'deckhouse': 'whites-beiges',
      'mast': 'whites-beiges',
      'bootstripe': 'whites-beiges'
    };
    return defaults[part] || 'custom-colours';
  }
  return getLevel3FromPaintGroup(group);
}