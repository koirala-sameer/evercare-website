import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight, ShieldCheck } from "lucide-react";

interface StickyEnrollmentBarProps {
  scrollThreshold?: number; // 0 to 1, percentage of page scroll
  showCloseButton?: boolean;
}

export default function StickyEnrollmentBar({ 
  scrollThreshold = 0.25,
  showCloseButton = true 
}: StickyEnrollmentBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (isClosed) return;

    const handleScroll = () => {
      const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setIsVisible(scrollPercentage > scrollThreshold);
      setScrollProgress(scrollPercentage);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold, isClosed]);

  const handleClose = () => {
    setIsClosed(true);
    setIsVisible(false);
    
    // Store in localStorage to remember user's choice for this session
    try {
      sessionStorage.setItem("stickyBarClosed", "true");
    } catch (error) {
      // Ignore localStorage errors
    }
  };

  // Check if user previously closed the bar in this session
  useEffect(() => {
    try {
      const wasClosed = sessionStorage.getItem("stickyBarClosed");
      if (wasClosed === "true") {
        setIsClosed(true);
      }
    } catch (error) {
      // Ignore localStorage errors
    }
  }, []);

  if (!isVisible || isClosed) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-6 duration-300">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 max-w-md mx-4 backdrop-blur-sm bg-white/95">
        <div className="flex items-center justify-between gap-4">
          {/* Content */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0E9384] to-[#0A7568] flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-brand-ink text-sm truncate">
                Start Your Care Journey
              </h4>
              <p className="text-xs text-slate-600 truncate">
                NPR 24,999/mo · No commitment
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link 
              to="/enroll" 
              className="bg-gradient-to-br from-[#0E9384] to-[#0A7568] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1 group"
              onClick={() => setIsClosed(true)}
            >
              Enroll
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            
            {showCloseButton && (
              <button
                onClick={handleClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close enrollment bar"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Progress indicator - FIXED: Now uses state variable */}
        <div className="mt-2 w-full bg-slate-200 rounded-full h-1">
          <div 
            className="bg-gradient-to-r from-[#0E9384] to-[#0A7568] h-1 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(scrollProgress * 100, 100)}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}