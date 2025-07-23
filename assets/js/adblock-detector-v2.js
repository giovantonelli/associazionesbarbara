/**
 * AdBlock Detector v2.0 - Sistema Avanzato
 * Per Associazione Santa Barbara APS
 * 
 * Implementazione completa secondo specifiche:
 * - Rilevamento accurato con soglia 3/4 test
 * - Popup modale responsive non chiudibile
 * - Guide multi-dispositivo
 * - Nessun polling continuo
 * - Gestione errori e falsi positivi
 */

class AdBlockDetectorV2 {
    constructor(config = {}) {
        // Configurazione avanzata
        this.config = {
            // Soglia rilevamento: almeno 3 test su 4 positivi
            threshold: config.threshold || 3,
            totalTests: 4,
            
            // Elementi esca con classi tipicamente bloccate
            baitElements: [
                { class: 'ads', id: 'ads-banner-test' },
                { class: 'advertisement', id: 'ad-content-test' },
                { class: 'google-ads', id: 'google-ad-test' },
                { class: 'adsbygoogle', id: 'adsense-unit-test' }
            ],
            
            // Domini pubblicitari per test di rete
            adDomains: [
                'googleads.g.doubleclick.net',
                'pagead2.googlesyndication.com',
                'adnxs.com',
                'amazon-adsystem.com'
            ],
            
            // Comportamento sistema
            totalBlock: config.totalBlock !== false,
            showPopup: config.showPopup !== false,
            preventClose: config.preventClose !== false,
            debugMode: config.debugMode || false,
            
            // Messaggi personalizzabili
            messages: {
                title: config.title || 'AdBlock Deve Essere Disattivato ⚠️',
                subtitle: config.subtitle || 'Accesso Richiesto per Associazione Santa Barbara',
                description: config.description || this.getDefaultDescription(),
                instructions: config.instructions || '🔧 Istruzioni per Continuare:',
                buttonText: config.buttonText || 'Ho Disattivato AdBlock - Ricarica Pagina'
            },
            
            // Stili responsive
            styles: {
                overlayColor: config.overlayColor || 'rgba(225, 6, 0, 0.95)',
                popupBackground: config.popupBackground || '#ffffff',
                primaryColor: config.primaryColor || '#E10600',
                textColor: config.textColor || '#333333',
                maxWidth: '900px',
                maxHeight: '85vh'
            },
            
            // Selettori contenuto da proteggere
            contentSelectors: config.contentSelectors || [
                'main', '.content', '.container', 'article', 'section', 'body > *:not(.adblock-popup-overlay)'
            ]
        };
        
        // Stato interno
        this.isDetected = false;
        this.popupShown = false;
        this.testResults = [];
        this.detectedType = 'none';
        
        // Debug logger con gestione errori console
        this.log = this.config.debugMode ? 
            (msg, ...args) => {
                try {
                    console.log(`[AdBlock v2.0] ${msg}`, ...args);
                } catch (e) {
                    // Fallback silenzioso se console non disponibile
                }
            } : 
            () => {};
        
        // Auto-inizializzazione
        this.init();
    }
    
    /**
     * Descrizione predefinita
     */
    getDefaultDescription() {
        return `
            <strong style="color: #E10600;">ATTENZIONE:</strong> Per accedere al sito dell'Associazione Santa Barbara APS è <strong>obbligatorio disattivare AdBlock</strong>.
            <br><br>
            La pubblicità ci permette di:
            <br>• 🎭 Finanziare il Corteo Storico di Santa Barbara
            <br>• 🤝 Sostenere i progetti sociali per la comunità  
            <br>• 📚 Mantenere attivo questo sito web gratuito
            <br>• 🏛️ Promuovere la cultura locale di Grumo Appula
            <br><br>
            <strong>Il sito rimarrà bloccato fino alla disattivazione di AdBlock.</strong>
        `;
    }
    
