/**
 * Unified page configuration for Features, Sustainability, and Services pages
 * Replaces useFeatureConfig, useSustainabilityConfig, useServicesConfig, and usePageConfig
 */

import { useYachtStore } from '@/stores/yachtStore';

export interface PageConfiguration {
  // Display properties
  preTitle: string;
  title: string;
  subtitle: string;
  
  // Data properties
  category: string;  // Used to filter configs from configs-library
  
  // Navigation properties
  nextLevel1?: string;
  nextLevel2?: string;
  nextPath?: string;
}

/**
 * Single hook that handles all configuration pages
 * Determines config based on active_level_1 and active_level_2
 */
export const useUnifiedPageConfig = (): PageConfiguration => {
  const { currentYacht } = useYachtStore();
  const activeLevel1 = currentYacht?.active_level_1 || null;
  const activeLevel2 = currentYacht?.active_level_2 || null;
  
  // Features configuration
  if (activeLevel1 === 'FEATURES') {
    const configs: Record<string, PageConfiguration> = {
      'exterior': {
        preTitle: 'Step 5 / Exterior',
        title: 'EXTERIOR FEATURES',
        subtitle: 'Select your preferred exterior features.',
        category: 'exterior',
        nextLevel1: 'FEATURES',
        nextLevel2: 'interior',
        nextPath: '/features'
      },
      'interior': {
        preTitle: 'Step 5 / Interior',
        title: 'INTERIOR FEATURES',
        subtitle: 'Select your preferred interior features.',
        category: 'interior',
        nextLevel1: 'FEATURES',
        nextLevel2: 'toys',
        nextPath: '/features'
      },
      'toys': {
        preTitle: 'Step 5 / Toys & Tenders',
        title: 'TOYS & TENDERS',
        subtitle: 'Select your preferred toys and tenders.',
        category: 'toys',
        nextLevel1: 'SUSTAINABILITY',
        nextLevel2: 'power',
        nextPath: '/sustainability'
      }
    };
    
    return configs[activeLevel2 || 'exterior'] || configs['exterior'];
  }
  
  // Sustainability configuration
  if (activeLevel1 === 'SUSTAINABILITY') {
    return {
      preTitle: 'Step 6 / Sustainability',
      title: 'SUSTAINABLE FEATURES',
      subtitle: 'Select eco-friendly options for your yacht.',
      category: 'sustainability',
      nextLevel1: 'SERVICES',
      nextLevel2: 'suite',
      nextPath: '/services'
    };
  }
  
  // Services configuration
  if (activeLevel1 === 'SERVICES') {
    return {
      preTitle: 'Step 7 / Services',
      title: 'SUITE OF SERVICES',
      subtitle: 'Choose additional services to enhance your yacht experience.',
      category: 'services',
      nextLevel1: 'SUMMARY',
      nextLevel2: null,
      nextPath: '/summary'
    };
  }
  
  // Paint configuration
  if (activeLevel1 === 'PAINT') {
    return {
      preTitle: 'Step 5 / Paint',
      title: 'BRING YOUR VISION TO LIFE!',
      subtitle: 'Customize your yacht with personalized paint colors.',
      category: 'paint'
    };
  }
  
  // Operations configuration
  if (activeLevel1 === 'OPERATION') {
    const operationConfigs: Record<string, Partial<PageConfiguration>> = {
      'map': {
        title: 'WHERE WILL YOU SAIL?',
        subtitle: 'Choose your preferred destinations to explore the world.'
      },
      'who': {
        title: 'MAXIMIZE YOUR FEADSHIP',
        subtitle: "Choose how you'll use your yacht to unlock its full potential."
      },
      'what': {
        title: 'LIVE YOUR DREAM ABOARD',
        subtitle: "Select your activities for your Feadship getaway."
      }
    };
    
    const config = operationConfigs[activeLevel2 || 'map'] || operationConfigs['map'];
    
    return {
      preTitle: `Step 4 / Operations`,
      title: config.title || '',
      subtitle: config.subtitle || '',
      category: 'operations'
    };
  }
  
  // Design configuration
  if (activeLevel1 === 'DESIGN') {
    const designNames: Record<string, string> = {
      'complexity': 'Design Complexity',
      'vintage': 'Design Style',
      'traditional': 'Traditional Elements'
    };
    
    const name = designNames[activeLevel2 || 'complexity'];
    const stepMap = { 'complexity': 1, 'vintage': 2, 'traditional': 3 };
    const step = stepMap[activeLevel2 as keyof typeof stepMap] || 1;
    
    return {
      preTitle: `Step ${step} / ${name}`,
      title: name?.toUpperCase() || 'DESIGN PREFERENCES',
      subtitle: 'Adjust the slider to set your design preference.',
      category: 'design'
    };
  }
  
  // Default configuration
  return {
    preTitle: '',
    title: '',
    subtitle: '',
    category: ''
  };
};