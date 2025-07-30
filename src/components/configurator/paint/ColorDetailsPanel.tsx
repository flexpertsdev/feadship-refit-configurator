// ==================================================
// AI EXPLANATION: ColorDetailsPanel.tsx
// ==================================================
// WHAT: Panel displaying detailed information about the currently selected paint color for the active yacht part
// WHY: Without this, users can't see full details of current color selection - provides color name, hex, type, and group info
// USED BY: SimplePaintPanel component to show current color details
// CRITICAL: NO - UI enhancement for color information display
// ==================================================

import React from 'react';
import { PaintConfig } from '@/types/yacht-v2';
import { colorGroups } from '@/data/paintColors';

interface ColorDetailsPanelProps {
  paintConfig: PaintConfig | null;
  partName: string;
}

const ColorDetailsPanel: React.FC<ColorDetailsPanelProps> = ({ paintConfig, partName }) => {
  if (!paintConfig) {
    return (
      <div className="w-[18%] min-w-[200px] px-4 border-r border-white/10">
        <h3 className="text-xs font-bold text-white mb-3">Color Details</h3>
        <div className="text-white/40 text-sm">
          No color selected
        </div>
      </div>
    );
  }

  // Get display name for the color group
  const groupDisplayName = colorGroups[paintConfig.group as keyof typeof colorGroups] || paintConfig.group;

  return (
    <div className="w-[18%] min-w-[200px] px-4 border-r border-white/10">
      <h3 className="text-xs font-bold text-white mb-3">Color Details</h3>
      
      {/* Color Swatch */}
      <div className="mb-4">
        <div 
          className="w-[80px] h-[80px] rounded-lg border-2 border-white/20 shadow-lg"
          style={{ backgroundColor: paintConfig.color }}
        />
      </div>
      
      {/* Color Information */}
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-white/60">Part:</span>
          <span className="text-white ml-2 capitalize">{partName}</span>
        </div>
        
        <div>
          <span className="text-white/60">Name:</span>
          <span className="text-white ml-2">{paintConfig.name}</span>
        </div>
        
        <div>
          <span className="text-white/60">Hex:</span>
          <span className="text-white ml-2 font-mono text-xs">{paintConfig.color.toUpperCase()}</span>
        </div>
        
        <div>
          <span className="text-white/60">Type:</span>
          <span className="text-white ml-2 capitalize">{paintConfig.type}</span>
        </div>
        
        <div>
          <span className="text-white/60">Group:</span>
          <span className="text-white ml-2 text-xs">{groupDisplayName}</span>
        </div>
      </div>
    </div>
  );
};

export default ColorDetailsPanel;