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
      {/* Trust Bar - Top */}
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

        {/* Weekly Care Example */}
        <motion.div
          variants={staggerParent}
          {...motionGuard(shouldReduce, 0.3)}
          className="mt-16 grid items-center gap-12 md:grid-cols-2"
        >
          <motion.div variants={fadeUp}>
            <h3 className="text-2xl font-semibold text-brand-ink">
              A week with EverCare
            </h3>
            <p className="mt-4 text-slate-700">
              Consistent care, compassionate professionals, and real-time updates — 
              so your loved ones always feel connected, supported, and safe.
            </p>

            <ul className="mt-6 space-y-4 text-slate-700">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brand-teal" />
                <span>Verified staff & safety protocols</span>
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-teal" />
                <span>Transparent reporting you can trust</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-brand-teal" />
                <span>24/7 availability for emergencies</span>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="rounded-2xl border border-slate-200 bg-[#F4EFE9] p-6 shadow-sm">
              <div className="flex items-center gap-2 text-brand-ink">
                <Home className="h-5 w-5 text-brand-teal" />
                <h3 className="text-xl font-semibold">Weekly Care Schedule</h3>
              </div>
              <ul className="mt-4 space-y-3 text-brand-ink/85">
                <li>
                  <span className="font-medium text-brand-ink">Mon:</span> Nurse checks BP, glucose, meds.
                </li>
                <li>
                  <span className="font-medium text-brand-ink">Wed:</span> Home Specialist handles groceries & walk.
                </li>
                <li>
                  <span className="font-medium text-brand-ink">Fri:</span> Weekly report sent to family.
                </li>
                <li>
                  <span className="font-medium text-brand-ink">24/7:</span> Support line for any escalation.
                </li>
              </ul>
              <div className="mt-6 rounded-xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-600">
                <p>
                  <strong>Sample Report:</strong> BP: 126/78 · Glucose: 92 · Weight: 62kg
                </p>
                <p className="mt-2">
                  <strong>Notes:</strong> Started evening walks. Reduced salt intake.
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}