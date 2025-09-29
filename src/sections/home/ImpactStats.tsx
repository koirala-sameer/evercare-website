import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const staggerParent = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
function motionGuard(shouldReduce: boolean, viewportAmount = 0.35) {
  return shouldReduce ? {} : { initial: 'hidden' as const, whileInView: 'show' as const, viewport: { once: true, amount: viewportAmount } }
}

/** Local AnimatedNumber (scoped to this section) */
function AnimatedNumber({
  to,
  from = 0,
  duration = 1.6,
  className,
  prefix = '',
  suffix = '',
  formatter = (v: number) => v.toLocaleString(),
}: {
  to: number; from?: number; duration?: number; className?: string; prefix?: string; suffix?: string; formatter?: (v: number) => string
}) {
  const [val, setVal] = useState(from)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement | null>(null)
  const shouldReduce = useReducedMotion() ?? false

  useEffect(() => {
    if (shouldReduce) { setVal(to); return }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true)
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / (duration * 1000), 1)
          const ease = 1 - Math.pow(1 - t, 3)
          setVal(from + (to - from) * ease)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [from, to, duration, hasAnimated, shouldReduce])

  return (
    <span ref={ref} className={className} aria-live="off">
      {prefix}{formatter(Math.round(val))}{suffix}
    </span>
  )
}

export default function ImpactStats() {
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
