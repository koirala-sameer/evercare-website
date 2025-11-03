import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui";

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative isolate overflow-hidden bg-gradient-to-r from-[#F9FAFA] to-white py-24 sm:py-32 text-center"
    >
      <div className="mx-auto max-w-4xl px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-semibold text-brand-ink"
        >
          One platform.{" "}
          <span className="text-brand-teal">Total peace of mind.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-700"
        >
          Start with the plan that fits your family best — transparent, flexible,
          and built for families abroad.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          {/* Get Started */}
          <Link to="/services#plans">
            <Button className="bg-gradient-to-br from-[#0E9384] to-[#0A7568] text-white font-semibold px-8 py-3 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              Get Started
            </Button>
          </Link>

          {/* Talk to Us - updated */}
          <a
            href="https://wa.me/9779800000000"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-brand-teal text-brand-teal font-semibold px-8 py-3 hover:bg-brand-teal hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Talk to Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
