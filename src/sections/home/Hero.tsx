import { motion, useReducedMotion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'
import {
  ArrowRight,
  ShieldCheck,
  Phone,
  Clock,
  HeartPulse,
  Activity,
  Droplet,
  Gauge,
  Thermometer,
  Weight,
  CheckCircle2,
} from 'lucide-react'
import { Button, GhostButton, Card } from '../../components/ui'

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
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, amount: viewportAmount },
      }
}

export default function Hero() {
  const shouldReduce = useReducedMotion() ?? false
  const pulseControls = useAnimationControls()
  const countControls = useAnimationControls()

  useEffect(() => {
    const loopPulse = async () => {
      while (true) {
        await pulseControls.start({ scale: 1.2, opacity: 1, transition: { duration: 0.4 } })
        await pulseControls.start({ scale: 1, opacity: 0.85, transition: { duration: 0.6 } })
      }
    }
    const loopCounts = async () => {
      await countControls.start({
        opacity: [0.4, 1],
        y: [2, 0],
        transition: { repeat: Infinity, duration: 1.8 },
      })
    }
    loopPulse()
    loopCounts()
  }, [pulseControls, countControls])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-cloud/40 to-white">
      <div className="pointer-events-none absolute inset-0 bg-[url('/banner-caregiver.jpg')] bg-cover bg-center opacity-10 md:opacity-20" />

      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 grid md:grid-cols-2 items-center gap-12">
        {/* Left Side */}
        <motion.div
          variants={staggerParent}
          {...motionGuard(shouldReduce, 0.35)}
          className="max-w-xl justify-self-start"
        >
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

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg text-lg leading-relaxed text-slate-700"
          >
            EverCare provides real-time updates on your loved ones’ vital health metrics —
            blood pressure, glucose, oxygen levels, and more — with weekly summaries you can
            trust.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <a href="#plans">
              <Button className="relative inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold bg-gradient-to-r from-brand-teal to-[#6fd1d2] text-white shadow-[0_8px_16px_rgba(97,191,192,0.3)] hover:shadow-[0_12px_24px_rgba(97,191,192,0.4)] hover:-translate-y-[1px] active:translate-y-[0px] transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2">
                Enroll now <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#plans">
              <GhostButton className="rounded-xl ring-1 ring-slate-200 hover:bg-brand-teal/10 hover:text-brand-teal">
                See plan
              </GhostButton>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brand-teal/90" /> 24/7 monitoring
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-5 w-5 text-brand-teal/90" /> Real-time alerts
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-teal/90" /> Weekly summaries
            </span>
          </motion.div>
        </motion.div>

        {/* Right Side: Live Animated Health Dashboard */}
        <motion.div variants={fadeUp} className="w-full max-w-md justify-self-end hidden md:block">
          <Card className="rounded-3xl border border-slate-200 bg-white/90 shadow-2xl backdrop-blur-sm p-6 relative overflow-hidden">
            {/* Subtle floating background icon */}
            <motion.div
              animate={{ y: [0, -8, 0], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute right-10 top-10 text-[#0E9384]/15"
            >
              <Gauge className="h-16 w-16" />
            </motion.div>

            <h3 className="text-lg font-semibold text-brand-ink mb-4 flex items-center gap-2">
              Weekly Health Report <CheckCircle2 className="h-4 w-4 text-[#0E9384]" />
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col items-center border-r border-slate-100 pr-2">
                <motion.div animate={pulseControls}>
                  <Gauge className="h-6 w-6 text-[#0E9384]" />
                </motion.div>
                <p className="text-sm font-medium mt-1 text-slate-700">Blood Pressure</p>
                <motion.p animate={countControls} className="text-base font-semibold text-brand-ink">
                  118 / 78 mmHg
                </motion.p>
              </div>
              <div className="flex flex-col items-center">
                <Droplet className="h-6 w-6 text-[#f58a8c]" />
                <p className="text-sm font-medium mt-1 text-slate-700">Glucose</p>
                <motion.p animate={countControls} className="text-base font-semibold text-brand-ink">
                  96 mg/dL
                </motion.p>
              </div>
              <div className="flex flex-col items-center border-r border-slate-100 pr-2">
                <Activity className="h-6 w-6 text-[#0E9384]" />
                <p className="text-sm font-medium mt-1 text-slate-700">Oxygen (SpO₂)</p>
                <motion.p animate={countControls} className="text-base font-semibold text-brand-ink">
                  98%
                </motion.p>
              </div>
              <div className="flex flex-col items-center">
                <Weight className="h-6 w-6 text-orange-500" />
                <p className="text-sm font-medium mt-1 text-slate-700">Weight</p>
                <motion.p animate={countControls} className="text-base font-semibold text-brand-ink">
                  68.5 kg
                </motion.p>
              </div>
            </div>

            {/* Progress animation */}
            <div className="mt-2 mb-5 space-y-3 text-sm text-slate-600">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '92%' }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                className="bg-gradient-to-r from-[#0E9384] to-[#6fd1d2] h-1 rounded-full"
              />
              <p className="text-xs text-slate-500 text-right pr-1">Vitals stable: 92%</p>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Doctor Visits</span>
                <motion.span animate={countControls} className="font-medium text-brand-ink">
                  2 this week
                </motion.span>
              </div>
              <div className="flex justify-between">
                <span>Medication Adherence</span>
                <motion.span animate={countControls} className="font-medium text-brand-ink">
                  98%
                </motion.span>
              </div>
              <div className="flex justify-between">
                <span>Caregiver Sessions</span>
                <motion.span animate={countControls} className="font-medium text-brand-ink">
                  4 completed
                </motion.span>
              </div>
            </div>

            <div className="mt-6 border-t pt-4 text-xs text-slate-500">
              Last synced: Sunday, 8:00 PM
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
