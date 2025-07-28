// ==================================================
// AI EXPLANATION: YachtCard.tsx
// ==================================================
// WHAT: This file contains YachtCard.tsx
// WHY: This file provides standalone functionality
// USED BY: No direct dependencies found
// CRITICAL: NO - Safe to modify with caution
// ==================================================


import React, { useState } from 'react';
import { ChevronRight, Trash2, X, Check } from 'lucide-react';
import type { YachtConfig } from '../../types/yacht';

// Default image URL
const DEFAULT_YACHT_IMAGE = '/assets/yacht.jpg';

interface YachtCardProps {
  yacht: YachtConfig;
  onContinue: (yacht: YachtConfig) => void;
  onDelete: (id: string) => void;
}

export function YachtCard({ yacht, onContinue, onDelete }: YachtCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getProgressPercentage = (step: number) => {
    return Math.min(100, Math.round((step / 13) * 100));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (showDeleteConfirm) {
      e.stopPropagation();
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div 
      className="relative bg-gradient-to-br from-[#151545] to-[#101033] border border-white/10 hover:border-white/20 transition-all hover:shadow-lg rounded-lg overflow-hidden w-full"
      onClick={handleClickOutside}
    >
      <div className="h-[180px] bg-cover bg-center opacity-80"
        style={{
          backgroundImage: `url(${yacht.image || DEFAULT_YACHT_IMAGE})`
        }}
      />
      
      <div className="p-5">
        <h3 className="text-white text-lg font-medium mb-1 truncate">{yacht.name}</h3>
        
        <div className="flex items-center text-[#29ABE2] text-xs mb-3">
          <span className="mr-3">{formatDate(yacht.created_at)}</span>
          <span>{formatTime(yacht.created_at)}</span>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs text-white/70 mb-1.5">
            <span>Progress: {yacht.step} of 13 steps</span>
            <span>{getProgressPercentage(yacht.step)}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#29ABE2] rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage(yacht.step)}%` }}
            />
          </div>
        </div>
        
        <div className="mb-4">
          {yacht.operation_type && (
            <div className="inline-block bg-[#1e2b6a] text-white/80 text-xs px-2 py-1 rounded-md mr-2 mb-2">
              {yacht.operation_type === 'private' ? 'Private Yacht' : 'Charter Yacht'}
            </div>
          )}
          
          {yacht.locations && yacht.locations.length > 0 && (
            <div className="inline-block bg-[#1e2b6a] text-white/80 text-xs px-2 py-1 rounded-md mr-2 mb-2">
              {yacht.locations.length} {yacht.locations.length === 1 ? 'Location' : 'Locations'}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          {showDeleteConfirm ? (
            <div className="flex items-center space-x-3 w-full" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 flex items-center justify-center px-4 py-1.5 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors text-sm font-medium"
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </button>
              <button
                onClick={() => onDelete(yacht.id)}
                className="flex-1 flex items-center justify-center px-4 py-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-sm font-medium"
              >
                <Check className="w-4 h-4 mr-1" />
                Confirm
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onContinue(yacht)}
                className="flex items-center px-4 py-1.5 bg-white text-[#101033] rounded-full hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(true);
                }}
                className="text-white/50 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
