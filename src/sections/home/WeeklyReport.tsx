import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui";

// ---------- Motion helpers ----------
const staggerParent = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Helper for reduced motion
function motionGuard(shouldReduce: boolean, viewportAmount = 0.35) {
  return shouldReduce
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: viewportAmount },
      };
}

// ---------- Weekly Report Section ----------
export default function WeeklyReport() {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <section className="bg-[#f7f3ef] py-24">
      <motion.div
        variants={staggerParent}
        {...motionGuard(shouldReduce, 0.3)}
        className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 md:flex-row"
      >
        {/* Left Content */}
        <motion.div variants={fadeUp} className="flex-1">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-brand-ink md:text-4xl">
            You may be far. Your love isn’t.
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-700">
            We know the daily worry. With EverCare, someone you trust is there —
            every week — and always a call away.
          </p>

          <ul className="mt-6 space-y-3 text-slate-700">
            {[
              "Photo of BP log every Friday",
              "Walk & nutrition notes from Home Specialist",
              "Escalation protocol for emergencies",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-brand-teal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="rounded-2xl bg-brand-teal px-6 py-3 hover:bg-brand-teal/90">
              Join the Waitlist
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl border-brand-teal px-6 py-3 text-brand-teal hover:bg-brand-teal/10"
            >
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </Button>
          </div>
        </motion.div>

        {/* Right Box */}
        <motion.div
          variants={fadeUp}
          className="flex-1 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
        >
          <h3 className="text-lg font-semibold text-brand-ink">
            Sample Weekly Report
          </h3>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6">
            <p className="text-slate-700">
              <strong>Vitals:</strong>{" "}
              <span className="text-green-600 font-medium">Stable</span>
            </p>
            <p className="mt-2 text-slate-700">
              BP: 126/78 · Glucose (fasting): 92 · Weight: 62kg
            </p>
            <p className="mt-3 text-slate-700">
              <strong>Notes:</strong> Started 20-min evening walks. Reduced salt.
            </p>
            <p className="mt-3 text-slate-700">
              Photo evidence attached (meds, meals, walk)
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
