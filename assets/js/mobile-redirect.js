/* ===================================
   MOBILE REDIRECT SCRIPT
   Reindirizza automaticamente su m.domain.com
   =================================== */

(function() {
    'use strict';

    // Check if we're already on mobile subdomain
    if (window.location.hostname.startsWith('m.')) {
        return;
    }

    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    
    // Check if user has opted out of mobile redirect
    const hasOptedOut = localStorage.getItem('desktop-view') === 'true';
    
    if ((isMobile || isSmallScreen) && !hasOptedOut) {
        // Get current path and search params
        const currentPath = window.location.pathname;
        const currentSearch = window.location.search;
        const currentHash = window.location.hash;
        
        // Build mobile URL
        const mobileUrl = `https://m.associazionesbarbara.it${currentPath}${currentSearch}${currentHash}`;
        
        // Redirect to mobile version
        window.location.replace(mobileUrl);
    }
})();
