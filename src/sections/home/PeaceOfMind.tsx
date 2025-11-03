// src/sections/home/PeaceOfMind.tsx
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const staggerParent = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
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

export default function PeaceOfMind() {
  const shouldReduce = useReducedMotion() ?? false;

  const tiles = [
    {
      title: "What we cover",
      items: [
        "Daily living support (meals, meds, errands)",
        "Care manager coordination & routine planning",
        "Safety checks, driver & logistics on demand",
      ],
      bg: "from-brand-teal/10 to-[#6fd1d2]/10",
    },
    {
      title: "How we report",
      items: [
        "Family dashboard with visit logs & spends",
        "Weekly WhatsApp summary to your group",
        "Escalations handled with clear SOPs",
      ],
      bg: "from-[#f58a8c]/10 to-[#f9b3b4]/10",
    },
    {
      title: "Vitals we track",
      items: [
        "Blood pressure, glucose & SpO₂",
        "Weight & mood notes",
        "Activity prompts and fall risk cues",
      ],
      bg: "from-brand-cloud/60 to-white",
    },
  ];

  return (
    <section className="bg-white">
      <motion.div
        className="mx-auto max-w-7xl px-6 py-16"
        variants={staggerParent}
        {...motionGuard(shouldReduce, 0.35)}
      >
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-brand-ink">
            Peace of Mind
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-700">
            Clear coverage. Simple reporting. Meaningful vitals — visible anytime, anywhere.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tiles.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={shouldReduce ? undefined : { y: -4 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${t.bg}`} />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-brand-ink">{t.title}</h3>
                <ul className="mt-4 space-y-2 text-slate-700">
                  {t.items.map((line, k) => (
                    <li key={k} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand-teal" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                {/* Optional CTA for deeper exploration */}
                <div className="mt-6">
                  {t.title === "What we cover" && (
                    <Link to="/services#plans">
                      <button className="rounded-2xl border border-slate-300 px-4 py-2 text-brand-ink font-medium hover:border-[#f58a8c] hover:text-[#f58a8c] transition">
                        Explore Plans
                      </button>
                    </Link>
                  )}
                  {t.title === "How we report" && (
                    <Link to="/services#onetime">
                      <button className="rounded-2xl border border-slate-300 px-4 py-2 text-brand-ink font-medium hover:border-[#f58a8c] hover:text-[#f58a8c] transition">
                        See Reporting
                      </button>
                    </Link>
                  )}
                  {t.title === "Vitals we track" && (
                    <Link to="/services#plans">
                      <button className="rounded-2xl border border-slate-300 px-4 py-2 text-brand-ink font-medium hover:border-[#f58a8c] hover:text-[#f58a8c] transition">
                        View Vitals
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
