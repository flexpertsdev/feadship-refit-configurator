// ==================================================
// AI EXPLANATION: yachtStore.ts
// ==================================================
// WHAT: Global Zustand store managing all yacht configuration state including model, features, preferences, paint colors, design levels, and navigation state with persistence to localStorage
// WHY: Without this, no yacht configuration data would be saved/retrieved, all customization would be lost on refresh, and components couldn't share yacht state
// USED BY: ConfiguratorPage, SummaryPage, all design pages, feature selection components, paint panels, navigation components
// CRITICAL: YES - Core state management for entire yacht configuration flow, deleting breaks all customization features
// ==================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { YachtConfigV2, PaintConfig } from '@/types/yacht-v2';
import { 
  createNewYachtV2, 
  updateYachtV2, 
  fetchUserYachtsV2,
  deleteYachtV2 
} from '@/services/yachtService';
import {
  getDesignLevelFromPreferences,
  setDesignLevelInPreferences
} from '@/data/preferences-library';

interface YachtState {
  currentYacht: YachtConfigV2 | null;
  
  // Actions
  setCurrentYacht: (yacht: YachtConfigV2 | null) => void;
  createYacht: (name: string, modelId?: string) => Promise<YachtConfigV2 | null>;
  updateYacht: (updates: Partial<YachtConfigV2>) => Promise<void>;
  deleteYacht: (id: string) => Promise<boolean>;
  
  // Config management
  addConfig: (configId: string) => Promise<void>;
  removeConfig: (configId: string) => Promise<void>;
  toggleConfig: (configId: string) => Promise<void>;
  
  // Preference management  
  addPreference: (preferenceId: string) => Promise<void>;
  removePreference: (preferenceId: string) => Promise<void>;
  togglePreference: (preferenceId: string) => Promise<void>;
  
  // Design level helpers
  setDesignLevel: (category: string, value: number) => Promise<void>;
  getDesignLevel: (category: string) => number;
  
  // Paint management
  updatePaintColor: (part: keyof YachtConfigV2['paint'], paintConfig: PaintConfig) => Promise<void>;
  addCustomColor: (color: any) => Promise<void>;
  
  // Extension
  setExtension: (value: number) => Promise<void>;
  
  // Navigation state
  setNavigationState: (level1: string, level2: string, level3?: string) => Promise<void>;
  
  // V1 Compatibility methods
  complexity_level: number;
  style_level: number;
  traditional_level: number;
  extensionType: string;
  setComplexityLevel: (value: number) => void;
  setStyleLevel: (value: number) => void;
  setTraditionalLevel: (value: number) => void;
  setExtensionType: (type: string) => void;
  updateYachtColor: (part: string, color: string, type: string, name: string, colorGroup?: string) => Promise<void>;
  resetDesignLevels: () => void;
  saveYachtData: (data: any) => Promise<void>;
}

