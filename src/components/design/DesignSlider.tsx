// ==================================================
// AI EXPLANATION: DesignSlider.tsx
// ==================================================
// WHAT: Custom slider component for design preference selection with 5 discrete positions, responsive sizing, and drag/click interaction
// WHY: Without this, users can't set design preferences (complexity, style, traditional levels) - provides the UI for design customization
// USED BY: Design1Page, Design2Page, Design3Page for setting complexity_level, style_level, and traditional_level
// CRITICAL: YES - Core component for design preference selection, breaking this prevents design customization
// ==================================================

import React, { useState, useRef, useEffect } from 'react';
import { useYachtStore } from '../../stores/yachtStore';

interface DesignSliderProps {
  leftLabel: string;
  rightLabel: string;
  designKey: 'complexity_level' | 'style_level' | 'traditional_level';
  onValueChange?: (value: number) => Promise<void>;
}

export function DesignSlider({ leftLabel, rightLabel, designKey, onValueChange }: DesignSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [tickPositions, setTickPositions] = useState<number[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Get value and setter from yacht store
  const value = useYachtStore((state) => state[designKey]);
  const setComplexityLevel = useYachtStore((state) => state.setComplexityLevel);
  const setStyleLevel = useYachtStore((state) => state.setStyleLevel);
  const setTraditionalLevel = useYachtStore((state) => state.setTraditionalLevel);
  
  // Log the value when it changes
  useEffect(() => {
    console.log(`DesignSlider - ${designKey} value:`, value);
  }, [value, designKey]);
  
  const setDesignValue = async (key: string, val: number) => {
    if (key === 'complexity_level') setComplexityLevel(val);
    else if (key === 'style_level') setStyleLevel(val);
    else if (key === 'traditional_level') setTraditionalLevel(val);
    
    // If there's an onValueChange callback, call it
    if (onValueChange) {
      await onValueChange(val);
    }
  };
  
  // Responsive slider dimensions
  const NUM_TICKS = 5;     // Number of positions (ticks)

  // Calculate tick positions whenever the track element size changes
  const calculateTickPositions = () => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const trackWidth = rect.width;
    const thumbSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--thumb-size') || '25');
    const edgeInset = thumbSize / 2;
    const usableWidth = trackWidth - edgeInset * 2;
    const tickSpacing = usableWidth / (NUM_TICKS - 1);
    
    const positions = Array.from({ length: NUM_TICKS }, (_, index) => edgeInset + index * tickSpacing);
    setTickPositions(positions);
  };
  
  // Initialize tick positions on component mount and window resize
  useEffect(() => {
    calculateTickPositions();
    
    // Add resize listener to recalculate positions when window size changes
    const handleResize = () => {
      calculateTickPositions();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle click on track to change value
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || tickPositions.length === 0) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    
    // Find the closest tick position
    let closestIndex = 0;
    let minDistance = Infinity;
    
    tickPositions.forEach((pos, index) => {
      const distance = Math.abs(clickX - pos);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    setDesignValue(designKey, closestIndex);
  };
  
  // Handlers for dragging the thumb
  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent track click
    setIsDragging(true);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !trackRef.current || tickPositions.length === 0) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const trackWidth = rect.width;
    const mouseX = Math.max(0, Math.min(trackWidth, e.clientX - rect.left));
    
    // Find the closest tick position
    let closestIndex = 0;
    let minDistance = Infinity;
    
    tickPositions.forEach((pos, index) => {
      const distance = Math.abs(mouseX - pos);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    setDesignValue(designKey, closestIndex);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Add and remove document-level event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, tickPositions]);

  // Calculate thumb position for current view
  const getThumbPosition = () => {
    if (tickPositions.length === 0) return 0;
    return tickPositions[value];
  };

  return (
    <div className="relative w-full flex justify-center my-2 sm:my-3 tablet:my-4 ipad:my-5 ipadpro:my-6">
      {/* Define CSS variables for responsive elements */}
      <style>{`
        :root {
          --thumb-size: 25px;
          --track-height: 8px;
          --tick-width: 2px;
        }
        
        @media (min-width: 768px) {
          :root {
            --thumb-size: 28px;
            --track-height: 9px;
            --tick-width: 2.5px;
          }
        }
        
        @media (min-width: 1024px) {
          :root {
            --thumb-size: 32px;
            --track-height: 10px;
            --tick-width: 3px;
          }
        }
        
        @media (min-width: 1366px) {
          :root {
            --thumb-size: 36px;
            --track-height: 12px;
            --tick-width: 3.5px;
          }
        }
        
        @media (min-width: 1920px) {
          :root {
            --thumb-size: 42px;
            --track-height: 14px;
            --tick-width: 4px;
          }
        }
        
        @media (min-width: 3000px) {
          :root {
            --thumb-size: 50px;
            --track-height: 16px;
            --tick-width: 5px;
          }
        }
      `}</style>

      {/* White pill container */}
      <div className="flex items-center h-[30px] sm:h-[34px] tablet:h-[38px] ipad:h-[42px] ipadpro:h-[48px] hd:h-[56px] 4k:h-[70px] bg-white rounded-[15px] sm:rounded-[17px] tablet:rounded-[19px] ipad:rounded-[21px] ipadpro:rounded-[24px] hd:rounded-[28px] 4k:rounded-[35px] px-4 sm:px-5 tablet:px-6 ipad:px-7 ipadpro:px-8 hd:px-10 4k:px-12">
        {/* Left label */}
        <div className="w-[60px] sm:w-[70px] tablet:w-[80px] ipad:w-[90px] ipadpro:w-[100px] hd:w-[120px] 4k:w-[140px] text-center mr-2 sm:mr-3 tablet:mr-4 ipad:mr-5 ipadpro:mr-6 hd:mr-7 4k:mr-8">
          <span className="text-blue-900 font-medium text-[10px] sm:text-[11px] tablet:text-[12px] ipad:text-[14px] ipadpro:text-[16px] hd:text-[20px] 4k:text-[24px]">
            {leftLabel}
          </span>
        </div>
        
        {/* Track container */}
        <div className="relative w-[200px] sm:w-[230px] tablet:w-[260px] ipad:w-[287px] ipadpro:w-[320px] hd:w-[380px] 4k:w-[450px]">
          {/* Gray track background */}
          <div 
            ref={trackRef}
            className="h-[8px] sm:h-[9px] tablet:h-[10px] ipad:h-[11px] ipadpro:h-[12px] hd:h-[14px] 4k:h-[16px] bg-[#616c6f] opacity-50 rounded-[4px] sm:rounded-[4.5px] tablet:rounded-[5px] ipad:rounded-[5.5px] ipadpro:rounded-[6px] hd:rounded-[7px] 4k:rounded-[8px] cursor-pointer"
            onClick={handleTrackClick}
          />
          
          {/* Tick marks */}
          {tickPositions.map((position, index) => (
            <div 
              key={index}
              className="absolute top-0 bg-white opacity-50"
              style={{
                left: `${position}px`,
                width: `var(--tick-width)`,
                height: `calc(var(--track-height) + 2px)`,
                transform: 'translateX(-50%)',
                top: '-1px'
              }}
            />
          ))}
          
          {/* Thumb */}
          <div 
            className="absolute top-0 rounded-full border-2 sm:border-[2.5px] tablet:border-3 ipadpro:border-4 4k:border-5 border-white cursor-grab active:cursor-grabbing"
            style={{
              width: `var(--thumb-size)`,
              height: `var(--thumb-size)`,
              left: `${getThumbPosition()}px`,
              backgroundColor: '#2b387f',
              transform: 'translate(-50%, -50%)',
              top: `calc(var(--track-height) / 2)`,
              filter: 'drop-shadow(1px 1px 1.5px rgba(0,0,0,0.3))',
              transition: isDragging ? 'none' : 'left 0.2s ease-out'
            }}
            onMouseDown={handleThumbMouseDown}
          />
        </div>
        
        {/* Right label */}
        <div className="w-[60px] sm:w-[70px] tablet:w-[80px] ipad:w-[90px] ipadpro:w-[100px] hd:w-[120px] 4k:w-[140px] text-center ml-2 sm:ml-3 tablet:ml-4 ipad:ml-5 ipadpro:ml-6 hd:ml-7 4k:ml-8">
          <span className="text-blue-900 font-medium text-[10px] sm:text-[11px] tablet:text-[12px] ipad:text-[14px] ipadpro:text-[16px] hd:text-[20px] 4k:text-[24px]">
            {rightLabel}
          </span>
        </div>
      </div>
      
      {/* Hidden range input for keyboard accessibility */}
      <input
        type="range"
        min="0"
        max="4"
        value={value}
        onChange={(e) => setDesignValue(designKey, Number(e.target.value))}
        className="sr-only"
        aria-label={`Select value between ${leftLabel} and ${rightLabel}`}
      />
    </div>
  );
}

export default DesignSlider;
