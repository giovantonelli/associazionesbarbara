/**
 * AdBlock Detector per Associazione Santa Barbara
 * Sistema avanzato di rilevamento AdBlocker con popup modale e blocco contenuti
 * 
 * @author Associazione Santa Barbara APS
 * @version 2.0.0
 * @description Sistema completo per rilevamento AdBlock/uBlock/AdGuard/Brave Shield
 */

class AdBlockDetector {
    constructor(options = {}) {
        // Configurazione avanzata
        this.config = {
            // Soglia di rilevamento (almeno 3 test su 4 devono essere positivi)
            threshold: options.threshold || 3,
            totalTests: 4,
            
            // Elementi esca per rilevamento
            baitElements: [
                { class: 'ads', id: 'ads-banner' },
                { class: 'advertisement', id: 'ad-content' },
                { class: 'google-ads', id: 'google-ad' },
                { class: 'adsbygoogle', id: 'adsense-unit' }
            ],
            
            // Domini pubblicitari per test di rete
            adDomains: [
                'googleads.g.doubleclick.net',
                'pagead2.googlesyndication.com',
                'adnxs.com',
                'amazon-adsystem.com'
            ],
            
            // Messaggi personalizzabili
            messages: {
                title: options.title || 'AdBlock Deve Essere Disattivato ⚠️',
                subtitle: options.subtitle || 'Accesso Richiesto per Associazione Santa Barbara',
                description: options.description || this.getDefaultDescription(),
                instructions: options.instructions || '🔧 Istruzioni per Continuare:',
                steps: options.steps || this.getDefaultSteps(),
                buttonText: options.buttonText || 'Ho Disattivato AdBlock - Ricarica Pagina',
                closeText: options.closeText || '❌ Chiudi'
            },
            
            // Stili avanzati
            styles: {
                overlayColor: options.overlayColor || 'rgba(225, 6, 0, 0.95)',
                popupBackground: options.popupBackground || '#ffffff',
                primaryColor: options.primaryColor || '#E10600',
                textColor: options.textColor || '#333333',
                maxWidth: '900px',
                maxHeight: '85vh'
            },
            
            // Comportamento sistema
            totalBlock: options.totalBlock !== false, // Blocco completo
            showPopup: options.showPopup !== false, // Mostra popup
            preventClose: options.preventClose !== false, // Popup non chiudibile
            recheckInterval: 0, // Nessun controllo periodico
            debugMode: options.debugMode || false,
            
            // Selettori contenuto da proteggere
            contentSelectors: options.contentSelectors || [
                'main', '.content', '.container', 'article', 'section'
            ]
        };
        
        // Stato interno
        this.isAdBlockActive = false;
        this.hasShownPopup = false;
        this.detectedAdBlockType = 'none';
        this.testResults = [];
        this.recheckTimer = null;
        
        // Debug logging
        this.log = this.config.debugMode ? console.log.bind(console) : () => {};
        
        // Inizializzazione automatica
        if (this.config.autoCheck !== false) {
            this.init();
        }
    }
    
    /**
     * Descrizione predefinita personalizzata
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
     * Passi predefiniti per disattivazione
     */
    getDefaultSteps() {
        return [
            '1. 🖱️ Clicca sull\'icona del tuo AdBlocker nella barra del browser',
            '2. ⚙️ Seleziona "Disabilita su associazionesbarbara.it" o "Pausa AdBlock"',
            '3. 🔄 Clicca il pulsante "Ho Disattivato AdBlock" qui sotto',
            '4. ✅ Il sito si sbloccherà automaticamente'
        ];
    }
            recheckInterval: options.recheckInterval || 3000, // ms
            totalBlock: options.totalBlock || false, // Blocco totale del sito
            preventClose: options.preventClose || false, // Impedisce chiusura popup
            
