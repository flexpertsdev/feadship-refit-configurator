// ==================================================
// AI EXPLANATION: LocationCard.tsx
// ==================================================
// WHAT: This file contains LocationCard.tsx
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================


import React from 'react';

interface LocationCardProps {
  name: string;
  image?: string;
  description?: string;
  rotation: number;
  pinType: 'left' | 'middle' | 'right';
}

const LocationCard: React.FC<LocationCardProps> = ({ 
  name, 
  image, 
  description, 
  rotation,
  pinType
}) => {
  return (
    <div
      className="relative max-w-[280px] w-full"
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

      {/* Polaroid Frame */}
      <div className="bg-white p-4 shadow-xl">
        <div className="aspect-[4/3] overflow-hidden mb-3 bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              {name}
            </div>
          )}
        </div>
        <div className="text-center">
          <h3 className="text-primary font-medium mb-1">{name}</h3>
          {description && <p className="text-primary/70 text-sm">{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
