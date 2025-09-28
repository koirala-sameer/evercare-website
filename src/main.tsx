import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Global styles (include theme so .fab works)
import "./styles/evercare-theme.css";
import "./index.css";

// Pages
import Home from "./pages/Home";
import Enroll from "./pages/Enroll";

// ⚠️ Mount only ONE floating widget. Keep WhatsApp-only for now.
// Remove any previous mount of './mountFloatingCTA'.
import "./mountFloatingWhatsApp";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/enroll", element: <Enroll /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
