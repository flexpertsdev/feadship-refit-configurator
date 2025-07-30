// ==================================================
// AI EXPLANATION: WorldMap.tsx
// ==================================================
// WHAT: Interactive world map component displaying clickable regions for yacht cruising destinations with visual selection feedback
// WHY: Without this, users can't visually select cruising regions on a map - provides the interactive map UI for region selection
// USED BY: ViewMap component which is used by Operations1Page
// CRITICAL: YES - Core UI component for region selection, breaking this prevents geographical preference selection
// ==================================================

import React, { useState, useEffect } from 'react';
import { queryHumanPreferences } from '@/config';
import { YACHT_ROUTES } from '@/config/routesConfig';

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
  selectedRoutes?: string[];
  onRouteSelect?: (id: string) => void;
  showRoutes?: boolean;
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

export const WorldMap: React.FC<WorldMapProps> = ({ 
  selectedLocations, 
  onLocationSelect,
  selectedRoutes = [],
  onRouteSelect,
  showRoutes = true
}) => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [loadedRoutes, setLoadedRoutes] = useState<Record<string, { path: string; viewBox: string }>>({});
  
  // Load route SVG data
  useEffect(() => {
    if (showRoutes && selectedRoutes.length > 0) {
      selectedRoutes.forEach(async (routeId) => {
        const route = YACHT_ROUTES.find(r => r.id === routeId);
        if (route && !loadedRoutes[routeId]) {
          try {
            const response = await fetch(route.svg);
            const svgText = await response.text();
            // Extract path data and viewBox from SVG
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');
            const path = svgDoc.querySelector('path');
            
            if (path && svgElement) {
              const viewBox = svgElement.getAttribute('viewBox');
              const pathData = path.getAttribute('d') || '';
              
              setLoadedRoutes(prev => ({
                ...prev,
                [routeId]: { path: pathData, viewBox: viewBox || '0 0 1182 580' }
              }));
            }
          } catch (error) {
            console.error(`Failed to load route ${routeId}:`, error);
          }
        }
      });
    }
  }, [selectedRoutes, showRoutes]);
  
  const handleLocationClick = (id: string) => {
    onLocationSelect(id);
  };

  return (
    <div className="relative w-full h-full">
      {/* SVG Container for map and routes */}
      <svg 
        viewBox="398.61357119769673 400.0000000000434 1181.8111788919487 579.1483761698679" 
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Map Background */}
        <image
          href="/assets/routes/Blue Map.svg"
          x="398.61357119769673"
          y="400.0000000000434"
          width="1181.8111788919487"
          height="579.1483761698679"
          className="w-full h-full"
        />
        
        {/* Route overlays */}
        {showRoutes && selectedRoutes.map((routeId) => {
          const routeData = loadedRoutes[routeId];
          if (!routeData) return null;
          
          // Parse the route's viewBox to get its coordinate system
          const [x, y, width, height] = (routeData.viewBox || '0 0 1182 580').split(' ').map(Number);
          
          return (
            <g key={routeId} opacity={0.9}>
              {/* Create a nested SVG with the route's coordinate system */}
              <svg 
                x={x} 
                y={y} 
                width={width} 
                height={height}
                viewBox={routeData.viewBox}
                preserveAspectRatio="none"
              >
                <path
                  d={routeData.path}
                  stroke="#00a1c7"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="6 3"
                  className="transition-all duration-300 hover:stroke-white"
                />
              </svg>
            </g>
          );
        })}
      </svg>
      
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
      
      {/* Route Selection Panel */}
      {showRoutes && onRouteSelect && (
        <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-xs">
          <h3 className="text-white font-medium mb-3 text-sm">Select Routes</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {YACHT_ROUTES.map((route) => (
              <label
                key={route.id}
                className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 p-2 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedRoutes.includes(route.id)}
                  onChange={() => onRouteSelect(route.id)}
                  className="w-4 h-4 text-accent bg-white/20 border-white/30 rounded focus:ring-accent focus:ring-2"
                />
                <span className="text-white text-sm">{route.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Default export for backward compatibility
export default WorldMap;
