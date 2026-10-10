/**
 * Off-Chain Media — Editorial Content
 * Keyed by chart id.
 *
 * Fields:
 *   measures   — what the metric actually tracks
 *   importance — why it matters for Bitcoin
 *   update     — optional dated editorial take. Left out on purpose: the
 *                monthly takes written in 2026 went stale and showed dated
 *                prices as current. The full, evergreen analysis of each
 *                metric lives on offchain.media/charts/<id>. When `update` is
 *                missing, the detail view hides the "Off-Chain Editorial" block.
 */
export const EDITORIAL = {
  'btc-price': {
    measures:   'The spot price of Bitcoin in USD, volume-weighted across major exchanges.',
    importance: 'The most watched metric in Bitcoin. Price discovery reflects the aggregate conviction of every market participant — miners, holders, speculators, institutions.',
  },
  'market-cap': {
    measures:   'Total circulating supply × current price. A proxy for Bitcoin\'s weight relative to other global assets.',
    importance: 'Contextualizes Bitcoin within the broader asset landscape. Useful for macro comparisons, though not all BTC is liquid.',
  },
  'volume': {
    measures:   'Total spot trading volume aggregated across major exchanges over a rolling 24-hour window.',
    importance: 'Volume validates price moves. High volume on a breakout signals conviction; low volume on a rally signals fragility.',
  },
  // Note: this id still reads "dominance" for URL stability, but the
  // series is circulating supply. No free historical dominance source
  // exists, so the chart was reassigned (see fetchCircSupply in data.js).
  'dominance': {
    measures:   'The total number of bitcoin mined since the genesis block, out of the 21 million the protocol will ever create.',
    importance: 'This is Bitcoin\'s monetary policy made visible. Issuance is fixed, public, and halves roughly every four years, so the curve flattens on a schedule nobody can renegotiate.',
  },
  'hashrate': {
    measures:   'Estimated total computational power in exahashes per second dedicated to mining Bitcoin blocks.',
    importance: 'Hashrate is the thermometer of miner conviction. Rising hashrate means miners are betting on Bitcoin\'s future — they\'ve committed capital months in advance.',
  },
  'difficulty': {
    measures:   'The target threshold that determines how hard it is to find a valid block hash. Recalibrates every ~2,016 blocks (~2 weeks).',
    importance: 'Difficulty is Bitcoin\'s self-regulating immune system. It ensures blocks arrive every ~10 minutes regardless of hashpower fluctuations.',
  },
  'block-fees': {
    measures:   'Average transaction fees included per block, in BTC.',
    importance: 'Tracks the critical transition from subsidy-dependent to fee-dependent miner security — one of Bitcoin\'s most important long-term metrics.',
  },
  'hashprice': {
    measures:   'Estimated daily USD revenue a miner earns per terahash of computational power deployed.',
    importance: 'The single most important metric for miner economics. When hash price falls below production cost, capitulation follows.',
  },
  'active-addresses': {
    measures:   'The number of unique Bitcoin addresses that appeared in at least one transaction on a given day.',
    importance: 'A rough proxy for network usage. Rising active addresses during price increases suggests organic demand rather than speculative leverage.',
  },
  // Note: this id still reads "lth-supply" for URL stability, but the
  // series is daily miner revenue. Coin Metrics paywalls SplyAct1yr on
  // the community plan, so the chart was reassigned (see fetchMinerRevenue).
  'lth-supply': {
    measures:   'The bitcoin miners earn each day, combining the block subsidy with the transaction fees paid in that day\'s blocks.',
    importance: 'This is the network\'s security budget, what it costs to keep mining honest. Every halving cuts the subsidy in half, so the long-run question is whether fee income grows enough to replace it.',
  },
  'exchange-balance': {
    measures:   'Aggregate Bitcoin balance held across known exchange wallets.',
    importance: 'Declining exchange balances suggest coins moving to self-custody — a supply squeeze signal. Rising balances suggest potential sell pressure.',
  },
  'nvt': {
    measures:   'Market cap divided by daily on-chain transaction volume in USD. Think of it as a P/E ratio for Bitcoin.',
    importance: 'High NVT = the network is valued richly relative to usage. Low NVT = undervalued or usage is spiking.',
  },
  'mempool-size': {
    measures:   'Total size of unconfirmed transactions waiting in the mempool, measured in virtual megabytes.',
    importance: 'The most immediate indicator of network congestion and fee pressure. A full mempool means fee competition is live.',
  },
  'fee-rates': {
    measures:   'The median fee rate, in sat/vB, paid by transactions included in mined blocks.',
    importance: 'Fees are the price of block space: they set the cost of moving coins on-chain, including into self-custody, and will increasingly fund network security.',
  },
  'tx-per-second': {
    measures:   'Average number of on-chain transactions confirmed per second over a rolling 24-hour window.',
    importance: 'Bitcoin\'s base layer throughput is deliberately limited. This metric contextualizes the need for Layer 2 solutions.',
  },
  'block-weight': {
    measures:   'Average weight of mined blocks in million weight units. Max is 4 MWU. Measures how full the available block space is.',
    importance: 'Consistently full blocks mean fee competition is structural, not temporary. Makes the block size debate concrete.',
  },
};
