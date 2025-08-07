// ==================================================
// AI EXPLANATION: OperationTypeView.tsx
// ==================================================
// WHAT: Container component displaying operation type cards (Private/Charter) in responsive grid layout using custom hook for selection logic
// WHY: Without this, users can't choose between private or charter yacht operation - manages the UI for this critical decision
// USED BY: Operations2Page to display private/charter selection interface
// CRITICAL: YES - Key component in operations flow, breaking this prevents operation type selection
// ==================================================

import React from 'react';
import { Separator } from '@/components/ui/separator';
import OperationTypeCard from './OperationTypeCard';
import useOperationTypeSelection from '@/hooks/useOperationTypeSelection';

const OperationTypeView: React.FC = () => {
  const {
    operationTypes,
    selectedType,
    handleSelectOperationType
  } = useOperationTypeSelection();

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Responsive container with max width constraints */}
      <div className="w-full max-w-xs sm:max-w-2xl tablet:max-w-3xl laptop:max-w-4xl hd:max-w-5xl 4k:max-w-6xl px-2 sm:px-0">
        {/* Card Grid - stacks on mobile, side-by-side on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 tablet:gap-6 laptop:gap-8 h-full">
          {operationTypes.map(type => (
            <OperationTypeCard 
              key={type.id}
              id={type.id} 
              name={type.name} 
              description={type.description} 
              image={type.image} 
              isSelected={selectedType === type.id && selectedType !== null} 
              onSelect={handleSelectOperationType} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OperationTypeView;
