// ==================================================
// AI EXPLANATION: ColorPicker.tsx
// ==================================================
// WHAT: HSL color picker component with saturation/brightness square and hue slider for creating custom paint colors
// WHY: Without this, users can't create custom colors - provides visual interface for HSL color selection
// USED BY: SimplePaintPanel component for custom color creation in paint customization
// CRITICAL: NO - Feature enhancement component, custom colors can still be added via swatches if broken
// ==================================================


import React from 'react';

interface ColorPickerProps {
  customColor: string;
  onCustomColorChange: (color: string) => void;
  onAddCustomColor: () => void;
}

const ColorPicker = ({ customColor, onCustomColorChange, onAddCustomColor }: ColorPickerProps) => {
  const handleSaturationBrightnessChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    // Get initial position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    
    // Extract the current hue
    const hue = customColor.startsWith('#')
      ? 0
      : parseInt(customColor.split(',')[0]) || 0;
    
    // Convert to HSL values
    const saturation = Math.round(x * 100);
    const lightness = Math.round((1 - y) * 100);
    
    // Create color string and update
    const newColor = `${hue},${saturation},${lightness}`;
    onCustomColorChange(newColor);
  };

  const handleHueChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const hue = Math.round(y * 360);
    
    // Extract current saturation and lightness
    const s = customColor.startsWith('#')
      ? 100
      : parseInt(customColor.split(',')[1]) || 100;
    const l = customColor.startsWith('#')
      ? 50
      : parseInt(customColor.split(',')[2]) || 50;
    
    const newColor = `${hue},${s},${l}`;
    onCustomColorChange(newColor);
  };

  return (
    <div className="w-[15%] min-w-[180px] pl-2 pr-2">
      <h3 className="text-2xs tablet:text-xs ipad:text-sm hd:text-[13px] font-bold text-white mb-2 tablet:mb-3">Custom Color</h3>
      <div className="flex flex-col space-y-2">
        {/* Color picker components row */}
        <div className="flex space-x-2">
          {/* Saturation/Brightness area */}
          <div 
            className="relative w-[65px] tablet:w-[75px] ipad:w-[85px] h-[55px] tablet:h-[65px] ipad:h-[75px] cursor-pointer rounded overflow-hidden" 
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0), #000), 
                          linear-gradient(to right, #fff, hsl(${customColor.startsWith('#') ? 0 : parseInt(customColor.split(',')[0]) || 0}, 100%, 50%))`
            }}
            onMouseDown={(e) => {
              handleSaturationBrightnessChange(e);
              
              const rect = e.currentTarget.getBoundingClientRect();
              
              const handleMouseMove = (moveEvent: MouseEvent) => {
                const newX = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
                const newY = Math.max(0, Math.min(1, (moveEvent.clientY - rect.top) / rect.height));
                
                const hue = customColor.startsWith('#')
                  ? 0
                  : parseInt(customColor.split(',')[0]) || 0;
                
                const newSaturation = Math.round(newX * 100);
                const newLightness = Math.round((1 - newY) * 100);
                
                const updatedColor = `${hue},${newSaturation},${newLightness}`;
                onCustomColorChange(updatedColor);
              };
              
              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };
              
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
            onClick={handleSaturationBrightnessChange}
          >
            {/* Current color indicator */}
            <div 
              className="absolute w-3 h-3 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: `${customColor.startsWith('#') ? 50 : parseInt(customColor.split(',')[1]) || 0}%`,
                top: `${customColor.startsWith('#') ? 50 : 100 - (parseInt(customColor.split(',')[2]) || 0)}%`,
                boxShadow: '0 0 2px rgba(0,0,0,0.5)'
              }}
            />
          </div>
          
          {/* Hue slider (vertical bar) */}
          <div 
            className="relative w-6 h-[55px] tablet:h-[65px] ipad:h-[75px] rounded overflow-hidden cursor-pointer"
            style={{
              background: 'linear-gradient(to bottom, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)'
            }}
            onMouseDown={(e) => {
              handleHueChange(e);
              
              const rect = e.currentTarget.getBoundingClientRect();
              
              const handleMouseMove = (moveEvent: MouseEvent) => {
                const newY = Math.max(0, Math.min(1, (moveEvent.clientY - rect.top) / rect.height));
                const newHue = Math.round(newY * 360);
                
                const s = customColor.startsWith('#')
                  ? 100
                  : parseInt(customColor.split(',')[1]) || 100;
                const l = customColor.startsWith('#')
                  ? 50
                  : parseInt(customColor.split(',')[2]) || 50;
                
                const updatedColor = `${newHue},${s},${l}`;
                onCustomColorChange(updatedColor);
              };
              
              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };
              
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
            onClick={handleHueChange}
          >
            {/* Hue indicator */}
            <div 
              className="absolute w-6 h-1 bg-white border border-gray-800 pointer-events-none shadow-sm"
              style={{
                top: `${customColor.startsWith('#') ? 50 : ((parseInt(customColor.split(',')[0]) || 0) / 360) * 100}%`,
                transform: 'translateY(-50%)',
                left: '-2px',
                right: '-2px',
                width: 'calc(100% + 4px)'
              }}
            />
          </div>
        </div>
        
        {/* Save Color Button */}
        <button
          className="w-full h-[24px] tablet:h-[28px] ipad:h-[30px] rounded bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
          onClick={onAddCustomColor}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 tablet:h-4 tablet:w-4 text-white mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-3xs tablet:text-2xs ipad:text-xs text-white">Save Color</span>
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
