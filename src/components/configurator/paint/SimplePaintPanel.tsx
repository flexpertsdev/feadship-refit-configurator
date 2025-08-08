// ==================================================
// AI EXPLANATION: SimplePaintPanel.tsx
// ==================================================
// WHAT: Paint customization panel component handling yacht color selection with paint type filtering, custom color picker, and real-time updates to yacht parts
// WHY: Without this, users can't customize yacht paint colors - it's the main UI for selecting and applying paint colors to different yacht parts
// USED BY: ConfiguratorPage (when PAINT navigation is active), provides color selection interface for 3D configurator
// CRITICAL: YES - Core customization feature for yacht paint, breaking this removes ability to change yacht colors
// ==================================================

/**
 * TODO: SimplePaintPanel V2 - Remove navigationStore
 * 
 * 1. Replace useNavigationStore with useYachtStore:
 *    - Read active_level_2 and active_level_3 from currentYacht
 *    - Remove destructured navigation store values
 * 2. Direct update pattern:
 *    - Every color selection immediately updates yacht.paint
 *    - No batching or debouncing here
 * 3. Simplify color picker integration:
 *    - When custom color created, add to yacht.custom_colors
 *    - Update yacht.paint[activeLevel2] with new color
 * 4. Fix part name mapping:
 *    - activeLevel2 uses lowercase (hull, bootstripe)
 *    - Ensure consistent casing throughout
 */

import React, { useMemo } from 'react';
import { useYachtStore } from '@/stores/yachtStore';
import { paintColors, getFilteredColors, AlexSealColor } from '@/data/colors-library';
import { getLevel3ForPaintPart } from '@/utils/navigationHelpers';
import { hslToHex } from './utils';
import SimpleColorSwatches from './SimpleColorSwatches';
import PaintTypeFilter from './PaintTypeFilter';
import YachtPartSelector from './YachtPartSelector';
import ColorPicker from './ColorPicker';
import ColorDetailsPanel from './ColorDetailsPanel';
import { PAINT_TYPE_MAP } from '@/types/paint';
import type { Color as PaintColor } from '@/types/yacht-v2';

// Integrated Color Picker with Type Buttons
interface ColorPickerWithTypesProps {
  customColor: string;
  customColorType: 'gloss' | 'matte' | 'metallic';
  onCustomColorChange: (color: string) => void;
  onAddCustomColor: () => void;
  onTypeChange: (type: 'gloss' | 'matte' | 'metallic') => void;
}

