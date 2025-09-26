import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArrowRight, ShieldCheck, Heart, Phone, Clock, UserRoundCheck } from 'lucide-react'
import Navbar from '../components/Navbar'
import { Button, Card, GhostButton } from '../components/ui'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <Hero />
      <TrustBar />
      <StorySections />
      <ImpactStats />
      <Plans />
      <AddOnsShowcase />
      <FAQ />
      <Footer />
    </div>
  )
}

/** ---------- Motion helpers ---------- */
const staggerParent = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

/** ---------- AnimatedNumber (self-contained, no extra deps) ---------- */
type AnimatedNumberProps = {
  to: number
  from?: number
  duration?: number // seconds
  prefix?: string
  suffix?: string
  className?: string
  formatter?: (v: number) => string
}

function AnimatedNumber({
  to,
  from = 0,
  duration = 1.6,
  prefix = '',
  suffix = '',
  className,
  formatter = (v) => v.toLocaleString(),
}: AnimatedNumberProps) {
  const [val, setVal] = useState(from)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min((now - start) / (duration * 1000), 1)
            const ease = 1 - Math.pow(1 - t, 3) // easeOutCubic
            const current = from + (to - from) * ease
            setVal(current)
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [from, to, duration, hasAnimated])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatter(Math.round(val))}
      {suffix}
    </span>
  )
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  // subtle parallax on the right visual + overlay (smoothed)
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, -16])

  return (
    <section ref={heroRef} className="hero-gradient relative overflow-hidden">
      {/* background image with valid tailwind opacity scale */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/banner-caregiver.jpg')] bg-cover bg-center opacity-10 md:opacity-20" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2 md:py-32">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.div variants={fadeUp}>
            {/* pill (instead of Badge) for compatibility */}
            <span className="inline-block rounded-full bg-[#f58a8c]/10 px-3 py-1 text-sm font-medium text-[#f58a8c]">
              One Platform. Total Peace of Mind.
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-5 text-[2.5rem] font-bold leading-[1.05] tracking-tight text-brand-ink md:text-6xl lg:text-7xl"
          >
            Care for your parents <span className="text-brand-teal">as if you were here.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-lg leading-relaxed text-slate-700"
          >
            EverCare integrates daily living support, safety, health, and concierge services into a single
            membership designed for Nepali families with loved ones back home.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            {/* Both CTAs scroll to the plan section */}
            <a href="#plans">
              <Button
                className="
                  relative inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-semibold
                  bg-brand-teal text-white shadow-[0_10px_20px_rgba(97,191,192,0.35)]
                  hover:shadow-[0_16px_32px_rgba(97,191,192,0.45)] hover:translate-y-[-1px]
                  active:translate-y-[0px] active:shadow-[0_8px_16px_rgba(97,191,192,0.35)]
                  transition-all duration-200 ease-out
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2
                  before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]
                  before:bg-gradient-to-b before:from-white/25 before:to-white/0
                "
              >
                Enroll now <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#plans">
              <GhostButton>See plan</GhostButton>
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-6 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-brand-teal/90" /> 24/7 security</span>
            <span className="inline-flex items-center gap-2"><Phone className="h-5 w-5 text-brand-teal/90" /> Real-time updates</span>
            <span className="hidden items-center gap-2 md:inline-flex"><Clock className="h-5 w-5 text-brand-teal/90" /> Same-day requests</span>
          </motion.div>
        </motion.div>

        <div className="relative">
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="glass relative rounded-3xl p-6 will-change-transform"
          >
            <img
              src="/banner-caregiver.jpg"
              className="h-[420px] w-full rounded-2xl object-cover"
              alt="Caregiver with senior in a flower garden"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <motion.div
              style={{ y: overlayY }}
              className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft"
            >
              <div className="flex items-center gap-3">
                {/* Heart in coral */}
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f58a8c]/10">
                  <Heart className="h-5 w-5 text-[#f58a8c]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-ink">Compassion first</p>
                  <p className="text-xs text-slate-600">Trusted local team, diaspora-grade transparency.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-white/60">
      <motion.div
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 py-6 text-slate-600"
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {[
          <>
            <img src="/logo.png" className="h-6 w-6" alt="" />
            <span>Radical transparency</span>
          </>,
          <>
            <UserRoundCheck className="h-5 w-5 text-brand-teal/90" />
            <span>Verified caregivers</span>
          </>,
          <>
            <ShieldCheck className="h-5 w-5 text-brand-teal/90" />
            <span>Safety-first operations</span>
          </>,
          <>
            <Clock className="h-5 w-5 text-brand-teal/90" />
            <span>Fast response</span>
          </>,
        ].map((content, i) => (
          <motion.div key={i} variants={fadeUp} className="flex items-center gap-2">
            {content}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function StorySections() {
  const items = [
    { title: 'Daily living, handled', text: 'Maid services, meal prep, medication reminders, and tidy homes — done reliably.', img: '/banner-caregiver.jpg' },
    { title: 'Always safe, always seen', text: '24/7 security surveillance and wellness checks give you peace of mind anywhere in the world.', img: '/banner-caregiver.jpg' },
    { title: 'Healthcare that comes home', text: 'Telemedicine, lab tests at home, and specialist coordination when needed.', img: '/banner-caregiver.jpg' },
  ]
  return (
    <section id="services" className="bg-gradient-to-b from-white to-brand-cloud/60">
      <div className="mx-auto max-w-7xl space-y-20 px-6 py-24">
        {items.map((it, idx) => (
          <motion.div
            key={idx}
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className={`grid items-center gap-10 md:grid-cols-2 ${idx % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
          >
            <motion.img
              variants={fadeUp}
              src={it.img}
              alt=""
              className="h-[380px] w-full rounded-3xl object-cover shadow-soft"
            />
            <div>
              <motion.h3 variants={fadeUp} className="text-3xl font-semibold leading-tight tracking-tight text-brand-ink md:text-4xl">
                {it.title}
              </motion.h3>
              <motion.p variants={fadeUp} className="mt-4 text-lg leading-relaxed text-slate-700">
                {it.text}
              </motion.p>
              <motion.ul variants={staggerParent} className="mt-6 grid grid-cols-1 gap-3 text-slate-700 md:grid-cols-2">
                {['Reliable scheduling','Care manager updates','Digital payments & receipts','Family group access'].map((li, i) => (
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
  )
}

/* =========================================
   IMPACT STATS — animated counters
   (Drop-in, no new deps, uses IntersectionObserver)
========================================= */
function ImpactStats() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.h3 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            We’re already making a difference
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-4 text-slate-700">
            Quietly reliable, always present — and built for families abroad.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          <motion.div variants={fadeUp} className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
            <AnimatedNumber to={2500} suffix="+" className="text-4xl font-bold text-brand-ink" />
            <p className="mt-2 text-sm text-slate-600">Hours of care delivered</p>
          </motion.div>
          <motion.div variants={fadeUp} className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
            <AnimatedNumber to={100} suffix="%" className="text-4xl font-bold text-brand-ink" />
            <p className="mt-2 text-sm text-slate-600">Verified caregivers</p>
          </motion.div>
          <motion.div variants={fadeUp} className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
            <AnimatedNumber to={2} suffix="+" className="text-4xl font-bold text-brand-ink" />
            <p className="mt-2 text-sm text-slate-600">Cities live (KTM, PKR)</p>
          </motion.div>
          <motion.div variants={fadeUp} className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
            <AnimatedNumber to={0} className="text-4xl font-bold text-brand-ink" />
            <p className="mt-2 text-sm text-slate-600">Missed check-ins</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/** SINGLE PLAN + ADD-ONS MODEL */
function Plans() {
  return (
    <section id="plans" className="relative">
      <div className="pointer-events-none absolute inset-0 hero-gradient opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h2 variants={fadeUp} className="text-4xl font-bold tracking-tight text-brand-ink md:text-5xl">
            One Standard Membership
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-lg leading-relaxed text-slate-700">
            Start with a single, all-round plan for daily living and safety. Add specialized services anytime.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid grid-cols-1 gap-8"
        >
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Card className="card-soft p-6 md:p-8">
              <h3 className="text-2xl font-semibold text-brand-ink">Standard Plan</h3>
              <p className="mt-3 text-slate-700">
                Everything you need for day-to-day support and peace of mind — streamlined, reliable, transparent.
              </p>
              <ul className="mt-6 grid gap-3 text-slate-700 md:grid-cols-2">
                <li>• Dedicated care manager</li>
                <li>• Weekly wellness check-ins</li>
                <li>• Errand coordination & bookings</li>
                <li>• Family updates & dashboards</li>
                <li>• 24/7 safety monitoring & emergency coordination</li>
                <li>• On-demand driver access</li>
              </ul>
              <div className="mt-8 flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Starting from</div>
                  <div className="text-3xl font-bold text-brand-ink">
                    NPR 24,999<span className="text-base font-medium text-slate-600">/mo</span>
                  </div>
                </div>
                <a href="#addons">
                  <Button
                    className="
                      relative rounded-2xl px-6 py-3 text-base font-semibold
                      bg-brand-teal text-white shadow-[0_10px_20px_rgba(97,191,192,0.35)]
                      hover:shadow-[0_16px_32px_rgba(97,191,192,0.45)] hover:translate-y-[-1px]
                      active:translate-y-[0px] active:shadow-[0_8px_16px_rgba(97,191,192,0.35)]
                      transition-all duration-200 ease-out
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2
                      before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]
                      before:bg-gradient-to-b before:from-white/25 before:to-white/0
                    "
                  >
                    Proceed to Add-Ons
                  </Button>
                </a>
              </div>
              <p className="mt-3 text-xs text-slate-500">*Pricing is placeholder; finalize in admin.</p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/** Popular Add-Ons grid (non-interactive showcase) */
function AddOnsShowcase() {
  return (
    <section id="addons" className="bg-[#f58a8c]/5">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.h3 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            Popular Add-Ons
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-4 text-slate-700">
            Extend your plan with specialist services anytime. No bundles, no lock-ins.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-8 md:grid-cols-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { icon: <ShieldCheck className="h-6 w-6 text-brand-teal/90" />, title: '24/7 On-Call Nurse', desc: 'Priority clinical support and triage when needed.' },
            { icon: <Phone className="h-6 w-6 text-brand-teal/90" />, title: 'Telemedicine', desc: 'Doctor consults and follow-ups from home.' },
            { icon: <Heart className="h-6 w-6 text-[#f58a8c]" />, title: 'Physiotherapy', desc: 'At-home sessions tailored to mobility goals.' },
            { icon: <ShieldCheck className="h-6 w-6 text-brand-teal/90" />, title: 'Dementia Care', desc: 'Specialized routines and caregiver training.' },
            { icon: <Phone className="h-6 w-6 text-brand-teal/90" />, title: 'Medication Delivery', desc: 'Refills and reminders handled end-to-end.' },
            { icon: <Heart className="h-6 w-6 text-[#f58a8c]" />, title: 'Driver & Logistics', desc: 'Appointments, events, and errands on demand.' },
          ].map((b, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-teal/10">{b.icon}</div>
                  <div>
                    <h4 className="text-xl font-semibold text-brand-ink">{b.title}</h4>
                    <p className="mt-2 text-slate-700">{b.desc}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link to="/enroll">
            <Button className="rounded-2xl px-6 py-3">Customize & Enroll</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const items = [
    { q: 'Where do you operate first?', a: 'Launching in Kathmandu & Pokhara, expanding nationwide.' },
    { q: 'Can I change add-ons anytime?', a: 'Yes, add or remove services monthly from your dashboard.' },
    { q: 'How do driver services work?', a: 'On-demand with transparent per-trip billing or monthly packages.' },
    { q: 'Do you support medical emergencies?', a: 'We coordinate ambulances, hospitals, and family notifications.' },
  ]
  return (
    <section id="faq" className="bg-brand-cloud/60">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center text-3xl font-bold tracking-tight text-brand-ink"
        >
          Frequently asked questions
        </motion.h3>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-10 space-y-4"
        >
          {items.map((it, i) => (
            <motion.details
              key={i}
              variants={fadeUp}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition
                         open:shadow-soft hover:-translate-y-0.5"
            >
              <summary className="cursor-pointer list-none text-lg font-medium text-brand-ink">
                {it.q}
              </summary>
              <p className="mt-2 text-slate-700">{it.a}</p>
            </motion.details>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="h-8 w-8" alt="" />
          <span className="text-sm text-slate-600">© {new Date().getFullYear()} EverCare Nepal</span>
        </div>
        <div className="text-sm text-slate-600">Made with ❤️ for families everywhere</div>
      </div>
    </footer>
  )
}
