// ==================================================
// AI EXPLANATION: yachtService.ts
// ==================================================
// WHAT: Service layer for yacht CRUD operations using localStorage, handles creating, fetching, updating, deleting yacht configurations and V1->V2 migration
// WHY: Without this, no yacht data could be persisted or retrieved - it's the data persistence layer between UI and localStorage
// USED BY: yachtStore (all CRUD operations), HomePage (fetch/delete), any component that manages yacht data
// CRITICAL: YES - Core data persistence service, breaking this prevents saving/loading yacht configurations
// ==================================================

import { localStorageService } from './localStorageService';
import { YachtConfigV2 } from '@/types/yacht-v2';
import { getYachtModel, getDefaultExtension } from '@/data/yacht-models-library';
import { v4 as uuidv4 } from 'uuid';

export const createNewYacht = async (name: string = 'My Yacht', modelId: string = 'sea_owl'): Promise<YachtConfigV2 | null> => {
  try {
    const currentUser = localStorageService.getCurrentUser();
    
    if (!currentUser) {
      console.error('User is not authenticated');
      return null;
    }
    
    // Get model info
    const model = getYachtModel(modelId);
    if (!model) {
      console.error('Invalid yacht model:', modelId);
      return null;
    }
    
    // Create new yacht with V2 structure
    const newYacht: YachtConfigV2 = {
      id: uuidv4(),
      user_id: currentUser.id,
      name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      
      // Base model
      model_id: modelId,
      
      // Navigation state defaults
      active_level_1: 'DESIGN',
      active_level_2: 'Complexity',
      
      // Empty arrays - user hasn't selected anything yet
      configs: [],
      preferences: [
        // Default design levels (middle values)
        'design_complexity_2',
        'design_traditional_2', 
        'design_radical_2'
      ],
      
      // Default paint configuration
      paint: {
        hull: {
          color: '#003321', // Jade Mist Green
          type: 'gloss',
          group: 'Greens',
          name: 'Jade Mist Green'
        },
        superstructure: {
          color: '#FFFFFF',
          type: 'gloss',
          group: 'Whites & Beiges',
          name: 'Pure White'
        },
        deckhouse: {
          color: '#FFFFFF',
          type: 'gloss',
          group: 'Whites & Beiges',
          name: 'Pure White'
        },
        mast: {
          color: '#FFFFFF',
          type: 'gloss',
          group: 'Whites & Beiges',
          name: 'Pure White'
        },
        bootstripe: {
          color: '#FFFFFF',
          type: 'gloss',
          group: 'Whites & Beiges',
          name: 'Pure White'
        }
      },
      
      // No custom colors yet
      custom_colors: [],
      
      // Default extension for this model
      extension: getDefaultExtension(modelId)
    };
    
    // Store in localStorage (we'll need to update localStorageService to handle V2)
    const storedYachts = localStorage.getItem('yachts');
    const yachts = storedYachts ? JSON.parse(storedYachts) : [];
    yachts.push(newYacht);
    localStorage.setItem('yachts', JSON.stringify(yachts));
    
    // Set as current yacht
    localStorage.setItem('currentYachtId', newYacht.id);
    
    return newYacht;
  } catch (error) {
    console.error('Unexpected error creating yacht:', error);
    return null;
  }
};

export const fetchUserYachts = async (): Promise<YachtConfigV2[]> => {
  try {
    const storedYachts = localStorage.getItem('yachts');
    const yachts = storedYachts ? JSON.parse(storedYachts) : [];
    
    // Filter by current user
    const currentUser = localStorageService.getCurrentUser();
    if (!currentUser) return [];
    
    return yachts.filter((yacht: YachtConfigV2) => yacht.user_id === currentUser.id);
  } catch (error) {
    console.error('Unexpected error fetching yachts:', error);
    return [];
  }
};

