import React from 'react'
import { ArrowRight, ChevronRight, Shield, MessageSquare, Clock, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { homeContent } from '@/data/homeContent'

export default function HeroSection() {
  const { title, description, highlights, actions, weeklySchedule } = homeContent.hero

  const iconMap: Record<string, JSX.Element> = {
    shield: <Shield className="h-4 w-4 text-[#0E9384]" aria-hidden />,
    message: <MessageSquare className="h-4 w-4 text-[#0E9384]" aria-hidden />,
    clock: <Clock className="h-4 w-4 text-[#0E9384]" aria-hidden />,
  }

  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Column: Text + CTAs */}
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#112231]">
            {title}
          </h1>
          <p className="mt-4 text-[#112231]/80 text-lg max-w-xl">{description}</p>

          {/* Highlights */}
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3" aria-label="Key assurances">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-[#112231]/80">
                {iconMap[item.icon]}
                {item.text}
              </li>
            ))}
          </ul>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button className="bg-[#0E9384] hover:bg-[#0b7a6e] text-white">
              {actions.primary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="border-[#0E9384] text-[#0E9384] hover:bg-[#E8F5F3]"
            >
              {actions.secondary}
            </Button>

            <a
              href="#investors"
              className="inline-flex items-center text-sm text-[#112231]/70 hover:text-[#112231]"
            >
              For Investors
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Right Column: Weekly Schedule Card */}
        <Card className="border-0 bg-[#F4EFE9]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#112231]">
              <Home className="h-5 w-5 text-[#0E9384]" />
              A Week with EverCare
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-[#112231]/80">
              {weeklySchedule.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
