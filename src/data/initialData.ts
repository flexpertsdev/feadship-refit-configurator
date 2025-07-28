// ==================================================
// AI EXPLANATION: initialData.ts
// ==================================================
// WHAT: This file contains initialData.ts
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================

// Initial data for local storage
export const INITIAL_COLORS = [
  // White & Beiges
  {
    id: 'white-1',
    name: 'Pure White',
    color_string: '#FFFFFF',
    color_group: 'White & Beiges',
    type: 'solid'
  },
  {
    id: 'white-2',
    name: 'Ice White',
    color_string: '#F8F8FF',
    color_group: 'White & Beiges',
    type: 'solid'
  },
  {
    id: 'beige-1',
    name: 'Champagne',
    color_string: '#F7E7CE',
    color_group: 'White & Beiges',
    type: 'solid'
  },
  {
    id: 'beige-2',
    name: 'Ivory',
    color_string: '#FFFFF0',
    color_group: 'White & Beiges',
    type: 'solid'
  },
  
  // Blues
  {
    id: 'blue-1',
    name: 'Ocean Blue',
    color_string: '#006994',
    color_group: 'Blues',
    type: 'solid'
  },
  {
    id: 'blue-2',
    name: 'Navy Blue',
    color_string: '#000080',
    color_group: 'Blues',
    type: 'solid'
  },
  {
    id: 'blue-3',
    name: 'Sky Blue',
    color_string: '#87CEEB',
    color_group: 'Blues',
    type: 'solid'
  },
  
  // Grays
  {
    id: 'gray-1',
    name: 'Silver Gray',
    color_string: '#C0C0C0',
    color_group: 'Grays',
    type: 'solid'
  },
  {
    id: 'gray-2',
    name: 'Charcoal',
    color_string: '#36454F',
    color_group: 'Grays',
    type: 'solid'
  },
  {
    id: 'gray-3',
    name: 'Gunmetal',
    color_string: '#2C3539',
    color_group: 'Grays',
    type: 'solid'
  },
  
  // Special finishes
  {
    id: 'metallic-1',
    name: 'Silver Metallic',
    color_string: '#B8B8B8',
    color_group: 'Metallics',
    type: 'metallic'
  },
  {
    id: 'metallic-2',
    name: 'Gold Metallic',
    color_string: '#D4AF37',
    color_group: 'Metallics',
    type: 'metallic'
  }
];

