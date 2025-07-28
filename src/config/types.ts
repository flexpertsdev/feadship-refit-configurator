// ==================================================
// AI EXPLANATION: types.ts
// ==================================================
// WHAT: This file contains types.ts
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================

/**
 * Feadship Configuration System Types
 * 
 * This system separates yacht configurations into two main categories:
 * 1. Yacht Features - Physical features, equipment, and services attached to the yacht
 * 2. Human Preferences - Personal preferences, activities, experiences, and emotional aspects
 * 
 * The separation allows for:
 * - Clear distinction between hardware and human elements
 * - Easy filtering and querying
 * - Type-safe configuration management
 * - Extensible architecture for future additions
 */

/**
 * Yacht Feature Types
 * Physical elements that can be added to or are part of a yacht
 */
export type YachtFeatureType = 
  | 'model'          // Yacht models (e.g., Feadship 75, Feadship 120)
  | 'feature'        // Physical features (pools, helipads, cinemas)
  | 'equipment'      // Equipment and toys (tender garage, submarine)
  | 'service'        // Services (crew training, concierge)
  | 'sustainability' // Eco-friendly features (solar, hybrid propulsion)

/**
 * Feature Categories
 * Used to group related yacht features
 */
export type YachtFeatureCategory = 
  // Feature categories (matching existing app)
  | 'exterior'            // All exterior features
  | 'interior'            // All interior features
  | 'toys_and_tender'     // Toys and tenders
  | 'additional'          // Additional features
  
  // Sustainability categories
  | 'power_supply_and_propulsion'  // Power and propulsion
  | 'energy_efficiency'            // Energy efficiency
  
  // Service categories
  | 'suite_of_services'   // All services
  
  // Legacy categories (for backwards compatibility)
  | 'exterior-wellness'    // Jacuzzi, outdoor spa
  | 'exterior-recreation'  // Pools, beach club
  | 'exterior-transport'   // Helipad, tender storage
  | 'interior-entertainment' // Cinema, observatory
  | 'interior-wellness'      // Spa, gym
  | 'interior-dining'        // Wine cellar, chef's table
  | 'storage'    // Tender garage, toy storage
  | 'adventure'  // Submarine bay, dive center
  | 'energy'     // Solar, wind power
  | 'propulsion' // Hybrid, electric
  | 'crew'       // Training, management
  | 'lifestyle'  // Concierge, planning

/**
 * Yacht Feature Interface
 * Represents any physical feature, equipment, or service that can be added to a yacht
 */
export interface YachtFeature {
  /** Unique identifier for the feature */
  id: string;
  
  /** Type of yacht feature */
  type: YachtFeatureType;
  
  /** Optional category for grouping */
  category?: YachtFeatureCategory;
  
  /** Display name */
  name: string;
  
  // Yacht Model specific fields
  /** Series name for yacht models (e.g., 'Classic', 'Superyacht') */
  series?: string;
  
  /** Length in meters for yacht models */
  length?: number;
  
  /** Array of feature IDs that are available for this yacht model */
  availableFeatures?: string[];
  
  /** Array of feature IDs that come standard with this yacht model */
  defaultFeatures?: string[];
  
  /** Array of feature IDs that cannot be installed on this yacht model */
  incompatibleFeatures?: string[];
  
  // Feature/Equipment specific fields
  /** Path to feature image */
  image?: string;
  
  /** Short description (1-2 lines) */
  details?: string;
  
  /** Extended description with full details */
  detailsExtended?: string;
  
  /** Whether this feature requires significant deck/interior space */
  requiresSpace?: boolean;
  
  /** Whether this feature requires structural modifications to the yacht */
  requiresStructural?: boolean;
}

/**
 * Human Preference Types
 * Personal and emotional aspects of yacht configuration
 */
export type HumanPreferenceType = 
  | 'design-style' // Design aesthetic preferences (sliders)
  | 'activity'     // Activities and experiences
  | 'destination'  // Cruising destinations
  | 'experience'   // Types of experiences sought
  | 'preference'   // General preferences
  | 'mood'         // Mood/atmosphere preferences
  | 'operation-type' // Private vs Charter operation

/**
 * Activity Categories
 * Groups for different types of activities
 */
export type ActivityCategory = 
  | 'wellness'    // Yoga, spa, meditation
  | 'watersports' // Diving, jet-skiing, swimming
  | 'adventure'   // Exploration, wildlife
  | 'social'      // Dining, entertainment
  | 'cultural'    // Art, music, education

