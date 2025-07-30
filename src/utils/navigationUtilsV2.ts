// Temporary navigation utils for testing ConfiguratorPageV2
// This is a copy of navigationUtils.ts with paths updated to /configurator-v2

import { NavigationItem } from '@/types/navigation';

/**
 * Color options for paint navigation
 * These will become Level 3 navigation items under each yacht part
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
 * Map color display names to their IDs (matching paintColors.ts)
 */
const COLOR_ID_MAP: Record<string, string> = {
  'Custom Colours': 'custom-colours',
  'White & Beiges': 'whites-beiges',
  'Golds & Browns': 'golds-browns',
  'Black & Greys': 'blacks-greys',
  'Blues': 'blues',
  'Greens': 'greens',
  'Reds, Oranges & Yellows': 'reds-oranges-yellows'
};

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
    path: '/configurator-v2',  // CHANGED TO V2
    subItems: [
      {
        id: 'hull',
        name: 'Hull',
        level: 2,
        path: '/configurator-v2',  // CHANGED TO V2
        parentId: 'PAINT',
        expandable: true,
        subItems: COLOR_OPTIONS.map((color) => ({
          id: COLOR_ID_MAP[color] || color.toLowerCase().replace(/[\s,&]+/g, '-'),
          name: color,
          level: 3,
          path: '/configurator-v2',  // CHANGED TO V2
          parentId: 'hull',
          subItems: []
        }))
      },
      {
        id: 'superstructure',
        name: 'Superstructure',
        level: 2,
        path: '/configurator-v2',  // CHANGED TO V2
        parentId: 'PAINT',
        expandable: true,
        subItems: COLOR_OPTIONS.map((color) => ({
          id: COLOR_ID_MAP[color] || color.toLowerCase().replace(/[\s,&]+/g, '-'),
          name: color,
          level: 3,
          path: '/configurator-v2',  // CHANGED TO V2
          parentId: 'superstructure',
          subItems: []
        }))
      },
      {
        id: 'deckhouse',
        name: 'Deckhouse',
        level: 2,
        path: '/configurator-v2',  // CHANGED TO V2
        parentId: 'PAINT',
        expandable: true,
        subItems: COLOR_OPTIONS.map((color) => ({
          id: COLOR_ID_MAP[color] || color.toLowerCase().replace(/[\s,&]+/g, '-'),
          name: color,
          level: 3,
          path: '/configurator-v2',  // CHANGED TO V2
          parentId: 'deckhouse',
          subItems: []
        }))
      },
      {
        id: 'mast',
        name: 'Mast',
        level: 2,
        path: '/configurator-v2',  // CHANGED TO V2
        parentId: 'PAINT',
        expandable: true,
        subItems: COLOR_OPTIONS.map((color) => ({
          id: COLOR_ID_MAP[color] || color.toLowerCase().replace(/[\s,&]+/g, '-'),
          name: color,
          level: 3,
          path: '/configurator-v2',  // CHANGED TO V2
          parentId: 'mast',
          subItems: []
        }))
      },
      {
        id: 'bootstripe',
        name: 'Bootstripe',
        level: 2,
        path: '/configurator-v2',  // CHANGED TO V2
        parentId: 'PAINT',
        expandable: true,
        subItems: COLOR_OPTIONS.map((color) => ({
          id: COLOR_ID_MAP[color] || color.toLowerCase().replace(/[\s,&]+/g, '-'),
          name: color,
          level: 3,
          path: '/configurator-v2',  // CHANGED TO V2
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
    path: '/configurator-v2',  // CHANGED TO V2 (was /extensions)
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
      { id: 'water_toys', name: 'Water Toys', level: 2, path: '/features', parentId: 'FEATURES', subItems: [] },
      { id: 'galley', name: 'Galley', level: 2, path: '/features', parentId: 'FEATURES', subItems: [] },
      { id: 'crew', name: 'Crew', level: 2, path: '/features', parentId: 'FEATURES', subItems: [] }
    ]
  },
  {
    id: 'SUSTAINABILITY',
    name: 'SUSTAINABILITY',
    level: 1,
    path: '/sustainability',
    subItems: [
      { id: 'power', name: 'Power', level: 2, path: '/sustainability', parentId: 'SUSTAINABILITY', subItems: [] },
      { id: 'hotel', name: 'Hotel', level: 2, path: '/sustainability', parentId: 'SUSTAINABILITY', subItems: [] },
      { id: 'propulsion', name: 'Propulsion', level: 2, path: '/sustainability', parentId: 'SUSTAINABILITY', subItems: [] }
    ]
  },
  {
    id: 'SERVICES',
    name: 'SERVICES',
    level: 1,
    path: '/services',
    subItems: [
      { id: 'suite', name: 'Suite', level: 2, path: '/services', parentId: 'SERVICES', subItems: [] },
      { id: 'training', name: 'Training', level: 2, path: '/services', parentId: 'SERVICES', subItems: [] }
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

// Export all the navigation helper functions from the original file
export * from './navigationUtils';