import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl"
        >
          One platform. <span className="text-brand-teal">Total peace of mind.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-4 max-w-2xl text-base text-slate-700 sm:text-lg leading-relaxed"
        >
          Start with the Standard membership today and add specialized services anytime — 
          transparent, flexible, and built for families abroad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/services"
            aria-label="Go to Services page"
            className="rounded-lg bg-gradient-to-br from-[#0E9384] to-[#0A7568] text-white font-semibold px-8 py-4 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Get Started →
          </Link>

          <Link
            to="/services"
            aria-label="See what’s included on the Services page"
            className="rounded-lg border-2 border-brand-teal text-brand-teal font-semibold px-8 py-4 hover:bg-brand-teal/10 hover:scale-[1.02] transition-all duration-300"
          >
            See what’s included
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
