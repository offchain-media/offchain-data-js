/* Off-Chain Media — Bitcoin Data Library v0.2.0 | offchain.media/data */
var OCMData=(()=>{var ne=typeof document<"u"&&/^fr/i.test(document.documentElement.lang||"")?"fr":"en",St={en:{seeMore:"See more \u2192",unavailable:"Data unavailable",loading:"Loading\u2026",allCharts:"\u2190 All charts",source:"Source: ",unreachable:e=>`${e||"The source"} could not be reached. No figure is shown rather than an estimated one.`,period:"period",latest:"latest value",ranking:e=>`ranking of ${e} entries`,first:(e,t)=>`first ${e} with ${t}`,categories:{},navCategories:"Chart categories"},fr:{seeMore:"Voir plus \u2192",unavailable:"Donn\xE9es indisponibles",loading:"Chargement\u2026",allCharts:"\u2190 Tous les graphiques",source:"Source : ",unreachable:e=>`${e||"La source"} n'a pas r\xE9pondu. Aucun chiffre n'est affich\xE9 plut\xF4t qu'une estimation.`,period:"p\xE9riode",latest:"derni\xE8re valeur",ranking:e=>`classement de ${e} entr\xE9es`,first:(e,t)=>`premier ${e} avec ${t}`,categories:{market:"March\xE9",mining:"Minage","on-chain":"On-chain",lightning:"Lightning",mempool:"Mempool"},navCategories:"Cat\xE9gories de graphiques"}},T=St[ne],pe=e=>(ne==="fr"?"/fr/charts/":"/charts/")+e,Z=e=>ne==="fr"&&!!e&&e.textContent.trim()!=="";var U=[{id:"btc-price",title:"Bitcoin Price",subtitle:"BTC/USD daily reference rate",category:"market",type:"line",api:"price",unit:"$",source:"Coin Metrics"},{id:"market-cap",title:"Market Capitalization",subtitle:"Total BTC market value in USD",category:"market",type:"area",api:"marketcap",unit:"$T",source:"Coin Metrics"},{id:"volume",title:"24h Trading Volume",subtitle:"Aggregate exchange spot volume",category:"market",type:"bar",api:"volume",unit:"$B",source:"CoinGecko"},{id:"dominance",title:"Circulating Supply",subtitle:"Total BTC mined to date",category:"market",type:"area",api:"dominance",unit:"M BTC",source:"Coin Metrics"},{id:"hashrate",title:"Network Hashrate",subtitle:"Total computational power",category:"mining",type:"line",api:"hashrate",unit:"EH/s",source:"mempool.space"},{id:"difficulty",title:"Mining Difficulty",subtitle:"Adjusted every 2,016 blocks",category:"mining",type:"line",api:"difficulty",unit:"T",source:"mempool.space"},{id:"block-fees",title:"Block Fees",subtitle:"Average fees per block",category:"mining",type:"bar",api:"fees",unit:"BTC",source:"mempool.space"},{id:"hashprice",title:"Hash Price",subtitle:"Daily revenue per TH/s",category:"mining",type:"line",api:"hashprice",unit:"$/TH",source:"mempool.space"},{id:"block-rewards",title:"Block Rewards",subtitle:"Average BTC earned per block (subsidy + fees)",category:"mining",type:"area",api:"blockrewards",unit:"BTC",source:"mempool.space"},{id:"mining-pools",title:"Mining Pool Distribution",subtitle:"Share of blocks mined by pool (last 12 months)",category:"mining",type:"ranking",api:"miningpools",unit:"%",source:"mempool.space"},{id:"active-addresses",title:"Active Addresses",subtitle:"Unique addresses used daily",category:"on-chain",type:"area",api:"addresses",unit:"addresses",source:"Coin Metrics"},{id:"lth-supply",title:"Miner Revenue",subtitle:"Daily BTC earned by miners (subsidy + fees)",category:"on-chain",type:"area",api:"lth",unit:"BTC",source:"Coin Metrics"},{id:"exchange-balance",title:"Exchange Balances",subtitle:"Total BTC on exchanges",category:"on-chain",type:"line",api:"exchange",unit:"M BTC",source:"Coin Metrics"},{id:"nvt",title:"Daily Transactions",subtitle:"On-chain transaction count per day",category:"on-chain",type:"bar",api:"nvt",unit:"txns",source:"Coin Metrics"},{id:"lightning-nodes",title:"Lightning Nodes",subtitle:"Number of public Lightning Network nodes",category:"lightning",type:"area",api:"lnnodes",unit:"nodes",source:"mempool.space"},{id:"lightning-channels",title:"Lightning Channels",subtitle:"Total open payment channels",category:"lightning",type:"area",api:"lnchannels",unit:"channels",source:"mempool.space"},{id:"lightning-capacity",title:"Lightning Capacity",subtitle:"Total BTC locked in the Lightning Network",category:"lightning",type:"line",api:"lncapacity",unit:"BTC",source:"mempool.space"},{id:"lightning-avg-channel",title:"Avg Channel Size",subtitle:"Average BTC locked per Lightning channel",category:"lightning",type:"line",api:"lnavgchannel",unit:"BTC",source:"mempool.space"},{id:"lightning-countries",title:"Nodes by Country",subtitle:"Top countries by public Lightning node count",category:"lightning",type:"ranking",api:"lncountries",unit:"nodes",source:"mempool.space"},{id:"lightning-isp",title:"Nodes by ISP",subtitle:"Top internet providers hosting Lightning nodes",category:"lightning",type:"ranking",api:"lnisp",unit:"nodes",source:"mempool.space"},{id:"mempool-size",title:"Mempool Size",subtitle:"Pending transactions in vBytes",category:"mempool",type:"area",api:"mempool",unit:"MB",source:"mempool.space"},{id:"fee-rates",title:"Fee Rate Distribution",subtitle:"sat/vB by confirmation priority",category:"mempool",type:"bar",api:"feerates",unit:"sat/vB",source:"mempool.space"},{id:"tx-per-second",title:"Transactions Per Second",subtitle:"On-chain throughput",category:"mempool",type:"line",api:"tps",unit:"tx/s",source:"Coin Metrics"},{id:"block-weight",title:"Average Block Weight",subtitle:"How full are Bitcoin blocks?",category:"mempool",type:"bar",api:"blockweight",unit:"MWU",source:"mempool.space"}];var q="https://ocm-proxy.offchainmedia.workers.dev",he="",Tt="https://community-api.coinmetrics.io/v4/timeseries/asset-metrics";var Be=0,Ue=[];async function D(e){Be>=4&&await new Promise(t=>Ue.push(t)),Be++;try{let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status}`);return await t.json()}finally{Be--;let t=Ue.shift();t&&t()}}var Y=e=>e==="full"?"all":"1y",J={},oe={},_e={},He="ocm:d2:",At=30*60*1e3;function Mt(e){try{let t=localStorage.getItem(He+e);if(!t)return null;let{t:n,d:o}=JSON.parse(t);return Date.now()-n>At?null:o}catch{return null}}function Lt(e,t){try{localStorage.setItem(He+e,JSON.stringify({t:Date.now(),d:t}))}catch{}}function B(e,t,n,o,i){let r=n,c=e,l=Date.now();return Array.from({length:t},(d,h)=>(c=(c*9301+49297)%233280,r+=Math.sin(h*.5+e)*o+i,r=Math.max(n*.3,r),{ts:l-(t-h)*864e5,v:r}))}var je={price:()=>B(5,365,85e3,4e3,120),marketcap:()=>B(7,365,16e11,8e10,3e9),volume:()=>B(13,365,35,8,.1),dominance:()=>B(6,365,19.8,.05,.001),hashrate:()=>B(3,365,600,25,.6),difficulty:()=>B(9,52,80,5,.15),fees:()=>B(11,90,.15,.05,.001),hashprice:()=>B(12,180,.042,.008,1e-4),addresses:()=>B(14,365,9e5,8e4,500),lth:()=>B(13,365,500,30,.5),exchange:()=>B(15,365,2.8,.04,-.001),nvt:()=>B(16,365,6e5,5e4,100),lnnodes:()=>B(21,365,16e3,500,10),lnchannels:()=>B(22,365,65e3,2e3,50),lncapacity:()=>B(23,365,5300,50,1),lnavgchannel:()=>B(25,365,.046,.004,-5e-5),blockrewards:()=>B(24,1825,3.25,.4,-2e-4),mempool:()=>B(17,90,35,18,.05),feerates:()=>B(18,90,15,10,.02),tps:()=>B(19,90,5.5,1,.002),blockweight:()=>B(20,90,3.7,.2,.001),miningpools:()=>{let e=Date.now();return[{ts:e,v:31.2,name:"Foundry USA"},{ts:e-100,v:19.8,name:"AntPool"},{ts:e-200,v:14.5,name:"F2Pool"},{ts:e-300,v:9.3,name:"ViaBTC"},{ts:e-400,v:8.1,name:"MARA Pool"},{ts:e-500,v:5.4,name:"Braiins Pool"},{ts:e-600,v:4.2,name:"Luxor"},{ts:e-700,v:3.1,name:"BTC.com"},{ts:e-800,v:2.4,name:"Poolin"},{ts:e-900,v:2,name:"Others"}]},lncountries:()=>{let e=Date.now();return[{ts:e,v:2450,name:"United States"},{ts:e-100,v:1100,name:"Germany"},{ts:e-200,v:680,name:"France"},{ts:e-300,v:590,name:"Netherlands"},{ts:e-400,v:510,name:"United Kingdom"},{ts:e-500,v:380,name:"Canada"},{ts:e-600,v:340,name:"Finland"},{ts:e-700,v:290,name:"Australia"},{ts:e-800,v:260,name:"Japan"},{ts:e-900,v:230,name:"Sweden"}]},lnisp:()=>{let e=Date.now();return[{ts:e,v:850,name:"Amazon.com"},{ts:e-100,v:620,name:"Hetzner Online"},{ts:e-200,v:480,name:"Contabo"},{ts:e-300,v:310,name:"DigitalOcean"},{ts:e-400,v:260,name:"OVH SAS"},{ts:e-500,v:190,name:"Google Cloud"},{ts:e-600,v:160,name:"Microsoft Azure"},{ts:e-700,v:130,name:"Linode / Akamai"},{ts:e-800,v:110,name:"Vultr"},{ts:e-900,v:90,name:"Home ISPs"}]}};function ie(e){let t=new Map;for(let{ts:n,v:o}of e){let i=Math.floor(n/864e5),r=t.get(i)||{sum:0,n:0};r.sum+=o,r.n+=1,t.set(i,r)}return[...t.entries()].sort((n,o)=>n[0]-o[0]).map(([n,{sum:o,n:i}])=>({ts:n*864e5,v:o/i}))}async function Bt(e){return(await D(`${q}/api/v1/mining/hashrate/${Y(e)}`)).hashrates.map(n=>({ts:n.timestamp*1e3,v:n.avgHashrate/1e18}))}async function _t(e){return(await D(`${q}/api/v1/mining/difficulty-adjustments/${Y(e)}`)).map(([n,,o])=>({ts:n*1e3,v:o/1e12})).sort((n,o)=>n.ts-o.ts)}async function Et(e){let t=await D(`${q}/api/v1/mining/blocks/fees/${Y(e)}`);return ie(t.map(n=>({ts:n.timestamp*1e3,v:n.avgFees/1e8})))}async function Ft(e){let t=await D(`${q}/api/v1/mining/blocks/fee-rates/${Y(e)}`);return ie(t.map(n=>({ts:n.timestamp*1e3,v:n.avgFee_50})))}async function Dt(e){let t=await D(`${q}/api/v1/statistics/${Y(e)}`);return ie(t.map(n=>({ts:n.added*1e3,v:n.vsizes.reduce((o,i)=>o+i,0)/1e6})))}async function Pt(e){let t=await D(`${q}/api/v1/mining/blocks/sizes-weights/${Y(e)}`);return ie(t.weights.map(n=>({ts:n.timestamp*1e3,v:n.avgWeight/1e6})))}var Ee={};async function me(e){let t=e==="full"?"all":"3y";return Ee[t]||(Ee[t]=D(`${q}/api/v1/lightning/statistics/${t}`)),Ee[t]}async function zt(e){return(await me(e)).map(n=>({ts:n.added*1e3,v:(n.tor_nodes||0)+(n.clearnet_nodes||0)+(n.clearnet_tor_nodes||0)})).filter(n=>n.v>0).sort((n,o)=>n.ts-o.ts)}async function Rt(e){return(await me(e)).map(n=>({ts:n.added*1e3,v:n.channel_count})).filter(n=>n.v>0).sort((n,o)=>n.ts-o.ts)}async function Nt(e){return(await me(e)).map(n=>({ts:n.added*1e3,v:n.total_capacity/1e8})).filter(n=>n.v>0).sort((n,o)=>n.ts-o.ts)}async function It(e){return(await me(e)).filter(n=>n.channel_count>0&&n.total_capacity>0).map(n=>({ts:n.added*1e3,v:n.total_capacity/1e8/n.channel_count})).sort((n,o)=>n.ts-o.ts)}async function qt(e){let t=await D(`${q}/api/v1/mining/blocks/rewards/${Y(e)}`);return ie(t.map(n=>({ts:n.timestamp*1e3,v:n.avgRewards/1e8})))}async function Ot(){let e=await D(`${q}/api/v1/mining/pools/1y`),t=e.blockCount||1,n=Date.now();return e.pools.slice(0,15).map((o,i)=>({ts:n-i*100,v:o.blockCount/t*100,name:o.name}))}async function Ut(){let e=await D(`${q}/api/v1/lightning/nodes/countries`),t=Date.now();return e.slice().sort((n,o)=>o.count-n.count).slice(0,15).map((n,o)=>({ts:t-o*100,v:n.count,name:n.name?.en||n.iso||"Unknown"}))}async function jt(){let e=await D(`${q}/api/v1/lightning/nodes/isp-ranking`),t=Date.now();return(e.ispRanking||[]).map(n=>({name:n[1]||"Unknown",v:n[4]})).filter(n=>n.v>0).sort((n,o)=>o.v-n.v).slice(0,15).map((n,o)=>({ts:t-o*100,v:n.v,name:n.name}))}async function j(e,t="default"){let n=`${e}|${t}`;if(_e[n])return _e[n];let o=new Date,i=t==="full"?new Date("2010-01-01"):new Date(Date.now()-2*365*864e5),r=`${Tt}?assets=btc&metrics=${e}&frequency=1d&start_time=${i.toISOString().slice(0,10)}&end_time=${o.toISOString().slice(0,10)}&page_size=10000`,l=(await D(r)).data.map(d=>({ts:new Date(d.time).getTime(),v:parseFloat(d[e])}));return _e[n]=l,l}async function Ht(e){return j("AdrActCnt",e)}async function Gt(e){return(await j("TxCnt",e)).map(({ts:t,v:n})=>({ts:t,v:n/86400}))}async function Wt(e){return(await j("SplyExNtv",e)).map(({ts:t,v:n})=>({ts:t,v:n/1e6}))}async function Vt(e){let t=e==="full",[{data:n},{data:o},{data:i}]=await Promise.all([O("fees",{full:t}),O("hashrate",{full:t}),O("price",{full:t})]),r=new Map(o.map(l=>[Math.floor(l.ts/864e5),l.v])),c=new Map(i.map(l=>[Math.floor(l.ts/864e5),l.v]));return n.map(({ts:l,v:d})=>{let h=Math.floor(l/864e5),p=r.get(h),f=c.get(h);if(p==null||f==null)return null;let g=144*(3.125+d)*f;return{ts:l,v:g/(p*1e6)}}).filter(Boolean)}async function Yt(e){let t=await j("PriceUSD",e);try{let n=he?`&x_cg_demo_api_key=${he}`:"",i=((await D(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30${n}`)).prices||[]).filter(([,r])=>r!=null).map(([r,c])=>({ts:r,v:c}));if(i.length>24){let r=i[0].ts;return[...t.filter(c=>c.ts<r),...i]}}catch{}return t}async function Xt(e){return(await j("CapMrktCurUSD",e)).map(t=>({ts:t.ts,v:t.v/1e12}))}async function Kt(){let e=he?`&x_cg_demo_api_key=${he}`:"",t=await D(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365${e}`);if(!t.total_volumes?.length)throw new Error("CoinGecko volume: empty response");return t.total_volumes.filter(([,n])=>n!=null&&n>0).map(([n,o])=>({ts:n,v:o/1e9}))}async function Zt(e){return(await j("SplyCur",e)).map(t=>({ts:t.ts,v:t.v/1e6}))}async function Jt(e){return j("TxCnt",e)}async function Qt(e){let[t,n]=await Promise.all([j("IssTotNtv",e),j("FeeTotNtv",e)]),o=new Map(n.map(i=>[Math.floor(i.ts/864e5),i.v]));return t.map(({ts:i,v:r})=>({ts:i,v:r+(o.get(Math.floor(i/864e5))??0)}))}function en(){return[{medianFee:2.1,feeRange:[1,1.2,1.3,2,2.7,4,201],nTx:4327,totalFees:25e5,blockSize:2054070},{medianFee:1.4,feeRange:[.5,.6,.7,1,1.5,2.2,150],nTx:6755,totalFees:16e5,blockSize:1997e3},{medianFee:.6,feeRange:[.36,.4,.42,.5,.7,1,45],nTx:5777,totalFees:95e4,blockSize:1584123}]}function tn(){let e=["F2Pool","Foundry USA","Luxor","AntPool","ViaBTC","\u24C8BTC.com"],t=Date.now();return Array.from({length:6},(n,o)=>({height:957896-o,timestamp:Math.floor((t-o*9.7*6e4)/1e3),tx_count:4362-o*235,size:1561683+o*12e3,extras:{medianFee:1.1+o*.1,feeRange:[.55-o*.02,.7,1,2,3,5,161-o*10],totalFees:1883531-o*9e4,pool:{name:e[o%e.length]}}}))}async function Ge(){try{return{data:await D(`${q}/api/v1/fees/mempool-blocks`),live:!0}}catch(e){return console.warn('[data] Falling back to mock for "mempool-blocks":',e.message),{data:en(),live:!1}}}async function We(){try{return{data:await D(`${q}/api/v1/blocks`),live:!0}}catch(e){return console.warn('[data] Falling back to mock for "blocks":',e.message),{data:tn(),live:!1}}}function Ve(e){let t=Math.max(0,Math.round((Date.now()-e*1e3)/6e4));return t<1?"just now":t<60?`${t} min ago`:`${Math.round(t/60)}h ago`}var nn={hashrate:Bt,difficulty:_t,fees:Et,feerates:Ft,mempool:Dt,blockweight:Pt,addresses:Ht,tps:Gt,exchange:Wt,hashprice:Vt,price:Yt,marketcap:Xt,volume:Kt,dominance:Zt,nvt:Jt,lth:Qt,lnnodes:zt,lnchannels:Rt,lncapacity:Nt,lnavgchannel:It,blockrewards:qt,miningpools:Ot,lncountries:Ut,lnisp:jt};async function O(e,{full:t=!1}={}){let n=t?"full":"default",o=`${e}|${n}`;if(J[`${e}|full`])return{data:J[`${e}|full`],live:!0};if(J[o])return{data:J[o],live:!0};if(oe[o])return oe[o];oe[o]=(async()=>{if(!t){let c=Mt(e);if(c)return J[o]=c,{data:c,live:!0}}let i=nn[e];if(i)try{let c=await i(n);return J[o]=c,t||Lt(e,c),{data:c,live:!0}}catch(c){console.warn(`[data] Falling back to mock for "${e}":`,c.message)}return{data:(je[e]||je.price)(),live:!1}})();try{return await oe[o]}finally{delete oe[o]}}function G(e,t){if(!e.length||t==="ALL")return e;let n={"1D":1,"1W":7,"1M":30,"3M":90,"1Y":365}[t];if(!n)return e;let o=Date.now()-n*864e5;return e.filter(i=>i.ts>=o)}function Fe(e,t){return t==="$"?e>=1e3?`$${(e/1e3).toFixed(0)}k`:`$${e.toFixed(0)}`:t==="$T"?`$${e.toFixed(2)}T`:t==="$B"?`$${e.toFixed(1)}B`:t==="EH/s"?`${e.toFixed(1)} EH/s`:t==="%"?`${e.toFixed(1)}%`:t==="M BTC"?`${e.toFixed(2)}M BTC`:t==="K"?`${(e/1e3).toFixed(0)}K`:t==="BTC"?`${e.toFixed(3)} BTC`:t==="T"?`${e.toFixed(1)}T`:t==="addresses"?`${(e/1e3).toFixed(0)}K addresses`:t==="txns"?`${(e/1e3).toFixed(0)}K txns`:t==="nodes"?`${(e/1e3).toFixed(0)}K nodes`:t==="channels"?`${(e/1e3).toFixed(0)}K channels`:e!=null?`${e.toFixed(2)}${t?" "+t:""}`:"\u2014"}function Q(e,t){return e==null?"\u2014":t==="$"?`$${Math.round(e).toLocaleString("en-US")}`:t==="BTC"?`${e.toFixed(4)} BTC`:t==="K"?Math.round(e).toLocaleString("en-US"):t==="addresses"?`${Math.round(e).toLocaleString("en-US")} addresses`:t==="txns"?`${Math.round(e).toLocaleString("en-US")} txns`:t==="nodes"?`${Math.round(e).toLocaleString("en-US")} nodes`:t==="channels"?`${Math.round(e).toLocaleString("en-US")} channels`:Fe(e,t)}function ae(e,t){if(e==null)return"\u2014";if(t==="$")return e>=1e3?`$${Math.round(e).toLocaleString("en-US")}`:e>=1?`$${e.toFixed(2)}`:`$${e.toFixed(5)}`;if(t==="$T")return`$${e.toFixed(3)}T`;if(t==="$B")return`$${e.toFixed(2)}B`;if(t==="EH/s")return`${e.toFixed(2)} EH/s`;if(t==="M BTC")return`${e.toFixed(3)}M BTC`;if(t==="K")return`${Math.round(e).toLocaleString("en-US")}`;if(t==="addresses")return`${Math.round(e).toLocaleString("en-US")} addresses`;if(t==="txns")return`${Math.round(e).toLocaleString("en-US")} txns`;if(t==="nodes")return`${Math.round(e).toLocaleString("en-US")} nodes`;if(t==="channels")return`${Math.round(e).toLocaleString("en-US")} channels`;if(t==="BTC")return`${e.toFixed(4)} BTC`;if(t==="T")return`${e.toFixed(2)}T`;if(t==="%")return`${e.toFixed(2)}%`;let n=Math.abs(e),o=n>=100?1:n>=10?2:n>=1?3:n>=.1?4:5;return`${e.toFixed(o)}${t?" "+t:""}`}function De(e){return new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}function Ye(e){let t=e;return()=>(t=(t*9301+49297)%233280,t/233280)}function s(e,t={}){let n=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.entries(t).forEach(([o,i])=>n.setAttribute(o,i)),n}function Pe(e,t=1,n=1){let o=Ye(n),i=e.map(c=>({x:c.x+(o()-.5)*t,y:c.y+(o()-.5)*t}));if(i.length<2)return"";let r=`M${i[0].x.toFixed(2)},${i[0].y.toFixed(2)}`;for(let c=0;c<i.length-1;c++){let l=i[Math.max(0,c-1)],d=i[c],h=i[c+1],p=i[Math.min(i.length-1,c+2)],f=d.x+(h.x-l.x)/6,g=d.y+(h.y-l.y)/6,y=h.x-(p.x-d.x)/6,w=h.y-(p.y-d.y)/6;r+=` C${f.toFixed(2)},${g.toFixed(2)} ${y.toFixed(2)},${w.toFixed(2)} ${h.x.toFixed(2)},${h.y.toFixed(2)}`}return r}function Xe(e,t,n){let o=Ye(Math.round(e+t)),i=o()*Math.PI,r=[];for(let c=0;c<=Math.PI*2*1.15;c+=.3){let l=n+(o()-.5)*1.5;r.push(`${(e+Math.cos(c+i)*l).toFixed(1)},${(t+Math.sin(c+i)*l).toFixed(1)}`)}return"M"+r.join(" L")}function on(e,t="lin"){let n=e.filter(p=>Number.isFinite(p)),o=n.length?n:[0,1],i=o.filter(p=>p>0);if(t!=="log"||!i.length){let p=Math.min(...o),f=Math.max(...o),g=f-p||1;return{log:!1,min:p,max:f,range:g,toUnit:y=>(y-p)/g,fromUnit:y=>p+y*g}}let r=Math.min(...i),c=Math.max(...i),l=Math.log10(r),h=Math.log10(c)-l||1;return{log:!0,min:r,max:c,range:c-r||1,toUnit:p=>(Math.log10(Math.max(p,r))-l)/h,fromUnit:p=>10**(l+p*h)}}function Ke(e,t,n,o,i="lin"){let r=on(e.map(l=>l.v),i);return{points:e.map((l,d)=>({x:t.left+d/(e.length-1)*n,y:t.top+o-r.toUnit(l.v)*o,d:l})),min:r.min,max:r.max,range:r.range,scale:r}}var a={accent:"#F7931A",accentText:"light-dark(#A85A00, #F7931A)",ink:"#1a1a1a",paper:"#FAF7F1",muted:"light-dark(#6B6B6B, #A3A3A3)",grid:"rgba(128,128,128,0.12)",heading:"'Oswald', 'Arial Narrow', sans-serif",body:"'Spectral', Georgia, serif",line:"light-dark(#1a1a1a, #f2f2f2)",lineFill:"light-dark(#1a1a1a, #f2f2f2)",shadow:"light-dark(rgba(0,0,0,0.32), rgba(255,255,255,0.20))",textAdaptive:"light-dark(#1a1a1a, #ffffff)",textAdaptiveInverse:"light-dark(#ffffff, #1a1a1a)",textAdaptiveMuted:"light-dark(rgba(26,26,26,0.55), rgba(255,255,255,0.55))"};var E=680,P=380,x={top:52,right:20,bottom:46,left:38},H=E-x.left-x.right,N=P-x.top-x.bottom,an=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],ue=5,rn=0,Ze={"Coin Metrics":"https://coinmetrics.io","mempool.space":"https://mempool.space",CoinGecko:"https://www.coingecko.com"};function Je(e){if(e==null||!isFinite(e))return"";let t=Math.abs(e);return t>=1e12?(e/1e12).toFixed(2)+" T":t>=1e9?(e/1e9).toFixed(2)+" G":t>=1e6?(e/1e6).toFixed(2)+" M":t>=1e3?(e/1e3).toFixed(1)+" k":t>=100?e.toFixed(0):e.toFixed(2)}function sn(e,t,n){let o=e&&e.length?e[e.length-1]:null;return[t.title,t.subtitle,n?`${T.period} ${n}`:"",o?`${T.latest} ${Je(o.v)}${t.unit?" "+t.unit:""}`:""].filter(Boolean).join(", ")}function cn(e,t){let n=e&&e.length?e.slice().sort((i,r)=>r.v-i.v)[0]:null;return[t.title,t.subtitle,e?T.ranking(e.length):"",n?T.first(n.name||"",Je(n.v)):""].filter(Boolean).join(", ")}function ln(e,t,n){let o=s("svg",{width:"100%",viewBox:`0 0 ${E} ${P}`,style:"display:block",role:"img","aria-label":cn(t,n)}),i=s("defs"),r=s("filter",{id:"ocm-drop",x:"-20%",y:"-20%",width:"140%",height:"140%"}),c=s("feGaussianBlur",{in:"SourceAlpha",stdDeviation:"3",result:"blur"}),l=s("feOffset",{in:"blur",dx:"2",dy:"4",result:"off"}),d=s("feFlood",{style:`flood-color: ${a.shadow}`,result:"floodColor"}),h=s("feComposite",{in:"floodColor",in2:"off",operator:"in",result:"sh"}),p=s("feMerge");p.appendChild(s("feMergeNode",{in:"sh"})),p.appendChild(s("feMergeNode",{in:"SourceGraphic"})),r.appendChild(c),r.appendChild(l),r.appendChild(d),r.appendChild(h),r.appendChild(p),i.appendChild(r),o.appendChild(i),o.appendChild(s("rect",{width:E,height:P,fill:"transparent"}));let f=152,y=E-f-80,w=[...t].sort(($,z)=>z.v-$.v).slice(0,15),A=Math.max(...w.map($=>$.v)),b=(P-x.top-x.bottom)/Math.max(w.length,1),u=Math.max(4,Math.min(20,b*.6)),M=s("g",{opacity:"0","pointer-events":"none"}),_=s("rect",{width:"220",height:"46",rx:"3",fill:a.ink}),m=s("text",{"font-family":a.body,"font-size":"11",fill:"rgba(255,255,255,0.65)","font-style":"italic"}),v=s("text",{"font-family":a.heading,"font-size":"17","font-weight":"700",fill:a.accent});M.appendChild(_),M.appendChild(m),M.appendChild(v),w.forEach(($,z)=>{let se=A>0?$.v/A*y:0,L=Math.max(se,2),S=x.top+z*b+b/2,R=z===0,V=R?a.accent:a.line,K=`fill:${R?a.accentText:a.line}`,ce=`fill:${R?a.accentText:a.muted}`,le=$.name||"\u2014",$e=s("rect",{x:"0",y:String(S-b/2),width:String(E),height:String(b),fill:"rgba(128,128,128,0.06)",opacity:"0","pointer-events":"none"});o.appendChild($e);let Ne=s("text",{x:"6",y:String(S+4),"font-family":a.body,"font-size":"10",fill:"rgba(128,128,128,0.4)","font-style":"italic"});Ne.textContent=`#${z+1}`,o.appendChild(Ne);let kt=le.length>20?le.slice(0,19)+"\u2026":le,Ie=s("text",{x:String(f-8),y:String(S+4),"text-anchor":"end","font-family":a.body,"font-size":"11",style:K});Ie.textContent=kt,o.appendChild(Ie),o.appendChild(s("rect",{x:String(f),y:String(S-u/2),width:String(y),height:String(u),rx:"2",fill:a.grid,opacity:"0.28"}));let Se=s("g",{filter:"url(#ocm-drop)"}),Te=s("rect",{x:String(f),y:String(S-u/2),width:String(L),height:String(u),rx:"2",fill:V,opacity:R?"0.9":"0.7"});Se.appendChild(Te),Se.appendChild(s("rect",{x:String(f),y:String(S-u/2),width:String(L),height:String(Math.min(u/2,9)),rx:"2",fill:"rgba(255,255,255,0.22)"})),o.appendChild(Se);let qe=s("text",{x:String(f+L+8),y:String(S+4),"font-family":a.heading,"font-size":"11","font-weight":"500",style:ce});qe.textContent=ae($.v,n.unit),o.appendChild(qe);let Ae=s("rect",{x:"0",y:String(S-b/2),width:String(E),height:String(b),fill:"transparent",style:"cursor:default"});Ae.addEventListener("mousemove",Oe=>{let de=o.getBoundingClientRect(),Ct=(Oe.clientX-de.left)*(E/de.width),$t=(Oe.clientY-de.top)*(P/de.height);$e.setAttribute("opacity","1"),Te.setAttribute("opacity","1");let Me=Math.min(Ct+14,E-228),Le=Math.max($t-54,x.top);_.setAttribute("x",String(Me)),_.setAttribute("y",String(Le)),m.setAttribute("x",String(Me+10)),m.setAttribute("y",String(Le+16)),v.setAttribute("x",String(Me+10)),v.setAttribute("y",String(Le+38)),m.textContent=le,v.textContent=ae($.v,n.unit),M.setAttribute("opacity","1")}),Ae.addEventListener("mouseleave",()=>{$e.setAttribute("opacity","0"),Te.setAttribute("opacity",R?"0.9":"0.7"),M.setAttribute("opacity","0")}),o.appendChild(Ae)}),o.appendChild(M),Qe(o,i),o.appendChild(s("line",{x1:0,y1:P-16,x2:E,y2:P-16,stroke:a.ink,"stroke-width":"0.5",opacity:"0.3"}));let C=s("a",{href:Ze[n.source]||"#",target:"_blank",style:"cursor:pointer; text-decoration:none"}),F=s("text",{x:x.left,y:P-4,"font-family":a.body,"font-size":"11","font-style":"italic",style:`fill:${a.muted}; transition:fill 0.15s`});F.textContent=T.source+n.source,C.addEventListener("mouseenter",()=>{F.style.fill=a.accent}),C.addEventListener("mouseleave",()=>{F.style.fill=a.muted}),C.appendChild(F),o.appendChild(C);let I=s("text",{x:E-x.right,y:P-4,"text-anchor":"end","font-family":a.heading,"font-size":"10",fill:"rgba(128,128,128,0.45)","letter-spacing":"0.1em"});I.textContent="OFFCHAIN.MEDIA/DATA",o.appendChild(I),e.appendChild(o)}function X(e,t,n,o,i={}){e.innerHTML="";let r=G(t,o);if(!r.length)return;if(n.type==="ranking"){ln(e,r,n);return}let{points:c,scale:l}=Ke(r,x,H,N,i.scale||"lin"),d=s("svg",{width:"100%",viewBox:`0 0 ${E} ${P}`,style:"display:block",role:"img","aria-label":sn(r,n,o)}),h=s("defs"),p=s("filter",{id:"ocm-rough",x:"-5%",y:"-5%",width:"110%",height:"110%"}),f=s("feTurbulence",{type:"fractalNoise",baseFrequency:"0.012",numOctaves:"2",seed:"4",result:"n"}),g=s("feDisplacementMap",{in:"SourceGraphic",in2:"n",scale:"2",xChannelSelector:"R",yChannelSelector:"G"});p.appendChild(f),p.appendChild(g),h.appendChild(p);let y=s("filter",{id:"ocm-drop",x:"-20%",y:"-20%",width:"140%",height:"140%"}),w=s("feGaussianBlur",{in:"SourceAlpha",stdDeviation:"3",result:"blur"}),A=s("feOffset",{in:"blur",dx:"2",dy:"4",result:"off"}),b=s("feFlood",{style:`flood-color: ${a.shadow}`,result:"floodColor"}),u=s("feComposite",{in:"floodColor",in2:"off",operator:"in",result:"sh"}),M=s("feMerge");M.appendChild(s("feMergeNode",{in:"sh"})),M.appendChild(s("feMergeNode",{in:"SourceGraphic"})),y.appendChild(w),y.appendChild(A),y.appendChild(b),y.appendChild(u),y.appendChild(M),h.appendChild(y);let _=s("linearGradient",{id:"ocm-vol",x1:"0",y1:"0",x2:"0",y2:"1"});_.appendChild(s("stop",{offset:"0%",style:`stop-color: ${a.lineFill}`,"stop-opacity":"0.22"})),_.appendChild(s("stop",{offset:"100%",style:`stop-color: ${a.lineFill}`,"stop-opacity":"0.02"})),h.appendChild(_);let m=s("linearGradient",{id:"ocm-ridge",x1:"0",y1:"0",x2:"0",y2:"1"});m.appendChild(s("stop",{offset:"0%","stop-color":"#fff","stop-opacity":"0.30"})),m.appendChild(s("stop",{offset:"15%","stop-color":"#fff","stop-opacity":"0"})),h.appendChild(m);let v=s("clipPath",{id:"ocm-clip"});v.appendChild(s("rect",{x:x.left,y:x.top,width:H,height:N})),h.appendChild(v),d.appendChild(h),d.appendChild(s("rect",{width:E,height:P,fill:"transparent"}));let C=(L,S)=>{let R=Math.abs(L);return R>=1e9?`${(L/1e9).toFixed(S/1e9<5?1:0)}B`:R>=1e6?`${(L/1e6).toFixed(S/1e6<5?1:0)}M`:R>=1e3?`${(L/1e3).toFixed(S/1e3<5?1:0)}k`:S>=10?L.toFixed(0):S>=1?L.toFixed(1):S>=.1?L.toFixed(2):S>=.01?L.toFixed(3):L.toFixed(4)};for(let L=0;L<=ue;L++){let S=x.top+L/ue*N,R=1-L/ue,V=l.fromUnit(R),K=Math.abs(l.fromUnit(Math.min(R+1/ue,1))-V)||1;d.appendChild(s("line",{x1:x.left,y1:S,x2:x.left+H,y2:S,stroke:a.grid,"stroke-width":"0.7","stroke-linecap":"round"}));let ce=s("text",{x:x.left-8,y:S+4,"text-anchor":"end","font-family":a.body,"font-size":"12",style:`fill:${a.muted}`,"font-style":"italic"});ce.textContent=C(V,K),d.appendChild(ce)}d.appendChild(s("line",{x1:x.left,y1:x.top+N,x2:x.left+H,y2:x.top+N,stroke:"rgba(128,128,128,0.28)","stroke-width":"1","stroke-linecap":"round"}));let I=(r.length>1?r[r.length-1].ts-r[0].ts:0)>400*864e5;[0,.25,.5,.75,1].forEach(L=>{let S=Math.round(L*(r.length-1)),R=x.left+L*H,V=new Date(r[S]?.ts||Date.now()),K=s("text",{x:R,y:x.top+N+18,"text-anchor":"middle","font-family":a.body,"font-size":"12",fill:"rgba(128,128,128,0.6)","font-style":"italic"});K.textContent=I?V.getFullYear():an[V.getMonth()],d.appendChild(K)}),n.type==="bar"?pn(d,h,r,l,n):hn(d,c,t,n,r),Qe(d,h),d.appendChild(s("line",{x1:0,y1:P-16,x2:E,y2:P-16,stroke:a.ink,"stroke-width":"0.5",opacity:"0.3"}));let $=s("a",{href:Ze[n.source]||"#",target:"_blank",style:"cursor:pointer; text-decoration:none"}),z=s("text",{x:x.left,y:P-4,"font-family":a.body,"font-size":"11","font-style":"italic",style:`fill:${a.muted}; transition:fill 0.15s`});z.textContent=T.source+n.source,$.addEventListener("mouseenter",()=>{z.style.fill=a.accent}),$.addEventListener("mouseleave",()=>{z.style.fill=a.muted}),$.appendChild(z),d.appendChild($);let se=s("text",{x:E-x.right,y:P-4,"text-anchor":"end","font-family":a.heading,"font-size":"10",fill:"rgba(128,128,128,0.45)","letter-spacing":"0.1em"});se.textContent="OFFCHAIN.MEDIA/DATA",d.appendChild(se),e.appendChild(d)}function dn(e){if(e.length<=120)return e;let t=(e[e.length-1].ts-e[0].ts)/864e5,o=Math.max(1,Math.ceil(t/60))*864e5,i=new Map;for(let{ts:r,v:c}of e){let l=Math.floor(r/o);i.has(l)||i.set(l,{ts:r,sum:0,n:0});let d=i.get(l);d.sum+=c,d.n++}return[...i.values()].sort((r,c)=>r.ts-c.ts).map(r=>({ts:r.ts,v:r.sum/r.n}))}function pn(e,t,n,o,i){let r=dn(n),c=r.length>80?1:3,l=Math.max(1,(H-c*(r.length-1))/Math.max(r.length,1)),d=[],h=s("g",{filter:"url(#ocm-rough)"});r.forEach((b,u)=>{let M=o.toUnit(b.v)*N,_=Math.max(M,2),m=x.left+u*(l+c),v=x.top+N-_,C=u===r.length-1;d.push({x:m,y:v,w:l,h:_,d:b,cx:m+l/2});let F=C?a.accent:a.line,I=`ocm-bv-${u}`,$=s("linearGradient",{id:I,x1:"0",y1:"0",x2:"0",y2:"1"});$.appendChild(s("stop",{offset:"0%",style:`stop-color: ${F}`,"stop-opacity":C?"1":"0.85"})),$.appendChild(s("stop",{offset:"100%",style:`stop-color: ${F}`,"stop-opacity":C?"0.75":"0.6"})),t.appendChild($);let z=s("g",{filter:"url(#ocm-drop)"});z.appendChild(s("rect",{x:m,y:v,width:l,height:_,rx:"1.5",fill:`url(#${I})`})),z.appendChild(s("rect",{x:m,y:v,width:l,height:Math.min(_,16),rx:"1.5",fill:"rgba(255,255,255,0.28)"})),h.appendChild(z)}),e.appendChild(h);let p=s("rect",{x:0,y:0,width:0,height:0,rx:"1.5",fill:"rgba(255,255,255,0.20)","pointer-events":"none",opacity:"0"});e.appendChild(p);let f=s("g",{opacity:"0","pointer-events":"none"}),g=s("rect",{x:0,y:0,width:130,height:42,rx:"2",fill:a.ink}),y=s("text",{x:10,y:14,"font-family":a.body,"font-size":"10",fill:"rgba(255,255,255,0.55)","font-style":"italic"}),w=s("text",{x:10,y:32,"font-family":a.heading,"font-size":"14","font-weight":"600",fill:"#fff"});f.appendChild(g),f.appendChild(y),f.appendChild(w),e.appendChild(f);let A=s("rect",{x:x.left,y:x.top,width:H,height:N,fill:"transparent",style:"cursor:crosshair"});A.addEventListener("mousemove",b=>{let u=e.getBoundingClientRect(),M=E/u.width,_=(b.clientX-u.left)*M,m=d[0],v=1/0;if(d.forEach(I=>{let $=Math.abs(I.cx-_);$<v&&(v=$,m=I)}),!m)return;p.setAttribute("x",m.x),p.setAttribute("y",m.y),p.setAttribute("width",m.w),p.setAttribute("height",m.h),p.setAttribute("opacity","1");let C=Math.min(m.cx-65,E-140),F=Math.max(m.y-52,x.top);g.setAttribute("x",C),g.setAttribute("y",F),y.setAttribute("x",C+10),y.setAttribute("y",F+14),w.setAttribute("x",C+10),w.setAttribute("y",F+32),y.textContent=De(m.d.ts),w.textContent=ae(m.d.v,i.unit),f.setAttribute("opacity","1")}),A.addEventListener("mouseleave",()=>{p.setAttribute("opacity","0"),f.setAttribute("opacity","0")}),e.appendChild(A)}function hn(e,t,n,o,i){let r=Pe(t,1,3),c=`${r} L${t[t.length-1].x},${x.top+N} L${t[0].x},${x.top+N} Z`,l=s("g",{"clip-path":"url(#ocm-clip)"});l.appendChild(s("path",{d:c,fill:"url(#ocm-vol)"})),l.appendChild(s("path",{d:c,fill:"url(#ocm-ridge)"})),e.appendChild(l);let d=s("g",{filter:"url(#ocm-rough)","clip-path":"url(#ocm-clip)"});d.appendChild(s("path",{d:r,fill:"none",style:`stroke: ${a.line}`,"stroke-width":"2.2","stroke-linecap":"round","stroke-linejoin":"round",filter:"url(#ocm-drop)"})),t.length>12&&d.appendChild(s("path",{d:Pe(t.slice(-12),1,4),fill:"none",stroke:a.accent,"stroke-width":"2.5","stroke-linecap":"round",filter:"url(#ocm-drop)"})),e.appendChild(d);let h=t[t.length-1];h&&(e.appendChild(s("circle",{cx:h.x,cy:h.y,r:"4",fill:a.accent})),e.appendChild(s("path",{d:Xe(h.x,h.y,9),fill:"none",stroke:a.accent,"stroke-width":"1.2",opacity:"0.6","stroke-linecap":"round"})));let p=s("line",{x1:0,y1:x.top,x2:0,y2:x.top+N,stroke:a.accent,"stroke-width":"0.7","stroke-dasharray":"3,3",opacity:"0","pointer-events":"none"});e.appendChild(p);let f=s("g",{opacity:"0","pointer-events":"none"}),g=s("rect",{x:0,y:0,width:130,height:42,rx:"2",fill:a.ink}),y=s("text",{x:10,y:14,"font-family":a.body,"font-size":"10",fill:"rgba(255,255,255,0.55)","font-style":"italic"}),w=s("text",{x:10,y:32,"font-family":a.heading,"font-size":"14","font-weight":"600",fill:"#fff"});f.appendChild(g),f.appendChild(y),f.appendChild(w),e.appendChild(f);let A=s("rect",{x:x.left,y:x.top,width:H,height:N,fill:"transparent",style:"cursor:crosshair"});A.addEventListener("mousemove",b=>{let u=e.getBoundingClientRect(),M=E/u.width,_=(b.clientX-u.left)*M,m=t[0],v=1/0;t.forEach(I=>{let $=Math.abs(I.x-_);$<v&&(v=$,m=I)}),p.setAttribute("x1",m.x),p.setAttribute("x2",m.x),p.setAttribute("opacity","0.5");let C=Math.min(m.x+8,E-140),F=Math.max(m.y-52,x.top);g.setAttribute("x",C),g.setAttribute("y",F),y.setAttribute("x",C+10),y.setAttribute("y",F+14),w.setAttribute("x",C+10),w.setAttribute("y",F+32),y.textContent=De(m.d.ts),w.textContent=ae(m.d.v,o.unit),f.setAttribute("opacity","1")}),A.addEventListener("mouseleave",()=>{p.setAttribute("opacity","0"),f.setAttribute("opacity","0")}),e.appendChild(A)}function Qe(e,t){let n=`ocmwm${rn++}`,o=x.left+H/2,i=x.top+N/2,r=160/956,c=o-r*862,l=i-r*415,d=(y,w)=>{let A=s("clipPath",{id:n+y});A.appendChild(s("path",{d:w})),t.appendChild(A)};d("r","M726 201 L1077 201 L1077 629 L726 629Z"),d("l","M384 201 L999 201 L999 629 L384 629Z"),d("b","M934.7 537.1 L1015.5 537.1 L1015.5 628.2 L934.7 628.2Z");let h=s("g",{transform:`translate(${c.toFixed(1)},${l.toFixed(1)}) scale(${r.toFixed(4)})`,style:`fill: ${a.line}`,opacity:"0.06"}),p=s("g",{"clip-path":`url(#${n}r)`});p.appendChild(s("path",{d:"M1340.3 414.7C1340.4 296.8 1244.8 201.2 1126.9 201.3L958.4 201.4C965.7 207.3 972.8 213.7 979.6 220.5C1000.9 241.8 1018.2 265.9 1031.3 292.1L1126.8 292C1159.6 292 1190.4 304.8 1213.6 328C1236.8 351.1 1249.6 382 1249.5 414.8C1249.5 447.6 1236.7 478.4 1213.5 501.6C1190.3 524.8 1159.4 537.6 1126.7 537.6L939.8 537.7C907 537.8 876.2 525 852.9 501.8C829.8 478.6 817 447.8 817.1 415C817 399.1 820.1 383.6 825.9 369.2C814.7 359.1 800.3 353.6 785.1 353.6L735.3 353.7C729.5 373.1 726.3 393.8 726.2 415.1C726.2 533 821.8 628.6 939.7 628.5L1126.6 628.4C1244.5 628.3 1340.2 532.7 1340.3 414.7Z"})),h.appendChild(p);let f=s("g",{"clip-path":`url(#${n}l)`});f.appendChild(s("path",{d:"M746.3 610.5C725 589.2 707.5 564.8 694.2 537.9L598.1 537.9C565.3 538 534.4 525.2 511.3 502.1C488.1 478.9 475.3 448.1 475.4 415.2C475.4 382.4 488.2 351.6 511.4 328.4C534.6 305.2 565.4 292.4 598.3 292.4L785.1 292.2C817.9 292.3 848.7 305 871.9 328.2C895.1 351.4 907.8 382.2 907.8 415C907.8 430.9 904.8 446.4 899 460.8C910.2 471 924.6 476.5 939.9 476.4L989.6 476.4C995.4 456.9 998.6 436.3 998.6 414.9C998.7 297 903.1 201.4 785.2 201.5L598.3 201.6C480.3 201.7 384.6 297.3 384.6 415.3C384.5 533.3 480 628.8 598 628.8L766.2 628.6C759.4 623 752.7 616.9 746.3 610.5Z"})),h.appendChild(f),h.appendChild(s("path",{d:"M771.5 430C796.8 542.8 866.9 593.7 982.1 582.7",style:`fill:none;stroke:${a.line};stroke-width:50;stroke-linecap:butt;stroke-miterlimit:4`}));let g=s("g",{"clip-path":`url(#${n}b)`});g.appendChild(s("rect",{x:"934.7",y:"537.1",width:"80.8",height:"91.2"})),h.appendChild(g),e.appendChild(h)}function et(){let e=document.querySelector(".ocm-gallery-view");if(!e)return null;let t=[...document.querySelectorAll(".ocm-category-section[data-category]")];if(!t.length)return null;let n=un();document.documentElement.style.setProperty("--ocm-nav-h",`${n}px`);let o=document.createElement("nav");o.className="ocm-sidebar",o.setAttribute("aria-label",T.navCategories);let i=[],r=d=>i.forEach(h=>{let p=h.dataset.filter===d;h.classList.toggle("ocm-sidebar-active",p),p?h.setAttribute("aria-current","true"):h.removeAttribute("aria-current")});t.forEach((d,h)=>{let p=d.dataset.category,f=T.categories[p]||p.split("-").map(y=>y.charAt(0).toUpperCase()+y.slice(1)).join("-"),g=document.createElement("button");g.type="button",g.className="ocm-sidebar-item"+(h===0?" ocm-sidebar-active":""),g.textContent=f,g.dataset.filter=p,h===0&&g.setAttribute("aria-current","true"),g.addEventListener("click",()=>{r(p),mn(d,n,o)}),o.appendChild(g),i.push(g)}),e.insertBefore(o,e.firstChild);let c=!1,l=()=>{c||(c=!0,requestAnimationFrame(()=>{c=!1;let d=n+tt(o)+24,h=t[0].dataset.category;for(let p of t)if(p.getBoundingClientRect().top-d<=0)h=p.dataset.category;else break;r(h)}))};return window.addEventListener("scroll",l,{passive:!0}),window.addEventListener("resize",l),l(),o}function mn(e,t,n){let o=t+tt(n)+16,i=e.getBoundingClientRect().top+window.scrollY-o;window.scrollTo({top:i,behavior:"smooth"})}function tt(e){return getComputedStyle(e).flexDirection==="row"?e.getBoundingClientRect().height:0}function un(){let e=document.querySelector(".w-nav, nav, header");for(;e&&e!==document.body;){let t=getComputedStyle(e).position;if(t==="fixed"||t==="sticky")return e.getBoundingClientRect().height;e=e.parentElement}return 0}var nt=!1;function ot(){if(nt)return;nt=!0;let e=document.createElement("style");e.textContent=`
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
      color: ${a.textAdaptiveMuted};
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
         inset 10% from the top and right \u2014 pad past that line, not
         past the cube's outer bounds, so text centers on the square
         you actually read, not the bevel. */
      padding: 30px 26px 14px 14px;
    }

    .ocm-block-cube--pending .ocm-bc-fee,
    .ocm-block-cube--pending .ocm-bc-range,
    .ocm-block-cube--pending .ocm-bc-row,
    .ocm-block-cube--pending .ocm-bc-meta { color: ${a.textAdaptive}; }

    .ocm-block-cube--confirmed .ocm-bc-fee,
    .ocm-block-cube--confirmed .ocm-bc-range,
    .ocm-block-cube--confirmed .ocm-bc-row,
    .ocm-block-cube--confirmed .ocm-bc-meta { color: ${a.textAdaptiveInverse}; }

    .ocm-bc-fee {
      font-family: ${a.heading};
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
      font-family: ${a.heading};
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: ${a.textAdaptive};
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
      font-family: ${a.heading};
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      text-align: center;
      color: ${a.textAdaptiveMuted};
      border: 1px solid ${a.textAdaptiveMuted};
      padding: 10px 14px;
      border-radius: 0;
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    .ocm-sidebar-item:hover {
      color: ${a.textAdaptive};
      border-color: ${a.textAdaptive};
      background: light-dark(rgba(0,0,0,0.05), rgba(255,255,255,0.05));
    }
    .ocm-sidebar-item.ocm-sidebar-active {
      color: ${a.accentText};
      border-color: ${a.accent};
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
      font-family: ${a.heading};
      font-size: 22px;
      font-weight: 600;
      color: ${a.accentText};
      letter-spacing: 0.01em;
      text-align: right;
      white-space: nowrap;
    }
    .ocm-card-period-btn {
      font-family: ${a.heading};
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
      color: ${a.muted};
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
    }
    .ocm-card-period-btn:hover { color: ${a.textAdaptive}; }
    .ocm-card-period-btn.ocm-card-period-active {
      color: ${a.accentText};
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
      font-family: ${a.heading};
      font-size: 11px;
      /* Bold, never underlined: it has to carry the same visual weight as
         the headline figure, otherwise the only action on the card
         disappears into the background. */
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      text-decoration: none;
      border-bottom: 0;
      color: ${a.accentText};
      cursor: pointer;
    }

    /* Headings inside cards \u2014 covers WHTML-inserted cards without the
       Webflow ocm-card-title class (same values, so existing cards unaffected). */
    .ocm-card h3 {
      font-family: ${a.heading};
      font-size: 17px;
      font-weight: 500;
      line-height: 1.2;
      color: ${a.textAdaptive};
      margin: 0 0 4px;
    }

    /* Card meta container \u2014 styles the direct text in WHTML-inserted cards
       where the subtitle lives directly in .ocm-card-meta (not in p.ocm-card-sub).
       Inherited values are overridden by child elements in existing Webflow cards. */
    .ocm-card-meta {
      font-size: 12px;
      font-weight: 300;
      color: ${a.muted};
    }

    /* Keyboard focus, same accent as the active state so it reads as one system. */
    .ocm-card-period-btn:focus-visible,
    .ocm-sidebar-item:focus-visible,
    .ocm-related-link:focus-visible {
      outline: 2px solid ${a.accent};
      outline-offset: 2px;
    }
    /* The sidebar entries are buttons now (they were divs): reset the UA button look. */
    .ocm-sidebar-item { background: none; font: inherit; cursor: pointer; }
    .ocm-sidebar-item {
      font-family: ${a.heading};
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
         the card on narrow screens \u2014 let the top row wrap instead. */
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
        background: light-dark(${a.paper}, ${a.ink});
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .ocm-sidebar::-webkit-scrollbar { display: none; }
      .ocm-sidebar-item { flex: 0 0 auto; align-self: center; white-space: nowrap; }
      [class*="ocm-cards-grid"] { grid-template-columns: 1fr !important; }
      .ocm-category-section { border: none; padding: 0 0 8px; }
    }
  `,document.head.appendChild(e)}var it=!1;function fe(){if(it)return;it=!0;let e=document.createElement("style");e.id="ocm-skeleton-styles",e.textContent=`
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
      font-family: ${a.body};
      font-style: italic;
      font-size: 13px;
      letter-spacing: 0.02em;
      color: ${a.muted};
      pointer-events: none;
    }

    /* Source unreachable \u2014 deliberately not a chart. */
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
      font-family: ${a.heading};
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(128,128,128,0.9);
    }
    .ocm-unavail-note {
      font-family: ${a.body};
      font-style: italic;
      font-size: 12px;
      line-height: 1.5;
      color: ${a.muted};
      max-width: 34ch;
    }

    @media (prefers-reduced-motion: reduce) {
      .ocm-skel::after { animation: none; }
    }
  `,document.head.appendChild(e)}function ee(){fe();let e=document.createElement("div");e.className="ocm-skel",e.style.cssText="width:100%;height:100%;";let t=document.createElement("div");t.className="ocm-skel-chart",[35,55,42,70,58,80,62,90,74,66].forEach(o=>{let i=document.createElement("span");i.style.height=o+"%",t.appendChild(i)}),e.appendChild(t);let n=document.createElement("span");return n.className="ocm-skel-label",n.textContent="Loading\u2026",e.appendChild(n),e}function te(e,{reason:t=""}={}){fe();let n=document.createElement("div");n.className="ocm-unavail";let o=document.createElement("span");o.className="ocm-unavail-title",o.textContent=T.unavailable;let i=document.createElement("span");return i.className="ocm-unavail-note",i.textContent=t||T.unreachable(e?.source),n.appendChild(o),n.appendChild(i),n}var at=["1W","1M","3M","1Y","ALL"],ye="1Y",rt=200,fn=2e3,gn=["1Y","3M","1M","1W","ALL"],yn={"1W":7,"1M":30,"3M":90,"1Y":365};function bn(e,t){let n=G(e,t);if(!n.length)return!1;if(t==="ALL")return!0;let o=yn[t];return o?(n.length>1?(n[n.length-1].ts-n[0].ts)/864e5:0)>=o*.7:!1}async function st(e){ot(),et(),await wn(e)}var ze=new WeakSet,ge=new WeakSet;function ct(e,t=rt){let n=e.getBoundingClientRect();return n.width===0&&n.height===0?!1:n.bottom>-t&&n.top<(window.innerHeight||0)+t}function xn(e){let t=setInterval(()=>{let n=e.filter(o=>!ze.has(o));if(!n.length){clearInterval(t);return}n.forEach(o=>{ge.has(o)||ct(o)&&Re(o)})},fn)}async function wn(e){let t=[...document.querySelectorAll(".ocm-card")].filter(i=>{let r=i.dataset.chartId;return r&&U.some(c=>c.id===r)});t.forEach(i=>{let r=i.dataset.chartId,c=i.querySelector(".ocm-see-more");c&&(c.textContent=T.seeMore,c.addEventListener("click",h=>{h.stopPropagation(),h.preventDefault(),window.location.href=pe(r)}));let l=i.querySelector(".ocm-card-chart");l&&!l.firstChild&&(l.classList.add("ocm-card-chart-full"),l.appendChild(ee()));let d=i.querySelector(".ocm-card-reading");d&&(d.style.display="none")});let n=new IntersectionObserver(i=>{i.forEach(r=>{r.isIntersecting&&Re(r.target)})},{rootMargin:`${rt}px 0px`});t.forEach(i=>n.observe(i)),t.forEach(i=>{ct(i)&&Re(i)}),xn(t),(window.requestIdleCallback||(i=>setTimeout(i,2500)))(()=>{U.forEach(i=>{O(i.api).catch(()=>{})})})}async function Re(e){if(ze.has(e)||ge.has(e))return;let t=e.dataset.chartId,n=U.find(i=>i.id===t);if(!n)return;let o=e.querySelector(".ocm-card-chart");if(o){ge.add(e);try{await vn(e,n,o),ze.add(e)}catch(i){console.warn(`[gallery] card "${t}" failed to mount:`,i)}finally{ge.delete(e)}}}async function vn(e,t,n){n.classList.add("ocm-card-chart-full");let{periodBar:o,headline:i,scaleBtn:r}=kn(e),{data:c,live:l}=await O(t.api),d=ye,h=!1,p=!1,f=async()=>{if(p)return;p=!0;let b=await O(t.api,{full:!0});b.live&&(c=b.data)},g=e.querySelector("h1, h2, h3, h4, h5, h6");g&&t.title&&!Z(g)&&(g.textContent=t.title),Cn(e,t);let y=e.querySelector(".ocm-card-reading");if(!l){n.style.cssText="",n.innerHTML="",n.appendChild(te(t)),o.style.display="none",r.style.display="none",i.textContent="",y&&(y.style.display="",y.textContent=T.unavailable);return}if(t.type==="ranking"&&(o.style.display="none",d="ALL"),t.type==="ranking"){let b=[...c].sort((u,M)=>M.v-u.v)[0];b&&(i.textContent=Q(b.v,t.unit))}else{let b=c[c.length-1];b&&(i.textContent=Q(b.v,t.unit))}let w=b=>{X(n,c,t,b,{scale:h?"log":"lin"}),n.firstChild?n.style.cssText="":(n.style.cssText="display:flex;align-items:center;justify-content:center",n.innerHTML=`<span style="font-family:${a.body};font-style:italic;font-size:13px;color:rgba(128,128,128,0.5)">No data for this period</span>`)};t.type==="ranking"?r.style.display="none":r.addEventListener("click",()=>{h=!h,lt(r,h),w(d)});let A=()=>o.querySelectorAll("[data-period]");if(t.type!=="ranking"){let b=at.filter(u=>bn(c,u));A().forEach(u=>{u.style.display=b.includes(u.dataset.period)?"":"none"}),d=gn.find(u=>b.includes(u))||b[0]||ye,A().forEach(u=>{u.classList.toggle("ocm-card-period-active",u.dataset.period===d),u.setAttribute("aria-pressed",String(u.dataset.period===d))})}A().forEach(b=>{b.addEventListener("click",async()=>{d=b.dataset.period,A().forEach(u=>{u.classList.toggle("ocm-card-period-active",u===b),u.setAttribute("aria-pressed",String(u===b))}),d==="ALL"&&await f(),w(d)})}),w(d)}function kn(e){let t=e.querySelector(".ocm-card-meta"),n=document.createElement("div");n.className="ocm-card-toprow";let o=document.createElement("div");o.className="ocm-card-periods",at.forEach(c=>{let l=document.createElement("button");l.type="button",l.className="ocm-card-period-btn"+(c===ye?" ocm-card-period-active":""),l.textContent=c,l.dataset.period=c,l.setAttribute("aria-pressed",String(c===ye)),o.appendChild(l)});let i=document.createElement("button");i.type="button",i.className="ocm-card-period-btn ocm-card-scale-btn",lt(i,!1),o.appendChild(i);let r=document.createElement("span");return r.className="ocm-card-headline",n.appendChild(o),n.appendChild(r),t?t.insertAdjacentElement("afterend",n):e.insertBefore(n,e.firstChild),{periodBar:o,headline:r,scaleBtn:i}}function Cn(e,t){if(!t.subtitle)return;let n=e.querySelector(".ocm-card-sub");if(n){Z(n)||(n.textContent=t.subtitle);return}let o=e.querySelector(".ocm-card-meta");o&&!o.querySelector("h1, h2, h3, h4, h5, h6")&&(Z(o)||(o.textContent=t.subtitle))}function lt(e,t){e.textContent=t?"LIN":"LOG",e.title=t?"Back to linear scale":"Switch to logarithmic scale",e.setAttribute("aria-pressed",String(t)),e.classList.toggle("ocm-card-period-active",t)}var dt={"btc-price":{measures:"The spot price of Bitcoin in USD, volume-weighted across major exchanges.",importance:"The most watched metric in Bitcoin. Price discovery reflects the aggregate conviction of every market participant \u2014 miners, holders, speculators, institutions.",update:"After consolidating in the $95k\u2013$105k range through Q1 2026, BTC broke above $108k in early July. The 200-day MA is now acting as support rather than resistance \u2014 a structural shift from the bear market regime."},"market-cap":{measures:"Total circulating supply \xD7 current price. A proxy for Bitcoin's weight relative to other global assets.",importance:"Contextualizes Bitcoin within the broader asset landscape. Useful for macro comparisons, though not all BTC is liquid.",update:"Bitcoin's market cap now exceeds $2 trillion, placing it firmly in the top 5 global assets by market value. The comparison with sovereign wealth and energy giants is no longer hypothetical."},volume:{measures:"Total spot trading volume aggregated across major exchanges over a rolling 24-hour window.",importance:"Volume validates price moves. High volume on a breakout signals conviction; low volume on a rally signals fragility.",update:"Volume trending higher since May, consistent with the price breakout above $105k. A significant share is now concentrated on regulated venues \u2014 a centralization vector worth watching."},dominance:{measures:"The total number of bitcoin mined since the genesis block, out of the 21 million the protocol will ever create.",importance:"This is Bitcoin's monetary policy made visible. Issuance is fixed, public, and halves roughly every four years, so the curve flattens on a schedule nobody can renegotiate.",update:"With 20.07 million coins in circulation, more than 95% of all bitcoin that will ever exist has already been mined, and the remainder will trickle out over the next century. The next halving, expected around 2028, will make new supply a rounding error: from that point on, scarcity is no longer a projection but a measured fact."},hashrate:{measures:"Estimated total computational power in exahashes per second dedicated to mining Bitcoin blocks.",importance:"Hashrate is the thermometer of miner conviction. Rising hashrate means miners are betting on Bitcoin's future \u2014 they've committed capital months in advance.",update:"Post-halving hashrate recovery has been faster than any previous cycle. The 812 EH/s reading reflects massive ASIC deployments in North America, the Gulf States, and parts of Latin America."},difficulty:{measures:"The target threshold that determines how hard it is to find a valid block hash. Recalibrates every ~2,016 blocks (~2 weeks).",importance:"Difficulty is Bitcoin's self-regulating immune system. It ensures blocks arrive every ~10 minutes regardless of hashpower fluctuations.",update:"Five consecutive positive adjustments signal sustained miner profitability despite the halved block subsidy. The difficulty ribbon has fully decompressed."},"block-fees":{measures:"Average transaction fees included per block, in BTC.",importance:"Tracks the critical transition from subsidy-dependent to fee-dependent miner security \u2014 one of Bitcoin's most important long-term metrics.",update:"Fees represent 5\u20138% of miner revenue on average days, spiking to 15\u201320% during inscription or Runes activity. Still far from fee sustainability, but the trajectory is encouraging."},hashprice:{measures:"Estimated daily USD revenue a miner earns per terahash of computational power deployed.",importance:"The single most important metric for miner economics. When hash price falls below production cost, capitulation follows.",update:"Hash price bottomed at $0.035 in late 2025 and has recovered above the psychological $0.045 threshold. Miners running S21-class hardware are now comfortably profitable."},"active-addresses":{measures:"The number of unique Bitcoin addresses that appeared in at least one transaction on a given day.",importance:"A rough proxy for network usage. Rising active addresses during price increases suggests organic demand rather than speculative leverage.",update:"Active addresses crossed 1M/day in June \u2014 a threshold last seen during the 2021 bull market. Fewer exchange addresses, more self-custody and Lightning channel opens this time."},"lth-supply":{measures:"The bitcoin miners earn each day, combining the block subsidy with the transaction fees paid in that day's blocks.",importance:"This is the network's security budget, what it costs to keep mining honest. Every halving cuts the subsidy in half, so the long-run question is whether fee income grows enough to replace it.",update:"Miners currently take home around 450 BTC a day, nearly all of it from the 3.125 BTC subsidy in place since the April 2024 halving. With fees stuck in the 5\u20138% range outside congestion spikes, the security budget still leans almost entirely on issuance, and every halving raises the stakes of that dependence."},"exchange-balance":{measures:"Aggregate Bitcoin balance held across known exchange wallets.",importance:"Declining exchange balances suggest coins moving to self-custody \u2014 a supply squeeze signal. Rising balances suggest potential sell pressure.",update:"Exchange balances continue their multi-year decline. The ETF effect amplifies this: institutional buyers custody through regulated custodians, not exchange hot wallets."},nvt:{measures:"Market cap divided by daily on-chain transaction volume in USD. Think of it as a P/E ratio for Bitcoin.",importance:"High NVT = the network is valued richly relative to usage. Low NVT = undervalued or usage is spiking.",update:"NVT in the 60\u201375 range at this price level suggests the rally is fundamentally supported by on-chain activity, not pure speculation."},"mempool-size":{measures:"Total size of unconfirmed transactions waiting in the mempool, measured in virtual megabytes.",importance:"The most immediate indicator of network congestion and fee pressure. A full mempool means fee competition is live.",update:"The mempool has been oscillating between 20\u201360 MB through Q2 2026. No extreme congestion events since the Runes launch spike."},"fee-rates":{measures:"The fee rate in sat/vB required to be included in the next block vs. lower priority tiers.",importance:"Fee rates directly impact user experience. Understanding the distribution helps users choose the right fee for their urgency.",update:"Fee rates have stabilized into a more predictable pattern than the chaotic 2024 Ordinals era. The spread between next-block and low-priority has narrowed."},"tx-per-second":{measures:"Average number of on-chain transactions confirmed per second over a rolling 24-hour window.",importance:"Bitcoin's base layer throughput is deliberately limited. This metric contextualizes the need for Layer 2 solutions.",update:"Bitcoin consistently processes 5\u20137 tx/s on-chain \u2014 unchanged in years by design. This is precisely why Lightning, Ark, and other L2s exist."},"block-weight":{measures:"Average weight of mined blocks in million weight units. Max is 4 MWU. Measures how full the available block space is.",importance:"Consistently full blocks mean fee competition is structural, not temporary. Makes the block size debate concrete.",update:"Blocks running at 96% capacity is the new normal. Between financial transactions, inscriptions, and protocol-level data, the 4 MWU limit is tested daily."}};var W=!1,pt=null;function $n(e,t){let n=e.querySelector(".ocm-period-selector");if(!n)return null;let o=n.querySelector(".ocm-scale-btn");return o||(o=document.createElement("a"),o.className="ocm-period-btn ocm-scale-btn w-button",o.href="#",o.style.marginLeft="10px",o.addEventListener("click",i=>{i.preventDefault(),t()}),n.appendChild(o)),o.textContent=W?"LIN":"LOG",o.title=W?"Back to linear scale":"Switch to logarithmic scale",o.setAttribute("aria-pressed",String(W)),o.classList.toggle("ocm-period-active",W),o}async function be(e,t){let n=U.find(w=>w.id===e),o=dt[e]||{},i=document.querySelector(".ocm-detail-view");if(!n||!i)return;let r=i.querySelector(".ocm-breadcrumb-cat");r&&(r.textContent=Sn(n.category)),re(i,".ocm-detail-title",n.title),re(i,".ocm-detail-subtitle",n.subtitle),re(i,".ocm-measures-text",o.measures||""),re(i,".ocm-importance-text",o.importance||""),re(i,".ocm-editorial-text",o.update||""),i.querySelectorAll(".ocm-period-selector [data-period]").forEach(w=>{w.classList.toggle("ocm-period-active",w.dataset.period===t)}),pt!==e&&(W=!1,pt=e),$n(i,()=>{W=!W,be(e,t)});let c=i.querySelector(".ocm-reading-value");c&&(c.textContent=T.loading);let l=i.querySelector(".ocm-detail-chart");if(l){l.innerHTML="";let w=ee();w.style.minHeight="300px",l.appendChild(w)}let{data:d,live:h}=await O(n.api,{full:t==="ALL"}),p=G(d,t),f=p[p.length-1],g=i.querySelector(".ocm-reading-value");if(!h){g&&(g.textContent=T.unavailable);let w=i.querySelector(".ocm-period-selector");w&&(w.style.display="none"),l&&(l.innerHTML="",l.appendChild(te(n))),ht(i,n);return}let y=i.querySelector(".ocm-period-selector");y&&(y.style.display=""),g&&f&&(g.textContent=Fe(f.v,n.unit)),l&&X(l,d,n,t,{scale:W?"log":"lin"}),ht(i,n)}function ht(e,t){let n=e.querySelector(".ocm-related-grid");n&&(n.innerHTML="",U.filter(o=>o.category===t.category&&o.id!==t.id).slice(0,4).forEach(o=>{let i=document.createElement("a");i.className="ocm-related-link",i.href=pe(o.id),i.style.cssText="padding:14px 16px;cursor:pointer;transition:background 0.15s",i.innerHTML=`
        <h3 style="font-family:${a.heading};font-size:14px;font-weight:500;margin:0 0 4px;color:${a.textAdaptive}">${o.title}</h3>
        <p style="font-size:12px;color:${a.muted};margin:0;font-style:italic;font-family:${a.body}">${o.subtitle}</p>
      `,i.addEventListener("click",r=>{r.preventDefault(),document.dispatchEvent(new CustomEvent("ocm:openChart",{detail:o.id}))}),i.addEventListener("mouseenter",()=>i.style.background="rgba(128,128,128,0.08)"),i.addEventListener("mouseleave",()=>i.style.background=""),n.appendChild(i)}))}function re(e,t,n){let o=e.querySelector(t);o&&!Z(o)&&(o.textContent=n)}function Sn(e){return e.replace("-"," ").toUpperCase()}var mt={"btc-price":"This chart tracks the daily BTC/USD reference rate compiled by Coin Metrics from major spot exchanges. Price is Bitcoin's most watched signal: it reflects global demand for a fixed-supply asset and sets the economics of mining, fees, and adoption. Use the period selector to compare short-term swings with multi-year trends \u2014 daily closes smooth out intraday volatility.","market-cap":"Market capitalization multiplies the circulating BTC supply by the current price, giving a dollar measure of the network's total market value. It is the quickest way to compare Bitcoin with other assets, from gold to tech stocks. Because supply grows on a fixed, predictable schedule, long-term changes in market cap are driven almost entirely by price.",volume:"This chart aggregates 24-hour spot trading volume across the exchanges tracked by CoinGecko. Volume measures how much bitcoin actually changes hands and how deep the market is. Spikes usually accompany sharp price moves or macro news, while quiet periods signal consolidation. Persistent volume growth is a healthier adoption signal than price action alone.",dominance:"Circulating supply counts every bitcoin mined since the genesis block in 2009, out of the 21 million that will ever exist. New coins enter circulation with each block, and the issuance rate halves roughly every four years. The curve flattens with every halving \u2014 a fixed, predictable monetary schedule that no other major asset offers.",hashrate:"Network hashrate estimates the total computational power securing Bitcoin, measured in exahashes per second. More hashrate means a more expensive network to attack, making it a direct proxy for security. It also reflects miner confidence: operators only deploy hardware they expect to be profitable. Short-term swings are statistical noise; the long-term trend is what matters.",difficulty:"Mining difficulty measures how hard it is to find a valid block. The protocol adjusts it every 2,016 blocks \u2014 about two weeks \u2014 so blocks keep arriving roughly every ten minutes regardless of how much hashrate joins or leaves. Rising difficulty tracks hashrate growth; rare downward adjustments usually follow miner capitulation or major disruptions.","block-fees":"This chart shows the average transaction fees collected per block, in BTC. Fees are the market price of scarce block space: they surge when demand spikes \u2014 bull runs, inscription waves \u2014 and fall back in quiet periods. As block subsidies halve over time, fees are set to become the dominant source of miner revenue and long-term security budget.",hashprice:"Hashprice measures a miner's expected daily revenue per terahash per second of computing power, in dollars. It condenses price, difficulty, and fees into a single profitability metric. Falling hashprice squeezes margins and pushes inefficient operators offline; rising hashprice invites new capacity online. It is the industry's benchmark for the health of the mining economy.","block-rewards":"Block rewards combine the fixed subsidy of newly issued bitcoin with the transaction fees included in each block \u2014 the total income miners earn per block. The subsidy halves roughly every four years, so the fee share of the reward grows over time: a slow transition that will ultimately fund Bitcoin's security entirely through fees.","mining-pools":"This ranking shows the share of blocks mined by each pool over the last twelve months. Pool distribution is a key decentralization indicator: a pool nearing half the network's blocks raises censorship and reorg concerns. Pools coordinate hashrate owned by many independent miners, however, who can and do switch pools when incentives shift.","active-addresses":"Active addresses count the unique Bitcoin addresses involved in transactions each day \u2014 a rough proxy for network usage: more active addresses generally mean more people or services transacting on-chain. The metric has limits, since one entity can control many addresses and batching compresses activity, but its long-term trend tracks real adoption.","lth-supply":"Miner revenue totals the BTC earned by miners each day, combining new-issuance subsidies and transaction fees. It represents Bitcoin's security budget: the money paid to keep the network honest. Revenue rises with fees during congestion and drops sharply at each halving, forcing efficiency gains across the industry. Its composition shows how the fee transition is progressing.","exchange-balance":"This chart estimates the total bitcoin held on exchange addresses tracked by Coin Metrics. Falling balances suggest coins moving to self-custody or long-term holding; rising balances can signal intent to sell. It is an imperfect but widely watched gauge of market-wide custody behavior and liquid supply \u2014 sustained outflows have marked every recent cycle.",nvt:"Daily transactions count confirmed on-chain Bitcoin transactions. The metric gauges demand for block space, though it undercounts economic activity: a single transaction can batch hundreds of payments, and Lightning moves value off-chain entirely. Sustained changes still reveal shifting usage patterns, from payment adoption to inscription waves competing for the same limited space.","lightning-nodes":"This chart counts public nodes on the Lightning Network, Bitcoin's second layer for instant, low-fee payments. Node count gauges the network's reach and decentralization, though it only captures publicly announced nodes \u2014 private ones are invisible to crawlers. Steady growth signals a maturing routing infrastructure operated by individuals, businesses, and dedicated routing operators.","lightning-channels":"Lightning channels are payment connections between two nodes, each funded with bitcoin locked on-chain. This chart tracks the total number of public channels. More channels mean more possible payment routes and better liquidity. When channel count consolidates while capacity keeps growing, it suggests fewer but larger, better-managed channels \u2014 a sign of professionalization.","lightning-capacity":"Lightning capacity measures the total bitcoin locked in public payment channels \u2014 the network's headline liquidity metric: more capacity means larger payments can route successfully. Public capacity understates the true figure, since private channels are excluded. Denominated in BTC rather than dollars, it isolates genuine network growth from price swings. Watch the trend, not the level.","lightning-avg-channel":"Average channel size divides total public capacity by the number of channels. Rising averages indicate professionalization \u2014 routing nodes deploying serious liquidity rather than hobbyist experiments. Falling averages can mean broader grassroots adoption through many small channels. Combined with node and channel counts, this metric sketches how the network's structure is evolving.","lightning-countries":"This ranking maps public Lightning nodes to countries using IP geolocation, showing where routing infrastructure is physically concentrated. Heavy concentration in a few jurisdictions matters for censorship resistance and regulatory exposure. Nodes running behind Tor cannot be located, so a large share of the network remains geographically unknown \u2014 a feature, not a bug.","lightning-isp":"This ranking shows which internet providers host the most public Lightning nodes. Concentration among a few cloud giants is a centralization pressure point: an outage or policy change at a single provider could disrupt significant routing capacity. Nodes running on residential connections or behind Tor counterbalance that dependency and keep the network resilient.","mempool-size":"The mempool is the waiting room for unconfirmed transactions; this chart tracks its size in megabytes. A growing mempool signals congestion \u2014 demand for block space exceeding supply, pushing fees upward. An empty mempool means transactions confirm in the next block at minimal cost. It is the network's real-time load indicator.","fee-rates":"This chart shows current fee rates in satoshis per virtual byte, broken down by confirmation priority. It answers a practical question: what should you pay to confirm within the next block, within an hour, or eventually? Fee rates move with mempool congestion and are the clearest real-time signal of demand for block space.","tx-per-second":"Transactions per second measures on-chain throughput. Bitcoin's base layer processes only a handful of transactions per second by design \u2014 a deliberate trade-off favoring decentralization and verifiability over raw speed. Higher payment volumes move to layers built on top, like Lightning. Sustained changes in TPS reflect shifts in how block space is being used.","block-weight":"Block weight measures how full Bitcoin blocks are, in million weight units, against the four-million cap introduced with SegWit. Consistently full blocks mean persistent demand for block space and a working fee market; lighter blocks signal slack demand. The metric shows whether Bitcoin's scarce settlement capacity is actually being consumed."};var Tn=["1W","1M","3M","1Y","ALL"],An={"1W":7,"1M":30,"3M":90,"1Y":365};function Mn(e,t){let n=G(e,t);if(!n.length)return!1;if(t==="ALL")return!0;let o=An[t];return(n.length>1?(n[n.length-1].ts-n[0].ts)/864e5:0)>=o*.7}function Ln(){try{let e=[...document.querySelectorAll("h2")].find(n=>n.textContent.trim()==="Latest articles"),t=e&&e.closest("section");if(!t||t.querySelector(".ocm-embed"))return;if(!t.querySelector(".w-dyn-item")){t.style.display="none";return}Object.assign(t.style,{width:"100%",maxWidth:"1100px",margin:"0 auto",padding:"16px 16px 48px",boxSizing:"border-box"})}catch{}}async function ut(e,t){let n=U.find(m=>m.id===t);if(!n){let m=document.createElement("p");m.style.cssText=`font-family:${a.body};color:${a.muted};padding:20px`,m.textContent="Chart not found.",e.replaceChildren(m);return}if(!document.getElementById("ocm-embed-styles")){let m=document.createElement("style");m.id="ocm-embed-styles",m.textContent=`
      .ocm-embed { display:flex; flex-direction:column; gap:0; width:100%; max-width:720px; margin:0 auto; }
      .ocm-embed-topbar { display:flex; align-items:baseline; justify-content:space-between; flex-wrap:wrap; gap:8px; padding:0 0 12px; }
      .ocm-embed-headline { font-family:${a.heading}; font-size:clamp(22px,3vw,32px); font-weight:700; color:${a.textAdaptive}; letter-spacing:-0.5px; line-height:1; }
      .ocm-embed-reading { font-family:${a.heading}; font-size:clamp(20px,2.4vw,28px); font-weight:700; color:${a.accentText}; }
      .ocm-embed-periods { display:flex; gap:6px; padding:0 0 10px; flex-wrap:wrap; }
      .ocm-embed-pbtn { font-family:${a.heading}; font-size:11px; font-weight:500; letter-spacing:0.5px; text-transform:uppercase; padding:4px 10px; border:1px solid rgba(128,128,128,0.25); border-radius:3px; cursor:pointer; color:${a.textAdaptiveMuted}; background:transparent; transition:all 0.15s; }
      .ocm-embed-pbtn:hover { border-color:${a.accent}; color:${a.accentText}; }
      .ocm-embed-pbtn.active { border-color:${a.accent}; color:${a.accentText}; background:rgba(247,147,26,0.08); }
      .ocm-embed-sbtn { margin-left:8px; }
      .ocm-embed-chart { width:100%; aspect-ratio:680/380; }
      .ocm-embed-back { font-family:${a.heading}; font-size:12px; font-weight:500; letter-spacing:0.5px; text-transform:uppercase; color:${a.textAdaptiveMuted}; text-decoration:none; display:inline-block; padding:0 0 14px; transition:color 0.15s; }
      .ocm-embed-back:hover { color:${a.accentText}; }
      .ocm-embed-desc { font-family:${a.body}; font-size:15px; line-height:1.65; color:${a.textAdaptiveMuted}; max-width:720px; padding:20px 0 0; }
      .ocm-embed-desc h3 { font-family:${a.heading}; font-size:13px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:${a.textAdaptive}; margin:0 0 8px; }
      .ocm-embed-desc p { margin:0; }
      @media (max-width: 700px) {
        /* Safety net against iOS sideways panning when anything overflows */
        html, body { overflow-x: hidden !important; overflow-x: clip !important; max-width: 100vw; }
      }
    `,document.head.appendChild(m)}ne!=="fr"&&(document.title=`${n.title} | Off-Chain Media`);let o=mt[t];if(o){let m=document.querySelector('meta[name="description"]');if(m||(m=document.createElement("meta"),m.setAttribute("name","description"),document.head.appendChild(m)),!m.getAttribute("content")){let v=o.replace(/—/g,"-").replace(/\s+/g," ");m.setAttribute("content",v.length>155?v.slice(0,152).trimEnd()+"...":v)}}e.classList.add("ocm-embed"),e.innerHTML=`
    <a class="ocm-embed-back" href="/data">${T.allCharts.replace("\u2190","&larr;")}</a>
    <div class="ocm-embed-topbar">
      <span class="ocm-embed-headline">${n.title}</span>
      <span class="ocm-embed-reading">Loading\u2026</span>
    </div>
    <div class="ocm-embed-periods"></div>
    <div class="ocm-embed-chart"></div>
    ${o?`<div class="ocm-embed-desc"><h3>What this measures</h3><p>${o}</p></div>`:""}
  `,Ln();let i=e.querySelector(".ocm-embed-topbar"),r=e.querySelector(".ocm-embed-reading"),c=e.querySelector(".ocm-embed-periods"),l=e.querySelector(".ocm-embed-chart");l.appendChild(ee());let{data:d,live:h}=await O(n.api),p=!1;if(!h){r.textContent=T.unavailable,c.style.display="none",l.innerHTML="",l.appendChild(te(n));return}let f=!1,g=async()=>{if(f)return;f=!0;let m=await O(n.api,{full:!0});m.live&&(d=m.data)};if(n.type==="ranking"){let m=[...d].sort((v,C)=>C.v-v.v)[0];m&&(r.textContent=Q(m.v,n.unit)),c.style.display="none",X(l,d,n,"ALL");return}let y=d[d.length-1];y&&(r.textContent=Q(y.v,n.unit));let w=Tn.filter(m=>Mn(d,m)),b=["1Y","3M","1M","1W","ALL"].find(m=>w.includes(m))||w[0]||"1Y";w.forEach(m=>{let v=document.createElement("button");v.className="ocm-embed-pbtn"+(m===b?" active":""),v.textContent=m,v.dataset.period=m,v.addEventListener("click",async()=>{b=m,c.querySelectorAll("[data-period]").forEach(C=>C.classList.toggle("active",C===v)),m==="ALL"&&await g(),_()}),c.appendChild(v)});let u=document.createElement("button");u.className="ocm-embed-pbtn ocm-embed-sbtn";let M=()=>{u.textContent=p?"LIN":"LOG",u.title=p?"Back to linear scale":"Switch to logarithmic scale",u.setAttribute("aria-pressed",String(p)),u.classList.toggle("active",p)};M(),u.addEventListener("click",()=>{p=!p,M(),_()}),c.appendChild(u);function _(){X(l,d,n,b,{scale:p?"log":"lin"})}_()}var Bn=45e3,k=10,yt=[],bt=[],ft=!0;function xt(){let e=document.querySelector(".ocm-data-hero")||document.querySelector(".ocm-gallery-view");if(!e||!e.parentElement)return;let t=document.createElement("div");t.className="ocm-blockstrip",e.parentElement.insertBefore(t,e),fe();for(let o=0;o<8;o++){let i=document.createElement("div");i.className="ocm-block-cube",i.innerHTML='<div class="ocm-skel" style="position:absolute;inset:0"></div>',t.appendChild(i)}let n=async()=>{let[{data:o},{data:i}]=await Promise.all([Ge(),We()]);yt=o.slice(0,3).map((r,c)=>({...r,_index:c})),bt=i.slice(0,15),_n(t)};n(),setInterval(n,Bn)}function _n(e){let t=e.scrollLeft;e.innerHTML="",[...yt].reverse().forEach(o=>{e.appendChild(gt("pending",{fee:o.medianFee,range:o.feeRange,fees:o.totalFees,txs:o.nTx,size:o.blockSize,meta:`in ~${(o._index+1)*10} min`}))});let n=document.createElement("div");n.className="ocm-blockstrip-divider",n.appendChild(En()),e.appendChild(n),bt.forEach(o=>{e.appendChild(gt("confirmed",{fee:o.extras.medianFee,range:o.extras.feeRange,fees:o.extras.totalFees,txs:o.tx_count,size:o.size,meta:`${Ve(o.timestamp)} \xB7 ${o.extras.pool.name}`,height:o.height}))}),e.appendChild(Fn()),ft?(ft=!1,window.matchMedia("(max-width: 700px)").matches&&e.scrollWidth>e.clientWidth&&(e.scrollLeft=n.getBoundingClientRect().left-e.getBoundingClientRect().left)):e.scrollLeft=t}function En(){let e=s("svg",{viewBox:"0 0 750 750",width:"32",height:"32",fill:"currentColor"});return e.appendChild(s("path",{d:"M 99.796875 337.5 C 75.007812 403.238281 76.148438 464.222656 83.519531 508.835938 C 96.296875 463.699219 114.085938 420.121094 136.539062 379.023438 C 156.53125 342.421875 180.320312 307.730469 207.234375 275.769531 L 162.644531 234.496094 C 135.257812 265.027344 114.082031 299.625 99.796875 337.5 Z"})),e.appendChild(s("path",{d:"M 378.777344 136.789062 C 419.863281 114.347656 463.441406 96.550781 508.597656 83.761719 C 463.976562 76.394531 402.984375 75.257812 337.257812 100.042969 C 299.386719 114.320312 264.789062 135.496094 234.253906 162.890625 L 275.523438 207.480469 C 307.484375 180.566406 342.183594 156.769531 378.777344 136.789062 Z"})),e.appendChild(s("path",{d:"M 667.679688 641.664062 L 289.960938 263.953125 L 263.707031 290.210938 L 641.425781 667.921875 C 648.433594 674.9375 660.664062 674.9375 667.683594 667.921875 C 674.917969 660.683594 674.917969 648.902344 667.679688 641.664062 Z"})),e.appendChild(s("path",{d:"M 209.78125 150.789062 C 192.59375 156.628906 180.5 166.261719 173.257812 173.503906 C 160.660156 186.101562 154.011719 199.859375 150.546875 210.027344 L 165.585938 223.949219 L 243.804688 296.335938 L 253.375 286.761719 L 296.09375 244.039062 Z"})),e}function Fn(){let e=document.createElement("a");e.className="ocm-block-cube ocm-block-explorer",e.href="https://mempool.space",e.target="_blank",e.rel="noopener noreferrer";let t=s("svg",{class:"ocm-block-cube-bg",viewBox:"0 0 100 100",preserveAspectRatio:"none"}),n=a.textAdaptive;t.appendChild(s("polygon",{points:`0,${k} ${k},0 100,0 ${100-k},${k}`,style:`fill:none; stroke:${n}; stroke-width:0.7; opacity:0.5;`})),t.appendChild(s("polygon",{points:`${100-k},${k} 100,0 100,${100-k} ${100-k},100`,style:`fill:none; stroke:${n}; stroke-width:0.7; opacity:0.5;`})),t.appendChild(s("polygon",{points:`0,${k} ${100-k},${k} ${100-k},100 0,100`,style:`fill:none; stroke:${n}; stroke-width:0.7; stroke-dasharray:3,3; opacity:0.5;`})),e.appendChild(t);let o=document.createElement("div");return o.className="ocm-block-explorer-content",o.innerHTML=`
    <p style="font-family:${a.heading};font-size:13px;font-weight:600;color:${a.textAdaptive};margin:0 0 4px;opacity:0.5;">Explorer</p>
    <p style="font-family:${a.heading};font-size:15px;font-weight:600;color:${a.textAdaptive};margin:0;">mempool</p>
    <p style="font-family:${a.heading};font-size:15px;font-weight:600;color:${a.accentText};margin:0;">.space \u2192</p>
  `,e.appendChild(o),e}function gt(e,t){let n=document.createElement("div");n.className=`ocm-block-cube ocm-block-cube--${e}`;let o=e==="confirmed",i=o?a.textAdaptive:"none",r=a.textAdaptive,c=s("svg",{class:"ocm-block-cube-bg",viewBox:"0 0 100 100",preserveAspectRatio:"none"});c.appendChild(s("polygon",{points:`0,${k} ${k},0 100,0 ${100-k},${k}`,style:`fill: ${o?a.textAdaptive:"none"}; opacity: ${o?"0.8":"1"}; stroke: ${r}; stroke-width: 1;`})),c.appendChild(s("polygon",{points:`${100-k},${k} 100,0 100,${100-k} ${100-k},100`,style:`fill: ${o?a.textAdaptive:"none"}; opacity: ${o?"0.6":"1"}; stroke: ${r}; stroke-width: 1;`})),c.appendChild(s("polygon",{points:`0,${k} ${100-k},${k} ${100-k},100 0,100`,style:`fill: ${i}; stroke: ${r}; stroke-width: 1;`})),n.appendChild(c);let l=document.createElement("div");l.className="ocm-block-cube-content";let d=t.range[0],h=t.range[t.range.length-1];if(l.innerHTML=`
    <p class="ocm-bc-fee">~${Math.round(t.fee)} sat/vB</p>
    <p class="ocm-bc-range">${d.toFixed(2)} - ${h.toFixed(0)} sat/vB</p>
    <div class="ocm-bc-row"><span>Total fees</span><span>${(t.fees/1e8).toFixed(3)} BTC</span></div>
    <div class="ocm-bc-row"><span>Transactions</span><span>${t.txs.toLocaleString("en-US")}</span></div>
    <div class="ocm-bc-row"><span>Size</span><span>${(t.size/1e6).toFixed(1)} MB</span></div>
    <p class="ocm-bc-meta">${t.meta}</p>
  `,n.appendChild(l),t.height!=null){let p=document.createElement("p");p.className="ocm-bc-height",p.textContent=t.height.toLocaleString("en-US"),n.appendChild(p)}return n}var xe=null,we="1Y",ve=document.querySelector(".ocm-gallery-view"),ke=document.querySelector(".ocm-detail-view");function vt(){ve&&(ve.style.display=""),ke&&(ke.style.display="none"),xe=null;let e=new URL(window.location.href);e.searchParams.delete("chart"),window.history.pushState({},"",e),window.scrollTo({top:0,behavior:"smooth"})}async function Ce(e,t=!0){if(xe=e,we="1Y",ve&&(ve.style.display="none"),ke&&(ke.style.display="block"),t){let n=new URL(window.location.href);n.searchParams.set("chart",e),window.history.pushState({chartId:e},"",n)}window.scrollTo({top:0,behavior:"smooth"}),await be(e,we)}function Dn(){document.querySelectorAll(".ocm-period-selector [data-period]").forEach(e=>{e.addEventListener("click",async()=>{we=e.dataset.period,xe&&await be(xe,we)})})}function Pn(){let e=document.querySelector(".ocm-back-btn");e&&e.addEventListener("click",vt)}document.addEventListener("ocm:openChart",e=>Ce(e.detail));window.addEventListener("popstate",()=>{let e=new URLSearchParams(window.location.search).get("chart");e?Ce(e,!1):vt()});async function wt(){let e=window.location.pathname.match(/^\/charts\/([a-z0-9-]+)\/?$/),t=e&&U.some(r=>r.id===e[1])?e[1]:null,n=window.__OCM__||t,o=document.querySelector(".ocm-embed");if(n&&o){await ut(o,n);return}Dn(),Pn(),xt(),await st(Ce);let i=new URLSearchParams(window.location.search).get("chart");i&&await Ce(i,!1)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",wt):wt();})();
