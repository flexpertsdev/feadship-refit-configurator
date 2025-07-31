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
      <div className="w-[20%] min-w-[240px] px-4 border-r border-white/10">
        <h3 className="text-xs font-bold text-white mb-2">Color Details</h3>
        <div className="text-white/40 text-xs">
          No color selected
        </div>
      </div>
    );
  }

  // Get display name for the color group
  const groupDisplayName = colorGroups[paintConfig.group as keyof typeof colorGroups] || paintConfig.group;

  return (
    <div className="w-[20%] min-w-[240px] px-4 border-r border-white/10">
      <h3 className="text-xs font-bold text-white mb-2">Color Details</h3>
      
      <div className="flex gap-3">
        {/* Color Swatch - Rectangle shape */}
        <div 
          className="w-[80px] h-[50px] rounded-md border border-white/20 shadow-lg flex-shrink-0"
          style={{ backgroundColor: paintConfig.color }}
        />
        
        {/* Color Information - Left aligned with closer spacing */}
        <div className="space-y-1 text-xs flex-1">
          <div className="flex gap-2">
            <span className="text-white/60 w-12">Part:</span>
            <span className="text-white capitalize">{partName}</span>
          </div>
          
          <div className="flex gap-2">
            <span className="text-white/60 w-12">Name:</span>
            <span className="text-white">{paintConfig.name}</span>
          </div>
          
          <div className="flex gap-2">
            <span className="text-white/60 w-12">Hex:</span>
            <span className="text-white font-mono">{paintConfig.color.toUpperCase()}</span>
          </div>
          
          <div className="flex gap-2">
            <span className="text-white/60 w-12">Type:</span>
            <span className="text-white capitalize">{paintConfig.type}</span>
          </div>
          
          <div className="flex gap-2">
            <span className="text-white/60 w-12">Group:</span>
            <span className="text-white">{groupDisplayName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorDetailsPanel;