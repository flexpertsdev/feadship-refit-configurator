// Route configuration for yacht cruising paths
export interface Route {
  id: string;
  name: string;
  svg: string;
  description?: string;
  regions?: string[]; // Associated regions
}

export const YACHT_ROUTES: Route[] = [
  {
    id: 'caribbean',
    name: 'Caribbean',
    svg: '/assets/routes/Caribbean.svg',
    description: 'Island hopping through the Caribbean',
    regions: ['caribbean']
  },
  {
    id: 'mediterranean', 
    name: 'Mediterranean',
    svg: '/assets/routes/Mediteranean.svg',
    description: 'Classic Mediterranean cruise',
    regions: ['mediterranean']
  },
  {
    id: 'nordics',
    name: 'Nordics',
    svg: '/assets/routes/Nordics.svg',
    description: 'Norwegian fjords and Baltic Sea',
    regions: ['northern-europe']
  },
  {
    id: 'australasia',
    name: 'Australasia',
    svg: '/assets/routes/Australasia.svg',
    description: 'Australia and New Zealand exploration',
    regions: ['south-pacific']
  },
  {
    id: 'circumnavigation',
    name: 'Circumnavigation',
    svg: '/assets/routes/Circumnavigation.svg',
    description: 'Around the world voyage',
    regions: ['mediterranean', 'caribbean', 'south-pacific', 'southeast-asia']
  },
  {
    id: 'east-coast',
    name: 'East Coast',
    svg: '/assets/routes/East Coast.svg',
    description: 'US East Coast and Canada',
    regions: ['caribbean']
  },
  {
    id: 'french-polynesia',
    name: 'French Polynesia',
    svg: '/assets/routes/French Polynesia.svg',
    description: 'Tahiti and surrounding islands',
    regions: ['south-pacific']
  },
  {
    id: 'galapagos',
    name: 'Galapagos',
    svg: '/assets/routes/Galapagos.svg',
    description: 'Galapagos Islands expedition',
    regions: ['south-pacific']
  },
  {
    id: 'northwest-passage',
    name: 'Northwest Passage',
    svg: '/assets/routes/NorthWest Passage.svg',
    description: 'Arctic expedition route',
    regions: ['arctic']
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    svg: '/assets/routes/Patagonia.svg',
    description: 'Chilean fjords and Cape Horn',
    regions: ['antarctica']
  },
  {
    id: 'suez-canal',
    name: 'Suez Canal',
    svg: '/assets/routes/SuezCanal.svg',
    description: 'Mediterranean to Red Sea passage',
    regions: ['mediterranean', 'southeast-asia']
  },
  {
    id: 'transatlantic',
    name: 'Transatlantic',
    svg: '/assets/routes/Transatlantic.svg',
    description: 'Atlantic Ocean crossing',
    regions: ['caribbean', 'mediterranean']
  }
];

// Utility functions
export const getRouteById = (id: string): Route | undefined => {
  return YACHT_ROUTES.find(route => route.id === id);
};

export const getRoutesByRegion = (regionId: string): Route[] => {
  return YACHT_ROUTES.filter(route => 
    route.regions?.includes(regionId) || false
  );
};

export const getRouteIds = (): string[] => {
  return YACHT_ROUTES.map(route => route.id);
};