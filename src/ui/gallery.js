/**
 * Gallery UI
 * Handles: sidebar filtering, lazy-loaded interactive chart cards.
 */

import { CATALOG } from '../catalog.js';
import { loadData, slicePeriod, fmtValBig } from '../data.js';
import { drawFullChart } from '../charts/fullchart.js';
import { initSidebar } from './sidebar.js';
import { injectGalleryStyles } from './styles.js';
import { chartSkeleton, unavailablePanel } from './skeleton.js';
import { T } from '../tokens.js';

const CARD_PERIODS   = ['1W', '1M', '3M', '1Y', 'ALL'];
const DEFAULT_PERIOD = '1Y';
// How far outside the viewport a card counts as "worth drawing now".
// Kept in one place so the observer and the safety net agree.
const NEAR_VIEWPORT_PX = 200;
// The safety net re-checks visible-but-still-blank cards on this beat.
const SWEEP_MS = 2000;
// Preference order when picking the best available period
const PERIOD_PREF    = ['1Y', '3M', '1M', '1W', 'ALL'];
// Required min span (days) per period — data must actually *cover* this range
const PERIOD_DAYS    = { '1W': 7, '1M': 30, '3M': 90, '1Y': 365 };

// A period button is only shown when data genuinely spans that window.
// Prevents e.g. "1Y" appearing when the source only has 90 days of history.
function _hasCoverage(data, period) {
  const sliced = slicePeriod(data, period);
  if (!sliced.length) return false;
  if (period === 'ALL') return true;
  const days = PERIOD_DAYS[period];
  if (!days) return false;
  const spanDays = sliced.length > 1
    ? (sliced[sliced.length - 1].ts - sliced[0].ts) / 86_400_000
    : 0;
  return spanDays >= days * 0.7;
}

/**
 * initGallery(onCardClick)
 * @param {Function} onCardClick  — called with chartId when "See more" is clicked
 */
export async function initGallery(onCardClick) {
  injectGalleryStyles();
  // Sidebar is now scroll navigation (scrollspy), not a filter: every
  // category section stays on the page at all times.
  initSidebar();
  await _initCards(onCardClick);
}

// ── Card initialization ────────────────────────────────────────────
// Rendering stays lazy (24 charts is a lot of SVG to build up front),
// but "lazy" must not mean "maybe". Three things drive a mount:
//   1. an immediate pass over whatever is already on screen at open,
//      so the first cards never wait on the observer's first callback;
//   2. the IntersectionObserver, for normal scrolling;
//   3. a periodic sweep that catches any visible card still blank —
//      a jumped-over scroll position, a mount that threw, a callback
//      that never came.
// _mountCard is idempotent, so the three can safely overlap.
const _mounted  = new WeakSet();   // finished (drawn, or shown as unavailable)
const _mounting = new WeakSet();   // in flight

function _isNearViewport(el, margin = NEAR_VIEWPORT_PX) {
  const r = el.getBoundingClientRect();
  // A collapsed box (display:none, not laid out yet) is not "visible".
  if (r.width === 0 && r.height === 0) return false;
  return r.bottom > -margin && r.top < (window.innerHeight || 0) + margin;
}

// Redraws any card that is on screen but still showing its placeholder.
// Stops once every card has been mounted; until then the cost is one
// getBoundingClientRect per pending card every couple of seconds.
// Deliberately runs whether or not the tab is in the foreground: a
// backgrounded or prerendered tab is precisely where the observer is
// least likely to have fired, and the work is bounded anyway.
function _startSweep(cards) {
  const timer = setInterval(() => {
    const pending = cards.filter(c => !_mounted.has(c));
    if (!pending.length) { clearInterval(timer); return; }

    pending.forEach(card => {
      if (_mounting.has(card)) return;
      if (_isNearViewport(card)) _mountCard(card);
    });
  }, SWEEP_MS);
}

