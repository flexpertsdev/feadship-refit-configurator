// ==================================================
// AI EXPLANATION: paintUtils.ts
// ==================================================
// WHAT: Utility functions for yacht paint colors - fetching, saving, updating paint selections and custom colors via localStorage
// WHY: Without this, paint color selections wouldn't persist - provides the data layer for all paint customization features
// USED BY: SimplePaintPanel, paint utils, color picker components for saving/loading paint selections
// CRITICAL: YES - Core data persistence for paint features, breaking this prevents saving/loading paint colors
// ==================================================

import { YachtConfigV2 as YachtConfig, PaintConfig, Color } from "@/types/yacht-v2";
import { localStorageService } from '@/services/localStorageService';

/**
 * Extract color information from yacht store
 */
export function fetchColorsFromYachtStore(yacht: YachtConfig): Record<string, PaintConfig> {
  if (!yacht || !yacht.paint) return {};

  // In V2, paint data is stored directly in yacht.paint object
  return yacht.paint;
}

/**
 * Find the color group for a given hex color
 */
export function findColorGroupForColor(colorHex: string, allColors: Record<string, any[]> = {}): string | null {
  if (!colorHex) return null;
  
  // Check if the color exists in any of the groups
  for (const [group, colors] of Object.entries(allColors)) {
    const foundColor = colors.find(c => c.color_string?.toLowerCase() === colorHex.toLowerCase());
    if (foundColor) {
      return group;
    }
  }
  
  // Common color mappings as fallback
  const colorGroups: Record<string, string> = {
    '#FFFFFF': 'whites-beiges',
    '#FFF5E1': 'whites-beiges',
    '#0A003E': 'blues',
    '#0085C7': 'blues',
    '#00A1C7': 'blues',
    '#FFD700': 'reds-oranges-yellows',
    '#36454F': 'blacks-greys',
    '#228B22': 'greens',
  };
  
  return colorGroups[colorHex.toUpperCase()] || 'Custom Colors';
}

/**
 * Get a color name from hex value
 */
export function getColorNameByHex(hex: string): string {
  const colorMap: Record<string, string> = {
    '#ffffff': 'Pure White',
    '#fff5e1': 'Cream',
    '#0a003e': 'Navy Blue',
    '#0085c7': 'Ocean Blue',
    '#ffd700': 'Sunbeam Yellow',
    '#36454f': 'Charcoal Grey',
    '#228b22': 'Forest Green',
    '#00a1c7': 'Accent Teal'
  };
  
  return colorMap[hex.toLowerCase()] || 'Custom Color';
}

/**
 * Save a custom color for a yacht
 */
export async function saveCustomColor(
  yachtId: string,
  name: string, 
  hex: string, 
  type: 'gloss' | 'matte' | 'metallic',
  group: string = 'Custom Colors'
): Promise<boolean> {
  try {
    // Get the current yacht
    const { data: yacht, error: fetchError } = await localStorageService.getYacht(yachtId);
      
    if (fetchError || !yacht) {
      throw new Error(fetchError || 'Yacht not found');
    }
    
    // Add the new color to the custom_colors array (Color type)
    const customColors = yacht.custom_colors || [];
    const newColor: Color = {
      id: `custom_${Date.now()}`,  // Generate unique ID
      name,
      hex,
      type,
      group
    };
    
    // Update the yacht with the new custom_colors array
    const updatedColors = [...customColors, newColor];
    const { error: updateError } = await localStorageService.updateYacht(yachtId, { 
      custom_colors: updatedColors 
    });
      
    if (updateError) {
      throw new Error(updateError);
    }
    
    return true;
  } catch (error) {
    console.error('Error saving custom color:', error);
    return false;
  }
}

/**
 * Update yacht paint color
 */
export async function updateYachtPaint(
  yachtId: string, 
  part: string, 
  hex: string, 
  type: 'gloss' | 'matte' | 'metallic',
  name: string,
  group?: string
): Promise<boolean> {
  try {
    // Get current yacht to update paint object
    const { data: yacht, error: fetchError } = await localStorageService.getYacht(yachtId);
    if (fetchError || !yacht) {
      throw new Error(fetchError || 'Yacht not found');
    }
    
    // Update the paint object for the specified part
    const updatedPaint = {
      ...yacht.paint,
      [part]: {
        hex,
        type,
        name,
        group: group || 'Custom Colors'
      }
    };
    
    const { error } = await localStorageService.updateYacht(yachtId, {
      paint: updatedPaint,
      updated_at: new Date().toISOString()
    });
      
    if (error) {
      throw new Error(error);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating yacht paint:', error);
    return false;
  }
}

/**
 * Get yacht paint colors
 */
export async function getYachtPaintColors(yachtId: string): Promise<Record<string, PaintConfig>> {
  try {
    const { data, error } = await localStorageService.getYacht(yachtId);
      
    if (error || !data) {
      throw new Error(error || 'Yacht not found');
    }
    
    // In V2, paint is stored directly in yacht.paint
    if (data && data.paint) {
      return data.paint;
    }
    
    return {};
  } catch (error) {
    console.error('Error fetching yacht paint colors:', error);
    return {};
  }
}

/**
 * Get all yacht custom colors
 */
export async function getAllYachtColors(): Promise<Color[]> {
  try {
    const { data, error } = await localStorageService.getColors();
      
    if (error) {
      throw new Error(error);
    }
    
    // Return colors in V2 Color format
    return (data || []).map(color => ({
      id: color.id,
      name: color.name,
      hex: color.color_string || color.hex,  // Handle both field names
      type: color.type || 'gloss',
      group: color.color_group || color.group || 'Custom Colors'
    }));
  } catch (error) {
    console.error('Error fetching yacht colors:', error);
    return [];
  }
}
