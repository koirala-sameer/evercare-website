import { motion, useReducedMotion } from 'framer-motion'
import { Button, Card } from '../../components/ui'
import { Check, Shield, Clock, Users, Heart } from 'lucide-react'

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

  const includedFeatures = [
    { icon: <Users className="h-5 w-5 text-brand-teal" />, text: 'Dedicated care manager' },
    { icon: <Clock className="h-5 w-5 text-brand-teal" />, text: 'Weekly wellness check-ins' },
    { icon: <Heart className="h-5 w-5 text-brand-teal" />, text: 'Errand coordination & bookings' },
    { icon: <Shield className="h-5 w-5 text-brand-teal" />, text: 'Family updates & dashboards' },
    { icon: <Check className="h-5 w-5 text-brand-teal" />, text: '24/7 safety monitoring' },
    { icon: <Users className="h-5 w-5 text-brand-teal" />, text: 'On-demand driver access' },
  ]

  const benefits = [
    'No long-term contracts',
    'Cancel anytime',
    'Add services monthly',
    'Transparent pricing',
    'All caregivers verified',
    '24/7 family support'
  ]

  return (
    <section id="plans" className="relative">
      <div className="pointer-events-none absolute inset-0 hero-gradient opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <motion.div className="mx-auto max-w-4xl text-center" variants={staggerParent} {...motionGuard(shouldReduce, 0.4)}>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold tracking-tight text-brand-ink md:text-5xl">
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-lg leading-relaxed text-slate-700 max-w-2xl mx-auto">
            One comprehensive plan that covers everything your parents need. No hidden fees, no complicated tiers.
          </motion.p>
        </motion.div>

        <motion.div variants={staggerParent} {...motionGuard(shouldReduce, 0.3)} className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Plan Card */}
          <motion.div 
            variants={fadeUp} 
            className="lg:col-span-2"
            whileHover={shouldReduce ? undefined : { y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="card-soft p-8 md:p-10 relative overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center rounded-full bg-[#f58a8c]/10 px-3 py-1 text-sm font-medium text-[#f58a8c] ring-1 ring-inset ring-[#f58a8c]/20">
                  Most Popular
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-brand-ink">Standard Care Plan</h3>
                  <p className="mt-3 text-slate-700">
                    Complete peace of mind with daily support, safety monitoring, and transparent reporting.
                  </p>
                  
                  {/* Features Grid */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {includedFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 text-slate-700">
                        <div className="flex-shrink-0">
                          {feature.icon}
                        </div>
                        <span className="text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="md:w-64 flex-shrink-0">
                  <div className="text-center md:text-right">
                    <div className="text-sm text-slate-600">Starting from</div>
                    <div className="text-4xl font-bold text-brand-ink mt-1">
                      NPR 24,999<span className="text-xl font-medium text-slate-600">/mo</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">*Pricing is placeholder; finalize in admin.</p>
                    
                    <div className="mt-6">
                      <a href="#addons">
                        <Button className="w-full rounded-2xl px-6 py-4 text-base font-semibold bg-gradient-to-r from-brand-teal to-[#6fd1d2] text-white shadow-[0_10px_20px_rgba(97,191,192,0.35)] hover:shadow-[0_16px_32px_rgba(97,191,192,0.45)] hover:translate-y-[-1px] active:translate-y-[0px] active:shadow-[0_8px_16px_rgba(97,191,192,0.35)] transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2">
                          Get Started Today
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Bar */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex flex-wrap gap-4 justify-center text-xs text-slate-600">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Side Benefits Card */}
          <motion.div 
            variants={fadeUp}
            whileHover={shouldReduce ? undefined : { y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-6 h-full bg-gradient-to-br from-slate-50 to-white border-slate-200">
              <h4 className="text-lg font-semibold text-brand-ink mb-4">Why Families Choose EverCare</h4>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <Shield className="h-5 w-5 text-brand-teal" />
                  </div>
                  <div>
                    <h5 className="font-medium text-brand-ink text-sm">Radical Transparency</h5>
                    <p className="text-slate-600 text-xs mt-1">See every visit, expense, and update in real-time</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <Users className="h-5 w-5 text-brand-teal" />
                  </div>
                  <div>
                    <h5 className="font-medium text-brand-ink text-sm">Verified Caregivers</h5>
                    <p className="text-slate-600 text-xs mt-1">Background-checked, trained professionals</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <Clock className="h-5 w-5 text-brand-teal" />
                  </div>
                  <div>
                    <h5 className="font-medium text-brand-ink text-sm">24/7 Support</h5>
                    <p className="text-slate-600 text-xs mt-1">Always available for emergencies and questions</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <Heart className="h-5 w-5 text-[#f58a8c]" />
                  </div>
                  <div>
                    <h5 className="font-medium text-brand-ink text-sm">Cultural Understanding</h5>
                    <p className="text-slate-600 text-xs mt-1">Nepali caregivers who understand local customs</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border border-slate-200">
                <p className="text-sm text-slate-700 text-center">
                  <span className="font-semibold text-brand-ink">200+ families</span> trust us with their parents' care
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}