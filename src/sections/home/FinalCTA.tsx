import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button, GhostButton } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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

export default function FinalCTA() {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-cloud/60 via-white to-white" />
      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
        <motion.div
          variants={staggerParent}
          {...motionGuard(shouldReduce, 0.35)}
          className="space-y-6"
        >
          <motion.h3
            variants={fadeUp}
            className="text-3xl font-semibold leading-tight tracking-tight text-brand-ink md:text-4xl"
          >
            One platform. Total peace of mind.
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-2xl text-slate-700"
          >
            Start with the Standard membership today and add specialized services anytime —
            transparent, flexible, and built for families abroad.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-4 flex flex-wrap justify-center gap-3"
          >
            <Link to="/enroll">
              <Button className="rounded-2xl px-6 py-3 bg-gradient-to-r from-brand-teal to-[#6fd1d2]">
                Get started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#plans">
              <GhostButton className="rounded-2xl px-6 py-3 ring-1 ring-slate-200 hover:bg-[#f58a8c]/10 hover:text-[#f58a8c]">
                See what’s included
              </GhostButton>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
