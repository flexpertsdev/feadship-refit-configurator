// ==================================================
// AI EXPLANATION: ActivityGridView.tsx
// ==================================================
// WHAT: Activity selection grid component displaying yacht activity cards in responsive layout, managing preference-based activity selection with confirm flow
// WHY: Without this, users can't select intended yacht activities (diving, fishing, etc.) - crucial for equipment recommendations
// USED BY: Operations3Page for displaying and selecting yacht usage activities
// CRITICAL: YES - Core component for activity selection, breaking this prevents activity preference configuration
// ==================================================

import React from 'react';
import { useYachtStore } from '../../stores/yachtStore';
import ActivityCard from './ActivityCard';
import { getActivities } from '@/config';
import { cn } from '@/lib/utils';

// Get all activities from the config and ensure they have images
const ACTIVITIES = getActivities().filter(activity => activity.image).map(activity => ({
  id: activity.id,
  name: activity.name,
  image: activity.image!,
  details: activity.details,
  category: activity.category
}));

const ActivityGridView: React.FC = () => {
  const { currentYacht, togglePreference } = useYachtStore();
  
  // Get selected activities directly from yacht preferences
  const selectedActivities = currentYacht?.preferences
    .filter(pref => pref.startsWith('activity_'))
    .map(pref => pref.replace('activity_', '')) || [];

  // Handle activity selection with immediate update
  const handleActivitySelect = async (id: string) => {
    if (!currentYacht) return;
    
    const prefId = `activity_${id}`;
    await togglePreference(prefId);
  };

  return (
    <div className="space-y-6">
      {/* 
        Responsive Grid with proper card sizing
        Grid adjusts number of columns based on viewport
      */}
      <div className="w-full">
        <div 
          className={cn(
            "grid",
            // Base mobile
            "grid-cols-2",
            // Responsive columns
            "sm:grid-cols-3",
            "tablet:grid-cols-4", 
            "ipad:grid-cols-5",
            "ipadpro:grid-cols-6",
            "hd:grid-cols-7",
            "4k:grid-cols-9",
            // More vertical spacing between rows
            "gap-x-4 gap-y-6",
            "tablet:gap-x-4 tablet:gap-y-8",
            "hd:gap-x-5 hd:gap-y-10",
            "4k:gap-x-6 4k:gap-y-12"
          )}
          style={{
            // Max width to prevent cards from getting too large
            maxWidth: '2400px',
            margin: '0 auto'
          }}
        >
          {ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className={cn(
                "w-full",
                // Max widths per breakpoint to keep cards reasonable
                "max-w-[180px]",
                "tablet:max-w-[200px]",
                "ipad:max-w-[220px]",
                "hd:max-w-[240px]",
                "4k:max-w-[260px]",
                // Center cards in their grid cells
                "mx-auto"
              )}
            >
              <ActivityCard
                activity={{
                  id: activity.id,
                  name: activity.name,
                  image: activity.image
                }}
                isSelected={selectedActivities.includes(activity.id)}
                onSelect={() => handleActivitySelect(activity.id)}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Show selected count with responsive text */}
      {selectedActivities.length > 0 && (
        <div className={cn(
          "text-center text-white/70",
          "text-sm tablet:text-base",
          "mt-6"
        )}>
          {selectedActivities.length} {selectedActivities.length === 1 ? 'activity' : 'activities'} selected
        </div>
      )}
    </div>
  );
};

export default ActivityGridView;
