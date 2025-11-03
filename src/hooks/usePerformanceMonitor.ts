import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

export function usePerformanceMonitor(onMetrics?: (metrics: PerformanceMetrics) => void) {
  const metricsRef = useRef<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    const metrics = metricsRef.current;

    // Get navigation timing
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    }

    // Observe Paint Timing (FCP, LCP)
    const paintObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
        }
        if (entry.name === 'largest-contentful-paint') {
          metrics.lcp = entry.startTime;
        }
      });
      reportMetrics();
    });
    
    try {
      paintObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.warn('Paint timing not supported');
    }

    // Observe Layout Shift (CLS) - Fixed type casting
    let cumulativeLayoutShift = 0;
    const layoutShiftObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          cumulativeLayoutShift += entry.value;
        }
      });
      metrics.cls = cumulativeLayoutShift;
      reportMetrics();
    });
    
    try {
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('Layout shift not supported');
    }

    // Observe First Input Delay (FID)
    const firstInputObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries() as PerformanceEventTiming[];
      entries.forEach(entry => {
        metrics.fid = entry.processingStart - entry.startTime;
        reportMetrics();
        // Disconnect after first input
        firstInputObserver.disconnect();
      });
    });
    
    try {
      firstInputObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('First input not supported');
    }

    // Report metrics when all core vitals are available or after timeout
    const reportTimeout = setTimeout(() => {
      reportMetrics();
    }, 10000);

    function reportMetrics() {
      const { fcp, lcp, fid, cls, ttfb } = metrics;
      
      // Only report when we have meaningful data
      if (fcp !== null && lcp !== null) {
        if (onMetrics) {
          onMetrics(metrics);
        }

        // Log to console in development
        if (import.meta.env.DEV) {
          console.log('🎯 Performance Metrics:', {
            'First Contentful Paint': `${fcp?.toFixed(0)}ms`,
            'Largest Contentful Paint': `${lcp?.toFixed(0)}ms`,
            'First Input Delay': `${fid?.toFixed(0)}ms`,
            'Cumulative Layout Shift': cls?.toFixed(3),
            'Time to First Byte': `${ttfb?.toFixed(0)}ms`
          });
        }

        clearTimeout(reportTimeout);
      }
    }

    return () => {
      paintObserver.disconnect();
      layoutShiftObserver.disconnect();
      firstInputObserver.disconnect();
      clearTimeout(reportTimeout);
    };
  }, [onMetrics]);

  return metricsRef.current;
}

// Simple hook to measure component render performance
export function useRenderTimer(componentName: string) {
  const startTime = useRef(performance.now());

  useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    if (import.meta.env.DEV && renderTime > 16) {
      console.warn(`⚡ ${componentName} render took ${renderTime.toFixed(2)}ms (target: <16ms)`);
    }
  });
}