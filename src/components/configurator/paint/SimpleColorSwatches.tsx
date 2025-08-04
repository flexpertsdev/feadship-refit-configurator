// ==================================================
// AI EXPLANATION: SimpleColorSwatches.tsx
// ==================================================
// WHAT: Horizontal scrollable color swatch selector showing available paint colors with selection highlighting and current part color detection
// WHY: Without this, users can't visually select paint colors - provides the clickable color swatches in paint panel
// USED BY: SimplePaintPanel component to display selectable color swatches filtered by paint type
// CRITICAL: NO - UI component for color selection, colors can be selected via other means if broken
// ==================================================

import React from 'react';
import { PaintColor } from '@/data/paintColors';
import { useYachtStore } from '@/stores/yachtStore';

interface SimpleColorSwatchesProps {
  colors: PaintColor[];
  selectedPaintType: string;
  onColorSelect: (color: PaintColor) => void;
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
  const isColorSelected = (color: PaintColor): boolean => {
    if (!currentPartColor) return false;
    
    return color.hex.toLowerCase() === (currentPartColor.hex || '').toLowerCase() &&
           color.type === currentPartColor.type;
  };
  
  return (
    <div className="flex gap-3 overflow-x-auto py-2 scrollbar-none flex-1 px-1">
      {colors.map(color => (
        <button
          key={color.id}
          onClick={() => onColorSelect(color)}
          className={`
            relative flex-shrink-0 w-[55px] h-[100px] rounded-lg
            transition-all duration-200 hover:scale-105 hover:shadow-xl
            ${isColorSelected(color) 
              ? 'ring-3 ring-accent ring-offset-2 ring-offset-primary shadow-xl scale-105' 
              : 'ring-1 ring-white/20 hover:ring-2 hover:ring-white/40'
            }
          `}
          style={{ backgroundColor: color.hex }}
          title={`${color.name} (${color.type})`}
          aria-label={`Select ${color.name} ${color.type} paint`}
        >
          {isColorSelected(color) && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20">
              <svg 
                className="w-6 h-6 text-white drop-shadow-lg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          )}
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
