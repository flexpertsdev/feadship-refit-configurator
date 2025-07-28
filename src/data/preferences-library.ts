// ==================================================
// AI EXPLANATION: preferences-library.ts
// ==================================================
// WHAT: This file contains preferences-library.ts
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================

/**
 * Preferences Library
 * User preferences including activities, regions, design choices, and operation type
 */

import type { LibraryItem } from '@/types/yacht-v2';

export const PREFERENCES_LIBRARY: LibraryItem[] = [
  // ===== DESIGN COMPLEXITY =====
  {
    id: 'design_complexity_1',
    category: 'design_complexity',
    name: 'Clean',
    description: 'Minimalist design with clean lines',
    value: 1,
    image: '/assets/step1/bg1.jpg'
  },
  {
    id: 'design_complexity_2',
    category: 'design_complexity',
    name: 'Detailed',
    description: 'Balanced design with thoughtful details',
    value: 2,
    image: '/assets/step1/bg2.jpg'
  },
  {
    id: 'design_complexity_3',
    category: 'design_complexity',
    name: 'Complex',
    description: 'Rich design with intricate details',
    value: 3,
    image: '/assets/step1/bg3.jpg'
  },

  // ===== DESIGN TRADITIONAL =====
  {
    id: 'design_traditional_1',
    category: 'design_traditional',
    name: 'Traditional',
    description: 'Classic yacht design language',
    value: 1,
    image: '/assets/step2/bg1.jpg'
  },
  {
    id: 'design_traditional_2',
    category: 'design_traditional',
    name: 'Transitional',
    description: 'Blend of classic and modern',
    value: 2,
    image: '/assets/step2/bg2.jpg'
  },
  {
    id: 'design_traditional_3',
    category: 'design_traditional',
    name: 'Contemporary',
    description: 'Modern design approach',
    value: 3,
    image: '/assets/step2/bg3.jpg'
  },

  // ===== DESIGN RADICAL =====
  {
    id: 'design_radical_1',
    category: 'design_radical',
    name: 'Familiar',
    description: 'Proven design elements',
    value: 1,
    image: '/assets/step3/bg1.jpg'
  },
  {
    id: 'design_radical_2',
    category: 'design_radical',
    name: 'Explorative',
    description: 'Innovative design touches',
    value: 2,
    image: '/assets/step3/bg2.jpg'
  },
  {
    id: 'design_radical_3',
    category: 'design_radical',
    name: 'Radical',
    description: 'Groundbreaking design concepts',
    value: 3,
    image: '/assets/step3/bg3.jpg'
  },

  // ===== OPERATION TYPE =====
  {
    id: 'operation_private',
    category: 'operation',
    name: 'Private',
    description: 'Exclusive use for owner and guests',
    image: '/assets/operation/private.png'
  },
  {
    id: 'operation_charter',
    category: 'operation',
    name: 'Charter',
    description: 'Available for charter operations',
    image: '/assets/operation/charter.png'
  },

  // ===== ACTIVITIES =====
  {
    id: 'activity_diving',
    category: 'activities',
    name: 'Diving',
    description: 'Scuba diving and snorkeling',
    image: '/assets/activities/diving.jpg'
  },
  {
    id: 'activity_fishing',
    category: 'activities',
    name: 'Fishing',
    description: 'Sport fishing and deep sea fishing',
    image: '/assets/activities/fishing.jpg'
  },
  {
    id: 'activity_watersports',
    category: 'activities',
    name: 'Water Sports',
    description: 'Jet skiing, wakeboarding, and more',
    image: '/assets/activities/watersports.jpg'
  },
  {
    id: 'activity_sailing',
    category: 'activities',
    name: 'Sailing',
    description: 'Traditional sailing experience',
    image: '/assets/activities/sailing.jpg'
  },
  {
    id: 'activity_exploration',
    category: 'activities',
    name: 'Exploration',
    description: 'Remote destination exploration',
    image: '/assets/activities/exploration.jpg'
  },
  {
    id: 'activity_wellness',
    category: 'activities',
    name: 'Wellness',
    description: 'Spa, yoga, and relaxation',
    image: '/assets/activities/wellness.jpg'
  },
  {
    id: 'activity_entertainment',
    category: 'activities',
    name: 'Entertainment',
    description: 'Parties and social events',
    image: '/assets/activities/entertainment.jpg'
  },
  {
    id: 'activity_adventure',
    category: 'activities',
    name: 'Adventure',
    description: 'Extreme sports and activities',
    image: '/assets/activities/adventure.jpg'
  },
  {
    id: 'activity_wildlife',
    category: 'activities',
    name: 'Wildlife Watching',
    description: 'Marine life and bird watching',
    image: '/assets/activities/wildlife.jpg'
  },
  {
    id: 'activity_photography',
    category: 'activities',
    name: 'Photography',
    description: 'Underwater and landscape photography',
    image: '/assets/activities/photography.jpg'
  },
  {
    id: 'activity_research',
    category: 'activities',
    name: 'Research',
    description: 'Marine research and conservation',
    image: '/assets/activities/research.jpg'
  },
  {
    id: 'activity_racing',
    category: 'activities',
    name: 'Racing',
    description: 'Yacht racing and regattas',
    image: '/assets/activities/racing.jpg'
  },
  {
    id: 'activity_cultural',
    category: 'activities',
    name: 'Cultural Tours',
    description: 'Coastal cultural experiences',
    image: '/assets/activities/cultural.jpg'
  },
  {
    id: 'activity_beach',
    category: 'activities',
    name: 'Beach Activities',
    description: 'Beach sports and relaxation',
    image: '/assets/activities/beach.jpg'
  },
  {
    id: 'activity_helicopter',
    category: 'activities',
    name: 'Helicopter Tours',
    description: 'Aerial exploration',
    image: '/assets/activities/helicopter.jpg'
  },
  {
    id: 'activity_submarine',
    category: 'activities',
    name: 'Submarine Dives',
    description: 'Deep sea exploration',
    image: '/assets/activities/submarine.jpg'
  },
  {
    id: 'activity_kitesurfing',
    category: 'activities',
    name: 'Kitesurfing',
    description: 'Wind-powered water sports',
    image: '/assets/activities/kitesurfing.jpg'
  },

  // ===== REGIONS =====
  {
    id: 'region_mediterranean',
    category: 'regions',
    name: 'Mediterranean',
    description: 'French Riviera, Italy, Greece',
    image: '/assets/regions/mediterranean.jpg'
  },
  {
    id: 'region_caribbean',
    category: 'regions',
    name: 'Caribbean',
    description: 'Bahamas, Virgin Islands, St. Barts',
    image: '/assets/regions/caribbean.jpg'
  },
  {
    id: 'region_pacific',
    category: 'regions',
    name: 'Pacific',
    description: 'Tahiti, Fiji, New Zealand',
    image: '/assets/regions/pacific.jpg'
  },
  {
    id: 'region_atlantic',
    category: 'regions',
    name: 'Atlantic',
    description: 'US East Coast, Northern Europe',
    image: '/assets/regions/atlantic.jpg'
  },
  {
    id: 'region_indian',
    category: 'regions',
    name: 'Indian Ocean',
    description: 'Maldives, Seychelles, Mauritius',
    image: '/assets/regions/indian.jpg'
  },
  {
    id: 'region_arctic',
    category: 'regions',
    name: 'Arctic',
    description: 'Norway, Greenland, Svalbard',
    image: '/assets/regions/arctic.jpg'
  },
  {
    id: 'region_antarctica',
    category: 'regions',
    name: 'Antarctica',
    description: 'Antarctic Peninsula exploration',
    image: '/assets/regions/antarctica.jpg'
  },
  {
    id: 'region_southeast_asia',
    category: 'regions',
    name: 'Southeast Asia',
    description: 'Thailand, Indonesia, Malaysia',
    image: '/assets/regions/southeast-asia.jpg'
  }
];

// Helper functions
export function getPreferencesByCategory(category: string): LibraryItem[] {
  return PREFERENCES_LIBRARY.filter(item => item.category === category);
}

export function getPreferenceById(id: string): LibraryItem | undefined {
  return PREFERENCES_LIBRARY.find(item => item.id === id);
}

export function getPreferencesByIds(ids: string[]): LibraryItem[] {
  return PREFERENCES_LIBRARY.filter(item => ids.includes(item.id));
}

// Get design level value from preferences
export function getDesignLevelFromPreferences(preferences: string[], category: string): number {
  const pref = preferences.find(id => id.startsWith(category));
  if (!pref) return 2; // default middle value
  
  const item = getPreferenceById(pref);
  return item?.value || 2;
}

// Set design level in preferences
export function setDesignLevelInPreferences(preferences: string[], category: string, value: number): string[] {
  // Remove old preference for this category
  const filtered = preferences.filter(id => !id.startsWith(category));
  // Add new one
  const newId = `${category}_${value}`;
  return [...filtered, newId];
}