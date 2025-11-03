import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui";

// ──────────────────────────────
// Slide Data
// ──────────────────────────────
const slides = [
  {
    id: 1,
    title: "Care for your parents as if you were here.",
    subtitle:
      "EverCare integrates daily living support, safety, health, and concierge services into one trusted membership.",
    image: "/banner-caregiver.jpg",
    overlayImage: null,
  },
  {
    id: 2,
    title: "You may be far. Your love isn’t.",
    subtitle:
      "Weekly reports, photo updates, and a 24/7 local team — so you never feel distant.",
    image: "/banner-family.jpg",
    overlayImage: "/overlay-dashboard1.png", // transparent dashboard mockup
  },
  {
    id: 3,
    title: "Care that feels like family.",
    subtitle:
      "Verified caregivers, transparent reporting, and compassionate routines every day.",
    image: "/banner-eldercare.jpg",
    overlayImage: "/overlay-dashboard2.png", // second dashboard mockup
  },
];

// ──────────────────────────────
// Animation Variants
// ──────────────────────────────
const fadeSlide = {
  enter: { opacity: 0, y: 40 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.6, 0.01, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.8, ease: [0.6, 0.01, 0.25, 1] },
  },
};

// ──────────────────────────────
// Component
// ──────────────────────────────
export default function HeroCarousel() {
  const shouldReduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shouldReduce) return;
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      6000 // ⏳ slower 6-second display time
    );
    return () => clearInterval(timer);
  }, [shouldReduce]);

  const currentSlide = slides[index];

  return (
    <section className="relative h-[650px] w-full overflow-hidden bg-white">
      {/* Backgrounds */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.4,
              ease: [0.6, 0.01, 0.25, 1],
            }}
            className="absolute inset-0"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {currentSlide.overlayImage && (
              <img
                src={currentSlide.overlayImage}
                alt=""
                className="absolute inset-0 h-full w-full object-contain opacity-40 mix-blend-overlay"
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/90" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            variants={fadeSlide}
            initial="enter"
            animate="center"
            exit="exit"
            className="max-w-xl space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.6, 0.01, 0.25, 1],
              }}
              className="text-4xl font-semibold tracking-tight text-brand-ink md:text-5xl"
            >
              {currentSlide.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.4,
                ease: [0.6, 0.01, 0.25, 1],
              }}
              className="text-lg leading-relaxed text-slate-700"
            >
              {currentSlide.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.6,
                ease: [0.6, 0.01, 0.25, 1],
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button className="rounded-2xl bg-brand-teal px-6 py-3 hover:bg-brand-teal/90">
                See Plans
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl border-brand-teal px-6 py-3 text-brand-teal hover:bg-brand-teal/10"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-brand-teal w-4"
                : "bg-slate-400/50 hover:bg-slate-400/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
