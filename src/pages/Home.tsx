import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, useEffect, useState, lazy, Suspense } from 'react'
import {
  ArrowRight,
  ShieldCheck,
  Heart,
  Phone,
  Clock,
  UserRoundCheck,
  ChevronLeft,
  ChevronRight,
  Users,
  Home as HomeIcon,
  Stethoscope,
  Lock,
  AlertTriangle,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import { Button, Card, GhostButton } from '../components/ui'
import { Link } from 'react-router-dom'

// Lazily-loaded sections (already extracted)
const Testimonials = lazy(() => import('../sections/home/Testimonials'))
const Plans = lazy(() => import('../sections/home/Plans'))
const AddOnsShowcase = lazy(() => import('../sections/home/AddOnsShowcase'))

// NEW: Hero moved to a dedicated file (regular import to keep it eagerly rendered)
import Hero from '../sections/home/Hero'

export default function Home() {
  // Detect reduced motion for anchor scrolling behavior
  const [reduceMotion, setReduceMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(!!mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  // Smooth-scroll for same-page anchor links with small offset for the sticky header
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest('a') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (!href.startsWith('#') || href === '#') return
      const el = document.querySelector(href) as HTMLElement | null
      if (!el) return
      e.preventDefault()
      const headerOffset = 80 // adjust if your navbar height changes
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' })
      // move focus for accessibility
      el.setAttribute('tabindex', '-1')
      el.focus({ preventScroll: true })
      // cleanup tabindex after focus (optional)
      const t = setTimeout(() => el.removeAttribute('tabindex'), 1000)
      return () => clearTimeout(t)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [reduceMotion])

  return (
    <div className="min-h-screen w-full">
      {/* Accessible skip link (appears when focused) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow focus:ring-2 focus:ring-brand-teal"
      >
        Skip to main content
      </a>

      <Navbar />

      {/* Main landmark for screen readers / keyboard users */}
      <main id="main-content">
        <Hero />
        <TrustBar />
        <NarrativeLine />
        <WhoItsFor />
        <StorySections />

        {/* Lazy modules below - keep layout/anchors identical */}
        <Suspense fallback={<SectionSkeleton />}>
          <Testimonials />
        </Suspense>

        <ImpactStats />
        <HowItWorksTimeline />

        <Suspense fallback={<SectionSkeleton id="plans" />}>
          <Plans />
        </Suspense>

        <Suspense fallback={<SectionSkeleton id="addons" />}>
          <AddOnsShowcase />
        </Suspense>

        <SecurityPrivacy />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}

/** ---------- Lightweight Suspense fallback ---------- */
function SectionSkeleton({ id }: { id?: string }) {
  return (
    <section id={id} className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
          <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
          <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
        </div>
      </div>
    </section>
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

// Helper to apply motion props conditionally when reduced motion is requested
function motionGuard(shouldReduce: boolean, viewportAmount = 0.35) {
  return shouldReduce
    ? { /* no motion props */ }
    : { initial: 'hidden' as const, whileInView: 'show' as const, viewport: { once: true, amount: viewportAmount } }
}

/** ---------- AnimatedNumber ---------- */
type AnimatedNumberProps = {
  to: number
  from?: number
  duration?: number
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
  const shouldReduce = useReducedMotion() ?? false

  useEffect(() => {
    if (shouldReduce) {
      setVal(to)
      return
    }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min((now - start) / (duration * 1000), 1)
            const ease = 1 - Math.pow(1 - t, 3)
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
  }, [from, to, duration, hasAnimated, shouldReduce])

  return (
    <span ref={ref} className={className} aria-live="off">
      {prefix}
      {formatter(Math.round(val))}
      {suffix}
    </span>
  )
}

/** ==================  Sections kept inline (unchanged visuals) ================== */
function TrustBar() {
  const shouldReduce = useReducedMotion() ?? false
  return (
    <section className="border-y border-slate-200 bg-white/60">
      <motion.div
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 py-6 text-slate-600"
        variants={staggerParent}
        {...motionGuard(shouldReduce, 0.4)}
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

/* Slim narrative line (kept) */
function NarrativeLine() {
  const shouldReduce = useReducedMotion() ?? false
  return (
    <section className="bg-white">
      <div className="mx-auto -mt-6 max-w-5xl px-6 pb-10">
        <motion.p variants={staggerParent} {...motionGuard(shouldReduce, 0.5)} className="text-center text-slate-700">
          Real moments — from meals to medicine to meaningful time outside.
        </motion.p>
      </div>
    </section>
  )
}

/* =========================================
   WHO IT'S FOR — audience row
========================================= */
function WhoItsFor() {
  const shouldReduce = useReducedMotion() ?? false
  const items = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Diaspora children',
      bullets: ['See updates in real time', 'Request help same day', 'Pay digitally & share access'],
      tint: 'from-brand-teal/15 to-[#6fd1d2]/15',
      dot: 'bg-brand-teal',
    },
    {
      icon: <HomeIcon className="h-6 w-6" />,
      title: 'Local parents',
      bullets: ['Trusted caregivers', 'Predictable routines', 'Respectful, friendly support'],
      tint: 'from-[#f58a8c]/15 to-[#f9b3b4]/15',
      dot: 'bg-[#f58a8c]',
    },
    {
      icon: <Stethoscope className="h-6 w-6" />,
      title: 'Care managers',
      bullets: ['Clear SOPs & logs', 'Escalation playbooks', 'Family communication handled'],
      tint: 'from-brand-cloud/60 to-white',
      dot: 'bg-slate-400',
    },
  ]

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <motion.div className="mx-auto max-w-2xl text-center" variants={staggerParent} {...motionGuard(shouldReduce, 0.35)}>
          <motion.h3 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            Who it’s for
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-3 text-slate-700">
            Built for tight-knit families and the teams who care for them.
          </motion.p>
        </motion.div>

        <motion.div variants={staggerParent} {...motionGuard(shouldReduce, 0.35)} className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={shouldReduce ? undefined : { y: -3 }} transition={{ duration: 0.2 }}>
              <Card className="relative overflow-hidden p-6">
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${it.tint}`} />
                <div className="relative z-10">
                  <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    {it.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-brand-ink">{it.title}</h4>
                  <ul className="mt-3 space-y-2 text-slate-700">
                    {it.bullets.map((b, k) => (
                      <li key={k} className="flex items-start gap-2">
                        <span className={`mt-2 inline-block h-1.5 w-1.5 rounded-full ${it.dot}`} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function StorySections() {
  const shouldReduce = useReducedMotion() ?? false
  const items = [
    { title: 'Daily living, handled', text: 'Maid services, meal prep, medication reminders, and tidy homes — done reliably.', img: '/banner-caregiver.jpg' },
    { title: 'Always safe, always seen', text: '24/7 security surveillance and wellness checks give you peace of mind anywhere in the world.', img: '/banner-caregiver.jpg' },
    { title: 'Healthcare that comes home', text: 'Telemedicine, lab tests at home, and specialist coordination when needed.', img: '/banner-caregiver.jpg' },
  ]
  return (
    <section id="services" className="bg-gradient-to-b from-white via-brand-cloud/40 to-brand-cloud/60">
      <div className="mx-auto max-w-7xl space-y-20 px-6 py-24">
        {items.map((it, idx) => (
          <motion.div
            key={idx}
            variants={staggerParent}
            {...motionGuard(shouldReduce, 0.35)}
            className={`grid items-center gap-10 md:grid-cols-2 ${idx % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
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
              <motion.h3 variants={fadeUp} className="text-3xl font-semibold leading-tight tracking-tight text-brand-ink md:text-4xl">
                {it.title}
              </motion.h3>
              <motion.p variants={fadeUp} className="mt-4 text-lg leading-relaxed text-slate-700">
                {it.text}
              </motion.p>
              <motion.ul variants={staggerParent} className="mt-6 grid grid-cols-1 gap-3 text-slate-700 md:grid-cols-2">
                {['Reliable scheduling', 'Care manager updates', 'Digital payments & receipts', 'Family group access'].map((li, i) => (
                  <motion.li key={i} variants={fadeUp} className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md hover:bg-[#f58a8c]/5">
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

/* ================== Sections still inline ================== */
function ImpactStats() {
  const shouldReduce = useReducedMotion() ?? false
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <motion.div className="mx-auto max-w-2xl text-center" variants={staggerParent} {...motionGuard(shouldReduce, 0.35)}>
          <motion.h3 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            We’re already making a difference
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-4 text-slate-700">
            Quietly reliable, always present — and built for families abroad.
          </motion.p>
        </motion.div>

        <motion.div variants={staggerParent} {...motionGuard(shouldReduce, 0.35)} className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
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

function HowItWorksTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 80%', 'end 20%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], shouldReduce ? [1, 1] : [0, 1])

  const steps = [
    { icon: <Phone className="h-5 w-5" />, title: 'Tell us what’s needed', desc: 'Share your parent’s routines, priorities, and any medical context.' },
    { icon: <UserRoundCheck className="h-5 w-5" />, title: 'We match & set up', desc: 'Care manager, verified caregiver(s), and a clear weekly plan.' },
    { icon: <ShieldCheck className="h-5 w-5" />, title: 'You see everything', desc: 'Visits, spends, updates—always visible in your family dashboard.' },
  ]

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <motion.div className="text-center" variants={staggerParent} {...motionGuard(shouldReduce, 0.35)}>
          <motion.h3 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">How it works</motion.h3>
          <motion.p variants={fadeUp} className="mt-3 text-slate-700">Smooth onboarding in days, not weeks.</motion.p>
        </motion.div>

        <div ref={timelineRef} className="relative mx-auto mt-10 grid max-w-3xl grid-cols-[24px_1fr] gap-x-4">
          <div className="relative">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[2px] bg-slate-200" />
            <motion.div style={{ scaleY, transformOrigin: 'top' }} className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-brand-teal to-[#f58a8c]" />
          </div>

          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.div key={i} variants={fadeUp} {...motionGuard(shouldReduce, 0.5)} className="relative">
                <div className="grid grid-cols-[24px_1fr] gap-x-4">
                  <div className="relative z-10 flex items-start justify-center">
                    <div className="grid h-6 w-6 place-items-center rounded-full border border-brand-teal bg-white text-brand-teal shadow-sm">{s.icon}</div>
                  </div>
                  <Card className="p-5">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal text-xs font-semibold">{i + 1}</span>
                      <h4 className="text-base font-semibold text-brand-ink">{s.title}</h4>
                    </div>
                    <p className="mt-2 text-slate-700">{s.desc}</p>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SecurityPrivacy() {
  const shouldReduce = useReducedMotion() ?? false
  const items = [
    { icon: <UserRoundCheck className="h-6 w-6 text-brand-teal" />, title: 'Vetted caregivers', desc: 'Background checks, references verified, and ongoing quality audits.', bg: 'from-brand-teal/10 to-transparent' },
    { icon: <Lock className="h-6 w-6 text-brand-ink" />, title: 'Secure by default', desc: 'Encrypted data at rest & in transit. Role-based access for families.', bg: 'from-slate-300/20 to-transparent' },
    { icon: <AlertTriangle className="h-6 w-6 text-[#f58a8c]" />, title: 'Emergency playbooks', desc: 'Clear SOPs for incidents: escalation, hospitals, and family alerts.', bg: 'from-[#f58a8c]/10 to-transparent' },
  ]
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-18 md:py-24">
        <motion.div className="mx-auto max-w-2xl text-center" variants={staggerParent} {...motionGuard(shouldReduce, 0.4)}>
          <motion.h3 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">Security & privacy</motion.h3>
          <motion.p variants={fadeUp} className="mt-3 text-slate-700">Built for trust from day one — safe operations, secure data, clear escalation.</motion.p>
        </motion.div>

        <motion.div className="mt-10 grid gap-6 md:grid-cols-3" variants={staggerParent} {...motionGuard(shouldReduce, 0.35)}>
          {items.map((it, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={shouldReduce ? undefined : { y: -3 }} transition={{ duration: 0.2 }}>
              <Card className="relative overflow-hidden p-6">
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${it.bg}`} />
                <div className="relative z-10">
                  <div className="mb-3 inline-grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">{it.icon}</div>
                  <h4 className="text-lg font-semibold text-brand-ink">{it.title}</h4>
                  <p className="mt-2 text-slate-700">{it.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FAQ() {
  const shouldReduce = useReducedMotion() ?? false
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
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={shouldReduce ? undefined : { once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center text-3xl font-bold tracking-tight text-brand-ink"
        >
          Frequently asked questions
        </motion.h3>

        <motion.div variants={staggerParent} {...motionGuard(shouldReduce, 0.25)} className="mt-10 space-y-4">
          {items.map((it, i) => (
            <motion.details key={i} variants={fadeUp} className="group rounded-2xl border border-slate-200 bg-white p-5 transition open:shadow-soft hover:-translate-y-0.5">
              <summary className="cursor-pointer list-none text-lg font-medium text-brand-ink">{it.q}</summary>
              <p className="mt-2 text-slate-700">{it.a}</p>
            </motion.details>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FinalCTA() {
  const shouldReduce = useReducedMotion() ?? false
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-cloud/60 via-white to-white" />
      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
        <motion.div variants={staggerParent} {...motionGuard(shouldReduce, 0.35)} className="space-y-6">
          <motion.h3 variants={fadeUp} className="text-3xl font-semibold leading-tight tracking-tight text-brand-ink md:text-4xl">
            One platform. Total peace of mind.
          </motion.h3>
          <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-slate-700">
            Start with the Standard membership today and add specialized services anytime — transparent,
            flexible, and built for families abroad.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-4 flex flex-wrap justify-center gap-3">
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
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="h-8 w-8" alt="" loading="lazy" decoding="async" />
          <span className="text-sm text-slate-600">© {new Date().getFullYear()} EverCare Nepal</span>
        </div>
        <div className="text-sm text-slate-600">Made with ❤️ for families everywhere</div>
      </div>
    </footer>
  )
}
