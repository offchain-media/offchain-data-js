/**
 * Off-Chain Media — mempool.space CORS proxy
 *
 * mempool.space rejects browser requests (no CORS headers), so the
 * /data page calls this Worker instead. It forwards the mempool.space
 * paths the bundle actually uses and adds CORS headers for offchain.media.
 *
 * Hardened on 2026-09-30: only GET, only an allow-list of paths (an open
 * relay could be used by anyone to burn the daily Workers quota or get the
 * Worker's egress IP blocked by mempool.space), no query string forwarded
 * (no fetcher sends one, and an unknown parameter used to bypass the edge
 * cache on every request), and `Vary: Origin` so caches keep the CORS
 * header per origin.
 *
 * Deploy: see worker/README.md
 */

const ALLOWED_ORIGINS = [
  'https://offchain.media',
  'https://www.offchain.media',
];

function corsOrigin(req) {
  const origin = req.headers.get('Origin') || '';
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  if (origin.endsWith('.webflow.io')) return origin; // Webflow staging/preview
  return ALLOWED_ORIGINS[0];
}

// Every mempool.space path the bundle calls (src/data.js). A prefix ending
// with "/" accepts the interval suffix (1w, 1m, 3m, 1y, all…).
const ALLOWED_PATHS = [
  '/api/v1/mining/hashrate/',
  '/api/v1/mining/difficulty-adjustments/',
  '/api/v1/mining/blocks/fees/',
  '/api/v1/mining/blocks/fee-rates/',
  '/api/v1/mining/blocks/sizes-weights/',
  '/api/v1/mining/blocks/rewards/',
  '/api/v1/mining/pools/',
  '/api/v1/statistics/',
  '/api/v1/lightning/statistics/',
  '/api/v1/lightning/nodes/countries',
  '/api/v1/lightning/nodes/isp-ranking',
  '/api/v1/fees/mempool-blocks',
  '/api/v1/blocks',
];
const SUFFIX = /^[a-z0-9]{0,8}$/; // interval after a prefix: "1y", "3m", "all"…

function allowed(pathname) {
  return ALLOWED_PATHS.some(p => pathname === p || (p.endsWith('/') && pathname.startsWith(p) && SUFFIX.test(pathname.slice(p.length))));
}

// Live endpoints (current mempool / latest blocks) change every few
// seconds; everything else is historical series that only gain one
// point per day/block — cache those hard at the edge so visitors never
// wait on mempool.space (2-10s on the big series when uncached).
const LIVE_PATHS = [
  '/api/v1/fees/mempool-blocks',
  '/api/v1/blocks',
];
const LIVE_TTL    = 60;     // 1 min at the edge
const HISTORY_TTL = 21600;  // 6 h at the edge

function edgeTtl(pathname) {
  return LIVE_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))
    ? LIVE_TTL
    : HISTORY_TTL;
}

export default {
  async fetch(req) {
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': corsOrigin(req),
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Max-Age': '86400',
          'Vary': 'Origin',
        },
      });
    }
    if (req.method !== 'GET' || !allowed(url.pathname)) {
      return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
    }
    const ttl = edgeTtl(url.pathname);
    const r = await fetch('https://mempool.space' + url.pathname, {
      headers: { 'User-Agent': 'offchain-media/1.0' },
      cf: { cacheEverything: true, cacheTtlByStatus: { '200-299': ttl, '404': 60, '500-599': 0 } },
    });
    return new Response(r.body, {
      status: r.status,
      headers: {
        'Content-Type': r.ok ? 'application/json' : 'text/plain',
        'Access-Control-Allow-Origin': corsOrigin(req),
        'Vary': 'Origin',
        // Browser cache: short for live data, 30 min for history
        // (the client-side localStorage layer handles longer reuse).
        'Cache-Control': !r.ok ? 'no-store' : ttl === LIVE_TTL
          ? 'public, max-age=60'
          : 'public, max-age=1800',
      },
    });
  },
};
