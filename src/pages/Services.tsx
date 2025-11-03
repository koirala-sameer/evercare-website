import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { HeartPulse, Clock } from "lucide-react";

// ──────────────────────────────
// Motion Variants
// ──────────────────────────────
const staggerParent = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.01, 0.25, 1] },
  },
};

// ──────────────────────────────
// Main Component
// ──────────────────────────────
export default function Services() {
  const shouldReduce = useReducedMotion() ?? false;

  const options = [
    {
      id: 1,
      icon: <HeartPulse className="h-10 w-10 text-brand-teal" />,
      title: "Monthly Membership Plans",
      description:
        "Comprehensive monthly packages designed for consistent care, transparent updates, and complete peace of mind. Includes wellness tracking, caregiver visits, and family reporting.",
      link: "/plans",
      button: "View Plans",
      gradient: "from-brand-teal/10 to-[#6fd1d2]/20",
    },
    {
      id: 2,
      icon: <Clock className="h-10 w-10 text-[#f58a8c]" />,
      title: "One-Time Services",
      description:
        "Book individual services on-demand — doctor consultations, lab tests, physiotherapy, or errands. Perfect for families wanting flexibility without a full plan.",
      link: "/onetime",
      button: "Explore Services",
      gradient: "from-[#f58a8c]/10 to-[#f9b3b4]/20",
    },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white via-brand-cloud/30 to-white py-28">
      <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-[0.03]" />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl px-6 text-center"
      >
        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl font-semibold tracking-tight text-brand-ink md:text-5xl"
        >
          Choose how you want to begin with EverCare
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-700"
        >
          Whether you prefer a monthly membership for ongoing support or a
          single service for immediate needs — we’re here for your family.
        </motion.p>

        {/* Options */}
        <motion.div
          variants={staggerParent}
          className="mt-16 grid gap-8 md:grid-cols-2"
        >
          {options.map((opt) => (
            <motion.div
              key={opt.id}
              variants={fadeUp}
              whileHover={shouldReduce ? undefined : { y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-lg ring-1 ring-slate-200"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${opt.gradient}`}
              />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 inline-grid h-20 w-20 place-items-center rounded-2xl bg-white shadow-md ring-1 ring-slate-200">
                  {opt.icon}
                </div>
                <h3 className="text-2xl font-semibold text-brand-ink">
                  {opt.title}
                </h3>
                <p className="mt-3 text-slate-700">{opt.description}</p>
                <div className="mt-6">
                  <Link to={opt.link}>
                    <Button
                      className={`rounded-2xl px-6 py-3 ${
                        opt.id === 1
                          ? "bg-brand-teal hover:bg-brand-teal/90"
                          : "bg-[#f58a8c] hover:bg-[#f58a8c]/90"
                      }`}
                    >
                      {opt.button}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
