// Unione di adblock-detector-v2.js e adblock-integration-v2.js

// --- adblock-detector-v2.js ---

class AdBlockDetectorV2{constructor(t={}){this.config={threshold:t.threshold||3,totalTests:4,baitElements:[{class:"ads",id:"ads-banner-test"},{class:"advertisement",id:"ad-content-test"},{class:"google-ads",id:"google-ad-test"},{class:"adsbygoogle",id:"adsense-unit-test"}],adDomains:["googleads.g.doubleclick.net","pagead2.googlesyndication.com","adnxs.com","amazon-adsystem.com"],totalBlock:!1!==t.totalBlock,showPopup:!1!==t.showPopup,preventClose:!1!==t.preventClose,debugMode:t.debugMode||!1,messages:{title:t.title||"AdBlock Deve Essere Disattivato 0e0f",subtitle:t.subtitle||"Accesso Richiesto per Associazione Santa Barbara",description:t.description||this.getDefaultDescription(),instructions:t.instructions||"\uD83D\uDD27 Istruzioni per Continuare:",buttonText:t.buttonText||"Ho Disattivato AdBlock - Ricarica Pagina"},styles:{overlayColor:t.overlayColor||"rgba(225, 6, 0, 0.95)",popupBackground:t.popupBackground||"#ffffff",primaryColor:t.primaryColor||"#E10600",textColor:t.textColor||"#333333",maxWidth:"900px",maxHeight:"85vh"},contentSelectors:t.contentSelectors||["main",".content",".container","article","section","body > *:not(.adblock-popup-overlay)"]},this.isDetected=!1,this.popupShown=!1,this.testResults=[],this.detectedType="none",this.log=()=>{},this.init()}getDefaultDescription(){return`
            <strong style="color: #E10600;">ATTENZIONE:</strong> Per accedere al sito dell'Associazione Santa Barbara APS è <strong>obbligatorio disattivare AdBlock</strong>.
            <br><br>
            La pubblicità ci permette di:
            <br>• 🎭 Finanziare il Corteo Storico di Santa Barbara
            <br>• 🤝 Sostenere i progetti sociali per la comunità  
            <br>• 📚 Mantenere attivo questo sito web gratuito
            <br>• 🏛️ Promuovere la cultura locale di Grumo Appula
            <br><br>
            <strong>Il sito rimarrà bloccato fino alla disattivazione di AdBlock.</strong>
        `}init(){this.log("🚀 Inizializzazione AdBlock Detector v2.0"),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",()=>this.startDetection()):this.startDetection()}async startDetection(){this.log("🔍 Avvio rilevamento AdBlock...");try{let t=await this.runDetectionTests();this.handleDetectionResult(t)}catch(e){this.log("❌ Errore rilevamento:",e),this.handleDetectionResult(!1)}}async runDetectionTests(){this.log("📊 Esecuzione test di rilevamento...");let t=[{name:"Bait Elements",test:()=>this.testBaitElements()},{name:"Google Ads Script",test:()=>this.testGoogleAdsScript()},{name:"Image Blocking",test:()=>this.testImageBlocking()},{name:"Network Requests",test:()=>this.testNetworkRequests()}],e=[];for(let i=0;i<t.length;i++)try{let o=await t[i].test();e.push(o),this.log(`📈 ${t[i].name}: ${o?"✅ BLOCCATO":"❌ OK"}`),i<t.length-1&&await this.sleep(100)}catch(a){this.log(`⚠️ Errore in ${t[i].name}:`,a),e.push(!1)}this.testResults=e;let s=e.filter(t=>t).length,l=s>=this.config.threshold;return this.log(`🏆 Risultati: ${s}/${this.config.totalTests} test positivi`),this.log(`⚖️ Soglia: ${this.config.threshold} - AdBlock ${l?"RILEVATO":"NON RILEVATO"}`),l}async testBaitElements(){this.log("🎣 Test: Elementi esca...");let t=document.createElement("div");t.style.cssText="position: absolute; left: -9999px; top: -9999px; visibility: hidden;",document.body.appendChild(t);let e=0;for(let i of this.config.baitElements){let o=document.createElement("div");o.className=i.class,o.id=i.id,o.style.cssText="width: 300px; height: 250px; background: red; display: block !important;",o.innerHTML="Advertisement",t.appendChild(o)}await this.sleep(200);let a=t.querySelectorAll('[class*="ad"]');for(let s of a){let l=window.getComputedStyle(s);("none"===l.display||"hidden"===l.visibility||"0"===l.opacity||0===s.offsetHeight||0===s.offsetWidth)&&e++}document.body.removeChild(t);let n=e>=this.config.baitElements.length/2;return this.log(`🎣 Elementi esca: ${e}/${this.config.baitElements.length} bloccati`),n}async testGoogleAdsScript(){return this.log("📜 Test: Script Google Ads..."),new Promise(t=>{let e=document.createElement("script");e.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",e.async=!0;let i=!1,o=setTimeout(()=>{i||(i=!0,e.parentNode&&e.parentNode.removeChild(e),document.querySelectorAll("ins.adsbygoogle").forEach(t=>t.remove()),t(!0))},5e3);e.onload=()=>{if(!i){i=!0,clearTimeout(o);let a=void 0!==window.adsbygoogle;e.parentNode&&e.parentNode.removeChild(e),document.querySelectorAll("ins.adsbygoogle").forEach(t=>t.remove()),t(!a)}},e.onerror=()=>{i||(i=!0,clearTimeout(o),e.parentNode&&e.parentNode.removeChild(e),document.querySelectorAll("ins.adsbygoogle").forEach(t=>t.remove()),t(!0))},document.head.appendChild(e)})}async testImageBlocking(){this.log("🖼️ Test: Blocco immagini...");let t=["googleads.g.doubleclick.net","pagead2.googlesyndication.com","googlesyndication.com"],e=(await Promise.all(t.map(t=>new Promise(e=>{let i=new Image,o=!1,a=setTimeout(()=>{o||(o=!0,e(!0))},2e3);i.onload=()=>{o||(o=!0,clearTimeout(a),e(!1))},i.onerror=()=>{o||(o=!0,clearTimeout(a),e(!0))},i.src=`https://${t}/pagead/1x1.gif?_=${Date.now()}`})))).filter(t=>t).length,i=e>=Math.ceil(t.length/2);return this.log(`🖼️ Immagini: ${e}/${t.length} bloccate`),i}async testNetworkRequests(){this.log("🌐 Test: Richieste di rete...");let t=["https://www.googletagmanager.com/gtag/js?id=test","https://googleads.g.doubleclick.net/pagead/viewthroughconversion/test","https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"],e=0;for(let i of t)try{let o=new AbortController,a=setTimeout(()=>o.abort(),3e3);await fetch(i,{method:"HEAD",mode:"no-cors",cache:"no-cache",signal:o.signal}),clearTimeout(a)}catch(s){"AbortError"===s.name?e++:(s.message.includes("blocked")||s.message.includes("Failed to fetch"))&&e++}let l=e>=Math.ceil(t.length/2);return this.log(`🌐 Richieste: ${e}/${t.length} bloccate`),l}handleDetectionResult(t){this.isDetected=t,t?(this.log("🚫 AdBlock RILEVATO - Attivazione protezioni"),this.config.totalBlock&&this.blockContent(),this.config.showPopup&&this.showModal()):(this.log("✅ AdBlock NON RILEVATO - Accesso normale"),this.allowContent())}blockContent(){this.log("🔒 Blocco contenuto del sito"),this.config.contentSelectors.forEach(t=>{document.querySelectorAll(t).forEach(t=>{t.style.display="none",t.style.visibility="hidden"})})}allowContent(){this.config.contentSelectors.forEach(t=>{document.querySelectorAll(t).forEach(t=>{t.style.display="",t.style.visibility=""})})}showModal(){if(this.popupShown)return;this.log("📋 Creazione popup modale");let t=document.createElement("div");t.className="adblock-popup-overlay",t.innerHTML=this.generateModalHTML(),this.injectStyles(),document.body.appendChild(t),this.popupShown=!0,this.setupModalEvents(t),setTimeout(()=>t.classList.add("show"),10)}generateModalHTML(){return`
            <div class="adblock-popup-modal">
                <div class="adblock-popup-header">
                    <h2>${this.config.messages.title}</h2>
                    <p class="subtitle">${this.config.messages.subtitle}</p>
                </div>
                
                <div class="adblock-popup-content">
                    <div class="description">
                        ${this.config.messages.description}
                    </div>
                    
                    <div class="instructions">
                        <h3>${this.config.messages.instructions}</h3>
                        
                        <!-- Tab Navigation -->
                        <div class="tab-navigation">
                            <button class="tab-btn active" data-tab="desktop">🖥️ Desktop</button>
                            <button class="tab-btn" data-tab="safari-mac">🍎 Safari Mac</button>
                            <button class="tab-btn" data-tab="safari-ios">📱 Safari iOS</button>
                            <button class="tab-btn" data-tab="samsung">📱 Samsung Internet</button>
                        </div>
                        
                        <!-- Tab Content -->
                        <div class="tab-content">
                            <div class="tab-panel active" id="tab-desktop">
                                ${this.generateDesktopGuide()}
                            </div>
                            <div class="tab-panel" id="tab-safari-mac">
                                ${this.generateSafariMacGuide()}
                            </div>
                            <div class="tab-panel" id="tab-safari-ios">
                                ${this.generateSafariIOSGuide()}
                            </div>
                            <div class="tab-panel" id="tab-samsung">
                                ${this.generateSamsungGuide()}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="adblock-popup-footer">
                    <button class="reload-btn" onclick="location.reload()">
                        ${this.config.messages.buttonText}
                    </button>
                    <div class="help-links">
                        <a href="https://help.getadblock.com/support/solutions/articles/6000055743" target="_blank">📖 Guida AdBlock Plus</a>
                        <a href="https://github.com/gorhill/uBlock/wiki/Whitelist-feature" target="_blank">📖 Guida uBlock Origin</a>
                    </div>
                </div>
            </div>
        `}generateDesktopGuide(){return`
            <div class="guide-section">
                <h4>🖥️ Browser Desktop (Chrome, Firefox, Edge)</h4>
                <ol>
                    <li>🔍 Cerca l'icona del tuo AdBlocker nella barra degli strumenti del browser</li>
                    <li>🖥️ Clicca sull'icona (solitamente uno scudo 🛡️ o simbolo di blocco 🚫)</li>
                    <li>⚙️ Seleziona una di queste opzioni:
                        <ul>
                            <li>"Disabilita su questo sito" / "Disable on this site"</li>
                            <li>"Pausa su associazionesbarbara.it"</li>
                            <li>"Whitelist this site" / "Aggiungi alla lista bianca"</li>
                        </ul>
                    </li>
                    <li>🔄 Clicca il pulsante "Ho Disattivato AdBlock" qui sotto</li>
                </ol>
            </div>
        `}generateSafariMacGuide(){return`
            <div class="guide-section">
                <h4>🍎 Safari su Mac</h4>
                <ol>
                    <li>🔧 Apri Safari → Preferenze (⌘,)</li>
                    <li>🛡️ Vai alla scheda "Siti Web"</li>
                    <li>📱 Seleziona "Blocchi Contenuti" nella barra laterale</li>
                    <li>🌐 Trova "associazionesbarbara.it" nella lista</li>
                    <li>❌ Imposta su "Disattivato" per questo sito</li>
                    <li>🔄 Ricarica la pagina</li>
                </ol>
            </div>
        `}generateSafariIOSGuide(){return`
            <div class="guide-section">
                <h4>📱 Safari su iPhone/iPad</h4>
                <ol>
                    <li>⚙️ Apri l'app "Impostazioni" di iOS</li>
                    <li>🌐 Scorri e tocca "Safari"</li>
                    <li>🛡️ Tocca "Blocchi Contenuti"</li>
                    <li>❌ Disattiva temporaneamente tutti i blocchi contenuti</li>
                    <li>🔄 Torna a Safari e ricarica la pagina</li>
                    <li>✅ Riattiva i blocchi dopo la visita se desideri</li>
                </ol>
            </div>
        `}generateSamsungGuide(){return`
            <div class="guide-section">
                <h4>📱 Samsung Internet</h4>
                <ol>
                    <li>🔧 Apri Samsung Internet → Menu</li>
                    <li>🛡️ Vai su "Estensioni"</li>
                    <li>🌐 Disattiva AdBlock per associazionesbarbara.it</li>
                    <li>🔄 Ricarica la pagina</li>
                </ol>
            </div>
        `}injectStyles(){if(document.getElementById("adblock-popup-styles"))return;let t=document.createElement("style");t.id="adblock-popup-styles",t.textContent=`
            .adblock-popup-overlay { position: fixed; z-index: 99999; top: 0; left: 0; width: 100vw; height: 100vh; background: ${this.config.styles.overlayColor}; display: flex; align-items: center; justify-content: center; transition: opacity 0.3s; opacity: 0; pointer-events: none; }
            .adblock-popup-overlay.show { opacity: 1; pointer-events: auto; }
            .adblock-popup-modal { background: ${this.config.styles.popupBackground}; color: ${this.config.styles.textColor}; max-width: ${this.config.styles.maxWidth}; max-height: ${this.config.styles.maxHeight}; overflow-y: auto; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.25); padding: 32px 24px; margin: auto; }
            .adblock-popup-header h2 { color: ${this.config.styles.primaryColor}; margin-bottom: 8px; }
            .adblock-popup-header .subtitle { font-size: 1.1em; margin-bottom: 16px; }
            .adblock-popup-content .description { margin-bottom: 18px; }
            .adblock-popup-content .instructions { margin-bottom: 18px; }
            .adblock-popup-footer { margin-top: 24px; display: flex; flex-direction: column; align-items: center; }
            .reload-btn { background: ${this.config.styles.primaryColor}; color: #fff; border: none; border-radius: 6px; padding: 12px 24px; font-size: 1.1em; cursor: pointer; margin-bottom: 12px; }
            .help-links a { color: ${this.config.styles.primaryColor}; margin: 0 8px; text-decoration: underline; }
            .tab-navigation { display: flex; gap: 8px; margin-bottom: 12px; }
            .tab-btn { background: #eee; border: none; border-radius: 4px; padding: 6px 12px; cursor: pointer; font-size: 1em; }
            .tab-btn.active { background: ${this.config.styles.primaryColor}; color: #fff; }
            .tab-content { margin-top: 8px; }
            .tab-panel { display: none; }
            .tab-panel.active { display: block; }
        `,document.head.appendChild(t)}setupModalEvents(t){let e=t.querySelectorAll(".tab-btn"),i=t.querySelectorAll(".tab-panel");e.forEach(o=>{o.addEventListener("click",()=>{e.forEach(t=>t.classList.remove("active")),o.classList.add("active");let a=o.dataset.tab;i.forEach(t=>t.classList.remove("active")),t.querySelector(`#tab-${a}`).classList.add("active")})});if(this.config.preventClose){t.addEventListener("click",e=>{e.stopPropagation()})}else{t.addEventListener("click",()=>{t.classList.remove("show"),setTimeout(()=>{t.remove()},300)})}}sleep(t){return new Promise(e=>setTimeout(e,t))}}

