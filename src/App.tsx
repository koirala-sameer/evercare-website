import React from "react";

type AnyComp = React.ComponentType<any>;
type Mod = { default?: AnyComp };

function pickByRegex(mods: Record<string, Mod>, rx: RegExp): AnyComp | null {
  // Stable order for determinism
  const entries = Object.entries(mods).sort((a, b) => a[0].localeCompare(b[0]));
  for (const [path, mod] of entries) {
    if (rx.test(path.toLowerCase()) && mod?.default) return mod.default as AnyComp;
  }
  return null;
}

function pickPage(mods: Record<string, Mod>): AnyComp | null {
  // Priority by common landing names
  const priorities = [
    /(^|\/)home(\.|\/)/i,
    /(^|\/)index(\.|\/)/i,
    /(^|\/)landing(\.|\/)/i,
    /(^|\/)main(\.|\/)/i,
  ];
  for (const rx of priorities) {
    const m = pickByRegex(mods, rx);
    if (m) return m;
  }
  // Fallback: first default export
  const entries = Object.entries(mods).sort((a, b) => a[0].localeCompare(b[0]));
  for (const [, mod] of entries) {
    if (mod?.default) return mod.default as AnyComp;
  }
  return null;
}

export default function App() {
  const pageMods = import.meta.glob("./pages/**/*.{tsx,jsx,ts,js}", { eager: true }) as Record<
    string,
    Mod
  >;
  const compMods = import.meta.glob("./components/**/*.{tsx,jsx,ts,js}", {
    eager: true,
  }) as Record<string, Mod>;

  const Page = pickPage(pageMods);
  const Navbar = pickByRegex(compMods, /(^|\/)navbar(\.|\/)/i);
  const Footer = pickByRegex(compMods, /(^|\/)footer(\.|\/)/i);

  if (!Page) {
    return (
      <div className="container" style={{ padding: "2rem" }}>
        <h1 style={{ fontWeight: 800, marginBottom: ".5rem" }}>EverCare</h1>
        <p className="text-muted">
          No page component found under <code>src/pages</code>. Please add a file with a default
          export such as <code>src/pages/Home.tsx</code> or <code>src/pages/Index.tsx</code>.
        </p>
      </div>
    );
  }

  return (
    <>
      {Navbar ? <Navbar /> : null}
      <main>
        <Page />
      </main>
      {Footer ? <Footer /> : null}
    </>
  );
}
