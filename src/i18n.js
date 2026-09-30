/**
 * Off-Chain Media — interface strings of the bundle, in the language of the host page.
 * The page declares its language on <html lang>; the French dashboard (/fr/data, /fr/charts) is server-rendered in
 * French, so in French the bundle keeps the texts already in the page and only writes what it creates itself.
 */
export const LANG = (typeof document !== 'undefined' && /^fr/i.test(document.documentElement.lang || '')) ? 'fr' : 'en';

const STRINGS = {
  en: {
    seeMore: 'See more →', unavailable: 'Data unavailable', loading: 'Loading…', allCharts: '← All charts', source: 'Source: ',
    unreachable: (src) => `${src || 'The source'} could not be reached. No figure is shown rather than an estimated one.`,
    period: 'period', latest: 'latest value', ranking: (n) => `ranking of ${n} entries`, first: (name, v) => `first ${name} with ${v}`,
    categories: {},
  },
  fr: {
    seeMore: 'Voir plus →', unavailable: 'Données indisponibles', loading: 'Chargement…', allCharts: '← Tous les graphiques', source: 'Source : ',
    unreachable: (src) => `${src || 'La source'} n'a pas répondu. Aucun chiffre n'est affiché plutôt qu'une estimation.`,
    period: 'période', latest: 'dernière valeur', ranking: (n) => `classement de ${n} entrées`, first: (name, v) => `premier ${name} avec ${v}`,
    categories: { market: 'Marché', mining: 'Minage', 'on-chain': 'On-chain', lightning: 'Lightning', mempool: 'Mempool' },
  },
};
export const UI = STRINGS[LANG];

/** Link to a chart page in the language of the host page. */
export const chartPath = (id) => (LANG === 'fr' ? '/fr/charts/' : '/charts/') + id;

/** True when the page already carries a translated text for this element: leave it alone. */
export const keepPageText = (el) => LANG === 'fr' && !!el && el.textContent.trim() !== '';
