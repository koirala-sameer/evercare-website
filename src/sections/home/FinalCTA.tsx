import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui";

export default function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl"
        >
          One platform. <span className="text-brand-teal">Total peace of mind.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-4 max-w-2xl text-base text-slate-700 sm:text-lg"
        >
          Start with the plan that fits your family best — transparent, flexible, and built for families abroad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link to="/services#plans">
            <Button className="bg-gradient-to-br from-[#0E9384] to-[#0A7568] text-white font-semibold">
              Get Started
            </Button>
          </Link>

          <Link to="/contact">
            <Button
              variant="outline"
              className="border-2 border-brand-teal text-brand-teal font-semibold"
            >
              Talk to Us
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
