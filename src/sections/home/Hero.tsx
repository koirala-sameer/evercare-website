import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, ShieldCheck, Heart, Phone, Clock } from 'lucide-react'
import { Button, GhostButton } from '../../components/ui'

const staggerParent = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
function motionGuard(shouldReduce: boolean, viewportAmount = 0.35) {
  return shouldReduce
    ? {}
    : { initial: 'hidden' as const, whileInView: 'show' as const, viewport: { once: true, amount: viewportAmount } }
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [0, -40])
  const overlayY = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [0, -16])

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-b from-white via-brand-cloud/40 to-white">
      <div className="pointer-events-none absolute inset-0 bg-[url('/banner-caregiver.jpg')] bg-cover bg-center opacity-10 md:opacity-20" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2 md:py-32">
        <motion.div variants={staggerParent} {...motionGuard(shouldReduce, 0.35)}>
          <motion.div variants={fadeUp}>
            <span className="inline-block rounded-full bg-[#f58a8c]/15 px-3 py-1 text-sm font-semibold text-[#f58a8c] ring-1 ring-[#f58a8c]/30">
              One Platform. Total Peace of Mind.
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-5 text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-brand-ink md:text-6xl lg:text-7xl"
          >
            Care for your parents{' '}
            <span className="bg-gradient-to-r from-brand-teal to-[#f58a8c] bg-clip-text text-transparent">
              as if you were here.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-lg leading-relaxed text-slate-700">
            EverCare integrates daily living support, safety, health, and concierge services into a single
            membership designed for Nepali families with loved ones back home.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <a href="#plans">
              <Button
                className="
                  relative inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-base font-semibold
                  bg-gradient-to-r from-brand-teal to-[#6fd1d2] text-white shadow-[0_10px_20px_rgba(97,191,192,0.35)]
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
              <GhostButton className="rounded-2xl ring-1 ring-slate-200 hover:bg-brand-teal/10 hover:text-brand-teal">
                See plan
              </GhostButton>
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-6 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-teal/90" /> 24/7 security
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-5 w-5 text-brand-teal/90" /> Real-time updates
            </span>
            <span className="hidden items-center gap-2 md:inline-flex">
              <Clock className="h-5 w-5 text-brand-teal/90" /> Same-day requests
            </span>
          </motion.div>
        </motion.div>

        <div className="relative">
          <motion.div
            style={{ y: imgY }}
            initial={shouldReduce ? undefined : { opacity: 0, scale: 0.96 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={shouldReduce ? undefined : { once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="glass relative rounded-3xl p-6 ring-1 ring-white/50 backdrop-blur will-change-transform"
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
