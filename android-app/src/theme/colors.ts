// Ported 1:1 from the Next.js prototype's `--su-*` CSS custom properties
// (app/globals.css in the web project), which were themselves derived from
// stitch-reference/*/DESIGN.md. Same source of truth, different consumption
// mechanism (RN has no CSS cascade, so this is a plain object).
export const colors = {
  canvas: '#ede6d6', // Khadi Cream — base background
  surface: '#f7f3eb',
  surfaceAlt: '#e2d9c5',
  surfaceCard: '#ffffff',
  ink: '#221f1c', // structural borders/text
  geru: '#a8402e', // primary — Geru Red
  geruDark: '#832516',
  indigo: '#264653', // secondary
  turmeric: '#d6a438', // tertiary — Turmeric Gold
  turmericInk: '#5d4200',
  error: '#7a2632', // Maroon error
  outline: '#8a716d',
  outlineLight: '#dec0ba',
  white: '#ffffff',
} as const
