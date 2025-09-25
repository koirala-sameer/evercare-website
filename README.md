# EverCare Website (React + TypeScript + Tailwind)

Fortune‑500 style, story‑scrolling homepage with a clean enrollment flow.

## Quick start
```bash
npm install
npm run dev
# open http://localhost:5173
```

## Tech
- React 18 + Vite + TypeScript
- TailwindCSS (no custom plugin required)
- framer‑motion for subtle scroll reveals
- react‑router‑dom for routes (`/` and `/enroll`)

## Brand colors (edit in `tailwind.config.js` or `src/index.css`)
- Teal: `#61bfc0`
- Coral: `#f58a8c`
- Ink: `#0f172a`
- Cloud: `#f8fafc`

## Images
Logo and banner are placed in `/public` as `logo.png` and `banner-caregiver.jpg`.
Replace them with updated assets if needed.

## Pricing
- Base price is set in `src/data/addons.ts` as `BASE_PRICE`.
- Add‑ons live in the same file. Update names/descriptions/prices/categories there.

## Notes
- This is a production‑grade scaffold. For shadcn/ui components, run the shadcn setup
  later if desired.
- The "Continue" button on the enroll page is a placeholder; wire to your backend or form provider.