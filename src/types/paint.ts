// ==================================================
// AI EXPLANATION: paint.ts
// ==================================================
// WHAT: TypeScript interfaces and constants for yacht paint system - defines YachtColor, ColorSelection, PaintPanelProps, and mappings for paint types and yacht parts
// WHY: Without this, paint components lack type safety - provides the structure for color data, paint finishes (gloss/metallic/matte), and yacht part names
// USED BY: SimplePaintPanel, PaintSection, paint utils (db.ts), color picker components, paint configuration system
// CRITICAL: YES - Core paint system types, changing these affects paint selection, color display, and data persistence
// ==================================================


export interface YachtColor {
  id: string;
  color_name: string;
  color_string: string;
  color_type: string;
  color_group: string;
}

export interface ColorSelection {
  color: string;
  type: string;
  name: string;
  group?: string;
}

export interface PaintPanelProps {
  onColorChange?: (part: string, color: string, type: string, name: string, group?: string) => void;
  savedColors?: Record<string, ColorSelection>;
  isLoading?: boolean;
}

export const PAINT_TYPE_MAP = {
  'gloss': ['gloss', 'glossy'],
  'metallic': ['metallic', 'metalic'],
  'matte': ['matte', 'matt']
};

export const YACHT_PARTS = ['Hull', 'Superstructure', 'Deckhouse', 'Mast', 'Bootstripe'];
