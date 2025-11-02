import React from 'react'
import { Shield, MessageSquare, AlarmClock, Home } from 'lucide-react'
import { Card } from '../../components/ui'

export default function TrustSection() {
  const features = [
    { icon: <Shield className="h-5 w-5 text-[#0E9384]" />, text: 'Verified staff & safety' },
    { icon: <MessageSquare className="h-5 w-5 text-[#0E9384]" />, text: 'Transparent reporting' },
    { icon: <AlarmClock className="h-5 w-5 text-[#0E9384]" />, text: '24/7 availability' },
  ]

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl grid items-center gap-12 px-6 md:grid-cols-2">
        {/* Left side */}
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#112231] leading-tight">
            Care that feels like family.
          </h2>

          <p className="mt-4 text-lg text-[#112231]/80 leading-relaxed">
            Consistent care, compassionate professionals, and real-time updates — so your loved ones
            always feel connected, supported, and safe.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-700">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                {f.icon}
                {f.text}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            <a href="#sample-report" className="inline-flex items-center font-medium text-[#0E9384] hover:underline">
              See a sample weekly report →
            </a>
            <a href="#how-it-works" className="inline-flex items-center font-medium text-[#0E9384] hover:underline">
              How EverCare works →
            </a>
          </div>
        </div>

        {/* Right side card */}
        <Card className="rounded-3xl border border-slate-200 bg-[#F4EFE9] p-6 shadow-sm">
          <div className="flex items-center gap-2 text-[#112231]">
            <Home className="h-5 w-5 text-[#0E9384]" />
            <h3 className="text-xl font-semibold">A Week with EverCare</h3>
          </div>
          <ul className="mt-4 space-y-3 text-[#112231]/85">
            <li>
              <span className="font-medium text-[#112231]">Mon:</span> Nurse checks BP, glucose, meds.
            </li>
            <li>
              <span className="font-medium text-[#112231]">Wed:</span> Home Specialist handles groceries & a short walk.
            </li>
            <li>
              <span className="font-medium text-[#112231]">Fri:</span> Weekly report sent to family on WhatsApp.
            </li>
            <li>
              <span className="font-medium text-[#112231]">24/7:</span> Support line for any need or escalation.
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-6 text-xs text-[#112231]/60">
            <a href="#privacy" className="hover:text-[#112231] underline-offset-2 hover:underline">
              Data privacy & security
            </a>
            <a href="#care-team" className="hover:text-[#112231] underline-offset-2 hover:underline">
              Meet our care team
            </a>
          </div>
        </Card>
      </div>
    </section>
  )
}