export const updateYacht = async (id: string, updates: Partial<YachtConfigV2>): Promise<YachtConfigV2 | null> => {
  try {
    const storedYachts = localStorage.getItem('yachts');
    const yachts = storedYachts ? JSON.parse(storedYachts) : [];
    
    const index = yachts.findIndex((y: YachtConfigV2) => y.id === id);
    if (index === -1) {
      console.error('Yacht not found:', id);
      return null;
    }
    
    // Update yacht
    yachts[index] = {
      ...yachts[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    // Save back to localStorage
    localStorage.setItem('yachts', JSON.stringify(yachts));
    
    return yachts[index];
  } catch (error) {
    console.error('Error updating yacht:', error);
    return null;
  }
};

export const deleteYacht = async (id: string): Promise<boolean> => {
  try {
    const storedYachts = localStorage.getItem('yachts');
    const yachts = storedYachts ? JSON.parse(storedYachts) : [];
    
    const filteredYachts = yachts.filter((y: YachtConfigV2) => y.id !== id);
    localStorage.setItem('yachts', JSON.stringify(filteredYachts));
    
    // If this was the current yacht, clear it
    const currentYachtId = localStorage.getItem('currentYachtId');
    if (currentYachtId === id) {
      localStorage.removeItem('currentYachtId');
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error deleting yacht:', error);
    return false;
  }
};

export const getYachtById = async (id: string): Promise<YachtConfigV2 | null> => {
  try {
    const storedYachts = localStorage.getItem('yachts');
    const yachts = storedYachts ? JSON.parse(storedYachts) : [];
    
    return yachts.find((y: YachtConfigV2) => y.id === id) || null;
  } catch (error) {
    console.error('Error getting yacht:', error);
    return null;
  }
};

// Helper to migrate old yacht to V2 format
export const migrateYachtToV2 = (oldYacht: any): YachtConfigV2 => {
  const v2Yacht: YachtConfigV2 = {
    id: oldYacht.id || uuidv4(),
    user_id: oldYacht.user_id,
    name: oldYacht.name || 'My Yacht',
    created_at: oldYacht.created_at || new Date().toISOString(),
    updated_at: oldYacht.updated_at || new Date().toISOString(),
    
    model_id: oldYacht.yacht_model || 'sea_owl',
    
    // Preserve navigation state if it exists
    active_level_1: oldYacht.active_level_1 || 'DESIGN',
    active_level_2: oldYacht.active_level_2 || 'Complexity',
    active_level_3: oldYacht.active_level_3,
    
    // Migrate configs (features, sustainability, services)
    configs: [
      ...(oldYacht.features || []),
      ...(oldYacht.sustainability_options || []),
      ...(oldYacht.services || [])
    ],
    
    // Migrate preferences 
    preferences: [
      // Design levels
      `design_complexity_${oldYacht.complexity_level || 2}`,
      `design_traditional_${oldYacht.traditional_level || 2}`,
      `design_radical_${oldYacht.radical_level || 2}`,
      // Operation type
      oldYacht.operation_private ? 'operation_private' : 'operation_charter',
      // Activities
      ...(oldYacht.activities || []),
      // Regions
      ...(oldYacht.regions || [])
    ].filter(Boolean),
    
    // Migrate paint
    paint: {
      hull: {
        color: oldYacht.hull_paint_color || '#003321',
        type: oldYacht.hull_paint_type || 'gloss',
        group: oldYacht.hull_paint_color_group || 'Greens',
        name: 'Hull Color'
      },
      superstructure: {
        color: oldYacht.superstructure_paint_color || '#FFFFFF',
        type: oldYacht.superstructure_paint_type || 'gloss',
        group: oldYacht.superstructure_paint_color_group || 'Whites & Beiges',
        name: 'Superstructure Color'
      },
      deckhouse: {
        color: oldYacht.deckhouse_paint_color || '#FFFFFF',
        type: oldYacht.deckhouse_paint_type || 'gloss',
        group: oldYacht.deckhouse_paint_color_group || 'Whites & Beiges',
        name: 'Deckhouse Color'
      },
      mast: {
        color: oldYacht.mast_paint_color || '#FFFFFF',
        type: oldYacht.mast_paint_type || 'gloss',
        group: oldYacht.mast_paint_color_group || 'Whites & Beiges',
        name: 'Mast Color'
      },
      bootstripe: {
        color: oldYacht.bootstripe_paint_color || '#FFFFFF',
        type: oldYacht.bootstripe_paint_type || 'gloss',
        group: oldYacht.bootstripe_paint_color_group || 'Whites & Beiges',
        name: 'Bootstripe Color'
      }
    },
    
    // Migrate custom colors
    custom_colors: oldYacht.custom_colors || [],
    
    // Extension
    extension: parseInt(oldYacht.extension_type) || 0,
    
    // Screenshot
    screenshot_url: oldYacht.screenshot_url
  };
  
  return v2Yacht;
};

// Export V2 aliases for compatibility
export const createNewYachtV2 = createNewYacht;
export const fetchUserYachtsV2 = fetchUserYachts;
export const updateYachtV2 = updateYacht;
export const deleteYachtV2 = deleteYacht;
export const getYachtByIdV2 = getYachtById;