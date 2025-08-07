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
        // Dynamic padding that scales with viewport
        "p-3 sm:p-4 tablet:p-6 laptop:p-8 hd:p-10 4k:p-12",
        // Minimum height for touch targets on mobile
        "min-h-[200px] sm:min-h-[250px] tablet:min-h-[300px]",
        // Responsive max height to prevent overflow
        "max-h-[calc(50vh-60px)] sm:max-h-[calc(70vh-120px)] tablet:max-h-[calc(80vh-140px)]",
        // Only show border when selected, transparent background when not
        isSelected
          ? "border-2 border-accent"
          : "border-2 border-transparent hover:border-white/10"
      )}
    >
      {/* Boat icon with responsive sizing - increased size */}
      <div className="relative w-full flex items-center justify-center flex-shrink-0">
        <div className={cn(
          "relative transition-all duration-300",
          // Increased image heights
          "h-[80px] sm:h-[100px] tablet:h-[130px] laptop:h-[160px] hd:h-[180px] 4k:h-[200px]",
          // Add responsive margins
          "mb-3 sm:mb-4 tablet:mb-5 laptop:mb-6"
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
          "rounded-full font-medium transition-all duration-300 flex-shrink-0 flex items-center gap-2",
          // Responsive padding
          "px-4 py-1.5 sm:px-5 sm:py-2 tablet:px-6 tablet:py-2.5 laptop:px-8 laptop:py-3",
          // Increased bottom margin for more spacing
          "mb-4 sm:mb-5 tablet:mb-6 laptop:mb-8",
          // Responsive text sizing
          "text-xs sm:text-sm tablet:text-base laptop:text-lg hd:text-xl 4k:text-2xl",
          // Button styling: primary bg with white border when not selected, accent when selected
          isSelected 
            ? "bg-accent text-white border-2 border-accent" 
            : "bg-primary text-white border border-white/50"
        )}
      >
        {isSelected && (
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 tablet:w-3 tablet:h-3 bg-white rounded-full" />
        )}
        {name}
      </div>

      {/* Description with responsive text and line clamping */}
      <p className={cn(
        "text-white/70 leading-relaxed text-center flex-1 overflow-hidden",
        // Reduced text sizing
        "text-[10px] sm:text-xs tablet:text-sm laptop:text-base hd:text-lg 4k:text-xl",
        // Responsive padding
        "px-2 sm:px-3 tablet:px-4",
        // Line clamping for overflow
        "line-clamp-4 sm:line-clamp-5 tablet:line-clamp-none"
      )}>
        {description}
      </p>

      {/* Selection indicator removed per design requirements */}
    </div>
  );
};

export default OperationTypeCard;
