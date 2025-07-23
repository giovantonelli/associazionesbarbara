// JavaScript per la demo AdBlock
window.addEventListener('load', () => {
    // Sovrascrivi l'istanza di default con configurazione personalizzata
    if (window.adBlockDetectorInstance) {
        window.adBlockDetectorInstance.destroy();
    }
    
    window.adBlockDetectorInstance = new AdBlockDetector({
        title: 'AdBlock Rilevato 🚫',
        subtitle: 'Supporta Associazione Santa Barbara APS',
        description: 'Per continuare a supportare le nostre attività sociali e culturali, ti chiediamo di disabilitare il tuo AdBlocker su questo sito. La pubblicità ci aiuta a mantenere il sito gratuito.',
        primaryColor: '#E10600',
        contentSelectors: ['.protected-content'],
        recheckInterval: 2000,
        autoCheck: true
    });
    
    setTimeout(updateStatus, 1000);
});

async function checkAdBlockNow() {
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '🔄 Controllo...';
    btn.disabled = true;
    
    try {
        const isBlocked = await window.adBlockDetectorInstance.checkNow();
        console.log('Risultato controllo manuale:', isBlocked);
        updateStatus();
        
        showTempNotification(
            isBlocked ? '🚫 AdBlock ATTIVO' : '✅ AdBlock NON RILEVATO',
            isBlocked ? '#ff4444' : '#4CAF50'
        );
    } catch (error) {
        console.error('Errore controllo:', error);
        showTempNotification('❌ Errore durante il controllo', '#ff4444');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

function forceShowPopup() {
    window.adBlockDetectorInstance.forceShowPopup();
    updateStatus();
}

function toggleContent() {
    const content = document.querySelector('.protected-content');
    if (content.style.display === 'none') {
        content.style.display = '';
        event.target.textContent = '👁️ Nascondi Contenuto';
    } else {
        content.style.display = 'none';
        event.target.textContent = '👁️ Mostra Contenuto';
    }
}

function updateStatus() {
    const status = window.adBlockDetectorInstance.getStatus();
    
    document.getElementById('statusAdBlock').textContent = 
        status.isAdBlockActive ? '🚫 SÌ' : '✅ NO';
    document.getElementById('statusPopup').textContent = 
        status.hasShownPopup ? '✅ SÌ' : '❌ NO';
    document.getElementById('statusPeriodic').textContent = 
        status.isCheckingPeriodically ? '🔄 ATTIVO' : '⏸️ FERMO';
    document.getElementById('statusLastCheck').textContent = 
        new Date().toLocaleTimeString();
}

function showTempNotification(message, color) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color};
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 1000000;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

setInterval(updateStatus, 5000);