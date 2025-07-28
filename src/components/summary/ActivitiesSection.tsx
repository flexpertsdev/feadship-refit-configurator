// ==================================================
// AI EXPLANATION: ActivitiesSection.tsx
// ==================================================
// WHAT: Summary page component displaying selected activities in polaroid-style cards with rotation effects and push-pin styling
// WHY: Without this, selected activities wouldn't display on summary - shows activity choices in a visually appealing grid layout
// USED BY: SummaryPage component to display user's selected yacht activities from operations flow
// CRITICAL: NO - Display component for summary, removing only affects activity display on summary page
// ==================================================


import React from 'react';
import Section from './Section';
import ActivityCard from './ActivityCard';
import { ACTIVITIES } from '../../data/activitiesData';

interface Activity {
  title: string;
  image?: string;
  description?: string;
}

interface ActivitiesSectionProps {
  activities: Activity[];
  titleComponent?: React.ReactNode;
}

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ 
  activities,
  titleComponent
}) => {
  if (!activities || activities.length === 0) {
    return null;
  }

  // Function to get rotation angle for each item based on its position
  const getRotation = (index: number) => {
    const pattern = [-2, 1, -1, 2];
    return pattern[index % pattern.length];
  };

  // Function to get pin type based on position
  const getPinType = (index: number): 'left' | 'middle' | 'right' => {
    const pattern = ['left', 'middle', 'right'];
    return pattern[index % pattern.length] as 'left' | 'middle' | 'right';
  };

  return (
    <Section title={titleComponent ? undefined : "Your Activities"} titleComponent={titleComponent}>
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              title={activity.title}
              image={activity.image}
              description={activity.description}
              rotation={getRotation(index)}
              pinType={getPinType(index)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ActivitiesSection;
