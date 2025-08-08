// ==================================================
// AI EXPLANATION: SimpleColorSwatches.tsx
// ==================================================
// WHAT: Horizontal scrollable color swatch selector showing available paint colors with selection highlighting and current part color detection
// WHY: Without this, users can't visually select paint colors - provides the clickable color swatches in paint panel
// USED BY: SimplePaintPanel component to display selectable color swatches filtered by paint type
// CRITICAL: NO - UI component for color selection, colors can be selected via other means if broken
// ==================================================

import React from 'react';
import { AlexSealColor } from '@/data/colors-library';
import { useYachtStore } from '@/stores/yachtStore';
import type { Color as PaintColor } from '@/types/yacht-v2';

interface SimpleColorSwatchesProps {
  colors: AlexSealColor[];
  selectedPaintType: string;
  onColorSelect: (color: AlexSealColor) => void;
}

const SimpleColorSwatches: React.FC<SimpleColorSwatchesProps> = ({
  colors,
  selectedPaintType,
  onColorSelect
}) => {
  const { currentYacht } = useYachtStore();
  const activeLevel2 = currentYacht?.active_level_2 || null;
  
  // Get current part's color and type from yacht (V2 schema)
  const getCurrentPartColor = () => {
    if (!currentYacht || !activeLevel2) return null;
    
    const paintConfig = currentYacht.paint[activeLevel2 as keyof typeof currentYacht.paint];
    if (!paintConfig) return null;
    
    return {
      hex: paintConfig.color?.toLowerCase(),
      type: paintConfig.type || ''
    };
  };
  
  const currentPartColor = getCurrentPartColor();
  
  // Check if a color is selected for current part
  const isColorSelected = (color: AlexSealColor): boolean => {
    if (!currentPartColor) return false;
    
    return color.hex.toLowerCase() === (currentPartColor.hex || '').toLowerCase() &&
           color.type === currentPartColor.type;
  };
  
  // Get visual effect for paint type
  const getPaintTypeStyle = (type: string) => {
    switch(type) {
      case 'metallic':
        return {
          background: `linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)`,
          backgroundSize: '4px 4px',
          animation: 'shimmer 3s infinite linear'
        };
      case 'gloss':
        return {
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 2px rgba(255,255,255,0.3)',
        };
      case 'matte':
        return {
          // No additional effects for matte
        };
      default:
        return {};
    }
  };
  
  return (
    <div className="flex gap-3 overflow-x-auto py-3 scrollbar-none flex-1 px-2">
      {colors.map(color => (
        <button
          key={`${color.id}-${color.type}`}
          onClick={() => onColorSelect(color)}
          className={`
            relative flex-shrink-0 w-[40px] h-[70px] rounded-lg overflow-hidden
            transition-all duration-200 hover:scale-102 hover:shadow-xl
            ${isColorSelected(color) 
              ? 'ring-2 ring-accent ring-offset-1  ring-offset-primary  scale-102' 
              : 'ring-0 ring-white/20 hover:ring-white/40'
            }
          `}
          title={`${color.name} (${color.type})`}
          aria-label={`Select ${color.name} ${color.type} paint`}
        >
          {/* Base color */}
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: color.hex }}
          />
          
          {/* Paint type effect overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={getPaintTypeStyle(color.type)}
          />
          
         
        </button>
      ))}
      
      {colors.length === 0 && (
        <div className="text-white/60 text-sm py-4">
          No colors available for selected filters
        </div>
      )}
    </div>
  );
};

export default SimpleColorSwatches;
