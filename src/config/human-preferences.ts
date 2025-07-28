// ==================================================
// AI EXPLANATION: human-preferences.ts
// ==================================================
// WHAT: This file contains human-preferences.ts
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================

/**
 * Human Preferences Library
 * Personal preferences, activities, experiences, and emotional aspects
 */

import type { HumanPreference, DesignStyle, Activity, Destination, DesignStyleGroup } from './types';

export const HUMAN_PREFERENCES: HumanPreference[] = [
  // Operation Types (removed duplicates - only keep one set)
  {
    id: 'private',
    type: 'operation-type',
    name: 'PRIVATE',
    image: '/assets/Operating-profile-who/private.png',
    details: 'Using your Feadship for \'private use only\' means that it is exclusively for the owner, family, and invited guests. The yacht is not chartered or rented out for commercial purposes. This allows for a highly personalized experience, with custom interiors, a dedicated crew catering solely to your preferences, and complete privacy.',
    tags: ['exclusive', 'personal', 'private']
  },
  {
    id: 'charter',
    type: 'operation-type',
    name: 'Charter',
    image: '/assets/Operating-profile-who/charter.png',
    details: 'Using your Feadship for \'charter purposes\' means renting it out to guests for a fee. This helps offset operational costs, including maintenance and crew salaries, while keeping the yacht active. The crew provides a premium hospitality experience, ensuring guests enjoy luxury services and amenities.',
    tags: ['commercial', 'hospitality', 'revenue']
  },

  // Design Style Preferences - Slider 1: Clean → Complex
  {
    id: 'style-clean',
    type: 'design-style',
    group: 'clean-complex',
    name: 'Clean',
    value: 0,
    order: 1,
    image: '/assets/step1/1.jpg',
    details: 'Minimalist, uncluttered aesthetic',
    tags: ['minimal', 'simple', 'zen']
  },
  {
    id: 'style-modern',
    type: 'design-style',
    group: 'clean-complex',
    name: 'Modern',
    value: 1,
    order: 2,
    image: '/assets/step1/2.jpg',
    details: 'Contemporary with clean lines',
    tags: ['contemporary', 'sleek']
  },
  {
    id: 'style-eclectic',
    type: 'design-style',
    group: 'clean-complex',
    name: 'Eclectic',
    value: 2,
    order: 3,
    image: '/assets/step1/3.jpg',
    details: 'Mix of styles and periods',
    tags: ['mixed', 'diverse', 'curated']
  },
  {
    id: 'style-contemporary',
    type: 'design-style',
    group: 'clean-complex',
    name: 'Contemporary',
    value: 3,
    order: 4,
    image: '/assets/step1/4.jpg',
    details: 'Current design trends',
    tags: ['trendy', 'current']
  },
  {
    id: 'style-ornate',
    type: 'design-style',
    group: 'clean-complex',
    name: 'Ornate',
    value: 4,
    order: 5,
    image: '/assets/step1/5.jpg',
    details: 'Rich, decorative complexity',
    tags: ['luxurious', 'detailed', 'opulent']
  },
  
  // Design Style Preferences - Slider 2: Vintage → Modern
  {
    id: 'style-vintage',
    type: 'design-style',
    group: 'vintage-modern',
    name: 'Vintage',
    value: 0,
    order: 1,
    image: '/assets/step2/1.jpg',
    details: 'Classic, timeless elegance',
    tags: ['classic', 'timeless', 'heritage']
  },
  {
    id: 'style-retro-classic',
    type: 'design-style',
    group: 'vintage-modern',
    name: 'Retro Classic',
    value: 1,
    order: 2,
    image: '/assets/step2/2.jpg',
    details: 'Nostalgic with modern comfort',
    tags: ['retro', 'nostalgic']
  },
  {
    id: 'style-transitional',
    type: 'design-style',
    group: 'vintage-modern',
    name: 'Transitional Era',
    value: 2,
    order: 3,
    image: '/assets/step2/3.jpg',
    details: 'Bridge between classic and contemporary',
    tags: ['balanced', 'transitional']
  },
  {
    id: 'style-contemporary-future',
    type: 'design-style',
    group: 'vintage-modern',
    name: 'Contemporary',
    value: 3,
    order: 4,
    image: '/assets/step2/4.jpg',
    details: 'Current forward-thinking design',
    tags: ['progressive', 'innovative']
  },
  {
    id: 'style-futuristic',
    type: 'design-style',
    group: 'vintage-modern',
    name: 'Modern Futuristic',
    value: 4,
    order: 5,
    image: '/assets/step2/5.jpg',
    details: 'Cutting-edge, visionary design',
    tags: ['futuristic', 'avant-garde', 'visionary']
  },
  
  // Design Style Preferences - Slider 3: Traditional → Radical
  {
    id: 'style-classical',
    type: 'design-style',
    group: 'traditional-radical',
    name: 'Classical',
    value: 0,
    order: 1,
    image: '/assets/step3/1.jpg',
    details: 'Time-honored traditional design',
    tags: ['traditional', 'formal', 'established']
  },
  {
    id: 'style-victorian',
    type: 'design-style',
    group: 'traditional-radical',
    name: 'Victorian',
    value: 1,
    order: 2,
    image: '/assets/step3/2.jpg',
    details: 'Elegant period styling',
    tags: ['period', 'romantic', 'detailed']
  },
  {
    id: 'style-mid-century',
    type: 'design-style',
    group: 'traditional-radical',
    name: 'Mid-Century Modern',
    value: 2,
    order: 3,
    image: '/assets/step3/3.jpg',
    details: 'Iconic 1950s-60s aesthetic',
    tags: ['iconic', 'mid-century', 'functional']
  },
  {
    id: 'style-modern-future',
    type: 'design-style',
    group: 'traditional-radical',
    name: 'Modern Future',
    value: 3,
    order: 4,
    image: '/assets/step3/4.jpg',
    details: 'Progressive contemporary design',
    tags: ['progressive', 'bold']
  },
  {
    id: 'style-contemporary-radical',
    type: 'design-style',
    group: 'traditional-radical',
    name: 'Contemporary',
    value: 4,
    order: 5,
    image: '/assets/step3/5.jpg',
    details: 'Radical, groundbreaking design',
    tags: ['radical', 'experimental', 'groundbreaking']
  },
  
  // Wellness Activities
  {
    id: 'yoga',
    type: 'activity',
    category: 'wellness',
    name: 'Yoga',
    image: '/assets/step6/activities/yoga.jpg',
    details: 'Morning yoga sessions on deck',
    detailsExtended: 'Daily yoga and meditation sessions with panoramic ocean views',
    tags: ['wellness', 'relaxation', 'fitness']
  },
  {
    id: 'sauna',
    type: 'activity',
    category: 'wellness',
    name: 'Sauna',
    image: '/assets/step6/activities/sauna.jpg',
    details: 'Traditional sauna experience',
    detailsExtended: 'Finnish sauna with ocean view and cold plunge pool',
    tags: ['wellness', 'relaxation', 'thermal']
  },
  {
    id: 'massage',
    type: 'activity',
    category: 'wellness',
    name: 'Massage',
    image: '/assets/step6/activities/massage.jpg',
    details: 'Professional massage therapy',
    detailsExtended: 'Full range of massage treatments from certified therapists',
    tags: ['wellness', 'spa', 'relaxation']
  },
  {
    id: 'gym',
    type: 'activity',
    category: 'wellness',
    name: 'Fitness Training',
    image: '/assets/step6/activities/gym.jpg',
    details: 'Personal training sessions',
    detailsExtended: 'Customized fitness programs with professional trainers',
    tags: ['fitness', 'health', 'training']
  },
  
  // Water Sports Activities
  {
    id: 'foiling',
    type: 'activity',
    category: 'watersports',
    name: 'Foiling',
    image: '/assets/step6/activities/folling.jpg',
    details: 'E-foil and hydrofoil experiences',
    detailsExtended: 'Learn to fly above water on cutting-edge foil boards',
    tags: ['watersports', 'adventure', 'innovative']
  },
  {
    id: 'water-toys',
    type: 'activity',
    category: 'watersports',
    name: 'Water Toys',
    image: '/assets/step6/activities/water-toys.jpg',
    details: 'Full range of water toys',
    detailsExtended: 'Seabobs, paddleboards, kayaks, and inflatable platforms',
    tags: ['watersports', 'fun', 'family']
  },
  {
    id: 'jet-skis',
    type: 'activity',
    category: 'watersports',
    name: 'Jet Skis',
    image: '/assets/step6/activities/jet-skis.jpg',
    details: 'High-performance jet ski adventures',
    detailsExtended: 'Explore coastlines on latest model jet skis',
    tags: ['watersports', 'speed', 'adventure']
  },
  {
    id: 'swimming',
    type: 'activity',
    category: 'watersports',
    name: 'Swimming',
    image: '/assets/step6/activities/swimming.jpg',
    details: 'Open water swimming',
    detailsExtended: 'Guided swimming in pristine waters with safety support',
    tags: ['watersports', 'fitness', 'nature']
  },
  {
    id: 'diving',
    type: 'activity',
    category: 'watersports',
    name: 'Diving',
    image: '/assets/step6/activities/diving.jpg',
    details: 'Scuba diving expeditions',
    detailsExtended: 'PADI certified diving with expert guides and equipment',
    tags: ['watersports', 'adventure', 'exploration']
  },
  
  // Adventure Activities
  {
    id: 'wildlife-spotting',
    type: 'activity',
    category: 'adventure',
    name: 'Wildlife Spotting',
    image: '/assets/step6/activities/wildlife-spotting.jpg',
    details: 'Marine life observation',
    detailsExtended: 'Guided wildlife watching with naturalist experts',
    tags: ['nature', 'education', 'photography']
  },
  {
    id: 'remote-places',
    type: 'activity',
    category: 'adventure',
    name: 'Remote Exploration',
    image: '/assets/step6/activities/remote-places.jpg',
    details: 'Discover untouched destinations',
    detailsExtended: 'Access remote beaches and hidden coves',
    tags: ['exploration', 'adventure', 'exclusive']
  },
  
  // Social Activities
  {
    id: 'dining',
    type: 'activity',
    category: 'social',
    name: 'Fine Dining',
    image: '/assets/step6/activities/in-out-dining.jpg',
    details: 'Indoor and outdoor dining experiences',
    detailsExtended: 'Michelin-star chef cuisine in multiple dining venues',
    tags: ['dining', 'luxury', 'culinary']
  },
  {
    id: 'family-cooking',
    type: 'activity',
    category: 'social',
    name: 'Family Cooking',
    image: '/assets/step6/activities/family-cooking.jpg',
    details: 'Interactive cooking experiences',
    detailsExtended: 'Cook with the chef and learn new cuisines',
    tags: ['culinary', 'family', 'interactive']
  },
  {
    id: 'wine-tasting',
    type: 'activity',
    category: 'social',
    name: 'Wine Tasting',
    image: '/assets/step6/activities/wine-tasrting.jpg',
    details: 'Curated wine experiences',
    detailsExtended: 'Sommelier-led tastings of rare vintages',
    tags: ['wine', 'luxury', 'education']
  },
  {
    id: 'karaoke',
    type: 'activity',
    category: 'social',
    name: 'Karaoke Night',
    image: '/assets/step6/activities/karaoke-night.jpg',
    details: 'Entertainment nights',
    detailsExtended: 'Professional karaoke system with thousands of songs',
    tags: ['entertainment', 'fun', 'social']
  },
  {
    id: 'cinema',
    type: 'activity',
    category: 'social',
    name: 'Cinema',
    image: '/assets/step6/activities/cinema.jpg',
    details: 'Private movie screenings',
    detailsExtended: 'Latest releases and classics in your private cinema',
    tags: ['entertainment', 'relaxation', 'luxury']
  },
  
  // Destinations
  {
    id: 'mediterranean',
    type: 'destination',
    name: 'Mediterranean',
    image: '/assets/step4/mediterranean.jpg',
    details: 'French Riviera, Italian Coast, Greek Islands',
    detailsExtended: 'Explore Monaco, Portofino, Santorini, and hidden coves',
    tags: ['europe', 'culture', 'cuisine'],
    season: ['spring', 'summer', 'fall']
  },
  {
    id: 'caribbean',
    type: 'destination',
    name: 'Caribbean',
    image: '/assets/step4/caribbean.jpg',
    details: 'Tropical paradise islands',
    detailsExtended: 'Virgin Islands, St. Barths, Bahamas, and secluded beaches',
    tags: ['tropical', 'beaches', 'diving'],
    season: ['winter', 'spring']
  },
  {
    id: 'south-pacific',
    type: 'destination',
    name: 'South Pacific',
    image: '/assets/step4/south-pacific.jpg',
    details: 'Tahiti, Fiji, and remote atolls',
    detailsExtended: 'Pristine waters and untouched island paradises',
    tags: ['remote', 'diving', 'culture'],
    season: ['spring', 'summer', 'fall']
  },
  {
    id: 'northern-europe',
    type: 'destination',
    name: 'Northern Europe',
    image: '/assets/step4/northern-europe.jpg',
    details: 'Norwegian fjords and Baltic wonders',
    detailsExtended: 'Dramatic landscapes, midnight sun, and Nordic culture',
    tags: ['scenic', 'culture', 'nature'],
    season: ['summer']
  },
  {
    id: 'antarctica',
    type: 'destination',
    name: 'Antarctica',
    image: '/assets/step4/antarctica.jpg',
    details: 'Ultimate expedition cruising',
    detailsExtended: 'Icebergs, penguins, and pristine wilderness',
    tags: ['expedition', 'wildlife', 'exclusive'],
    season: ['winter']
  },
  {
    id: 'arctic',
    type: 'destination',
    name: 'Arctic',
    image: '/assets/step4/arctic.jpg',
    details: 'Svalbard, Greenland, Northwest Passage',
    detailsExtended: 'Polar bears, glaciers, and northern lights',
    tags: ['expedition', 'wildlife', 'remote'],
    season: ['summer']
  },
  {
    id: 'southeast-asia',
    type: 'destination',
    name: 'Southeast Asia',
    image: '/assets/step4/southeast-asia.jpg',
    details: 'Thailand, Indonesia, Myanmar',
    detailsExtended: 'Ancient temples, pristine beaches, vibrant cultures',
    tags: ['culture', 'tropical', 'adventure'],
    season: ['winter', 'spring']
  },
  
  // Moods & Experiences
  {
    id: 'romantic-escape',
    type: 'mood',
    name: 'Romantic Escape',
    details: 'Intimate moments for couples',
    tags: ['romantic', 'private', 'intimate']
  },
  {
    id: 'family-adventure',
    type: 'mood',
    name: 'Family Adventure',
    details: 'Multi-generational experiences',
    tags: ['family', 'fun', 'inclusive']
  },
  {
    id: 'party-mode',
    type: 'mood',
    name: 'Party Mode',
    details: 'Celebration and entertainment',
    tags: ['social', 'entertainment', 'festive']
  },
  {
    id: 'wellness-retreat',
    type: 'mood',
    name: 'Wellness Retreat',
    details: 'Health and rejuvenation focus',
    tags: ['wellness', 'health', 'peaceful']
  },
  {
    id: 'exploration-focus',
    type: 'mood',
    name: 'Exploration Focus',
    details: 'Discovery and adventure priority',
    tags: ['adventure', 'discovery', 'active']
  }
];

