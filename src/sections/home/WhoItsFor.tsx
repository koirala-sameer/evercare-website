import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Users, Home as HomeIcon, Stethoscope } from "lucide-react";
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

export default function WhoItsFor() {
  const shouldReduce = useReducedMotion() ?? false;
  const items = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Diaspora children",
      bullets: [
        "See updates in real time",
        "Request help same day",
        "Pay digitally & share access",
      ],
      tint: "from-brand-teal/15 to-[#6fd1d2]/15",
      dot: "bg-brand-teal",
    },
    {
      icon: <HomeIcon className="h-6 w-6" />,
      title: "Local parents",
      bullets: [
        "Trusted caregivers",
        "Predictable routines",
        "Respectful, friendly support",
      ],
      tint: "from-[#f58a8c]/15 to-[#f9b3b4]/15",
      dot: "bg-[#f58a8c]",
    },
    {
      icon: <Stethoscope className="h-6 w-6" />,
      title: "Care managers",
      bullets: [
        "Clear SOPs & logs",
        "Escalation playbooks",
        "Family communication handled",
      ],
      tint: "from-brand-cloud/60 to-white",
      dot: "bg-slate-400",
    },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={staggerParent}
          {...motionGuard(shouldReduce, 0.35)}
        >
          <motion.h3
            variants={fadeUp}
            className="text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl"
          >
            Who it’s for
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-3 text-slate-700">
            Built for tight-knit families and the teams who care for them.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          {...motionGuard(shouldReduce, 0.35)}
          className="mt-10 grid gap-6 md:grid-cols-3"
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
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${it.tint}`}
                />
                <div className="relative z-10">
                  <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    {it.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-brand-ink">
                    {it.title}
                  </h4>
                  <ul className="mt-3 space-y-2 text-slate-700">
                    {it.bullets.map((b, k) => (
                      <li key={k} className="flex items-start gap-2">
                        <span
                          className={`mt-2 inline-block h-1.5 w-1.5 rounded-full ${it.dot}`}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
