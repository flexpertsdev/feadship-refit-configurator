// ==================================================
// AI EXPLANATION: LoadingState.tsx
// ==================================================
// WHAT: Animated loading component with progress circle, percentage display, stage messaging, and reconnection state handling
// WHY: Without this, users see blank screen during stream loading - provides visual feedback and progress indication
// USED BY: PixelStreamingView component to show loading/reconnection states before stream is ready
// CRITICAL: NO - UI feedback component, breaking affects user experience but not core functionality
// ==================================================

import React from "react";
import { Progress } from "@/components/ui/progress";

interface LoadingStateProps {
  progress: number;
  stage?: string;
  isReconnecting?: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  progress, 
  stage = "Connecting to stream...",
  isReconnecting = false 
}) => {
  const getLoadingIcon = () => {
    if (isReconnecting) {
      return (
        <div className="w-24 h-24 relative mx-auto mb-8">
          <svg className="w-full h-full animate-pulse" viewBox="0 0 100 100">
            <circle
              className="text-white/20"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            <circle
              className="text-yellow-400"
              strokeWidth="6"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
              strokeDasharray="120"
              strokeDashoffset="60"
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
                animation: 'reconnect-spin 2s linear infinite'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-yellow-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
          </div>
        </div>
      );
    }

    return (
      <div className="w-24 h-24 relative mx-auto mb-8">
        <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
          <circle
            className="text-white/10"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
          <circle
            className="text-accent"
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
            strokeDasharray="264"
            strokeDashoffset={264 - (264 * progress) / 100}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              transition: 'stroke-dashoffset 0.3s ease-in-out'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-lg font-medium">{progress}%</span>
        </div>
      </div>
    );
  };

  const getStageColor = () => {
    if (isReconnecting) return "text-yellow-400";
    if (progress >= 90) return "text-green-400";
    if (progress >= 50) return "text-blue-400";
    return "text-white";
  };

  return (
    <>
      <style>{`
        @keyframes reconnect-spin {
          0% { transform: rotate(-90deg); }
          50% { transform: rotate(270deg); }
          100% { transform: rotate(-90deg); }
        }
      `}</style>
      
      <div className="absolute inset-0 flex items-center justify-center bg-primary font-gotham">
        <div className="text-center w-2/3 max-w-md">
          {getLoadingIcon()}
          
          <div className={`text-xl mb-4 transition-colors duration-300 ${getStageColor()}`}>
            {isReconnecting ? "Reconnecting..." : stage}
          </div>
          
          <div className="mb-4">
            <Progress 
              value={progress} 
              className={`h-2 transition-all duration-300 ${
                isReconnecting ? 'bg-yellow-400/20' : 'bg-white/20'
              }`}
            />
          </div>
          
          {isReconnecting && (
            <div className="text-yellow-400/80 text-sm">
              Connection lost, attempting to reconnect...
            </div>
          )}
          
          {!isReconnecting && progress < 100 && (
            <div className="text-white/60 text-sm">
              Please wait while we prepare your yacht configurator
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoadingState;