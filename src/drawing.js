/**
 * Off-Chain Media — SVG Drawing Helpers
 * Pure functions, no side effects, no DOM dependencies.
 */

// ─── Seeded pseudo-random (consistent jitter across renders) ─────
export function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// ─── SVG element factory ─────────────────────────────────────────
export function svgEl(tag, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

// ─── Smooth Catmull-Rom path with optional jitter ────────────────
/**
 * smoothPath(pts, jitter, seed)
 * @param {Array<{x,y}>} pts
 * @param {number} jitter  — max pixel wobble per point (0 = clean)
 * @param {number} seed    — seed for consistent randomness
 * @returns SVG path string (M ... C ...)
 */
export function smoothPath(pts, jitter = 1.0, seed = 1) {
  const rand = seededRand(seed);
  const j    = pts.map(p => ({
    x: p.x + (rand() - 0.5) * jitter,
    y: p.y + (rand() - 0.5) * jitter,
  }));
  if (j.length < 2) return '';

  let d = `M${j[0].x.toFixed(2)},${j[0].y.toFixed(2)}`;
  for (let i = 0; i < j.length - 1; i++) {
    const p0  = j[Math.max(0, i - 1)];
    const p1  = j[i];
    const p2  = j[i + 1];
    const p3  = j[Math.min(j.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }
  return d;
}

// ─── Hand-drawn wobbly circle ────────────────────────────────────
/**
 * sketchCircle(cx, cy, r)
 * Returns an SVG path string for a slightly imperfect circle —
 * used as the end-point marker on full charts.
 */
export function sketchCircle(cx, cy, r) {
  const rand  = seededRand(Math.round(cx + cy));
  const start = rand() * Math.PI;
  const pts   = [];
  for (let a = 0; a <= Math.PI * 2 * 1.15; a += 0.3) {
    const rr = r + (rand() - 0.5) * 1.5;
    pts.push(
      `${(cx + Math.cos(a + start) * rr).toFixed(1)},` +
      `${(cy + Math.sin(a + start) * rr).toFixed(1)}`
    );
  }
  return 'M' + pts.join(' L');
}

// ─── Value → axis position ───────────────────────────────────────
/**
 * makeScale(values, mode)
 * Builds the vertical scale shared by the curve, the bars and the grid,
 * so all three always agree on where a value sits.
 *
 * @param {number[]} values
 * @param {'lin'|'log'} mode
 * @returns {{
 *   log: boolean, min: number, max: number, range: number,
 *   toUnit: (v: number) => number,   // value  → 0..1 (0 = bottom)
 *   fromUnit: (t: number) => number, // 0..1   → value
 * }}
 *
 * Log mode needs strictly positive values, so it ignores zeros and
 * negatives when computing the extent and clamps them to the smallest
 * positive value when plotting. A series with no positive value at all
 * silently stays linear — a log axis would be meaningless there.
 */
export function makeScale(values, mode = 'lin') {
  const finite = values.filter(v => Number.isFinite(v));
  const usable = finite.length ? finite : [0, 1];
  const positives = usable.filter(v => v > 0);

  if (mode !== 'log' || !positives.length) {
    const min   = Math.min(...usable);
    const max   = Math.max(...usable);
    const range = max - min || 1;
    return {
      log: false, min, max, range,
      toUnit:   v => (v - min) / range,
      fromUnit: t => min + t * range,
    };
  }

  const min = Math.min(...positives);
  const max = Math.max(...positives);
  const lo  = Math.log10(min);
  // A flat series would give a zero-wide span: open it up by a decade
  // so the curve lands mid-axis instead of dividing by zero.
  const hi   = Math.log10(max);
  const span = (hi - lo) || 1;

  return {
    log: true, min, max, range: max - min || 1,
    toUnit:   v => (Math.log10(Math.max(v, min)) - lo) / span,
    fromUnit: t => 10 ** (lo + t * span),
  };
}

// ─── Data → SVG points ───────────────────────────────────────────
/**
 * dataToPoints(data, PAD, CW, CH, mode)
 * Converts normalized data array to SVG pixel coordinates.
 * @param {'lin'|'log'} mode  — vertical scale (default linear)
 * @returns { points: Array<{x,y,d}>, min, max, range, scale }
 */
export function dataToPoints(data, PAD, CW, CH, mode = 'lin') {
  const scale = makeScale(data.map(d => d.v), mode);
  const points = data.map((d, i) => ({
    x: PAD.left + (i / (data.length - 1)) * CW,
    y: PAD.top  + CH - scale.toUnit(d.v) * CH,
    d,
  }));
  return { points, min: scale.min, max: scale.max, range: scale.range, scale };
}
