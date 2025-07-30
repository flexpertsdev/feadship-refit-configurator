// ==================================================
// AI EXPLANATION: db.ts
// ==================================================
// WHAT: Database utility functions for yacht paint colors - fetching, saving, updating paint selections and custom colors via localStorage
// WHY: Without this, paint color selections wouldn't persist - provides the data layer for all paint customization features
// USED BY: SimplePaintPanel, paint utils, color picker components for saving/loading paint selections
// CRITICAL: YES - Core data persistence for paint features, breaking this prevents saving/loading paint colors
// ==================================================

import { YachtConfigV2 as YachtConfig } from "@/types/yacht-v2";
import { ColorSelection, YachtColor } from "@/types/paint";
import { localStorageService } from '@/services/localStorageService';

/**
 * Extract color information from yacht store
 */
export function fetchColorsFromYachtStore(yacht: YachtConfig): Record<string, ColorSelection> {
  if (!yacht) return {};

  const partColors: Record<string, ColorSelection> = {};
  const parts = ['hull', 'superstructure', 'deckhouse', 'mast', 'bootstripe'];
  
  parts.forEach(part => {
    const colorKey = `${part}_paint_color` as keyof YachtConfig;
    const typeKey = `${part}_paint_type` as keyof YachtConfig;
    const groupKey = `${part}_paint_color_group` as keyof YachtConfig;
    
    if (yacht[colorKey] && yacht[typeKey]) {
      const color = yacht[colorKey] as string;
      const type = yacht[typeKey] as string;
      const group = yacht[groupKey] as string || 'Custom Colors';
      
      partColors[part] = {
        color,
        type,
        name: getColorNameByHex(color),
        group
      };
    }
  });
  
  return partColors;
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
  colorName: string, 
  colorString: string, 
  colorType: string,
  colorGroup: string = 'Custom Colors'
): Promise<boolean> {
  try {
    // Get the current yacht
    const { data: yacht, error: fetchError } = await localStorageService.getYacht(yachtId);
      
    if (fetchError || !yacht) {
      throw new Error(fetchError || 'Yacht not found');
    }
    
    // Add the new color to the custom_colors array
    const customColors = yacht.custom_colors || [];
    const newColor = {
      name: colorName,
      color: colorString,
      type: colorType,
      group: colorGroup
    };
    
    // Make sure customColors is an array before pushing to it
    let updatedColors = [];
    
    if (Array.isArray(customColors)) {
      updatedColors = [...customColors, newColor];
    } else {
      // If custom_colors is not an array, initialize a new one
      updatedColors = [newColor];
    }
    
    // Update the yacht with the new custom_colors array
    const { error: updateError } = await localStorageService.updateYacht(yachtId, { custom_colors: updatedColors });
      
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
  color: string, 
  type: string,
  colorGroup?: string
): Promise<boolean> {
  try {
    const updateData: any = {
      [`${part}_paint_color`]: color,
      [`${part}_paint_type`]: type,
      updated_at: new Date().toISOString()
    };
    
    if (colorGroup) {
      updateData[`${part}_paint_color_group`] = colorGroup;
    }
    
    const { error } = await localStorageService.updateYacht(yachtId, updateData);
      
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
export async function getYachtPaintColors(yachtId: string): Promise<Record<string, ColorSelection>> {
  try {
    const { data, error } = await localStorageService.getYacht(yachtId);
      
    if (error || !data) {
      throw new Error(error || 'Yacht not found');
    }
    
    const colorMap: Record<string, ColorSelection> = {};
    
    if (data) {
      const parts = ['hull', 'superstructure', 'deckhouse', 'mast', 'bootstripe'];
      
      parts.forEach(part => {
        const color = data[`${part}_paint_color` as keyof typeof data];
        const type = data[`${part}_paint_type` as keyof typeof data];
        const group = data[`${part}_paint_color_group` as keyof typeof data] || 'Custom Colors';
        
        if (color && type) {
          colorMap[part] = {
            color: color as string,
            type: type as string,
            name: getColorNameByHex(color as string),
            group: group as string
          };
        }
      });
    }
    
    return colorMap;
  } catch (error) {
    console.error('Error fetching yacht paint colors:', error);
    return {};
  }
}

/**
 * Get all yacht custom colors
 */
export async function getAllYachtColors(): Promise<YachtColor[]> {
  try {
    const { data, error } = await localStorageService.getColors();
      
    if (error) {
      throw new Error(error);
    }
    
    // Convert from the simple color format to YachtColor format
    const yachtColors: YachtColor[] = (data || []).map((color, index) => ({
      id: color.id,
      name: color.name,
      color_string: color.color_string,
      color_group: color.color_group,
      type: color.type || 'solid',
      index: index
    }));
    
    return yachtColors;
  } catch (error) {
    console.error('Error fetching yacht colors:', error);
    return [];
  }
}
