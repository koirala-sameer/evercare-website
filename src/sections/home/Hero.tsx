// src/sections/home/Hero.tsx
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const staggerParent = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
function motionGuard(shouldReduce: boolean, viewportAmount = 0.35) {
  return shouldReduce
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: viewportAmount },
      };
}

export default function Hero() {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden h-[650px] flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/banner-caregiver.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/70 to-white/90" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl text-center px-6"
        variants={staggerParent}
        {...motionGuard(shouldReduce, 0.4)}
      >
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl font-bold text-brand-ink drop-shadow-sm tracking-tight leading-tight"
        >
          Compassionate Care, Transparent Service
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-3xl text-lg md:text-xl text-slate-700 leading-relaxed"
        >
          Your parents cared for, your peace of mind guaranteed — with verified caregivers,
          transparent reports, and 24/7 support.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex justify-center gap-4 flex-wrap"
        >
          <Link to="/services" aria-label="Go to Services to enroll">
            <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-teal to-[#6fd1d2] px-8 py-4 text-white font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <span className="relative z-10">Enroll Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#6fd1d2] to-brand-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>

          <Link to="/services" aria-label="Explore membership plans">
            <button className="group relative rounded-2xl border border-slate-300 px-8 py-4 text-brand-ink font-semibold overflow-hidden transition-all duration-300 hover:border-[#f58a8c] hover:text-[#f58a8c] hover:shadow-md">
              <span className="relative z-10">Explore Plans</span>
              <span className="absolute inset-0 bg-[#f58a8c]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
