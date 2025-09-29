import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Phone, UserRoundCheck, ShieldCheck } from 'lucide-react'
import { Card } from '../../components/ui'

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

export default function HowItWorksTimeline() {
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
