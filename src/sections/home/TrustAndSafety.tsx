import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Users, Lock, AlertTriangle, Home } from "lucide-react";
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

export default function TrustAndSafety() {
  const shouldReduce = useReducedMotion() ?? false;

  const trustFeatures = [
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

  const trustIndicators = [
    { icon: <ShieldCheck className="h-5 w-5 text-brand-teal/90" />, text: "Radical transparency" },
    { icon: <Users className="h-5 w-5 text-brand-teal/90" />, text: "Verified caregivers" },
    { icon: <Lock className="h-5 w-5 text-brand-teal/90" />, text: "Safety-first operations" },
    { icon: <Home className="h-5 w-5 text-brand-teal/90" />, text: "24/7 availability" },
  ];

  return (
    <section className="bg-white">
      {/* Trust Bar */}
      <motion.div
        className="border-y border-slate-200 bg-white/60"
        variants={staggerParent}
        {...motionGuard(shouldReduce, 0.4)}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 py-6 text-slate-600">
          {trustIndicators.map((item, i) => (
            <motion.div key={i} variants={fadeUp} className="flex items-center gap-2">
              {item.icon}
              <span className="text-sm font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Trust Content */}
      <div className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={staggerParent}
          {...motionGuard(shouldReduce, 0.4)}
        >
          <motion.h3
            variants={fadeUp}
            className="text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl"
          >
            Trust & safety built in
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-3 text-slate-700">
            Built for trust from day one — safe operations, secure data, clear escalation.
          </motion.p>
        </motion.div>

        {/* Trust Features Grid */}
        <motion.div
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerParent}
          {...motionGuard(shouldReduce, 0.35)}
        >
          {trustFeatures.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={shouldReduce ? undefined : { y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="relative overflow-hidden p-6 h-full">
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.bg}`}
                />
                <div className="relative z-10">
                  <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-brand-ink">
                    {feature.title}
                  </h4>
                  <p className="mt-2 text-slate-700">{feature.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
