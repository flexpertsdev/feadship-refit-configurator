// ==================================================
// AI EXPLANATION: ViewMap.tsx
// ==================================================
// WHAT: Map view container component that manages yacht region preferences, converting between preference IDs and display names for WorldMap
// WHY: Without this, region selection wouldn't sync with yacht data - bridges between WorldMap UI and yacht preference storage
// USED BY: Operations1Page for cruising region selection interface
// CRITICAL: YES - Critical for region selection flow, handles data transformation between UI and storage format
// ==================================================


import React, { useEffect, useState } from 'react';
import WorldMap from './WorldMap';
import { useYachtStore } from '../../stores/yachtStore';

interface ViewMapProps {
  onLocationChange?: (locations: string[]) => Promise<void>;
  onRouteChange?: (routes: string[]) => Promise<void>;
}

export function ViewMap({ onLocationChange, onRouteChange }: ViewMapProps) {
  const { currentYacht } = useYachtStore();
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  
  // Get selected locations from the yacht store - convert from preferences
  const regionPreferences = currentYacht?.preferences.filter(id => id.startsWith('region_')) || [];
  const selectedLocations = regionPreferences.map(pref => {
    // Convert region_caribbean back to caribbean, region_south_pacific to south-pacific, etc
    const region = pref.replace('region_', '');
    return region.replace(/_/g, '-');
  });
  
  // Get selected routes from yacht preferences
  useEffect(() => {
    if (currentYacht) {
      const routePreferences = currentYacht.preferences.filter(id => id.startsWith('route_'));
      const routes = routePreferences.map(pref => pref.replace('route_', ''));
      setSelectedRoutes(routes);
    }
  }, [currentYacht]);
  
  // Handle location selection
  const handleLocationSelect = async (locationId: string) => {
    if (!currentYacht) return;
    
    let updatedLocations: string[];
    
    if (selectedLocations.includes(locationId)) {
      updatedLocations = selectedLocations.filter(id => id !== locationId);
    } else {
      updatedLocations = [...selectedLocations, locationId];
    }
    
    // If there's an onLocationChange callback, call it
    if (onLocationChange) {
      await onLocationChange(updatedLocations);
    }
  };
  
  // Handle route selection
  const handleRouteSelect = async (routeId: string) => {
    if (!currentYacht) return;
    
    let updatedRoutes: string[];
    
    if (selectedRoutes.includes(routeId)) {
      updatedRoutes = selectedRoutes.filter(id => id !== routeId);
    } else {
      updatedRoutes = [...selectedRoutes, routeId];
    }
    
    setSelectedRoutes(updatedRoutes);
    
    // If there's an onRouteChange callback, call it
    if (onRouteChange) {
      await onRouteChange(updatedRoutes);
    }
  };
  
  return (
    <WorldMap 
      selectedLocations={selectedLocations} 
      onLocationSelect={handleLocationSelect}
      selectedRoutes={selectedRoutes}
      onRouteSelect={handleRouteSelect}
      showRoutes={true}
    />
  );
}

export default ViewMap;