// --- adblock-integration-v2.js ---

function initStrictAdBlockDetector(){let t=window.location.pathname.split("/").pop()||"index.html",e=Object.assign({},ADBLOCK_CONFIG_V2,PAGE_CONFIGS[t]||{});window.adBlockDetector=new AdBlockDetectorV2(e)}window.ADBLOCK_CONFIG_V2={totalBlock:!0,showPopup:!0,preventClose:!0,debugMode:!1,threshold:3,title:"AdBlock Deve Essere Disattivato 0e0f",subtitle:"Accesso Richiesto per Associazione Santa Barbara APS",description:`
        <strong style="color: #E10600;">ATTENZIONE:</strong> Per accedere al sito dell'Associazione Santa Barbara APS è <strong>obbligatorio disattivare AdBlock</strong>.
        <br><br>
        <div style="background: #FEF2F2; border-left: 4px solid #E10600; padding: 12px; margin: 16px 0; border-radius: 4px;">
            La pubblicità ci permette di:
            <br>• 🎭 <strong>Finanziare il Corteo Storico</strong> di Santa Barbara
            <br>• 🤝 <strong>Sostenere i progetti sociali</strong> per la comunità  
            <br>• 📚 <strong>Mantenere attivo</strong> questo sito web gratuito
            <br>• 🏛️ <strong>Promuovere la cultura locale</strong> di Grumo Appula
        </div>
        <strong style="color: #B91C1C;">Il sito rimarrà completamente bloccato fino alla disattivazione di AdBlock.</strong>
    `,instructions:"\uD83D\uDD27 Istruzioni Obbligatorie per Continuare:",buttonText:"\uD83D\uDD04 Ho Disattivato AdBlock - Sblocca Sito",styles:{overlayColor:"rgba(225, 6, 0, 0.95)",popupBackground:"#ffffff",primaryColor:"#E10600",textColor:"#333333",maxWidth:"900px",maxHeight:"85vh"},contentSelectors:["main",".content",".container","article","section","nav","header","footer",".hero",".gallery",".events",".about",".contacts","body > *:not(.adblock-popup-overlay):not(script):not(style)"]},window.PAGE_CONFIGS={"index.html":{title:"🏠 AdBlock Blocca l'Accesso alla Home",subtitle:"Benvenuto in Associazione Santa Barbara - Disattiva AdBlock"},"galleria.html":{title:"🎭 AdBlock Blocca la Galleria del Corteo",subtitle:"Foto e Video del Corteo Storico - Disattiva AdBlock",description:`
            <strong style="color: #E10600;">La Galleria è Protetta!</strong>
            <br><br>
            Per visualizzare le <strong>foto e video del Corteo Storico di Santa Barbara</strong>, 
            devi disattivare AdBlock. I nostri contenuti multimediali sono protetti per:
            <br>• 📸 Preservare la qualità delle immagini storiche
            <br>• 🎬 Garantire la riproduzione video senza interruzioni  
            <br>• 💰 Finanziare la conservazione del patrimonio culturale
            <br><br>
            <strong>Disattiva AdBlock per accedere alla galleria completa.</strong>
        `},"eventi.html":{title:"📅 AdBlock Blocca gli Eventi",subtitle:"Calendario Eventi Associazione - Disattiva AdBlock"},"area-soci.html":{title:"👥 AdBlock Blocca l'Area Soci",subtitle:"Area Riservata Soci - Disattiva AdBlock",description:`
            <strong style="color: #E10600;">Area Soci Protetta!</strong>
            <br><br>
            L'<strong>Area Soci</strong> dell'Associazione Santa Barbara richiede 
            la disattivazione di AdBlock per accedere a:
            <br>• 📋 Documentazione riservata ai soci
            <br>• 📊 Verbali e comunicazioni ufficiali
            <br>• 🏟️ Prenotazioni eventi esclusivi
            <br>• 💳 Servizi dedicati ai membri
            <br><br>
            <strong>Disattiva AdBlock per accedere all'area riservata.</strong>
        `}},window.testAdBlockDetection=function(){if(!ADBLOCK_CONFIG_V2.debugMode){return}let t=Object.assign({},ADBLOCK_CONFIG_V2,{debugMode:!0,threshold:1});return new AdBlockDetectorV2(t)},window.bypassAdBlockDetection=function(t){if("santabarbara2025"!==t||!ADBLOCK_CONFIG_V2.debugMode)return!1;let e=document.querySelector(".adblock-popup-overlay");return e&&e.remove(),ADBLOCK_CONFIG_V2.contentSelectors.forEach(t=>{document.querySelectorAll(t).forEach(t=>{t.style.display="",t.style.visibility=""})}),!0},document.addEventListener("DOMContentLoaded",initStrictAdBlockDetector),("complete"===document.readyState||"interactive"===document.readyState)&&initStrictAdBlockDetector(),"undefined"!=typeof module&&module.exports&&(module.exports={ADBLOCK_CONFIG_V2,PAGE_CONFIGS,initStrictAdBlockDetector,testAdBlockDetection,bypassAdBlockDetection});
