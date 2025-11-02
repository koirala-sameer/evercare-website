import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { motionGuard, staggerParent } from '../../utils/motion'

export default function NarrativeLine() {
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
