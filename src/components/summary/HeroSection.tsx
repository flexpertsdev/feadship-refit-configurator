// ==================================================
// AI EXPLANATION: HeroSection.tsx
// ==================================================
// WHAT: Summary page hero component displaying yacht image and integrated YachtNameEditor for editing the yacht's custom name
// WHY: Without this, the summary page would lack a visual header and users couldn't name their yacht configuration
// USED BY: SummaryPage component as the top section displaying yacht visualization and name
// CRITICAL: NO - Visual component that enhances UX but not critical for functionality
// ==================================================


import React from 'react';
import YachtNameEditor from './YachtNameEditor';

interface HeroSectionProps {
  onSaveYachtName: (name: string) => Promise<void>;
  yachtName: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSaveYachtName, yachtName }) => {
  return (
    <div className="relative bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative pt-8">
          {/* Image container */}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <img
              src="/assets/yacht-summary.jpg"
              alt="Luxury Yacht"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Yacht Name Editor */}
          <div className="relative z-10 py-8">
            <YachtNameEditor 
              initialName={yachtName}
              onSave={onSaveYachtName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
