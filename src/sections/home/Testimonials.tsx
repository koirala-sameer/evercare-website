import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
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
    { 
      quote: 'The weekly wellness calls and photo updates eased my anxiety instantly. It feels like I\'m right there with my mom.', 
      name: 'Anita S.', 
      role: 'Daughter in Sydney',
      story: 'Worried about mom living alone after dad passed away. EverCare provided daily companionship and medical monitoring.',
      outcome: 'Now sleeps peacefully knowing mom is safe and cared for',
      duration: '6 months with EverCare'
    },
    { 
      quote: 'They set up a clear routine—meals, meds, and a gentle walk every evening. My father smiles more now.', 
      name: 'Prabina T.', 
      role: 'Daughter in Toronto',
      story: 'Father with diabetes needed consistent care. Was missing medications and felt isolated.',
      outcome: 'Health stabilized and enjoys daily social interaction',
      duration: '4 months with EverCare'
    },
    { 
      quote: 'Transparent, punctual, compassionate. The dashboard updates keep our whole family aligned.', 
      name: 'Kiran & Maya', 
      role: 'Family in the US',
      story: 'Three siblings across different time zones struggling to coordinate mom\'s care.',
      outcome: 'All siblings can see updates and contribute equally',
      duration: '8 months with EverCare'
    },
    { 
      quote: 'The emergency response when my mother fell was incredible. They handled everything perfectly.', 
      name: 'Rahul M.', 
      role: 'Son in Dubai',
      story: 'Mother had a fall at home. EverCare team responded within minutes.',
      outcome: 'Quick medical attention and full family coordination',
      duration: '1 year with EverCare'
    }
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
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.div className="text-center" variants={staggerParent} {...motionGuard(shouldReduce, 0.35)}>
          <motion.h3 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
            Real Stories from Families Like Yours
          </motion.h3>
          <motion.p variants={fadeUp} className="mt-3 text-slate-700 max-w-2xl mx-auto">
            Families across the globe are finding peace of mind with EverCare. Here's how we're making a difference.
          </motion.p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-5xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <motion.div
            key={idx}
            initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Card className="relative overflow-hidden p-8 md:p-10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-teal/20 to-[#f58a8c]/20 blur-2xl" />
              
              {/* Quote Icon */}
              <div className="flex items-start gap-4 mb-6">
                <div className="mt-1 inline-grid h-8 w-8 place-items-center rounded-full bg-brand-teal/10 text-brand-teal">
                  <Quote className="h-4 w-4" />
                </div>
                <p className="text-xl leading-relaxed text-brand-ink md:text-2xl flex-1">
                  {active.quote}
                </p>
              </div>

              {/* Story Details */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-brand-ink text-sm">The Challenge</h4>
                    <p className="text-slate-600 text-sm mt-1">{active.story}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-ink text-sm">The Outcome</h4>
                    <p className="text-slate-600 text-sm mt-1">{active.outcome}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f58a8c]/10 text-sm font-semibold text-[#f58a8c]">
                      {active.name.split(' ').map((s) => s[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium text-brand-ink">{active.name}</div>
                      <div className="text-slate-600 text-sm">{active.role}</div>
                      <div className="text-slate-500 text-xs mt-1">{active.duration}</div>
                    </div>
                  </div>
                  
                  {/* Trust Indicators */}
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <svg className="h-3 w-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>Rated 5/5</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="h-3 w-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Would recommend</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="mt-8 flex items-center justify-between">
            <button aria-label="Previous testimonial" onClick={prev} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Previous</span>
            </button>
            
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={`h-2.5 w-8 rounded-full transition ${i === idx ? 'bg-gradient-to-r from-brand-teal to-[#f58a8c]' : 'bg-slate-300'}`}
                />
              ))}
            </div>
            
            <button aria-label="Next testimonial" onClick={next} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md flex items-center gap-2">
              <span className="text-sm font-medium">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Trust Bar */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-600"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-teal to-[#f58a8c] border-2 border-white"></div>
                ))}
              </div>
              <span>Joined by 200+ families worldwide</span>
            </div>
            <div className="hidden sm:block text-slate-400">•</div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 average rating from families</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}