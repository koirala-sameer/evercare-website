import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

export default function Testimonials() {
  const shouldReduce = useReducedMotion() ?? false
  const items = [
    { quote: 'The weekly wellness calls and photo updates eased my anxiety instantly. It feels like I’m right there with my mom.', name: 'Aarav S.', role: 'Son in Sydney' },
    { quote: 'They set up a clear routine—meals, meds, and a gentle walk every evening. My father smiles more now.', name: 'Prabina T.', role: 'Daughter in Toronto' },
    { quote: 'Transparent, punctual, compassionate. The dashboard updates keep our whole family aligned.', name: 'Kiran & Maya', role: 'Family in the US' },
  ]
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || shouldReduce) return
    const t = setInterval(() => setIdx((p) => (p + 1) % items.length), 6000)
    return () => clearInterval(t)
  }, [paused, items.length, shouldReduce])

  const prev = () => setIdx((p) => (p - 1 + items.length) % items.length)
  const next = () => setIdx((p) => (p + 1) % items.length)
  const active = items[idx]

  return (
    <section className="bg-gradient-to-b from-white via-[#f58a8c]/5 to-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <motion.div className="text-center" variants={staggerParent} {...motionGuard(shouldReduce, 0.35)}>
          <motion.h3 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">What families say</motion.h3>
          <motion.p variants={fadeUp} className="mt-3 text-slate-700">Real words from the diaspora caring for parents in Nepal.</motion.p>
        </motion.div>

        <div className="mx-auto mt-10 max-w-3xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <motion.div
            key={idx}
            initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Card className="relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-teal/20 to-[#f58a8c]/20 blur-2xl" />
              <div className="flex items-start gap-4">
                <span className="mt-1 inline-grid h-8 w-8 place-items-center rounded-full bg-brand-teal/10 text-brand-teal">“</span>
                <p className="text-xl leading-relaxed text-brand-ink md:text-2xl">{active.quote}</p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f58a8c]/10 text-sm font-semibold text-[#f58a8c]">
                  {active.name.split(' ').map((s) => s[0]).join('').slice(0, 2)}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-brand-ink">{active.name}</div>
                  <div className="text-slate-600">{active.role}</div>
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="mt-6 flex items-center justify-between">
            <button aria-label="Previous testimonial" onClick={prev} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={`h-2.5 w-2.5 rounded-full transition ${i === idx ? 'bg-gradient-to-r from-brand-teal to-[#f58a8c]' : 'bg-slate-300'}`}
                />
              ))}
            </div>
            <button aria-label="Next testimonial" onClick={next} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
