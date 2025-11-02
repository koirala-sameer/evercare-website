import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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

export default function StorySections() {
  const shouldReduce = useReducedMotion() ?? false;
  const items = [
    {
      title: "Daily living, handled",
      text: "Maid services, meal prep, medication reminders, and tidy homes — done reliably.",
      img: "/banner-caregiver.jpg",
    },
    {
      title: "Always safe, always seen",
      text: "24/7 security surveillance and wellness checks give you peace of mind anywhere in the world.",
      img: "/banner-caregiver.jpg",
    },
    {
      title: "Healthcare that comes home",
      text: "Telemedicine, lab tests at home, and specialist coordination when needed.",
      img: "/banner-caregiver.jpg",
    },
  ];

  return (
    <section
      id="services"
      className="bg-gradient-to-b from-white via-brand-cloud/40 to-brand-cloud/60"
    >
      <div className="mx-auto max-w-7xl space-y-20 px-6 py-24">
        {items.map((it, idx) => (
          <motion.div
            key={idx}
            variants={staggerParent}
            {...motionGuard(shouldReduce, 0.35)}
            className={`grid items-center gap-10 md:grid-cols-2 ${
              idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <motion.img
              variants={fadeUp}
              src={it.img}
              alt=""
              className="h-[380px] w-full rounded-3xl object-cover shadow-soft"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            <div>
              <motion.h3
                variants={fadeUp}
                className="text-3xl font-semibold leading-tight tracking-tight text-brand-ink md:text-4xl"
              >
                {it.title}
              </motion.h3>
              <motion.p
                variants={fadeUp}
                className="mt-4 text-lg leading-relaxed text-slate-700"
              >
                {it.text}
              </motion.p>
              <motion.ul
                variants={staggerParent}
                className="mt-6 grid grid-cols-1 gap-3 text-slate-700 md:grid-cols-2"
              >
                {[
                  "Reliable scheduling",
                  "Care manager updates",
                  "Digital payments & receipts",
                  "Family group access",
                ].map((li, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md hover:bg-[#f58a8c]/5"
                  >
                    {li}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