export const INITIAL_FEATURES = [
  // Exterior Features
  {
    id: 'pool-fixed',
    name: 'Fixed Pool',
    category: 'exterior',
    type: 'features',
    image: '/assets/features/exterior/pool-fixed.jpg',
    details: 'Elegant fixed swimming pool integrated into the deck'
  },
  {
    id: 'pool-floating',
    name: 'Floating Pool',
    category: 'exterior',
    type: 'features',
    image: '/assets/features/exterior/pool-floating.jpg',
    details: 'Innovative floating pool that can be deployed when anchored'
  },
  {
    id: 'jacuzzi',
    name: 'Jacuzzi',
    category: 'exterior',
    type: 'features',
    image: '/assets/features/exterior/jacuzzi.jpg',
    details: 'Luxurious outdoor jacuzzi with ocean views'
  },
  {
    id: 'beach-club',
    name: 'Beach Club',
    category: 'exterior',
    type: 'features',
    image: '/assets/features/exterior/beach-club.jpg',
    details: 'Expansive beach club with direct water access'
  },
  {
    id: 'helipad',
    name: 'Helipad',
    category: 'exterior',
    type: 'features',
    image: '/assets/features/exterior/helipad.jpg',
    details: 'Certified helipad for convenient arrivals and departures'
  },
  {
    id: 'balconies',
    name: 'Balconies',
    category: 'exterior',
    type: 'features',
    image: '/assets/features/exterior/balconies.jpg',
    details: 'Folding balconies for panoramic ocean views'
  },
  
  // Interior Features
  {
    id: 'spa',
    name: 'Spa',
    category: 'interior',
    type: 'features',
    image: '/assets/features/interior/spa.jpg',
    details: 'Full-service spa with treatment rooms'
  },
  {
    id: 'gym',
    name: 'Gym',
    category: 'interior',
    type: 'features',
    image: '/assets/features/interior/gym.jpg',
    details: 'State-of-the-art fitness center'
  },
  {
    id: 'cinema',
    name: 'Cinema',
    category: 'interior',
    type: 'features',
    image: '/assets/features/interior/cinema.jpg',
    details: 'Private cinema with latest audiovisual technology'
  },
  {
    id: 'wine-cellar',
    name: 'Wine Cellar',
    category: 'interior',
    type: 'features',
    image: '/assets/features/interior/wine-cellar.jpg',
    details: 'Temperature-controlled wine cellar'
  },
  
  // Toys & Tenders
  {
    id: 'tender-limo',
    name: 'Limousine Tender',
    category: 'toys',
    type: 'features',
    image: '/assets/features/toys/tender-limo.jpg',
    details: 'Luxury limousine tender for comfortable transfers'
  },
  {
    id: 'tender-open',
    name: 'Open Tender',
    category: 'toys',
    type: 'features',
    image: '/assets/features/toys/tender-open.jpg',
    details: 'Fast open tender for watersports and exploration'
  },
  {
    id: 'jet-skis',
    name: 'Jet Skis',
    category: 'toys',
    type: 'features',
    image: '/assets/features/toys/jet-skis.jpg',
    details: 'High-performance jet skis for water adventures'
  },
  {
    id: 'seabobs',
    name: 'Seabobs',
    category: 'toys',
    type: 'features',
    image: '/assets/features/toys/seabobs.jpg',
    details: 'Underwater scooters for diving exploration'
  },
  
  // Sustainability Options
  {
    id: 'solar-panels',
    name: 'Solar Panels',
    category: 'sustainability',
    type: 'sustainability',
    image: '/assets/features/sustainability/solar-panels.jpg',
    details: 'High-efficiency solar panels for clean energy generation'
  },
  {
    id: 'hybrid-propulsion',
    name: 'Hybrid Propulsion',
    category: 'sustainability',
    type: 'sustainability',
    image: '/assets/features/sustainability/hybrid-propulsion.jpg',
    details: 'Advanced hybrid propulsion system for reduced emissions'
  },
  {
    id: 'water-treatment',
    name: 'Water Treatment System',
    category: 'sustainability',
    type: 'sustainability',
    image: '/assets/features/sustainability/water-treatment.jpg',
    details: 'Advanced water purification and recycling system'
  },
  {
    id: 'waste-management',
    name: 'Waste Management',
    category: 'sustainability',
    type: 'sustainability',
    image: '/assets/features/sustainability/waste-management.jpg',
    details: 'Comprehensive waste sorting and recycling system'
  },
  
  // Services
  {
    id: 'crew-management',
    name: 'Crew Management',
    category: 'services',
    type: 'services',
    image: '/assets/services/crew-management.jpg',
    details: 'Professional crew recruitment and management services'
  },
  {
    id: 'maintenance-program',
    name: 'Maintenance Program',
    category: 'services',
    type: 'services',
    image: '/assets/services/maintenance.jpg',
    details: 'Comprehensive maintenance program to keep your yacht in perfect condition'
  },
  {
    id: 'concierge-service',
    name: 'Concierge Service',
    category: 'services',
    type: 'services',
    image: '/assets/services/concierge.jpg',
    details: '24/7 luxury concierge service for all your needs'
  },
  {
    id: 'charter-management',
    name: 'Charter Management',
    category: 'services',
    type: 'services',
    image: '/assets/services/charter-management.jpg',
    details: 'Professional charter management to maximize returns'
  }
];

// Initialize data on first load
export function initializeLocalData() {
  const db = localStorage.getItem('feadship_config_db');
  if (!db) {
    localStorage.setItem('feadship_config_db', JSON.stringify({
      yachts: [],
      features: INITIAL_FEATURES,
      colors: INITIAL_COLORS,
      currentYachtId: null,
      user: null
    }));
  }
}
