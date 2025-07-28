// ==================================================
// AI EXPLANATION: paintColors.ts
// ==================================================
// WHAT: Hardcoded paint color library with 42 yacht colors organized by groups (whites, blues, blacks, etc.) with hex values and finish types
// WHY: Without this, paint customization has no colors to display - provides the complete color palette for yacht paint selection
// USED BY: SimplePaintPanel (primary consumer), paint color pickers, color selection components throughout paint system
// CRITICAL: YES - Core paint color data, modifying affects all paint selection UI and saved configurations
// ==================================================

// Paint Color Library - All available colors for the configurator
export interface PaintColor {
  id: string;
  name: string;
  hex: string;
  type: 'gloss' | 'matte' | 'metallic';
  group: string;
}

export const PAINT_COLORS: PaintColor[] = [
  // Whites & Beiges
  { id: 'w1', name: 'Pure White', hex: '#FFFFFF', type: 'gloss', group: 'white-&-beiges' },
  { id: 'w2', name: 'Ivory', hex: '#FFFFF0', type: 'gloss', group: 'white-&-beiges' },
  { id: 'w3', name: 'Cream', hex: '#FFF5E1', type: 'gloss', group: 'white-&-beiges' },
  { id: 'w4', name: 'Pearl White', hex: '#FFFFFF', type: 'metallic', group: 'white-&-beiges' },
  { id: 'w5', name: 'Champagne', hex: '#F7E7CE', type: 'metallic', group: 'white-&-beiges' },
  { id: 'w6', name: 'Alabaster', hex: '#F2F0E6', type: 'matte', group: 'white-&-beiges' },
  
  // Blues
  { id: 'b1', name: 'Ocean Blue', hex: '#0066CC', type: 'gloss', group: 'blues' },
  { id: 'b2', name: 'Navy Blue', hex: '#003366', type: 'gloss', group: 'blues' },
  { id: 'b3', name: 'Sky Blue', hex: '#87CEEB', type: 'gloss', group: 'blues' },
  { id: 'b4', name: 'Deep Navy', hex: '#003366', type: 'matte', group: 'blues' },
  { id: 'b5', name: 'Metallic Blue', hex: '#4682B4', type: 'metallic', group: 'blues' },
  { id: 'b6', name: 'Teal', hex: '#008080', type: 'gloss', group: 'blues' },
  
  // Blacks & Greys
  { id: 'g1', name: 'Jet Black', hex: '#000000', type: 'gloss', group: 'black-&-greys' },
  { id: 'g2', name: 'Charcoal', hex: '#333333', type: 'gloss', group: 'black-&-greys' },
  { id: 'g3', name: 'Gunmetal', hex: '#2C3E50', type: 'metallic', group: 'black-&-greys' },
  { id: 'g4', name: 'Matte Black', hex: '#1C1C1C', type: 'matte', group: 'black-&-greys' },
  { id: 'g5', name: 'Silver', hex: '#C0C0C0', type: 'metallic', group: 'black-&-greys' },
  { id: 'g6', name: 'Graphite', hex: '#41424C', type: 'matte', group: 'black-&-greys' },
  
  // Reds, Oranges & Yellows
  { id: 'r1', name: 'Signal Red', hex: '#CC0000', type: 'gloss', group: 'reds,-oranges-&-yellows' },
  { id: 'r2', name: 'Sunset Orange', hex: '#FF6B35', type: 'gloss', group: 'reds,-oranges-&-yellows' },
  { id: 'r3', name: 'Golden Yellow', hex: '#FFD700', type: 'metallic', group: 'reds,-oranges-&-yellows' },
  { id: 'r4', name: 'Matte Crimson', hex: '#DC143C', type: 'matte', group: 'reds,-oranges-&-yellows' },
  { id: 'r5', name: 'Tangerine', hex: '#FFA500', type: 'gloss', group: 'reds,-oranges-&-yellows' },
  
  // Greens
  { id: 'gr1', name: 'Forest Green', hex: '#228B22', type: 'gloss', group: 'greens' },
  { id: 'gr2', name: 'British Racing Green', hex: '#004225', type: 'gloss', group: 'greens' },
  { id: 'gr3', name: 'Emerald', hex: '#50C878', type: 'metallic', group: 'greens' },
  { id: 'gr4', name: 'Sage', hex: '#87A96B', type: 'matte', group: 'greens' },
  
  // Golds & Browns
  { id: 'gb1', name: 'Antique Bronze', hex: '#CD7F32', type: 'metallic', group: 'golds-&-browns' },
  { id: 'gb2', name: 'Copper', hex: '#B87333', type: 'metallic', group: 'golds-&-browns' },
  { id: 'gb3', name: 'Chocolate', hex: '#7B3F00', type: 'gloss', group: 'golds-&-browns' },
  { id: 'gb4', name: 'Matte Sand', hex: '#C2B280', type: 'matte', group: 'golds-&-browns' },
];

// Helper function to normalize strings for comparison
export const normalizeString = (str: string): string => {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
};

// Get colors by group and type
export const getFilteredColors = (group: string | null, type: string): PaintColor[] => {
  let filtered = PAINT_COLORS;
  
  // Filter by group if provided
  if (group) {
    const normalizedGroup = normalizeString(group);
    filtered = filtered.filter(color => 
      normalizeString(color.group) === normalizedGroup
    );
  }
  
  // Filter by type
  const normalizedType = normalizeString(type);
  filtered = filtered.filter(color => 
    normalizeString(color.type) === normalizedType
  );
  
  return filtered;
};
