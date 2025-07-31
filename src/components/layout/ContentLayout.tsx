// ==================================================
// AI EXPLANATION: ContentLayout.tsx
// ==================================================
// WHAT: Reusable page layout wrapper with header text, background image transitions, and action button for consistent page structure
// WHY: Without this, every page would need to implement header formatting and action buttons - provides consistent layout pattern
// USED BY: FeaturesPage, SustainabilityPage, ServicesPage, Design1-3Pages for consistent page structure
// CRITICAL: YES - Core layout component that affects multiple pages, breaking this disrupts page structure and navigation
// ==================================================


import React, { ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useYachtStore } from '@/stores/yachtStore';
import { getNextNavigation } from '@/utils/navigationUtils';
import { ActionButton } from '@/components/ui/action-button';
import { cn } from '@/lib/utils';

interface ContentLayoutProps {
  preTitle?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  imageStyles?: string;
  children?: ReactNode;
  hideActionButton?: boolean;
  className?: string;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({
  preTitle,
  title,
  subtitle,
  backgroundImage,
  backgroundColor = 'bg-white',
  textColor = 'text-primary',
  imageStyles = 'bg-cover bg-center',
  children,
  hideActionButton = false,
  className
}) => {
  const navigate = useNavigate();
  const { currentYacht, setNavigationState } = useYachtStore();
  const [currentBg, setCurrentBg] = useState(backgroundImage);
  const [prevBg, setPrevBg] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get navigation state from yacht config
  const activeLevel1 = currentYacht?.active_level_1 || null;
  const activeLevel2 = currentYacht?.active_level_2 || null;
  const activeLevel3 = currentYacht?.active_level_3 || null;

  useEffect(() => {
    if (backgroundImage !== currentBg && backgroundImage) {
      setPrevBg(currentBg || '');
      setCurrentBg(backgroundImage);
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [backgroundImage]);

  const handleNext = () => {
    const { level1, level2, level3, path } = getNextNavigation(
      activeLevel1,
      activeLevel2,
      activeLevel3
    );
    if (path) {
      setNavigationState(level1, level2, level3);
      navigate(path);
    }
  };

  return (
    <div className={`h-full flex flex-col relative ${backgroundColor} transition-all duration-300`}>
      {isTransitioning && prevBg && (
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-1000 opacity-0`}
          style={{ 
            backgroundImage: `url(${prevBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 75%',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      {currentBg && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${isTransitioning ? 'opacity-100' : ''}`}
          style={{ 
            backgroundImage: `url(${currentBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 75%',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      {backgroundImage && <div className="absolute inset-0 bg-black/30" />}

      <div className={cn("relative z-10 flex-1 overflow-auto transition-all duration-300 px-4 sm:px-6 tablet:px-8 py-6 sm:py-8", className)}>
        {/* Header text content with higher z-index */}
        <div className="relative z-20">
          {preTitle && (
            <p className={`text-xs sm:text-sm uppercase tracking-wider ${textColor}/80 mb-1 font-gotham`}>
              {preTitle}
            </p>
          )}
          <h1 className={`text-xl sm:text-2xl tablet:text-3xl font-bold ${textColor} mb-1 sm:mb-2 font-gotham transition-all duration-300`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`${textColor} text-sm sm:text-base font-gotham transition-all duration-300`}>
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Children content with lower z-index */}
        <div className="relative z-10 flex-1 transition-all duration-300 mt-6 my-[84px] mx-0 py-0">
          {children}
        </div>
      </div>

      {!hideActionButton && (
        <div className="sticky bottom-4 sm:bottom-6 w-full flex justify-center z-20 transition-all duration-300">
          <ActionButton leftText="Continue" rightText="Next" onClick={handleNext} className="shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default ContentLayout;