    /**
     * Inizializzazione
     */
    init() {
        this.log('🚀 Inizializzazione AdBlock Detector v2.0');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startDetection());
        } else {
            this.startDetection();
        }
    }
    
    /**
     * Avvio rilevamento (una sola volta, no polling)
     */
    async startDetection() {
        this.log('🔍 Avvio rilevamento AdBlock...');
        
        try {
            const detected = await this.runDetectionTests();
            this.handleDetectionResult(detected);
        } catch (error) {
            this.log('❌ Errore rilevamento:', error);
            // Fail-safe: non bloccare in caso di errore
            this.handleDetectionResult(false);
        }
    }
    
    /**
     * Esecuzione dei 4 test principali con soglia 3/4
     */
    async runDetectionTests() {
        this.log('📊 Esecuzione test di rilevamento...');
        
        const tests = [
            { name: 'Bait Elements', test: () => this.testBaitElements() },
            { name: 'Google Ads Script', test: () => this.testGoogleAdsScript() },
            { name: 'Image Blocking', test: () => this.testImageBlocking() },
            { name: 'Network Requests', test: () => this.testNetworkRequests() }
        ];
        
        const results = [];
        
        // Esecuzione sequenziale per evitare sovraccarico
        for (let i = 0; i < tests.length; i++) {
            try {
                const result = await tests[i].test();
                results.push(result);
                this.log(`📈 ${tests[i].name}: ${result ? '✅ BLOCCATO' : '❌ OK'}`);
                
                // Pausa tra test
                if (i < tests.length - 1) {
                    await this.sleep(100);
                }
            } catch (error) {
                this.log(`⚠️ Errore in ${tests[i].name}:`, error);
                results.push(false); // Fail-safe
            }
        }
        
        this.testResults = results;
        const positiveTests = results.filter(r => r).length;
        const detected = positiveTests >= this.config.threshold;
        
        this.log(`🎯 Risultati: ${positiveTests}/${this.config.totalTests} test positivi`);
        this.log(`⚖️ Soglia: ${this.config.threshold} - AdBlock ${detected ? 'RILEVATO' : 'NON RILEVATO'}`);
        
        return detected;
    }
    
    /**
     * Test 1: Elementi esca con classi tipicamente bloccate
     */
    async testBaitElements() {
        this.log('🎣 Test: Elementi esca...');
        
        const baitContainer = document.createElement('div');
        baitContainer.style.cssText = 'position: absolute; left: -9999px; top: -9999px; visibility: hidden;';
        document.body.appendChild(baitContainer);
        
        let blockedCount = 0;
        
        for (const bait of this.config.baitElements) {
            const element = document.createElement('div');
            element.className = bait.class;
            element.id = bait.id;
            element.style.cssText = 'width: 300px; height: 250px; background: red; display: block !important;';
            element.innerHTML = 'Advertisement';
            
            baitContainer.appendChild(element);
        }
        
        // Attesa per permettere agli AdBlocker di agire
        await this.sleep(200);
        
        // Controllo se elementi sono stati bloccati
        const baitElements = baitContainer.querySelectorAll('[class*="ad"]');
        for (const element of baitElements) {
            const computed = window.getComputedStyle(element);
            if (computed.display === 'none' || 
                computed.visibility === 'hidden' || 
                computed.opacity === '0' ||
                element.offsetHeight === 0 ||
                element.offsetWidth === 0) {
                blockedCount++;
            }
        }
        
        // Cleanup
        document.body.removeChild(baitContainer);
        
        const isBlocked = blockedCount >= this.config.baitElements.length / 2;
        this.log(`🎣 Elementi esca: ${blockedCount}/${this.config.baitElements.length} bloccati`);
        return isBlocked;
    }
    
    /**
     * Test 2: Caricamento script Google Ads
     */
    async testGoogleAdsScript() {
        this.log('📜 Test: Script Google Ads...');
        
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
            script.async = true;
            
            let resolved = false;
            
            // Timeout più lungo per evitare falsi positivi su connessioni lente
            const timeout = setTimeout(() => {
                if (!resolved) {
                    resolved = true;
                    if (script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                    // Rimuovi eventuali <ins class="adsbygoogle"> creati
                    document.querySelectorAll('ins.adsbygoogle').forEach(el => el.remove());
                    resolve(true); // Script probabilmente bloccato
                }
            }, 5000);
            
            script.onload = () => {
                if (!resolved) {
                    resolved = true;
                    clearTimeout(timeout);
                    // Verifica che l'oggetto adsbygoogle sia stato creato
                    const adsbyGoogleExists = typeof window.adsbygoogle !== 'undefined';
                    if (script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                    // Rimuovi eventuali <ins class="adsbygoogle"> creati
                    document.querySelectorAll('ins.adsbygoogle').forEach(el => el.remove());
                    resolve(!adsbyGoogleExists); // Se l'oggetto non esiste, potrebbe essere bloccato
                }
            };
            
            script.onerror = () => {
                if (!resolved) {
                    resolved = true;
                    clearTimeout(timeout);
                    if (script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                    // Rimuovi eventuali <ins class="adsbygoogle"> creati
                    document.querySelectorAll('ins.adsbygoogle').forEach(el => el.remove());
                    resolve(true); // Script sicuramente bloccato
                }
            };
            
            document.head.appendChild(script);
        });
    }
    
    /**
     * Test 3: Blocco immagini da domini pubblicitari
     */
    async testImageBlocking() {
        this.log('🖼️ Test: Blocco immagini...');
        
        // Domini pubblicitari più affidabili per test
        const testDomains = [
            'googleads.g.doubleclick.net',
            'pagead2.googlesyndication.com',
            'googlesyndication.com'
        ];
        
        const testPromises = testDomains.map(domain => {
            return new Promise((resolve) => {
                const img = new Image();
                let resolved = false;
                
                const timeout = setTimeout(() => {
                    if (!resolved) {
                        resolved = true;
                        resolve(true); // Timeout = presumibilmente bloccato
                    }
                }, 2000);
                
                img.onload = () => {
                    if (!resolved) {
                        resolved = true;
                        clearTimeout(timeout);
                        resolve(false); // Caricata = non bloccata
                    }
                };
                
                img.onerror = () => {
                    if (!resolved) {
                        resolved = true;
                        clearTimeout(timeout);
                        resolve(true); // Errore = probabilmente bloccata
                    }
                };
                
                // Usa un'immagine 1x1 pixel trasparente per ridurre errori
                img.src = `https://${domain}/pagead/1x1.gif?_=${Date.now()}`;
            });
        });
        
        const results = await Promise.all(testPromises);
        const blockedCount = results.filter(r => r).length;
        const isBlocked = blockedCount >= Math.ceil(testDomains.length / 2);
        
        this.log(`🖼️ Immagini: ${blockedCount}/${testDomains.length} bloccate`);
        return isBlocked;
    }
    
    /**
     * Test 4: Richieste di rete a endpoint pubblicitari
     */
    async testNetworkRequests() {
        this.log('🌐 Test: Richieste di rete...');
        
        // URL più affidabili e meno inclini a 404 naturali
        const testUrls = [
            'https://www.googletagmanager.com/gtag/js?id=test',
            'https://googleads.g.doubleclick.net/pagead/viewthroughconversion/test',
            'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
        ];
        
        let blockedCount = 0;
        
        for (const url of testUrls) {
            try {
                // Usa fetch con no-cors per evitare CORS errors che non indicano blocco
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 3000);
                
                const response = await fetch(url, { 
                    method: 'HEAD',
                    mode: 'no-cors',
                    cache: 'no-cache',
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                // Se arriviamo qui, la richiesta è passata (non bloccata)
                
            } catch (error) {
                // Distingui tra errori di rete e blocchi AdBlock
                if (error.name === 'AbortError') {
                    // Timeout - probabilmente bloccato
                    blockedCount++;
                } else if (error.message.includes('blocked') || 
                          error.message.includes('Failed to fetch')) {
                    // Chiaramente bloccato
                    blockedCount++;
                }
                // Altri errori (CORS, 404 naturali) non contano come blocchi
            }
        }
        
        const isBlocked = blockedCount >= Math.ceil(testUrls.length / 2);
        this.log(`🌐 Richieste: ${blockedCount}/${testUrls.length} bloccate`);
        return isBlocked;
    }
    
    /**
     * Gestisce il risultato del rilevamento
     */
    handleDetectionResult(detected) {
        this.isDetected = detected;
        
        if (detected) {
            this.log('🚫 AdBlock RILEVATO - Attivazione protezioni');
            
            if (this.config.totalBlock) {
                this.blockContent();
            }
            
            if (this.config.showPopup) {
                this.showModal();
            }
        } else {
            this.log('✅ AdBlock NON RILEVATO - Accesso normale');
            this.allowContent();
        }
    }
    
    /**
     * Blocca completamente il contenuto
     */
    blockContent() {
        this.log('🔒 Blocco contenuto del sito');
        
        this.config.contentSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
            });
        });
    }
    
    /**
     * Permette accesso al contenuto
     */
    allowContent() {
        this.config.contentSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.display = '';
                el.style.visibility = '';
            });
        });
    }
    
    /**
     * Mostra popup modale responsive
     */
    showModal() {
        if (this.popupShown) return;
        
        this.log('📋 Creazione popup modale');
        
        const overlay = document.createElement('div');
        overlay.className = 'adblock-popup-overlay';
        overlay.innerHTML = this.generateModalHTML();
        
        // Stili CSS inline per garantire rendering
        this.injectStyles();
        
        document.body.appendChild(overlay);
        this.popupShown = true;
        
        // Gestione eventi
        this.setupModalEvents(overlay);
        
        // Animazione entrata
        setTimeout(() => overlay.classList.add('show'), 10);
    }
    
    /**
     * Genera HTML del popup con tab responsive
     */
    generateModalHTML() {
        return `
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
        `;
    }
    
    /**
     * Guide specifiche per dispositivo
     */
    generateDesktopGuide() {
        return `
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
        `;
    }
    
    generateSafariMacGuide() {
        return `
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
        `;
    }
    
    generateSafariIOSGuide() {
        return `
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
        `;
    }
    
    generateSamsungGuide() {
        return `
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
        `;
    }
    
    /**
     * Eventi modal (tab switching, etc.)
     */
    setupModalEvents(overlay) {
        // Tab switching
        const tabBtns = overlay.querySelectorAll('.tab-btn');
        const tabPanels = overlay.querySelectorAll('.tab-panel');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;
                
                // Aggiorna bottoni
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Aggiorna pannelli
                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                });
                overlay.querySelector(`#tab-${targetTab}`).classList.add('active');
            });
        });
        
        // Previeni chiusura se configurato
        if (this.config.preventClose) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
    }
    
    /**
     * Inietta stili CSS per il popup
     */
    injectStyles() {
        if (document.getElementById('adblock-popup-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'adblock-popup-styles';
        styles.textContent = `
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
        `;
        
        document.head.appendChild(styles);
    }
    
    /**
     * Utility: Sleep function
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Export per uso modulare
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdBlockDetectorV2;
}

// Alias globale
window.AdBlockDetectorV2 = AdBlockDetectorV2;
