// ==================================================
// AI EXPLANATION: yacht-features.ts
// ==================================================
// WHAT: Legacy feature configuration file containing yacht models and features data - appears to be replaced by configs-library.ts in V2 architecture
// WHY: Without this, legacy code referencing old feature structure might break - but this appears to be superseded by the new data structure
// USED BY: Likely no active usage - replaced by configs-library.ts and yacht-models-library.ts in V2 system
// CRITICAL: NO - Legacy data file, new system uses configs-library for features
// ==================================================

/**
 * Yacht Features Library
 * Physical features and equipment that can be added to a yacht
 */

import type { YachtFeature, YachtModel } from './types';

export const YACHT_FEATURES: YachtFeature[] = [
  // Yacht Models
  {
    id: 'feadship-75',
    type: 'model',
    name: 'Feadship 75',
    series: 'Classic',
    length: 75,
    availableFeatures: [
      'jacuzzi', 'pool-fixed', 'cinema', 'spa', 'gym', 
      'beach-club', 'tender-garage', 'wine-cellar'
    ],
    defaultFeatures: ['jacuzzi', 'cinema'],
    incompatibleFeatures: ['helipad', 'submarine-bay', 'pool-infinity']
  },
  {
    id: 'feadship-120',
    type: 'model',
    name: 'Feadship 120',
    series: 'Superyacht',
    length: 120,
    availableFeatures: [
      'jacuzzi', 'pool-fixed', 'pool-infinity', 'helipad',
      'beach-club', 'submarine-bay', 'cinema', 'spa', 'gym',
      'tender-garage', 'wine-cellar', 'observatory'
    ],
    defaultFeatures: ['jacuzzi', 'cinema', 'gym', 'beach-club', 'tender-garage']
  },
  
  // Exterior Features
  {
    id: 'jacuzzi',
    type: 'feature',
    category: 'exterior',
    name: 'Jacuzzi',
    image: '/assets/features/exterior/jacuzzi.jpg',
    details: 'Luxurious outdoor jacuzzi with ocean views',
    detailsExtended: 'Temperature-controlled outdoor spa for 8 guests with integrated lighting and massage jets',
    requiresSpace: true
  },
  {
    id: 'pool-fixed',
    type: 'feature',
    category: 'exterior',
    name: 'Fixed Pool',
    image: '/assets/features/exterior/pool-fixed.jpg',
    details: 'Elegant fixed swimming pool',
    detailsExtended: 'Salt water pool with counter-current system for swimming in place',
    requiresSpace: true,
    requiresStructural: true
  },
  {
    id: 'pool-infinity',
    type: 'feature',
    category: 'exterior',
    name: 'Infinity Pool',
    image: '/assets/features/exterior/pool-infinity.jpg',
    details: 'Stunning infinity edge pool',
    detailsExtended: 'Glass-edge infinity pool that appears to merge with the ocean',
    requiresSpace: true,
    requiresStructural: true
  },
  {
    id: 'helipad',
    type: 'feature',
    category: 'exterior',
    name: 'Helipad',
    image: '/assets/features/exterior/helipad.jpg',
    details: 'Certified helicopter landing pad',
    detailsExtended: 'Touch-and-go certified helipad with night landing capabilities',
    requiresSpace: true,
    requiresStructural: true
  },
  {
    id: 'beach-club',
    type: 'feature',
    category: 'exterior',
    name: 'Beach Club',
    image: '/assets/features/exterior/beach-club.jpg',
    details: 'Water-level beach club with fold-out platforms',
    detailsExtended: 'Expansive beach club with swim platform, bar, and water sports storage',
    requiresStructural: true
  },
  
  // Interior Features
  {
    id: 'cinema',
    type: 'feature',
    category: 'interior',
    name: 'Cinema',
    image: '/assets/features/interior/cinema.jpg',
    details: 'Private cinema with latest technology',
    detailsExtended: 'Dolby Atmos cinema for 12 guests with 4K projection and reclining seats'
  },
  {
    id: 'spa',
    type: 'feature',
    category: 'interior',
    name: 'Spa',
    image: '/assets/features/interior/spa.jpg',
    details: 'Full-service spa and wellness center',
    detailsExtended: 'Professional spa with treatment rooms, sauna, steam room, and relaxation area',
    requiresSpace: true
  },
  {
    id: 'gym',
    type: 'feature',
    category: 'interior',
    name: 'Gym',
    image: '/assets/features/interior/gym.jpg',
    details: 'Fully equipped fitness center',
    detailsExtended: 'State-of-the-art gym with cardio and weight equipment, mirror walls, and ocean views'
  },
  {
    id: 'wine-cellar',
    type: 'feature',
    category: 'interior',
    name: 'Wine Cellar',
    image: '/assets/features/interior/wine-cellar.jpg',
    details: 'Temperature-controlled wine storage',
    detailsExtended: 'Walk-in wine cellar with capacity for 1000 bottles and tasting area'
  },
  {
    id: 'observatory',
    type: 'feature',
    category: 'interior',
    name: 'Observatory',
    image: '/assets/features/interior/observatory.jpg',
    details: 'Stargazing observatory with retractable roof',
    detailsExtended: 'Glass-domed observatory with telescope and celestial navigation equipment',
    requiresStructural: true
  },
  
  // Equipment & Toys
  {
    id: 'tender-garage',
    type: 'feature',
    category: 'toys_and_tender',
    name: 'Tender Garage',
    image: '/assets/features/equipment/tender-garage.jpg',
    details: 'Concealed storage for tenders and toys',
    detailsExtended: 'Hydraulic garage for multiple tenders with launching system',
    requiresStructural: true
  },
  {
    id: 'submarine-bay',
    type: 'feature',
    category: 'toys_and_tender',
    name: 'Submarine Bay',
    image: '/assets/features/equipment/submarine-bay.jpg',
    details: 'Dedicated submarine storage and launch',
    detailsExtended: 'Flooded bay for 3-person submarine with crane system',
    requiresStructural: true
  },
  {
    id: 'jet-ski-dock',
    type: 'feature',
    category: 'toys_and_tender',
    name: 'Jet Ski Dock',
    image: '/assets/features/toys/jet-ski-dock.jpg',
    details: 'Integrated jet ski storage and launch',
    detailsExtended: 'Hydraulic platform for 4 jet skis with easy launch and recovery'
  },
  {
    id: 'dive-center',
    type: 'feature',
    category: 'toys_and_tender',
    name: 'Dive Center',
    image: '/assets/features/toys/dive-center.jpg',
    details: 'Complete diving facility',
    detailsExtended: 'Professional dive center with compressor, gear storage, and rinse station'
  },
  
  // Additional Features
  {
    id: 'elevator',
    type: 'feature',
    category: 'additional',
    name: 'Elevator',
    image: '/assets/features/additional/elevator.jpg',
    details: 'Glass elevator connecting all decks',
    detailsExtended: 'Panoramic glass elevator with ocean views connecting all guest decks',
    requiresStructural: true
  },
  {
    id: 'fire-pit',
    type: 'feature',
    category: 'additional',
    name: 'Fire Pit',
    image: '/assets/features/additional/fire-pit.jpg',
    details: 'Outdoor fire pit lounge',
    detailsExtended: 'Gas fire pit with surrounding seating for evening gatherings'
  },
  {
    id: 'art-gallery',
    type: 'feature',
    category: 'additional',
    name: 'Art Gallery',
    image: '/assets/features/additional/art-gallery.jpg',
    details: 'Climate-controlled art display',
    detailsExtended: 'Museum-quality gallery space with adjustable lighting and security'
  },
  
  // Sustainability Features
  {
    id: 'solar-panels',
    type: 'sustainability',
    category: 'energy_efficiency',
    name: 'Solar Panels',
    image: '/assets/features/sustainability/solar-panels.jpg',
    details: 'Integrated solar energy system',
    detailsExtended: 'High-efficiency solar panels providing up to 20% of vessel power'
  },
  {
    id: 'hybrid-propulsion',
    type: 'sustainability',
    category: 'power_supply_and_propulsion',
    name: 'Hybrid Propulsion',
    image: '/assets/features/sustainability/hybrid.jpg',
    details: 'Diesel-electric hybrid system',
    detailsExtended: 'Advanced hybrid propulsion for silent cruising and reduced emissions',
    requiresStructural: true
  },
  {
    id: 'battery-storage',
    type: 'sustainability',
    category: 'power_supply_and_propulsion',
    name: 'Battery Storage',
    image: '/assets/features/sustainability/battery.jpg',
    details: 'Advanced lithium battery bank',
    detailsExtended: 'High-capacity battery system for extended silent operation'
  },
  {
    id: 'waste-treatment',
    type: 'sustainability',
    category: 'energy_efficiency',
    name: 'Waste Treatment',
    image: '/assets/features/sustainability/waste-treatment.jpg',
    details: 'Advanced waste processing system',
    detailsExtended: 'Zero-discharge waste treatment and recycling system'
  },
  {
    id: 'heat-recovery',
    type: 'sustainability',
    category: 'energy_efficiency',
    name: 'Heat Recovery',
    image: '/assets/features/sustainability/heat-recovery.jpg',
    details: 'Engine heat recovery system',
    detailsExtended: 'Captures waste heat for water heating and climate control'
  },
  
  // Services
  {
    id: 'crew-training',
    type: 'service',
    category: 'suite_of_services',
    name: 'Elite Crew Training',
    details: 'Comprehensive crew training program',
    detailsExtended: 'Annual training for all crew members including safety, service, and technical skills'
  },
  {
    id: 'concierge-global',
    type: 'service',
    category: 'suite_of_services',
    name: 'Global Concierge',
    details: '24/7 worldwide concierge service',
    detailsExtended: 'Dedicated concierge team for reservations, experiences, and logistics worldwide'
  },
  {
    id: 'maintenance-program',
    type: 'service',
    category: 'suite_of_services',
    name: 'Maintenance Program',
    details: 'Comprehensive maintenance package',
    detailsExtended: 'Full-service maintenance program with scheduled inspections and repairs'
  },
  {
    id: 'captain-service',
    type: 'service',
    category: 'suite_of_services',
    name: 'Captain Service',
    details: 'Professional captain and crew',
    detailsExtended: 'Experienced captain and crew available for all voyages'
  },
  {
    id: 'provisioning-service',
    type: 'service',
    category: 'suite_of_services',
    name: 'Provisioning Service',
    details: 'Luxury provisioning worldwide',
    detailsExtended: 'Premium provisioning service for food, beverages, and supplies globally'
  },
  {
    id: 'insurance-package',
    type: 'service',
    category: 'suite_of_services',
    name: 'Insurance Package',
    details: 'Comprehensive insurance coverage',
    detailsExtended: 'All-inclusive insurance package with worldwide coverage'
  }
];

// Utility functions
export const getYachtModels = () => 
  YACHT_FEATURES.filter(f => f.type === 'model');

export const getFeaturesForYacht = (yachtId: string, featureType?: string) => {
  const yacht = YACHT_FEATURES.find(f => f.id === yachtId && f.type === 'model');
  if (!yacht?.availableFeatures) return [];
  
  return YACHT_FEATURES.filter(f => 
    yacht.availableFeatures!.includes(f.id) &&
    (!featureType || f.type === featureType)
  );
};

export const isFeatureCompatible = (yachtId: string, featureId: string) => {
  const yacht = YACHT_FEATURES.find(f => f.id === yachtId && f.type === 'model');
  if (!yacht) return false;
  
  return yacht.availableFeatures?.includes(featureId) && 
         !yacht.incompatibleFeatures?.includes(featureId);
};
