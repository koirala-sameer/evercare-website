import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeartHandshake, Home, Smile } from "lucide-react";

// ---------- Motion helpers ----------
const staggerParent = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ---------- Motion guard ----------
function motionGuard(shouldReduce: boolean, viewportAmount = 0.35) {
  return shouldReduce
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: viewportAmount },
      };
}

// ---------- Feel Like Family Section ----------
export default function FeelLikeFamily() {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <section className="bg-gradient-to-b from-white via-brand-cloud/30 to-brand-cloud/60 py-24">
      <motion.div
        variants={staggerParent}
        {...motionGuard(shouldReduce, 0.35)}
        className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 px-6 md:flex-row"
      >
        {/* Left text section */}
        <motion.div variants={fadeUp} className="flex-1">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-brand-ink md:text-4xl">
            Care that feels like family
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-700">
            Compassion isn’t an extra — it’s the core of everything we do.
            Every caregiver is trained not just in tasks, but in presence,
            patience, and genuine human connection.
          </p>

          <ul className="mt-6 space-y-3 text-slate-700">
            <li className="flex items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-brand-teal" />
              <span>Matched caregivers with empathy and consistency.</span>
            </li>
            <li className="flex items-center gap-2">
              <Home className="h-5 w-5 text-brand-teal" />
              <span>Every visit logged, photographed, and confirmed in real time.</span>
            </li>
            <li className="flex items-center gap-2">
              <Smile className="h-5 w-5 text-brand-teal" />
              <span>Families abroad stay connected through updates and smiles.</span>
            </li>
          </ul>
        </motion.div>

        {/* Right image/visual section */}
        <motion.div
          variants={fadeUp}
          className="flex-1 rounded-3xl bg-white shadow-md ring-1 ring-slate-200 overflow-hidden"
        >
          <img
            src="/banner-caregiver.jpg"
            alt="EverCare caregivers comforting seniors"
            className="h-[420px] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="p-6">
            <blockquote className="text-slate-700 italic">
              “They set up a clear routine—meals, meds, and a gentle walk every
              evening. My father smiles more now.”
            </blockquote>
            <p className="mt-4 text-sm text-slate-600 font-medium">
              — Prabina T., Daughter in Toronto
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
