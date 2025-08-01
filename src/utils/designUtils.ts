// ==================================================
// AI EXPLANATION: designUtils.ts
// ==================================================
// WHAT: Design preference utilities mapping slider values to background images, titles, and descriptions for design steps, includes image preloading
// WHY: Without this, design pages wouldn't display correct backgrounds/text - provides visual content for design preference sliders
// USED BY: Design1Page, Design2Page, Design3Page for getting images, titles, descriptions based on slider values
// CRITICAL: NO - UI display utilities, breaking this affects visuals but not core functionality
// ==================================================

import { useEffect } from 'react';
import { getDesignStyles, getStyleForValue, type DesignStyleGroup } from '@/config';

// Map step numbers to design style groups
const STEP_TO_GROUP: Record<number, DesignStyleGroup> = {
  1: 'clean-complex',
  2: 'vintage-modern',
  3: 'traditional-radical'
};

/**
 * Get the background image URL based on the slider value and design step
 * @param step The design step (1, 2, or 3)
 * @param value The slider value (0-4)
 * @returns The URL of the background image
 */
export const getBackgroundImageUrl = (step: number, value: number): string => {
  const group = STEP_TO_GROUP[step];
  if (!group) {
    // Fallback to old logic if step not found
    const imageNumber = value + 1;
    return `/assets/step${step}/${imageNumber}.jpg`;
  }
  
  const style = getStyleForValue(group, value);
  return style?.image || `/assets/step${step}/${value + 1}.jpg`;
};

/**
 * Get the title for a design step based on the slider value
 * @param step The design step (1, 2, or 3)
 * @param value The slider value (0-4)
 * @returns The title for the current step and value
 */
export const getDesignTitle = (step: number, value: number): string => {
  const group = STEP_TO_GROUP[step];
  if (!group) return '';
  
  const style = getStyleForValue(group, value);
  return style?.name?.toUpperCase() || '';
};

/**
 * Get the description for a design step based on the slider value
 * @param step The design step (1, 2, or 3)
 * @param value The slider value (0-4)
 * @returns The description for the current step and value
 */
export const getDesignDescription = (step: number, value: number): string => {
  const group = STEP_TO_GROUP[step];
  if (!group) return '';
  
  const style = getStyleForValue(group, value);
  return style?.details || '';
};

/**
 * Preload images for a specific design step
 * @param step The design step to preload images for
 */
export const usePreloadImages = (step: number) => {
  useEffect(() => {
    const group = STEP_TO_GROUP[step];
    if (!group) return;
    
    const styles = getDesignStyles(group);
    styles.forEach(style => {
      if (style.image) {
        const img = new Image();
        img.src = style.image;
      }
    });
  }, [step]);
};