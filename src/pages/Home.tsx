import React, { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Eager sections
import Hero from "../sections/home/Hero";
import MissionStory from "../sections/home/MissionStory";
import PeaceOfMind from "../sections/home/PeaceOfMind";
import TrustAndSafety from "../sections/home/TrustAndSafety";
import WhoItsFor from "../sections/home/WhoItsFor";
import StorySections from "../sections/home/StorySection";
import MeetTheTeam from "../sections/home/MeetTheTeam";
import FAQ from "../sections/home/FAQ";
import FinalCTA from "../sections/home/FinalCTA";

// Lazy sections
const HowItWorksTimeline = lazy(() => import("../sections/home/HowItWorksTimeline"));
const ImpactStats = lazy(() => import("../sections/home/ImpactStats"));
const Testimonials = lazy(() => import("../sections/home/Testimonials"));
const AddOnsShowcase = lazy(() => import("../sections/home/AddOnsShowcase"));

export default function Home() {
  const [reduceMotion, setReduceMotion] = useState(false);

  // Accessibility: Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(!!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // Smooth scroll for internal links
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("#") || href === "#") return;
      const el = document.querySelector(href) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      const headerOffset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      const t = setTimeout(() => el.removeAttribute("tabindex"), 1000);
      return () => clearTimeout(t);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [reduceMotion]);

  return (
    <div className="min-h-screen w-full">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow focus:ring-2 focus:ring-brand-teal"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        {/* 1️⃣ Hero — headline, emotional hook */}
        <Hero />

        {/* 2️⃣ Mission / Story — why we exist */}
        <MissionStory />

        {/* 6️⃣ Process / How It Works — explain flow */}
        <Suspense fallback={<SectionSkeleton />}>
          <HowItWorksTimeline />
        </Suspense>

        {/* 7️⃣ Social Proof — testimonials */}
        <Suspense fallback={<SectionSkeleton />}>
          <Testimonials />
        </Suspense>

        {/* 8️⃣ Measurable Impact — show data */}
        <Suspense fallback={<SectionSkeleton />}>
          <ImpactStats />
        </Suspense>

        {/* 9️⃣ Add-ons / extras */}
        <Suspense fallback={<SectionSkeleton />}>
          <AddOnsShowcase />
        </Suspense>

        {/* 🔟 Story or philosophy continuation */}
        <StorySections />

        {/* 11️⃣ Meet the Team — human connection */}
        <MeetTheTeam />

        {/* 12️⃣ FAQ — resolve hesitations */}
        <FAQ />

        {/* 13️⃣ Final CTA — convert */}
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

/** Skeleton fallback for lazy sections */
function SectionSkeleton({ id }: { id?: string }) {
  return (
    <section id={id} className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
          <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
          <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
        </div>
      </div>
    </section>
  );
}
