// ==================================================
// AI EXPLANATION: yachtModelService.ts
// ==================================================
// WHAT: This file contains yachtModelService.ts
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================

import { YachtModel } from '@/types/yacht-v2';
import { YACHT_MODELS } from '@/data/yacht-models-library';
import { localStorageService } from './localStorageService';

/**
 * Fetch all active yacht models
 */
export const fetchYachtModels = async (): Promise<YachtModel[]> => {
  try {
    // Return static yacht models
    return YACHT_MODELS.filter(model => model.is_active);
  } catch (error) {
    console.error('Unexpected error fetching yacht models:', error);
    return [];
  }
};

/**
 * Get a yacht model by ID
 */
export const getYachtModelById = async (id: string): Promise<YachtModel | null> => {
  try {
    const model = YACHT_MODELS.find(m => m.id === id);
    return model || null;
  } catch (error) {
    console.error('Unexpected error fetching yacht model:', error);
    return null;
  }
};

/**
 * Apply default options from a yacht model to a yacht config
 */
export const applyYachtModelDefaults = async (yachtId: string, modelId: string): Promise<boolean> => {
  try {
    // Get the yacht model
    const model = await getYachtModelById(modelId);
    if (!model) return false;
    
    // Prepare the update data with defaults from the model
    const updateData = {
      yacht_model: model.id,
      extension_type: model.config.extensions.default,
      
      // Apply default paint colors
      hull_paint_color: model.config.colors.hull.color,
      hull_paint_type: model.config.colors.hull.type,
      hull_paint_color_group: model.config.colors.hull.group,
      
      superstructure_paint_color: model.config.colors.superstructure.color,
      superstructure_paint_type: model.config.colors.superstructure.type,
      superstructure_paint_color_group: model.config.colors.superstructure.group,
      
      deckhouse_paint_color: model.config.colors.deckhouse.color,
      deckhouse_paint_type: model.config.colors.deckhouse.type,
      deckhouse_paint_color_group: model.config.colors.deckhouse.group,
      
      mast_paint_color: model.config.colors.mast.color,
      mast_paint_type: model.config.colors.mast.type,
      mast_paint_color_group: model.config.colors.mast.group,
      
      bootstripe_paint_color: model.config.colors.bootstripe.color,
      bootstripe_paint_type: model.config.colors.bootstripe.type,
      bootstripe_paint_color_group: model.config.colors.bootstripe.group,
    };
    
    // Update the yacht with the model defaults
    const { error } = await localStorageService.updateYacht(yachtId, updateData);
      
    if (error) {
      console.error('Error updating yacht with model defaults:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error applying yacht model defaults:', error);
    return false;
  }
};

/**
 * Update or create a yacht model
 * Note: This is now read-only as we use static yacht models
 */
export const saveYachtModel = async (model: Partial<YachtModel>): Promise<YachtModel | null> => {
  console.warn('Yacht models are now read-only. Cannot save yacht model:', model);
  return null;
};

/**
 * Delete a yacht model (soft delete by setting is_active to false)
 * Note: This is now read-only as we use static yacht models
 */
export const deleteYachtModel = async (id: string): Promise<boolean> => {
  console.warn('Yacht models are now read-only. Cannot delete yacht model:', id);
  return false;
};
