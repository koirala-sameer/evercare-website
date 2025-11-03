import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Global styles
import "./styles/evercare-theme.css";
import "./index.css";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";

// ✅ NEW: Unified EverCare Contact Hub
import "./mountFloatingContactHub";

// Performance monitoring
import { usePerformanceMonitor } from "./hooks/usePerformanceMonitor";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/services", element: <Services /> },
]);

// ✅ Optional: Register PWA Service Worker
function registerServiceWorker() {
  if ("serviceWorker" in navigator && import.meta.env.PROD) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => console.log("✅ SW registered:", registration))
        .catch((err) => console.log("❌ SW registration failed:", err));
    });
  }
}

// ✅ Lightweight Performance Tracker
function PerformanceTracker() {
  usePerformanceMonitor((metrics) => {
    console.log("📊 Performance Metrics Collected:", metrics);
  });
  return null;
}

// Main App Wrapper
function AppWithPerformance() {
  return (
    <>
      <PerformanceTracker />
      <RouterProvider router={router} />
    </>
  );
}

// Initialize app
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

registerServiceWorker();

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppWithPerformance />
  </React.StrictMode>
);