/**
 * Design Style Groups
 * The three design preference sliders
 */
export type DesignStyleGroup = 
  | 'clean-complex'       // Slider 1: Clean → Complex
  | 'vintage-modern'      // Slider 2: Vintage → Modern  
  | 'traditional-radical' // Slider 3: Traditional → Radical

/**
 * Seasons for destination planning
 */
export type Season = 'spring' | 'summer' | 'fall' | 'winter'

/**
 * Human Preference Interface
 * Represents personal preferences, activities, and experiences
 */
export interface HumanPreference {
  /** Unique identifier */
  id: string;
  
  /** Type of preference */
  type: HumanPreferenceType;
  
  /** Optional category for grouping */
  category?: ActivityCategory | string;
  
  /** Display name */
  name: string;
  
  // Design Style specific fields
  /** Which slider group this belongs to */
  group?: DesignStyleGroup;
  
  /** Numeric value on the slider (0-4) */
  value?: number;
  
  /** Display order within a group */
  order?: number;
  
  // Common fields
  /** Path to image */
  image?: string;
  
  /** Short description (1-2 lines) */
  details?: string;
  
  /** Extended description with full details */
  detailsExtended?: string;
  
  /** Searchable tags */
  tags?: string[];
  
  /** Applicable seasons (for destinations) */
  season?: Season[];
}

/**
 * Combined Configuration Item
 * Union type for when you need to work with both types together
 */
export type ConfigItem = YachtFeature | HumanPreference

/**
 * Type Guards
 * Helper functions to determine which type of config item you're working with
 */
export const isYachtFeature = (item: ConfigItem): item is YachtFeature => {
  return ['model', 'feature', 'equipment', 'service', 'sustainability'].includes(item.type);
}

export const isHumanPreference = (item: ConfigItem): item is HumanPreference => {
  return ['design-style', 'activity', 'destination', 'experience', 'preference', 'mood'].includes(item.type);
}

export const isYachtModel = (item: ConfigItem): item is YachtFeature => {
  return item.type === 'model';
}

export const isDesignStyle = (item: ConfigItem): item is HumanPreference => {
  return item.type === 'design-style';
}

/**
 * Utility Types
 * Helpful type extractors for specific use cases
 */

/** Extract just yacht models from YachtFeature */
export type YachtModel = YachtFeature & { type: 'model' }

/** Extract just design styles from HumanPreference */
export type DesignStyle = HumanPreference & { type: 'design-style' }

/** Extract just activities from HumanPreference */
export type Activity = HumanPreference & { type: 'activity' }

/** Extract just destinations from HumanPreference */
export type Destination = HumanPreference & { type: 'destination' }

/**
 * Configuration Query Types
 * For filtering and searching configurations
 */
export interface YachtFeatureQuery {
  type?: YachtFeatureType | YachtFeatureType[];
  category?: YachtFeatureCategory | YachtFeatureCategory[];
  requiresSpace?: boolean;
  requiresStructural?: boolean;
  compatibleWith?: string; // yacht model ID
}

export interface HumanPreferenceQuery {
  type?: HumanPreferenceType | HumanPreferenceType[];
  category?: string | string[];
  group?: DesignStyleGroup;
  tags?: string[];
  season?: Season[];
}

/**
 * Yacht Configuration State
 * Represents a complete yacht configuration
 */
export interface YachtConfiguration {
  /** Selected yacht model ID */
  modelId: string;
  
  /** Selected feature IDs */
  features: string[];
  
  /** Design style selections (group -> value) */
  designStyles: Record<DesignStyleGroup, number>;
  
  /** Selected activity IDs */
  activities: string[];
  
  /** Selected destination IDs */
  destinations: string[];
  
  /** Selected mood/experience IDs */
  moods: string[];
  
  /** Paint configuration (if needed) */
  paintConfig?: {
    hull: string;
    superstructure: string;
    bootstripe?: string;
    accent?: string;
  };
  
  /** Custom preferences */
  customPreferences?: Record<string, any>;
}

/**
 * Validation Types
 * For ensuring valid configurations
 */
export interface ValidationResult {
  valid: boolean;
  errors?: ValidationError[];
  warnings?: ValidationWarning[];
}

export interface ValidationError {
  type: 'incompatible' | 'missing-required' | 'exceeds-space' | 'structural-conflict';
  featureId?: string;
  message: string;
}

export interface ValidationWarning {
  type: 'recommended' | 'better-alternative' | 'seasonal-mismatch';
  featureId?: string;
  message: string;
}
