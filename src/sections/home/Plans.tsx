import { motion, useReducedMotion } from 'framer-motion'
import { Button, Card } from '../../components/ui'

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

export default function Plans() {
  const shouldReduce = useReducedMotion() ?? false
  return (
    <section id="plans" className="relative">
      <div className="pointer-events-none absolute inset-0 hero-gradient opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <motion.div className="mx-auto max-w-2xl text-center" variants={staggerParent} {...motionGuard(shouldReduce, 0.4)}>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold tracking-tight text-brand-ink md:text-5xl">
            One Standard Membership
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-lg leading-relaxed text-slate-700">
            Start with a single, all-round plan for daily living and safety. Add specialized services anytime.
          </motion.p>
        </motion.div>

        <motion.div variants={fadeUp} {...motionGuard(shouldReduce, 0.3)} className="mt-10 grid grid-cols-1 gap-8">
          <motion.div whileHover={shouldReduce ? undefined : { y: -2 }} transition={{ duration: 0.2 }}>
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
                  <Button className="relative rounded-2xl px-6 py-3 text-base font-semibold bg-gradient-to-r from-brand-teal to-[#6fd1d2] text-white shadow-[0_10px_20px_rgba(97,191,192,0.35)] hover:shadow-[0_16px_32px_rgba(97,191,192,0.45)] hover:translate-y-[-1px] active:translate-y-[0px] active:shadow-[0_8px_16px_rgba(97,191,192,0.35)] transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2">
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
