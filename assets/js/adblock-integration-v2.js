/**
 * AdBlock Integration v2.0 - Configurazione Avanzata
 * Per Associazione Santa Barbara APS
 * 
 * Configurazione completa del sistema di rilevamento AdBlock
 * secondo le specifiche richieste:
 * - Modalità strict con blocco totale
 * - Popup non chiudibile
 * - Nessun polling continuo
 * - Soglia di rilevamento configurabile
 */

// Configurazione globale per tutte le pagine
window.ADBLOCK_CONFIG_V2 = {
    // === COMPORTAMENTO SISTEMA ===
    totalBlock: true,           // Blocco completo del sito
    showPopup: true,            // Mostra popup modale
    preventClose: true,         // Popup non chiudibile
    debugMode: false,           // Debug logging (impostare true per sviluppo)
    
    // === SOGLIA RILEVAMENTO ===
    threshold: 3,               // Almeno 3 test su 4 devono essere positivi
    
    // === MESSAGGI PERSONALIZZATI ===
    title: 'AdBlock Deve Essere Disattivato ⚠️',
    subtitle: 'Accesso Richiesto per Associazione Santa Barbara APS',
    
    description: `
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
    `,
    
    instructions: '🔧 Istruzioni Obbligatorie per Continuare:',
    buttonText: '🔄 Ho Disattivato AdBlock - Sblocca Sito',
    
    // === STILI PERSONALIZZATI ===
    styles: {
        overlayColor: 'rgba(225, 6, 0, 0.95)',  // Rosso Associazione Santa Barbara
        popupBackground: '#ffffff',
        primaryColor: '#E10600',                 // Colore principale Associazione
        textColor: '#333333',
        maxWidth: '900px',                       // Larghezza massima popup
        maxHeight: '85vh'                        // Altezza massima popup
    },
    
    // === SELETTORI CONTENUTO DA PROTEGGERE ===
    contentSelectors: [
        'main',
        '.content', 
        '.container',
        'article',
        'section',
        'nav',
        'header',
        'footer',
        '.hero',
        '.gallery',
        '.events',
        '.about',
        '.contacts',
        'body > *:not(.adblock-popup-overlay):not(script):not(style)'
    ]
};

/**
 * Configurazioni specifiche per pagina
 * Permette di personalizzare messaggi per diverse sezioni del sito
 */
window.PAGE_CONFIGS = {
    // Pagina principale
    'index.html': {
        title: '🏠 AdBlock Blocca l\'Accesso alla Home',
        subtitle: 'Benvenuto in Associazione Santa Barbara - Disattiva AdBlock'
    },
    
    // Galleria - richiede protezione extra per contenuti multimediali
    'galleria.html': {
        title: '🎭 AdBlock Blocca la Galleria del Corteo',
        subtitle: 'Foto e Video del Corteo Storico - Disattiva AdBlock',
        description: `
            <strong style="color: #E10600;">La Galleria è Protetta!</strong>
            <br><br>
            Per visualizzare le <strong>foto e video del Corteo Storico di Santa Barbara</strong>, 
            devi disattivare AdBlock. I nostri contenuti multimediali sono protetti per:
            <br>• 📸 Preservare la qualità delle immagini storiche
            <br>• 🎬 Garantire la riproduzione video senza interruzioni  
            <br>• 💰 Finanziare la conservazione del patrimonio culturale
            <br><br>
            <strong>Disattiva AdBlock per accedere alla galleria completa.</strong>
        `
    },
    
    // Eventi
    'eventi.html': {
        title: '📅 AdBlock Blocca gli Eventi',
        subtitle: 'Calendario Eventi Associazione - Disattiva AdBlock'
    },
    
    // Area Soci
    'area-soci.html': {
        title: '👥 AdBlock Blocca l\'Area Soci',
        subtitle: 'Area Riservata Soci - Disattiva AdBlock',
        description: `
            <strong style="color: #E10600;">Area Soci Protetta!</strong>
            <br><br>
            L'<strong>Area Soci</strong> dell'Associazione Santa Barbara richiede 
            la disattivazione di AdBlock per accedere a:
            <br>• 📋 Documentazione riservata ai soci
            <br>• 📊 Verbali e comunicazioni ufficiali
            <br>• 🎟️ Prenotazioni eventi esclusivi
            <br>• 💳 Servizi dedicati ai membri
            <br><br>
            <strong>Disattiva AdBlock per accedere all'area riservata.</strong>
        `
    }
};

/**
 * Inizializzazione automatica del sistema
 * Si attiva al caricamento di ogni pagina
 */
function initStrictAdBlockDetector() {
    // Rileva pagina corrente
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Merge configurazione globale con quella specifica della pagina
    const pageConfig = PAGE_CONFIGS[currentPage] || {};
    const finalConfig = Object.assign({}, ADBLOCK_CONFIG_V2, pageConfig);
    
    // Debug info
    if (finalConfig.debugMode) {
        console.log('🔧 [AdBlock] Inizializzazione per pagina:', currentPage);
        console.log('⚙️ [AdBlock] Configurazione finale:', finalConfig);
    }
    
    // Creazione istanza detector
    window.adBlockDetector = new AdBlockDetectorV2(finalConfig);
    
    // Event listeners per debugging
    if (finalConfig.debugMode) {
        document.addEventListener('adblock-detected', (e) => {
            console.log('🚫 [AdBlock] Evento: AdBlock rilevato', e.detail);
        });
        
        document.addEventListener('adblock-not-detected', (e) => {
            console.log('✅ [AdBlock] Evento: AdBlock non rilevato', e.detail);
        });
    }
}

/**
 * Utility per test manuali (solo in modalità debug)
 */
window.testAdBlockDetection = function() {
    if (!ADBLOCK_CONFIG_V2.debugMode) {
        console.warn('🔧 Test disponibili solo in modalità debug');
        return;
    }
    
    console.log('🧪 [AdBlock] Avvio test manuale...');
    
    // Forza rilevamento per test
    const testConfig = Object.assign({}, ADBLOCK_CONFIG_V2, {
        debugMode: true,
        threshold: 1 // Soglia bassa per test
    });
    
    const testDetector = new AdBlockDetectorV2(testConfig);
    return testDetector;
};

/**
 * Utility per bypass temporaneo (solo per sviluppo)
 */
window.bypassAdBlockDetection = function(password) {
    if (password !== 'santabarbara2025' || !ADBLOCK_CONFIG_V2.debugMode) {
        console.warn('🔒 Bypass non autorizzato');
        return false;
    }
    
    console.log('🔓 [AdBlock] Bypass temporaneo attivato');
    
    // Rimuovi overlay se presente
    const overlay = document.querySelector('.adblock-popup-overlay');
    if (overlay) overlay.remove();
    
    // Ripristina contenuto
    ADBLOCK_CONFIG_V2.contentSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.display = '';
            el.style.visibility = '';
        });
    });
    
    return true;
};

/**
 * Auto-inizializzazione
 * Il sistema si avvia automaticamente al caricamento della pagina
 */
document.addEventListener('DOMContentLoaded', initStrictAdBlockDetector);

// Fallback per pagine già caricate
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initStrictAdBlockDetector();
}

/**
 * Esportazioni per uso modulare
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ADBLOCK_CONFIG_V2,
        PAGE_CONFIGS,
        initStrictAdBlockDetector,
        testAdBlockDetection,
        bypassAdBlockDetection
    };
}
