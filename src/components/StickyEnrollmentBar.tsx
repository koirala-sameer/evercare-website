import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, X } from "lucide-react";

export default function StickyEnrollmentBar({
  scrollThreshold = 0.25,
}: {
  scrollThreshold?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled > scrollThreshold && !dismissed) setVisible(true);
      else if (scrolled <= scrollThreshold) setVisible(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold, dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="relative flex w-full max-w-3xl items-center justify-between rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-lg px-5 py-3 shadow-lg transition-all duration-300">
        {/* Left: Icon + Message */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0E9384] to-[#0A7568] shadow-sm">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-brand-ink text-[15px] sm:text-base">
              Customize Your Care Plan
            </h4>
            <p className="text-slate-600 text-sm sm:text-[15px]">
              Explore add-on services that enhance daily care.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          to="/#addons"
          className="rounded-lg bg-gradient-to-br from-[#0E9384] to-[#0A7568] px-5 py-2.5 font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          Customize →
        </Link>

        {/* Close / Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Close bar"
          className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
