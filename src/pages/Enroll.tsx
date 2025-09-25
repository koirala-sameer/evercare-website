import Navbar from '../components/Navbar'
import { Card, Button } from '../components/ui'
import { addons, BASE_PRICE, AddOn } from '../data/addons'
import { currency } from '../utils/money'
import { useMemo, useState } from 'react'

export default function Enroll() {
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [notes, setNotes] = useState('')

  const total = useMemo(() => {
    const addOnTotal = addons.reduce((sum, a) => sum + (selected[a.id] ? a.price : 0), 0)
    return BASE_PRICE + addOnTotal
  }, [selected])

  function toggle(id: string) {
    setSelected(s => ({...s, [id]: !s[id]}))
  }

  return (
    <div className="min-h-screen bg-brand-cloud/50">
      <Navbar />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-3">
        {/* Left: selection */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <h2 className="text-2xl font-semibold text-brand-ink">Basic Subscription</h2>
            <p className="mt-2 text-slate-700">Includes maid, home care, 24/7 security surveillance and on‑demand driver access.</p>
            <div className="mt-4 rounded-2xl bg-brand-teal/5 p-4 text-brand-ink">
              <span className="text-sm">Base price</span>
              <div className="text-2xl font-bold">{currency.format(BASE_PRICE)} <span className="text-base font-medium text-slate-600">/ month</span></div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-brand-ink">A la carte add‑ons</h3>
              <span className="text-sm text-slate-600">Choose any combination</span>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {addons.map((a) => (
                <label key={a.id} className={`cursor-pointer rounded-2xl border p-4 transition ${selected[a.id] ? 'border-brand-teal bg-brand-teal/5' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium text-brand-ink">{a.name}</div>
                      <p className="mt-1 text-sm text-slate-600">{a.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500">+ {currency.format(a.price)}/mo</div>
                      <input
                        type="checkbox"
                        className="mt-2 h-5 w-5 accent-[var(--brand-teal)]"
                        checked={!!selected[a.id]}
                        onChange={() => toggle(a.id)}
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">{a.category}</div>
                </label>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-brand-ink">Notes & special requests</h3>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Tell us about routines, medications, preferences…"
              className="mt-3 w-full rounded-2xl border border-slate-300 p-3 outline-none ring-brand-teal focus:ring-2" rows={4} />
          </Card>
        </div>

        {/* Right: summary */}
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <Card>
              <h3 className="text-xl font-semibold text-brand-ink">Your plan</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Basic subscription</span>
                  <span className="font-medium">{currency.format(BASE_PRICE)}</span>
                </div>
                {addons.filter(a => selected[a.id]).map((a) => (
                  <div key={a.id} className="flex items-center justify-between">
                    <span className="text-slate-700">{a.name}</span>
                    <span className="text-slate-700">+ {currency.format(a.price)}</span>
                  </div>
                ))}
                <hr className="my-2" />
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold text-brand-ink">Total monthly</span>
                  <span className="font-bold text-brand-ink">{currency.format(total)}</span>
                </div>
              </div>
              <button className="mt-6 w-full rounded-2xl bg-brand-coral px-5 py-3 font-medium text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">Continue</button>
              <p className="mt-2 text-center text-xs text-slate-500">No payment due now. We’ll contact you to finalize details.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}