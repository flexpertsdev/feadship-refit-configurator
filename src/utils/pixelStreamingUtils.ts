// Utility functions for pixel streaming integration

/**
 * Maps yacht part names to pixel streaming part names
 * Handles special cases and standard mappings
 */
export const getPixelStreamingPartName = (part: string): string => {
  const partMappings: Record<string, string> = {
    'hull': 'hull_paint',
    'superstructure': 'superstructure_paint',
    'deckhouse': 'deckhouse_paint',
    'mast': 'mast_paint',
    'bootstripe': 'boot_stripe_paint',  // Special case: different naming
  };
  
  // Use mapping if exists, otherwise append _paint suffix as fallback
  return partMappings[part] || `${part}_paint`;
};

/**
 * Converts hex color to RGB object for pixel streaming (0-255 range)
 * Matches the format expected by Unreal Engine
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  
  return { r, g, b };
};

/**
 * Creates a paint change command for pixel streaming
 */
export const createPaintCommand = (part: string, color: string, type: string) => {
  // Map paint types if needed (handle potential mismatches)
  const typeMapping: Record<string, string> = {
    'gloss': 'gloss',  // Map UI 'gloss' to data 'glossy'
    'glossy': 'gloss',
    'matte': 'matte',
    'matt': 'matte',
    'metallic': 'metallic',
    'metalic': 'metallic'
  };
  
  const mappedType = typeMapping[type] || type;
  
  const command = {
    change_paint: {
      part: getPixelStreamingPartName(part),
      color: hexToRgb(color),
      type: mappedType
    }
  };
  
  console.log('Creating paint command:', {
    part,
    mappedPart: getPixelStreamingPartName(part),
    originalColor: color,
    rgbColor: hexToRgb(color),
    originalType: type,
    mappedType
  });
  
  return command;
};