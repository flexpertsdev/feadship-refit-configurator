// Script to convert colorValues.json to paintColors.ts format
const fs = require('fs');
const path = require('path');

// Read the colorValues.json file
const colorValuesPath = path.join(__dirname, '../colorValues.json');
const colorValues = JSON.parse(fs.readFileSync(colorValuesPath, 'utf8'));

// Map for normalizing group names to match Level 3 navigation IDs
const groupMap = {
  'Whites & Beiges': 'whites-beiges',
  'Golds & Browns': 'golds-browns',
  'Golds & browns': 'golds-browns', // handle case variation
  'Blacks & Greys': 'blacks-greys',
  'Blues': 'blues',
  'Greens': 'greens',
  'Reds, Oranges & Yellows': 'reds-oranges-yellows'
};

// Convert colors
const colors = [];
const data = colorValues.data;

for (const id in data) {
  const color = data[id];
  
  // Fix metalic typo
  let type = color.colorType;
  if (type === 'metalic') type = 'metallic';
  if (type === 'matt') type = 'matte';
  if (type === 'gloss') type = 'glossy';
  
  // Normalize group
  const group = groupMap[color.swatchGroup] || color.swatchGroup.toLowerCase().replace(/[\s,&]+/g, '-');
  
  colors.push({
    id,
    name: color.colorName,
    hex: color.hex,
    type,
    group,
    alexSealColorNo: color.alexSealColorNo,
    index: color.index
  });
}

// Sort by index
colors.sort((a, b) => a.index - b.index);

// Generate TypeScript file content
let tsContent = `// Paint Color Library - Generated from Alex Seal color database
// This file contains the complete Alex Seal color library used in the Feadship refit configurator

export interface PaintColor {
  id: string;
  name: string;
  hex: string;
  type: 'glossy' | 'matte' | 'metallic';
  group: string;
  alexSealColorNo?: string;
  index?: number;
}

export const colorGroups = {
  'whites-beiges': 'Whites & Beiges',
  'golds-browns': 'Golds & Browns',
  'blacks-greys': 'Blacks & Greys',
  'blues': 'Blues',
  'greens': 'Greens',
  'reds-oranges-yellows': 'Reds, Oranges & Yellows',
  'custom-colours': 'Custom Colours'
} as const;

export type ColorGroup = keyof typeof colorGroups;

export const paintColors: PaintColor[] = [
`;

// Group colors by their group
const groupedColors = {};
colors.forEach(color => {
  if (!groupedColors[color.group]) {
    groupedColors[color.group] = [];
  }
  groupedColors[color.group].push(color);
});

// Define colorGroups for display names
const colorGroupsDisplay = {
  'whites-beiges': 'Whites & Beiges',
  'golds-browns': 'Golds & Browns',
  'blacks-greys': 'Blacks & Greys',
  'blues': 'Blues',
  'greens': 'Greens',
  'reds-oranges-yellows': 'Reds, Oranges & Yellows'
};

// Add colors grouped by type
const groupOrder = ['whites-beiges', 'golds-browns', 'blacks-greys', 'blues', 'greens', 'reds-oranges-yellows'];
groupOrder.forEach(group => {
  if (groupedColors[group]) {
    tsContent += `  // ${colorGroupsDisplay[group] || group}\n`;
    groupedColors[group].forEach(color => {
      tsContent += `  { id: "${color.id}", name: "${color.name}", hex: "${color.hex}", type: "${color.type}", group: "${color.group}", alexSealColorNo: "${color.alexSealColorNo}", index: ${color.index} },\n`;
    });
    tsContent += '\n';
  }
});

tsContent += `];

// Get colors filtered by group and/or type
export const getFilteredColors = (group: string | null, type: string | null): PaintColor[] => {
  let filtered = paintColors;
  
  if (group) {
    filtered = filtered.filter(color => color.group === group);
  }
  
  if (type) {
    filtered = filtered.filter(color => color.type === type);
  }
  
  return filtered;
};

// Get all unique paint types
export const getPaintTypes = (): string[] => {
  const types = new Set(paintColors.map(color => color.type));
  return Array.from(types);
};

// Get color by ID
export const getColorById = (id: string): PaintColor | undefined => {
  return paintColors.find(color => color.id === id);
};
`;

// Write the TypeScript file
const outputPath = path.join(__dirname, '../src/data/paintColors.ts');
fs.writeFileSync(outputPath, tsContent, 'utf8');

console.log(`Generated paintColors.ts with ${colors.length} colors`);
console.log('Groups found:', Object.keys(groupedColors));