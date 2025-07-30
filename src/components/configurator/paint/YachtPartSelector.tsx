// ==================================================
// AI EXPLANATION: YachtPartSelector.tsx
// ==================================================
// WHAT: Yacht part selector component displaying buttons for each paintable yacht section (hull, superstructure, etc.) with color preview
// WHY: Without this, users can't switch between yacht parts to paint - provides navigation between different paintable sections
// USED BY: SimplePaintPanel component for selecting which yacht part to paint
// CRITICAL: NO - UI navigation component, parts can still be painted through other means if broken
// ==================================================


import React from 'react';
import { YACHT_PARTS } from '@/types/paint';
import { ColorSelection } from '@/types/paint';
import { useYachtStore } from '@/stores/yachtStore';

interface YachtPartSelectorProps {
  partColors: Record<string, ColorSelection>;
  onPartSelect: (part: string) => void;
}

const YachtPartSelector = ({ partColors, onPartSelect }: YachtPartSelectorProps) => {
  const { currentYacht } = useYachtStore();
  const activeLevel2 = currentYacht?.active_level_2 || null;
  
  return (
    <div className="w-[12%] min-w-[160px] pl-2 tablet:pl-3 flex flex-col">
      <h3 className="text-2xs tablet:text-xs ipad:text-sm hd:text-[13px] font-bold text-white mb-2 tablet:mb-3 flex-shrink-0">Yacht Parts</h3>
      <div className="space-y-1 tablet:space-y-2 overflow-y-auto flex-1">
        {YACHT_PARTS.map(part => {
          // Always convert both values to lowercase for comparison
          const partLower = part.toLowerCase();
          const activeLevel2Lower = activeLevel2?.toLowerCase();
          const isPrimaryActive = activeLevel2Lower === partLower;
          
          return (
            <button 
              key={part}
              onClick={() => onPartSelect(partLower)} // Always pass lowercase for consistency
              className={`flex items-center w-full group px-2 py-1 rounded-md transition-all duration-200 ${
                isPrimaryActive 
                  ? 'bg-accent/30 border border-accent/50' 
                  : 'hover:bg-white/5 border border-transparent'
              }`}
              data-active={isPrimaryActive ? "true" : "false"}
            >
              <div 
                className={`w-[40px] tablet:w-[45px] ipad:w-[53px] h-[10px] tablet:h-[12px] ipad:h-[13px] transition-all duration-200 shrink-0 ${
                  isPrimaryActive ? 'border-2 border-accent shadow-lg' : 'border border-white/50'
                }`}
                style={{
                  backgroundColor: partColors[partLower]?.color || 'transparent'
                }}
              />
              <span className={`ml-[6px] tablet:ml-[8px] ipad:ml-[10px] text-2xs tablet:text-xs ipad:text-sm transition-all duration-200 ${
                isPrimaryActive
                  ? 'text-white font-semibold' 
                  : 'text-white/60 group-hover:text-white/80'
              }`}>
                {part}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default YachtPartSelector;
