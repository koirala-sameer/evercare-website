import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Users, Lock, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui";

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

export default function SecurityPrivacy() {
  const shouldReduce = useReducedMotion() ?? false;
  const items = [
    {
      icon: <Users className="h-6 w-6 text-brand-teal" />,
      title: "Vetted caregivers",
      desc: "Background checks, references verified, and ongoing quality audits.",
      bg: "from-brand-teal/10 to-transparent",
    },
    {
      icon: <Lock className="h-6 w-6 text-brand-ink" />,
      title: "Secure by default",
      desc: "Encrypted data at rest & in transit. Role-based access for families.",
      bg: "from-slate-300/20 to-transparent",
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-[#f58a8c]" />,
      title: "Emergency playbooks",
      desc: "Clear SOPs for incidents: escalation, hospitals, and family alerts.",
      bg: "from-[#f58a8c]/10 to-transparent",
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-18 md:py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={staggerParent}
          {...motionGuard(shouldReduce, 0.4)}
        >
          <motion.h3
            variants={fadeUp}
            className="text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl"
          >
            Security & privacy
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-3 text-slate-700">
            Built for trust from day one — safe operations, secure data, clear
            escalation.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-3"
          variants={staggerParent}
          {...motionGuard(shouldReduce, 0.35)}
        >
          {items.map((it, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={shouldReduce ? undefined : { y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="relative overflow-hidden p-6">
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${it.bg}`}
                />
                <div className="relative z-10">
                  <div className="mb-3 inline-grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    {it.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-brand-ink">
                    {it.title}
                  </h4>
                  <p className="mt-2 text-slate-700">{it.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
