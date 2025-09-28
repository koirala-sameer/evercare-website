import React from "react";
import ReactDOM from "react-dom/client";
import FloatingCTA from "./components/FloatingCTA";

/**
 * SSR-/build-safe mount. Only runs in the browser.
 */
export function mountFloatingCTA() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const mountId = "evercare-floating-cta-root";
  let mount = document.getElementById(mountId);
  if (!mount) {
    mount = document.createElement("div");
    mount.id = mountId;
    document.body.appendChild(mount);
  }

  const root = ReactDOM.createRoot(mount);
  root.render(
    <React.StrictMode>
      <FloatingCTA
        // You can override via Vite env:
        // VITE_EVERCARE_PHONE="+9779800000000"
        // VITE_EVERCARE_WHATSAPP="9779800000000"
        utm={{ utm_source: "evercare-site", utm_medium: "fab", utm_campaign: "contact" }}
      />
    </React.StrictMode>
  );
}

/** Defer until DOM is ready (no-op during SSR) */
if (typeof window !== "undefined" && typeof document !== "undefined") {
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", mountFloatingCTA, { once: true });
  } else {
    // microtask: ensure body exists
    queueMicrotask(mountFloatingCTA);
  }
}
