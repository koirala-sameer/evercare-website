import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Card, Button, GhostButton, Badge } from '../components/ui'
import { Link } from 'react-router-dom'
import { Check, Heart, Stethoscope, Activity, Calendar, Car, Brain } from 'lucide-react'

export default function Enroll() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const total =
    BASE_PLAN.price +
    ADDONS.filter((a) => selected.includes(a.id)).reduce((sum, a) => sum + a.price, 0)

  return (
    <div className="min-h-screen w-full bg-brand-cloud">
      <Navbar />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-3">
          {/* Left: Add-Ons Checklist */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <Badge sharp={true}>Step 2 of 2</Badge>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-brand-ink md:text-4xl">
                Customize with Add-Ons
              </h1>
              <p className="mt-2 text-lg text-slate-700">
                The Standard Basic Plan is included. Choose optional services to tailor care for your family.
              </p>
            </div>

            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="space-y-4">
                <h2 className="text-xl font-semibold text-brand-ink">{cat.name}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {ADDONS.filter((a) => a.category === cat.name).map((a) => (
                    <Card
                      key={a.id}
                      sharp={true}
                      onClick={() => toggle(a.id)}
                      className={`cursor-pointer border-2 transition ${
                        selected.includes(a.id)
                          ? 'border-[#0E9384] ring-1 ring-[#0E9384]/50'
                          : 'border-transparent hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 grid h-10 w-10 place-items-center rounded-lg bg-[#0E9384]/10">
                          {a.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-brand-ink flex items-center gap-2">
                            {a.title}
                            {selected.includes(a.id) && (
                              <Check className="h-4 w-4 text-[#0E9384]" />
                            )}
                          </h3>
                          <p className="text-sm text-slate-600">{a.desc}</p>
                          <p className="mt-1 text-sm font-semibold text-brand-ink">
                            NPR {a.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Price Summary */}
          <div className="md:sticky md:top-24 h-fit">
            <Card sharp={true} className="p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-brand-ink mb-4">Your Plan</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-slate-700">
                  <span>{BASE_PLAN.title}</span>
                  <span className="font-medium">NPR {BASE_PLAN.price.toLocaleString()}</span>
                </div>
                {ADDONS.filter((a) => selected.includes(a.id)).map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between text-slate-600 text-sm"
                  >
                    <span>{a.title}</span>
                    <span>NPR {a.price.toLocaleString()}</span>
                  </div>
                ))}
                <hr className="my-4 border-slate-200" />
                <div className="flex items-center justify-between text-lg font-semibold text-brand-ink">
                  <span>Total</span>
                  <span>NPR {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link to="/">
                  <button className="w-full rounded-lg border-2 border-slate-300 bg-transparent px-6 py-3 text-slate-700 font-semibold shadow-md hover:shadow-lg hover:bg-slate-50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                    Back to Home
                  </button>
                </Link>
                <button className="w-full rounded-lg bg-gradient-to-br from-[#0E9384] to-[#0A7568] px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-[#0E9384]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                  Confirm & Continue
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const BASE_PLAN = {
  title: 'Standard Basic Plan',
  price: 24999,
}

const CATEGORIES = [
  { name: 'Health' },
  { name: 'Lifestyle' },
  { name: 'Special Care' },
]

const ADDONS = [
  {
    id: 'physio',
    title: 'Physiotherapy',
    desc: 'In-home sessions to maintain mobility and strength.',
    price: 5000,
    category: 'Health',
    icon: <Activity className="h-5 w-5 text-[#0E9384]" />,
  },
  {
    id: 'telemed',
    title: 'Telemedicine',
    desc: 'On-demand video consults with trusted doctors.',
    price: 3000,
    category: 'Health',
    icon: <Stethoscope className="h-5 w-5 text-[#0E9384]" />,
  },
  {
    id: 'events',
    title: 'Events & Outings',
    desc: 'Planned activities, day trips, and social gatherings.',
    price: 4000,
    category: 'Lifestyle',
    icon: <Calendar className="h-5 w-5 text-[#0E9384]" />,
  },
  {
    id: 'concierge',
    title: 'Concierge & Driver',
    desc: 'Errands, shopping, and transport handled with care.',
    price: 3500,
    category: 'Lifestyle',
    icon: <Car className="h-5 w-5 text-[#0E9384]" />,
  },
  {
    id: 'dementia',
    title: 'Dementia Care',
    desc: 'Specialized routines and companionship for memory care.',
    price: 6000,
    category: 'Special Care',
    icon: <Brain className="h-5 w-5 text-[#0E9384]" />,
  },
]

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="h-8 w-8" alt="EverCare logo" />
          <span className="text-sm text-slate-600">
            © {new Date().getFullYear()} EverCare Nepal
          </span>
        </div>
        <div className="text-sm text-slate-600">Made with ❤️ for families everywhere</div>
      </div>
    </footer>
  )
}