async function _initCards(onCardClick) {
  const cards = [...document.querySelectorAll('.ocm-card')].filter(card => {
    const chartId = card.dataset.chartId;
    return chartId && CATALOG.some(c => c.id === chartId);
  });

  cards.forEach(card => {
    const chartId = card.dataset.chartId;

    const seeMore = card.querySelector('.ocm-see-more');
    if (seeMore) {
      // The shell spells this "SEE MORE →" on some cards and "See more →"
      // on others; one label for the whole grid.
      seeMore.textContent = 'See more →';
      seeMore.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        // Navigate to the chart's dedicated CMS page
        window.location.href = `/charts/${chartId}`;
      });
    }

    // Skeleton immediately, so cards never sit empty while data loads
    const chartDiv = card.querySelector('.ocm-card-chart');
    if (chartDiv && !chartDiv.firstChild) {
      chartDiv.classList.add('ocm-card-chart-full');
      chartDiv.appendChild(chartSkeleton());
    }

    // The footer reading duplicated the headline figure, so it stays
    // hidden. Hidden from the start too, otherwise its static "Loading…"
    // sits under a skeleton that already says the same thing. The
    // unavailable state brings it back to carry its message.
    const readingEl = card.querySelector('.ocm-card-reading');
    if (readingEl) readingEl.style.display = 'none';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) _mountCard(entry.target);
    });
  }, { rootMargin: `${NEAR_VIEWPORT_PX}px 0px` });

  // Cards are deliberately never unobserved: unobserving on first
  // intersection meant a mount that failed could never be retried.
  cards.forEach(card => observer.observe(card));

  // Draw what is already on screen right now, without waiting for the
  // observer to deliver its first batch.
  cards.forEach(card => { if (_isNearViewport(card)) _mountCard(card); });

  _startSweep(cards);

  // Off-screen charts: warm the cache during idle time so scrolling
  // (and navigation to /charts/<slug>) finds data already loaded.
  // The request queue in data.js paces these behind visible charts.
  const idle = window.requestIdleCallback || (fn => setTimeout(fn, 2500));
  idle(() => { CATALOG.forEach(c => { loadData(c.api).catch(() => {}); }); });
}

async function _mountCard(card) {
  if (_mounted.has(card) || _mounting.has(card)) return;

  const chartId = card.dataset.chartId;
  const cfg     = CATALOG.find(c => c.id === chartId);
  if (!cfg) return;

  const chartDiv = card.querySelector('.ocm-card-chart');
  if (!chartDiv) return;

  _mounting.add(card);
  try {
    await _renderCard(card, cfg, chartDiv);
    _mounted.add(card);
  } catch (err) {
    // Leave the card unmounted so the sweep retries it, and never let a
    // single bad card take down the rest of the page.
    console.warn(`[gallery] card "${chartId}" failed to mount:`, err);
  } finally {
    _mounting.delete(card);
  }
}

