/**
 * Runtime style injection for the sidebar + full-chart gallery layout.
 * Injected once at boot — keeps Webflow's authored markup untouched,
 * only the visual layout is overridden.
 */

import { T } from '../tokens.js';

let injected = false;

export function injectGalleryStyles() {
  if (injected) return;
  injected = true;

  const style = document.createElement('style');
  style.textContent = `
    .ocm-data-filters { display: none !important; }
    .ocm-data-hero { display: none !important; }

    .ocm-blockstrip {
      display: flex;
      align-items: stretch;
      gap: 18px;
      overflow-x: auto;
      padding: 24px 4px 40px;
      margin-bottom: 8px;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .ocm-blockstrip::-webkit-scrollbar { display: none; }

    .ocm-blockstrip-divider {
      flex: 0 0 auto;
      align-self: center;
      display: flex;
      align-items: center;
      color: ${T.textAdaptiveMuted};
      padding: 0 16px;
    }

    .ocm-block-cube {
      position: relative;
      flex: 0 0 auto;
      width: 150px;
      height: 160px;
    }
    .ocm-block-cube-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .ocm-block-cube-content {
      position: relative;
      box-sizing: border-box;
      /* Front face (the flat square, ignoring the top/right bevel) is
         inset 10% from the top and right — pad past that line, not
         past the cube's outer bounds, so text centers on the square
         you actually read, not the bevel. */
      padding: 30px 26px 14px 14px;
    }

    .ocm-block-cube--pending .ocm-bc-fee,
    .ocm-block-cube--pending .ocm-bc-range,
    .ocm-block-cube--pending .ocm-bc-row,
    .ocm-block-cube--pending .ocm-bc-meta { color: ${T.textAdaptive}; }

    .ocm-block-cube--confirmed .ocm-bc-fee,
    .ocm-block-cube--confirmed .ocm-bc-range,
    .ocm-block-cube--confirmed .ocm-bc-row,
    .ocm-block-cube--confirmed .ocm-bc-meta { color: ${T.textAdaptiveInverse}; }

    .ocm-bc-fee {
      font-family: ${T.heading};
      font-size: 15px;
      font-weight: 600;
      margin: 0;
    }
    .ocm-bc-range {
      font-size: 10px;
      opacity: 0.75;
      margin: 2px 0 8px;
    }
    .ocm-bc-row {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      opacity: 0.85;
      margin: 2px 0;
      gap: 8px;
    }
    .ocm-bc-meta {
      font-size: 10px;
      opacity: 0.75;
      margin: 10px 0 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ocm-bc-height {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin: 8px 0 0;
      text-align: center;
      font-family: ${T.heading};
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: ${T.textAdaptive};
    }

    .ocm-gallery-view {
      display: flex;
      align-items: flex-start;
      gap: 28px;
    }

    .ocm-sidebar {
      flex: 0 0 152px;
      position: sticky;
      /* Park just below the fixed site navbar (--ocm-nav-h is set at runtime
         from the measured navbar height; 69px is the current fallback). */
      top: calc(var(--ocm-nav-h, 69px) + 16px);
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 28px;
    }

    .ocm-sidebar-item {
      font-family: ${T.heading};
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      text-align: center;
      color: ${T.textAdaptiveMuted};
      border: 1px solid ${T.textAdaptiveMuted};
      padding: 10px 14px;
      border-radius: 0;
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    .ocm-sidebar-item:hover {
      color: ${T.textAdaptive};
      border-color: ${T.textAdaptive};
      background: light-dark(rgba(0,0,0,0.05), rgba(255,255,255,0.05));
    }
    .ocm-sidebar-item.ocm-sidebar-active {
      color: ${T.accent};
      border-color: ${T.accent};
      background: rgba(247,147,26,0.10);
    }

    .ocm-gallery-inner { flex: 1; min-width: 0; }

    /* Target ocm-cards-grid AND any Webflow-renamed variants (e.g. ocm-cards-grid-1-2) */
    [class*="ocm-cards-grid"] {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 20px !important;
      background: transparent !important;
      border: none !important;
    }

    .ocm-category-section {
      border: 1px solid light-dark(rgba(0,0,0,0.14), rgba(255,255,255,0.14));
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 24px;
    }

    .ocm-card-chart-full {
      height: auto !important;
      aspect-ratio: 680 / 380;
      overflow: visible;
    }

    .ocm-card-toprow {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 12px;
      margin: 2px 0 8px;
    }

    .ocm-card-periods {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }

    .ocm-card-headline {
      font-family: ${T.heading};
      font-size: 22px;
      font-weight: 600;
      color: ${T.accent};
      letter-spacing: 0.01em;
      text-align: right;
      white-space: nowrap;
    }
    .ocm-card-period-btn {
      font-family: ${T.heading};
      font-size: 10px;
      letter-spacing: 0.04em;
      /* Real buttons: reset the UA look, keep the pill. 24px minimum target (WCAG 2.5.8). */
      display: inline-flex; align-items: center;
      min-height: 24px;
      padding: 4px 10px;
      background: none;
      border: 0;
      font-weight: inherit;
      line-height: 1;
      border-radius: 3px;
      color: ${T.muted};
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
    }
    .ocm-card-period-btn:hover { color: ${T.textAdaptive}; }
    .ocm-card-period-btn.ocm-card-period-active {
      color: ${T.accent};
      background: rgba(247,147,26,0.12);
    }

    /* Scale toggle: identical pill to a period button (same size, same
       padding, same weight). Only a wider gap sets it apart. */
    .ocm-card-scale-btn { margin-left: 10px; }

    /* The Webflow shell ships two card markups: on some cards "see more"
       is an <a>, which the site's link styles render bold and underlined,
       on others a <span>. Pin both to the same control so the grid reads
       as one set. The tag selector is needed to outrank the link styles. */
    .ocm-see-more,
    .ocm-card a.ocm-see-more,
    .ocm-card a.ocm-see-more:hover,
    .ocm-card a.ocm-see-more:visited {
      font-family: ${T.heading};
      font-size: 11px;
      /* Bold, never underlined: it has to carry the same visual weight as
         the headline figure, otherwise the only action on the card
         disappears into the background. */
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      text-decoration: none;
      border-bottom: 0;
      color: ${T.accent};
      cursor: pointer;
    }

    /* Headings inside cards — covers WHTML-inserted cards without the
       Webflow ocm-card-title class (same values, so existing cards unaffected). */
    .ocm-card h3 {
      font-family: ${T.heading};
      font-size: 17px;
      font-weight: 500;
      line-height: 1.2;
      color: ${T.textAdaptive};
      margin: 0 0 4px;
    }

    /* Card meta container — styles the direct text in WHTML-inserted cards
       where the subtitle lives directly in .ocm-card-meta (not in p.ocm-card-sub).
       Inherited values are overridden by child elements in existing Webflow cards. */
    .ocm-card-meta {
      font-size: 12px;
      font-weight: 300;
      color: ${T.muted};
    }

    /* Keyboard focus, same accent as the active state so it reads as one system. */
    .ocm-card-period-btn:focus-visible,
    .ocm-sidebar-item:focus-visible,
    .ocm-related-link:focus-visible {
      outline: 2px solid ${T.accent};
      outline-offset: 2px;
    }
    /* The sidebar entries are buttons now (they were divs): reset the UA button look. */
    .ocm-sidebar-item { background: none; font: inherit; cursor: pointer; }
    .ocm-sidebar-item {
      font-family: ${T.heading};
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .ocm-related-link { display: block; color: inherit; text-decoration: none; }
    .ocm-related-link:hover { background: rgba(128,128,128,0.08); }

    @keyframes ocm-pending-pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.2; }
    }
    .ocm-block-cube--pending {
      animation: ocm-pending-pulse 1.5s ease-in-out infinite;
    }
    .ocm-blockstrip > .ocm-block-cube--pending:nth-child(1) { animation-delay:  0s;     }
    .ocm-blockstrip > .ocm-block-cube--pending:nth-child(2) { animation-delay: -0.25s;  }
    .ocm-blockstrip > .ocm-block-cube--pending:nth-child(3) { animation-delay: -0.5s;   }

    .ocm-block-explorer {
      text-decoration: none;
      opacity: 0.45;
      transition: opacity 0.2s;
    }
    .ocm-block-explorer:hover { opacity: 1; }
    .ocm-block-explorer-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      height: 100%;
      padding: 0 14px;
      box-sizing: border-box;
    }

    @media (max-width: 700px) {
      /* Safety net: iOS Safari lets the whole page pan sideways the
         moment any element overflows by a pixel. Clip at the root so
         the page always stays centered. */
      html, body {
        overflow-x: hidden !important;
        overflow-x: clip !important;
        max-width: 100vw;
      }
      /* Long headline values (e.g. "912,345 addresses") were overflowing
         the card on narrow screens — let the top row wrap instead. */
      .ocm-card-toprow { flex-wrap: wrap; }
      .ocm-card-headline {
        font-size: 19px;
        white-space: normal;
        text-align: left;
        overflow-wrap: anywhere;
      }
      .ocm-gallery-view {
        flex-direction: column;
        gap: 16px;
        padding-left: 2% !important;
        padding-right: 2% !important;
      }
      .ocm-sidebar {
        flex: 0 0 auto;
        flex-direction: row;
        overflow-x: auto;
        /* Stays pinned under the navbar while the block strip and everything
           above it scrolls away. Full-bleed background masks the cards that
           scroll behind it. */
        position: sticky;
        top: var(--ocm-nav-h, 69px);
        /* Above the chart cards, but below the site navbar (z-index 2) so the
           mobile menu, which lives inside the navbar, covers the bar when open
           instead of the bar showing through on top of it. */
        z-index: 1;
        width: 100%;
        gap: 6px;
        margin: 0 -2%;
        padding: 8px 2%;
        background: light-dark(${T.paper}, ${T.ink});
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .ocm-sidebar::-webkit-scrollbar { display: none; }
      .ocm-sidebar-item { flex: 0 0 auto; align-self: center; white-space: nowrap; }
      [class*="ocm-cards-grid"] { grid-template-columns: 1fr !important; }
      .ocm-category-section { border: none; padding: 0 0 8px; }
    }
  `;
  document.head.appendChild(style);
}
