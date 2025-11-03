import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui";
import { useMobileOptimization } from "../../components/MobileOptimized";

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
  const { isMobile } = useMobileOptimization();

  // ✅ Dynamic base path for local dev or production
  const basePath = import.meta.env.BASE_URL || "";
  const heroImage = `${basePath}images/hands-care-bw.jpg`;

  const socialProofStats = [
    { icon: <Users className="h-4 w-4" />, text: "2500+ hours delivered" },
    { icon: <ShieldCheck className="h-4 w-4" />, text: "100% verified" },
    { icon: <Clock className="h-4 w-4" />, text: "24/7 support" },
  ];

  return (
    <section
      className={`relative overflow-hidden ${
        isMobile ? "h-[580px]" : "h-[650px]"
      } flex items-center justify-center mobile-safe-area`}
    >
      {/* Background Layers */}
      <div className="absolute inset-0 -z-20">
        {/* ✅ Hands image background */}
        <img
          src={heroImage}
          alt="Caregiver holding elderly hands"
          className="h-full w-full object-cover opacity-60 brightness-95 mix-blend-multiply"
          onError={(e) => {
            console.warn("Hero background image failed to load");
            e.currentTarget.style.display = "none";
          }}
        />

        {/* ✅ Subtle gradient overlays (lower opacity to reveal image) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8F7F5]/40 via-white/50 to-[#FFF3F3]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,147,132,0.12),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(245,138,140,0.12),transparent_60%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-white/70" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl text-center px-4 sm:px-6"
        variants={staggerParent}
        {...motionGuard(shouldReduce, 0.4)}
      >
        {/* Social proof stats */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 backdrop-blur-sm ring-1 ring-slate-200/50 mb-6"
        >
          {socialProofStats.map((s, i) => (
            <span key={i} className="flex items-center gap-1">
              {s.icon}
              <span className="hidden xs:inline">{s.text}</span>
              {i < socialProofStats.length - 1 && (
                <span className="mx-1 sm:mx-2 text-slate-300">•</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl xs:text-4xl sm:text-5xl font-bold text-brand-ink tracking-tight leading-tight"
        >
          Compassionate Care,{isMobile ? <br /> : " "}
          <span className="block bg-gradient-to-r from-brand-teal to-[#f58a8c] bg-clip-text text-transparent mt-2">
            Transparent Service
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 sm:mt-5 max-w-3xl text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed"
        >
          Your parents cared for, your peace of mind guaranteed — with verified caregivers,
          transparent reports, and 24/7 support.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col xs:flex-row justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto"
        >
          <Link to="/services#plans" aria-label="View Care Plans" className="flex-1">
            <Button className="w-full bg-gradient-to-br from-[#0E9384] to-[#0A7568] text-white font-semibold">
              Get Started
            </Button>
          </Link>
          <Link to="/services#plans" aria-label="View Care Plans" className="flex-1">
            <Button
              variant="outline"
              className="w-full border-2 border-[#0E9384] text-[#0E9384] font-semibold"
            >
              View Care Plans
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Slow animation */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.95;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
