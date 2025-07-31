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
  onSelect: (id: string) => void;
  className?: string;
}

const StandardFeatureCard: React.FC<StandardFeatureCardProps> = ({ 
  feature, 
  isSelected, 
  onSelect,
  className 
}) => {
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
      {/* Image Area - 2/3 of card height */}
      <div className="relative flex-grow overflow-hidden bg-gray-100" style={{ flex: '2 0 0' }}>
        {feature.image ? (
          <>
            <img 
              src={feature.image} 
              alt={feature.name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            {/* Selected overlay */}
            {isSelected && (
              <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                <div className="bg-accent rounded-full p-3 shadow-lg">
                  <Check className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
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
            onSelect(feature.id);
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