class AdBlockDetectorV2{constructor(t={}){this.config={threshold:t.threshold||3,totalTests:4,baitElements:[{class:"ads",id:"ads-banner-test"},{class:"advertisement",id:"ad-content-test"},{class:"google-ads",id:"google-ad-test"},{class:"adsbygoogle",id:"adsense-unit-test"}],adDomains:["googleads.g.doubleclick.net","pagead2.googlesyndication.com","adnxs.com","amazon-adsystem.com"],totalBlock:!1!==t.totalBlock,showPopup:!1!==t.showPopup,preventClose:!1!==t.preventClose,debugMode:t.debugMode||!1,messages:{title:t.title||"AdBlock Deve Essere Disattivato ⚠️",subtitle:t.subtitle||"Accesso Richiesto per Associazione Santa Barbara",description:t.description||this.getDefaultDescription(),instructions:t.instructions||"\uD83D\uDD27 Istruzioni per Continuare:",buttonText:t.buttonText||"Ho Disattivato AdBlock - Ricarica Pagina"},styles:{overlayColor:t.overlayColor||"rgba(225, 6, 0, 0.95)",popupBackground:t.popupBackground||"#ffffff",primaryColor:t.primaryColor||"#E10600",textColor:t.textColor||"#333333",maxWidth:"900px",maxHeight:"85vh"},contentSelectors:t.contentSelectors||["main",".content",".container","article","section","body > *:not(.adblock-popup-overlay)"]},this.isDetected=!1,this.popupShown=!1,this.testResults=[],this.detectedType="none",this.log=()=>{},this.init()}getDefaultDescription(){return`
            <strong style="color: #E10600;">ATTENZIONE:</strong> Per accedere al sito dell'Associazione Santa Barbara APS \xe8 <strong>obbligatorio disattivare AdBlock</strong>.
            <br><br>
            La pubblicit\xe0 ci permette di:
            <br>• 🎭 Finanziare il Corteo Storico di Santa Barbara
            <br>• 🤝 Sostenere i progetti sociali per la comunit\xe0  
            <br>• 📚 Mantenere attivo questo sito web gratuito
            <br>• 🏛️ Promuovere la cultura locale di Grumo Appula
            <br><br>
            <strong>Il sito rimarr\xe0 bloccato fino alla disattivazione di AdBlock.</strong>
        `}init(){this.log("\uD83D\uDE80 Inizializzazione AdBlock Detector v2.0"),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",()=>this.startDetection()):this.startDetection()}async startDetection(){this.log("\uD83D\uDD0D Avvio rilevamento AdBlock...");try{let t=await this.runDetectionTests();this.handleDetectionResult(t)}catch(e){this.log("❌ Errore rilevamento:",e),this.handleDetectionResult(!1)}}async runDetectionTests(){this.log("\uD83D\uDCCA Esecuzione test di rilevamento...");let t=[{name:"Bait Elements",test:()=>this.testBaitElements()},{name:"Google Ads Script",test:()=>this.testGoogleAdsScript()},{name:"Image Blocking",test:()=>this.testImageBlocking()},{name:"Network Requests",test:()=>this.testNetworkRequests()}],e=[];for(let i=0;i<t.length;i++)try{let o=await t[i].test();e.push(o),this.log(`📈 ${t[i].name}: ${o?"✅ BLOCCATO":"❌ OK"}`),i<t.length-1&&await this.sleep(100)}catch(a){this.log(`⚠️ Errore in ${t[i].name}:`,a),e.push(!1)}this.testResults=e;let s=e.filter(t=>t).length,l=s>=this.config.threshold;return this.log(`🎯 Risultati: ${s}/${this.config.totalTests} test positivi`),this.log(`⚖️ Soglia: ${this.config.threshold} - AdBlock ${l?"RILEVATO":"NON RILEVATO"}`),l}async testBaitElements(){this.log("\uD83C\uDFA3 Test: Elementi esca...");let t=document.createElement("div");t.style.cssText="position: absolute; left: -9999px; top: -9999px; visibility: hidden;",document.body.appendChild(t);let e=0;for(let i of this.config.baitElements){let o=document.createElement("div");o.className=i.class,o.id=i.id,o.style.cssText="width: 300px; height: 250px; background: red; display: block !important;",o.innerHTML="Advertisement",t.appendChild(o)}await this.sleep(200);let a=t.querySelectorAll('[class*="ad"]');for(let s of a){let l=window.getComputedStyle(s);("none"===l.display||"hidden"===l.visibility||"0"===l.opacity||0===s.offsetHeight||0===s.offsetWidth)&&e++}document.body.removeChild(t);let n=e>=this.config.baitElements.length/2;return this.log(`🎣 Elementi esca: ${e}/${this.config.baitElements.length} bloccati`),n}async testGoogleAdsScript(){return this.log("\uD83D\uDCDC Test: Script Google Ads..."),new Promise(t=>{let e=document.createElement("script");e.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",e.async=!0;let i=!1,o=setTimeout(()=>{i||(i=!0,e.parentNode&&e.parentNode.removeChild(e),document.querySelectorAll("ins.adsbygoogle").forEach(t=>t.remove()),t(!0))},5e3);e.onload=()=>{if(!i){i=!0,clearTimeout(o);let a=void 0!==window.adsbygoogle;e.parentNode&&e.parentNode.removeChild(e),document.querySelectorAll("ins.adsbygoogle").forEach(t=>t.remove()),t(!a)}},e.onerror=()=>{i||(i=!0,clearTimeout(o),e.parentNode&&e.parentNode.removeChild(e),document.querySelectorAll("ins.adsbygoogle").forEach(t=>t.remove()),t(!0))},document.head.appendChild(e)})}async testImageBlocking(){this.log("\uD83D\uDDBC️ Test: Blocco immagini...");let t=["googleads.g.doubleclick.net","pagead2.googlesyndication.com","googlesyndication.com"],e=t.map(t=>new Promise(e=>{let i=new Image,o=!1,a=setTimeout(()=>{o||(o=!0,e(!0))},2e3);i.onload=()=>{o||(o=!0,clearTimeout(a),e(!1))},i.onerror=()=>{o||(o=!0,clearTimeout(a),e(!0))},i.src=`https://${t}/pagead/1x1.gif?_=${Date.now()}`})),i=await Promise.all(e),o=i.filter(t=>t).length,a=o>=Math.ceil(t.length/2);return this.log(`🖼️ Immagini: ${o}/${t.length} bloccate`),a}async testNetworkRequests(){this.log("\uD83C\uDF10 Test: Richieste di rete...");let t=["https://www.googletagmanager.com/gtag/js?id=test","https://googleads.g.doubleclick.net/pagead/viewthroughconversion/test","https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"],e=0;for(let i of t)try{let o=new AbortController,a=setTimeout(()=>o.abort(),3e3);await fetch(i,{method:"HEAD",mode:"no-cors",cache:"no-cache",signal:o.signal}),clearTimeout(a)}catch(s){"AbortError"===s.name?e++:(s.message.includes("blocked")||s.message.includes("Failed to fetch"))&&e++}let l=e>=Math.ceil(t.length/2);return this.log(`🌐 Richieste: ${e}/${t.length} bloccate`),l}handleDetectionResult(t){this.isDetected=t,t?(this.log("\uD83D\uDEAB AdBlock RILEVATO - Attivazione protezioni"),this.config.totalBlock&&this.blockContent(),this.config.showPopup&&this.showModal()):(this.log("✅ AdBlock NON RILEVATO - Accesso normale"),this.allowContent())}blockContent(){this.log("\uD83D\uDD12 Blocco contenuto del sito"),this.config.contentSelectors.forEach(t=>{let e=document.querySelectorAll(t);e.forEach(t=>{t.style.display="none",t.style.visibility="hidden"})})}allowContent(){this.config.contentSelectors.forEach(t=>{let e=document.querySelectorAll(t);e.forEach(t=>{t.style.display="",t.style.visibility=""})})}showModal(){if(this.popupShown)return;this.log("\uD83D\uDCCB Creazione popup modale");let t=document.createElement("div");t.className="adblock-popup-overlay",t.innerHTML=this.generateModalHTML(),this.injectStyles(),document.body.appendChild(t),this.popupShown=!0,this.setupModalEvents(t),setTimeout(()=>t.classList.add("show"),10)}generateModalHTML(){return`
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
                <h4>🖱️ Browser Desktop (Chrome, Firefox, Edge)</h4>
                <ol>
                    <li>🔍 Cerca l'icona del tuo AdBlocker nella barra degli strumenti del browser</li>
                    <li>🖱️ Clicca sull'icona (solitamente uno scudo 🛡️ o simbolo di blocco 🚫)</li>
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
                    <li>🔧 Apri Samsung Internet</li>
                    <li>⚙️ Tocca Menu (☰) → Impostazioni</li>
                    <li>🛡️ Tocca "Blocco contenuti intelligente"</li>
                    <li>🌐 Tocca "Gestisci siti web"</li>
                    <li>➕ Aggiungi "associazionesbarbara.it" alla lista bianca</li>
                    <li>🔄 Ricarica la pagina</li>
                </ol>
            </div>
        `}setupModalEvents(t){let e=t.querySelectorAll(".tab-btn"),i=t.querySelectorAll(".tab-panel");e.forEach(o=>{o.addEventListener("click",()=>{let a=o.dataset.tab;e.forEach(t=>t.classList.remove("active")),o.classList.add("active"),i.forEach(t=>{t.classList.remove("active")}),t.querySelector(`#tab-${a}`).classList.add("active")})}),this.config.preventClose&&t.addEventListener("click",e=>{e.target===t&&(e.preventDefault(),e.stopPropagation())})}injectStyles(){if(document.getElementById("adblock-popup-styles"))return;let t=document.createElement("style");t.id="adblock-popup-styles",t.textContent=`
            .adblock-popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: ${this.config.styles.overlayColor};
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 999999;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .adblock-popup-overlay.show {
                opacity: 1;
            }
            
            .adblock-popup-modal {
                background: ${this.config.styles.popupBackground};
                max-width: ${this.config.styles.maxWidth};
                max-height: ${this.config.styles.maxHeight};
                width: 90%;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                overflow: hidden;
                display: flex;
                flex-direction: column;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            .adblock-popup-overlay.show .adblock-popup-modal {
                transform: scale(1);
            }
            
            .adblock-popup-header {
                background: linear-gradient(135deg, ${this.config.styles.primaryColor}, #B91C1C);
                color: white;
                padding: 24px;
                text-align: center;
            }
            
            .adblock-popup-header h2 {
                margin: 0 0 8px 0;
                font-size: 24px;
                font-weight: bold;
            }
            
            .adblock-popup-header .subtitle {
                margin: 0;
                opacity: 0.9;
                font-size: 16px;
            }
            
            .adblock-popup-content {
                padding: 24px;
                overflow-y: auto;
                flex: 1;
            }
            
            .description {
                background: #FEF2F2;
                border: 1px solid #FECACA;
                border-radius: 8px;
                padding: 16px;
                margin-bottom: 24px;
                line-height: 1.6;
            }
            
            .tab-navigation {
                display: flex;
                border-bottom: 2px solid #E5E7EB;
                margin-bottom: 20px;
                overflow-x: auto;
            }
            
            .tab-btn {
                background: none;
                border: none;
                padding: 12px 16px;
                cursor: pointer;
                border-bottom: 3px solid transparent;
                transition: all 0.2s;
                white-space: nowrap;
                font-size: 14px;
            }
            
            .tab-btn.active {
                border-bottom-color: ${this.config.styles.primaryColor};
                color: ${this.config.styles.primaryColor};
                font-weight: bold;
            }
            
            .tab-btn:hover {
                background: #F3F4F6;
            }
            
            .tab-panel {
                display: none;
            }
            
            .tab-panel.active {
                display: block;
            }
            
            .guide-section ol {
                padding-left: 20px;
            }
            
            .guide-section li {
                margin-bottom: 8px;
                line-height: 1.5;
            }
            
            .guide-section ul {
                margin-top: 8px;
            }
            
            .adblock-popup-footer {
                background: #F9FAFB;
                padding: 24px;
                text-align: center;
                border-top: 1px solid #E5E7EB;
            }
            
            .reload-btn {
                background: ${this.config.styles.primaryColor};
                color: white;
                border: none;
                padding: 14px 28px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: background 0.2s;
                margin-bottom: 16px;
            }
            
            .reload-btn:hover {
                background: #B91C1C;
            }
            
            .help-links {
                display: flex;
                gap: 20px;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .help-links a {
                color: ${this.config.styles.primaryColor};
                text-decoration: none;
                font-size: 14px;
            }
            
            .help-links a:hover {
                text-decoration: underline;
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .adblock-popup-modal {
                    width: 95%;
                    max-height: 90vh;
                }
                
                .adblock-popup-content {
                    padding: 16px;
                }
                
                .tab-btn {
                    font-size: 12px;
                    padding: 10px 12px;
                }
                
                .help-links {
                    flex-direction: column;
                    gap: 12px;
                }
            }
        `,document.head.appendChild(t)}sleep(t){return new Promise(e=>setTimeout(e,t))}}"undefined"!=typeof module&&module.exports&&(module.exports=AdBlockDetectorV2),window.AdBlockDetectorV2=AdBlockDetectorV2;