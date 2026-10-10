/* Off-Chain Media — Bitcoin Data Library v0.2.0 | offchain.media/data */
var OCMData=(()=>{var K=typeof document<"u"&&/^fr/i.test(document.documentElement.lang||"")?"fr":"en",ht={en:{seeMore:"See more \u2192",unavailable:"Data unavailable",loading:"Loading\u2026",allCharts:"\u2190 All charts",source:"Source: ",unreachable:e=>`${e||"The source"} could not be reached. No figure is shown rather than an estimated one.`,period:"period",latest:"latest value",ranking:e=>`ranking of ${e} entries`,first:(e,t)=>`first ${e} with ${t}`,categories:{},navCategories:"Chart categories"},fr:{seeMore:"Voir plus \u2192",unavailable:"Donn\xE9es indisponibles",loading:"Chargement\u2026",allCharts:"\u2190 Tous les graphiques",source:"Source : ",unreachable:e=>`${e||"La source"} n'a pas r\xE9pondu. Aucun chiffre n'est affich\xE9 plut\xF4t qu'une estimation.`,period:"p\xE9riode",latest:"derni\xE8re valeur",ranking:e=>`classement de ${e} entr\xE9es`,first:(e,t)=>`premier ${e} avec ${t}`,categories:{market:"March\xE9",mining:"Minage","on-chain":"On-chain",lightning:"Lightning",mempool:"Mempool"},navCategories:"Cat\xE9gories de graphiques"}},E=ht[K],J=e=>(K==="fr"?"/fr/charts/":"/charts/")+e,se=e=>K==="fr"&&!!e&&e.textContent.trim()!=="";var U=[{id:"btc-price",title:"Bitcoin Price",subtitle:"BTC/USD daily reference rate",category:"market",type:"line",api:"price",unit:"$",source:"Coin Metrics",sourceLabel:"Coin Metrics, CoinGecko"},{id:"market-cap",title:"Market Capitalization",subtitle:"Total BTC market value in USD",category:"market",type:"area",api:"marketcap",unit:"$T",source:"Coin Metrics"},{id:"volume",title:"24h Trading Volume",subtitle:"Aggregate exchange spot volume",category:"market",type:"bar",api:"volume",unit:"$B",source:"CoinGecko"},{id:"dominance",title:"Circulating Supply",subtitle:"Total BTC mined to date",category:"market",type:"area",api:"dominance",unit:"M BTC",source:"Coin Metrics"},{id:"hashrate",title:"Network Hashrate",subtitle:"Total computational power",category:"mining",type:"line",api:"hashrate",unit:"EH/s",source:"mempool.space"},{id:"difficulty",title:"Mining Difficulty",subtitle:"Adjusted every 2,016 blocks",category:"mining",type:"line",api:"difficulty",unit:"T",source:"mempool.space"},{id:"block-fees",title:"Block Fees",subtitle:"Average fees per block",category:"mining",type:"bar",api:"fees",unit:"BTC",source:"mempool.space"},{id:"hashprice",title:"Hash Price",subtitle:"Daily revenue per TH/s",category:"mining",type:"line",api:"hashprice",unit:"$/TH",source:"mempool.space"},{id:"block-rewards",title:"Block Rewards",subtitle:"Average BTC earned per block (subsidy + fees)",category:"mining",type:"area",api:"blockrewards",unit:"BTC",source:"mempool.space"},{id:"mining-pools",title:"Mining Pool Distribution",subtitle:"Share of blocks mined by pool (last 12 months)",category:"mining",type:"ranking",api:"miningpools",unit:"%",source:"mempool.space"},{id:"active-addresses",title:"Active Addresses",subtitle:"Unique addresses used daily",category:"on-chain",type:"area",api:"addresses",unit:"addresses",source:"Coin Metrics"},{id:"lth-supply",title:"Miner Revenue",subtitle:"Daily BTC earned by miners (subsidy + fees)",category:"on-chain",type:"area",api:"lth",unit:"BTC",source:"Coin Metrics"},{id:"exchange-balance",title:"Exchange Balances",subtitle:"Total BTC on exchanges",category:"on-chain",type:"line",api:"exchange",unit:"M BTC",source:"Coin Metrics"},{id:"nvt",title:"Daily Transactions",subtitle:"On-chain transaction count per day",category:"on-chain",type:"bar",api:"nvt",unit:"txns",source:"Coin Metrics"},{id:"lightning-nodes",title:"Lightning Nodes",subtitle:"Number of public Lightning Network nodes",category:"lightning",type:"area",api:"lnnodes",unit:"nodes",source:"mempool.space"},{id:"lightning-channels",title:"Lightning Channels",subtitle:"Total open payment channels",category:"lightning",type:"area",api:"lnchannels",unit:"channels",source:"mempool.space"},{id:"lightning-capacity",title:"Lightning Capacity",subtitle:"Total BTC locked in the Lightning Network",category:"lightning",type:"line",api:"lncapacity",unit:"BTC",source:"mempool.space"},{id:"lightning-avg-channel",title:"Avg Channel Size",subtitle:"Average BTC locked per Lightning channel",category:"lightning",type:"line",api:"lnavgchannel",unit:"BTC",source:"mempool.space"},{id:"lightning-countries",title:"Nodes by Country",subtitle:"Top countries by public Lightning node count",category:"lightning",type:"ranking",api:"lncountries",unit:"nodes",source:"mempool.space"},{id:"lightning-isp",title:"Nodes by ISP",subtitle:"Top internet providers hosting Lightning nodes",category:"lightning",type:"ranking",api:"lnisp",unit:"nodes",source:"mempool.space"},{id:"mempool-size",title:"Mempool Size",subtitle:"Pending transactions in vBytes",category:"mempool",type:"area",api:"mempool",unit:"MB",source:"mempool.space"},{id:"fee-rates",title:"Median Fee Rate",subtitle:"sat/vB paid in mined blocks",category:"mempool",type:"bar",api:"feerates",unit:"sat/vB",source:"mempool.space"},{id:"tx-per-second",title:"Transactions Per Second",subtitle:"On-chain throughput",category:"mempool",type:"line",api:"tps",unit:"tx/s",source:"Coin Metrics"},{id:"block-weight",title:"Average Block Weight",subtitle:"How full are Bitcoin blocks?",category:"mempool",type:"bar",api:"blockweight",unit:"MWU",source:"mempool.space"}];var O="https://ocm-proxy.offchainmedia.workers.dev",ce="",mt="https://community-api.coinmetrics.io/v4/timeseries/asset-metrics";var Ce=0,Fe=[];async function D(e){Ce>=4&&await new Promise(t=>Fe.push(t)),Ce++;try{let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status}`);return await t.json()}finally{Ce--;let t=Fe.shift();t&&t()}}var W=e=>e==="full"?"all":"1y",Y={},Q={},ke={},Pe="ocm:d2:",ut=30*60*1e3;function ft(e){try{let t=localStorage.getItem(Pe+e);if(!t)return null;let{t:n,d:o}=JSON.parse(t);return Date.now()-n>ut?null:o}catch{return null}}function gt(e,t){try{localStorage.setItem(Pe+e,JSON.stringify({t:Date.now(),d:t}))}catch{}}function T(e,t,n,o,i){let r=n,c=e,l=Date.now();return Array.from({length:t},(d,m)=>(c=(c*9301+49297)%233280,r+=Math.sin(m*.5+e)*o+i,r=Math.max(n*.3,r),{ts:l-(t-m)*864e5,v:r}))}var De={price:()=>T(5,365,85e3,4e3,120),marketcap:()=>T(7,365,16e11,8e10,3e9),volume:()=>T(13,365,35,8,.1),dominance:()=>T(6,365,19.8,.05,.001),hashrate:()=>T(3,365,600,25,.6),difficulty:()=>T(9,52,80,5,.15),fees:()=>T(11,90,.15,.05,.001),hashprice:()=>T(12,180,.042,.008,1e-4),addresses:()=>T(14,365,9e5,8e4,500),lth:()=>T(13,365,500,30,.5),exchange:()=>T(15,365,2.8,.04,-.001),nvt:()=>T(16,365,6e5,5e4,100),lnnodes:()=>T(21,365,16e3,500,10),lnchannels:()=>T(22,365,65e3,2e3,50),lncapacity:()=>T(23,365,5300,50,1),lnavgchannel:()=>T(25,365,.046,.004,-5e-5),blockrewards:()=>T(24,1825,3.25,.4,-2e-4),mempool:()=>T(17,90,35,18,.05),feerates:()=>T(18,90,15,10,.02),tps:()=>T(19,90,5.5,1,.002),blockweight:()=>T(20,90,3.7,.2,.001),miningpools:()=>{let e=Date.now();return[{ts:e,v:31.2,name:"Foundry USA"},{ts:e-100,v:19.8,name:"AntPool"},{ts:e-200,v:14.5,name:"F2Pool"},{ts:e-300,v:9.3,name:"ViaBTC"},{ts:e-400,v:8.1,name:"MARA Pool"},{ts:e-500,v:5.4,name:"Braiins Pool"},{ts:e-600,v:4.2,name:"Luxor"},{ts:e-700,v:3.1,name:"BTC.com"},{ts:e-800,v:2.4,name:"Poolin"},{ts:e-900,v:2,name:"Others"}]},lncountries:()=>{let e=Date.now();return[{ts:e,v:2450,name:"United States"},{ts:e-100,v:1100,name:"Germany"},{ts:e-200,v:680,name:"France"},{ts:e-300,v:590,name:"Netherlands"},{ts:e-400,v:510,name:"United Kingdom"},{ts:e-500,v:380,name:"Canada"},{ts:e-600,v:340,name:"Finland"},{ts:e-700,v:290,name:"Australia"},{ts:e-800,v:260,name:"Japan"},{ts:e-900,v:230,name:"Sweden"}]},lnisp:()=>{let e=Date.now();return[{ts:e,v:850,name:"Amazon.com"},{ts:e-100,v:620,name:"Hetzner Online"},{ts:e-200,v:480,name:"Contabo"},{ts:e-300,v:310,name:"DigitalOcean"},{ts:e-400,v:260,name:"OVH SAS"},{ts:e-500,v:190,name:"Google Cloud"},{ts:e-600,v:160,name:"Microsoft Azure"},{ts:e-700,v:130,name:"Linode / Akamai"},{ts:e-800,v:110,name:"Vultr"},{ts:e-900,v:90,name:"Home ISPs"}]}};function ee(e){let t=new Map;for(let{ts:n,v:o}of e){let i=Math.floor(n/864e5),r=t.get(i)||{sum:0,n:0};r.sum+=o,r.n+=1,t.set(i,r)}return[...t.entries()].sort((n,o)=>n[0]-o[0]).map(([n,{sum:o,n:i}])=>({ts:n*864e5,v:o/i}))}async function yt(e){return(await D(`${O}/api/v1/mining/hashrate/${W(e)}`)).hashrates.map(n=>({ts:n.timestamp*1e3,v:n.avgHashrate/1e18}))}async function bt(e){return(await D(`${O}/api/v1/mining/difficulty-adjustments/${W(e)}`)).map(([n,,o])=>({ts:n*1e3,v:o/1e12})).sort((n,o)=>n.ts-o.ts)}async function xt(e){let t=await D(`${O}/api/v1/mining/blocks/fees/${W(e)}`);return ee(t.map(n=>({ts:n.timestamp*1e3,v:n.avgFees/1e8})))}async function wt(e){let t=await D(`${O}/api/v1/mining/blocks/fee-rates/${W(e)}`);return ee(t.map(n=>({ts:n.timestamp*1e3,v:n.avgFee_50})))}async function vt(e){let t=await D(`${O}/api/v1/statistics/${W(e)}`);return ee(t.map(n=>({ts:n.added*1e3,v:n.vsizes.reduce((o,i)=>o+i,0)/1e6})))}async function Ct(e){let t=await D(`${O}/api/v1/mining/blocks/sizes-weights/${W(e)}`);return ee(t.weights.map(n=>({ts:n.timestamp*1e3,v:n.avgWeight/1e6})))}var $e={};async function le(e){let t=e==="full"?"all":"3y";return $e[t]||($e[t]=D(`${O}/api/v1/lightning/statistics/${t}`)),$e[t]}async function kt(e){return(await le(e)).map(n=>({ts:n.added*1e3,v:(n.tor_nodes||0)+(n.clearnet_nodes||0)+(n.clearnet_tor_nodes||0)})).filter(n=>n.v>0).sort((n,o)=>n.ts-o.ts)}async function $t(e){return(await le(e)).map(n=>({ts:n.added*1e3,v:n.channel_count})).filter(n=>n.v>0).sort((n,o)=>n.ts-o.ts)}async function St(e){return(await le(e)).map(n=>({ts:n.added*1e3,v:n.total_capacity/1e8})).filter(n=>n.v>0).sort((n,o)=>n.ts-o.ts)}async function Mt(e){return(await le(e)).filter(n=>n.channel_count>0&&n.total_capacity>0).map(n=>({ts:n.added*1e3,v:n.total_capacity/1e8/n.channel_count})).sort((n,o)=>n.ts-o.ts)}async function At(e){let t=await D(`${O}/api/v1/mining/blocks/rewards/${W(e)}`);return ee(t.map(n=>({ts:n.timestamp*1e3,v:n.avgRewards/1e8})))}async function Lt(){let e=await D(`${O}/api/v1/mining/pools/1y`),t=e.blockCount||1,n=Date.now();return e.pools.slice(0,15).map((o,i)=>({ts:n-i*100,v:o.blockCount/t*100,name:o.name}))}async function Tt(){let e=await D(`${O}/api/v1/lightning/nodes/countries`),t=Date.now();return e.slice().sort((n,o)=>o.count-n.count).slice(0,15).map((n,o)=>({ts:t-o*100,v:n.count,name:n.name?.en||n.iso||"Unknown"}))}async function _t(){let e=await D(`${O}/api/v1/lightning/nodes/isp-ranking`),t=Date.now();return(e.ispRanking||[]).map(n=>({name:n[1]||"Unknown",v:n[4]})).filter(n=>n.v>0).sort((n,o)=>o.v-n.v).slice(0,15).map((n,o)=>({ts:t-o*100,v:n.v,name:n.name}))}async function q(e,t="default"){let n=`${e}|${t}`;if(ke[n])return ke[n];let o=new Date,i=t==="full"?new Date("2010-01-01"):new Date(Date.now()-2*365*864e5),r=`${mt}?assets=btc&metrics=${e}&frequency=1d&start_time=${i.toISOString().slice(0,10)}&end_time=${o.toISOString().slice(0,10)}&page_size=10000`,l=(await D(r)).data.map(d=>({ts:new Date(d.time).getTime(),v:parseFloat(d[e])}));return ke[n]=l,l}async function Et(e){return q("AdrActCnt",e)}async function Bt(e){return(await q("TxCnt",e)).map(({ts:t,v:n})=>({ts:t,v:n/86400}))}async function Ft(e){return(await q("SplyExNtv",e)).map(({ts:t,v:n})=>({ts:t,v:n/1e6}))}async function Dt(e){let t=e==="full",[{data:n},{data:o},{data:i}]=await Promise.all([j("blockrewards",{full:t}),j("hashrate",{full:t}),j("price",{full:t})]),r=new Map(o.map(l=>[Math.floor(l.ts/864e5),l.v])),c=new Map(i.map(l=>[Math.floor(l.ts/864e5),l.v]));return n.map(({ts:l,v:d})=>{let m=Math.floor(l/864e5),p=r.get(m),f=c.get(m);if(p==null||f==null)return null;let x=144*d*f;return{ts:l,v:x/(p*1e6)}}).filter(Boolean)}async function Pt(e){let t=await q("PriceUSD",e);try{let n=ce?`&x_cg_demo_api_key=${ce}`:"",i=((await D(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30${n}`)).prices||[]).filter(([,r])=>r!=null).map(([r,c])=>({ts:r,v:c}));if(i.length>24){let r=i[0].ts;return[...t.filter(c=>c.ts<r),...i]}}catch{}return t}async function zt(e){return(await q("CapMrktCurUSD",e)).map(t=>({ts:t.ts,v:t.v/1e12}))}async function Nt(){let e=ce?`&x_cg_demo_api_key=${ce}`:"",t=await D(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365${e}`);if(!t.total_volumes?.length)throw new Error("CoinGecko volume: empty response");return t.total_volumes.filter(([,n])=>n!=null&&n>0).map(([n,o])=>({ts:n,v:o/1e9}))}async function Rt(e){return(await q("SplyCur",e)).map(t=>({ts:t.ts,v:t.v/1e6}))}async function It(e){return q("TxCnt",e)}async function Ot(e){let[t,n]=await Promise.all([q("IssTotNtv",e),q("FeeTotNtv",e)]),o=new Map(n.map(i=>[Math.floor(i.ts/864e5),i.v]));return t.map(({ts:i,v:r})=>({ts:i,v:r+(o.get(Math.floor(i/864e5))??0)}))}function jt(){return[{medianFee:2.1,feeRange:[1,1.2,1.3,2,2.7,4,201],nTx:4327,totalFees:25e5,blockSize:2054070},{medianFee:1.4,feeRange:[.5,.6,.7,1,1.5,2.2,150],nTx:6755,totalFees:16e5,blockSize:1997e3},{medianFee:.6,feeRange:[.36,.4,.42,.5,.7,1,45],nTx:5777,totalFees:95e4,blockSize:1584123}]}function Ut(){let e=["F2Pool","Foundry USA","Luxor","AntPool","ViaBTC","\u24C8BTC.com"],t=Date.now();return Array.from({length:6},(n,o)=>({height:957896-o,timestamp:Math.floor((t-o*9.7*6e4)/1e3),tx_count:4362-o*235,size:1561683+o*12e3,extras:{medianFee:1.1+o*.1,feeRange:[.55-o*.02,.7,1,2,3,5,161-o*10],totalFees:1883531-o*9e4,pool:{name:e[o%e.length]}}}))}async function ze(){try{return{data:await D(`${O}/api/v1/fees/mempool-blocks`),live:!0}}catch(e){return console.warn('[data] Falling back to mock for "mempool-blocks":',e.message),{data:jt(),live:!1}}}async function Ne(){try{return{data:await D(`${O}/api/v1/blocks`),live:!0}}catch(e){return console.warn('[data] Falling back to mock for "blocks":',e.message),{data:Ut(),live:!1}}}function Re(e){let t=Math.max(0,Math.round((Date.now()-e*1e3)/6e4));return t<1?"just now":t<60?`${t} min ago`:`${Math.round(t/60)}h ago`}var qt={hashrate:yt,difficulty:bt,fees:xt,feerates:wt,mempool:vt,blockweight:Ct,addresses:Et,tps:Bt,exchange:Ft,hashprice:Dt,price:Pt,marketcap:zt,volume:Nt,dominance:Rt,nvt:It,lth:Ot,lnnodes:kt,lnchannels:$t,lncapacity:St,lnavgchannel:Mt,blockrewards:At,miningpools:Lt,lncountries:Tt,lnisp:_t};async function j(e,{full:t=!1}={}){let n=t?"full":"default",o=`${e}|${n}`;if(Y[`${e}|full`])return{data:Y[`${e}|full`],live:!0};if(Y[o])return{data:Y[o],live:!0};if(Q[o])return Q[o];Q[o]=(async()=>{if(!t){let c=ft(e);if(c)return Y[o]=c,{data:c,live:!0}}let i=qt[e];if(i)try{let c=await i(n);return Y[o]=c,t||gt(e,c),{data:c,live:!0}}catch(c){console.warn(`[data] Falling back to mock for "${e}":`,c.message)}return{data:(De[e]||De.price)(),live:!1}})();try{return await Q[o]}finally{delete Q[o]}}function X(e,t){if(!e.length||t==="ALL")return e;let n={"1D":1,"1W":7,"1M":30,"3M":90,"1Y":365}[t];if(!n)return e;let o=Date.now()-n*864e5;return e.filter(i=>i.ts>=o)}function Gt(e,t){return t==="$"?e>=1e3?`$${(e/1e3).toFixed(0)}k`:`$${e.toFixed(0)}`:t==="$T"?`$${e.toFixed(2)}T`:t==="$B"?`$${e.toFixed(1)}B`:t==="EH/s"?`${e.toFixed(1)} EH/s`:t==="%"?`${e.toFixed(1)}%`:t==="M BTC"?`${e.toFixed(2)}M BTC`:t==="K"?`${(e/1e3).toFixed(0)}K`:t==="BTC"?`${e.toFixed(3)} BTC`:t==="T"?`${e.toFixed(1)}T`:t==="addresses"?`${(e/1e3).toFixed(0)}K addresses`:t==="txns"?`${(e/1e3).toFixed(0)}K txns`:t==="nodes"?`${(e/1e3).toFixed(0)}K nodes`:t==="channels"?`${(e/1e3).toFixed(0)}K channels`:e!=null?`${e.toFixed(2)}${t?" "+t:""}`:"\u2014"}function Z(e,t){return e==null?"\u2014":t==="$"?`$${Math.round(e).toLocaleString("en-US")}`:t==="BTC"?`${e.toFixed(4)} BTC`:t==="K"?Math.round(e).toLocaleString("en-US"):t==="addresses"?`${Math.round(e).toLocaleString("en-US")} addresses`:t==="txns"?`${Math.round(e).toLocaleString("en-US")} txns`:t==="nodes"?`${Math.round(e).toLocaleString("en-US")} nodes`:t==="channels"?`${Math.round(e).toLocaleString("en-US")} channels`:Gt(e,t)}function te(e,t){if(e==null)return"\u2014";if(t==="$")return e>=1e3?`$${Math.round(e).toLocaleString("en-US")}`:e>=1?`$${e.toFixed(2)}`:`$${e.toFixed(5)}`;if(t==="$T")return`$${e.toFixed(3)}T`;if(t==="$B")return`$${e.toFixed(2)}B`;if(t==="EH/s")return`${e.toFixed(2)} EH/s`;if(t==="M BTC")return`${e.toFixed(3)}M BTC`;if(t==="K")return`${Math.round(e).toLocaleString("en-US")}`;if(t==="addresses")return`${Math.round(e).toLocaleString("en-US")} addresses`;if(t==="txns")return`${Math.round(e).toLocaleString("en-US")} txns`;if(t==="nodes")return`${Math.round(e).toLocaleString("en-US")} nodes`;if(t==="channels")return`${Math.round(e).toLocaleString("en-US")} channels`;if(t==="BTC")return`${e.toFixed(4)} BTC`;if(t==="T")return`${e.toFixed(2)}T`;if(t==="%")return`${e.toFixed(2)}%`;let n=Math.abs(e),o=n>=100?1:n>=10?2:n>=1?3:n>=.1?4:5;return`${e.toFixed(o)}${t?" "+t:""}`}function Se(e){return new Date(e).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}function Ie(e){let t=e;return()=>(t=(t*9301+49297)%233280,t/233280)}function s(e,t={}){let n=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.entries(t).forEach(([o,i])=>n.setAttribute(o,i)),n}function Me(e,t=1,n=1){let o=Ie(n),i=e.map(c=>({x:c.x+(o()-.5)*t,y:c.y+(o()-.5)*t}));if(i.length<2)return"";let r=`M${i[0].x.toFixed(2)},${i[0].y.toFixed(2)}`;for(let c=0;c<i.length-1;c++){let l=i[Math.max(0,c-1)],d=i[c],m=i[c+1],p=i[Math.min(i.length-1,c+2)],f=d.x+(m.x-l.x)/6,x=d.y+(m.y-l.y)/6,b=m.x-(p.x-d.x)/6,v=m.y-(p.y-d.y)/6;r+=` C${f.toFixed(2)},${x.toFixed(2)} ${b.toFixed(2)},${v.toFixed(2)} ${m.x.toFixed(2)},${m.y.toFixed(2)}`}return r}function Oe(e,t,n){let o=Ie(Math.round(e+t)),i=o()*Math.PI,r=[];for(let c=0;c<=Math.PI*2*1.15;c+=.3){let l=n+(o()-.5)*1.5;r.push(`${(e+Math.cos(c+i)*l).toFixed(1)},${(t+Math.sin(c+i)*l).toFixed(1)}`)}return"M"+r.join(" L")}function Ht(e,t="lin"){let n=e.filter(p=>Number.isFinite(p)),o=n.length?n:[0,1],i=o.filter(p=>p>0);if(t!=="log"||!i.length){let p=Math.min(...o),f=Math.max(...o),x=f-p||1;return{log:!1,min:p,max:f,range:x,toUnit:b=>(b-p)/x,fromUnit:b=>p+b*x}}let r=Math.min(...i),c=Math.max(...i),l=Math.log10(r),m=Math.log10(c)-l||1;return{log:!0,min:r,max:c,range:c-r||1,toUnit:p=>(Math.log10(Math.max(p,r))-l)/m,fromUnit:p=>10**(l+p*m)}}function je(e,t,n,o,i="lin"){let r=Ht(e.map(l=>l.v),i);return{points:e.map((l,d)=>({x:t.left+d/(e.length-1)*n,y:t.top+o-r.toUnit(l.v)*o,d:l})),min:r.min,max:r.max,range:r.range,scale:r}}var a={accent:"#F7931A",accentText:"light-dark(#A85A00, #F7931A)",ink:"#1a1a1a",paper:"#FAF7F1",muted:"light-dark(#6B6B6B, #A3A3A3)",grid:"rgba(128,128,128,0.12)",heading:"'Oswald', 'Arial Narrow', sans-serif",body:"'Spectral', Georgia, serif",line:"light-dark(#1a1a1a, #f2f2f2)",lineFill:"light-dark(#1a1a1a, #f2f2f2)",shadow:"light-dark(rgba(0,0,0,0.32), rgba(255,255,255,0.20))",textAdaptive:"light-dark(#1a1a1a, #ffffff)",textAdaptiveInverse:"light-dark(#ffffff, #1a1a1a)",textAdaptiveMuted:"light-dark(rgba(26,26,26,0.55), rgba(255,255,255,0.55))"};var B=680,P=380,y={top:52,right:20,bottom:46,left:38},G=B-y.left-y.right,R=P-y.top-y.bottom,Wt=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],de=5,Vt=0,Ue={"Coin Metrics":"https://coinmetrics.io","mempool.space":"https://mempool.space",CoinGecko:"https://www.coingecko.com"};function qe(e){if(e==null||!isFinite(e))return"";let t=Math.abs(e);return t>=1e12?(e/1e12).toFixed(2)+" T":t>=1e9?(e/1e9).toFixed(2)+" G":t>=1e6?(e/1e6).toFixed(2)+" M":t>=1e3?(e/1e3).toFixed(1)+" k":t>=100?e.toFixed(0):e.toFixed(2)}function Yt(e,t,n){let o=e&&e.length?e[e.length-1]:null;return[t.title,t.subtitle,n?`${E.period} ${n}`:"",o?`${E.latest} ${qe(o.v)}${t.unit?" "+t.unit:""}`:""].filter(Boolean).join(", ")}function Xt(e,t){let n=e&&e.length?e.slice().sort((i,r)=>r.v-i.v)[0]:null;return[t.title,t.subtitle,e?E.ranking(e.length):"",n?E.first(n.name||"",qe(n.v)):""].filter(Boolean).join(", ")}function Zt(e,t,n){let o=s("svg",{width:"100%",viewBox:`0 0 ${B} ${P}`,style:"display:block",role:"img","aria-label":Xt(t,n)}),i=s("defs"),r=s("filter",{id:"ocm-drop",x:"-20%",y:"-20%",width:"140%",height:"140%"}),c=s("feGaussianBlur",{in:"SourceAlpha",stdDeviation:"3",result:"blur"}),l=s("feOffset",{in:"blur",dx:"2",dy:"4",result:"off"}),d=s("feFlood",{style:`flood-color: ${a.shadow}`,result:"floodColor"}),m=s("feComposite",{in:"floodColor",in2:"off",operator:"in",result:"sh"}),p=s("feMerge");p.appendChild(s("feMergeNode",{in:"sh"})),p.appendChild(s("feMergeNode",{in:"SourceGraphic"})),r.appendChild(c),r.appendChild(l),r.appendChild(d),r.appendChild(m),r.appendChild(p),i.appendChild(r),o.appendChild(i),o.appendChild(s("rect",{width:B,height:P,fill:"transparent"}));let f=152,b=B-f-80,v=[...t].sort(($,z)=>z.v-$.v).slice(0,15),M=Math.max(...v.map($=>$.v)),g=(P-y.top-y.bottom)/Math.max(v.length,1),u=Math.max(4,Math.min(20,g*.6)),A=s("g",{opacity:"0","pointer-events":"none"}),_=s("rect",{width:"220",height:"46",rx:"3",fill:a.ink}),h=s("text",{"font-family":a.body,"font-size":"11",fill:"rgba(255,255,255,0.65)","font-style":"italic"}),w=s("text",{"font-family":a.heading,"font-size":"17","font-weight":"700",fill:a.accent});A.appendChild(_),A.appendChild(h),A.appendChild(w),v.forEach(($,z)=>{let oe=M>0?$.v/M*b:0,L=Math.max(oe,2),S=y.top+z*g+g/2,N=z===0,H=N?a.accent:a.line,V=`fill:${N?a.accentText:a.line}`,ie=`fill:${N?a.accentText:a.muted}`,ae=$.name||"\u2014",ge=s("rect",{x:"0",y:String(S-g/2),width:String(B),height:String(g),fill:"rgba(128,128,128,0.06)",opacity:"0","pointer-events":"none"});o.appendChild(ge);let Te=s("text",{x:"6",y:String(S+4),"font-family":a.body,"font-size":"10",fill:"rgba(128,128,128,0.4)","font-style":"italic"});Te.textContent=`#${z+1}`,o.appendChild(Te);let lt=ae.length>20?ae.slice(0,19)+"\u2026":ae,_e=s("text",{x:String(f-8),y:String(S+4),"text-anchor":"end","font-family":a.body,"font-size":"11",style:V});_e.textContent=lt,o.appendChild(_e),o.appendChild(s("rect",{x:String(f),y:String(S-u/2),width:String(b),height:String(u),rx:"2",fill:a.grid,opacity:"0.28"}));let ye=s("g",{filter:"url(#ocm-drop)"}),be=s("rect",{x:String(f),y:String(S-u/2),width:String(L),height:String(u),rx:"2",fill:H,opacity:N?"0.9":"0.7"});ye.appendChild(be),ye.appendChild(s("rect",{x:String(f),y:String(S-u/2),width:String(L),height:String(Math.min(u/2,9)),rx:"2",fill:"rgba(255,255,255,0.22)"})),o.appendChild(ye);let Ee=s("text",{x:String(f+L+8),y:String(S+4),"font-family":a.heading,"font-size":"11","font-weight":"500",style:ie});Ee.textContent=te($.v,n.unit),o.appendChild(Ee);let xe=s("rect",{x:"0",y:String(S-g/2),width:String(B),height:String(g),fill:"transparent",style:"cursor:default"});xe.addEventListener("mousemove",Be=>{let re=o.getBoundingClientRect(),dt=(Be.clientX-re.left)*(B/re.width),pt=(Be.clientY-re.top)*(P/re.height);ge.setAttribute("opacity","1"),be.setAttribute("opacity","1");let we=Math.min(dt+14,B-228),ve=Math.max(pt-54,y.top);_.setAttribute("x",String(we)),_.setAttribute("y",String(ve)),h.setAttribute("x",String(we+10)),h.setAttribute("y",String(ve+16)),w.setAttribute("x",String(we+10)),w.setAttribute("y",String(ve+38)),h.textContent=ae,w.textContent=te($.v,n.unit),A.setAttribute("opacity","1")}),xe.addEventListener("mouseleave",()=>{ge.setAttribute("opacity","0"),be.setAttribute("opacity",N?"0.9":"0.7"),A.setAttribute("opacity","0")}),o.appendChild(xe)}),o.appendChild(A),Ge(o,i),o.appendChild(s("line",{x1:0,y1:P-16,x2:B,y2:P-16,stroke:a.ink,"stroke-width":"0.5",opacity:"0.3"}));let k=s("a",{href:Ue[n.source]||"#",target:"_blank",style:"cursor:pointer; text-decoration:none"}),F=s("text",{x:y.left,y:P-4,"font-family":a.body,"font-size":"11","font-style":"italic",style:`fill:${a.muted}; transition:fill 0.15s`});F.textContent=E.source+(n.sourceLabel||n.source),k.addEventListener("mouseenter",()=>{F.style.fill=a.accent}),k.addEventListener("mouseleave",()=>{F.style.fill=a.muted}),k.appendChild(F),o.appendChild(k);let I=s("text",{x:B-y.right,y:P-4,"text-anchor":"end","font-family":a.heading,"font-size":"10",fill:"rgba(128,128,128,0.45)","letter-spacing":"0.1em"});I.textContent="OFFCHAIN.MEDIA/DATA",o.appendChild(I),e.appendChild(o)}function ne(e,t,n,o,i={}){e.innerHTML="";let r=X(t,o);if(!r.length)return;if(n.type==="ranking"){Zt(e,r,n);return}let{points:c,scale:l}=je(r,y,G,R,i.scale||"lin"),d=s("svg",{width:"100%",viewBox:`0 0 ${B} ${P}`,style:"display:block",role:"img","aria-label":Yt(r,n,o)}),m=s("defs"),p=s("filter",{id:"ocm-rough",x:"-5%",y:"-5%",width:"110%",height:"110%"}),f=s("feTurbulence",{type:"fractalNoise",baseFrequency:"0.012",numOctaves:"2",seed:"4",result:"n"}),x=s("feDisplacementMap",{in:"SourceGraphic",in2:"n",scale:"2",xChannelSelector:"R",yChannelSelector:"G"});p.appendChild(f),p.appendChild(x),m.appendChild(p);let b=s("filter",{id:"ocm-drop",x:"-20%",y:"-20%",width:"140%",height:"140%"}),v=s("feGaussianBlur",{in:"SourceAlpha",stdDeviation:"3",result:"blur"}),M=s("feOffset",{in:"blur",dx:"2",dy:"4",result:"off"}),g=s("feFlood",{style:`flood-color: ${a.shadow}`,result:"floodColor"}),u=s("feComposite",{in:"floodColor",in2:"off",operator:"in",result:"sh"}),A=s("feMerge");A.appendChild(s("feMergeNode",{in:"sh"})),A.appendChild(s("feMergeNode",{in:"SourceGraphic"})),b.appendChild(v),b.appendChild(M),b.appendChild(g),b.appendChild(u),b.appendChild(A),m.appendChild(b);let _=s("linearGradient",{id:"ocm-vol",x1:"0",y1:"0",x2:"0",y2:"1"});_.appendChild(s("stop",{offset:"0%",style:`stop-color: ${a.lineFill}`,"stop-opacity":"0.22"})),_.appendChild(s("stop",{offset:"100%",style:`stop-color: ${a.lineFill}`,"stop-opacity":"0.02"})),m.appendChild(_);let h=s("linearGradient",{id:"ocm-ridge",x1:"0",y1:"0",x2:"0",y2:"1"});h.appendChild(s("stop",{offset:"0%","stop-color":"#fff","stop-opacity":"0.30"})),h.appendChild(s("stop",{offset:"15%","stop-color":"#fff","stop-opacity":"0"})),m.appendChild(h);let w=s("clipPath",{id:"ocm-clip"});w.appendChild(s("rect",{x:y.left,y:y.top,width:G,height:R})),m.appendChild(w),d.appendChild(m),d.appendChild(s("rect",{width:B,height:P,fill:"transparent"}));let k=(L,S)=>{let N=Math.abs(L);return N>=1e9?`${(L/1e9).toFixed(S/1e9<5?1:0)}B`:N>=1e6?`${(L/1e6).toFixed(S/1e6<5?1:0)}M`:N>=1e3?`${(L/1e3).toFixed(S/1e3<5?1:0)}k`:S>=10?L.toFixed(0):S>=1?L.toFixed(1):S>=.1?L.toFixed(2):S>=.01?L.toFixed(3):L.toFixed(4)};for(let L=0;L<=de;L++){let S=y.top+L/de*R,N=1-L/de,H=l.fromUnit(N),V=Math.abs(l.fromUnit(Math.min(N+1/de,1))-H)||1;d.appendChild(s("line",{x1:y.left,y1:S,x2:y.left+G,y2:S,stroke:a.grid,"stroke-width":"0.7","stroke-linecap":"round"}));let ie=s("text",{x:y.left-8,y:S+4,"text-anchor":"end","font-family":a.body,"font-size":"12",style:`fill:${a.muted}`,"font-style":"italic"});ie.textContent=k(H,V),d.appendChild(ie)}d.appendChild(s("line",{x1:y.left,y1:y.top+R,x2:y.left+G,y2:y.top+R,stroke:"rgba(128,128,128,0.28)","stroke-width":"1","stroke-linecap":"round"}));let I=(r.length>1?r[r.length-1].ts-r[0].ts:0)>400*864e5;[0,.25,.5,.75,1].forEach(L=>{let S=Math.round(L*(r.length-1)),N=y.left+L*G,H=new Date(r[S]?.ts||Date.now()),V=s("text",{x:N,y:y.top+R+18,"text-anchor":"middle","font-family":a.body,"font-size":"12",fill:"rgba(128,128,128,0.6)","font-style":"italic"});V.textContent=I?H.getFullYear():Wt[H.getMonth()],d.appendChild(V)}),n.type==="bar"?Jt(d,m,r,l,n):Qt(d,c,t,n,r),Ge(d,m),d.appendChild(s("line",{x1:0,y1:P-16,x2:B,y2:P-16,stroke:a.ink,"stroke-width":"0.5",opacity:"0.3"}));let $=s("a",{href:Ue[n.source]||"#",target:"_blank",style:"cursor:pointer; text-decoration:none"}),z=s("text",{x:y.left,y:P-4,"font-family":a.body,"font-size":"11","font-style":"italic",style:`fill:${a.muted}; transition:fill 0.15s`});z.textContent=E.source+(n.sourceLabel||n.source),$.addEventListener("mouseenter",()=>{z.style.fill=a.accent}),$.addEventListener("mouseleave",()=>{z.style.fill=a.muted}),$.appendChild(z),d.appendChild($);let oe=s("text",{x:B-y.right,y:P-4,"text-anchor":"end","font-family":a.heading,"font-size":"10",fill:"rgba(128,128,128,0.45)","letter-spacing":"0.1em"});oe.textContent="OFFCHAIN.MEDIA/DATA",d.appendChild(oe),e.appendChild(d)}function Kt(e){if(e.length<=120)return e;let t=(e[e.length-1].ts-e[0].ts)/864e5,o=Math.max(1,Math.ceil(t/60))*864e5,i=new Map;for(let{ts:r,v:c}of e){let l=Math.floor(r/o);i.has(l)||i.set(l,{ts:r,sum:0,n:0});let d=i.get(l);d.sum+=c,d.n++}return[...i.values()].sort((r,c)=>r.ts-c.ts).map(r=>({ts:r.ts,v:r.sum/r.n}))}function Jt(e,t,n,o,i){let r=Kt(n),c=r.length>80?1:3,l=Math.max(1,(G-c*(r.length-1))/Math.max(r.length,1)),d=[],m=s("g",{filter:"url(#ocm-rough)"});r.forEach((g,u)=>{let A=o.toUnit(g.v)*R,_=Math.max(A,2),h=y.left+u*(l+c),w=y.top+R-_,k=u===r.length-1;d.push({x:h,y:w,w:l,h:_,d:g,cx:h+l/2});let F=k?a.accent:a.line,I=`ocm-bv-${u}`,$=s("linearGradient",{id:I,x1:"0",y1:"0",x2:"0",y2:"1"});$.appendChild(s("stop",{offset:"0%",style:`stop-color: ${F}`,"stop-opacity":k?"1":"0.85"})),$.appendChild(s("stop",{offset:"100%",style:`stop-color: ${F}`,"stop-opacity":k?"0.75":"0.6"})),t.appendChild($);let z=s("g",{filter:"url(#ocm-drop)"});z.appendChild(s("rect",{x:h,y:w,width:l,height:_,rx:"1.5",fill:`url(#${I})`})),z.appendChild(s("rect",{x:h,y:w,width:l,height:Math.min(_,16),rx:"1.5",fill:"rgba(255,255,255,0.28)"})),m.appendChild(z)}),e.appendChild(m);let p=s("rect",{x:0,y:0,width:0,height:0,rx:"1.5",fill:"rgba(255,255,255,0.20)","pointer-events":"none",opacity:"0"});e.appendChild(p);let f=s("g",{opacity:"0","pointer-events":"none"}),x=s("rect",{x:0,y:0,width:130,height:42,rx:"2",fill:a.ink}),b=s("text",{x:10,y:14,"font-family":a.body,"font-size":"10",fill:"rgba(255,255,255,0.55)","font-style":"italic"}),v=s("text",{x:10,y:32,"font-family":a.heading,"font-size":"14","font-weight":"600",fill:"#fff"});f.appendChild(x),f.appendChild(b),f.appendChild(v),e.appendChild(f);let M=s("rect",{x:y.left,y:y.top,width:G,height:R,fill:"transparent",style:"cursor:crosshair"});M.addEventListener("mousemove",g=>{let u=e.getBoundingClientRect(),A=B/u.width,_=(g.clientX-u.left)*A,h=d[0],w=1/0;if(d.forEach(I=>{let $=Math.abs(I.cx-_);$<w&&(w=$,h=I)}),!h)return;p.setAttribute("x",h.x),p.setAttribute("y",h.y),p.setAttribute("width",h.w),p.setAttribute("height",h.h),p.setAttribute("opacity","1");let k=Math.min(h.cx-65,B-140),F=Math.max(h.y-52,y.top);x.setAttribute("x",k),x.setAttribute("y",F),b.setAttribute("x",k+10),b.setAttribute("y",F+14),v.setAttribute("x",k+10),v.setAttribute("y",F+32),b.textContent=Se(h.d.ts),v.textContent=te(h.d.v,i.unit),f.setAttribute("opacity","1")}),M.addEventListener("mouseleave",()=>{p.setAttribute("opacity","0"),f.setAttribute("opacity","0")}),e.appendChild(M)}function Qt(e,t,n,o,i){let r=Me(t,1,3),c=`${r} L${t[t.length-1].x},${y.top+R} L${t[0].x},${y.top+R} Z`,l=s("g",{"clip-path":"url(#ocm-clip)"});l.appendChild(s("path",{d:c,fill:"url(#ocm-vol)"})),l.appendChild(s("path",{d:c,fill:"url(#ocm-ridge)"})),e.appendChild(l);let d=s("g",{filter:"url(#ocm-rough)","clip-path":"url(#ocm-clip)"});d.appendChild(s("path",{d:r,fill:"none",style:`stroke: ${a.line}`,"stroke-width":"2.2","stroke-linecap":"round","stroke-linejoin":"round",filter:"url(#ocm-drop)"})),t.length>12&&d.appendChild(s("path",{d:Me(t.slice(-12),1,4),fill:"none",stroke:a.accent,"stroke-width":"2.5","stroke-linecap":"round",filter:"url(#ocm-drop)"})),e.appendChild(d);let m=t[t.length-1];m&&(e.appendChild(s("circle",{cx:m.x,cy:m.y,r:"4",fill:a.accent})),e.appendChild(s("path",{d:Oe(m.x,m.y,9),fill:"none",stroke:a.accent,"stroke-width":"1.2",opacity:"0.6","stroke-linecap":"round"})));let p=s("line",{x1:0,y1:y.top,x2:0,y2:y.top+R,stroke:a.accent,"stroke-width":"0.7","stroke-dasharray":"3,3",opacity:"0","pointer-events":"none"});e.appendChild(p);let f=s("g",{opacity:"0","pointer-events":"none"}),x=s("rect",{x:0,y:0,width:130,height:42,rx:"2",fill:a.ink}),b=s("text",{x:10,y:14,"font-family":a.body,"font-size":"10",fill:"rgba(255,255,255,0.55)","font-style":"italic"}),v=s("text",{x:10,y:32,"font-family":a.heading,"font-size":"14","font-weight":"600",fill:"#fff"});f.appendChild(x),f.appendChild(b),f.appendChild(v),e.appendChild(f);let M=s("rect",{x:y.left,y:y.top,width:G,height:R,fill:"transparent",style:"cursor:crosshair"});M.addEventListener("mousemove",g=>{let u=e.getBoundingClientRect(),A=B/u.width,_=(g.clientX-u.left)*A,h=t[0],w=1/0;t.forEach(I=>{let $=Math.abs(I.x-_);$<w&&(w=$,h=I)}),p.setAttribute("x1",h.x),p.setAttribute("x2",h.x),p.setAttribute("opacity","0.5");let k=Math.min(h.x+8,B-140),F=Math.max(h.y-52,y.top);x.setAttribute("x",k),x.setAttribute("y",F),b.setAttribute("x",k+10),b.setAttribute("y",F+14),v.setAttribute("x",k+10),v.setAttribute("y",F+32),b.textContent=Se(h.d.ts),v.textContent=te(h.d.v,o.unit),f.setAttribute("opacity","1")}),M.addEventListener("mouseleave",()=>{p.setAttribute("opacity","0"),f.setAttribute("opacity","0")}),e.appendChild(M)}function Ge(e,t){let n=`ocmwm${Vt++}`,o=y.left+G/2,i=y.top+R/2,r=160/956,c=o-r*862,l=i-r*415,d=(b,v)=>{let M=s("clipPath",{id:n+b});M.appendChild(s("path",{d:v})),t.appendChild(M)};d("r","M726 201 L1077 201 L1077 629 L726 629Z"),d("l","M384 201 L999 201 L999 629 L384 629Z"),d("b","M934.7 537.1 L1015.5 537.1 L1015.5 628.2 L934.7 628.2Z");let m=s("g",{transform:`translate(${c.toFixed(1)},${l.toFixed(1)}) scale(${r.toFixed(4)})`,style:`fill: ${a.line}`,opacity:"0.06"}),p=s("g",{"clip-path":`url(#${n}r)`});p.appendChild(s("path",{d:"M1340.3 414.7C1340.4 296.8 1244.8 201.2 1126.9 201.3L958.4 201.4C965.7 207.3 972.8 213.7 979.6 220.5C1000.9 241.8 1018.2 265.9 1031.3 292.1L1126.8 292C1159.6 292 1190.4 304.8 1213.6 328C1236.8 351.1 1249.6 382 1249.5 414.8C1249.5 447.6 1236.7 478.4 1213.5 501.6C1190.3 524.8 1159.4 537.6 1126.7 537.6L939.8 537.7C907 537.8 876.2 525 852.9 501.8C829.8 478.6 817 447.8 817.1 415C817 399.1 820.1 383.6 825.9 369.2C814.7 359.1 800.3 353.6 785.1 353.6L735.3 353.7C729.5 373.1 726.3 393.8 726.2 415.1C726.2 533 821.8 628.6 939.7 628.5L1126.6 628.4C1244.5 628.3 1340.2 532.7 1340.3 414.7Z"})),m.appendChild(p);let f=s("g",{"clip-path":`url(#${n}l)`});f.appendChild(s("path",{d:"M746.3 610.5C725 589.2 707.5 564.8 694.2 537.9L598.1 537.9C565.3 538 534.4 525.2 511.3 502.1C488.1 478.9 475.3 448.1 475.4 415.2C475.4 382.4 488.2 351.6 511.4 328.4C534.6 305.2 565.4 292.4 598.3 292.4L785.1 292.2C817.9 292.3 848.7 305 871.9 328.2C895.1 351.4 907.8 382.2 907.8 415C907.8 430.9 904.8 446.4 899 460.8C910.2 471 924.6 476.5 939.9 476.4L989.6 476.4C995.4 456.9 998.6 436.3 998.6 414.9C998.7 297 903.1 201.4 785.2 201.5L598.3 201.6C480.3 201.7 384.6 297.3 384.6 415.3C384.5 533.3 480 628.8 598 628.8L766.2 628.6C759.4 623 752.7 616.9 746.3 610.5Z"})),m.appendChild(f),m.appendChild(s("path",{d:"M771.5 430C796.8 542.8 866.9 593.7 982.1 582.7",style:`fill:none;stroke:${a.line};stroke-width:50;stroke-linecap:butt;stroke-miterlimit:4`}));let x=s("g",{"clip-path":`url(#${n}b)`});x.appendChild(s("rect",{x:"934.7",y:"537.1",width:"80.8",height:"91.2"})),m.appendChild(x),e.appendChild(m)}function He(){let e=document.querySelector(".ocm-gallery-view");if(!e)return null;let t=[...document.querySelectorAll(".ocm-category-section[data-category]")];if(!t.length)return null;let n=tn();document.documentElement.style.setProperty("--ocm-nav-h",`${n}px`);let o=document.createElement("nav");o.className="ocm-sidebar",o.setAttribute("aria-label",E.navCategories);let i=[],r=d=>i.forEach(m=>{let p=m.dataset.filter===d;m.classList.toggle("ocm-sidebar-active",p),p?m.setAttribute("aria-current","true"):m.removeAttribute("aria-current")});t.forEach((d,m)=>{let p=d.dataset.category,f=E.categories[p]||p.split("-").map(b=>b.charAt(0).toUpperCase()+b.slice(1)).join("-"),x=document.createElement("button");x.type="button",x.className="ocm-sidebar-item"+(m===0?" ocm-sidebar-active":""),x.textContent=f,x.dataset.filter=p,m===0&&x.setAttribute("aria-current","true"),x.addEventListener("click",()=>{r(p),en(d,n,o)}),o.appendChild(x),i.push(x)}),e.insertBefore(o,e.firstChild);let c=!1,l=()=>{c||(c=!0,requestAnimationFrame(()=>{c=!1;let d=n+We(o)+24,m=t[0].dataset.category;for(let p of t)if(p.getBoundingClientRect().top-d<=0)m=p.dataset.category;else break;r(m)}))};return window.addEventListener("scroll",l,{passive:!0}),window.addEventListener("resize",l),l(),o}function en(e,t,n){let o=t+We(n)+16,i=e.getBoundingClientRect().top+window.scrollY-o;window.scrollTo({top:i,behavior:"smooth"})}function We(e){return getComputedStyle(e).flexDirection==="row"?e.getBoundingClientRect().height:0}function tn(){let e=document.querySelector(".w-nav, nav, header");for(;e&&e!==document.body;){let t=getComputedStyle(e).position;if(t==="fixed"||t==="sticky")return e.getBoundingClientRect().height;e=e.parentElement}return 0}var Ve=!1;function Ye(){if(Ve)return;Ve=!0;let e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e)}var Xe=!1;function pe(){if(Xe)return;Xe=!0;let e=document.createElement("style");e.id="ocm-skeleton-styles",e.textContent=`
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
  `,document.head.appendChild(e)}function he(){pe();let e=document.createElement("div");e.className="ocm-skel",e.style.cssText="width:100%;height:100%;";let t=document.createElement("div");t.className="ocm-skel-chart",[35,55,42,70,58,80,62,90,74,66].forEach(o=>{let i=document.createElement("span");i.style.height=o+"%",t.appendChild(i)}),e.appendChild(t);let n=document.createElement("span");return n.className="ocm-skel-label",n.textContent="Loading\u2026",e.appendChild(n),e}function me(e,{reason:t=""}={}){pe();let n=document.createElement("div");n.className="ocm-unavail";let o=document.createElement("span");o.className="ocm-unavail-title",o.textContent=E.unavailable;let i=document.createElement("span");return i.className="ocm-unavail-note",i.textContent=t||E.unreachable(e?.source),n.appendChild(o),n.appendChild(i),n}var Ze=["1W","1M","3M","1Y","ALL"],fe="1Y",Ke=200,nn=2e3,on=["1Y","3M","1M","1W","ALL"],an={"1W":7,"1M":30,"3M":90,"1Y":365};function rn(e,t){let n=X(e,t);if(!n.length)return!1;if(t==="ALL")return!0;let o=an[t];return o?(n.length>1?(n[n.length-1].ts-n[0].ts)/864e5:0)>=o*.7:!1}async function Je(e){Ye(),He(),await cn(e)}var Ae=new WeakSet,ue=new WeakSet;function Qe(e,t=Ke){let n=e.getBoundingClientRect();return n.width===0&&n.height===0?!1:n.bottom>-t&&n.top<(window.innerHeight||0)+t}function sn(e){let t=setInterval(()=>{let n=e.filter(o=>!Ae.has(o));if(!n.length){clearInterval(t);return}n.forEach(o=>{ue.has(o)||Qe(o)&&Le(o)})},nn)}async function cn(e){let t=[...document.querySelectorAll(".ocm-card")].filter(i=>{let r=i.dataset.chartId;return r&&U.some(c=>c.id===r)});t.forEach(i=>{let r=i.dataset.chartId,c=i.querySelector(".ocm-see-more");c&&(c.textContent=E.seeMore,c.addEventListener("click",m=>{m.stopPropagation(),m.preventDefault(),window.location.href=J(r)}));let l=i.querySelector(".ocm-card-chart");l&&!l.firstChild&&(l.classList.add("ocm-card-chart-full"),l.appendChild(he()));let d=i.querySelector(".ocm-card-reading");d&&(d.style.display="none")});let n=new IntersectionObserver(i=>{i.forEach(r=>{r.isIntersecting&&Le(r.target)})},{rootMargin:`${Ke}px 0px`});t.forEach(i=>n.observe(i)),t.forEach(i=>{Qe(i)&&Le(i)}),sn(t),(window.requestIdleCallback||(i=>setTimeout(i,2500)))(()=>{U.forEach(i=>{j(i.api).catch(()=>{})})})}async function Le(e){if(Ae.has(e)||ue.has(e))return;let t=e.dataset.chartId,n=U.find(i=>i.id===t);if(!n)return;let o=e.querySelector(".ocm-card-chart");if(o){ue.add(e);try{await ln(e,n,o),Ae.add(e)}catch(i){console.warn(`[gallery] card "${t}" failed to mount:`,i)}finally{ue.delete(e)}}}async function ln(e,t,n){n.classList.add("ocm-card-chart-full");let{periodBar:o,headline:i,scaleBtn:r}=dn(e),{data:c,live:l}=await j(t.api),d=fe,m=!1,p=!1,f=async()=>{if(p)return;p=!0;let g=await j(t.api,{full:!0});g.live&&(c=g.data)},x=e.querySelector("h1, h2, h3, h4, h5, h6");x&&t.title&&!se(x)&&(x.textContent=t.title),pn(e,t);let b=e.querySelector(".ocm-card-reading");if(!l){n.style.cssText="",n.innerHTML="",n.appendChild(me(t)),o.style.display="none",r.style.display="none",i.textContent="",b&&(b.style.display="",b.textContent=E.unavailable);return}if(t.type==="ranking"&&(o.style.display="none",d="ALL"),t.type==="ranking"){let g=[...c].sort((u,A)=>A.v-u.v)[0];g&&(i.textContent=Z(g.v,t.unit))}else{let g=c[c.length-1];g&&(i.textContent=Z(g.v,t.unit))}let v=g=>{ne(n,c,t,g,{scale:m?"log":"lin"}),n.firstChild?n.style.cssText="":(n.style.cssText="display:flex;align-items:center;justify-content:center",n.innerHTML=`<span style="font-family:${a.body};font-style:italic;font-size:13px;color:rgba(128,128,128,0.5)">No data for this period</span>`)};t.type==="ranking"?r.style.display="none":r.addEventListener("click",()=>{m=!m,et(r,m),v(d)});let M=()=>o.querySelectorAll("[data-period]");if(t.type!=="ranking"){let g=Ze.filter(u=>rn(c,u));M().forEach(u=>{u.style.display=g.includes(u.dataset.period)?"":"none"}),d=on.find(u=>g.includes(u))||g[0]||fe,M().forEach(u=>{u.classList.toggle("ocm-card-period-active",u.dataset.period===d),u.setAttribute("aria-pressed",String(u.dataset.period===d))})}M().forEach(g=>{g.addEventListener("click",async()=>{d=g.dataset.period,M().forEach(u=>{u.classList.toggle("ocm-card-period-active",u===g),u.setAttribute("aria-pressed",String(u===g))}),d==="ALL"&&await f(),v(d)})}),v(d)}function dn(e){let t=e.querySelector(".ocm-card-meta"),n=document.createElement("div");n.className="ocm-card-toprow";let o=document.createElement("div");o.className="ocm-card-periods",Ze.forEach(c=>{let l=document.createElement("button");l.type="button",l.className="ocm-card-period-btn"+(c===fe?" ocm-card-period-active":""),l.textContent=c,l.dataset.period=c,l.setAttribute("aria-pressed",String(c===fe)),o.appendChild(l)});let i=document.createElement("button");i.type="button",i.className="ocm-card-period-btn ocm-card-scale-btn",et(i,!1),o.appendChild(i);let r=document.createElement("span");return r.className="ocm-card-headline",n.appendChild(o),n.appendChild(r),t?t.insertAdjacentElement("afterend",n):e.insertBefore(n,e.firstChild),{periodBar:o,headline:r,scaleBtn:i}}function pn(e,t){if(!t.subtitle)return;let n=e.querySelector(".ocm-card-sub");if(n){se(n)||(n.textContent=t.subtitle);return}let o=e.querySelector(".ocm-card-meta");o&&!o.querySelector("h1, h2, h3, h4, h5, h6")&&(se(o)||(o.textContent=t.subtitle))}function et(e,t){e.textContent=t?"LIN":"LOG",e.title=t?"Back to linear scale":"Switch to logarithmic scale",e.setAttribute("aria-pressed",String(t)),e.classList.toggle("ocm-card-period-active",t)}var tt={"btc-price":"This chart tracks the daily BTC/USD reference rate compiled by Coin Metrics from major spot exchanges. Price is Bitcoin's most watched signal: it reflects global demand for a fixed-supply asset and sets the economics of mining, fees, and adoption. Use the period selector to compare short-term swings with multi-year trends \u2014 daily closes smooth out intraday volatility.","market-cap":"Market capitalization multiplies the circulating BTC supply by the current price, giving a dollar measure of the network's total market value. It is the quickest way to compare Bitcoin with other assets, from gold to tech stocks. Because supply grows on a fixed, predictable schedule, long-term changes in market cap are driven almost entirely by price.",volume:"This chart aggregates 24-hour spot trading volume across the exchanges tracked by CoinGecko. Volume measures how much bitcoin actually changes hands and how deep the market is. Spikes usually accompany sharp price moves or macro news, while quiet periods signal consolidation. Persistent volume growth is a healthier adoption signal than price action alone.",dominance:"Circulating supply counts every bitcoin mined since the genesis block in 2009, out of the 21 million that will ever exist. New coins enter circulation with each block, and the issuance rate halves roughly every four years. The curve flattens with every halving \u2014 a fixed, predictable monetary schedule that no other major asset offers.",hashrate:"Network hashrate estimates the total computational power securing Bitcoin, measured in exahashes per second. More hashrate means a more expensive network to attack, making it a direct proxy for security. It also reflects miner confidence: operators only deploy hardware they expect to be profitable. Short-term swings are statistical noise; the long-term trend is what matters.",difficulty:"Mining difficulty measures how hard it is to find a valid block. The protocol adjusts it every 2,016 blocks \u2014 about two weeks \u2014 so blocks keep arriving roughly every ten minutes regardless of how much hashrate joins or leaves. Rising difficulty tracks hashrate growth; rare downward adjustments usually follow miner capitulation or major disruptions.","block-fees":"This chart shows the average transaction fees collected per block, in BTC. Fees are the market price of scarce block space: they surge when demand spikes \u2014 bull runs, inscription waves \u2014 and fall back in quiet periods. As block subsidies halve over time, fees are set to become the dominant source of miner revenue and long-term security budget.",hashprice:"Hashprice measures a miner's expected daily revenue per terahash per second of computing power, in dollars. It condenses price, difficulty, and fees into a single profitability metric. Falling hashprice squeezes margins and pushes inefficient operators offline; rising hashprice invites new capacity online. It is the industry's benchmark for the health of the mining economy.","block-rewards":"Block rewards combine the fixed subsidy of newly issued bitcoin with the transaction fees included in each block \u2014 the total income miners earn per block. The subsidy halves roughly every four years, so the fee share of the reward grows over time: a slow transition that will ultimately fund Bitcoin's security entirely through fees.","mining-pools":"This ranking shows the share of blocks mined by each pool over the last twelve months. Pool distribution is a key decentralization indicator: a pool nearing half the network's blocks raises censorship and reorg concerns. Pools coordinate hashrate owned by many independent miners, however, who can and do switch pools when incentives shift.","active-addresses":"Active addresses count the unique Bitcoin addresses involved in transactions each day \u2014 a rough proxy for network usage: more active addresses generally mean more people or services transacting on-chain. The metric has limits, since one entity can control many addresses and batching compresses activity, but its long-term trend tracks real adoption.","lth-supply":"Miner revenue totals the BTC earned by miners each day, combining new-issuance subsidies and transaction fees. It represents Bitcoin's security budget: the money paid to keep the network honest. Revenue rises with fees during congestion and drops sharply at each halving, forcing efficiency gains across the industry. Its composition shows how the fee transition is progressing.","exchange-balance":"This chart estimates the total bitcoin held on exchange addresses tracked by Coin Metrics. Falling balances suggest coins moving to self-custody or long-term holding; rising balances can signal intent to sell. It is an imperfect but widely watched gauge of market-wide custody behavior and liquid supply \u2014 sustained outflows have marked every recent cycle.",nvt:"Daily transactions count confirmed on-chain Bitcoin transactions. The metric gauges demand for block space, though it undercounts economic activity: a single transaction can batch hundreds of payments, and Lightning moves value off-chain entirely. Sustained changes still reveal shifting usage patterns, from payment adoption to inscription waves competing for the same limited space.","lightning-nodes":"This chart counts public nodes on the Lightning Network, Bitcoin's second layer for instant, low-fee payments. Node count gauges the network's reach and decentralization, though it only captures publicly announced nodes \u2014 private ones are invisible to crawlers. Steady growth signals a maturing routing infrastructure operated by individuals, businesses, and dedicated routing operators.","lightning-channels":"Lightning channels are payment connections between two nodes, each funded with bitcoin locked on-chain. This chart tracks the total number of public channels. More channels mean more possible payment routes and better liquidity. When channel count consolidates while capacity keeps growing, it suggests fewer but larger, better-managed channels \u2014 a sign of professionalization.","lightning-capacity":"Lightning capacity measures the total bitcoin locked in public payment channels \u2014 the network's headline liquidity metric: more capacity means larger payments can route successfully. Public capacity understates the true figure, since private channels are excluded. Denominated in BTC rather than dollars, it isolates genuine network growth from price swings. Watch the trend, not the level.","lightning-avg-channel":"Average channel size divides total public capacity by the number of channels. Rising averages indicate professionalization \u2014 routing nodes deploying serious liquidity rather than hobbyist experiments. Falling averages can mean broader grassroots adoption through many small channels. Combined with node and channel counts, this metric sketches how the network's structure is evolving.","lightning-countries":"This ranking maps public Lightning nodes to countries using IP geolocation, showing where routing infrastructure is physically concentrated. Heavy concentration in a few jurisdictions matters for censorship resistance and regulatory exposure. Nodes running behind Tor cannot be located, so a large share of the network remains geographically unknown \u2014 a feature, not a bug.","lightning-isp":"This ranking shows which internet providers host the most public Lightning nodes. Concentration among a few cloud giants is a centralization pressure point: an outage or policy change at a single provider could disrupt significant routing capacity. Nodes running on residential connections or behind Tor counterbalance that dependency and keep the network resilient.","mempool-size":"The mempool is the waiting room for unconfirmed transactions; this chart tracks its size in megabytes. A growing mempool signals congestion \u2014 demand for block space exceeding supply, pushing fees upward. An empty mempool means transactions confirm in the next block at minimal cost. It is the network's real-time load indicator.","fee-rates":"This chart tracks the median fee rate, in satoshis per virtual byte, paid by transactions included in mined blocks. It shows what users actually paid, period by period, rather than a quote for the next block. Fee rates move with mempool congestion and are the clearest signal of demand for block space.","tx-per-second":"Transactions per second measures on-chain throughput. Bitcoin's base layer processes only a handful of transactions per second by design \u2014 a deliberate trade-off favoring decentralization and verifiability over raw speed. Higher payment volumes move to layers built on top, like Lightning. Sustained changes in TPS reflect shifts in how block space is being used.","block-weight":"Block weight measures how full Bitcoin blocks are, in million weight units, against the four-million cap introduced with SegWit. Consistently full blocks mean persistent demand for block space and a working fee market; lighter blocks signal slack demand. The metric shows whether Bitcoin's scarce settlement capacity is actually being consumed."};var hn=["1W","1M","3M","1Y","ALL"],mn={"1W":7,"1M":30,"3M":90,"1Y":365};function un(e,t){let n=X(e,t);if(!n.length)return!1;if(t==="ALL")return!0;let o=mn[t];return(n.length>1?(n[n.length-1].ts-n[0].ts)/864e5:0)>=o*.7}function fn(){try{let e=[...document.querySelectorAll("h2")].find(n=>n.textContent.trim()==="Latest articles"),t=e&&e.closest("section");if(!t||t.querySelector(".ocm-embed"))return;if(!t.querySelector(".w-dyn-item")){t.style.display="none";return}Object.assign(t.style,{width:"100%",maxWidth:"1100px",margin:"0 auto",padding:"16px 16px 48px",boxSizing:"border-box"})}catch{}}async function nt(e,t){let n=U.find(h=>h.id===t);if(!n){let h=document.createElement("p");h.style.cssText=`font-family:${a.body};color:${a.muted};padding:20px`,h.textContent="Chart not found.",e.replaceChildren(h);return}if(!document.getElementById("ocm-embed-styles")){let h=document.createElement("style");h.id="ocm-embed-styles",h.textContent=`
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
    `,document.head.appendChild(h)}K!=="fr"&&(document.title=`${n.title} | Off-Chain Media`);let o=tt[t];if(o){let h=document.querySelector('meta[name="description"]');if(h||(h=document.createElement("meta"),h.setAttribute("name","description"),document.head.appendChild(h)),!h.getAttribute("content")){let w=o.replace(/—/g,"-").replace(/\s+/g," ");h.setAttribute("content",w.length>155?w.slice(0,152).trimEnd()+"...":w)}}e.classList.add("ocm-embed"),e.innerHTML=`
    <a class="ocm-embed-back" href="/data">${E.allCharts.replace("\u2190","&larr;")}</a>
    <div class="ocm-embed-topbar">
      <span class="ocm-embed-headline">${n.title}</span>
      <span class="ocm-embed-reading">Loading\u2026</span>
    </div>
    <div class="ocm-embed-periods"></div>
    <div class="ocm-embed-chart"></div>
    ${o?`<div class="ocm-embed-desc"><h3>What this measures</h3><p>${o}</p></div>`:""}
  `,fn();let i=e.querySelector(".ocm-embed-topbar"),r=e.querySelector(".ocm-embed-reading"),c=e.querySelector(".ocm-embed-periods"),l=e.querySelector(".ocm-embed-chart");l.appendChild(he());let{data:d,live:m}=await j(n.api),p=!1;if(!m){r.textContent=E.unavailable,c.style.display="none",l.innerHTML="",l.appendChild(me(n));return}let f=!1,x=async()=>{if(f)return;f=!0;let h=await j(n.api,{full:!0});h.live&&(d=h.data)};if(n.type==="ranking"){let h=[...d].sort((w,k)=>k.v-w.v)[0];h&&(r.textContent=Z(h.v,n.unit)),c.style.display="none",ne(l,d,n,"ALL");return}let b=d[d.length-1];b&&(r.textContent=Z(b.v,n.unit));let v=hn.filter(h=>un(d,h)),g=["1Y","3M","1M","1W","ALL"].find(h=>v.includes(h))||v[0]||"1Y";v.forEach(h=>{let w=document.createElement("button");w.className="ocm-embed-pbtn"+(h===g?" active":""),w.textContent=h,w.dataset.period=h,w.addEventListener("click",async()=>{g=h,c.querySelectorAll("[data-period]").forEach(k=>k.classList.toggle("active",k===w)),h==="ALL"&&await x(),_()}),c.appendChild(w)});let u=document.createElement("button");u.className="ocm-embed-pbtn ocm-embed-sbtn";let A=()=>{u.textContent=p?"LIN":"LOG",u.title=p?"Back to linear scale":"Switch to logarithmic scale",u.setAttribute("aria-pressed",String(p)),u.classList.toggle("active",p)};A(),u.addEventListener("click",()=>{p=!p,A(),_()}),c.appendChild(u);function _(){ne(l,d,n,g,{scale:p?"log":"lin"})}_()}var gn=45e3,C=10,at=[],rt=[],ot=!0;function st(){let e=document.querySelector(".ocm-data-hero")||document.querySelector(".ocm-gallery-view");if(!e||!e.parentElement)return;let t=document.createElement("div");t.className="ocm-blockstrip",e.parentElement.insertBefore(t,e),pe();for(let o=0;o<8;o++){let i=document.createElement("div");i.className="ocm-block-cube",i.innerHTML='<div class="ocm-skel" style="position:absolute;inset:0"></div>',t.appendChild(i)}let n=async()=>{let[{data:o},{data:i}]=await Promise.all([ze(),Ne()]);at=o.slice(0,3).map((r,c)=>({...r,_index:c})),rt=i.slice(0,15),yn(t)};n(),setInterval(n,gn)}function yn(e){let t=e.scrollLeft;e.innerHTML="",[...at].reverse().forEach(o=>{e.appendChild(it("pending",{fee:o.medianFee,range:o.feeRange,fees:o.totalFees,txs:o.nTx,size:o.blockSize,meta:`in ~${(o._index+1)*10} min`}))});let n=document.createElement("div");n.className="ocm-blockstrip-divider",n.appendChild(bn()),e.appendChild(n),rt.forEach(o=>{e.appendChild(it("confirmed",{fee:o.extras.medianFee,range:o.extras.feeRange,fees:o.extras.totalFees,txs:o.tx_count,size:o.size,meta:`${Re(o.timestamp)} \xB7 ${o.extras.pool.name}`,height:o.height}))}),e.appendChild(xn()),ot?(ot=!1,window.matchMedia("(max-width: 700px)").matches&&e.scrollWidth>e.clientWidth&&(e.scrollLeft=n.getBoundingClientRect().left-e.getBoundingClientRect().left)):e.scrollLeft=t}function bn(){let e=s("svg",{viewBox:"0 0 750 750",width:"32",height:"32",fill:"currentColor"});return e.appendChild(s("path",{d:"M 99.796875 337.5 C 75.007812 403.238281 76.148438 464.222656 83.519531 508.835938 C 96.296875 463.699219 114.085938 420.121094 136.539062 379.023438 C 156.53125 342.421875 180.320312 307.730469 207.234375 275.769531 L 162.644531 234.496094 C 135.257812 265.027344 114.082031 299.625 99.796875 337.5 Z"})),e.appendChild(s("path",{d:"M 378.777344 136.789062 C 419.863281 114.347656 463.441406 96.550781 508.597656 83.761719 C 463.976562 76.394531 402.984375 75.257812 337.257812 100.042969 C 299.386719 114.320312 264.789062 135.496094 234.253906 162.890625 L 275.523438 207.480469 C 307.484375 180.566406 342.183594 156.769531 378.777344 136.789062 Z"})),e.appendChild(s("path",{d:"M 667.679688 641.664062 L 289.960938 263.953125 L 263.707031 290.210938 L 641.425781 667.921875 C 648.433594 674.9375 660.664062 674.9375 667.683594 667.921875 C 674.917969 660.683594 674.917969 648.902344 667.679688 641.664062 Z"})),e.appendChild(s("path",{d:"M 209.78125 150.789062 C 192.59375 156.628906 180.5 166.261719 173.257812 173.503906 C 160.660156 186.101562 154.011719 199.859375 150.546875 210.027344 L 165.585938 223.949219 L 243.804688 296.335938 L 253.375 286.761719 L 296.09375 244.039062 Z"})),e}function xn(){let e=document.createElement("a");e.className="ocm-block-cube ocm-block-explorer",e.href="https://mempool.space",e.target="_blank",e.rel="noopener noreferrer";let t=s("svg",{class:"ocm-block-cube-bg",viewBox:"0 0 100 100",preserveAspectRatio:"none"}),n=a.textAdaptive;t.appendChild(s("polygon",{points:`0,${C} ${C},0 100,0 ${100-C},${C}`,style:`fill:none; stroke:${n}; stroke-width:0.7; opacity:0.5;`})),t.appendChild(s("polygon",{points:`${100-C},${C} 100,0 100,${100-C} ${100-C},100`,style:`fill:none; stroke:${n}; stroke-width:0.7; opacity:0.5;`})),t.appendChild(s("polygon",{points:`0,${C} ${100-C},${C} ${100-C},100 0,100`,style:`fill:none; stroke:${n}; stroke-width:0.7; stroke-dasharray:3,3; opacity:0.5;`})),e.appendChild(t);let o=document.createElement("div");return o.className="ocm-block-explorer-content",o.innerHTML=`
    <p style="font-family:${a.heading};font-size:13px;font-weight:600;color:${a.textAdaptive};margin:0 0 4px;opacity:0.5;">Explorer</p>
    <p style="font-family:${a.heading};font-size:15px;font-weight:600;color:${a.textAdaptive};margin:0;">mempool</p>
    <p style="font-family:${a.heading};font-size:15px;font-weight:600;color:${a.accentText};margin:0;">.space \u2192</p>
  `,e.appendChild(o),e}function it(e,t){let n=document.createElement("div");n.className=`ocm-block-cube ocm-block-cube--${e}`;let o=e==="confirmed",i=o?a.textAdaptive:"none",r=a.textAdaptive,c=s("svg",{class:"ocm-block-cube-bg",viewBox:"0 0 100 100",preserveAspectRatio:"none"});c.appendChild(s("polygon",{points:`0,${C} ${C},0 100,0 ${100-C},${C}`,style:`fill: ${o?a.textAdaptive:"none"}; opacity: ${o?"0.8":"1"}; stroke: ${r}; stroke-width: 1;`})),c.appendChild(s("polygon",{points:`${100-C},${C} 100,0 100,${100-C} ${100-C},100`,style:`fill: ${o?a.textAdaptive:"none"}; opacity: ${o?"0.6":"1"}; stroke: ${r}; stroke-width: 1;`})),c.appendChild(s("polygon",{points:`0,${C} ${100-C},${C} ${100-C},100 0,100`,style:`fill: ${i}; stroke: ${r}; stroke-width: 1;`})),n.appendChild(c);let l=document.createElement("div");l.className="ocm-block-cube-content";let d=t.range[0],m=t.range[t.range.length-1];if(l.innerHTML=`
    <p class="ocm-bc-fee">~${Math.round(t.fee)} sat/vB</p>
    <p class="ocm-bc-range">${d.toFixed(2)} - ${m.toFixed(0)} sat/vB</p>
    <div class="ocm-bc-row"><span>Total fees</span><span>${(t.fees/1e8).toFixed(3)} BTC</span></div>
    <div class="ocm-bc-row"><span>Transactions</span><span>${t.txs.toLocaleString("en-US")}</span></div>
    <div class="ocm-bc-row"><span>Size</span><span>${(t.size/1e6).toFixed(1)} MB</span></div>
    <p class="ocm-bc-meta">${t.meta}</p>
  `,n.appendChild(l),t.height!=null){let p=document.createElement("p");p.className="ocm-bc-height",p.textContent=t.height.toLocaleString("en-US"),n.appendChild(p)}return n}var wn=e=>window.location.assign(J(e));async function ct(){let e=window.location.pathname.match(/^\/charts\/([a-z0-9-]+)\/?$/),t=e&&U.some(r=>r.id===e[1])?e[1]:null,n=window.__OCM__||t,o=document.querySelector(".ocm-embed");if(n&&o){await nt(o,n);return}let i=new URLSearchParams(window.location.search).get("chart");if(i&&U.some(r=>r.id===i)){window.location.replace(J(i));return}st(),await Je(wn)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ct):ct();})();