export const useYachtStore = create<YachtState>()(
  persist(
    (set, get) => ({
      currentYacht: null,
      
      setCurrentYacht: (yacht) => {
        set({ currentYacht: yacht });
        if (yacht) {
          localStorage.setItem('currentYachtId', yacht.id);
          // Sync design levels from preferences
          set({
            complexity_level: get().getDesignLevel('design_complexity'),
            style_level: get().getDesignLevel('design_radical'),
            traditional_level: get().getDesignLevel('design_traditional'),
            extensionType: yacht.extension.toString()
          });
        } else {
          localStorage.removeItem('currentYachtId');
          set({
            complexity_level: 2,
            style_level: 2,
            traditional_level: 2,
            extensionType: 'original'
          });
        }
      },
      
      createYacht: async (name, modelId = 'sea_owl') => {
        const yacht = await createNewYachtV2(name, modelId);
        if (yacht) {
          set({ currentYacht: yacht });
        }
        return yacht;
      },
      
      updateYacht: async (updates) => {
        const { currentYacht } = get();
        if (!currentYacht) return;
        
        const updatedYacht = await updateYachtV2(currentYacht.id, updates);
        if (updatedYacht) {
          set({ currentYacht: updatedYacht });
        }
      },
      
      deleteYacht: async (id) => {
        const success = await deleteYachtV2(id);
        const { currentYacht } = get();
        
        if (success && currentYacht?.id === id) {
          set({ currentYacht: null });
        }
        
        return success;
      },
      
      // Config management
      addConfig: async (configId) => {
        const { currentYacht, updateYacht } = get();
        if (!currentYacht) return;
        
        if (!currentYacht.configs.includes(configId)) {
          await updateYacht({
            configs: [...currentYacht.configs, configId]
          });
        }
      },
      
      removeConfig: async (configId) => {
        const { currentYacht, updateYacht } = get();
        if (!currentYacht) return;
        
        await updateYacht({
          configs: currentYacht.configs.filter(id => id !== configId)
        });
      },
      
      toggleConfig: async (configId) => {
        const { currentYacht, addConfig, removeConfig } = get();
        if (!currentYacht) return;
        
        if (currentYacht.configs.includes(configId)) {
          await removeConfig(configId);
        } else {
          await addConfig(configId);
        }
      },
      
      // Preference management
      addPreference: async (preferenceId) => {
        const { currentYacht, updateYacht } = get();
        if (!currentYacht) return;
        
        if (!currentYacht.preferences.includes(preferenceId)) {
          await updateYacht({
            preferences: [...currentYacht.preferences, preferenceId]
          });
        }
      },
      
      removePreference: async (preferenceId) => {
        const { currentYacht, updateYacht } = get();
        if (!currentYacht) return;
        
        await updateYacht({
          preferences: currentYacht.preferences.filter(id => id !== preferenceId)
        });
      },
      
      togglePreference: async (preferenceId) => {
        const { currentYacht, addPreference, removePreference } = get();
        if (!currentYacht) return;
        
        if (currentYacht.preferences.includes(preferenceId)) {
          await removePreference(preferenceId);
        } else {
          await addPreference(preferenceId);
        }
      },
      
      // Design level helpers
      setDesignLevel: async (category, value) => {
        const { currentYacht, updateYacht } = get();
        if (!currentYacht) return;
        
        const newPreferences = setDesignLevelInPreferences(
          currentYacht.preferences,
          category,
          value
        );
        
        await updateYacht({ preferences: newPreferences });
      },
      
      getDesignLevel: (category) => {
        const { currentYacht } = get();
        if (!currentYacht) return 2; // default middle value
        
        return getDesignLevelFromPreferences(currentYacht.preferences, category);
      },
      
      // Paint management
      updatePaintColor: async (part, paintConfig) => {
        const { currentYacht, updateYacht } = get();
        if (!currentYacht) return;
        
        await updateYacht({
          paint: {
            ...currentYacht.paint,
            [part]: paintConfig
          }
        });
      },
      
      addCustomColor: async (color) => {
        const { currentYacht, updateYacht } = get();
        if (!currentYacht) return;
        
        // Check if color already exists
        const exists = currentYacht.custom_colors.some(c => c.hex === color.hex);
        if (!exists) {
          await updateYacht({
            custom_colors: [...currentYacht.custom_colors, color]
          });
        }
      },
      
      // Extension
      setExtension: async (value) => {
        const { updateYacht } = get();
        await updateYacht({ extension: value });
      },
      
      // Navigation state
      setNavigationState: async (level1, level2, level3) => {
        const { updateYacht } = get();
        await updateYacht({
          active_level_1: level1,
          active_level_2: level2,
          active_level_3: level3
        });
      },
      
      // V1 Compatibility methods
      complexity_level: 2,
      style_level: 2,
      traditional_level: 2,
      extensionType: 'original',
      
      setComplexityLevel: (value) => {
        set({ complexity_level: value });
        get().setDesignLevel('design_complexity', value);
      },
      
      setStyleLevel: (value) => {
        set({ style_level: value });
        get().setDesignLevel('design_radical', value);
      },
      
      setTraditionalLevel: (value) => {
        set({ traditional_level: value });
        get().setDesignLevel('design_traditional', value);
      },
      
      setExtensionType: (type) => {
        set({ extensionType: type });
        get().setExtension(parseInt(type) || 0);
      },
      
      updateYachtColor: async (part, color, type, name, colorGroup) => {
        if (part === 'custom_colors') {
          // Handle custom colors array update
          try {
            const customColors = JSON.parse(color);
            const { currentYacht, updateYacht } = get();
            if (currentYacht) {
              await updateYacht({ custom_colors: customColors });
            }
          } catch (err) {
            console.error('Failed to parse custom colors:', err);
          }
          return;
        }
        
        // Normal color update
        const paintPart = part as keyof YachtConfigV2['paint'];
        await get().updatePaintColor(paintPart, {
          color,
          type,
          name,
          group: colorGroup || 'Custom Colors'
        });
      },
      
      resetDesignLevels: () => {
        set({
          complexity_level: 2,
          style_level: 2,
          traditional_level: 2
        });
        const { setDesignLevel } = get();
        setDesignLevel('design_complexity', 2);
        setDesignLevel('design_traditional', 2);
        setDesignLevel('design_radical', 2);
      },
      
      saveYachtData: async (data) => {
        await get().updateYacht(data);
      }
    }),
    {
      name: 'yacht-storage',
    }
  )
);