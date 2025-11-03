import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Clock, Users } from "lucide-react";
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
  const { isMobile, touchEnabled } = useMobileOptimization();

  const socialProofStats = [
    { icon: <Users className="h-4 w-4" />, text: "2500+ hours delivered" },
    { icon: <ShieldCheck className="h-4 w-4" />, text: "100% verified" },
    { icon: <Clock className="h-4 w-4" />, text: "24/7 support" },
  ];

  return (
    <section className={`relative overflow-hidden ${isMobile ? 'h-[580px]' : 'h-[650px]'} flex items-center justify-center mobile-safe-area`}>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/banner-caregiver.jpg')",
          backgroundSize: "cover",
          backgroundPosition: isMobile ? "center 30%" : "center",
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/70 to-white/90" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl text-center px-4 sm:px-6 mobile-optimized"
        variants={staggerParent}
        {...motionGuard(shouldReduce, 0.4)}
      >
        {/* Social Proof Badge - Mobile Optimized */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 backdrop-blur-sm ring-1 ring-slate-200/50 mb-4 sm:mb-6"
        >
          <div className="flex items-center gap-1 flex-wrap justify-center">
            {socialProofStats.map((stat, index) => (
              <span key={index} className="flex items-center gap-1">
                {stat.icon}
                <span className="hidden xs:inline">{stat.text}</span>
                {index < socialProofStats.length - 1 && (
                  <span className="mx-1 sm:mx-2 text-slate-300">•</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Main Headline - Mobile Optimized */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl xs:text-4xl sm:text-5xl font-bold text-brand-ink drop-shadow-sm tracking-tight leading-tight mobile-text-optimized"
        >
          Compassionate Care,{isMobile ? <br /> : " "}
          <span className="block bg-gradient-to-r from-brand-teal to-[#f58a8c] bg-clip-text text-transparent mt-2">
            Transparent Service
          </span>
        </motion.h1>

        {/* Subtitle - Mobile Optimized */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 sm:mt-5 max-w-3xl text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mobile-text-optimized px-2"
        >
          Your parents cared for, your peace of mind guaranteed — with verified caregivers,
          transparent reports, and 24/7 support.
        </motion.p>

        {/* Urgency & Trust Bar - Mobile Optimized */}
        <motion.div
          variants={fadeUp}
          className="mt-4 sm:mt-6 flex flex-col items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-medium text-center">
                {isMobile ? "Limited spots in KTM" : "Limited spots available in Kathmandu"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 text-brand-teal" />
            <span>No commitment · Cancel anytime</span>
          </div>
        </motion.div>

        {/* Buttons - Mobile Optimized with larger touch targets */}
        <motion.div
          variants={fadeUp}
          className="mt-8 sm:mt-12 flex flex-col xs:flex-row justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto"
        >
          <Link to="/services" aria-label="Go to Services to enroll" className="flex-1">
            <button className={`w-full group relative overflow-hidden rounded-lg bg-gradient-to-br from-[#0E9384] to-[#0A7568] px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold shadow-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#0E9384]/30 ${touchEnabled ? 'mobile-tap-feedback' : 'hover:scale-[1.02]'} active:scale-[0.98] cta-touch`}>
              <span className="relative z-10 tracking-tight text-sm sm:text-base">Enroll Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </Link>

          <Link to="/services" aria-label="Explore membership plans" className="flex-1">
            <button className={`w-full group relative rounded-lg border-2 border-[#0E9384] bg-transparent px-6 sm:px-8 py-3 sm:py-4 text-[#0E9384] font-semibold shadow-lg overflow-hidden transition-all duration-300 ${touchEnabled ? 'mobile-tap-feedback' : 'hover:bg-[#0E9384] hover:text-white hover:shadow-xl hover:scale-[1.02]'} active:scale-[0.98] cta-touch`}>
              <span className="relative z-10 tracking-tight text-sm sm:text-base">Explore Plans</span>
            </button>
          </Link>
        </motion.div>

        {/* Trust Indicators - Mobile Optimized */}
        <motion.div
          variants={fadeUp}
          className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-4 text-xs text-slate-500"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-br from-brand-teal to-[#f58a8c] border-2 border-white"></div>
              ))}
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center">
                <span className="text-xs text-slate-600 font-semibold">150+</span>
              </div>
            </div>
            <span>{isMobile ? "150+ families" : "Joined by 150+ families abroad"}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{isMobile ? "4.9/5 rating" : "Rated 4.9/5 by families worldwide"}</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}