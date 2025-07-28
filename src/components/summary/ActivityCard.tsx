// ==================================================
// AI EXPLANATION: ActivityCard.tsx
// ==================================================
// WHAT: This file contains ActivityCard.tsx
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================


import React from 'react';

interface ActivityCardProps {
  title: string;
  image?: string;
  description?: string;
  rotation: number;
  pinType: 'left' | 'middle' | 'right';
}

const ActivityCard: React.FC<ActivityCardProps> = ({ 
  title, 
  image, 
  description, 
  rotation,
  pinType
}) => {
  return (
    <div 
      className="relative flex justify-center"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: 'none'
      }}
    >
      {/* Pin */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-8 h-8">
        {pinType === 'left' && <img src="/assets/summary/LeftPin.svg" className="w-full h-full" alt="Pin" />}
        {pinType === 'middle' && <img src="/assets/summary/Pin.svg" className="w-full h-full" alt="Pin" />}
        {pinType === 'right' && <img src="/assets/summary/RightPin.svg" className="w-full h-full" alt="Pin" />}
      </div>

      {/* Polaroid Frame with hover effect */}
      <div className="bg-white p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
        {/* Image Container */}
        <div className="overflow-hidden mb-2 bg-gray-100">
          {image ? (
            <img 
              src={image} 
              alt={title}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-primary font-medium text-center">
          {title}
        </h3>
        
        {/* Description (optional) */}
        {description && (
          <p className="text-primary/70 text-xs text-center mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
