// ==================================================
// AI EXPLANATION: ConfiguratorPage.tsx
// ==================================================
// WHAT: Main 3D yacht configurator page integrating pixel streaming view for real-time 3D rendering with paint/extension panels, handles color updates with debouncing
// WHY: Without this, users can't see live 3D yacht customization - it's the core interactive visualization page where paint and extensions are applied in real-time
// USED BY: App.tsx (routes /configurator and /extensions), navigated to from HomePage, design pages, and navigation
// CRITICAL: YES - Core 3D visualization and customization interface, breaking this removes the main interactive yacht configuration experience
// ==================================================

/**
 * TODO: ConfiguratorPage V2 - Simplify the "Clutter Duck Mosaic"
 * 
 * Current complexity issues:
 * 1. Pixel streaming integration (3D view)
 * 2. Complex color debouncing logic
 * 3. Navigation store dependencies
 * 4. Multiple panels (Paint, Extensions)
 * 
 * Simplification plan:
 * 1. Remove navigationStore dependency:
 *    - Read active_level_1/2 from yacht config
 *    - Update yacht config directly for navigation
 * 2. Simplify color updates:
 *    - Every color change = immediate updateYacht()
 *    - Let pixel streaming handle its own debouncing
 *    - Remove pendingColorUpdatesRef complexity
 * 3. Direct update pattern:
 *    - Paint panel clicks update yacht.paint immediately
 *    - Extensions selections update yacht.extensions
 *    - No intermediate state or batching
 * 4. Cleaner component structure:
 *    - Split Paint and Extensions into separate pages?
 *    - Or use simpler conditional rendering
 * 5. Fix part name mapping:
 *    - Create utility for bootstripe → boot_stripe_paint
 *    - Handle all special cases consistently
 * 6. Better error handling:
 *    - Show user-friendly messages if 3D view fails
 *    - Fallback to static yacht image
 * 7. Mobile responsiveness:
 *    - Ensure panels work on small screens
 *    - Consider simplified mobile view
 * 8. Remove unused code:
 *    - useState import not used
 *    - Clean up refs and callbacks
 */

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import NavigationBar from '../components/navigation/NavigationBar';
import { useLocation } from 'react-router-dom';
import SimplePaintPanel from '../components/configurator/paint/SimplePaintPanel';
import { useYachtStore } from '../stores/yachtStore';
import { getLevel3ForPaintPart } from '../utils/navigationHelpers';
// Removed toast suppressor import
import PixelStreamingView from '../components/configurator/PixelStreamingView';
import ExtensionsPanel from '../components/configurator/extensions/ExtensionsPanel';

interface ColorUpdateCommand {
  change_paint: {
    part: string;
    color: { r: number; g: number; b: number };
    type: string;
  };
}