const ColorPickerWithTypes: React.FC<ColorPickerWithTypesProps> = ({ 
  customColor, 
  customColorType,
  onCustomColorChange, 
  onAddCustomColor,
  onTypeChange 
}) => {
  const handleSaturationBrightnessChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    
    const hue = customColor.startsWith('#')
      ? 0
      : parseInt(customColor.split(',')[0]) || 0;
    
    const saturation = Math.round(x * 100);
    const lightness = Math.round((1 - y) * 100);
    
    const newColor = `${hue},${saturation},${lightness}`;
    onCustomColorChange(newColor);
  };

  const handleHueChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const hue = Math.round(y * 360);
    
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
    <div className="min-w-[260px] pl-2 pr-2">
      <h3 className="text-2xs tablet:text-xs ipad:text-sm hd:text-[13px] font-bold text-white mb-2 tablet:mb-3">
        Custom Color
      </h3>
      <div className="flex flex-col space-y-2">
        {/* Color picker and type buttons in same row */}
        <div className="flex align-right space-x-4">
          {/* Saturation/Brightness area */}
          <div 
            className="relative w-[85px] tablet:w-[95px] ipad:w-[100px] h-[55px] tablet:h-[65px] ipad:h-[75px] cursor-pointer rounded overflow-hidden"
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
          
          {/* Hue slider */}
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
          
          {/* Type buttons next to color picker */}
          <div className="flex flex-col justify-between ml-2">
            {(['gloss', 'matte', 'metallic'] as const).map(type => (
              <button
                key={type}
                onClick={() => onTypeChange(type)}
                className={`px-3 py-1 text-2xs rounded transition-colors ${
                  customColorType === type 
                    ? 'bg-accent text-white' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
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

interface SimplePaintPanelProps {
  onColorChange?: (part: string, color: string, type: string, name: string, group?: string) => void;
}

const SimplePaintPanel: React.FC<SimplePaintPanelProps> = ({ onColorChange }) => {
  const { currentYacht, updateYachtColor, setNavigationState } = useYachtStore();
  
  // Get navigation state from yacht config
  const activeLevel2 = currentYacht?.active_level_2 || null;
  const activeLevel3 = currentYacht?.active_level_3 || null;
  
  // Initialize with all paint types selected
  const [selectedPaintTypes, setSelectedPaintTypes] = React.useState<string[]>(Object.keys(PAINT_TYPE_MAP));
  const [customColor, setCustomColor] = React.useState('#FFFFFF');
  const [customColorType, setCustomColorType] = React.useState<'gloss' | 'matte' | 'metallic'>('gloss');
  
  // Get custom colors from yacht
  const customColors = useMemo(() => {
    if (!currentYacht?.custom_colors) return [];
    
    try {
      const colors = Array.isArray(currentYacht.custom_colors) 
        ? currentYacht.custom_colors 
        : JSON.parse(currentYacht.custom_colors as string);
      
      // Filter by selected paint types (allow multiple)
      return colors.filter((color: PaintColor) => 
        selectedPaintTypes.some(type => {
          const mappedTypes = PAINT_TYPE_MAP[type as keyof typeof PAINT_TYPE_MAP] || [type];
          return mappedTypes.includes(color.type);
        })
      );
    } catch (e) {
      console.error('Error parsing custom colors:', e);
      return [];
    }
  }, [currentYacht?.custom_colors, selectedPaintTypes]);
  
  // Get filtered colors based on current selections
  const filteredColors = useMemo(() => {
    // If custom colors selected, return custom colors instead
    if (activeLevel3 === 'custom-colours') {
      return customColors;
    }
    
    // Filter colors by group and selected types
    let colors = paintColors;
    if (activeLevel3) {
      colors = colors.filter(color => color.group === activeLevel3);
    }
    
    // Filter by multiple selected paint types
    if (selectedPaintTypes.length > 0) {
      colors = colors.filter(color => 
        selectedPaintTypes.some(type => {
          const mappedTypes = PAINT_TYPE_MAP[type as keyof typeof PAINT_TYPE_MAP] || [type];
          return mappedTypes.includes(color.type);
        })
      );
    }
    
    return colors;
  }, [activeLevel3, selectedPaintTypes, customColors]);
  
  // Handle color selection
  const handleColorSelect = async (color: PaintColor) => {
    if (!activeLevel2) return;
    
    const part = activeLevel2;
    
    // Update yacht store
    await updateYachtColor(part, color.hex, color.type, color.name, color.group);
    
    // Call external handler if provided
    if (onColorChange) {
      onColorChange(part, color.hex, color.type, color.name, color.group);
    }
  };
  
  // Handle adding custom color to yacht
  const handleAddCustomColor = async () => {
    if (!currentYacht) return;
    
    const currentCustomColors = currentYacht.custom_colors 
      ? (Array.isArray(currentYacht.custom_colors) 
          ? currentYacht.custom_colors 
          : JSON.parse(currentYacht.custom_colors as string))
      : [];
    
    // Generate name like "Custom 1", "Custom 2", etc.
    const customCount = currentCustomColors.filter((c: PaintColor) => 
      c.name.startsWith('Custom')
    ).length;
    
    // Convert HSL to hex if needed
    let hexColor = customColor;
    if (!customColor.startsWith('#')) {
      const [h, s, l] = customColor.split(',').map(Number);
      hexColor = hslToHex(h, s, l);
    }
    
    const newCustomColor: PaintColor = {
      id: `custom-${Date.now()}`,
      name: `Custom ${customCount + 1}`,
      hex: hexColor,
      type: customColorType,
      group: 'custom-colours'
    };
    
    const updatedColors = [...currentCustomColors, newCustomColor];
    
    // Update yacht with new custom colors array
    await updateYachtColor(
      'custom_colors',
      JSON.stringify(updatedColors),
      '',
      '',
      ''
    );
  };
  
  // Handle custom color change
  const handleCustomColorChange = async (colorValue: string) => {
    setCustomColor(colorValue);
    
    if (!activeLevel2) return;
    
    const part = activeLevel2;
    const paintType = customColorType;
    
    // Convert HSL to hex if needed
    let hex = colorValue;
    if (!colorValue.startsWith('#')) {
      const [h, s, l] = colorValue.split(',').map(Number);
      hex = hslToHex(h, s, l);
    }
    
    // Update yacht store
    await updateYachtColor(part, hex, paintType, 'Custom Color', 'custom-colours');
    
    // Call external handler
    if (onColorChange) {
      onColorChange(part, hex, paintType, 'Custom Color', 'custom-colours');
    }
  };
  
  // Get part colors from V2 yacht paint configuration
  const partColors = useMemo(() => {
    if (!currentYacht?.paint) return {};
    
    const colors: Record<string, any> = {};
    const parts = ['hull', 'superstructure', 'deckhouse', 'mast', 'bootstripe'] as const;
    
    parts.forEach(part => {
      if (currentYacht.paint[part]) {
        colors[part] = currentYacht.paint[part];
      }
    });
    
    return colors;
  }, [currentYacht?.paint]);
  
  // Handle part selection
  const handlePartSelect = (part: string) => {
    console.log('handlePartSelect called with part:', part);
    console.log('Current activeLevel2:', activeLevel2);
    
    // Get the appropriate Level 3 based on the part's current paint color group
    // Use proper defaults if yacht not loaded yet (hull='greens', others='whites-beiges')
    const level3 = currentYacht ? getLevel3ForPaintPart(currentYacht, part) : 
                   (part === 'hull' ? 'greens' : 'whites-beiges');
    
    console.log('Setting navigation state:', { level1: 'PAINT', level2: part, level3 });
    
    // Update navigation state in yacht config
    setNavigationState(
      currentYacht?.active_level_1 || 'PAINT',
      part,
      level3
    );
    
    // Don't change selected paint types when switching parts
    // Keep current multi-selection
  };
  
  return (
    <div className="h-full pt-3 mx-auto divide-x divide-white/10 flex overflow-hidden">
      {/* Paint Type Filter */}
      <PaintTypeFilter 
        selectedPaintTypes={selectedPaintTypes}
        onPaintTypeToggle={(type) => {
          setSelectedPaintTypes(prev => 
            prev.includes(type) 
              ? prev.filter(t => t !== type)
              : [...prev, type]
          );
        }}
      />
      
      {/* Custom Color Picker - only show when custom colors selected */}
      {activeLevel3 === 'custom-colours' && (
        <ColorPickerWithTypes
          customColor={customColor}
          customColorType={customColorType}
          onCustomColorChange={handleCustomColorChange}
          onAddCustomColor={handleAddCustomColor}
          onTypeChange={setCustomColorType}
        />
      )}
      
      {/* Color Swatches */}
      <div className="flex-1 px-3  overflow-hidden flex flex-col">
        <h3 className="text-xs font-bold text-white mb-1 flex-shrink-0">Color Selection</h3>
        <SimpleColorSwatches
          colors={filteredColors}
          selectedPaintType={selectedPaintTypes[0] || 'gloss'}
          onColorSelect={handleColorSelect}
        />
      </div>
      
      {/* Color Details Panel */}
      <ColorDetailsPanel
        paintConfig={activeLevel2 && currentYacht?.paint ? currentYacht.paint[activeLevel2 as keyof typeof currentYacht.paint] : null}
        partName={activeLevel2 || ''}
      />
      
      {/* Yacht Part Selector */}
      <YachtPartSelector
        partColors={partColors}
        onPartSelect={handlePartSelect}
      />
    </div>
  );
};

export default SimplePaintPanel;
