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
    description: 'Add a touch of indulgence with a Jacuzzi on board. Perfect for unwinding and soaking in the view, whether enjoying a quiet moment alone or sharing with loved ones.',
    image: '/assets/configs/exterior/Jacuzzi.jpg'
  },
  {
    id: 'pool_fixed',
    category: 'exterior',
    name: 'Fixed Pool',
    description: 'A large aft infinity pool offers enjoyment for everyone on board. Perfect when the sea is less comfortable due to currents, waves, or sea life.',
    image: '/assets/configs/exterior/Pool-fixed.jpg'
  },
  {
    id: 'pool_variable',
    category: 'exterior',
    name: 'Variable Pool',
    description: 'Adjustable depth pool system',
    image: '/assets/configs/exterior/Pool-variable.jpg'
  },
  {
    id: 'helipad',
    category: 'exterior',
    name: 'Helicopter Platform',
    description: 'Elevate your yacht experience with quick and easy landings. Explore distant shores or enjoy the excitement of helicopter flights.',
    image: '/assets/configs/exterior/Helicopterplatform.png'
  },
  {
    id: 'balconies',
    category: 'exterior',
    name: 'Balconies',
    description: 'Private balconies with ocean views',
    image: '/assets/configs/exterior/Balconies.jpg'
  },
  {
    id: 'crowsnest',
    category: 'exterior',
    name: "Crow's Nest",
    description: 'Elevated observation deck',
    image: '/assets/configs/exterior/Crowsnest.jpg'
  },
  {
    id: 'dog_relief',
    category: 'exterior',
    name: 'Dog Relief Area',
    description: 'Dedicated pet relief zone',
    image: '/assets/configs/exterior/DogRelief.png'
  },
  {
    id: 'submarine_bay',
    category: 'exterior',
    name: 'Submarine Bay',
    description: 'Dedicated submarine storage and launch',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Submarine+Bay'
  },

  // ===== INTERIOR FEATURES =====
  {
    id: 'cinema',
    category: 'interior',
    name: 'Cinema Room',
    description: 'Private cinema with latest technology',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Cinema'
  },
  {
    id: 'spa',
    category: 'interior',
    name: 'Spa & Wellness',
    description: 'Full spa with treatment rooms',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Spa'
  },
  {
    id: 'gym',
    category: 'interior',
    name: 'Gymnasium',
    description: 'Fully equipped fitness center',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Gym'
  },
  {
    id: 'wine_cellar',
    category: 'interior',
    name: 'Wine Cellar',
    description: 'Create a dedicated wine cellar with tasting room. Carefully managed temperature and movement control for perfect wine storage at sea.',
    image: '/assets/configs/interior/Winecellar.jpg'
  },
  {
    id: 'beach_club',
    category: 'interior',
    name: 'Beach Club',
    description: 'The ultimate waterfront experience at water level with direct sea access. Perfect for lounging in the sun or diving straight into the water.',
    image: '/assets/configs/interior/Beachclub.jpg'
  },
  {
    id: 'nemo_lounge',
    category: 'interior',
    name: 'Nemo Lounge',
    description: 'Underwater observation lounge',
    image: '/assets/configs/interior/NemoLounge.jpg'
  },
  {
    id: 'wheelhouse_upgrade',
    category: 'interior',
    name: 'Wheelhouse Upgrade',
    description: 'Advanced bridge and control systems',
    image: '/assets/configs/interior/Wheelhouseupgrade.jpg'
  },
  {
    id: 'additional_guest_cabin',
    category: 'interior',
    name: 'Additional Guest Cabin',
    description: 'Extra luxury guest accommodation',
    image: '/assets/configs/interior/Additionalguestcabin.png'
  },

  // ===== TOYS & TENDERS =====
  {
    id: 'jetski',
    category: 'toys',
    name: 'Waverunners & Jet Skis',
    description: 'High-performance personal watercraft',
    image: '/assets/configs/toys/Waverunnersjetski_s.jpg'
  },
  {
    id: 'submarine',
    category: 'toys',
    name: 'Submarine',
    description: 'Personal luxury submarine',
    image: '/assets/configs/toys/Submarine.jpg'
  },
  {
    id: 'helicopters',
    category: 'toys',
    name: 'Helicopters',
    description: 'Luxury helicopters for yacht transport',
    image: '/assets/configs/toys/Helicopters.jpg'
  },
  {
    id: 'fishing_gear',
    category: 'toys',
    name: 'Fishing Gear',
    description: 'Professional fishing equipment',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Fishing+Gear'
  },
  {
    id: 'seabob',
    category: 'toys',
    name: 'Seabobs',
    description: 'Underwater scooters',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Seabobs'
  },
  {
    id: 'wakeboard',
    category: 'toys',
    name: 'Wakeboard & Ski',
    description: 'Water skiing and wakeboard equipment',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Wakeboard'
  },
  {
    id: 'classic_tender',
    category: 'toys',
    name: 'Classic Tender',
    description: 'Elegant wooden tender',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Classic+Tender'
  },

  // ===== SUSTAINABILITY =====
  {
    id: 'solar_panels',
    category: 'sustainability',
    name: 'Solar Panels',
    description: 'High-efficiency solar power generation',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Solar+Panels'
  },
  {
    id: 'water_recycling',
    category: 'sustainability',
    name: 'Water Recycling',
    description: 'Advanced water treatment and recycling',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Water+Recycling'
  },
  {
    id: 'hybrid_propulsion',
    category: 'sustainability',
    name: 'Hybrid Propulsion',
    description: 'Diesel-electric hybrid engines',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Hybrid+Propulsion'
  },
  {
    id: 'hydrogen_fuel_cell',
    category: 'sustainability',
    name: 'Hydrogen Fuel Cell',
    description: 'Zero-emission hydrogen power',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Hydrogen+Fuel'
  },
  {
    id: 'wind_turbine',
    category: 'sustainability',
    name: 'Wind Turbines',
    description: 'Retractable wind power generators',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Wind+Turbines'
  },

  // ===== SERVICES =====
  {
    id: 'crew_academy',
    category: 'services',
    name: 'Crew Academy',
    description: 'Comprehensive crew education and certification',
    image: '/assets/configs/services/crew-academy.jpg',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'  // Sample YouTube embed URL
  },
  {
    id: 'extended_warranty',
    category: 'services',
    name: 'Extended Warranty',
    description: 'Extended warranty and protection plan',
    image: '/assets/configs/services/extended-warrantry.jpg',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'  // Sample YouTube embed URL
  },
  {
    id: 'remote_monitoring',
    category: 'services',
    name: 'Polestar Remote Monitoring',
    description: '24/7 yacht systems monitoring',
    image: '/assets/configs/services/polestar-remote-monitoring.jpg',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'  // Sample YouTube embed URL
  },
  {
    id: 'certificate_of_authenticity',
    category: 'services',
    name: 'Certificate of Authenticity',
    description: 'Official Feadship authentication',
    image: '/assets/configs/services/certificate-of-auth.jpg'
  },
  {
    id: 'charter_management',
    category: 'services',
    name: 'Charter Management',
    description: 'Professional charter operations',
    image: 'https://placehold.co/400x300/1a1a2e/ffffff?text=Charter+Management'
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