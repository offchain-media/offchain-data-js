/**
 * Detail UI
 * Handles: full chart rendering, editorial content, period selector, related charts.
 */

import { UI, chartPath, keepPageText } from '../i18n.js';
import { CATALOG } from '../catalog.js';
import { EDITORIAL } from '../editorial.js';
import { loadData, slicePeriod, fmtVal } from '../data.js';
import { drawFullChart } from '../charts/fullchart.js';
import { chartSkeleton, unavailablePanel } from './skeleton.js';
import { T } from '../tokens.js';

// Log scale is a view setting, not a data setting: it survives the
// period switches that re-run renderDetail, and resets per chart.
let _logScale = false;
let _logScaleFor = null;

/**
 * _ensureScaleBtn(el, chartId, onToggle)
 * Adds the LOG/LIN toggle next to the static period buttons the Webflow
 * shell ships with. Injected from JS so the shell markup stays untouched.
 */
function _ensureScaleBtn(el, onToggle) {
  const bar = el.querySelector('.ocm-period-selector');
  if (!bar) return null;

  let btn = bar.querySelector('.ocm-scale-btn');
  if (!btn) {
    btn = document.createElement('a');
    btn.className = 'ocm-period-btn ocm-scale-btn w-button';
    btn.href = '#';
    btn.style.marginLeft = '10px';
    btn.addEventListener('click', e => {
      e.preventDefault();
      onToggle();
    });
    bar.appendChild(btn);
  }

  btn.textContent = _logScale ? 'LIN' : 'LOG';
  btn.title = _logScale ? 'Back to linear scale' : 'Switch to logarithmic scale';
  btn.setAttribute('aria-pressed', String(_logScale));
  btn.classList.toggle('ocm-period-active', _logScale);
  return btn;
}

/**
 * renderDetail(chartId, period)
 * Fills the .ocm-detail-view with content for the given chart + period.
 */
export async function renderDetail(chartId, period) {
  const cfg = CATALOG.find(c => c.id === chartId);
  const ed  = EDITORIAL[chartId] || {};
  const el  = document.querySelector('.ocm-detail-view');
  if (!cfg || !el) return;

  // Breadcrumb
  const catEl = el.querySelector('.ocm-breadcrumb-cat');
  if (catEl) catEl.textContent = _fmtCat(cfg.category);

  // Title + subtitle
  _setText(el, '.ocm-detail-title',    cfg.title);
  _setText(el, '.ocm-detail-subtitle', cfg.subtitle);

  // Editorial
  _setText(el, '.ocm-measures-text',   ed.measures   || '');
  _setText(el, '.ocm-importance-text', ed.importance || '');
  _setText(el, '.ocm-editorial-text',  ed.update     || '');
  // No editorial take for this chart: hide the block rather than show an empty heading.
  el.querySelectorAll('.ocm-editorial-divider, .ocm-editorial-right').forEach(node => {
    node.style.display = ed.update ? '' : 'none';
  });

  // Period buttons ([data-period] skips the injected scale toggle)
  el.querySelectorAll('.ocm-period-selector [data-period]').forEach(btn => {
    btn.classList.toggle('ocm-period-active', btn.dataset.period === period);
  });

  // Scale toggle — reset when moving to a different chart
  if (_logScaleFor !== chartId) {
    _logScale = false;
    _logScaleFor = chartId;
  }
  _ensureScaleBtn(el, () => {
    _logScale = !_logScale;
    renderDetail(chartId, period);
  });

  // Loading state
  const readingLoading = el.querySelector('.ocm-reading-value');
  if (readingLoading) readingLoading.textContent = UI.loading;
  const chartEl = el.querySelector('.ocm-detail-chart');
  if (chartEl) {
    chartEl.innerHTML = '';
    const skel = chartSkeleton();
    skel.style.minHeight = '300px';
    chartEl.appendChild(skel);
  }

  // Fetch data — full history only when the ALL period is requested
  const { data, live } = await loadData(cfg.api, { full: period === 'ALL' });
  const sliced = slicePeriod(data, period);
  const last   = sliced[sliced.length - 1];
  const readingEl = el.querySelector('.ocm-reading-value');

  // Source unreachable: show that plainly instead of a mock series that
  // no reader could distinguish from a real one.
  if (!live) {
    if (readingEl) readingEl.textContent = UI.unavailable;
    const bar = el.querySelector('.ocm-period-selector');
    if (bar) bar.style.display = 'none';
    if (chartEl) {
      chartEl.innerHTML = '';
      chartEl.appendChild(unavailablePanel(cfg));
    }
    _renderRelated(el, cfg);
    return;
  }

  const bar = el.querySelector('.ocm-period-selector');
  if (bar) bar.style.display = '';

  // Reading value
  if (readingEl && last) {
    readingEl.textContent = fmtVal(last.v, cfg.unit);
  }

  // Full chart
  if (chartEl) drawFullChart(chartEl, data, cfg, period, { scale: _logScale ? 'log' : 'lin' });

  // Related charts
  _renderRelated(el, cfg);
}

// ── Related charts ─────────────────────────────────────────────────
function _renderRelated(el, cfg) {
  const grid = el.querySelector('.ocm-related-grid');
  if (!grid) return;

  grid.innerHTML = '';
  CATALOG
    .filter(c => c.category === cfg.category && c.id !== cfg.id)
    .slice(0, 4)
    .forEach(c => {
      // A real link (was a div): keyboard users can reach it, and it still opens in place through the router.
      const div = document.createElement('a');
      div.className = 'ocm-related-link';
      div.href = chartPath(c.id);
      div.style.cssText = 'padding:14px 16px;cursor:pointer;transition:background 0.15s';
      div.innerHTML = `
        <h3 style="font-family:${T.heading};font-size:14px;font-weight:500;margin:0 0 4px;color:${T.textAdaptive}">${c.title}</h3>
        <p style="font-size:12px;color:${T.muted};margin:0;font-style:italic;font-family:${T.body}">${c.subtitle}</p>
      `;
      div.addEventListener('click', (e) => {
        e.preventDefault();
        // Re-dispatch to main router via custom event
        document.dispatchEvent(new CustomEvent('ocm:openChart', { detail: c.id }));
      });
      div.addEventListener('mouseenter', () => div.style.background = 'rgba(128,128,128,0.08)');
      div.addEventListener('mouseleave', () => div.style.background = '');
      grid.appendChild(div);
    });
}

// ── Helpers ────────────────────────────────────────────────────────
function _setText(root, selector, text) {
  const el = root.querySelector(selector);
  // The French pages already carry the translated title, subtitle and editorial texts: keep them.
  if (el && !keepPageText(el)) el.textContent = text;
}

function _fmtCat(cat) {
  return cat.replace('-', ' ').toUpperCase();
}
