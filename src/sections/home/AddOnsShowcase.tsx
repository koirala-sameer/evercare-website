import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Phone, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AddOnsShowcase() {
  const shouldReduce = useReducedMotion() ?? false;
  const addons = [
    { icon: <ShieldCheck className="h-6 w-6 text-brand-teal/90" />, title: "24/7 On-Call Nurse", desc: "Priority clinical support and triage when needed." },
    { icon: <Phone className="h-6 w-6 text-brand-teal/90" />, title: "Telemedicine", desc: "Doctor consults and follow-ups from home." },
    { icon: <Heart className="h-6 w-6 text-[#f58a8c]" />, title: "Physiotherapy", desc: "At-home sessions tailored to mobility goals." },
    { icon: <ShieldCheck className="h-6 w-6 text-brand-teal/90" />, title: "Dementia Care", desc: "Specialized routines and caregiver training." },
    { icon: <Phone className="h-6 w-6 text-brand-teal/90" />, title: "Medication Delivery", desc: "Refills and reminders handled end-to-end." },
    { icon: <Heart className="h-6 w-6 text-[#f58a8c]" />, title: "Driver & Logistics", desc: "Appointments, events, and errands on demand." },
  ];

  return (
    <section id="addons" className="bg-gradient-to-b from-[#f58a8c]/10 via-white to-white py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.h3 variants={fadeUp} className="text-3xl font-semibold text-brand-ink md:text-4xl">
          Popular Add-Ons
        </motion.h3>
        <p className="mt-4 text-slate-700">
          Extend your plan with specialist services anytime. No bundles, no lock-ins.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {addons.map((b, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-teal/10">
                    {b.icon}
                  </div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold text-brand-ink">{b.title}</h4>
                    <p className="mt-2 text-slate-700 text-sm">{b.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Link to="/services#plans">
            <Button className="rounded-2xl px-6 py-3 bg-gradient-to-r from-brand-teal to-[#6fd1d2] text-white">
              View Care Plans
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
