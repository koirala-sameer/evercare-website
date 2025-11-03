import React from "react";
import { motion, useReducedMotion } from "framer-motion";

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

const teamMembers = [
  {
    name: "Anjali Gurung",
    role: "Lead Care Manager",
    img: "/team/anjali.jpg",
    quote: "“We care for each parent like family — with patience and heart.”",
  },
  {
    name: "Suresh Adhikari",
    role: "Operations Head",
    img: "/team/suresh.jpg",
    quote: "“Every detail matters — safety, comfort, and dignity above all.”",
  },
  {
    name: "Priya Shrestha",
    role: "Wellness Coordinator",
    img: "/team/priya.jpg",
    quote: "“Our updates aren’t just data — they’re daily reassurance for families abroad.”",
  },
];

export default function MeetTheTeam() {
  const shouldReduce = useReducedMotion() ?? false;

  return (
    <section className="bg-white py-24">
      <motion.div
        className="mx-auto max-w-7xl px-6 text-center"
        variants={staggerParent}
        {...motionGuard(shouldReduce, 0.4)}
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-5xl font-semibold text-brand-ink"
        >
          Meet the EverCare Team
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-2xl mx-auto text-lg text-slate-700 leading-relaxed"
        >
          Compassionate professionals, verified caregivers, and a support team
          committed to bringing peace of mind to every family.
        </motion.p>

        <motion.div
          variants={staggerParent}
          {...motionGuard(shouldReduce, 0.35)}
          className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-3"
        >
          {teamMembers.map((person, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all duration-300"
            >
              <img
                src={person.img}
                alt={person.name}
                className="mx-auto h-32 w-32 rounded-full object-cover shadow-sm"
              />
              <h3 className="mt-4 text-xl font-semibold text-brand-ink">
                {person.name}
              </h3>
              <p className="text-slate-600 text-sm">{person.role}</p>
              <p className="mt-3 text-slate-700 italic leading-relaxed">
                {person.quote}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
