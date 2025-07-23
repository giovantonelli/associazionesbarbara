/**
 * Integrazione AdBlock Detector - Modalità Obbligatoria
 * Per Associazione Santa Barbara APS
 * 
 * Configurazione stringente che blocca completamente l'accesso al sito
 * se AdBlock è attivo. Nessuna possibilità di bypass.
 */

// Configurazione globale per tutte le pagine
window.ADBLOCK_STRICT_CONFIG = {
    // Comportamento obbligatorio
    totalBlock: true,           // Blocca tutto il sito
    preventClose: true,         // Non permette chiusura popup
    blockContent: true,         // Nasconde contenuto
    showPopup: true,           // Mostra sempre popup
    recheckInterval: 2000,     // Controllo ogni 2 secondi
    
    // Messaggi personalizzati Associazione Santa Barbara
    title: 'AdBlock Deve Essere Disattivato ⚠️',
    subtitle: 'Accesso Richiesto per Associazione Santa Barbara',
    description: `
        <strong style="color: #E10600;">ATTENZIONE:</strong> Per accedere al sito dell'Associazione Santa Barbara APS è <strong>obbligatorio disattivare AdBlock</strong>.
        <br><br>
        La pubblicità ci permette di:
        <br>• 🎭 Finanziare il Corteo Storico di Santa Barbara
        <br>• 🤝 Sostenere i progetti sociali per la comunità  
        <br>• 📚 Mantenere attivo questo sito web gratuito
        <br>• 🏛️ Promuovere la cultura locale di Grumo Appula
        <br><br>
        <strong>Il sito rimarrà bloccato fino alla disattivazione di AdBlock.</strong>
    `,
    instructions: '🔧 Istruzioni Obbligatorie per Continuare:',
    steps: [
        '1. 🖱️ Clicca sull\'icona del tuo AdBlocker nella barra del browser',
        '2. ⚙️ Seleziona "Disabilita su associazionesbarbara.it" o "Pausa AdBlock"',
        '3. 🔄 Clicca il pulsante "Ho Disattivato AdBlock" qui sotto',
        '4. ✅ Il sito si sbloccherà automaticamente'
    ],
    buttonText: 'Ho Disattivato AdBlock - Sblocca Sito',
    
    // Stili Associazione Santa Barbara
    styles: {
        overlayColor: 'rgba(225, 6, 0, 0.95)',  // Rosso semi-opaco forte
        popupBackground: '#ffffff',
        primaryColor: '#E10600',
        textColor: '#333333'
    },
    
    // Blocca tutto tranne il popup
    contentSelectors: [
        'body > *:not(#adblock-detector-popup):not(script):not(style)'
    ]
};

