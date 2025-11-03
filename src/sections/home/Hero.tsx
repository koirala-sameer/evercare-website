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
          className="mt-12 flex justify-center gap-4 flex-wrap"
        >
          <Link to="/services" aria-label="Go to Services to enroll">
            <button className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-[#0E9384] to-[#0A7568] px-8 py-4 text-white font-semibold shadow-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#0E9384]/30 hover:scale-[1.02] active:scale-[0.98]">
              <span className="relative z-10 tracking-tight">Enroll Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </Link>

          <Link to="/services" aria-label="Explore membership plans">
            <button className="group relative rounded-lg border-2 border-[#0E9384] bg-transparent px-8 py-4 text-[#0E9384] font-semibold shadow-lg overflow-hidden transition-all duration-300 hover:bg-[#0E9384] hover:text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
              <span className="relative z-10 tracking-tight">Explore Plans</span>
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}