/**
 * Off-Chain Media — Design Tokens
 * Single source of truth for all visual constants.
 * Never hardcode colors or fonts elsewhere.
 */
export const T = {
  accent:  '#F7931A',               // Bitcoin orange — fixed for lines, fills, borders and dark-theme text
  // The same orange as TEXT on the light paper reads at 2.15:1 (4.5:1 needed). Text only, and only in
  // light mode, uses a darker shade of the same hue (4.76:1 on paper); dark mode keeps #F7931A. Decided
  // with Marius on 2026-09-30: one orange everywhere, darker on white when readability requires it.
  accentText: 'light-dark(#A85A00, #F7931A)',
  ink:     '#1a1a1a',               // near-black (light-mode fallback only)
  paper:   '#FAF7F1',               // warm paper background (light-mode fallback only)
  // Secondary text. One solid grey per theme: 4.98:1 on paper, 6.46:1 on ink (WCAG AA).
  // The old rgba(128,128,128,0.5) read at 1.8:1 in light mode. Use it in CSS or in a
  // `style` attribute (light-dark() is CSS), never as a plain SVG fill attribute.
  muted:   'light-dark(#6B6B6B, #A3A3A3)',
  grid:    'rgba(128,128,128,0.12)',// chart grid lines — neutral, works on both themes
  heading: "'Oswald', 'Arial Narrow', sans-serif",
  body:    "'Spectral', Georgia, serif",

  // Theme-aware colors, matching the site's own light-dark() convention
  // (Webflow variables --light--text / --dark--text). Use via `style`,
  // never a plain SVG presentation attribute, so the browser parses
  // light-dark() as CSS.
  line:      'light-dark(#1a1a1a, #f2f2f2)',        // chart curve / bars
  lineFill:  'light-dark(#1a1a1a, #f2f2f2)',         // area/volume gradient base
  shadow:    'light-dark(rgba(0,0,0,0.32), rgba(255,255,255,0.20))',
  textAdaptive: 'light-dark(#1a1a1a, #ffffff)',
  textAdaptiveInverse: 'light-dark(#ffffff, #1a1a1a)', // opposite of textAdaptive — for solid-fill blocks
  textAdaptiveMuted: 'light-dark(rgba(26,26,26,0.55), rgba(255,255,255,0.55))',
};

// Period → number of data points to slice
export const PERIOD_N = {
  '1D':  24,
  '1W':  7,
  '1M':  30,
  '3M':  90,
  '1Y':  365,
  'ALL': 9999,
};
