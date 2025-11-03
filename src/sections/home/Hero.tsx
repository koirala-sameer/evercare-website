import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Clock, Users } from "lucide-react";

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

  const socialProofStats = [
    { icon: <Users className="h-4 w-4" />, text: "2500+ hours of care delivered" },
    { icon: <ShieldCheck className="h-4 w-4" />, text: "100% verified caregivers" },
    { icon: <Clock className="h-4 w-4" />, text: "24/7 support available" },
  ];

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
        {/* Social Proof Badge - NEW ADDITION */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-sm ring-1 ring-slate-200/50 mb-6"
        >
          <div className="flex items-center gap-1">
            {socialProofStats.map((stat, index) => (
              <span key={index} className="flex items-center gap-1">
                {stat.icon}
                <span className="hidden sm:inline">{stat.text}</span>
                {index < socialProofStats.length - 1 && (
                  <span className="mx-2 text-slate-300">•</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Main Headline - KEEPING YOUR ORIGINAL TEXT */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-5xl font-bold text-brand-ink drop-shadow-sm tracking-tight leading-tight"
        >
          Compassionate Care, Transparent Service
        </motion.h1>

        {/* Subtitle - KEEPING YOUR ORIGINAL TEXT */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-3xl text-lg md:text-xl text-slate-700 leading-relaxed"
        >
          Your parents cared for, your peace of mind guaranteed — with verified caregivers,
          transparent reports, and 24/7 support.
        </motion.p>

        {/* Urgency & Trust Bar - NEW ADDITION */}
        <motion.div
          variants={fadeUp}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-600"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-medium">Limited spots available in Kathmandu</span>
            </div>
          </div>
          <div className="hidden sm:block text-slate-400">•</div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brand-teal" />
            <span>No commitment · Cancel anytime</span>
          </div>
        </motion.div>

        {/* Buttons - KEEPING YOUR ORIGINAL BUTTONS WITH ENHANCEMENTS */}
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

        {/* Trust Indicators - NEW ADDITION */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-slate-500"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 w-6 rounded-full bg-gradient-to-br from-brand-teal to-[#f58a8c] border-2 border-white"></div>
              ))}
            </div>
            <span>Joined by 150+ families abroad</span>
          </div>
          <div className="hidden sm:block text-slate-400">•</div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Rated 4.9/5 by families worldwide</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}