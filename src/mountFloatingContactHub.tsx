import React from "react";
import ReactDOM from "react-dom/client";
import FloatingContactHub from "./components/FloatingContactHub";

const mountId = "evercare-contact-hub";
let mount = document.getElementById(mountId);
if (!mount) {
  mount = document.createElement("div");
  mount.id = mountId;
  document.body.appendChild(mount);
}

const root = ReactDOM.createRoot(mount);
root.render(
  <React.StrictMode>
    <FloatingContactHub />
  </React.StrictMode>
);
