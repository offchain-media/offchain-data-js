/**
 * Off-Chain Media — Data Library
 * Entry point. Boots the /data gallery, or a single chart on /charts/<slug>.
 *
 * Each chart has its own page (/charts/<id>, /fr/charts/<id>) carrying the
 * chart and its full editorial text in the page's language. The former
 * in-page detail view (/data?chart=<id>) duplicated it with thinner,
 * English-only texts: it is gone, and a ?chart= link now forwards to the
 * chart page. The site's Worker already answers those links with a 301;
 * the redirect below covers any request that still reaches the page.
 */

import { initGallery }      from './ui/gallery.js';
import { renderEmbedChart } from './ui/embed.js';
import { initBlockStrip }   from './ui/blockstrip.js';
import { CATALOG }          from './catalog.js';
import { chartPath }        from './i18n.js';

const openChart = (chartId) => window.location.assign(chartPath(chartId));

// ── Boot ──────────────────────────────────────────────────────────
async function boot() {
  // Embed mode: CMS template pages set window.__OCM__ to the chart id.
  // Fallback: derive the id from a /charts/<slug> URL so template pages
  // work without any per-page inline script.
  const pathMatch = window.location.pathname.match(/^\/charts\/([a-z0-9-]+)\/?$/);
  const pathId    = pathMatch && CATALOG.some(c => c.id === pathMatch[1]) ? pathMatch[1] : null;
  const embedId  = window.__OCM__ || pathId;
  const embedEl  = document.querySelector('.ocm-embed');
  if (embedId && embedEl) {
    await renderEmbedChart(embedEl, embedId);
    return;
  }

  // Old shared links (/data?chart=<id>) land on the chart's own page.
  const linkedChart = new URLSearchParams(window.location.search).get('chart');
  if (linkedChart && CATALOG.some(c => c.id === linkedChart)) {
    window.location.replace(chartPath(linkedChart));
    return;
  }

  initBlockStrip();
  await initGallery(openChart);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
