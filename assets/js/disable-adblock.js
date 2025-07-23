// EMERGENCY DISABLE SCRIPT - BLOCCA TUTTO IL SISTEMA ADBLOCK
console.log('🚨 EMERGENCY ADBLOCK DISABLE SCRIPT ATTIVO');

// Sovrascrivi la classe AdBlockDetector per impedire l'inizializzazione
window.AdBlockDetector = function() {
    console.log('🚫 AdBlockDetector costruttore bloccato - sistema disabilitato');
    return {
        init: function() { console.log('🚫 AdBlockDetector.init() bloccato'); },
        startDetection: function() { console.log('🚫 AdBlockDetector.startDetection() bloccato'); },
        detectAdBlock: function() { return Promise.resolve(false); },
        showAdBlockPopup: function() { console.log('🚫 Popup adblock bloccato'); },
        hideAdBlockPopup: function() { console.log('🚫 hideAdBlockPopup chiamato'); },
        destroy: function() { console.log('🚫 destroy chiamato'); }
    };
};

// Blocca l'inizializzazione strict
window.initStrictAdBlockDetector = function() {
    console.log('🚫 initStrictAdBlockDetector() bloccato - sistema disabilitato');
};

// Rimuovi istanze esistenti
if (window.adBlockDetectorInstance) {
    console.log('🚫 Rimozione istanza adBlockDetectorInstance esistente');
    try {
        window.adBlockDetectorInstance.destroy();
    } catch(e) {}
    window.adBlockDetectorInstance = null;
}

// Blocca popup esistenti
const existingPopup = document.getElementById('adblock-detector-popup');
if (existingPopup) {
    console.log('🚫 Rimozione popup adblock esistente');
    existingPopup.remove();
}

// Mostra tutto il contenuto nascosto
const hiddenElements = document.querySelectorAll('[data-hidden-by-adblock="true"]');
hiddenElements.forEach(el => {
    console.log('🔄 Ripristino elemento nascosto da adblock');
    el.style.display = '';
    el.removeAttribute('data-hidden-by-adblock');
});

// Ripristina body overflow
document.body.style.overflow = '';
document.documentElement.style.overflow = '';

console.log('✅ SISTEMA ADBLOCK COMPLETAMENTE DISABILITATO - EMERGENCY MODE');