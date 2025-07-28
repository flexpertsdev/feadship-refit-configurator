// ==================================================
// AI EXPLANATION: Section.tsx
// ==================================================
// WHAT: This file contains Section.tsx
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================


import React, { ReactNode } from 'react';

interface SectionProps {
  title?: string;
  titleComponent?: ReactNode;
  children: ReactNode;
  backgroundColor?: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ 
  title, 
  titleComponent, 
  children, 
  backgroundColor = 'bg-white',
  className = ''
}) => {
  return (
    <section className={`py-10 ${backgroundColor} ${className}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {titleComponent ? (
          <div className="mb-8">{titleComponent}</div>
        ) : (
          title && (
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8 text-center">
              {title}
            </h2>
          )
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
