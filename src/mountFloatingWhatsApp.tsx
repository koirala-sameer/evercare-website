import React from "react";
import ReactDOM from "react-dom/client";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const mountId = "evercare-floating-whatsapp";
let mount = document.getElementById(mountId);
if (!mount) {
  mount = document.createElement("div");
  mount.id = mountId;
  document.body.appendChild(mount);
}

const root = ReactDOM.createRoot(mount);
root.render(
  <React.StrictMode>
    <FloatingWhatsApp />
  </React.StrictMode>
);
