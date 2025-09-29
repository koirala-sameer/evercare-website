import { motion, useReducedMotion } from 'framer-motion'
import { ShieldCheck, Phone, Heart } from 'lucide-react'
import { Button, Card } from '../../components/ui'
import { Link } from 'react-router-dom'

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

export default function AddOnsShowcase() {
  const shouldReduce = useReducedMotion() ?? false
  return (
    <section id="addons" className="bg-gradient-to-b from-[#f58a8c]/10 via-white to-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <motion.div className="mx-auto max-w-2xl text-center" variants={staggerParent} {...motionGuard(shouldReduce, 0.35)}>
          <motion.h3 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            Popular Add-Ons
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-4 text-slate-700">
            Extend your plan with specialist services anytime. No bundles, no lock-ins.
          </motion.p>
        </motion.div>

        <motion.div className="mt-10 grid gap-8 md:grid-cols-3" variants={staggerParent} {...motionGuard(shouldReduce, 0.3)}>
          {[
            { icon: <ShieldCheck className="h-6 w-6 text-brand-teal/90" />, title: '24/7 On-Call Nurse', desc: 'Priority clinical support and triage when needed.' },
            { icon: <Phone className="h-6 w-6 text-brand-teal/90" />, title: 'Telemedicine', desc: 'Doctor consults and follow-ups from home.' },
            { icon: <Heart className="h-6 w-6 text-[#f58a8c]" />, title: 'Physiotherapy', desc: 'At-home sessions tailored to mobility goals.' },
            { icon: <ShieldCheck className="h-6 w-6 text-brand-teal/90" />, title: 'Dementia Care', desc: 'Specialized routines and caregiver training.' },
            { icon: <Phone className="h-6 w-6 text-brand-teal/90" />, title: 'Medication Delivery', desc: 'Refills and reminders handled end-to-end.' },
            { icon: <Heart className="h-6 w-6 text-[#f58a8c]" />, title: 'Driver & Logistics', desc: 'Appointments, events, and errands on demand.' },
          ].map((b, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={shouldReduce ? undefined : { y: -3 }} transition={{ duration: 0.2 }}>
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
            <Button className="rounded-2xl px-6 py-3 bg-gradient-to-r from-brand-teal to-[#6fd1d2]">
              Customize & Enroll
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