async function _renderCard(card, cfg, chartDiv) {
  chartDiv.classList.add('ocm-card-chart-full');

  const { periodBar, headline, scaleBtn } = _buildTopRow(card);

  let { data, live } = await loadData(cfg.api);
  let currentPeriod = DEFAULT_PERIOD;
  let logScale      = false;

  // Full history is only fetched when the user clicks ALL (lazy)
  let fullRequested = false;
  const ensureFullData = async () => {
    if (fullRequested) return;
    fullRequested = true;
    // A failed "full" fetch must not swap live data for an invented
    // series: keep the bounded window already on screen.
    const full = await loadData(cfg.api, { full: true });
    if (full.live) data = full.data;
  };

  // Overwrite Webflow static title text with catalog title (fixes mismatches like "BTC Dominance")
  const titleEl = card.querySelector('h1, h2, h3, h4, h5, h6');
  if (titleEl && cfg.title) titleEl.textContent = cfg.title;

  const readingEl = card.querySelector('.ocm-card-reading');

  // Source unreachable: data.js handed back an invented series. Show the
  // card as unavailable rather than a chart nobody can tell from a real
  // one, and stop here — no periods, no scale toggle, no figure.
  if (!live) {
    chartDiv.style.cssText = '';
    chartDiv.innerHTML = '';
    chartDiv.appendChild(unavailablePanel(cfg));
    periodBar.style.display = 'none';
    scaleBtn.style.display  = 'none';
    // No figure at all rather than a placeholder glyph the eye reads as one
    headline.textContent    = '';
    if (readingEl) {
      readingEl.style.display = '';
      readingEl.textContent   = 'Data unavailable';
    }
    return;
  }

  // Ranking charts: hide period buttons (snapshot data, no time filtering)
  if (cfg.type === 'ranking') {
    periodBar.style.display = 'none';
    currentPeriod = 'ALL';
  }

  // Headline: for time-series show latest value; for ranking show top item's value
  if (cfg.type === 'ranking') {
    const top = [...data].sort((a, b) => b.v - a.v)[0];
    if (top) headline.textContent = fmtValBig(top.v, cfg.unit);
  } else {
    const last = data[data.length - 1];
    if (last) headline.textContent = fmtValBig(last.v, cfg.unit);
  }

  const render = period => {
    drawFullChart(chartDiv, data, cfg, period, { scale: logScale ? 'log' : 'lin' });

    if (!chartDiv.firstChild) {
      chartDiv.style.cssText = 'display:flex;align-items:center;justify-content:center';
      chartDiv.innerHTML = `<span style="font-family:${T.body};font-style:italic;font-size:13px;color:rgba(128,128,128,0.5)">No data for this period</span>`;
    } else {
      chartDiv.style.cssText = '';
    }

  };

  // A log axis is meaningless on a ranking snapshot (bars, no time axis).
  if (cfg.type === 'ranking') {
    scaleBtn.style.display = 'none';
  } else {
    scaleBtn.addEventListener('click', () => {
      logScale = !logScale;
      _syncScaleBtn(scaleBtn, logScale);
      render(currentPeriod);
    });
  }

  // [data-period] rather than the shared button class: the scale toggle
  // sits in the same bar and must not be treated as a period.
  const periodBtns = () => periodBar.querySelectorAll('[data-period]');

  // Ranking charts skip period logic entirely (period bar is already hidden above)
  if (cfg.type !== 'ranking') {
    // Hide period buttons for periods the data doesn't actually cover
    const availablePeriods = CARD_PERIODS.filter(p => _hasCoverage(data, p));
    periodBtns().forEach(btn => {
      btn.style.display = availablePeriods.includes(btn.dataset.period) ? '' : 'none';
    });

    // Pick best starting period: 1Y preferred, fall back to 3M, then first available
    currentPeriod = PERIOD_PREF.find(p => availablePeriods.includes(p)) || availablePeriods[0] || DEFAULT_PERIOD;
    periodBtns().forEach(b =>
      b.classList.toggle('ocm-card-period-active', b.dataset.period === currentPeriod)
    );
  }

  periodBtns().forEach(btn => {
    btn.addEventListener('click', async () => {
      currentPeriod = btn.dataset.period;
      periodBtns().forEach(b =>
        b.classList.toggle('ocm-card-period-active', b === btn)
      );
      if (currentPeriod === 'ALL') await ensureFullData();
      render(currentPeriod);
    });
  });

  render(currentPeriod);
}

function _buildTopRow(card) {
  const meta = card.querySelector('.ocm-card-meta');
  const row  = document.createElement('div');
  row.className = 'ocm-card-toprow';

  const periodBar = document.createElement('div');
  periodBar.className = 'ocm-card-periods';
  CARD_PERIODS.forEach(p => {
    const btn = document.createElement('span');
    btn.className   = 'ocm-card-period-btn' + (p === DEFAULT_PERIOD ? ' ocm-card-period-active' : '');
    btn.textContent = p;
    btn.dataset.period = p;
    periodBar.appendChild(btn);
  });

  // Scale toggle sits with the period buttons: same row, same look,
  // separated by a hair of margin so it reads as a different control.
  const scaleBtn = document.createElement('span');
  scaleBtn.className = 'ocm-card-period-btn ocm-card-scale-btn';
  _syncScaleBtn(scaleBtn, false);
  periodBar.appendChild(scaleBtn);

  const headline = document.createElement('span');
  headline.className = 'ocm-card-headline';

  row.appendChild(periodBar);
  row.appendChild(headline);

  if (meta) meta.insertAdjacentElement('afterend', row);
  else card.insertBefore(row, card.firstChild);

  return { periodBar, headline, scaleBtn };
}

/**
 * _syncScaleBtn(btn, isLog)
 * The button always shows the scale you get by pressing it: LOG while
 * the chart is linear, LIN once it has switched to logarithmic.
 */
function _syncScaleBtn(btn, isLog) {
  btn.textContent = isLog ? 'LIN' : 'LOG';
  btn.title = isLog ? 'Back to linear scale' : 'Switch to logarithmic scale';
  btn.setAttribute('aria-pressed', String(isLog));
  btn.classList.toggle('ocm-card-period-active', isLog);
}
