/**
 * AdBlock Detector per Associazione Santa Barbara
 * Sistema completo di rilevamento AdBlocker con popup e blocco contenuti
 * 
 * @author Associazione Santa Barbara APS
 * @version 1.0.0
 * @description Rileva AdBlocker attivi e mostra messaggio personalizzato
 */

class AdBlockDetector {
    constructor(options = {}) {
        // Configurazione predefinita
        this.config = {
            // Elementi di test per rilevamento
            testElements: [
                'ads',
                'advertisement', 
                'adsystem',
                'google_ads_frame',
                'doubleclick',
                'googlesyndication'
            ],
            
            // Messaggi personalizzabili
            messages: {
                title: options.title || 'AdBlock Rilevato 🚫',
                subtitle: options.subtitle || 'Supporta Associazione Santa Barbara',
                description: options.description || 'Per continuare a offrire contenuti gratuiti e supportare le nostre attività sociali, ti chiediamo di disabilitare il tuo AdBlocker su questo sito.',
                instructions: options.instructions || 'Come disabilitare AdBlock:',
                steps: options.steps || [
                    '1. Clicca sull\'icona del tuo AdBlocker nella barra del browser',
                    '2. Seleziona "Disabilita su questo sito" o "Pausa su questo sito"', 
                    '3. Ricarica la pagina per accedere ai contenuti'
                ],
                buttonText: options.buttonText || 'Ho disabilitato AdBlock',
                closeText: options.closeText || 'Chiudi'
            },
            
            // Stili personalizzabili
            styles: {
                overlayColor: options.overlayColor || 'rgba(0, 0, 0, 0.8)',
                popupBackground: options.popupBackground || '#ffffff',
                primaryColor: options.primaryColor || '#E10600',
                textColor: options.textColor || '#333333'
            },
            
            // Comportamento
            blockContent: options.blockContent !== false, // Default: true
            showPopup: options.showPopup !== false, // Default: true
            autoCheck: options.autoCheck !== false, // Default: true
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
        this.recheckTimer = null;
        
        // Auto-inizializzazione
        if (this.config.autoCheck) {
            this.init();
        }
    }
    
    /**
     * Inizializza il detector
     */
    init() {
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
            
            // Ricontrollo periodico
            if (this.config.recheckInterval > 0) {
                this.startPeriodicCheck();
            }
        });
    }
    
    /**
     * Rileva la presenza di AdBlock usando multiple tecniche
     * @returns {Promise<boolean>} True se AdBlock è attivo
     */
    async detectAdBlock() {
        const tests = [
            this.testBaitElements(),
            this.testGoogleAds(), 
            this.testCommonAdScripts(),
            this.testAdImageBlocking(),
            this.testAdFrameBlocking()
        ];
        
        try {
            const results = await Promise.all(tests);
            const positiveTests = results.filter(result => result).length;
            

            
            // Se almeno 2 test sono positivi, consideriamo AdBlock attivo
            return positiveTests >= 2;
        } catch (error) {
            console.warn('⚠️ Errore durante il rilevamento AdBlock:', error);
            return false;
        }
    }
    
    /**
     * Test 1: Elementi esca (bait elements)
     */
    testBaitElements() {
        return new Promise(resolve => {
            const baitDiv = document.createElement('div');
            baitDiv.innerHTML = '&nbsp;';
            baitDiv.className = 'adsbox';
            baitDiv.style.cssText = `
                position: absolute !important;
                left: -10000px !important;
                top: -1000px !important;
                width: 1px !important;
                height: 1px !important;
                background: transparent !important;
            `;
            
            document.body.appendChild(baitDiv);
            
            setTimeout(() => {
                const isBlocked = baitDiv.offsetHeight === 0 || 
                                 baitDiv.offsetWidth === 0 ||
                                 window.getComputedStyle(baitDiv).display === 'none';
                
                document.body.removeChild(baitDiv);
                resolve(isBlocked);
            }, 100);
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
            
            // Timeout di sicurezza
            setTimeout(() => {
                if (typeof window.adsbygoogle === 'undefined') {
                    resolve(true);
                }
            }, 2000);
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
            
            // Timeout
            setTimeout(() => resolve(completed === 0), 3000);
        });
    }
    
    /**
     * Test 4: Blocco immagini pubblicitarie
     */
    testAdImageBlocking() {
        return new Promise(resolve => {
            const img = document.createElement('img');
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            img.className = 'advertisement';
            img.style.cssText = 'position:absolute;left:-1000px;top:-1000px;width:1px;height:1px;';
            
            document.body.appendChild(img);
            
            setTimeout(() => {
                const isBlocked = window.getComputedStyle(img).display === 'none' ||
                                 img.offsetHeight === 0 ||
                                 img.offsetWidth === 0;
                
                document.body.removeChild(img);
                resolve(isBlocked);
            }, 100);
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
                this.showAdBlockPopup();
            }
            if (this.config.blockContent) {
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
                        
                        <div class="adblock-instructions">
                            <h4>${this.config.messages.instructions}</h4>
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
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                max-width: 500px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            
            #adblock-detector-popup.adblock-popup-show .adblock-popup {
                transform: scale(1);
            }
            
            .adblock-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 25px 15px;
                border-bottom: 1px solid #eee;
            }
            
            .adblock-header h2 {
                margin: 0;
                color: ${this.config.styles.primaryColor};
                font-size: 24px;
                font-weight: 600;
            }
            
            .adblock-close {
                cursor: pointer;
                font-size: 28px;
                color: #999;
                line-height: 1;
                transition: color 0.2s ease;
            }
            
            .adblock-close:hover {
                color: ${this.config.styles.primaryColor};
            }
            
            .adblock-content {
                padding: 25px;
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
                gap: 12px;
                flex-wrap: wrap;
            }
            
            .adblock-btn-primary,
            .adblock-btn-secondary {
                padding: 12px 24px;
                border: none;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                flex: 1;
                min-width: 140px;
            }
            
            .adblock-btn-primary {
                background: ${this.config.styles.primaryColor};
                color: white;
            }
            
            .adblock-btn-primary:hover {
                background: ${this.darkenColor(this.config.styles.primaryColor, 10)};
                transform: translateY(-1px);
            }
            
            .adblock-btn-secondary {
                background: #f5f5f5;
                color: ${this.config.styles.textColor};
                border: 1px solid #ddd;
            }
            
            .adblock-btn-secondary:hover {
                background: #e9e9e9;
                border-color: #ccc;
            }
            
            @media (max-width: 480px) {
                .adblock-overlay {
                    padding: 15px;
                }
                
                .adblock-popup {
                    max-height: 95vh;
                }
                
                .adblock-header {
                    padding: 15px 20px 10px;
                }
                
                .adblock-content {
                    padding: 20px;
                }
                
                .adblock-actions {
                    flex-direction: column;
                }
                
                .adblock-btn-primary,
                .adblock-btn-secondary {
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
        
        // Pulsante ricontrolla
        const recheckBtn = popup.querySelector('#adblock-recheck');
        recheckBtn.addEventListener('click', () => {
            recheckBtn.textContent = 'Controllo in corso...';
            recheckBtn.disabled = true;
            
            setTimeout(() => {
                this.detectAdBlock().then(detected => {
                    if (!detected) {
                        this.handleDetection(false);
                    } else {
                        recheckBtn.textContent = this.config.messages.buttonText;
                        recheckBtn.disabled = false;
                        // Mostra messaggio di errore temporaneo
                        this.showTempMessage('AdBlock ancora attivo. Riprova dopo aver disabilitato.');
                    }
                });
            }, 1000);
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
    
    /**
     * Mostra messaggio temporaneo
     */
    showTempMessage(message) {
        const tempMsg = document.createElement('div');
        tempMsg.textContent = message;
        tempMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 1000000;
            font-size: 14px;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(tempMsg);
        
        setTimeout(() => {
            tempMsg.remove();
        }, 3000);
    }
    
    /**
     * Avvia controllo periodico
     */
    startPeriodicCheck() {
        this.recheckTimer = setInterval(() => {
            this.detectAdBlock().then(detected => {
                if (detected !== this.isAdBlockActive) {
                    this.handleDetection(detected);
                }
            });
        }, this.config.recheckInterval);
    }
    
    /**
     * Ferma controllo periodico
     */
    stopPeriodicCheck() {
        if (this.recheckTimer) {
            clearInterval(this.recheckTimer);
            this.recheckTimer = null;
        }
    }
    
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
        this.stopPeriodicCheck();
        this.hideAdBlockPopup();
        this.showContent();
    }
}

// Esporta per uso globale
window.AdBlockDetector = AdBlockDetector;

// Auto-inizializzazione di default (può essere disabilitata)
window.addEventListener('load', () => {
    // Inizializza solo se non già fatto manualmente
    if (!window.adBlockDetectorInstance) {
        window.adBlockDetectorInstance = new AdBlockDetector();
    }
});