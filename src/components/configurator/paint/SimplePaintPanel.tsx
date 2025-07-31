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
import { paintColors, getFilteredColors, PaintColor } from '@/data/paintColors';
import { PAINT_TYPE_MAP } from '@/types/paint';
import { getLevel3ForPaintPart } from '@/utils/navigationHelpers';
import { hslToHex } from './utils';
import SimpleColorSwatches from './SimpleColorSwatches';
import PaintTypeFilter from './PaintTypeFilter';
import YachtPartSelector from './YachtPartSelector';
import ColorPicker from './ColorPicker';
import ColorDetailsPanel from './ColorDetailsPanel';

interface SimplePaintPanelProps {
  onColorChange?: (part: string, color: string, type: string, name: string, group?: string) => void;
}

const SimplePaintPanel: React.FC<SimplePaintPanelProps> = ({ onColorChange }) => {
  const { currentYacht, updateYachtColor, setNavigationState } = useYachtStore();
  
  // Get navigation state from yacht config
  const activeLevel2 = currentYacht?.active_level_2 || null;
  const activeLevel3 = currentYacht?.active_level_3 || null;
  
  const [selectedPaintType, setSelectedPaintType] = React.useState('gloss'); // UI value
  const [customColor, setCustomColor] = React.useState('#FFFFFF');
  
  // Get custom colors from yacht
  const customColors = useMemo(() => {
    if (!currentYacht?.custom_colors) return [];
    
    try {
      const colors = Array.isArray(currentYacht.custom_colors) 
        ? currentYacht.custom_colors 
        : JSON.parse(currentYacht.custom_colors as string);
      
      // Filter by selected paint type
      return colors.filter((color: PaintColor) => 
        color.type === selectedPaintType
      );
    } catch (e) {
      console.error('Error parsing custom colors:', e);
      return [];
    }
  }, [currentYacht?.custom_colors, selectedPaintType]);
  
  // Get filtered colors based on current selections
  const filteredColors = useMemo(() => {
    // If custom colors selected, return custom colors instead
    if (activeLevel3 === 'custom-colours') {
      return customColors;
    }
    
    // Map UI paint type to data types using PAINT_TYPE_MAP
    const mappedTypes = PAINT_TYPE_MAP[selectedPaintType] || [selectedPaintType];
    
    // Filter colors by group and type
    let colors = paintColors;
    if (activeLevel3) {
      colors = colors.filter(color => color.group === activeLevel3);
    }
    if (mappedTypes.length > 0) {
      colors = colors.filter(color => mappedTypes.includes(color.type));
    }
    return colors;
  }, [activeLevel3, selectedPaintType, customColors]);
  
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
      type: (PAINT_TYPE_MAP[selectedPaintType]?.[0] || selectedPaintType) as 'glossy' | 'matte' | 'metallic',
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
    const paintType = selectedPaintType;
    
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
    
    // Update selected paint type based on part's current type
    const partType = currentYacht?.paint[part]?.type;
    if (partType) {
      setSelectedPaintType(partType);
    }
  };
  
  return (
    <div className="h-full pt-3 mx-auto divide-x divide-white/10 flex overflow-hidden">
      {/* Paint Type Filter */}
      <PaintTypeFilter 
        selectedPaintType={selectedPaintType}
        onPaintTypeSelect={setSelectedPaintType}
      />
      
      {/* Custom Color Picker - only show when custom colors selected */}
      {activeLevel3 === 'custom-colours' && (
        <ColorPicker
          customColor={customColor}
          onCustomColorChange={handleCustomColorChange}
          onAddCustomColor={handleAddCustomColor}
        />
      )}
      
      {/* Color Swatches */}
      <div className="flex-1 px-3 overflow-hidden flex flex-col">
        <h3 className="text-xs font-bold text-white mb-1 flex-shrink-0">Color Selection</h3>
        <SimpleColorSwatches
          colors={filteredColors}
          selectedPaintType={selectedPaintType}
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
