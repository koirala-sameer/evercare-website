import React from 'react';

interface MobileOptimizedProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component that applies mobile-specific optimizations
 */
export default function MobileOptimized({ children, className = '' }: MobileOptimizedProps) {
  return (
    <div 
      className={`mobile-optimized ${className}`}
      style={{
        // Ensure proper tap targets on mobile
        // CSS will handle the rest via media queries
      }}
    >
      {children}
    </div>
  );
}

/**
 * Hook to detect mobile devices and apply specific optimizations
 */
export function useMobileOptimization() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [touchEnabled, setTouchEnabled] = React.useState(false);

  React.useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      setIsMobile(mobileRegex.test(userAgent) || window.innerWidth < 768);
      
      // Check if touch enabled
      setTouchEnabled('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile, touchEnabled };
}