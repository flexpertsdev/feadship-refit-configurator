// ==================================================
// AI EXPLANATION: yacht-v2.ts
// ==================================================
// WHAT: Core TypeScript type definitions for yacht configuration system v2 - defines YachtConfigV2, YachtModel, PaintConfig, and related interfaces for simplified 2-array system
// WHY: Without this, no type safety for yacht data - defines the entire data structure for configs, preferences, paint, models, and navigation state
// USED BY: yachtStore, yachtService, all pages handling yacht data, paint components, navigation system
// CRITICAL: YES - Breaking changes here cascade through entire app, affecting data persistence and API compatibility
// ==================================================

/**
 * Simplified Yacht Configuration Types V2
 * Two arrays system: configs and preferences
 */

// Generic library item (same schema for both libraries)
export interface LibraryItem {
  id: string;              // unique identifier
  category: string;        // grouping (page/section it belongs to)
  name: string;            // display name
  description?: string;    // optional description
  image?: string;          // image URL
  video?: string;          // YouTube/video URL (mainly for services)
  value?: number;          // for design levels (1, 2, or 3)
  metadata?: any;          // any extra data specific to this item
}

// Unified Color type for all paint/color uses
export interface Color {
  id: string;              // unique identifier
  name: string;            // color name
  hex: string;             // hex color value
  type: 'gloss' | 'matte' | 'metallic';  // finish type
  group: string;           // color group (e.g., 'Whites', 'Blues', 'custom')
}

// Legacy alias for backward compatibility (will be removed)
export type ColorItem = Color;

// Yacht Model Definition
export interface YachtModel {
  id: string;              // e.g., 'sea_owl', 'future_concept'
  name: string;            // display name
  available_extensions: number[];  // [0, 1, 2] or [0, 1, 2, 3, 4, 5]
  available_configs: string[];     // which configs this model supports
  restricted_configs?: string[];   // configs NOT available on this model
  pixel_stream_url: string;        // URL for 3D viewer
  default_extension: number;       // default extension value
}

// Paint configuration for a yacht part (simplified to match Color)
export interface PaintConfig {
  hex: string;             // hex color value
  type: 'gloss' | 'matte' | 'metallic';  // finish type
  group: string;           // color group
  name: string;            // color name
}

// Complete Yacht Configuration
export interface YachtConfigV2 {
  // Core identification
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  
  // Base model (determines available options)
  model_id: string;        // 'sea_owl', 'future_concept', etc.
  
  // Navigation state (stored with yacht!)
  active_level_1: string;  // e.g., 'DESIGN', 'PAINT', 'FEATURES'
  active_level_2: string;  // e.g., 'Hull', 'Interior', 'Complexity'
  active_level_3?: string; // e.g., 'Blues' (for paint color groups)
  
  // The two main arrays (just IDs!)
  configs: string[];       // ["jacuzzi", "helipad", "solar_panels", "crew_training"]
  preferences: string[];   // ["diving", "mediterranean", "design_complexity_2"]
  
  // Paint configuration (special case - needs full details)
  paint: {
    hull: PaintConfig;
    superstructure: PaintConfig;
    deckhouse: PaintConfig;
    mast: PaintConfig;
    bootstripe: PaintConfig;
  };
  
  // Custom colors created by user
  custom_colors: Color[];
  
  // Extension value (0-5, but limited by model)
  extension: number;
  
  // 3D yacht screenshot (captured when user saves)
  screenshot_url?: string;
}

// Type guard to check if using new v2 config
export function isYachtConfigV2(config: any): config is YachtConfigV2 {
  return config && 
    'configs' in config && 
    'preferences' in config && 
    'model_id' in config;
}