            // Selettori contenuto da nascondere
            contentSelectors: options.contentSelectors || [
                'main',
                '.content', 
                '#content',
                'article',
                '.post',
                '.page-content'
            ]
        };
        
        this.isAdBlockActive = false;
        this.hasShownPopup = false;
        
        // Auto-inizializzazione
        if (this.config.autoCheck) {
            this.init();
        }
    }
    
    /**
     * Inizializza il detector
     */
    init() {
        // DISABILITAZIONE TEMPORANEA: troppi falsi positivi
        if (this.config.disableDetection === true) {
            console.log('🚫 AdBlock detector DISABILITATO temporaneamente per falsi positivi');
            return;
        }
        
        // Controllo di emergenza: se nel localStorage c'è 'disable-adblock-detector', non avviare
        if (localStorage.getItem('disable-adblock-detector') === 'true') {
            console.log('🔧 AdBlock detector disabilitato tramite localStorage');
            return;
        }
        
        // Controllo URL parameter per disabilitare
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('disable-adblock') === 'true') {
            console.log('🔧 AdBlock detector disabilitato tramite URL parameter');
            return;
        }
        
        // Aspetta che il DOM sia pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startDetection());
        } else {
            this.startDetection();
        }
    }
    
    /**
     * Avvia il processo di rilevamento
     */
    startDetection() {

        
        // Controllo iniziale
        this.detectAdBlock().then(detected => {
            this.handleDetection(detected);
            
            // Controlli periodici disabilitati - non necessari per adblock detection
        });
    }
    
    /**
     * Rileva la presenza di AdBlock usando multiple tecniche
     * @returns {Promise<boolean>} True se AdBlock è attivo
     */
    async detectAdBlock() {
        // Rileva tipo specifico di adblock e se è attivo
        this.detectedAdBlockType = await this.identifyAdBlockType();
        
        if (this.detectedAdBlockType !== 'none') {
            return true;
        }
        
        // Fallback con test generici se non rilevato tipo specifico
        const tests = [
            this.testBaitElements(),
            this.testGoogleAds(), 
            this.testCommonAdScripts(),
            this.testAdImageBlocking()
        ];
        
        try {
            const results = [];
            for (const test of tests) {
                const result = await test;
                results.push(result);
                await new Promise(resolve => setTimeout(resolve, 10));
            }
            
            const positiveTests = results.filter(result => result).length;
            
            // Debug logging per diagnosticare falsi positivi
            console.log('🔍 Risultati test AdBlock:', {
                testResults: results,
                positiveTests: positiveTests,
                totalTests: results.length,
                detectedType: this.detectedAdBlockType
            });
            
            // Soglia più alta per ridurre falsi positivi: serve almeno 3 test positivi su 4
            if (positiveTests >= 3) {
                this.detectedAdBlockType = 'generic';
                console.log('⚠️ AdBlock rilevato (generic) con', positiveTests, 'test positivi');
                return true;
            }
            
            console.log('✅ AdBlock NON rilevato:', positiveTests, 'test positivi su', results.length);
            return false;
        } catch (error) {
            console.warn('⚠️ Errore durante il rilevamento AdBlock:', error);
            return false;
        }
    }
    
    /**
     * Identifica il tipo specifico di AdBlock
     * @returns {Promise<string>} Tipo di adblock rilevato
     */
    async identifyAdBlockType() {
        // Test per uBlock Origin
        if (await this.testUBlockOrigin()) {
            return 'ublock-origin';
        }
        
        // Test per AdBlock Plus
        if (await this.testAdBlockPlus()) {
            return 'adblock-plus';
        }
        
        // Test per AdGuard
        if (await this.testAdGuard()) {
            return 'adguard';
        }
        
        // Test per Ghostery
        if (await this.testGhostery()) {
            return 'ghostery';
        }
        
        // Test per AdBlock (non Plus)
        if (await this.testAdBlock()) {
            return 'adblock';
        }
        
        // Test per Brave Browser built-in
        if (await this.testBraveBrowser()) {
            return 'brave';
        }
        
        return 'none';
    }
    
    /**
     * Test specifico per uBlock Origin
     */
    async testUBlockOrigin() {
        return new Promise(resolve => {
            // Test più specifici per uBlock Origin
            let detectionCount = 0;
            let testsCompleted = 0;
            const totalTests = 3;
            
            // Test 1: Elemento con classe tipica uBlock
            const testDiv = document.createElement('div');
            testDiv.className = 'ads ad adsbox GoogleActiveViewElement';
            testDiv.style.cssText = 'height: 10px !important; width: 10px !important; position: absolute; left: -9999px;';
            document.body.appendChild(testDiv);
            
            setTimeout(() => {
                const isBlocked = testDiv.offsetHeight === 0 || 
                                 window.getComputedStyle(testDiv).display === 'none';
                if (isBlocked) detectionCount++;
                testsCompleted++;
                document.body.removeChild(testDiv);
                
                if (testsCompleted === totalTests) {
                    // Richiede almeno 2 test positivi su 3 per uBlock
                    resolve(detectionCount >= 2);
                }
            }, 100);
            
            // Test 2: Controlla window.uBlockOrigin
            if (typeof window.uBlockOrigin !== 'undefined') {
                detectionCount++;
            }
            testsCompleted++;
            
            // Test 3: Controlla script injection tipico di uBlock
            const hasUBlockScript = document.querySelector('script[src*="ublock"]') !== null ||
                                   document.querySelector('[data-ublock]') !== null;
            if (hasUBlockScript) {
                detectionCount++;
            }
            testsCompleted++;
            
            if (testsCompleted === totalTests) {
                resolve(detectionCount >= 2);
            }
        });
    }
    
    /**
     * Test specifico per AdBlock Plus
     */
    async testAdBlockPlus() {
        return new Promise(resolve => {
            // AdBlock Plus ha signature specifiche
            const testScript = document.createElement('script');
            testScript.src = 'https://googleads.g.doubleclick.net/pagead/ads?client=test';
            testScript.onerror = () => {
                // Controlla se è specificamente ABP
                const isABP = typeof window.external !== 'undefined' &&
                            typeof window.external.AddSearchProvider !== 'undefined';
                resolve(isABP);
            };
            testScript.onload = () => resolve(false);
            document.head.appendChild(testScript);
            
            setTimeout(() => {
                if (testScript.parentNode) {
                    testScript.remove();
                }
                resolve(false);
            }, 1000);
        });
    }
    
    /**
     * Test specifico per AdGuard
     */
    async testAdGuard() {
        return new Promise(resolve => {
            // AdGuard ha metodi di detection specifici
            const testFrame = document.createElement('iframe');
            testFrame.src = 'about:blank';
            testFrame.style.cssText = 'width:1px;height:1px;position:absolute;left:-999px;';
            document.body.appendChild(testFrame);
            
            setTimeout(() => {
                try {
                    const frameDoc = testFrame.contentDocument;
                    const isAdGuard = frameDoc && frameDoc.getElementById &&
                                    (window.adguardApi !== undefined || 
                                     document.querySelector('div[data-adguard]') !== null);
                    
                    document.body.removeChild(testFrame);
                    resolve(isAdGuard);
                } catch (e) {
                    document.body.removeChild(testFrame);
                    resolve(false);
                }
            }, 100);
        });
    }
    
    /**
     * Test specifico per Ghostery
     */
    async testGhostery() {
        return new Promise(resolve => {
            // Ghostery ha signature specifiche
            const hasGhostery = window.ghostery !== undefined ||
                              document.querySelector('script[src*="ghostery"]') !== null ||
                              navigator.userAgent.includes('Ghostery');
            
            if (hasGhostery) {
                resolve(true);
                return;
            }
            
            // Test element blocking tipico di Ghostery
            const testDiv = document.createElement('div');
            testDiv.className = 'social-widget fb-like';
            document.body.appendChild(testDiv);
            
            setTimeout(() => {
                const isBlocked = window.getComputedStyle(testDiv).display === 'none';
                document.body.removeChild(testDiv);
                resolve(isBlocked);
            }, 100);
        });
    }
    
    /**
     * Test specifico per AdBlock (non Plus)
     */
    async testAdBlock() {
        return new Promise(resolve => {
            // Test per AdBlock standard
            const testImg = document.createElement('img');
            testImg.src = 'https://static.adsystem.com/ads.png';
            testImg.style.cssText = 'position:absolute;left:-999px;width:1px;height:1px;';
            
            testImg.onerror = () => {
                const isAdBlock = !window.adsbygoogle && 
                                typeof window.external === 'undefined';
                resolve(isAdBlock);
            };
            
            testImg.onload = () => resolve(false);
            document.body.appendChild(testImg);
            
            setTimeout(() => {
                if (testImg.parentNode) {
                    testImg.remove();
                }
                resolve(false);
            }, 1000);
        });
    }
    
    /**
     * Test specifico per Brave Browser
     */
    async testBraveBrowser() {
        return new Promise(resolve => {
            // Brave ha signature specifiche
            const isBrave = navigator.brave !== undefined ||
                          navigator.userAgent.includes('Brave') ||
                          window.chrome && window.chrome.loadTimes === undefined;
            
            if (isBrave) {
                // Testa se il blocco ads di Brave è attivo
                const testDiv = document.createElement('div');
                testDiv.className = 'advertisement';
                testDiv.style.cssText = 'height: 1px;';
                document.body.appendChild(testDiv);
                
                setTimeout(() => {
                    const isBlocked = testDiv.offsetHeight === 0;
                    document.body.removeChild(testDiv);
                    resolve(isBlocked);
                }, 100);
            } else {
                resolve(false);
            }
        });
    }
    
    /**
     * Test 1: Elementi esca (bait elements)
     */
    testBaitElements() {
        return new Promise(resolve => {
            // Test multipli elementi esca per maggiore accuratezza
            const testElements = [
                { class: 'adsbox', id: 'ads-test-1' },
                { class: 'advertisement', id: 'ads-test-2' },
                { class: 'ad-banner', id: 'ads-test-3' }
            ];
            
            let blockedCount = 0;
            let completedTests = 0;
            
            testElements.forEach((elementConfig, index) => {
                const baitDiv = document.createElement('div');
                baitDiv.innerHTML = '&nbsp;';
                baitDiv.className = elementConfig.class;
                baitDiv.id = elementConfig.id;
                baitDiv.style.cssText = `
                    position: absolute !important;
                    left: -10000px !important;
                    top: -1000px !important;
                    width: 10px !important;
                    height: 10px !important;
                    background: transparent !important;
                `;
                
                document.body.appendChild(baitDiv);
                
                setTimeout(() => {
                    const isBlocked = baitDiv.offsetHeight <= 1 || 
                                    baitDiv.offsetWidth <= 1 ||
                                    window.getComputedStyle(baitDiv).display === 'none' ||
                                    window.getComputedStyle(baitDiv).visibility === 'hidden';
                    
                    if (isBlocked) blockedCount++;
                    completedTests++;
                    
                    document.body.removeChild(baitDiv);
                    
                    // Risolvi quando tutti i test sono completati
                    if (completedTests === testElements.length) {
                        // Considera bloccato solo se TUTTI gli elementi sono bloccati
                        resolve(blockedCount === testElements.length);
                    }
                }, 150 + (index * 50)); // Staggered timing
            });
        });
    }
    
    /**
     * Test 2: Google Ads script
     */
    testGoogleAds() {
        return new Promise(resolve => {
            if (typeof window.adsbygoogle !== 'undefined') {
                resolve(false); // Ads script caricato
                return;
            }
            
            const script = document.createElement('script');
            script.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
            script.async = true;
            script.onerror = () => resolve(true); // Script bloccato
            script.onload = () => resolve(false); // Script caricato
            
            document.head.appendChild(script);
            
            // Timeout di sicurezza ridotto per performance
            setTimeout(() => {
                if (typeof window.adsbygoogle === 'undefined') {
                    resolve(true);
                }
            }, 1000);
        });
    }
    
    /**
     * Test 3: Script pubblicitari comuni
     */
    testCommonAdScripts() {
        return new Promise(resolve => {
            const adDomains = [
                'doubleclick.net',
                'googleadservices.com',
                'googlesyndication.com'
            ];
            
            let blockedCount = 0;
            let totalTests = adDomains.length;
            let completed = 0;
            
            adDomains.forEach(domain => {
                const img = new Image();
                img.onload = () => {
                    completed++;
                    if (completed === totalTests) {
                        resolve(blockedCount >= totalTests / 2);
                    }
                };
                img.onerror = () => {
                    blockedCount++;
                    completed++;
                    if (completed === totalTests) {
                        resolve(blockedCount >= totalTests / 2);
                    }
                };
                img.src = `https://${domain}/favicon.ico?_=${Date.now()}`;
            });
            
            // Timeout ottimizzato
            setTimeout(() => resolve(completed === 0), 1500);
        });
    }
    
    /**
     * Test 4: Blocco immagini pubblicitarie
     */
    testAdImageBlocking() {
        return new Promise(resolve => {
            // Test con URLs pubblicitari reali che gli AdBlocker bloccano comunemente
            const testUrls = [
                'https://googleads.g.doubleclick.net/favicon.ico',
                'https://static.adsystem.com/ads.png'
            ];
            
            let blockedCount = 0;
            let completedCount = 0;
            
            testUrls.forEach(url => {
                const img = new Image();
                img.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;';
                
                const timeout = setTimeout(() => {
                    blockedCount++; // Timeout = presumibilmente bloccato
                    completedCount++;
                    if (completedCount === testUrls.length) {
                        // Entrambi devono essere bloccati per considerare adblock attivo
                        resolve(blockedCount === testUrls.length);
                    }
                }, 3000);
                
                img.onload = () => {
                    clearTimeout(timeout);
                    completedCount++;
                    if (completedCount === testUrls.length) {
                        resolve(blockedCount === testUrls.length);
                    }
                };
                
                img.onerror = () => {
                    clearTimeout(timeout);
                    blockedCount++;
                    completedCount++;
                    if (completedCount === testUrls.length) {
                        resolve(blockedCount === testUrls.length);
                    }
                };
                
                img.src = url;
            });
        });
    }
    
    /**
     * Test 5: Blocco iframe pubblicitari
     */
    testAdFrameBlocking() {
        return new Promise(resolve => {
            const iframe = document.createElement('iframe');
            iframe.src = 'about:blank';
            iframe.className = 'ad-frame';
            iframe.style.cssText = 'position:absolute;left:-1000px;top:-1000px;width:1px;height:1px;';
            
            document.body.appendChild(iframe);
            
            setTimeout(() => {
                const isBlocked = window.getComputedStyle(iframe).display === 'none' ||
                                 iframe.offsetHeight === 0 ||
                                 iframe.offsetWidth === 0;
                
                document.body.removeChild(iframe);
                resolve(isBlocked);
            }, 100);
        });
    }
    
    /**
     * Gestisce il risultato del rilevamento
     */
    handleDetection(detected) {
        this.isAdBlockActive = detected;
        
        if (detected) {

            if (this.config.showPopup && !this.hasShownPopup) {
                // Mostra notifica immediata prima del popup principale
                this.showQuickNotification();
                
                // Mostra popup principale dopo breve ritardo
                setTimeout(() => {
                    this.showAdBlockPopup();
                }, 200);
                
                // Ritarda il blocco del contenuto per assicurarsi che il popup sia visibile
                if (this.config.blockContent) {
                    setTimeout(() => {
                        // Verifica che l'adblock sia ancora attivo e il popup sia stato mostrato
                        if (this.isAdBlockActive && this.hasShownPopup) {
                            this.hideContent();
                        }
                    }, 2000); // Aumentato a 2 secondi per dare più tempo
                }
            } else if (this.config.blockContent) {
                // Se il popup non deve essere mostrato, blocca subito
                this.hideContent();
            }
        } else {

            this.showContent();
            this.hideAdBlockPopup();
        }
    }
    
    /**
     * Nasconde il contenuto principale
     */
    hideContent() {
        this.config.contentSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.style.display = 'none';
                el.setAttribute('data-hidden-by-adblock', 'true');
            });
        });
        
        // Modalità blocco totale: nasconde tutto il body tranne il popup
        if (this.config.totalBlock) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            
            // Nasconde tutti gli elementi principali
            const allElements = document.querySelectorAll('body > *:not(#adblock-detector-popup):not(script):not(style)');
            allElements.forEach(el => {
                if (!el.id || el.id !== 'adblock-detector-popup') {
                    el.style.display = 'none';
                    el.setAttribute('data-total-block-hidden', 'true');
                }
            });
        }
    }
    
    /**
     * Mostra il contenuto principale
     */
    showContent() {
        const hiddenElements = document.querySelectorAll('[data-hidden-by-adblock="true"]');
        hiddenElements.forEach(el => {
            el.style.display = '';
            el.removeAttribute('data-hidden-by-adblock');
        });
        
        // Ripristina modalità blocco totale
        if (this.config.totalBlock) {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            
            // Ripristina tutti gli elementi nascosti dal blocco totale
            const totalBlockElements = document.querySelectorAll('[data-total-block-hidden="true"]');
            totalBlockElements.forEach(el => {
                el.style.display = '';
                el.removeAttribute('data-total-block-hidden');
            });
        }
    }
    
    /**
     * Mostra il popup AdBlock
     */
    showAdBlockPopup() {
        // Rimuovi popup esistente
        this.hideAdBlockPopup();
        
        const popup = this.createPopupHTML();
        document.body.appendChild(popup);
        
        this.hasShownPopup = true;
        
        // Aggiungi event listeners
        this.attachPopupEvents(popup);
        
        // Animazione di entrata
        setTimeout(() => popup.classList.add('adblock-popup-show'), 10);
    }
    
    /**
     * Mostra una notifica rapida prima del popup principale
     */
    showQuickNotification() {
        // Rimuovi notifica esistente se presente
        const existingNotification = document.getElementById('adblock-quick-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.id = 'adblock-quick-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #E10600, #FF1E1E);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(225, 6, 0, 0.3);
                z-index: 999999;
                font-family: Arial, sans-serif;
                font-size: 14px;
                font-weight: bold;
                max-width: 300px;
                animation: slideInFromRight 0.3s ease-out;
                border: 2px solid #FFD700;
            ">
                🚫 AdBlock Rilevato - Preparazione popup...
                <div style="
                    font-size: 12px;
                    font-weight: normal;
                    margin-top: 5px;
                    opacity: 0.9;
                ">
                    Il sito verrà bloccato tra pochi secondi
                </div>
            </div>
            <style>
                @keyframes slideInFromRight {
                    0% {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            </style>
        `;
        
        document.body.appendChild(notification);
        
        // Rimuovi la notifica dopo 3 secondi
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.style.animation = 'slideInFromRight 0.3s ease-out reverse';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 3000);
    }
    
    /**
     * Ottieni guida specifica per il tipo di adblock rilevato
     */
    getSpecificGuide() {
        const adblockType = this.detectedAdBlockType || 'generic';
        
        const guides = {
            'ublock-origin': {
                html: `
                    <div class="adblock-specific-guide ublock-guide">
                        <div class="guide-header">
                            <img src="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#d73027"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>')}" style="width:24px;height:24px;vertical-align:middle;margin-right:8px;">
                            <strong>🛡️ uBlock Origin Rilevato</strong>
                        </div>
                        <div class="step-by-step-guide">
                            <h4>🎯 Guida Specifica per uBlock Origin:</h4>
                            <div class="guide-steps">
                                <div class="guide-step">
                                    <span class="step-number">1</span>
                                    <div class="step-content">
                                        <strong>Trova l'icona uBlock Origin</strong>
                                        <p>Cerca l'icona rossa a forma di scudo nella barra degli strumenti del browser (in alto a destra)</p>
                                        <div class="step-visual">🔍 Icona: <span style="color:#d73027;">🛡️</span></div>
                                    </div>
                                </div>
                                <div class="guide-step">
                                    <span class="step-number">2</span>
                                    <div class="step-content">
                                        <strong>Clicca sull'icona</strong>
                                        <p>Si aprirà il pannello di controllo di uBlock Origin</p>
                                    </div>
                                </div>
                                <div class="guide-step">
                                    <span class="step-number">3</span>
                                    <div class="step-content">
                                        <strong>Clicca il pulsante blu di accensione</strong>
                                        <p>Il grande pulsante blu 🔵 disabiliterà uBlock per questo sito</p>
                                        <div class="step-tip">💡 Diventerà grigio quando disabilitato</div>
                                    </div>
                                </div>
                                <div class="guide-step">
                                    <span class="step-number">4</span>
                                    <div class="step-content">
                                        <strong>La pagina si ricaricherà automaticamente</strong>
                                        <p>uBlock Origin ricaricherà la pagina per applicare le modifiche</p>
                                    </div>
                                </div>
                            </div>
                            <div class="guide-help">
                                <strong>📺 Video Tutorial:</strong> 
                                <a href="https://www.youtube.com/watch?v=2lisQQmWQkY" target="_blank" style="color:#E10600;">
                                    Come disabilitare uBlock Origin
                                </a>
                            </div>
                        </div>
                    </div>
                `,
                hideGeneric: true
            },
            
            'adblock-plus': {
                html: `
                    <div class="adblock-specific-guide abp-guide">
                        <div class="guide-header">
                            <img src="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#c70d2c"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9.5 12C17.16 27.74 21 22.55 21 17V7l-9-5z"/></svg>')}" style="width:24px;height:24px;vertical-align:middle;margin-right:8px;">
                            <strong>🚫 AdBlock Plus Rilevato</strong>
                        </div>
                        <div class="step-by-step-guide">
                            <h4>🎯 Seleziona il tuo dispositivo:</h4>
                            
                            <div class="device-tabs">
                                <button class="device-tab active" data-device="desktop">🖥️ Desktop (Chrome/Edge/Opera/Firefox)</button>
                                <button class="device-tab" data-device="safari-mac">🍎 Safari Mac</button>
                                <button class="device-tab" data-device="safari-ios">📱 Safari iPhone/iPad</button>
                                <button class="device-tab" data-device="samsung">📱 Samsung Internet</button>
                            </div>
                            
                            <div class="device-guide active" data-device="desktop">
                                <div class="guide-steps">
                                    <div class="guide-step">
                                        <span class="step-number">1</span>
                                        <div class="step-content">
                                            <strong>Trova l'icona AdBlock Plus</strong>
                                            <p>Cerca il simbolo rosso "ABP" nella barra degli strumenti del browser</p>
                                            <div class="step-visual">🔍 Icona: <span style="color:#c70d2c;font-weight:bold;">ABP</span></div>
                                        </div>
                                    </div>
                                    <div class="guide-step">
                                        <span class="step-number">2</span>
                                        <div class="step-content">
                                            <strong>Clicca sull'icona ABP</strong>
                                            <p>Nel menu popup che appare, clicca sull'icona dell'ingranaggio ⚙️</p>
                                        </div>
                                    </div>
                                    <div class="guide-step">
                                        <span class="step-number">3</span>
                                        <div class="step-content">
                                            <strong>Vai alla scheda "Allowlisted websites"</strong>
                                            <p>Nella pagina delle impostazioni, clicca sulla scheda "Allowlisted websites"</p>
                                        </div>
                                    </div>
                                    <div class="guide-step">
                                        <span class="step-number">4</span>
                                        <div class="step-content">
                                            <strong>Aggiungi il nostro sito</strong>
                                            <p>Inserisci "associazionesbarbara.it" e clicca "Add website"</p>
                                            <div class="step-tip">💡 Smart allowlisting: il sito resta attivo per 7 giorni e si rinnova automaticamente</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="device-guide" data-device="safari-mac">
                                <div class="guide-steps">
                                    <div class="guide-step">
                                        <span class="step-number">1</span>
                                        <div class="step-content">
                                            <strong>Clicca l'icona AdBlock Plus in Safari</strong>
                                            <p>Nella barra degli strumenti di Safari, clicca l'icona ABP</p>
                                        </div>
                                    </div>
                                    <div class="guide-step">
                                        <span class="step-number">2</span>
                                        <div class="step-content">
                                            <strong>Apri AdBlock Plus</strong>
                                            <p>Clicca "Open Adblock Plus" dal menu</p>
                                        </div>
                                    </div>
                                    <div class="guide-step">
                                        <span class="step-number">3</span>
                                        <div class="step-content">
                                            <strong>Vai alla scheda Allowlist</strong>
                                            <p>Nella finestra Impostazioni, clicca la scheda "Allowlist"</p>
                                        </div>
                                    </div>
                                    <div class="guide-step">
                                        <span class="step-number">4</span>
                                        <div class="step-content">
                                            <strong>Aggiungi il sito</strong>
                                            <p>Inserisci "associazionesbarbara.it" e clicca "Add Website"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="device-guide" data-device="safari-ios">
                                <div class="guide-steps">
                                    <div class="guide-step">
                                        <span class="step-number">1</span>
                                        <div class="step-content">
                                            <strong>Apri l'app AdBlock Plus</strong>
                                            <p>Sul tuo iPhone/iPad, apri l'app AdBlock Plus</p>
                                            <div class="step-visual">📱 Cerca l'app ABP nella home screen</div>
                                        </div>
                                    </div>
                                    <div class="guide-step">
                                        <span class="step-number">2</span>
                                        <div class="step-content">
                                            <strong>Tocca "Exceptions"</strong>
                                            <p>Nel menu principale dell'app</p>
                                        </div>
                                    </div>
                                    <div class="guide-step">
                                        <span class="step-number">3</span>
                                        <div class="step-content">
                                            <strong>Tocca "Allowlist"</strong>
                                            <p>Poi tocca il pulsante "ADD"</p>
                                        </div>
                                    </div>
                                    <div class="guide-step">
                                        <span class="step-number">4</span>
                                        <div class="step-content">
                                            <strong>Aggiungi il sito</strong>
                                            <p>Inserisci "associazionesbarbara.it" e tocca "Add"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="device-guide" data-device="samsung">
                                <div class="guide-steps">
                                    <div class="guide-step">
                                        <span class="step-number">1</span>
                                        <div class="step-content">
                                            <strong>Apri ABP per Samsung Internet</strong>
                                            <p>Apri l'app "ABP for Samsung Internet" sul tuo dispositivo Android</p>
                                        </div>
                                    </div>
                                    <div class="guide-step">
                                        <span class="step-number">2</span>
                                        <div class="step-content">
                                            <strong>Tocca "Add websites to the allowlist"</strong>
                                            <p>Seleziona questa opzione dal menu principale</p>
                                        </div>
                                    </div>
                                    <div class="guide-step">
                                        <span class="step-number">3</span>
                                        <div class="step-content">
                                            <strong>Tocca il simbolo più (+)</strong>
                                            <p>Il pulsante + si trova nell'angolo in basso a destra</p>
                                        </div>
                                    </div>
                                    <div class="guide-step">
                                        <span class="step-number">4</span>
                                        <div class="step-content">
                                            <strong>Inserisci l'URL</strong>
                                            <p>Scrivi "associazionesbarbara.it" e tocca "OK"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div class="guide-help">
                                <strong>📖 Guida Ufficiale AdBlock Plus:</strong> 
                                <a href="https://help.adblockplus.org/hc/en-us/articles/1500002589982-Add-a-website-to-the-allowlist" target="_blank" style="color:#FFD700;">
                                    Add a website to the allowlist
                                </a>
                            </div>
                        </div>
                    </div>
                `,
                hideGeneric: true
            },
            
            'adguard': {
                html: `
                    <div class="adblock-specific-guide adguard-guide">
                        <div class="guide-header">
                            <img src="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#67b279"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>')}" style="width:24px;height:24px;vertical-align:middle;margin-right:8px;">
                            <strong>🛡️ AdGuard Rilevato</strong>
                        </div>
                        <div class="step-by-step-guide">
                            <h4>🎯 Guida Specifica per AdGuard:</h4>
                            <div class="guide-steps">
                                <div class="guide-step">
                                    <span class="step-number">1</span>
                                    <div class="step-content">
                                        <strong>Trova l'icona AdGuard</strong>
                                        <p>Cerca l'icona verde a forma di scudo nella barra del browser</p>
                                        <div class="step-visual">🔍 Icona: <span style="color:#67b279;">🛡️</span></div>
                                    </div>
                                </div>
                                <div class="guide-step">
                                    <span class="step-number">2</span>
                                    <div class="step-content">
                                        <strong>Clicca sull'icona AdGuard</strong>
                                        <p>Si aprirà il pannello di controllo</p>
                                    </div>
                                </div>
                                <div class="guide-step">
                                    <span class="step-number">3</span>
                                    <div class="step-content">
                                        <strong>Clicca "Disabilita protezione per questo sito"</strong>
                                        <p>Oppure usa il toggle per disattivare AdGuard temporaneamente</p>
                                        <div class="step-tip">💡 Puoi anche aggiungere il sito alla whitelist</div>
                                    </div>
                                </div>
                            </div>
                            <div class="guide-help">
                                <strong>📖 Guida Ufficiale:</strong> 
                                <a href="https://adguard.com/it/support/browser-extension.html" target="_blank" style="color:#E10600;">
                                    Documentazione AdGuard
                                </a>
                            </div>
                        </div>
                    </div>
                `,
                hideGeneric: true
            },
            
            'ghostery': {
                html: `
                    <div class="adblock-specific-guide ghostery-guide">
                        <div class="guide-header">
                            <img src="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00aef0"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>')}" style="width:24px;height:24px;vertical-align:middle;margin-right:8px;">
                            <strong>👻 Ghostery Rilevato</strong>
                        </div>
                        <div class="step-by-step-guide">
                            <h4>🎯 Guida Specifica per Ghostery:</h4>
                            <div class="guide-steps">
                                <div class="guide-step">
                                    <span class="step-number">1</span>
                                    <div class="step-content">
                                        <strong>Trova l'icona Ghostery</strong>
                                        <p>Cerca l'icona blu del fantasmino nella barra del browser</p>
                                        <div class="step-visual">🔍 Icona: <span style="color:#00aef0;">👻</span></div>
                                    </div>
                                </div>
                                <div class="guide-step">
                                    <span class="step-number">2</span>
                                    <div class="step-content">
                                        <strong>Clicca sull'icona Ghostery</strong>
                                        <p>Si aprirà il pannello di controllo</p>
                                    </div>
                                </div>
                                <div class="guide-step">
                                    <span class="step-number">3</span>
                                    <div class="step-content">
                                        <strong>Clicca l'interruttore "Pausa Ghostery"</strong>
                                        <p>Oppure aggiungi il sito alla lista dei siti attendibili</p>
                                        <div class="step-tip">💡 Puoi scegliere di mettere in pausa solo per questo sito</div>
                                    </div>
                                </div>
                            </div>
                            <div class="guide-help">
                                <strong>📋 Centro Assistenza:</strong> 
                                <a href="https://www.ghostery.com/support/" target="_blank" style="color:#E10600;">
                                    Supporto Ghostery
                                </a>
                            </div>
                        </div>
                    </div>
                `,
                hideGeneric: true
            },
            
            'brave': {
                html: `
                    <div class="adblock-specific-guide brave-guide">
                        <div class="guide-header">
                            <img src="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fb542b"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>')}" style="width:24px;height:24px;vertical-align:middle;margin-right:8px;">
                            <strong>🦁 Brave Browser Rilevato</strong>
                        </div>
                        <div class="step-by-step-guide">
                            <h4>🎯 Guida Specifica per Brave Browser:</h4>
                            <div class="guide-steps">
                                <div class="guide-step">
                                    <span class="step-number">1</span>
                                    <div class="step-content">
                                        <strong>Clicca sull'icona Brave Shields</strong>
                                        <p>L'icona del leone arancione nella barra degli indirizzi</p>
                                        <div class="step-visual">🔍 Icona: <span style="color:#fb542b;">🦁</span> (nella barra indirizzi)</div>
                                    </div>
                                </div>
                                <div class="guide-step">
                                    <span class="step-number">2</span>
                                    <div class="step-content">
                                        <strong>Disattiva "Blocca annunci e tracciamento"</strong>
                                        <p>Clicca l'interruttore per disabilitare il blocco annunci</p>
                                        <div class="step-tip">💡 Oppure imposta su "Consenti annunci e tracciamento"</div>
                                    </div>
                                </div>
                                <div class="guide-step">
                                    <span class="step-number">3</span>
                                    <div class="step-content">
                                        <strong>La pagina si ricaricherà automaticamente</strong>
                                        <p>Brave applicherà le nuove impostazioni ricaricando la pagina</p>
                                    </div>
                                </div>
                            </div>
                            <div class="guide-help">
                                <strong>📺 Video Tutorial:</strong> 
                                <a href="https://www.youtube.com/watch?v=brave-shields-tutorial" target="_blank" style="color:#FFD700;">
                                    Come disabilitare Brave Shields
                                </a>
                            </div>
                        </div>
                    </div>
                `,
                hideGeneric: true
            },
            
            'adblock': {
                html: `
                    <div class="adblock-specific-guide adblock-guide">
                        <div class="guide-header">
                            <img src="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc143c"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>')}" style="width:24px;height:24px;vertical-align:middle;margin-right:8px;">
                            <strong>🚫 AdBlock Rilevato</strong>
                        </div>
                        <div class="step-by-step-guide">
                            <h4>🎯 Guida Specifica per AdBlock:</h4>
                            <div class="guide-steps">
                                <div class="guide-step">
                                    <span class="step-number">1</span>
                                    <div class="step-content">
                                        <strong>Trova l'icona AdBlock</strong>
                                        <p>Cerca l'icona rossa con il segnale di stop nella barra del browser</p>
                                        <div class="step-visual">🔍 Icona: <span style="color:#dc143c;">🛑</span></div>
                                    </div>
                                </div>
                                <div class="guide-step">
                                    <span class="step-number">2</span>
                                    <div class="step-content">
                                        <strong>Clicca sull'icona AdBlock</strong>
                                        <p>Si aprirà il menu di AdBlock</p>
                                    </div>
                                </div>
                                <div class="guide-step">
                                    <span class="step-number">3</span>
                                    <div class="step-content">
                                        <strong>Seleziona "Non eseguire su pagine di questo dominio"</strong>
                                        <p>Oppure clicca "Sospendi AdBlock"</p>
                                        <div class="step-tip">💡 L'icona cambierà aspetto quando disabilitato</div>
                                    </div>
                                </div>
                            </div>
                            <div class="guide-help">
                                <strong>📺 Video Tutorial:</strong> 
                                <a href="https://www.youtube.com/watch?v=gfHvuHiNFUo" target="_blank" style="color:#FFD700;">
                                    Come disabilitare AdBlock
                                </a>
                            </div>
                        </div>
                    </div>
                `,
                hideGeneric: true
            }
        };
        
        return guides[adblockType] || {
            html: `
                <div class="adblock-specific-guide generic-guide">
                    <div class="guide-header">
                        <strong>🔍 AdBlock Generico Rilevato</strong>
                    </div>
                    <p>Non siamo riusciti a identificare il tipo specifico di AdBlock che stai usando, ma abbiamo comunque rilevato un blocco degli annunci attivo.</p>
                </div>
            `,
            hideGeneric: false
        };
    }
    
    /**
     * Nasconde il popup AdBlock
     */
    hideAdBlockPopup() {
        const existingPopup = document.getElementById('adblock-detector-popup');
        if (existingPopup) {
            existingPopup.remove();
        }
    }
    
    /**
     * Crea l'HTML del popup
     */
    createPopupHTML() {
        const popup = document.createElement('div');
        popup.id = 'adblock-detector-popup';
        
        // Ottieni guide specifiche per il tipo di adblock rilevato
        const specificGuide = this.getSpecificGuide();
        
        popup.innerHTML = `
            <div class="adblock-overlay">
                <div class="adblock-popup">
                    <div class="adblock-header">
                        <h2>${this.config.messages.title}</h2>
                        <span class="adblock-close">&times;</span>
                    </div>
                    <div class="adblock-content">
                        <h3>${this.config.messages.subtitle}</h3>
                        <p>${this.config.messages.description}</p>
                        
                        ${specificGuide.html}
                        
                        <div class="adblock-generic-instructions" style="${specificGuide.hideGeneric ? 'display:none;' : ''}">
                            <h4>📋 Istruzioni Generiche:</h4>
                            <ol>
                                ${this.config.messages.steps.map(step => `<li>${step}</li>`).join('')}
                            </ol>
                        </div>
                        
                        <div class="adblock-actions">
                            <button class="adblock-btn-primary" id="adblock-recheck">
                                ${this.config.messages.buttonText}
                            </button>
                            ${!this.config.preventClose ? `
                            <button class="adblock-btn-secondary" id="adblock-close">
                                ${this.config.messages.closeText}
                            </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Applica stili inline
        this.applyPopupStyles(popup);
        
        return popup;
    }
    
    /**
     * Applica gli stili CSS al popup
     */
    applyPopupStyles(popup) {
        const style = document.createElement('style');
        style.textContent = `
            #adblock-detector-popup {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 999999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            #adblock-detector-popup.adblock-popup-show {
                opacity: 1;
                visibility: visible;
            }
            
            .adblock-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: ${this.config.styles.overlayColor};
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                box-sizing: border-box;
            }
            
            .adblock-popup {
                background: ${this.config.styles.popupBackground};
                border-radius: 12px;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
                width: 90%;
                max-width: 900px;
                max-height: 85vh;
                overflow-y: auto;
                transform: scale(0.9);
                transition: transform 0.3s ease;
                display: flex;
                flex-direction: column;
            }
            
            #adblock-detector-popup.adblock-popup-show .adblock-popup {
                transform: scale(1);
            }
            
            .adblock-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 25px 30px 20px;
                border-bottom: 1px solid #eee;
                flex-shrink: 0;
                background: #f8f9fa;
                border-radius: 12px 12px 0 0;
            }
            
            .adblock-header h2 {
                margin: 0;
                color: #E10600;
                font-size: 24px;
                font-weight: 700;
            }
            
            .adblock-close {
                cursor: pointer;
                font-size: 28px;
                color: #999;
                line-height: 1;
                padding: 8px;
                border-radius: 50%;
                transition: all 0.2s ease;
                background: transparent;
            }
            
            .adblock-close:hover {
                background: #e9ecef;
                color: #E10600;
                transform: scale(1.1);
            }
            
            .adblock-content {
                padding: 30px;
                flex-grow: 1;
                overflow-y: auto;
            }
            
            .adblock-content h3 {
                margin: 0 0 15px 0;
                color: ${this.config.styles.textColor};
                font-size: 18px;
                font-weight: 500;
            }
            
            .adblock-content p {
                margin: 0 0 20px 0;
                color: ${this.config.styles.textColor};
                line-height: 1.6;
                font-size: 16px;
            }
            
            .adblock-instructions h4 {
                margin: 0 0 10px 0;
                color: ${this.config.styles.textColor};
                font-size: 16px;
                font-weight: 500;
            }
            
            .adblock-instructions ol {
                margin: 0 0 25px 0;
                padding-left: 20px;
                color: ${this.config.styles.textColor};
                line-height: 1.6;
            }
            
            .adblock-instructions li {
                margin-bottom: 8px;
                font-size: 14px;
            }
            
            .adblock-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                padding: 25px 30px;
                background: #f8f9fa;
                border-top: 1px solid #eee;
                flex-shrink: 0;
                border-radius: 0 0 12px 12px;
            }
            
            .adblock-btn-primary,
            .adblock-btn-secondary {
                padding: 14px 28px;
                border: none;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                min-width: 180px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            
            .adblock-btn-primary {
                background: ${this.config.styles.primaryColor};
                color: white;
            }
            
            .adblock-btn-primary:hover {
                background: ${this.darkenColor(this.config.styles.primaryColor, 10)};
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(225, 6, 0, 0.3);
            }
            
            .adblock-btn-secondary {
                background: #f5f5f5;
                color: ${this.config.styles.textColor};
                border: 1px solid #ddd;
            }
            
            .adblock-btn-secondary:hover {
                background: #e9e9e9;
                border-color: #ccc;
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            }
            
            @media (max-width: 768px) {
                .adblock-header {
                    padding: 20px 25px 15px;
                }
                
                .adblock-header h2 {
                    font-size: 24px;
                }
                
                .adblock-content {
                    padding: 25px;
                }
                
                .adblock-actions {
                    flex-direction: column;
                    padding: 20px 25px;
                    gap: 15px;
                }
                
                .adblock-btn-primary,
                .adblock-btn-secondary {
                    min-width: auto;
                    width: 100%;
                    font-size: 16px;
                    padding: 15px 24px;
                }
            }
            
            /* Stili per le guide specifiche */
            .adblock-specific-guide {
                margin: 20px 0;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #E10600;
            }
            
            .guide-header {
                font-size: 18px;
                margin-bottom: 15px;
                color: #2c3e50;
                display: flex;
                align-items: center;
            }
            
            .step-by-step-guide h4 {
                color: #E10600;
                margin: 15px 0 10px 0;
                font-size: 16px;
            }
            
            .guide-steps {
                margin: 15px 0;
            }
            
            .guide-step {
                display: flex;
                align-items: flex-start;
                margin: 20px 0;
                padding: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                border-left: 4px solid #E10600;
                transition: all 0.2s ease;
            }
            
            .guide-step:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.12);
            }
            
            .step-number {
                background: #E10600;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 16px;
                margin-right: 20px;
                flex-shrink: 0;
                box-shadow: 0 2px 6px rgba(225, 6, 0, 0.3);
            }
            
            .step-content {
                flex: 1;
            }
            
            .step-content strong {
                color: #2c3e50;
                display: block;
                margin-bottom: 8px;
                font-size: 16px;
                font-weight: 600;
            }
            
            .step-content p {
                margin: 0 0 10px 0;
                color: #666;
                line-height: 1.5;
                font-size: 14px;
            }
            
            .step-visual {
                background: #e3f2fd;
                padding: 10px 14px;
                border-radius: 6px;
                font-size: 13px;
                margin-top: 10px;
                border-left: 3px solid #2196f3;
                font-family: monospace;
                color: #1565c0;
            }
            
            .step-tip {
                background: #fff8e1;
                padding: 10px 14px;
                border-radius: 6px;
                font-size: 13px;
                margin-top: 10px;
                border-left: 3px solid #ffa726;
                color: #ef6c00;
                font-style: italic;
            }
            
            .guide-help {
                margin-top: 25px;
                padding: 18px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 8px;
                color: white;
                text-align: center;
                box-shadow: 0 3px 10px rgba(102, 126, 234, 0.3);
            }
            
            .guide-help a {
                color: #FFD700 !important;
                text-decoration: none;
                font-weight: bold;
            }
            
            .guide-help a:hover {
                text-decoration: underline;
            }
            
            /* Guide specifiche per colori */
            .ublock-guide .step-number { background: #d73027; }
            .abp-guide .step-number { background: #c70d2c; }
            .adguard-guide .step-number { background: #67b279; }
            .ghostery-guide .step-number { background: #00aef0; }
            .brave-guide .step-number { background: #fb542b; }
            .adblock-guide .step-number { background: #dc143c; }
            
            /* Stili per i tab dei dispositivi */
            .device-tabs {
                display: flex;
                gap: 8px;
                margin: 15px 0 20px 0;
                flex-wrap: wrap;
            }
            
            .device-tab {
                background: #f8f9fa;
                border: 2px solid #dee2e6;
                color: #6c757d;
                padding: 10px 15px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 13px;
                font-weight: 500;
                transition: all 0.2s ease;
                flex: 1;
                min-width: 120px;
                text-align: center;
            }
            
            .device-tab:hover {
                background: #e9ecef;
                border-color: #adb5bd;
                color: #495057;
            }
            
            .device-tab.active {
                background: #E10600;
                border-color: #E10600;
                color: white;
                font-weight: 600;
            }
            
            .device-guide {
                display: none;
            }
            
            .device-guide.active {
                display: block;
            }
            
            @media (max-width: 768px) {
                .device-tabs {
                    flex-direction: column;
                    gap: 6px;
                }
                
                .device-tab {
                    min-width: auto;
                    font-size: 12px;
                    padding: 8px 12px;
                }
            
            @media (max-width: 768px) {
                .adblock-popup {
                    width: 95%;
                    max-height: 90vh;
                }
                
                .guide-step {
                    padding: 15px;
                    margin: 15px 0;
                }
                
                .step-number {
                    width: 35px;
                    height: 35px;
                    font-size: 14px;
                    margin-right: 15px;
                }
                
                .step-content strong {
                    font-size: 15px;
                }
                
                .step-content p {
                    font-size: 13px;
                }
                
                .adblock-actions {
                    flex-direction: column;
                    gap: 12px;
                }
                
                .adblock-btn-primary,
                .adblock-btn-secondary {
                    width: 100%;
                    min-width: auto;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    /**
     * Aggiunge event listeners al popup
     */
    attachPopupEvents(popup) {
        // Pulsante chiudi (X) - solo se non in modalità preventClose
        const closeBtn = popup.querySelector('.adblock-close');
        if (closeBtn && !this.config.preventClose) {
            closeBtn.addEventListener('click', () => this.hideAdBlockPopup());
        } else if (closeBtn && this.config.preventClose) {
            closeBtn.style.display = 'none';
        }
        
        // Pulsante chiudi secondario - solo se non in modalità preventClose
        const closeSecondary = popup.querySelector('#adblock-close');
        if (closeSecondary && !this.config.preventClose) {
            closeSecondary.addEventListener('click', () => this.hideAdBlockPopup());
        }
        
        // Pulsante ricarica pagina
        const recheckBtn = popup.querySelector('#adblock-recheck');
        recheckBtn.addEventListener('click', () => {
            recheckBtn.textContent = 'Ricaricamento pagina...';
            recheckBtn.disabled = true;
            
            // Ricarica la pagina dopo breve pausa per mostrare il messaggio
            setTimeout(() => {
                window.location.reload();
            }, 500);
        });
        
        // Gestione tab dei dispositivi
        const deviceTabs = popup.querySelectorAll('.device-tab');
        const deviceGuides = popup.querySelectorAll('.device-guide');
        
        deviceTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetDevice = tab.getAttribute('data-device');
                
                // Rimuovi classe active da tutti i tab e guide
                deviceTabs.forEach(t => t.classList.remove('active'));
                deviceGuides.forEach(g => g.classList.remove('active'));
                
                // Aggiungi active al tab cliccato e alla guida corrispondente
                tab.classList.add('active');
                const targetGuide = popup.querySelector(`.device-guide[data-device="${targetDevice}"]`);
                if (targetGuide) {
                    targetGuide.classList.add('active');
                }
            });
        });
        
        // Chiudi cliccando sull'overlay - solo se non in modalità preventClose
        if (!this.config.preventClose) {
            const overlay = popup.querySelector('.adblock-overlay');
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.hideAdBlockPopup();
                }
            });
            
            // Chiudi con ESC - solo se non in modalità preventClose
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.hideAdBlockPopup();
                }
            });
        }
    }
    
    
    // Controlli periodici rimossi - non necessari per adblock detection
    
    /**
     * Scurisce un colore esadecimale
     */
    darkenColor(hex, percent) {
        const num = parseInt(hex.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
    
    /**
     * Metodi pubblici per controllo esterno
     */
    
    // Controlla manualmente
    checkNow() {
        return this.detectAdBlock();
    }
    
    // Ottieni stato attuale
    getStatus() {
        return {
            isAdBlockActive: this.isAdBlockActive,
            hasShownPopup: this.hasShownPopup,
            isCheckingPeriodically: !!this.recheckTimer
        };
    }
    
    // Forza mostra popup
    forceShowPopup() {
        this.hasShownPopup = false;
        this.showAdBlockPopup();
    }
    
    // Distruggi detector
    destroy() {
        this.hideAdBlockPopup();
        this.showContent();
    }
}

// Esporta per uso globale
window.AdBlockDetector = AdBlockDetector;

// Funzione di emergenza per disabilitare il detector
window.disableAdBlockDetector = function() {
    localStorage.setItem('disable-adblock-detector', 'true');
    console.log('🔧 AdBlock detector disabilitato. Ricarica la pagina.');
    alert('AdBlock detector disabilitato. La pagina verrà ricaricata.');
    window.location.reload();
};

// Funzione per riabilitare
window.enableAdBlockDetector = function() {
    localStorage.removeItem('disable-adblock-detector');
    console.log('🔧 AdBlock detector riabilitato. Ricarica la pagina.');
    alert('AdBlock detector riabilitato. La pagina verrà ricaricata.');
    window.location.reload();
};

// Auto-inizializzazione di default (può essere disabilitata)
window.addEventListener('load', () => {
    // Inizializza solo se non già fatto manualmente
    if (!window.adBlockDetectorInstance) {
        window.adBlockDetectorInstance = new AdBlockDetector();
    }
});