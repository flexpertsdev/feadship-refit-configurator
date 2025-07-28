// ==================================================
// AI EXPLANATION: index.ts
// ==================================================
// WHAT: Central configuration export hub - re-exports all yacht features, human preferences, types, and utility functions from config module
// WHY: Without this, components would need multiple imports - provides single import point for all configuration data and utilities
// USED BY: DesignPage, feature selection components, preference components, any component needing config data
// CRITICAL: YES - Central configuration module, breaking this affects all feature/preference imports throughout app
// ==================================================

/**
 * Feadship Configuration System
 * 
 * Central export point for all configuration types and data
 */

// Export all types
export * from './types';

// Export configuration data
export { YACHT_FEATURES } from './yacht-features';
export { HUMAN_PREFERENCES } from './human-preferences';

// Export utility functions from yacht features
export { 
  getYachtModels,
  getFeaturesForYacht,
  isFeatureCompatible 
} from './yacht-features';

// Export utility functions from human preferences
export { 
  getDesignStyles,
  getActivities,
  getDestinations,
  getPreferencesByTags,
  getStyleForValue,
  getOperationTypes
} from './human-preferences';

// Combined utility functions
import { YACHT_FEATURES } from './yacht-features';
import { HUMAN_PREFERENCES } from './human-preferences';
import type { ConfigItem, YachtFeatureQuery, HumanPreferenceQuery, YachtFeature, HumanPreference } from './types';

/**
 * Get all configuration items
 */
export const getAllConfigs = (): ConfigItem[] => {
  return [...YACHT_FEATURES, ...HUMAN_PREFERENCES];
};

/**
 * Search configurations by ID
 */
export const getConfigById = (id: string): ConfigItem | undefined => {
  return getAllConfigs().find(item => item.id === id);
};

/**
 * Search configurations by multiple IDs
 */
export const getConfigsByIds = (ids: string[]): ConfigItem[] => {
  const configs = getAllConfigs();
  return configs.filter(item => ids.includes(item.id));
};

/**
 * Query yacht features with filters
 */
export const queryYachtFeatures = (query: YachtFeatureQuery): YachtFeature[] => {
  let results = YACHT_FEATURES;
  
  if (query.type) {
    const types = Array.isArray(query.type) ? query.type : [query.type];
    results = results.filter(f => types.includes(f.type));
  }
  
  if (query.category) {
    const categories = Array.isArray(query.category) ? query.category : [query.category];
    results = results.filter(f => f.category && categories.includes(f.category));
  }
  
  if (query.requiresSpace !== undefined) {
    results = results.filter(f => f.requiresSpace === query.requiresSpace);
  }
  
  if (query.requiresStructural !== undefined) {
    results = results.filter(f => f.requiresStructural === query.requiresStructural);
  }
  
  if (query.compatibleWith) {
    const yacht = YACHT_FEATURES.find(f => f.id === query.compatibleWith && f.type === 'model');
    if (yacht?.availableFeatures) {
      results = results.filter(f => yacht.availableFeatures!.includes(f.id));
    }
  }
  
  return results;
};

/**
 * Query human preferences with filters
 */
export const queryHumanPreferences = (query: HumanPreferenceQuery): HumanPreference[] => {
  let results = HUMAN_PREFERENCES;
  
  if (query.type) {
    const types = Array.isArray(query.type) ? query.type : [query.type];
    results = results.filter(p => types.includes(p.type));
  }
  
  if (query.category) {
    const categories = Array.isArray(query.category) ? query.category : [query.category];
    results = results.filter(p => p.category && categories.includes(p.category));
  }
  
  if (query.group) {
    results = results.filter(p => p.group === query.group);
  }
  
  if (query.tags && query.tags.length > 0) {
    results = results.filter(p => 
      p.tags?.some(tag => query.tags!.includes(tag))
    );
  }
  
  if (query.season && query.season.length > 0) {
    results = results.filter(p => 
      p.season?.some(s => query.season!.includes(s))
    );
  }
  
  return results;
};
