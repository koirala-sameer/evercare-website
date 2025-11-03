import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Global styles
import "./styles/evercare-theme.css";
import "./index.css";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";

// Floating WhatsApp CTA (keep this mounted only once)
import "./mountFloatingWhatsApp";

// Performance monitoring
import { usePerformanceMonitor } from "./hooks/usePerformanceMonitor";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/services", element: <Services /> },
]);

// PWA Service Worker Registration
function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

// Performance Monitoring Component
function PerformanceTracker() {
  usePerformanceMonitor((metrics) => {
    // You can use these metrics for:
    // - Sending to analytics
    // - Triggering alerts for poor performance
    // - A/B testing different optimizations
    console.log('📊 Performance Metrics Collected:', metrics);
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

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Register service worker
registerServiceWorker();

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppWithPerformance />
  </React.StrictMode>
);