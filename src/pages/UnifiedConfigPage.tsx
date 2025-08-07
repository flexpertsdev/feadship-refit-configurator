/**
 * Unified configuration page for Features, Sustainability, and Services
 * Replaces three separate pages with one clean implementation
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/navigation/NavigationBar';
import LogoRow from '@/components/layout/LogoRow';
import FeatureGrid from '@/components/features/FeatureGrid';
import { ActionButton } from '@/components/ui/action-button';
import { useUnifiedPageConfig } from '@/utils/unifiedPageConfig';
import { useFeatureSelection } from '@/hooks/useFeatureSelection';
import { useYachtStore } from '@/stores/yachtStore';

const UnifiedConfigPage = () => {
  const navigate = useNavigate();
  const { setNavigationState } = useYachtStore();
  
  // Get page configuration based on current navigation state
  const pageConfig = useUnifiedPageConfig();
  
  // Get features for the current category
  const { 
    features, 
    selectedFeatures, 
    isLoading, 
    handleFeatureSelect 
  } = useFeatureSelection({
    category: pageConfig.category
  });
  
  // Handle navigation to next section
  const handleNext = () => {
    if (pageConfig.nextLevel1 && pageConfig.nextPath) {
      setNavigationState(
        pageConfig.nextLevel1,
        pageConfig.nextLevel2 || null,
        null
      );
      navigate(pageConfig.nextPath);
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-primary">
      <LogoRow />
      <NavigationBar position="top" />
      
      {/* Main content area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 sm:px-8 tablet:px-10 py-6 sm:py-8 text-white">
          {pageConfig.preTitle && (
            <p className="text-xs sm:text-sm uppercase tracking-wider text-white/80 mb-1 font-gotham">
              {pageConfig.preTitle}
            </p>
          )}
          <h1 className="text-xl sm:text-2xl tablet:text-3xl font-bold mb-1 sm:mb-2 font-gotham">
            {pageConfig.title}
          </h1>
          {pageConfig.subtitle && (
            <p className="text-sm sm:text-base font-gotham text-white/90">
              {pageConfig.subtitle}
            </p>
          )}
        </div>
        
        {/* Scrollable grid area */}
        <div className="flex-1 overflow-auto px-6 sm:px-8 tablet:px-10 pb-24">
          <FeatureGrid
            features={features}
            selectedFeatures={selectedFeatures}
            isLoading={isLoading}
            onSelect={handleFeatureSelect}
          />
        </div>
        
        {/* Fixed bottom action button */}
        {pageConfig.nextPath && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary via-primary to-transparent pt-8 pb-4 sm:pb-6">
            <div className="flex justify-center">
              <ActionButton 
                leftText="Continue" 
                rightText="Next" 
                onClick={handleNext} 
                className="shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedConfigPage;