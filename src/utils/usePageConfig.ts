// ==================================================
// AI EXPLANATION: usePageConfig.ts
// ==================================================
// WHAT: This file contains usePageConfig.ts
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================


import { useYachtStore } from '../stores/yachtStore';
import { getBackgroundImageUrl, getDesignTitle, getDesignDescription } from './designUtils';

interface PageConfig {
  preTitle: string;
  title: string;
  subtitle: string;
  step: string;
  backgroundColor?: string;
  textColor?: string;
  backgroundImage?: string;
  imageStyles?: string;
}

export const usePageConfig = (): PageConfig => {
  const { currentYacht } = useYachtStore();
  const activeLevel1 = currentYacht?.active_level_1 || null;
  const activeLevel2 = currentYacht?.active_level_2 || null;
  const complexityLevel = useYachtStore(state => state.complexity_level);
  const styleLevel = useYachtStore(state => state.style_level);
  const traditionalLevel = useYachtStore(state => state.traditional_level);
  
  // Default config
  const defaultConfig: PageConfig = {
    preTitle: "",
    title: "",
    subtitle: "",
    step: "",
    backgroundColor: "bg-primary",
    textColor: "text-white",
    backgroundImage: undefined,
    imageStyles: "bg-cover bg-center"
  };
  
  // Design Pages Config
  if (activeLevel1 === 'DESIGN') {
    let stepNumber = 1;
    let designLevel = complexityLevel;
    let designKey = "complexity_level";
    
    if (activeLevel2 === 'vintage') {
      stepNumber = 2;
      designLevel = styleLevel;
      designKey = "style_level";
    } else if (activeLevel2 === 'traditional') {
      stepNumber = 3;
      designLevel = traditionalLevel;
      designKey = "traditional_level";
    }
    
    console.log(`usePageConfig - ${designKey}:`, designLevel);
    
    return {
      ...defaultConfig,
      preTitle: `Step ${stepNumber} / Design Preferences`,
      title: getDesignTitle(stepNumber, designLevel),
      subtitle: getDesignDescription(stepNumber, designLevel),
      step: `Step ${stepNumber}`,
      backgroundImage: getBackgroundImageUrl(stepNumber, designLevel)
    };
  }
  
  // Operations Pages Config
  if (activeLevel1 === 'OPERATION') {
    const operationConfigs = {
      'map': {
        title: "WHERE WILL YOU SAIL?",
        subtitle: "Choose your preferred destinations to explore the world."
      },
      'who': {
        title: "MAXIMIZE YOUR FEADSHIP",
        subtitle: "Choose how you'll use your yacht to unlock its full potential."
      },
      'what': {
        title: "LIVE YOUR DREAM ABOARD",
        subtitle: "Select your activities for your Feadship getaway."
      }
    };
    
    const configKey = activeLevel2 || 'map';
    const currentConfig = operationConfigs[configKey] || operationConfigs['map'];
    
    return {
      ...defaultConfig,
      preTitle: `Step 4 / ${activeLevel2 === 'map' ? 'WHERE TO GO' : activeLevel2 === 'who' ? 'WHAT TYPE OF OPERATION WILL YOU RUN' : activeLevel2 === 'what' ? 'WHAT WOULD YOU LIKE TO DO' : 'WHERE TO GO'}`,
      title: currentConfig.title,
      subtitle: currentConfig.subtitle,
      step: "Step 4"
    };
  }
  
  // Paint Config
  if (activeLevel1 === 'PAINT') {
    return {
      ...defaultConfig,
      preTitle: "Step 5 / Paint",
      title: "BRING YOUR VISION TO LIFE!",
      subtitle: "Start configuring your Feadship with personalized features and luxurious details tailored to your desires.",
      step: "Step 5"
    };
  }
  
  // Extensions Config
  if (activeLevel1 === 'EXTENSIONS') {
    return {
      ...defaultConfig,
      preTitle: "Step 5 / Extensions",
      title: "EXTEND YOUR YACHT",
      subtitle: "Configure extensions and additional structures for your Feadship.",
      step: "Step 5"
    };
  }
  
  // Features Config
  if (activeLevel1 === 'FEATURES') {
    const featureConfigs = {
      'exterior': {
        title: "EXTERIOR FEATURES",
        subtitle: "Select your preferred exterior features."
      },
      'interior': {
        title: "INTERIOR FEATURES",
        subtitle: "Select your preferred interior features."
      },
      'toys': {
        title: "TOYS & TENDERS",
        subtitle: "Select your preferred toys and tenders."
      },
      'additional': {
        title: "ADDITIONAL FEATURES",
        subtitle: "Select your preferred additional features."
      }
    };
    
    const configKey = activeLevel2 || 'exterior';
    const currentConfig = featureConfigs[configKey] || featureConfigs['exterior'];
    
    return {
      ...defaultConfig,
      preTitle: `Step 5 / ${configKey.charAt(0).toUpperCase() + configKey.slice(1)}`,
      title: currentConfig.title,
      subtitle: currentConfig.subtitle,
      step: "Step 5"
    };
  }
  
  // Sustainability Config
  if (activeLevel1 === 'SUSTAINABILITY') {
    const sustainabilityConfigs = {
      'power': {
        title: "POWER SUPPLY & PROPULSION",
        subtitle: "Select sustainable power and propulsion features for your eco-conscious yacht."
      },
      'energy': {
        title: "ENERGY EFFICIENCY",
        subtitle: "Choose energy efficiency options for your sustainable yacht."
      }
    };
    
    const currentConfig = sustainabilityConfigs[activeLevel2 || 'power'];
    
    return {
      ...defaultConfig,
      preTitle: `Step 6 / Sustainability`,
      title: currentConfig.title,
      subtitle: currentConfig.subtitle,
      step: "Step 6"
    };
  }
  
  // Services Config
  if (activeLevel1 === 'SERVICES') {
    return {
      ...defaultConfig,
      preTitle: "Step 7 / Services",
      title: "SUITE OF SERVICES",
      subtitle: "Choose additional services to enhance your yacht experience.",
      step: "Step 7"
    };
  }
  
  // Summary Config
  if (activeLevel1 === 'SUMMARY') {
    return {
      ...defaultConfig,
      preTitle: "Final Step",
      title: "YOUR CUSTOM FEADSHIP",
      subtitle: "Review your customized Feadship configuration.",
      step: "Summary"
    };
  }
  
  return defaultConfig;
};
