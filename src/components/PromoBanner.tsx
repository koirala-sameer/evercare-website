// src/components/PromoBanner.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

type Theme = "teal" | "amber" | "slate" | "rose" | "emerald";

export interface PromoBannerProps {
  /**
   * A stable identifier used to persist dismissal in localStorage.
   * If not provided, a default key "default" is used.
   * Change this when you run a new campaign so previously dismissed banners reappear.
   */
  id?: string;

  /** Visual theme */
  theme?: Theme;

  /** Main banner content. Supports text or JSX. */
  message: React.ReactNode;

  /** Show an action button with this label (optional). */
  ctaLabel?: string;

  /**
   * If you want a link button, set `ctaHref`.
   * If both `ctaHref` and `onCtaClick` are provided, `onCtaClick` is used.
   */
  ctaHref?: string;

  /** Click handler for CTA (optional). */
  onCtaClick?: () => void;

  /**
   * Whether the banner can be dismissed. Defaults to true.
   * If false, the close button is hidden and Escape won’t dismiss.
   */
  dismissible?: boolean;

  /**
   * Number of days to keep the banner dismissed in localStorage.
   * Defaults to 1 day (your previous “daily” behavior).
   */
  persistDismissDays?: number;

  /** Additional className to append. */
  className?: string;

  /**
   * Optional: If you want to know when the user closes it.
   */
  onClose?: () => void;
}

/** LocalStorage helpers guarded for SSR */
const ls = {
  get(key: string) {
    try {
      if (typeof window === "undefined") return null;
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
};

const THEME_STYLES: Record<
  Theme,
  {
    base: string;
    text: string;
    button: string;
    buttonHover: string;
    close: string;
    ring: string;
  }
> = {
  teal: {
    base: "bg-teal-50 border-teal-200",
    text: "text-teal-900",
    button:
      "bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500",
    buttonHover: "hover:bg-teal-700",
    close:
      "text-teal-700 hover:text-teal-900 focus-visible:ring-teal-500/40",
    ring: "focus-visible:ring-teal-500/40",
  },
  amber: {
    base: "bg-amber-50 border-amber-200",
    text: "text-amber-900",
    button:
      "bg-amber-600 text-white hover:bg-amber-700 focus-visible:ring-amber-500",
    buttonHover: "hover:bg-amber-700",
    close:
      "text-amber-700 hover:text-amber-900 focus-visible:ring-amber-500/40",
    ring: "focus-visible:ring-amber-500/40",
  },
  slate: {
    base: "bg-slate-50 border-slate-200",
    text: "text-slate-900",
    button:
      "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-500",
    buttonHover: "hover:bg-slate-800",
    close:
      "text-slate-600 hover:text-slate-900 focus-visible:ring-slate-500/40",
    ring: "focus-visible:ring-slate-500/40",
  },
  rose: {
    base: "bg-rose-50 border-rose-200",
    text: "text-rose-900",
    button:
      "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500",
    buttonHover: "hover:bg-rose-700",
    close:
      "text-rose-700 hover:text-rose-900 focus-visible:ring-rose-500/40",
    ring: "focus-visible:ring-rose-500/40",
  },
  emerald: {
    base: "bg-emerald-50 border-emerald-200",
    text: "text-emerald-900",
    button:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500",
    buttonHover: "hover:bg-emerald-700",
    close:
      "text-emerald-700 hover:text-emerald-900 focus-visible:ring-emerald-500/40",
    ring: "focus-visible:ring-emerald-500/40",
  },
};

const DEFAULT_ID = "default";
const STORAGE_PREFIX = "promo";
const KEY = (id: string) => `${STORAGE_PREFIX}:${id}:dismissedUntil`;

/**
 * Returns true if now is before stored expiry.
 */
function isDismissed(dismissedUntilISO: string | null) {
  if (!dismissedUntilISO) return false;
  const until = new Date(dismissedUntilISO).getTime();
  if (Number.isNaN(until)) return false;
  return Date.now() < until;
}

function daysFromNow(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

/**
 * PromoBanner — accessible, dismissible, persistent banner.
 */
const PromoBanner: React.FC<PromoBannerProps> = ({
  id = DEFAULT_ID,
  theme = "teal",
  message,
  ctaLabel,
  ctaHref,
  onCtaClick,
  dismissible = true,
  persistDismissDays = 1,
  className = "",
  onClose,
}) => {
  const styles = THEME_STYLES[theme];
  const storageKey = useMemo(() => KEY(id), [id]);

  const [visible, setVisible] = useState<boolean>(() => {
    const until = ls.get(storageKey);
    return !isDismissed(until);
  });

  const rootRef = useRef<HTMLDivElement | null>(null);

  // Close on Escape for accessibility (if dismissible)
  useEffect(() => {
    if (!dismissible || !visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismissible, visible]);

  function handleClose() {
    if (!dismissible) return;
    ls.set(storageKey, daysFromNow(persistDismissDays));
    setVisible(false);
    onClose?.();
  }

  function handleCta(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  }

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label="Announcement"
      className={`w-full border-b ${styles.base} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6">
        <div className="flex items-stretch justify-between gap-3 py-2 sm:py-2.5">
          {/* Content */}
          <div
            className={`flex-1 leading-snug ${styles.text}`}
            // Keep text wrapping friendly on small widths
          >
            {typeof message === "string" ? (
              <p className="text-sm sm:text-[15px]">{message}</p>
            ) : (
              message
            )}
          </div>

          {/* CTA */}
          {(ctaLabel && (ctaHref || onCtaClick)) && (
            ctaHref && !onCtaClick ? (
              <a
                href={ctaHref}
                onClick={handleCta}
                className={`shrink-0 self-center rounded-full px-3 py-1.5 text-sm font-medium transition ${styles.button} ${styles.ring}`}
              >
                {ctaLabel}
              </a>
            ) : (
              <button
                type="button"
                onClick={handleCta}
                className={`shrink-0 self-center rounded-full px-3 py-1.5 text-sm font-medium transition ${styles.button} ${styles.ring}`}
              >
                {ctaLabel}
              </button>
            )
          )}

          {/* Close */}
          {dismissible && (
            <button
              type="button"
              onClick={handleClose}
              className={`-mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full transition ${styles.close} ${styles.ring}`}
              aria-label="Dismiss announcement"
            >
              <span aria-hidden="true" className="text-base">×</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
