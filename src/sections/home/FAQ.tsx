import React from "react";
import { motion, useReducedMotion } from "framer-motion";

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

export default function FAQ() {
  const shouldReduce = useReducedMotion() ?? false;
  const items = [
    { q: "Where do you operate first?", a: "Launching in Kathmandu & Pokhara, expanding nationwide." },
    { q: "Can I change add-ons anytime?", a: "Yes, add or remove services monthly from your dashboard." },
    { q: "How do driver services work?", a: "On-demand with transparent per-trip billing or monthly packages." },
    { q: "Do you support medical emergencies?", a: "We coordinate ambulances, hospitals, and family notifications." },
  ];

  return (
    <section id="faq" className="bg-brand-cloud/60">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <motion.h3
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduce ? undefined : { once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-3xl font-bold tracking-tight text-brand-ink"
        >
          Frequently asked questions
        </motion.h3>

        <motion.div
          variants={staggerParent}
          {...motionGuard(shouldReduce, 0.25)}
          className="mt-10 space-y-4"
        >
          {items.map((it, i) => (
            <motion.details
              key={i}
              variants={fadeUp}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition open:shadow-soft hover:-translate-y-0.5"
            >
              <summary className="cursor-pointer list-none text-lg font-medium text-brand-ink">
                {it.q}
              </summary>
              <p className="mt-2 text-slate-700">{it.a}</p>
            </motion.details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