const ConfiguratorPage = () => {
  const location = useLocation();
  const { currentYacht, updateYachtColor, setNavigationState } = useYachtStore();
  
  // Get navigation state from yacht config
  const activeLevel1 = currentYacht?.active_level_1 || null;
  const activeLevel2 = currentYacht?.active_level_2 || null;
  const sendCommandRef = useRef<((command: any) => void) | null>(null);
  
  // Memoize yacht ID to prevent unnecessary re-renders
  const yachtId = useMemo(() => currentYacht?.id, [currentYacht?.id]);
  
  // Debounced color updates to improve performance
  const pendingColorUpdatesRef = useRef<Map<string, ColorUpdateCommand>>(new Map());
  const colorUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Pixel streaming share ID - could be moved to config
  const pixelStreamingShareId = useMemo(() => 
    "share-ac5e7dd9-c232-4afc-a11e-3fba9a583dab", []
  );

  // Set up navigation based on current path
  useEffect(() => {
    if (location.pathname === '/configurator') {
      if (activeLevel1 !== 'PAINT') {
        const level2 = 'hull';
        const level3 = currentYacht ? getLevel3ForPaintPart(currentYacht, level2) : 'greens';
        setNavigationState('PAINT', level2, level3);
      }
    } else if (location.pathname === '/extensions') {
      if (activeLevel1 !== 'EXTENSIONS') {
        setNavigationState('EXTENSIONS', null, null);
      }
    }
  }, [location.pathname, activeLevel1, currentYacht, setNavigationState]);
  
  // Flush pending color updates
  const flushColorUpdates = useCallback(() => {
    if (pendingColorUpdatesRef.current.size === 0 || !sendCommandRef.current) {
      return;
    }

    const commands = Array.from(pendingColorUpdatesRef.current.values());
    
    // Send all pending updates as batch if more than one
    if (commands.length > 1) {
      commands.forEach(command => sendCommandRef.current?.(command));
      console.log(`Flushed ${commands.length} color updates`);
    } else if (commands.length === 1) {
      sendCommandRef.current(commands[0]);
    }
    
    pendingColorUpdatesRef.current.clear();
  }, []);

  // Optimized color change handler with debouncing
  const handleColorChange = useCallback(async (
    part: string, 
    color: string, 
    type: string, 
    name: string, 
    group?: string
  ) => {
    try {
      // Update local state immediately for responsive UI
      await updateYachtColor(part, color, type, name, group);
      
      // Prepare pixel streaming command
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      
      // Handle special case for bootstripe part name
      const pixelStreamingPartName = part === 'bootstripe' 
        ? 'boot_stripe_paint' 
        : `${part}_paint`;
      
      const command: ColorUpdateCommand = {
        change_paint: {
          part: pixelStreamingPartName,
          color: { r, g, b },
          type: type
        }
      };
      
      // Store command for debounced sending
      pendingColorUpdatesRef.current.set(part, command);
      
      // Clear existing timeout and set new one
      if (colorUpdateTimeoutRef.current) {
        clearTimeout(colorUpdateTimeoutRef.current);
      }
      
      colorUpdateTimeoutRef.current = setTimeout(() => {
        flushColorUpdates();
      }, 100); // 100ms debounce delay
      
    } catch (error) {
      console.error('Failed to update color:', error);
    }
  }, [updateYachtColor, flushColorUpdates]);
  
  // Handle setting the send command function from PixelStreamingView
  const handleSetSendCommand = useCallback((sendCommandFn: (command: any) => void) => {
    sendCommandRef.current = sendCommandFn;
    
    // Flush any pending updates when connection is established
    if (pendingColorUpdatesRef.current.size > 0) {
      setTimeout(flushColorUpdates, 500); // Small delay to ensure connection is stable
    }
  }, [flushColorUpdates]);
  
  // Generic command sender for extensions and other features
  const handleSendCommand = useCallback((command: any) => {
    if (sendCommandRef.current) {
      sendCommandRef.current(command);
    } else {
      console.warn('Pixel streaming not ready, command queued');
    }
  }, []);
  
  // Memoized panel content to prevent unnecessary re-renders
  const panelContent = useMemo(() => {
    if (activeLevel1 === 'PAINT') {
      return <SimplePaintPanel onColorChange={handleColorChange} />;
    } else if (activeLevel1 === 'EXTENSIONS') {
      return <ExtensionsPanel onSendCommand={handleSendCommand} />;
    }
    return null;
  }, [activeLevel1, handleColorChange, handleSendCommand]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (colorUpdateTimeoutRef.current) {
        clearTimeout(colorUpdateTimeoutRef.current);
      }
      // Flush any pending updates before unmounting
      flushColorUpdates();
    };
  }, [flushColorUpdates]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Removed toast suppressor */}
      
      <div className="relative flex-1 overflow-hidden">
        {/* Header section - could add yacht info here */}
        <div className="absolute top-0 left-0 right-0 z-10 p-6 text-white pointer-events-none">
          <div className="max-w-[1600px] mx-auto">
            {/* Future: Add yacht name, status indicators, etc. */}
          </div>
        </div>
        
        {/* Main streaming view with auto-start */}
        <PixelStreamingView 
          key={`stream-${yachtId || 'default'}`} // Only re-mount when yacht actually changes
          shareId={pixelStreamingShareId}
          onSendCommand={handleSetSendCommand}
          autoStart={true}
          maxRetries={3}
        />
      </div>
      
      {/* Bottom navigation */}
      <NavigationBar position="bottom" />
      
      {/* Configuration panels */}
      <div className="w-full bg-primary overflow-hidden">
        <div className="w-full px-4 text-white">
          {panelContent}
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorPage;