// ==================================================
// AI EXPLANATION: OperationTypeCard.tsx
// ==================================================
// WHAT: Operation type selection card component with image, name button, and description for Private/Charter yacht operation choices
// WHY: Without this, operation types wouldn't have visual representation - provides the clickable card UI for operation selection
// USED BY: OperationTypeView component for displaying Private and Charter options
// CRITICAL: NO - UI component for operation display, can be styled differently without breaking functionality
// ==================================================

import React from 'react';
import { cn } from '@/lib/utils';

interface OperationTypeProps {
  id: string;
  name: string;
  description: string;
  image: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const OperationTypeCard: React.FC<OperationTypeProps> = ({ 
  id, 
  name, 
  description, 
  image, 
  isSelected, 
  onSelect 
}) => {
  return (
    <div
      onClick={() => onSelect(id)}
      className={cn(
        "relative flex flex-col items-center rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300",
        "border-2 backdrop-blur-sm",
        // Dynamic padding that scales with viewport
        "p-3 sm:p-4 tablet:p-6 laptop:p-8 hd:p-10 4k:p-12",
        // Minimum height for touch targets on mobile
        "min-h-[200px] sm:min-h-[250px] tablet:min-h-[300px]",
        // Responsive max height to prevent overflow
        "max-h-[calc(50vh-60px)] sm:max-h-[calc(70vh-120px)] tablet:max-h-[calc(80vh-140px)]",
        isSelected
          ? "border-accent bg-accent/10"
          : "border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10"
      )}
    >
      {/* Boat icon with responsive sizing */}
      <div className="relative w-full flex items-center justify-center flex-shrink-0">
        <div className={cn(
          "relative transition-all duration-300",
          // Responsive image heights using viewport-aware sizing
          "h-[60px] sm:h-[80px] tablet:h-[100px] laptop:h-[120px] hd:h-[140px] 4k:h-[160px]",
          // Add responsive margins
          "mb-2 sm:mb-3 tablet:mb-4 laptop:mb-5"
        )}>
          <img
            src={image}
            alt={name}
            className={cn(
              "h-full w-auto object-contain transition-all duration-300",
              isSelected ? "scale-105 brightness-110" : "scale-100"
            )}
          />
        </div>
      </div>

      {/* Name button with responsive sizing */}
      <div 
        className={cn(
          "rounded-full font-medium transition-colors duration-300 flex-shrink-0",
          // Responsive padding
          "px-4 py-1.5 sm:px-5 sm:py-2 tablet:px-6 tablet:py-2.5 laptop:px-8 laptop:py-3",
          // Responsive margins
          "mb-2 sm:mb-3 tablet:mb-4 laptop:mb-5",
          // Responsive text sizing
          "text-xs sm:text-sm tablet:text-base laptop:text-lg hd:text-xl 4k:text-2xl",
          isSelected 
            ? "bg-accent text-white" 
            : "bg-white/90 text-primary"
        )}
      >
        {name}
      </div>

      {/* Description with responsive text and line clamping */}
      <p className={cn(
        "text-white/80 leading-relaxed text-center flex-1 overflow-hidden",
        // Responsive text sizing
        "text-xs sm:text-sm tablet:text-base laptop:text-lg hd:text-xl 4k:text-2xl",
        // Responsive padding
        "px-2 sm:px-3 tablet:px-4",
        // Line clamping for overflow
        "line-clamp-3 sm:line-clamp-4 tablet:line-clamp-none"
      )}>
        {description}
      </p>

      {/* Selection indicator - responsive positioning */}
      {isSelected && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 tablet:top-4 tablet:right-4">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default OperationTypeCard;
