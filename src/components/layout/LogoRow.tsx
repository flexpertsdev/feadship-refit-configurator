// ==================================================
// AI EXPLANATION: LogoRow.tsx
// ==================================================
// WHAT: This file contains LogoRow.tsx
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================


import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoRow: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-primary min-h-[75px] flex-shrink-0 flex items-center justify-center border-b border-primary-light/20 px-4">
      <div className="container mx-auto flex justify-center items-center h-full">
        <img 
          src="/assets/logo.svg" 
          alt="Feadship" 
          className="h-6 cursor-pointer" 
          onClick={() => navigate('/')}
        />
      </div>
    </div>
  );
};

export default LogoRow;
