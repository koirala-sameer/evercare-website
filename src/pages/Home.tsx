import React, { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Eager sections
import Hero from "../sections/home/Hero";
import PeaceOfMind from "../sections/home/PeaceOfMind";
import TrustAndSafety from "../sections/home/TrustAndSafety";
import WhoItsFor from "../sections/home/WhoItsFor";
import StorySections from "../sections/home/StorySection";
import FAQ from "../sections/home/FAQ";
import FinalCTA from "../sections/home/FinalCTA";
import MissionStory from "../sections/home/MissionStory";
import MeetTheTeam from "../sections/home/MeetTheTeam";

// Lazy sections
const Testimonials = lazy(() => import("../sections/home/Testimonials"));
const AddOnsShowcase = lazy(() => import("../sections/home/AddOnsShowcase"));
const ImpactStats = lazy(() => import("../sections/home/ImpactStats"));
const HowItWorksTimeline = lazy(() => import("../sections/home/HowItWorksTimeline"));

export default function Home() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(!!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow focus:ring-2 focus:ring-brand-teal"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        {/* Hero Section with unified CTAs */}
        <Hero />

        <PeaceOfMind />
        <TrustAndSafety />
        <WhoItsFor />
        <StorySections />

        <Suspense fallback={<SectionSkeleton />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ImpactStats />
        </Suspense>

        <MissionStory />
        <MeetTheTeam />

        <Suspense fallback={<SectionSkeleton />}>
          <HowItWorksTimeline />
        </Suspense>

        <FAQ />

        {/* Final unified CTA */}
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

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
