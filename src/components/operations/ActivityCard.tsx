// ==================================================
// AI EXPLANATION: ActivityCard.tsx
// ==================================================
// WHAT: Square activity card component with image background and name label for yacht activity selection (diving, fishing, etc.)
// WHY: Without this, activities wouldn't have visual representation - provides the clickable card UI for activity selection
// USED BY: ActivityGridView component for displaying activity options in Operations3Page
// CRITICAL: NO - UI component for activity display, can be styled differently without breaking functionality
// ==================================================

import React from 'react';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: {
    id: string;
    name: string;
    image: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, isSelected, onSelect }) => {
  const { id, name, image } = activity;
  
  return (
    <div 
      onClick={() => onSelect(id)}
      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group"
    >
      {/* Image container */}
      <div className="relative w-full h-full">
        <img 
          src={image} 
          alt={name} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-300", 
            "group-hover:scale-105"
          )}
        />
        
        {/* Very subtle gradient at bottom for label legibility */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Clean activity label - smaller and centered */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center px-3">
          <div 
            className={cn(
              "px-3 py-1 rounded-full transition-colors duration-300",
              "backdrop-blur-sm",
              // Responsive padding - more subtle
              "tablet:px-4 tablet:py-1.5",
              isSelected 
                ? "bg-accent text-white" 
                : "bg-white/90 text-primary"
            )}
          >
            <span className={cn(
              "font-medium text-center block",
              // Smaller, more proportional text
              "text-[11px]",           // Base: 11px
              "tablet:text-xs",        // Tablet: 12px
              "ipad:text-sm",          // iPad: 14px
              "hd:text-[15px]"         // HD/4K: 15px
            )}>
              {name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Default export for backward compatibility
export default ActivityCard;
