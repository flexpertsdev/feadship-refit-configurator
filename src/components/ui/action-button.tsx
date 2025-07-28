// ==================================================
// AI EXPLANATION: action-button.tsx
// ==================================================
// WHAT: Custom animated action button with hover effects, ripple animations, loading states, and responsive sizing for navigation actions
// WHY: Without this, pages would lack consistent navigation buttons - provides the primary "Continue/Next" button used throughout the flow
// USED BY: All page components (Operations1-3, Design1-3, Features, Sustainability, Services) for navigation between steps
// CRITICAL: YES - Primary navigation component, breaking this prevents users from progressing through configuration flow
// ==================================================


import React, { useState, useRef, useEffect } from 'react';

interface ActionButtonProps {
  leftText: string;
  rightText?: string;
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

export function ActionButton({ 
  leftText, 
  rightText, 
  onClick, 
  isLoading = false, 
  className = ''
}: ActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverProgress, setHoverProgress] = useState(0);
  const [ripple, setRipple] = useState({ active: false, x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Cleanup ripple effect
  useEffect(() => {
    if (ripple.active) {
      const timer = setTimeout(() => {
        setRipple(prev => ({ ...prev, active: false }));
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [ripple.active]);

  // Improved hover animation with progress tracking
  useEffect(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const duration = 400;
    
    const animate = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - lastTimeRef.current;
      const delta = (elapsed / duration) * 100;
      
      setHoverProgress(prev => {
        const newProgress = isHovered 
          ? Math.min(100, prev + delta)
          : Math.max(0, prev - delta);
        
        if ((isHovered && newProgress >= 100) || (!isHovered && newProgress <= 0)) {
          lastTimeRef.current = null;
          return newProgress;
        }
        
        lastTimeRef.current = timestamp;
        animationRef.current = requestAnimationFrame(animate);
        return newProgress;
      });
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;
    
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setRipple({ 
        active: true, 
        x: e.clientX - rect.left,
        y: e.clientY - rect.top 
      });
    }
    
    onClick();
  };

  return (
    <div 
      ref={buttonRef}
      className={`relative min-w-[200px] sm:min-w-[240px] tablet:min-w-[280px] ipad:min-w-[320px] ipadpro:min-w-[360px] hd:min-w-[420px] 4k:min-w-[480px] h-[26px] sm:h-[28px] tablet:h-[30px] ipad:h-[34px] ipadpro:h-[40px] hd:h-[48px] 4k:h-[56px] overflow-hidden rounded-full shadow-sm ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* White background */}
      <div className="absolute inset-0 bg-white rounded-full" />
      
      {/* Teal overlay with custom animation */}
      <div 
        className="absolute left-0 top-0 h-full bg-accent rounded-full"
        style={{ 
          width: rightText ? `${60 + (40 * hoverProgress / 100)}%` : '100%',
          transition: 'none'
        }}
      />
      
      {/* Ripple effect */}
      {ripple.active && (
        <div 
          className="absolute bg-white/20 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '200%',
            height: '200%',
            marginLeft: '-100%',
            marginTop: '-100%',
            transform: 'scale(0)',
            opacity: '0.6',
          }}
        />
      )}
      
      {/* Loading shimmer effect */}
      {isLoading && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      )}
      
      {/* Button content */}
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="absolute inset-0 w-full h-full flex items-center disabled:cursor-not-allowed focus:outline-none transition-transform active:scale-[0.98]"
      >
        {/* Left text - left aligned within blue area */}
        <span 
          className="text-left flex-grow text-white text-[10px] sm:text-[11px] tablet:text-[12px] ipad:text-[14px] ipadpro:text-[16px] hd:text-[20px] 4k:text-[24px] pl-4 sm:pl-5 tablet:pl-6 ipad:pl-7 ipadpro:pl-8 hd:pl-10 4k:pl-12 font-medium z-10" 
          style={{ width: rightText ? '60%' : '100%' }}
        >
          {leftText}
        </span>
        
        {/* Right text (if provided) with staggered animation */}
        {rightText && (
          <span 
            className="pr-4 sm:pr-5 tablet:pr-6 ipad:pr-7 ipadpro:pr-8 hd:pr-10 4k:pr-12 text-[10px] sm:text-[11px] tablet:text-[12px] ipad:text-[14px] ipadpro:text-[16px] hd:text-[20px] 4k:text-[24px] font-medium z-10 text-center" 
            style={{ 
              color: hoverProgress > 70 ? '#ffffff' : '#0a003e',
              width: '40%',
              transform: `translateY(${(hoverProgress > 80) ? '0' : '2'}px) scale(${1 + (hoverProgress > 85 ? (hoverProgress - 85) / 300 : 0)})`,
              opacity: 0.6 + (hoverProgress / 250),
              fontWeight: hoverProgress > 90 ? '600' : '500',
              transition: 'none'
            }}
          >
            {rightText}
          </span>
        )}
      </button>
    </div>
  );
}

export default ActionButton;
