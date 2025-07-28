// ==================================================
// AI EXPLANATION: yacht-models-library.ts
// ==================================================
// WHAT: Yacht model definitions with available/restricted features per model, extension options, and helper functions for model-specific feature compatibility
// WHY: Without this, feature filtering by yacht model wouldn't work - it defines which features are available for each yacht type (Sea Owl, Future Concept, Classic)
// USED BY: yachtService (creating yachts), useFeatureSelection (filtering features), any component checking model compatibility
// CRITICAL: YES - Core model configuration data, breaking this prevents proper feature filtering based on yacht model
// ==================================================

/**
 * Yacht Models Library
 * Defines available yacht models and their capabilities
 */

import type { YachtModel } from '@/types/yacht-v2';

export const YACHT_MODELS: YachtModel[] = [
  {
    id: 'sea_owl',
    name: 'Sea Owl',
    available_extensions: [0, 1, 2],
    available_configs: [
      // Exterior
      'jacuzzi',
      'pool_fixed',
      'sun_deck_extension',
      'beach_club',
      'tender_garage',
      
      // Interior  
      'cinema',
      'spa',
      'gym',
      'wine_cellar',
      'office',
      
      // Toys (limited)
      'jetski',
      'diving_equipment',
      'fishing_gear',
      
      // Sustainability
      'solar_panels',
      'water_recycling',
      'hybrid_propulsion',
      
      // Services (all available)
      'crew_training',
      'maintenance_plan',
      'concierge_service',
      'insurance_package'
    ],
    restricted_configs: [
      'helipad',        // too small
      'submarine_bay',  // no space
      'pool_infinity'   // structural limitation
    ],
    pixel_stream_url: '/pixel-stream/sea-owl',
    default_extension: 0
  },
  
  {
    id: 'future_concept',
    name: 'Future Concept',
    available_extensions: [0, 1, 2, 3, 4, 5],
    available_configs: [
      // All exterior features available
      'jacuzzi',
      'pool_fixed',
      'pool_infinity',
      'helipad',
      'sun_deck_extension',
      'beach_club',
      'tender_garage',
      'submarine_bay',
      
      // All interior features
      'cinema',
      'spa',
      'gym',
      'wine_cellar',
      'office',
      'observatory',
      'art_gallery',
      
      // All toys
      'jetski',
      'submarine',
      'diving_equipment',
      'fishing_gear',
      'seabob',
      'wakeboard',
      
      // All sustainability
      'solar_panels',
      'water_recycling',
      'hybrid_propulsion',
      'hydrogen_fuel_cell',
      'wind_turbine',
      
      // All services
      'crew_training',
      'maintenance_plan',
      'concierge_service',
      'insurance_package',
      'charter_management'
    ],
    restricted_configs: [], // can have everything
    pixel_stream_url: '/pixel-stream/future-concept',
    default_extension: 2
  },
  
  {
    id: 'classic_feadship',
    name: 'Classic Feadship',
    available_extensions: [0, 1, 2, 3],
    available_configs: [
      // Exterior (traditional selections)
      'jacuzzi',
      'pool_fixed',
      'sun_deck_extension',
      'beach_club',
      'tender_garage',
      'helipad',
      
      // Interior (classic luxury)
      'cinema',
      'spa',
      'gym',
      'wine_cellar',
      'office',
      'library',
      
      // Toys (classic selection)
      'jetski',
      'diving_equipment',
      'fishing_gear',
      'classic_tender',
      
      // Sustainability (modern updates)
      'solar_panels',
      'water_recycling',
      'hybrid_propulsion',
      
      // Services
      'crew_training',
      'maintenance_plan',
      'concierge_service',
      'insurance_package'
    ],
    restricted_configs: [
      'submarine_bay',     // traditional design
      'hydrogen_fuel_cell' // too experimental
    ],
    pixel_stream_url: '/pixel-stream/classic-feadship',
    default_extension: 1
  }
];

// Helper functions
export function getYachtModel(modelId: string): YachtModel | undefined {
  return YACHT_MODELS.find(m => m.id === modelId);
}

export function isConfigAvailableForModel(configId: string, modelId: string): boolean {
  const model = getYachtModel(modelId);
  if (!model) return true; // default allow if no model
  
  // Check if explicitly restricted
  if (model.restricted_configs?.includes(configId)) return false;
  
  // Check if in available list
  if (model.available_configs.length > 0) {
    return model.available_configs.includes(configId);
  }
  
  return true; // default allow
}

export function getAvailableExtensions(modelId: string): number[] {
  const model = getYachtModel(modelId);
  return model?.available_extensions || [0, 1, 2]; // default
}

export function getDefaultExtension(modelId: string): number {
  const model = getYachtModel(modelId);
  return model?.default_extension || 0;
}