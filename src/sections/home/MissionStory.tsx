import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeartHandshake, Globe2, ShieldCheck } from "lucide-react";

const staggerParent = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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

export default function MissionStory() {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <section className="bg-gradient-to-b from-white via-brand-cloud/40 to-white py-24">
      <motion.div
        className="mx-auto max-w-6xl px-6 text-center"
        variants={staggerParent}
        {...motionGuard(shouldReduce, 0.4)}
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-5xl font-semibold text-brand-ink"
        >
          Built with Heart, Guided by Purpose
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-2xl mx-auto text-lg text-slate-700 leading-relaxed"
        >
          EverCare was founded by Nepali professionals living abroad who faced
          the same challenge many families do — ensuring parents at home
          receive the care, dignity, and companionship they deserve.  
          Our mission is simple: to bring **trust, transparency, and peace of
          mind** to every family we serve.
        </motion.p>

        <motion.div
          variants={staggerParent}
          {...motionGuard(shouldReduce, 0.35)}
          className="mt-12 grid gap-8 md:grid-cols-3"
        >
          {[
            {
              icon: <HeartHandshake className="h-8 w-8 text-brand-teal" />,
              title: "Compassion First",
              desc: "Every action starts with empathy — caring for your parents as if they were our own.",
            },
            {
              icon: <Globe2 className="h-8 w-8 text-brand-teal" />,
              title: "Connecting Families Worldwide",
              desc: "Bridging the distance between diaspora families and their loved ones in Nepal.",
            },
            {
              icon: <ShieldCheck className="h-8 w-8 text-brand-teal" />,
              title: "Transparency You Can Trust",
              desc: "Weekly updates, verified caregivers, and real-time visibility through the Care Wallet.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-xl bg-brand-teal/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-brand-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-slate-700">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
