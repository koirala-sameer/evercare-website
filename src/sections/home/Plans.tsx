import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, HeartHandshake, Settings2 } from "lucide-react";

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

export default function Plans() {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <section className="bg-white py-24" id="plans">
      <motion.div
        className="mx-auto max-w-7xl px-6 text-center"
        variants={staggerParent}
        {...motionGuard(shouldReduce, 0.4)}
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl font-semibold text-brand-ink md:text-5xl"
        >
          Flexible Plans, Transparent Care
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-3 text-slate-700 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          Choose a membership plan for ongoing peace of mind—or book individual services as you go. 
          Every option includes verified caregivers, transparent reporting, and 24/7 family support.
        </motion.p>

        {/* Cards */}
        <motion.div
          variants={staggerParent}
          {...motionGuard(shouldReduce, 0.35)}
          className="mt-14 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto"
        >
          {/* Membership Plans */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition-all duration-300 p-8 text-left flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <HeartHandshake className="h-6 w-6 text-brand-teal" />
                <h3 className="text-2xl font-semibold text-brand-ink">
                  Membership Plans
                </h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Ideal for families seeking continuous care with routine visits,
                health monitoring, and family updates — all managed by a
                dedicated EverCare manager.
              </p>
              <ul className="mt-6 space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                  Regular caregiver visits and wellness reports
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                  Transparent billing and real-time updates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                  24/7 family support & emergency coordination
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <a
                href="/services#plans"
                className="inline-block rounded-lg bg-brand-teal text-white font-semibold px-6 py-3 hover:bg-brand-teal/90 transition-all duration-300"
              >
                Explore Plans
              </a>
            </div>
          </motion.div>

          {/* À-La-Carte Services */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition-all duration-300 p-8 text-left flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Settings2 className="h-6 w-6 text-brand-teal" />
                <h3 className="text-2xl font-semibold text-brand-ink">
                  À-La-Carte Services
                </h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Perfect for families who prefer flexibility — choose from home
                visits, medical appointments, errands, or custom one-time care
                support.
              </p>
              <ul className="mt-6 space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                  Book one-time or occasional services
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                  Verified professionals for each visit
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                  Transparent pricing and easy scheduling
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <a
                href="/services#alacarte"
                className="inline-block rounded-lg border-2 border-brand-teal text-brand-teal font-semibold px-6 py-3 hover:bg-brand-teal hover:text-white transition-all duration-300"
              >
                Browse Services
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