// Configurazioni specifiche per pagina
window.ADBLOCK_PAGE_CONFIGS = {
    'index.html': {
        subtitle: 'Homepage Bloccata - Disattiva AdBlock',
        description: `
            <strong style="color: #E10600;">Homepage dell'Associazione Santa Barbara APS bloccata.</strong>
            <br><br>
            Per accedere alla homepage e scoprire la nostra storia, le attività culturali e i progetti sociali, 
            devi <strong>obbligatoriamente disattivare AdBlock</strong>.
            <br><br>
            La pubblicità ci sostiene dal 2008 nelle nostre iniziative per Grumo Appula.
        `
    },
    
    'chi-siamo.html': {
        subtitle: 'Chi Siamo - Accesso Bloccato',
        description: `
            <strong style="color: #E10600;">Sezione "Chi Siamo" bloccata da AdBlock.</strong>
            <br><br>
            Per conoscere la storia dell'Associazione Santa Barbara APS, la nostra missione 
            e il team che lavora per la comunità, disattiva AdBlock.
        `
    },
    
    'attivita.html': {
        subtitle: 'Attività Culturali - Accesso Negato', 
        description: `
            <strong style="color: #E10600;">Le nostre attività culturali sono bloccate.</strong>
            <br><br>
            Il Corteo Storico di Santa Barbara, i Tamburi e tutti i progetti sociali 
            sono finanziati anche attraverso la pubblicità. Disattiva AdBlock per continuare.
        `
    },
    
    'eventi.html': {
        subtitle: 'Eventi - Calendario Bloccato',
        description: `
            <strong style="color: #E10600;">Calendario eventi non accessibile.</strong>
            <br><br>
            Per scoprire i prossimi eventi, le date importanti e partecipare alle 
            nostre iniziative culturali, devi disattivare AdBlock.
        `
    },
    
    'galleria.html': {
        subtitle: 'Galleria Foto/Video - Accesso Negato',
        description: `
            <strong style="color: #E10600;">Galleria multimediale bloccata.</strong>
            <br><br>
            Le foto storiche, i video del Corteo di Santa Barbara e tutti i ricordi 
            delle nostre attività non sono accessibili con AdBlock attivo.
        `
    },
    
    'contatti.html': {
        subtitle: 'Contatti - Informazioni Bloccate',
        description: `
            <strong style="color: #E10600;">Informazioni di contatto non disponibili.</strong>
            <br><br>
            Per contattare l'Associazione Santa Barbara APS, vedere gli orari 
            e utilizzare il modulo contatti, disattiva AdBlock.
        `
    },
    
    'faq.html': {
        subtitle: 'FAQ - Risposte Bloccate',
        description: `
            <strong style="color: #E10600;">Domande frequenti non accessibili.</strong>
            <br><br>
            Le risposte alle domande più comuni sull'associazione e le sue attività 
            richiedono la disattivazione di AdBlock.
        `
    },
    
    'partner.html': {
        subtitle: 'Partner e Sponsor - Lista Bloccata',
        description: `
            <strong style="color: #E10600;">Partner e sponsor non visibili.</strong>
            <br><br>
            I nostri partner ci sostengono insieme alla pubblicità. 
            Disattiva AdBlock per vedere chi supporta le nostre iniziative.
        `
    },
    
    'area-soci.html': {
        subtitle: 'Area Soci - Accesso Riservato Bloccato',
        description: `
            <strong style="color: #E10600;">Area riservata ai soci non accessibile.</strong>
            <br><br>
            L'area soci è gratuita grazie alla pubblicità. Come socio dell'Associazione 
            Santa Barbara APS, il tuo supporto è importante: disattiva AdBlock.
        `,
        recheckInterval: 1500  // Controllo più frequente per area riservata
    },
    
    'login.html': {
        subtitle: 'Login - Accesso Bloccato',
        description: `
            <strong style="color: #E10600;">Sistema di accesso non disponibile.</strong>
            <br><br>
            Per accedere all'area riservata dei soci, devi prima disattivare AdBlock. 
            Il sistema di login è sostenuto dalla pubblicità.
        `
    },
    
    'register.html': {
        subtitle: 'Registrazione - Modulo Bloccato',
        description: `
            <strong style="color: #E10600;">Registrazione nuovi soci bloccata.</strong>
            <br><br>
            Per diventare socio dell'Associazione Santa Barbara APS e accedere 
            ai servizi riservati, disattiva AdBlock.
        `
    },
    
    'privacy.html': {
        subtitle: 'Privacy Policy - Documento Bloccato',
        description: `
            <strong style="color: #E10600;">Privacy Policy non consultabile.</strong>
            <br><br>
            Anche per leggere la nostra informativa sulla privacy è necessario 
            disattivare AdBlock. Rispettiamo la tua privacy e chiediamo il tuo supporto.
        `
    }
};

// Funzione di inizializzazione globale
window.initStrictAdBlockDetector = function() {
    // Determina configurazione basata sulla pagina
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageConfig = window.ADBLOCK_PAGE_CONFIGS[currentPage] || {};
    
    // Unisci configurazione globale con quella specifica della pagina
    const finalConfig = {
        ...window.ADBLOCK_STRICT_CONFIG,
        ...pageConfig
    };
    
    // Distruggi istanza esistente se presente
    if (window.adBlockDetectorInstance) {
        window.adBlockDetectorInstance.destroy();
    }
    
    // Crea nuova istanza con configurazione stringente
    window.adBlockDetectorInstance = new AdBlockDetector(finalConfig);
    
    // Log per debug (solo in development)
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
        console.log('🚫 AdBlock Detector Strict Mode attivato:', {
            page: currentPage,
            config: finalConfig
        });
    }
    
    // Forza controllo immediato più aggressivo
    setTimeout(() => {
        window.adBlockDetectorInstance.checkNow().then(detected => {
            if (detected) {
                console.warn('⚠️ AdBlock rilevato - Sito bloccato completamente');
            }
        });
    }, 500);
};

// Auto-inizializzazione quando il DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initStrictAdBlockDetector);
} else {
    window.initStrictAdBlockDetector();
}

// Protezione aggiuntiva: controlla se qualcuno tenta di disabilitare il detector
Object.defineProperty(window, 'adBlockDetectorInstance', {
    configurable: false,
    set: function(value) {
        if (value === null || value === undefined) {
            console.warn('⚠️ Tentativo di disabilitare AdBlock Detector bloccato');
            return;
        }
        this._adBlockDetectorInstance = value;
    },
    get: function() {
        return this._adBlockDetectorInstance;
    }
});

// Impedisce manipolazione della console in production
if (window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1')) {
    // Sovrascrivi console.log per impedire debug non autorizzato
    const originalConsole = { ...console };
    Object.keys(console).forEach(key => {
        if (typeof console[key] === 'function') {
            console[key] = function() {
                // Permetti solo warning di sistema
                if (key === 'warn' && arguments[0] && arguments[0].includes('AdBlock')) {
                    originalConsole[key].apply(console, arguments);
                }
            };
        }
    });
}