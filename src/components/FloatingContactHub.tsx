import React, { useState, useEffect } from "react";
import { MessageCircle, X, MessageSquareText, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingContactHub() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  const whatsappNumber =
    import.meta.env.VITE_EVERCARE_WHATSAPP || "9779800000000";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20EverCare%20Team,%20I%27d%20like%20to%20know%20more!`;

  useEffect(() => {
    // Pulse gently every few seconds if widget is closed
    if (!open) {
      const timer = setInterval(() => {
        setPulse(true);
        setTimeout(() => setPulse(false), 1000);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [open]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.6 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative">
        {/* Expanded Options */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-16 right-0 flex flex-col items-end gap-3"
            >
              {/* WhatsApp */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-2 shadow-lg hover:shadow-xl transition-all"
              >
                <Send className="h-4 w-4" />
                WhatsApp
              </motion.a>

              {/* Web Chat */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => alert('Live chat feature coming soon!')}
                className="flex items-center gap-2 rounded-full bg-brand-teal text-white px-4 py-2 shadow-lg hover:shadow-xl transition-all"
              >
                <MessageSquareText className="h-4 w-4" />
                Chat with Us
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          onClick={() => setOpen(!open)}
          className={`
            relative flex items-center justify-center rounded-full
            bg-brand-teal text-white p-4 shadow-xl hover:shadow-2xl transition-all
            ${pulse ? "animate-[ping_1s_ease-in-out]" : ""}
          `}
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}

          {/* Tooltip */}
          {!open && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute -left-40 top-1/2 -translate-y-1/2 bg-white text-brand-ink text-sm px-3 py-1.5 rounded-full shadow-sm border border-slate-200 whitespace-nowrap"
            >
              Need help?{" "}
              <span className="font-medium text-brand-teal">Chat with us</span>
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
