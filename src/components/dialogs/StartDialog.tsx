// ==================================================
// AI EXPLANATION: StartDialog.tsx
// ==================================================
// WHAT: Modal dialog component displaying welcome message and disclaimer when user starts yacht configuration, with loading state
// WHY: Without this, users wouldn't see initial instructions and disclaimer - provides onboarding UI for new configurations
// USED BY: HomePage component when user clicks "Start Designing" button
// CRITICAL: NO - Onboarding UI component, can be removed without breaking core functionality
// ==================================================


import React from 'react';
import { X } from 'lucide-react';

interface StartDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  animationClassName?: string;
  disclaimer?: string;
}

export function StartDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading,
  animationClassName = 'animate-in fade-in duration-300',
}: StartDialogProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-[#0a003e] max-w-2xl w-full rounded-lg border border-white/10 shadow-xl animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">
        {/* Header */}
        <div className="flex justify-end p-4">
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Content */}
        <div className="px-8 pb-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            LET'S GET STARTED
          </h2>
          
          <p className="text-lg text-white/90 mb-8 leading-relaxed">
            In order to create an holistic refit wishlist, we need to dive into your personal preferences and yacht operating profile.
          </p>
          <div className="flex justify-center">
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-8 py-3 bg-[#29ABE2] text-white rounded-full hover:bg-[#2499cc] disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                'Start Configuration'
              )}
            </button>
          </div>
          <div className="rounded-lg pt-4 mb-8">
            <p className="text-sm text-white/70 leading-relaxed">
              Disclaimer: The Feadship Refit Configurator is for demonstration purposes only. Feadship makes no guarantees about the accuracy, completeness, or usefulness of the content and disclaims any responsibility or liability for its use. No technical feasibility studies have been conducted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
