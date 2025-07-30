function fixMobileCounters(){function t(t,e,o=2e3){let n=e/(o/16),i=0,a=setInterval(()=>{(i+=n)>=e?(t.textContent=e+(e>=100?"+":""),clearInterval(a)):t.textContent=Math.floor(i)},16)}let e=new IntersectionObserver(o=>{o.forEach(o=>{if(o.isIntersecting&&o.intersectionRatio>=.1){let n=o.target.querySelectorAll(".counter");console.log(`🔢 [Counter Fix] Sezione visibile al ${Math.round(100*o.intersectionRatio)}%`),console.log(`🔢 [Counter Fix] Trovati ${n.length} contatori`),n.forEach((e,o)=>{let n=parseInt(e.dataset.target)||0;console.log(`🔢 [Counter Fix] Animando contatore ${o+1}: target = ${n}`),setTimeout(()=>{t(e,n)},200*o)}),e.unobserve(o.target)}})},{threshold:[.1,.3,.5],rootMargin:"0px 0px -20px 0px"}),o=document.querySelector(".stats-section");o?(console.log("\uD83D\uDD22 [Counter Fix] Sezione stats trovata, applicando observer mobile"),e.observe(o),setTimeout(()=>{let e=o.querySelectorAll(".counter");e.forEach(e=>{if("0"===e.textContent||""===e.textContent){let o=parseInt(e.dataset.target)||0;console.log("\uD83D\uDD22 [Counter Fix] Fallback attivato per contatore con target:",o),t(e,o)}})},5e3)):console.log("\uD83D\uDD22 [Counter Fix] Sezione stats NON trovata")}async function fixDynamicCounters(){try{console.log("\uD83D\uDD22 [Counter Fix] Inizializzazione contatori dinamici...");let t=window.location.pathname.split("/").pop()||"index.html";if(!("index.html"===t||"chi-siamo.html"===t)){console.log("\uD83D\uDD22 [Counter Fix] Pagina non rilevante per i contatori");return}console.log(`🔢 [Counter Fix] Pagina rilevante: ${t}`);let e=document.getElementById("eventi-counter");if(e&&"0"===e.dataset.target){console.log("\uD83D\uDD22 [Counter Fix] Fixing eventi counter...");try{let o=await getEventsCount();e.dataset.target=o,console.log(`🔢 [Counter Fix] Eventi counter aggiornato: ${o}`)}catch(n){console.log("\uD83D\uDD22 [Counter Fix] Errore nel caricamento eventi, usando valore di default"),e.dataset.target="15"}}let i=document.getElementById("anni-counter");if(i&&"0"===i.dataset.target){let a=new Date().getFullYear(),r=a-2008;i.dataset.target=r,console.log(`🔢 [Counter Fix] Anni counter aggiornato: ${r}`)}let l=document.getElementById("progetti-counter");if(l&&"0"===l.dataset.target){console.log("\uD83D\uDD22 [Counter Fix] Fixing progetti counter...");try{let u=await getAttivitaCount();l.dataset.target=u,console.log(`🔢 [Counter Fix] Progetti counter aggiornato: ${u}`)}catch(c){console.log("\uD83D\uDD22 [Counter Fix] Errore nel caricamento attivita, usando valore di default"),l.dataset.target="8"}}}catch(s){console.error("\uD83D\uDD22 [Counter Fix] Errore nell'inizializzazione contatori dinamici:",s)}}function addMobileCounterEnhancements(){if("ontouchstart"in window){console.log("\uD83D\uDD22 [Counter Fix] Dispositivo touch rilevato, applicando ottimizzazioni");let t=document.querySelector(".stats-section");if(t){t.classList.add("mobile-counters");let e=`
                <style id="mobile-counter-css">
                @media (max-width: 768px) {
                    .stats-section.mobile-counters {
                        padding: 40px 0 !important;
                        min-height: auto !important;
                    }
                    
                    .enhanced-stat {
                        margin-bottom: 20px !important;
                        padding: 20px !important;
                    }
                    
                    .stat-number {
                        font-size: 2.5rem !important;
                        font-weight: 700 !important;
                        color: #FFD700 !important;
                    }
                    
                    .mobile-counters .counter {
                        animation: mobileCounterPulse 2s ease-in-out !important;
                    }
                    
                    @keyframes mobileCounterPulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }
                }
                </style>
            `;document.getElementById("mobile-counter-css")||document.head.insertAdjacentHTML("beforeend",e)}}}function initMobileCounterFix(){console.log("\uD83D\uDD22 [Counter Fix] Inizializzazione fix contatori mobile..."),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",()=>{setTimeout(async()=>{await fixDynamicCounters(),fixMobileCounters(),addMobileCounterEnhancements()},100)}):setTimeout(async()=>{await fixDynamicCounters(),fixMobileCounters(),addMobileCounterEnhancements()},100)}"undefined"==typeof getEventsCount&&(console.log("\uD83D\uDD22 [Counter Fix] Funzione getEventsCount non trovata, usando fallback"),window.getEventsCount=async function(){return 15}),"undefined"==typeof getAttivitaCount&&(console.log("\uD83D\uDD22 [Counter Fix] Funzione getAttivitaCount non trovata, usando fallback"),window.getAttivitaCount=async function(){return 8}),window.testMobileCounters=function(){console.log("\uD83D\uDD22 [Counter Fix] Test manuale contatori mobile...");let t=document.querySelectorAll(".counter");console.log(`🔢 [Counter Fix] Trovati ${t.length} contatori:`),t.forEach((t,e)=>{let o=t.dataset.target,n=t.textContent;console.log(`🔢 [Counter Fix] Contatore ${e+1}: target=${o}, current="${n}"`)}),fixMobileCounters()},initMobileCounterFix(),console.log("\uD83D\uDD22 [Counter Fix] Sistema di fix contatori mobile caricato!");