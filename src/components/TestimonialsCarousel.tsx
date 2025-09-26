import React from "react";
import { motion } from "framer-motion";

const items = [
  {
    quote: "I finally sleep through the night. Every visit shows up on my phone with photos and notes.",
    name: "Anita R.",
    relation: "Daughter in Sydney"
  },
  {
    quote: "Their Care Wallet removed so much friction — no more guessing where the money went.",
    name: "Rahul S.",
    relation: "Son in New York"
  },
  {
    quote: "My mother adores their wellness walks. The little joyful moments matter.",
    name: "Sanjay K.",
    relation: "Son in London"
  }
];

const TestimonialsCarousel: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div className="flex">
        {items.map((t, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: index === i ? 1 : 0, x: index === i ? 0 : -50 }}
            transition={{ type: "tween", duration: 0.6 }}
            className="min-w-full"
          >
            <p className="text-2xl sm:text-3xl font-medium leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-6 text-slate-600 dark:text-slate-300">{t.name} · {t.relation}</footer>
          </motion.blockquote>
        ))}
      </div>
      <div className="absolute bottom-0 right-0 flex gap-2 p-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i+1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-6 rounded-full ${i === index ? "bg-slate-900 dark:bg-white" : "bg-slate-300 dark:bg-slate-600"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
