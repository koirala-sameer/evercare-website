// src/pages/Services.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "../components/ui";

const plans = [
  {
    title: "Basic Care",
    price: "Starting at NPR 19,999/mo",
    features: [
      "Weekly wellness check-ins",
      "Errand coordination",
      "Care manager updates",
      "24/7 safety monitoring",
    ],
    gradient: "from-[#0E9384] to-[#0A7568]",
  },
  {
    title: "Enhanced Care",
    price: "Starting at NPR 29,999/mo",
    features: [
      "Daily caregiver support",
      "Family dashboard reports",
      "Medication reminders",
      "Emergency coordination",
    ],
    gradient: "from-[#f58a8c] to-[#f9b3b4]",
    highlight: true,
  },
  {
    title: "Premium Care",
    price: "Starting at NPR 49,999/mo",
    features: [
      "Dedicated care manager",
      "Advanced wellness analytics",
      "Telehealth coordination",
      "Monthly family reports",
    ],
    gradient: "from-[#112231] to-[#1a365d]",
  },
];

const services = [
  { title: "24/7 On-Call Nurse", desc: "Priority clinical support and triage when needed." },
  { title: "Telemedicine", desc: "Doctor consults and follow-ups from home." },
  { title: "Physiotherapy", desc: "Tailored mobility and recovery sessions." },
  { title: "Dementia Care", desc: "Specialized routines and caregiver training." },
  { title: "Medication Delivery", desc: "Refills and reminders handled end-to-end." },
  { title: "Driver & Logistics", desc: "Appointments, events, and errands on demand." },
];

export default function Services() {
  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[420px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/banner-caregiver.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/75 to-white/90 backdrop-blur-sm" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-brand-ink"
          >
            Personalized Care Plans for Every Family
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-4 text-lg text-slate-700"
          >
            Flexible memberships and one-time services — compassionate, transparent, and trusted.
          </motion.p>
          <div className="mt-6">
            <Link to="#plans">
              <Button className="bg-gradient-to-br from-[#0E9384] to-[#0A7568] text-white px-8 py-4 font-semibold">
                View Care Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="relative py-20 bg-gradient-to-b from-white via-brand-cloud/40 to-brand-cloud/60">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/oldman-hands.jpg')" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-brand-ink mb-12">
            Monthly Membership Plans
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className={`relative rounded-2xl shadow-2xl p-8 bg-white/70 backdrop-blur-md hover:scale-[1.03] transition-transform duration-300 ${
                  plan.highlight ? "border-2 border-[#f58a8c]" : "border border-slate-200"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-10 rounded-2xl`}
                />
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-bold text-brand-ink">{plan.title}</h3>
                  <p className="text-lg font-semibold text-[#f58a8c] mt-2">{plan.price}</p>
                  <ul className="mt-6 space-y-3 text-slate-700 mb-6 text-left">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#0E9384]">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button className={`w-full bg-gradient-to-br ${plan.gradient} text-white`}>
                      Get Started
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* One-Time Services */}
      <section id="onetime" className="relative py-24 bg-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/banner-caregiver.jpg')" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-brand-ink mb-12">
            One-Time Care Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all p-6"
              >
                <h3 className="text-xl font-semibold text-brand-ink mb-2">{service.title}</h3>
                <p className="text-slate-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 bg-gradient-to-r from-[#0E9384]/10 to-[#0A7568]/10 text-center">
        <div className="relative z-10">
          <h3 className="text-3xl md:text-4xl font-semibold text-brand-ink">
            One Platform. Total Peace of Mind.
          </h3>
          <p className="mt-4 text-slate-700 max-w-2xl mx-auto">
            Join EverCare today and get full visibility into your parents' care — reliable, verified, and always on.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/services#plans">
              <Button className="bg-gradient-to-br from-[#0E9384] to-[#0A7568] text-white font-semibold">
                View Care Plans
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="border-2 border-brand-teal text-brand-teal font-semibold"
              >
                Talk to Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
