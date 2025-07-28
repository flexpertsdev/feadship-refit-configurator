// ==================================================
// AI EXPLANATION: WorldMap.tsx
// ==================================================
// WHAT: Interactive world map component displaying clickable regions for yacht cruising destinations with visual selection feedback
// WHY: Without this, users can't visually select cruising regions on a map - provides the interactive map UI for region selection
// USED BY: ViewMap component which is used by Operations1Page
// CRITICAL: YES - Core UI component for region selection, breaking this prevents geographical preference selection
// ==================================================

import React, { useState } from 'react';
import { queryHumanPreferences } from '@/config';

interface Location {
  id: string;
  name: string;
  position: {
    top: string;
    left: string;
  };
  clickRegion?: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
}

interface WorldMapProps {
  selectedLocations: string[];
  onLocationSelect: (id: string) => void;
}

// Get destinations from config
const destinations = queryHumanPreferences({ type: 'destination' });

// Map positions for destinations (keeping the existing layout)
const LOCATION_POSITIONS: Record<string, Location['position'] & { clickRegion?: Location['clickRegion'] }> = {
  'mediterranean': { 
    top: '35%', left: '48%',
    clickRegion: { top: '25%', left: '40%', width: '15%', height: '15%' }
  },
  'caribbean': { 
    top: '45%', left: '25%',
    clickRegion: { top: '35%', left: '20%', width: '10%', height: '15%' }
  },
  'south-pacific': { 
    top: '65%', left: '85%',
    clickRegion: { top: '55%', left: '80%', width: '15%', height: '15%' }
  },
  'northern-europe': { 
    top: '19%', left: '48%',
    clickRegion: { top: '10%', left: '40%', width: '15%', height: '15%' }
  },
  'antarctica': { 
    top: '95%', left: '50%',
    clickRegion: { top: '85%', left: '40%', width: '20%', height: '10%' }
  },
  'arctic': { 
    top: '5%', left: '50%',
    clickRegion: { top: '0%', left: '40%', width: '20%', height: '10%' }
  },
  'southeast-asia': { 
    top: '50%', left: '75%',
    clickRegion: { top: '40%', left: '70%', width: '15%', height: '20%' }
  }
};

// Build locations array from config destinations
const LOCATIONS: Location[] = destinations
  .filter(dest => LOCATION_POSITIONS[dest.id])
  .map(dest => ({
    id: dest.id,
    name: dest.name,
    position: {
      top: LOCATION_POSITIONS[dest.id].top,
      left: LOCATION_POSITIONS[dest.id].left
    },
    clickRegion: LOCATION_POSITIONS[dest.id].clickRegion
  }));

export const WorldMap: React.FC<WorldMapProps> = ({ selectedLocations, onLocationSelect }) => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  
  const handleLocationClick = (id: string) => {
    onLocationSelect(id);
    
    // No toast notifications needed
  };

  return (
    <div className="relative w-full h-full">
      {/* Map Background - Ensure it's at the bottom layer */}
      <img
        src="/assets/step4/Map.png"
        alt="World Map"
        className="absolute inset-0 w-full h-full object-contain z-0"
      />
      
      {/* Location markers - Position above map */}
      {LOCATIONS.map((location) => (
        <div key={location.id} className="absolute z-10">
          {/* Location Label */}
          <button 
            onClick={() => handleLocationClick(location.id)}
            onMouseEnter={() => setHoveredLocation(location.id)}
            onMouseLeave={() => setHoveredLocation(null)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" 
            style={{ 
              top: location.position.top, 
              left: location.position.left,
              zIndex: 20
            }}
          >
            <div className={`
              px-2 py-0.5 text-xs sm:text-sm md:text-base font-medium rounded-full 
              transition-all duration-300 whitespace-nowrap
              ${selectedLocations.includes(location.id) 
                ? 'bg-accent text-white' 
                : hoveredLocation === location.id 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/10 text-white'
              }
            `}>
              {location.name}
            </div>
          </button>
          
          {/* Clickable regions with hover effect */}
          {location.clickRegion && (
            <button
              onClick={() => handleLocationClick(location.id)}
              className="absolute bg-transparent transition-colors"
              style={{
                top: location.clickRegion.top,
                left: location.clickRegion.left,
                width: location.clickRegion.width,
                height: location.clickRegion.height,
                background: hoveredLocation === location.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                zIndex: 10
              }}
            >
              <span className="sr-only">{location.name}</span>
            </button>
          )}
          
          {/* Visual indicator for selected locations */}
          {selectedLocations.includes(location.id) && (
            <div
              className="absolute rounded-full bg-accent/50 animate-pulse"
              style={{
                top: location.position.top,
                left: location.position.left,
                width: "15px",
                height: "15px",
                transform: "translate(-50%, -50%)",
                zIndex: 15
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// Default export for backward compatibility
export default WorldMap;
