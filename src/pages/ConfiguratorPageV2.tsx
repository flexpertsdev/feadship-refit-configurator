import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import NavigationBar from '../components/navigation/NavigationBar';
import { useLocation } from 'react-router-dom';
import SimplePaintPanel from '../components/configurator/paint/SimplePaintPanel';
import { useYachtStore } from '../stores/yachtStore';
import { getLevel3ForPaintPart } from '../utils/navigationHelpers';
import ExtensionsPanel from '../components/configurator/extensions/ExtensionsPanel';
import { createPaintCommand } from '../utils/pixelStreamingUtils';
import BasicPixelStreamingView from '../components/configurator/BasicPixelStreamingView';

const ConfiguratorPageV2 = () => {
  const location = useLocation();
  const { currentYacht, updateYachtColor, setNavigationState } = useYachtStore();
  
  const sendCommandRef = useRef<((command: any) => void) | null>(null);
  const colorUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingColorUpdatesRef = useRef<Map<string, any>>(new Map());
  
  // Pixel streaming share ID
  const pixelStreamingShareId = "share-ac5e7dd9-c232-4afc-a11e-3fba9a583dab";
  
  // Get navigation state from yacht config
  const activeLevel1 = currentYacht?.active_level_1 || null;
  const activeLevel2 = currentYacht?.active_level_2 || null;

  // Set up initial navigation when entering the page
  useEffect(() => {
    if (location.pathname === '/configurator' && !activeLevel1) {
      const level2 = 'hull';
      const level3 = currentYacht ? getLevel3ForPaintPart(currentYacht, level2) : 'greens';
      setNavigationState('PAINT', level2, level3);
    } else if (location.pathname === '/extensions' && !activeLevel1) {
      setNavigationState('EXTENSIONS', null, null);
    }
  }, [location.pathname, currentYacht, activeLevel1, setNavigationState]);
  
  // Flush pending color updates
  const flushColorUpdates = useCallback(() => {
    if (pendingColorUpdatesRef.current.size === 0 || !sendCommandRef.current) {
      return;
    }

    const commands = Array.from(pendingColorUpdatesRef.current.values());
    
    // Send all pending updates
    commands.forEach(command => sendCommandRef.current?.(command));
    console.log(`Flushed ${commands.length} color updates`);
    
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
      
      // Create pixel streaming command using utility
      const command = createPaintCommand(part, color, type);
      
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
  }, [updateYachtColor, flushColorUpdates, currentYacht]);
  
  // Generic command sender for extensions and other features
  const handleSendCommand = useCallback((command: any) => {
    console.log('handleSendCommand called with:', command);
    if (sendCommandRef.current) {
      sendCommandRef.current(command);
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
  
  // Handle setting the send command function from BasicPixelStreamingView
  const handleSetSendCommand = useCallback((sendCommandFn: (command: any) => void) => {
    sendCommandRef.current = sendCommandFn;
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="relative flex-1 overflow-hidden">
        {/* Header section */}
        <div className="absolute top-0 left-0 right-0 z-10 p-6 text-white pointer-events-none">
          <div className="max-w-[1600px] mx-auto">
            {/* Future: Add yacht name, status indicators, etc. */}
          </div>
        </div>
        
        {/* Main streaming view - simple and persistent */}
        <BasicPixelStreamingView 
          shareId={pixelStreamingShareId}
          onSendCommand={handleSetSendCommand}
          onConnected={() => console.log('Pixel streaming connected')}
        />
      </div>
      
      {/* Bottom section - fixed height container */}
      <div className="h-[280px] flex flex-col bg-primary">
        {/* Navigation bar */}
        <NavigationBar position="bottom" />
        
        {/* Configuration panels - fill remaining space */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full px-4 text-white">
            {panelContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorPageV2;