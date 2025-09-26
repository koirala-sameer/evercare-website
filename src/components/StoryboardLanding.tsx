import React from "react";
import StorySection from "./StorySection";
import ImpactCounters from "./ImpactCounters";
import TestimonialsCarousel from "./TestimonialsCarousel";

const scrollToPlans = () => {
  const el = document.querySelector("#plans");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const StoryboardLanding: React.FC = () => {
  return (
    <main className="storyboard-container snap-y snap-mandatory h-screen w-full overflow-y-scroll overflow-x-hidden">
      <StorySection
        id="frame-1"
        eyebrow="One Platform. Total Peace of Mind."
        headline={<span>Peace of Mind for <em className="italic">Families Abroad</em></span>}
        subtext="Give your parents compassionate, reliable, transparent care in Nepal — and see every rupee spent via Care Wallet."
        ctaText="Explore how it works"
        onCtaClick={scrollToPlans}
        mediaType="video"
        mediaSrc="/media/family-moments.mp4"
        overlayGradient
        dark
      />
      <StorySection
        id="frame-2"
        eyebrow="Holistic, human-first care"
        headline="Holistic Care for Parents in Nepal"
        subtext="Daily check-ins, medical coordination, home services, wellness, and moments of joy — all under one subscription."
        ctaText="See Services"
        onCtaClick={scrollToPlans}
        mediaType="image"
        mediaSrc="/media/evercare-care-visit.jpg"
        overlayGradient
        dark
      />
      <StorySection
        id="frame-3"
        eyebrow="Radical transparency"
        headline="Transparent & Trustworthy Platform"
        subtext="Every visit, expense, and outcome is logged. You’ll see photos, receipts, GPS, and notes — in real time."
        ctaText="View Demo Dashboard"
        onCtaClick={() => window.location.assign("/dashboard")}
        mediaType="image"
        mediaSrc="/media/evercare-dashboard.jpg"
        overlayGradient
        dark
      />
      <StorySection
        id="frame-4"
        eyebrow="Join thousands building a safer future for elders"
        headline="Join the Movement"
        subtext={<ImpactCounters />}
        ctaText="Get Started"
        onCtaClick={() => window.location.assign("/signup")}
        mediaType="image"
        mediaSrc="/media/nepal-landscape.jpg"
        overlayGradient
        dark
      />
      <section className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-6 py-20 snap-start">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold">What families say</h2>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">Real voices from the EverCare community.</p>
          <div className="mt-10">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>
    </main>
  );
};

export default StoryboardLanding;
