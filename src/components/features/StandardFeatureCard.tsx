// ==================================================
// AI EXPLANATION: StandardFeatureCard.tsx
// ==================================================
// WHAT: Standardized feature card component with consistent 400x300 ratio, 2/3 image and 1/3 text areas for unified design across Features/Services/Sustainability
// WHY: Provides consistent card UI that matches designer requirements and improves visual consistency across all configuration pages
// USED BY: FeatureGrid component for Features, Services, and Sustainability pages
// CRITICAL: NO - New UI component that can be modified without breaking functionality
// ==================================================

import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StandardFeature {
  id: string;
  name: string;
  description?: string;
  image?: string;
  category?: string;
}

interface StandardFeatureCardProps {
  feature: StandardFeature;
  isSelected: boolean;
  onSelect: (id: string) => void;  // For image click -> modal
  onDirectSelect?: (id: string) => void;  // For button click -> add/remove
  className?: string;
}

const StandardFeatureCard: React.FC<StandardFeatureCardProps> = ({ 
  feature, 
  isSelected, 
  onSelect,
  onDirectSelect,
  className 
}) => {
  const handleImageClick = () => {
    // Open modal - parent will handle this
    onSelect(feature.id);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-lg",
        "shadow-md",
        "w-full",
        "flex flex-col",
        "group",
        "aspect-[4/3]",
        className
      )}
    >
      {/* Image Area - 2/3 of card height - Clickable for modal */}
      <div 
        className="relative flex-grow overflow-hidden bg-gray-100 cursor-pointer" 
        style={{ flex: '2 0 0' }}
        onClick={handleImageClick}
      >
        <img 
          src={feature.image || 'https://placehold.co/400x300/1a1a2e/ffffff?text=Feadship'} 
          alt={feature.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/400x300/1a1a2e/ffffff?text=Feadship';
          }}
        />
        {/* Hover overlay indicating clickable */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <span className="text-white text-sm font-medium opacity-0 hover:opacity-100 transition-opacity bg-black/60 px-3 py-1 rounded">
            View Details
          </span>
        </div>
      </div>

      {/* Text Area - 1/3 of card height */}
      <div 
        className="p-4 bg-white border-t flex items-center justify-between gap-3"
        style={{ flex: '1 0 0' }}
      >
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 flex-1">
          {feature.name}
        </h3>
        <Button 
          size="sm" 
          variant={isSelected ? "outline" : "default"}
          className={cn(
            "shrink-0 min-w-[80px]",
            isSelected && "bg-accent text-white border-accent hover:bg-accent/90 hover:text-white"
          )}
          onClick={(e) => {
            e.stopPropagation();
            // Use onDirectSelect if provided, otherwise fallback to onSelect
            if (onDirectSelect) {
              onDirectSelect(feature.id);
            } else {
              onSelect(feature.id);
            }
          }}
        >
          {isSelected ? (
            <>
              <Check className="h-3.5 w-3.5 mr-1" />
              Added
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default StandardFeatureCard;