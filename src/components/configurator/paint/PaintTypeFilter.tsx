// ==================================================
// AI EXPLANATION: PaintTypeFilter.tsx
// ==================================================
// WHAT: Radio button group component for filtering paint colors by type (single, multi, special) with visual indicators
// WHY: Without this, users can't filter paint options by type - helps narrow down color choices in paint panel
// USED BY: SimplePaintPanel component to filter available paint colors by type
// CRITICAL: NO - UI filter component, colors can still be accessed without filtering if broken
// ==================================================


import React from 'react';
import { PAINT_TYPE_MAP } from '@/types/paint';

interface PaintTypeFilterProps {
  selectedPaintTypes: string[];
  onPaintTypeToggle: (type: string) => void;
}

const PaintTypeFilter = ({ selectedPaintTypes, onPaintTypeToggle }: PaintTypeFilterProps) => {
  return (
    <div className="w-[12%] min-w-[120px] pl-2 pr-2">
      <h3 className="text-2xs tablet:text-xs ipad:text-sm hd:text-[13px] font-bold text-white mb-2 tablet:mb-3">Paint Type</h3>
      <div className="space-y-2">
        {Object.keys(PAINT_TYPE_MAP).map(type => {
          const isSelected = selectedPaintTypes.includes(type);
          return (
            <button 
              key={type}
              onClick={() => onPaintTypeToggle(type)}
              className={`flex items-center w-full py-1 px-2 rounded group transition-colors ${
                isSelected ? 'text-white bg-white/10' : 'text-white/60 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              {/* Circle indicator instead of checkbox */}
              <div className={`w-3 h-3 rounded-full mr-2 transition-all border-2 ${
                isSelected 
                  ? 'bg-accent border-accent' 
                  : 'bg-transparent border-white/30 group-hover:border-white/50'
              }`} />
              <span className="capitalize text-xs tablet:text-sm">{type}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PaintTypeFilter;
