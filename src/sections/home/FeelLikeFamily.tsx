import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, ShieldCheck, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui";

const staggerParent = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
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

export default function FeelLikeFamily() {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-cloud/40 to-white py-28">
      <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-[0.03]" />

      <motion.div
        variants={staggerParent}
        {...motionGuard(shouldReduce, 0.4)}
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2"
      >
        {/* Left Text Side */}
        <motion.div variants={fadeUp} className="space-y-6">
          <h2 className="text-4xl font-semibold tracking-tight text-brand-ink md:text-5xl">
            Care that feels like family.
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-slate-700">
            Consistent care, compassionate professionals, and real-time
            transparency — so your loved ones always feel connected, supported,
            and safe.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { icon: <ShieldCheck className="h-5 w-5 text-brand-teal" />, label: "Verified staff & safety" },
              { icon: <Heart className="h-5 w-5 text-brand-teal" />, label: "Transparent reporting" },
              { icon: <Clock className="h-5 w-5 text-brand-teal" />, label: "24/7 availability" },
              { icon: <MessageCircle className="h-5 w-5 text-brand-teal" />, label: "Real-time updates" },
            ].map((item, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className="flex items-center gap-2 text-slate-700"
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="rounded-2xl bg-brand-teal px-6 py-3 hover:bg-brand-teal/90">
              How EverCare Works →
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl border-brand-teal px-6 py-3 text-brand-teal hover:bg-brand-teal/10"
            >
              See a Sample Report
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
