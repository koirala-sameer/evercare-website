import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Global styles
import "./styles/evercare-theme.css";
import "./index.css";

// Pages
import Home from "./pages/Home";
import Enroll from "./pages/Enroll";
import Services from "./pages/Services";

// Floating WhatsApp CTA (keep this mounted only once)
import "./mountFloatingWhatsApp";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/enroll", element: <Enroll /> },
  { path: "/services", element: <Services /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
