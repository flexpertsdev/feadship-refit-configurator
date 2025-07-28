// ==================================================
// AI EXPLANATION: configs-library.ts
// ==================================================
// WHAT: Central configuration data library containing all yacht features, equipment, sustainability options, and services with metadata and helper functions
// WHY: Without this, no features/configs would be available for selection - it's the master data source for all yacht customization options
// USED BY: useFeatureSelection hook, SummaryPage, feature pages, any component displaying or filtering yacht configuration options
// CRITICAL: YES - Core data source for all yacht features and configurations, modifying affects available options throughout app
// ==================================================

/**
 * Configs Library
 * Physical features, equipment, sustainability options, and services that can be added to a yacht
 */

import type { LibraryItem } from '@/types/yacht-v2';

export const CONFIGS_LIBRARY: LibraryItem[] = [
  // ===== EXTERIOR FEATURES =====
  {
    id: 'jacuzzi',
    category: 'exterior',
    name: 'Jacuzzi',
    description: 'Luxurious outdoor jacuzzi with ocean views',
    image: '/assets/features/exterior/jacuzzi.jpg'
  },
  {
    id: 'pool_fixed',
    category: 'exterior',
    name: 'Fixed Pool',
    description: 'Temperature-controlled swimming pool',
    image: '/assets/features/exterior/pool-fixed.jpg'
  },
  {
    id: 'pool_infinity',
    category: 'exterior',
    name: 'Infinity Pool',
    description: 'Stunning infinity edge pool',
    image: '/assets/features/exterior/pool-infinity.jpg'
  },
  {
    id: 'helipad',
    category: 'exterior',
    name: 'Helipad',
    description: 'Certified helicopter landing pad',
    image: '/assets/features/exterior/helipad.jpg'
  },
  {
    id: 'sun_deck_extension',
    category: 'exterior',
    name: 'Sun Deck Extension',
    description: 'Extended sun lounging area',
    image: '/assets/features/exterior/sun-deck.jpg'
  },
  {
    id: 'beach_club',
    category: 'exterior',
    name: 'Beach Club',
    description: 'Water-level beach club with platforms',
    image: '/assets/features/exterior/beach-club.jpg'
  },
  {
    id: 'tender_garage',
    category: 'exterior',
    name: 'Tender Garage',
    description: 'Enclosed garage for tenders and toys',
    image: '/assets/features/exterior/tender-garage.jpg'
  },
  {
    id: 'submarine_bay',
    category: 'exterior',
    name: 'Submarine Bay',
    description: 'Dedicated submarine storage and launch',
    image: '/assets/features/exterior/submarine-bay.jpg'
  },

  // ===== INTERIOR FEATURES =====
  {
    id: 'cinema',
    category: 'interior',
    name: 'Cinema Room',
    description: 'Private cinema with latest technology',
    image: '/assets/features/interior/cinema.jpg'
  },
  {
    id: 'spa',
    category: 'interior',
    name: 'Spa & Wellness',
    description: 'Full spa with treatment rooms',
    image: '/assets/features/interior/spa.jpg'
  },
  {
    id: 'gym',
    category: 'interior',
    name: 'Gymnasium',
    description: 'Fully equipped fitness center',
    image: '/assets/features/interior/gym.jpg'
  },
  {
    id: 'wine_cellar',
    category: 'interior',
    name: 'Wine Cellar',
    description: 'Temperature-controlled wine storage',
    image: '/assets/features/interior/wine-cellar.jpg'
  },
  {
    id: 'office',
    category: 'interior',
    name: 'Office Suite',
    description: 'Private office with conference facilities',
    image: '/assets/features/interior/office.jpg'
  },
  {
    id: 'observatory',
    category: 'interior',
    name: 'Observatory',
    description: 'Glass-ceiling observation lounge',
    image: '/assets/features/interior/observatory.jpg'
  },
  {
    id: 'art_gallery',
    category: 'interior',
    name: 'Art Gallery',
    description: 'Climate-controlled art display space',
    image: '/assets/features/interior/art-gallery.jpg'
  },
  {
    id: 'library',
    category: 'interior',
    name: 'Library',
    description: 'Classic wood-paneled library',
    image: '/assets/features/interior/library.jpg'
  },

  // ===== TOYS & TENDERS =====
  {
    id: 'jetski',
    category: 'toys',
    name: 'Jet Skis',
    description: 'High-performance personal watercraft',
    image: '/assets/features/toys/jetski.jpg'
  },
  {
    id: 'submarine',
    category: 'toys',
    name: 'Submarine',
    description: 'Personal luxury submarine',
    image: '/assets/features/toys/submarine.jpg'
  },
  {
    id: 'diving_equipment',
    category: 'toys',
    name: 'Diving Equipment',
    description: 'Complete diving station with compressor',
    image: '/assets/features/toys/diving.jpg'
  },
  {
    id: 'fishing_gear',
    category: 'toys',
    name: 'Fishing Gear',
    description: 'Professional fishing equipment',
    image: '/assets/features/toys/fishing.jpg'
  },
  {
    id: 'seabob',
    category: 'toys',
    name: 'Seabobs',
    description: 'Underwater scooters',
    image: '/assets/features/toys/seabob.jpg'
  },
  {
    id: 'wakeboard',
    category: 'toys',
    name: 'Wakeboard & Ski',
    description: 'Water skiing and wakeboard equipment',
    image: '/assets/features/toys/wakeboard.jpg'
  },
  {
    id: 'classic_tender',
    category: 'toys',
    name: 'Classic Tender',
    description: 'Elegant wooden tender',
    image: '/assets/features/toys/classic-tender.jpg'
  },

  // ===== SUSTAINABILITY =====
  {
    id: 'solar_panels',
    category: 'sustainability',
    name: 'Solar Panels',
    description: 'High-efficiency solar power generation',
    image: '/assets/features/sustainability/solar.jpg'
  },
  {
    id: 'water_recycling',
    category: 'sustainability',
    name: 'Water Recycling',
    description: 'Advanced water treatment and recycling',
    image: '/assets/features/sustainability/water.jpg'
  },
  {
    id: 'hybrid_propulsion',
    category: 'sustainability',
    name: 'Hybrid Propulsion',
    description: 'Diesel-electric hybrid engines',
    image: '/assets/features/sustainability/hybrid.jpg'
  },
  {
    id: 'hydrogen_fuel_cell',
    category: 'sustainability',
    name: 'Hydrogen Fuel Cell',
    description: 'Zero-emission hydrogen power',
    image: '/assets/features/sustainability/hydrogen.jpg'
  },
  {
    id: 'wind_turbine',
    category: 'sustainability',
    name: 'Wind Turbines',
    description: 'Retractable wind power generators',
    image: '/assets/features/sustainability/wind.jpg'
  },

  // ===== SERVICES =====
  {
    id: 'crew_training',
    category: 'services',
    name: 'Crew Training Program',
    description: 'Comprehensive crew education and certification',
    image: '/assets/features/services/crew-training.jpg'
  },
  {
    id: 'maintenance_plan',
    category: 'services',
    name: 'Maintenance Plan',
    description: 'Full-service maintenance program',
    image: '/assets/features/services/maintenance.jpg'
  },
  {
    id: 'concierge_service',
    category: 'services',
    name: 'Concierge Service',
    description: '24/7 global concierge support',
    image: '/assets/features/services/concierge.jpg'
  },
  {
    id: 'insurance_package',
    category: 'services',
    name: 'Insurance Package',
    description: 'Comprehensive yacht insurance',
    image: '/assets/features/services/insurance.jpg'
  },
  {
    id: 'charter_management',
    category: 'services',
    name: 'Charter Management',
    description: 'Professional charter operations',
    image: '/assets/features/services/charter.jpg'
  }
];

// Helper functions
export function getConfigsByCategory(category: string): LibraryItem[] {
  return CONFIGS_LIBRARY.filter(item => item.category === category);
}

export function getConfigById(id: string): LibraryItem | undefined {
  return CONFIGS_LIBRARY.find(item => item.id === id);
}

export function getConfigsByIds(ids: string[]): LibraryItem[] {
  return CONFIGS_LIBRARY.filter(item => ids.includes(item.id));
}

// Get all unique categories
export function getConfigCategories(): string[] {
  return [...new Set(CONFIGS_LIBRARY.map(item => item.category))];
}