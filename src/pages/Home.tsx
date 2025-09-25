import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Heart, Phone, Clock, UserRoundCheck } from 'lucide-react'
import Navbar from '../components/Navbar'
import { Button, Card, Badge, GhostButton } from '../components/ui'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <Hero />
      <TrustBar />
      <StorySections />
      <Plans />
      <AlaCartePreview />
      <FAQ />
      <Footer />
    </div>
  )
}

function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[url('/banner-caregiver.jpg')] bg-cover bg-center opacity-15" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2 md:py-32">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge in coral */}
            <Badge className="bg-[#f58a8c]/10 text-[#f58a8c]">
              One Platform. Total Peace of Mind.
            </Badge>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-brand-ink md:text-6xl">
              Care for your parents <span className="text-brand-teal">as if you were here.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-700">
              EverCare integrates daily living support, safety, health, and concierge services into a single membership designed for Nepali families with loved ones back home.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#plans">
                <Button className="flex items-center gap-2">
                  Enroll now <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#plans">
                <GhostButton>See plan</GhostButton>
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-brand-teal" /> 24/7 security</span>
              <span className="inline-flex items-center gap-2"><Phone className="h-5 w-5 text-brand-teal" /> Real-time updates</span>
              <span className="hidden items-center gap-2 md:inline-flex"><Clock className="h-5 w-5 text-brand-teal" /> Same-day requests</span>
            </div>
          </motion.div>
        </div>
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass relative rounded-3xl p-6"
          >
            <img src="/banner-caregiver.jpg" className="h-[420px] w-full rounded-2xl object-cover" alt="Caregiver with senior in a flower garden" />
            <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
              <div className="flex items-center gap-3">
                {/* Heart in coral */}
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f58a8c]/10">
                  <Heart className="h-5 w-5 text-[#f58a8c]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-ink">Compassion first</p>
                  <p className="text-xs text-slate-600">Trusted local team, diaspora-grade transparency.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-white/60">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 py-6 text-slate-600">
        <div className="flex items-center gap-2"><img src="/logo.png" className="h-6 w-6" alt="" /><span>Radical transparency</span></div>
        <div className="flex items-center gap-2"><UserRoundCheck className="h-5 w-5 text-brand-teal" /><span>Verified caregivers</span></div>
        <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-brand-teal" /><span>Safety-first operations</span></div>
        <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-brand-teal" /><span>Fast response</span></div>
      </div>
    </section>
  )
}

function StorySections() {
  const items = [
    { title: 'Daily living, handled', text: 'Maid services, meal prep, medication reminders, and tidy homes — done reliably.', img: '/banner-caregiver.jpg' },
    { title: 'Always safe, always seen', text: '24/7 security surveillance and wellness checks give you peace of mind anywhere in the world.', img: '/banner-caregiver.jpg' },
    { title: 'Healthcare that comes home', text: 'Telemedicine, lab tests at home, and specialist coordination when needed.', img: '/banner-caregiver.jpg' },
  ]
  return (
    <section id="services" className="bg-gradient-to-b from-white to-brand-cloud/60">
      <div className="mx-auto max-w-7xl space-y-20 px-6 py-24">
        {items.map((it, idx) => (
          <motion.div
            key={idx}
            initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}
            className={`grid items-center gap-10 md:grid-cols-2 ${idx%2===1 ? 'md:[&>*:first-child]:order-2' : ''}`}
          >
            <img src={it.img} alt="" className="h-[380px] w-full rounded-3xl object-cover shadow-soft" />
            <div>
              <h3 className="text-3xl font-semibold text-brand-ink md:text-4xl">{it.title}</h3>
              <p className="mt-4 text-lg text-slate-700">{it.text}</p>
              <ul className="mt-6 grid grid-cols-1 gap-3 text-slate-700 md:grid-cols-2">
                <li className="rounded-2xl border border-slate-200 bg-white hover:bg-[#f58a8c]/5 p-4 transition">Reliable scheduling</li>
                <li className="rounded-2xl border border-slate-200 bg-white hover:bg-[#f58a8c]/5 p-4 transition">Care manager updates</li>
                <li className="rounded-2xl border border-slate-200 bg-white hover:bg-[#f58a8c]/5 p-4 transition">Digital payments & receipts</li>
                <li className="rounded-2xl border border-slate-200 bg-white hover:bg-[#f58a8c]/5 p-4 transition">Family group access</li>
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Plans() {
  return (
    <section id="plans" className="relative">
      <div className="pointer-events-none absolute inset-0 hero-gradient opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-brand-ink">One simple membership</h2>
          {/* Reverted back to slate text */}
          <p className="mt-3 text-lg text-slate-700">
            A single plan for daily living and safety. Add specialized services later only if you need them.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8">
          <Card className="card-soft p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-brand-ink">Standard Basic Plan</h3>
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
              <Link to="/enroll">
                <Button className="px-6 py-3 text-base rounded-2xl shadow-lg hover:shadow-xl">
                  Proceed to Add-Ons
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-xs text-slate-500">*Pricing is placeholder; finalize in admin.</p>
          </Card>
        </div>
      </div>
    </section>
  )
}

function AlaCartePreview() {
  return (
    <section id="why" className="bg-[#f58a8c]/5">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {icon: <ShieldCheck className="h-6 w-6 text-brand-teal" />, title: 'Safety-first', desc: '24/7 surveillance and proactive wellness checks.'},
            {icon: <Phone className="h-6 w-6 text-brand-teal" />, title: 'Transparent', desc: 'Every visit and spend is tracked and shared with family.'},
            {icon: <Heart className="h-6 w-6 text-[#f58a8c]" />, title: 'Compassionate', desc: 'We show up with heart, not just service lists.'},
          ].map((b, i) => (
            <Card key={i}>
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-teal/10">{b.icon}</div>
                <div>
                  <h4 className="text-xl font-semibold text-brand-ink">{b.title}</h4>
                  <p className="mt-2 text-slate-700">{b.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const items = [
    { q: 'Where do you operate first?', a: 'Launching in Kathmandu & Pokhara, expanding nationwide.' },
    { q: 'Can I change add-ons anytime?', a: 'Yes, add or remove services monthly from your dashboard.' },
    { q: 'How do driver services work?', a: 'On-demand with transparent per-trip billing or monthly packages.' },
    { q: 'Do you support medical emergencies?', a: 'We coordinate ambulances, hospitals, and family notifications.' },
  ]
  return (
    <section id="faq" className="bg-brand-cloud/60">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h3 className="text-center text-3xl font-bold text-brand-ink">Frequently asked questions</h3>
        <div className="mt-10 space-y-4">
          {items.map((it, i) => (
            <details key={i} className="group rounded-2xl border border-slate-200 bg-white p-5 open:shadow-soft">
              <summary className="cursor-pointer list-none text-lg font-medium text-brand-ink">
                {it.q}
              </summary>
              <p className="mt-2 text-slate-700">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="h-8 w-8" alt="" />
          <span className="text-sm text-slate-600">© {new Date().getFullYear()} EverCare Nepal</span>
        </div>
        <div className="text-sm text-slate-600">Made with ❤️ for families everywhere</div>
      </div>
    </footer>
  )
}
