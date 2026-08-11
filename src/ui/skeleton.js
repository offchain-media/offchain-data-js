/**
 * Loading skeletons — shimmer placeholders shown while chart data loads,
 * and the explicit "unavailable" panel shown when a source can't be reached.
 * Theme-neutral (grey alpha) so they work in both light and dark mode.
 */

import { T } from '../tokens.js';

let injected = false;

export function injectSkeletonStyles() {
  if (injected) return;
  injected = true;
  const st = document.createElement('style');
  st.id = 'ocm-skeleton-styles';
  st.textContent = `
    .ocm-skel {
      position: relative;
      overflow: hidden;
      background: rgba(128,128,128,0.08);
      border-radius: 3px;
    }
    .ocm-skel::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(128,128,128,0.16), transparent);
      transform: translateX(-100%);
      animation: ocm-skel-sweep 1.4s ease-in-out infinite;
    }
    @keyframes ocm-skel-sweep { to { transform: translateX(100%); } }

    /* Fake chart: baseline bars of varying heights inside the block */
    .ocm-skel-chart {
      display: flex;
      align-items: flex-end;
      gap: 6%;
      padding: 12% 8% 10%;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }
    .ocm-skel-chart span {
      flex: 1;
      background: rgba(128,128,128,0.14);
      border-radius: 2px 2px 0 0;
    }

    /* The label states plainly that this is a placeholder, so a slow or
       stalled card never reads as a real (broken-looking) chart. */
    .ocm-skel-label {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: ${T.body};
      font-style: italic;
      font-size: 13px;
      letter-spacing: 0.02em;
      color: rgba(128,128,128,0.75);
      pointer-events: none;
    }

    /* Source unreachable — deliberately not a chart. */
    .ocm-unavail {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 100%;
      height: 100%;
      min-height: 120px;
      box-sizing: border-box;
      padding: 16px;
      text-align: center;
      background: repeating-linear-gradient(
        45deg,
        rgba(128,128,128,0.045) 0 8px,
        transparent 8px 16px
      );
      border: 1px dashed rgba(128,128,128,0.3);
      border-radius: 3px;
    }
    .ocm-unavail-title {
      font-family: ${T.heading};
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(128,128,128,0.9);
    }
    .ocm-unavail-note {
      font-family: ${T.body};
      font-style: italic;
      font-size: 12px;
      line-height: 1.5;
      color: rgba(128,128,128,0.65);
      max-width: 34ch;
    }

    @media (prefers-reduced-motion: reduce) {
      .ocm-skel::after { animation: none; }
    }
  `;
  document.head.appendChild(st);
}

/**
 * chartSkeleton()
 * Returns a skeleton element sized by its parent (width/height 100%):
 * a muted bar shimmer behind an explicit "Loading…" label.
 */
export function chartSkeleton() {
  injectSkeletonStyles();
  const el = document.createElement('div');
  el.className = 'ocm-skel';
  el.style.cssText = 'width:100%;height:100%;';
  const bars = document.createElement('div');
  bars.className = 'ocm-skel-chart';
  [35, 55, 42, 70, 58, 80, 62, 90, 74, 66].forEach(h => {
    const b = document.createElement('span');
    b.style.height = h + '%';
    bars.appendChild(b);
  });
  el.appendChild(bars);

  const label = document.createElement('span');
  label.className = 'ocm-skel-label';
  label.textContent = 'Loading…';
  el.appendChild(label);

  return el;
}

/**
 * unavailablePanel(cfg, { reason })
 * Shown in place of the chart when the source could not be reached.
 *
 * Off-Chain Media publishes numbers, so a failed fetch must never be
 * dressed up as data: the mock series stays out of the DOM entirely and
 * the card says so instead.
 */
export function unavailablePanel(cfg, { reason = '' } = {}) {
  injectSkeletonStyles();
  const el = document.createElement('div');
  el.className = 'ocm-unavail';

  const title = document.createElement('span');
  title.className = 'ocm-unavail-title';
  title.textContent = 'Data unavailable';

  const note = document.createElement('span');
  note.className = 'ocm-unavail-note';
  note.textContent = reason
    || `${cfg?.source || 'The source'} could not be reached. No figure is shown rather than an estimated one.`;

  el.appendChild(title);
  el.appendChild(note);
  return el;
}