// Utility functions
export const getOperationTypes = () => {
  return HUMAN_PREFERENCES.filter(p => p.type === 'operation-type');
};

export const getDesignStyles = (group?: DesignStyleGroup) => {
  const styles = HUMAN_PREFERENCES.filter(p => p.type === 'design-style') as DesignStyle[];
  if (group) {
    return styles.filter(s => s.group === group).sort((a, b) => a.order - b.order);
  }
  return styles.sort((a, b) => a.order - b.order);
};

export const getActivities = (category?: Activity['category']) => {
  const activities = HUMAN_PREFERENCES.filter(p => p.type === 'activity') as Activity[];
  if (category) {
    return activities.filter(a => a.category === category);
  }
  return activities;
};

export const getDestinations = () => {
  return HUMAN_PREFERENCES.filter(p => p.type === 'destination') as Destination[];
};

export const getPreferencesByTags = (tags: string[]) => {
  return HUMAN_PREFERENCES.filter(p => 
    p.tags?.some(tag => tags.includes(tag))
  );
};

export const getStyleForValue = (group: DesignStyleGroup, value: number) => {
  return HUMAN_PREFERENCES.find(p => 
    p.type === 'design-style' && 
    p.group === group && 
    p.value === value
  ) as DesignStyle | undefined;
};
