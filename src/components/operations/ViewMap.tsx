// ==================================================
// AI EXPLANATION: ViewMap.tsx
// ==================================================
// WHAT: Map view container component that manages yacht region preferences, converting between preference IDs and display names for WorldMap
// WHY: Without this, region selection wouldn't sync with yacht data - bridges between WorldMap UI and yacht preference storage
// USED BY: Operations1Page for cruising region selection interface
// CRITICAL: YES - Critical for region selection flow, handles data transformation between UI and storage format
// ==================================================


import React, { useEffect } from 'react';
import WorldMap from './WorldMap';
import { useYachtStore } from '../../stores/yachtStore';

interface ViewMapProps {
  onLocationChange?: (locations: string[]) => Promise<void>;
}

export function ViewMap({ onLocationChange }: ViewMapProps) {
  const { currentYacht } = useYachtStore();
  
  // Get selected locations from the yacht store - convert from preferences
  const regionPreferences = currentYacht?.preferences.filter(id => id.startsWith('region_')) || [];
  const selectedLocations = regionPreferences.map(pref => {
    // Convert region_caribbean back to Caribbean, region_south_pacific to South Pacific, etc
    const region = pref.replace('region_', '');
    return region.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  });
  
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
  
  return <WorldMap selectedLocations={selectedLocations} onLocationSelect={handleLocationSelect} />;
}

export default ViewMap;
