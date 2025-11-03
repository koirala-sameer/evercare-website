import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui";

export default function StorySection() {
  return (
    <section className="relative bg-white py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-brand-ink md:text-4xl"
        >
          Your Family. Our Promise.
        </motion.h2>
        <p className="mt-4 text-slate-700 max-w-3xl mx-auto">
          From routine assistance to emergency response, EverCare ensures every service is reliable,
          verified, and delivered with compassion.
        </p>

        <div className="mt-10">
          <Link to="/services">
            <Button className="rounded-lg bg-gradient-to-br from-[#0E9384] to-[#0A7568] text-white font-semibold">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
