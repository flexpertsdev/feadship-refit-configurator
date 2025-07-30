// ==================================================
// AI EXPLANATION: ExtensionCard.tsx
// ==================================================
// WHAT: Card component for yacht extensions displaying image, name, description with select/deselect functionality and loading states
// WHY: Without this, extensions can't be displayed visually - provides UI for selecting yacht add-ons and modifications
// USED BY: ExtensionsPanel component to display grid of available yacht extensions
// CRITICAL: NO - UI component for extension display, can be restyled without breaking functionality
// ==================================================


import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Plus } from 'lucide-react';

export interface Extension {
  id: string;
  name: string;
  description?: string;
  image?: string;
  extensionIndex?: number;
}

interface ExtensionCardProps {
  extension: Extension;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ExtensionCard: React.FC<ExtensionCardProps> = ({ extension, isSelected, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);
  
  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);
  
  const handleSelect = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(extension.id);
  }, [extension.id, onSelect]);
  
  return (
    <Card className="overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01] shadow-[0_0_3.5px_0_rgba(0,0,0,0.2)] w-[260px] h-[140px] flex flex-col">
      {extension.image && (
        <div className="flex-grow overflow-hidden cursor-pointer relative bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-gray-200 w-full h-full"></div>
            </div>
          )}
          {!imageError ? (
            <img 
              src={extension.image} 
              alt={extension.name} 
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-sm">Image unavailable</span>
            </div>
          )}
        </div>
      )}
      
      <CardContent className="p-3 mt-auto flex items-center justify-between bg-primary">
        <div className="flex-1 mr-2">
          <h3 className="text-xs font-medium line-clamp-1 text-white">{extension.name}</h3>
          {extension.description && (
            <p className="text-[10px] text-gray-200 line-clamp-1">{extension.description}</p>
          )}
        </div>
        <Button 
          size="sm" 
          variant={isSelected ? "outline" : "default"}
          className={`min-w-[90px] transition-all ${
            isSelected 
              ? "bg-[#00a1c7] text-white border-[#00a1c7] hover:bg-[#00a1c7] hover:text-white" 
              : ""
          }`}
          onClick={handleSelect}
        >
          {isSelected ? <Check className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
          {isSelected ? "Selected" : "Select"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExtensionCard;
