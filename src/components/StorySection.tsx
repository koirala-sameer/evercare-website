import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

type MediaType = "image" | "video" | "lottie" | "none";

export interface StorySectionProps {
  id?: string;
  headline: React.ReactNode;
  subtext?: React.ReactNode;
  ctaText?: string;
  onCtaClick?: () => void;
  mediaType?: MediaType;
  mediaSrc?: string; // image src or video src or lottie json path
  mediaAlt?: string;
  overlayGradient?: boolean;
  dark?: boolean;
  align?: "left" | "center" | "right";
  eyebrow?: string;
}

export const StorySection: React.FC<StorySectionProps> = ({
  id,
  headline,
  subtext,
  ctaText,
  onCtaClick,
  mediaType = "image",
  mediaSrc,
  mediaAlt,
  overlayGradient = true,
  dark = false,
  align = "center",
  eyebrow
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.35, triggerOnce: true });

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8 } }
  };

  return (
    <section
      id={id}
      ref={ref as any}
      className={`story-section ${dark ? "theme-dark" : "theme-light"} snap-start relative min-h-screen w-full flex items-center justify-center overflow-hidden`}
    >
      {/* Background Media */}
      {mediaType !== "none" && mediaSrc && (
        <div className="absolute inset-0 -z-10">
          {mediaType === "image" && (
            <img
              src={mediaSrc}
              alt={mediaAlt ?? ""}
              className="h-full w-full object-cover"
              loading="eager"
            />
          )}
          {mediaType === "video" && (
            <video
              className="h-full w-full object-cover"
              src={mediaSrc}
              autoPlay
              playsInline
              muted
              loop
              preload="metadata"
            />
          )}
          {overlayGradient && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />
          )}
        </div>
      )}

      {/* Content */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={variants}
        className={`relative max-w-6xl mx-auto px-6 py-24 text-${align} text-balance`}
      >
        {eyebrow && (
          <div className="inline-block rounded-full bg-teal-600/20 text-teal-100 px-3 py-1 text-sm mb-6 backdrop-blur-sm">
            {eyebrow}
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
          {headline}
        </h1>
        {subtext && (
          <p className="mt-6 text-lg sm:text-xl md:text-2xl/relaxed text-white/85 max-w-3xl mx-auto">
            {subtext}
          </p>
        )}
        {ctaText && (
          <div className={`mt-10 ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"} flex`}>
            <button
              onClick={onCtaClick}
              className="rounded-2xl px-6 py-3 bg-white/90 hover:bg-white text-slate-900 font-medium shadow-lg shadow-slate-900/20 transition"
            >
              {ctaText}
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};
export default StorySection;
