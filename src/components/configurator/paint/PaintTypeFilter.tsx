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
  selectedPaintType: string;
  onPaintTypeSelect: (type: string) => void;
}

const PaintTypeFilter = ({ selectedPaintType, onPaintTypeSelect }: PaintTypeFilterProps) => {
  return (
    <div className="w-[10%] min-w-[80px] tablet:min-w-[100px] pl-2 pr-2">
      <h3 className="text-2xs tablet:text-xs ipad:text-sm hd:text-[13px] font-bold text-white mb-2 tablet:mb-3">Paint Type</h3>
      <div className="space-y-1 tablet:space-y-2">
        {Object.keys(PAINT_TYPE_MAP).map(type => (
          <button 
            key={type}
            onClick={() => onPaintTypeSelect(type)}
            className={`flex items-center w-full group transition-colors ${
              selectedPaintType === type ? 'text-white' : 'text-white/60 hover:text-white/80'
            }`}
          >
            <div className={`w-2 h-2 tablet:w-3 tablet:h-3 rounded-full mr-1 tablet:mr-2 transition-colors ${
              selectedPaintType === type ? 'bg-accent' : 'bg-white/20 group-hover:bg-white/30'
            }`} />
            <span className="capitalize text-2xs tablet:text-xs ipad:text-sm hd:text-[13px]">{type}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaintTypeFilter;
