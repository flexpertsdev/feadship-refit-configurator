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
    image: '/assets/preferences/design/complexity/1.jpg'
  },
  {
    id: 'design_complexity_2',
    category: 'design_complexity',
    name: 'Detailed',
    description: 'Balanced design with thoughtful details',
    value: 2,
    image: '/assets/preferences/design/complexity/2.jpg'
  },
  {
    id: 'design_complexity_3',
    category: 'design_complexity',
    name: 'Complex',
    description: 'Rich design with intricate details',
    value: 3,
    image: '/assets/preferences/design/complexity/3.jpg'
  },
  {
    id: 'design_complexity_4',
    category: 'design_complexity',
    name: 'Elaborate',
    description: 'Highly detailed design language',
    value: 4,
    image: '/assets/preferences/design/complexity/4.jpg'
  },
  {
    id: 'design_complexity_5',
    category: 'design_complexity',
    name: 'Intricate',
    description: 'Maximum complexity and detail',
    value: 5,
    image: '/assets/preferences/design/complexity/5.jpg'
  },

  // ===== DESIGN STYLE =====
  {
    id: 'design_style_1',
    category: 'design_style',
    name: 'Traditional',
    description: 'Classic yacht design language',
    value: 1,
    image: '/assets/preferences/design/style/1.jpg'
  },
  {
    id: 'design_style_2',
    category: 'design_style',
    name: 'Transitional',
    description: 'Blend of classic and modern',
    value: 2,
    image: '/assets/preferences/design/style/2.jpg'
  },
  {
    id: 'design_style_3',
    category: 'design_style',
    name: 'Contemporary',
    description: 'Modern design approach',
    value: 3,
    image: '/assets/preferences/design/style/3.jpg'
  },
  {
    id: 'design_style_4',
    category: 'design_style',
    name: 'Progressive',
    description: 'Forward-thinking design',
    value: 4,
    image: '/assets/preferences/design/style/4.jpg'
  },
  {
    id: 'design_style_5',
    category: 'design_style',
    name: 'Futuristic',
    description: 'Cutting-edge modern design',
    value: 5,
    image: '/assets/preferences/design/style/5.jpg'
  },

  // ===== DESIGN TRADITIONAL =====
  {
    id: 'design_traditional_1',
    category: 'design_traditional',
    name: 'Heritage',
    description: 'Time-honored yacht craftsmanship',
    value: 1,
    image: '/assets/preferences/design/traditional/1.jpg'
  },
  {
    id: 'design_traditional_2',
    category: 'design_traditional',
    name: 'Classic',
    description: 'Proven traditional elements',
    value: 2,
    image: '/assets/preferences/design/traditional/2.jpg'
  },
  {
    id: 'design_traditional_3',
    category: 'design_traditional',
    name: 'Balanced',
    description: 'Mix of traditional and modern',
    value: 3,
    image: '/assets/preferences/design/traditional/3.jpg'
  },
  {
    id: 'design_traditional_4',
    category: 'design_traditional',
    name: 'Progressive',
    description: 'Modern interpretation of classics',
    value: 4,
    image: '/assets/preferences/design/traditional/4.jpg'
  },
  {
    id: 'design_traditional_5',
    category: 'design_traditional',
    name: 'Innovative',
    description: 'Breaking traditional boundaries',
    value: 5,
    image: '/assets/preferences/design/traditional/5.jpg'
  },

  // ===== OPERATION TYPE =====
  {
    id: 'operation_private',
    category: 'operation',
    name: 'Private',
    description: 'Using your Feadship for ‘private use only’ means that it is exclusively for the owner, family, and invited guests. The yacht is not chartered or rented out for commercial purposes. This allows for a highly personalized experience, with custom interiors, a dedicated crew catering solely to your preferences, and complete privacy.',
    image: '/assets/preferences/operations/private.png'
  },
  {
    id: 'operation_charter',
    category: 'operation',
    name: 'Charter',
    description: 'Using your Feadship for ‘charter purposes’ means renting it out to guests for a fee. This helps offset operational costs, including maintenance and crew salaries, while keeping the yacht active. The crew provides a premium hospitality experience, ensuring guests enjoy luxury services and amenities.',
    image: '/assets/preferences/operations/charter.png'
  },

  // ===== ACTIVITIES =====
  {
    id: 'activity_diving',
    category: 'activities',
    name: 'Diving',
    description: 'Scuba diving and snorkeling',
    image: '/assets/preferences/activities/diving.jpg'
  },
  {
    id: 'activity_cinema',
    category: 'activities',
    name: 'Cinema',
    description: 'Private movie screenings',
    image: '/assets/preferences/activities/cinema.jpg'
  },
  {
    id: 'activity_family_cooking',
    category: 'activities',
    name: 'Family Cooking',
    description: 'Culinary experiences together',
    image: '/assets/preferences/activities/family-cooking.jpg'
  },
  {
    id: 'activity_gym',
    category: 'activities',
    name: 'Fitness',
    description: 'Gym and workout facilities',
    image: '/assets/preferences/activities/gym.jpg'
  },
  {
    id: 'activity_dining',
    category: 'activities',
    name: 'Fine Dining',
    description: 'Indoor and outdoor dining experiences',
    image: '/assets/preferences/activities/in-out-dining.jpg'
  },
  {
    id: 'activity_jacuzzi',
    category: 'activities',
    name: 'Jacuzzi',
    description: 'Relaxation in luxury hot tubs',
    image: '/assets/preferences/activities/jacuzzi.jpg'
  },
  {
    id: 'activity_jetski',
    category: 'activities',
    name: 'Jet Skiing',
    description: 'High-speed water sports',
    image: '/assets/preferences/activities/jet-skis.jpg'
  },
  {
    id: 'activity_karaoke',
    category: 'activities',
    name: 'Karaoke Night',
    description: 'Entertainment and singing',
    image: '/assets/preferences/activities/karaoke-night.jpg'
  },
  {
    id: 'activity_massage',
    category: 'activities',
    name: 'Massage & Spa',
    description: 'Relaxation and wellness treatments',
    image: '/assets/preferences/activities/massage.jpg'
  },
  {
    id: 'activity_remote',
    category: 'activities',
    name: 'Remote Places',
    description: 'Exploring untouched destinations',
    image: '/assets/preferences/activities/remote-places.jpg'
  },
  {
    id: 'activity_sauna',
    category: 'activities',
    name: 'Sauna',
    description: 'Heat therapy and relaxation',
    image: '/assets/preferences/activities/sauna.jpg'
  },
  {
    id: 'activity_swimming',
    category: 'activities',
    name: 'Swimming',
    description: 'Pool and ocean swimming',
    image: '/assets/preferences/activities/swimming.jpg'
  },
  {
    id: 'activity_water_toys',
    category: 'activities',
    name: 'Water Toys',
    description: 'Fun with various water equipment',
    image: '/assets/preferences/activities/water-toys.jpg'
  },
  {
    id: 'activity_wildlife',
    category: 'activities',
    name: 'Wildlife Spotting',
    description: 'Marine life and bird watching',
    image: '/assets/preferences/activities/wildlife-spotting.jpg'
  },
  {
    id: 'activity_wine',
    category: 'activities',
    name: 'Wine Tasting',
    description: 'Fine wine experiences',
    image: '/assets/preferences/activities/wine-tasrting.jpg'
  },
  {
    id: 'activity_yoga',
    category: 'activities',
    name: 'Yoga',
    description: 'Mindfulness and flexibility',
    image: '/assets/preferences/activities/yoga.jpg'
  },
  {
    id: 'activity_fishing',
    category: 'activities',
    name: 'Fishing',
    description: 'Sport fishing adventures',
    image: '/assets/preferences/activities/folling.jpg'
  },

  // ===== ROUTES =====
  {
    id: 'route_northwest_passage',
    category: 'routes',
    name: 'North West Passage',
    description: 'Arctic navigation route',
    image: '/assets/preferences/routes/NorthWest.svg'
  },
  {
    id: 'route_west_coast',
    category: 'routes',
    name: 'West Coast',
    description: 'Pacific coastline cruising',
    image: '/assets/preferences/routes/WestCoast.svg'
  },
  {
    id: 'route_east_coast',
    category: 'routes',
    name: 'East Coast',
    description: 'Atlantic coastline exploration',
    image: '/assets/preferences/routes/East Cost.svg'
  },
  {
    id: 'route_caribbean',
    category: 'routes',
    name: 'Caribbean',
    description: 'Island hopping paradise',
    image: '/assets/preferences/routes/Carribbean.svg'
  },
  {
    id: 'route_galapagos',
    category: 'routes',
    name: 'Galapagos',
    description: 'Unique wildlife encounters',
    image: '/assets/preferences/routes/Galapagos.svg'
  },
  {
    id: 'route_nordics',
    category: 'routes',
    name: 'Nordics',
    description: 'Scandinavian fjords and islands',
    image: '/assets/preferences/routes/Nordics.svg'
  },
  {
    id: 'route_mediterranean',
    category: 'routes',
    name: 'Mediterranean',
    description: 'Classic European cruising',
    image: '/assets/preferences/routes/Medditerranean.svg'
  },
  {
    id: 'route_suez_canal',
    category: 'routes',
    name: 'Suez Canal',
    description: 'Historic trade route passage',
    image: '/assets/preferences/routes/Map.png'
  },
  {
    id: 'route_french_polynesia',
    category: 'routes',
    name: 'French Polynesia',
    description: 'Tahiti and surrounding islands',
    image: '/assets/preferences/routes/French.svg'
  },
  {
    id: 'route_australasia',
    category: 'routes',
    name: 'Australasia',
    description: 'Australia and New Zealand waters',
    image: '/assets/preferences/routes/Australia.svg'
  },
  {
    id: 'route_patagonia',
    category: 'routes',
    name: 'Patagonia',
    description: 'Southern tip adventures',
    image: '/assets/preferences/routes/Patagonia.svg'
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