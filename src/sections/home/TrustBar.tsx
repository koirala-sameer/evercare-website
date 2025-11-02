import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Users, ShieldCheck } from 'lucide-react'
import { fadeUp, motionGuard, staggerParent } from '../../utils/motion'

export default function TrustBar() {
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
            <Users className="h-5 w-5 text-brand-teal/90" />
            <span>Verified caregivers</span>
          </>,
          <>
            <ShieldCheck className="h-5 w-5 text-brand-teal/90" />
            <span>Safety-first operations</span>
          </>,
          <>
            <ShieldCheck className="invisible h-5 w-5" />
            <span className="sr-only">spacer</span>
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
