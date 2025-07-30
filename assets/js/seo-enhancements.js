/* ===== OTTIMIZZAZIONI SEO AVANZATE =====
   Implementazione delle best practice Google SEO
   ============================================= */

// Implementazione breadcrumb automatici
function initSEOBreadcrumbs() {
    const pathname = window.location.pathname;
    const pathSegments = pathname.split('/').filter(segment => segment);
    
    // Mappa delle pagine per breadcrumb più descrittivi
    const pageNames = {
        'index.html': 'Home',
        'chi-siamo.html': 'Chi Siamo - Storia e Missione',
        'attivita.html': 'Attività e Progetti Culturali',
        'eventi.html': 'Eventi e Calendario Attività',
        'galleria.html': 'Galleria Foto e Video',
        'faq.html': 'Domande Frequenti',
        'contatti.html': 'Contatti e Informazioni',
        'partner.html': 'Partner e Collaborazioni',
        'area-soci.html': 'Area Riservata Soci',
        'privacy.html': 'Privacy Policy'
    };
    
    // Schema JSON-LD per breadcrumb
    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://associazionesbarbara.it/"
            }
        ]
    };
    
    // Aggiungi breadcrumb se non siamo nella home
    if (pathname !== '/' && pathname !== '/index.html') {
        const currentPage = pathSegments[pathSegments.length - 1] || 'index.html';
        const pageName = pageNames[currentPage] || currentPage;
        
        breadcrumbData.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": pageName,
            "item": `https://associazionesbarbara.it${pathname}`
        });
    }
    
    // Inserisci il JSON-LD nel head
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify(breadcrumbData, null, 2);
    document.head.appendChild(breadcrumbScript);
}

// Ottimizzazione automatica dei link interni
function optimizeInternalLinks() {
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href$=".html"]');
    
    internalLinks.forEach(link => {
        const href = link.getAttribute('href');
        const text = link.textContent.trim();
        
        // Aggiungi attributi SEO se mancano
        if (!link.getAttribute('title') && text) {
            const titles = {
                'chi-siamo.html': 'Scopri la storia dell\'Associazione Santa Barbara',
                'attivita.html': 'Esplora le nostre attività culturali e progetti',
                'eventi.html': 'Calendario eventi e manifestazioni pubbliche',
                'galleria.html': 'Foto e video delle nostre iniziative',
                'faq.html': 'Risposte alle domande più frequenti',
                'contatti.html': 'Come contattare l\'Associazione Santa Barbara',
                'partner.html': 'I nostri partner e collaboratori',
                'area-soci.html': 'Accesso riservato ai soci dell\'associazione'
            };
            
            const title = titles[href] || `Vai alla sezione ${text}`;
            link.setAttribute('title', title);
        }
    });
}

// Implementazione di rich snippets per eventi
function addEventStructuredData() {
    const eventElements = document.querySelectorAll('.event-card, .enhanced-card[data-event-id]');
    
    eventElements.forEach((eventEl, index) => {
        const title = eventEl.querySelector('h3, .card-title')?.textContent;
        const description = eventEl.querySelector('p, .card-text')?.textContent;
        const dateElement = eventEl.querySelector('[data-event-date], .event-date');
        const locationElement = eventEl.querySelector('.location, .event-location');
        
        if (title && description) {
            const eventSchema = {
                "@context": "https://schema.org",
                "@type": "Event",
                "name": title,
                "description": description,
                "organizer": {
                    "@type": "Organization",
                    "name": "Associazione Santa Barbara",
                    "url": "https://associazionesbarbara.it"
                }
            };
            
            if (dateElement) {
                const eventDate = dateElement.getAttribute('data-event-date') || dateElement.textContent;
                if (eventDate) {
                    eventSchema.startDate = eventDate;
                }
            }
            
            if (locationElement) {
                eventSchema.location = {
                    "@type": "Place",
                    "name": locationElement.textContent,
                    "address": "Grumo Appula, BA, Italia"
                };
            }
            
            const eventScript = document.createElement('script');
            eventScript.type = 'application/ld+json';
            eventScript.textContent = JSON.stringify(eventSchema, null, 2);
            document.head.appendChild(eventScript);
        }
    });
}

// Ottimizzazione delle immagini per SEO
function optimizeImagesForSEO() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Assicura che ogni immagine abbia un alt text appropriato
        if (!img.getAttribute('alt') || img.getAttribute('alt').trim() === '') {
            const src = img.src || img.getAttribute('src') || '';
            const filename = src.split('/').pop().split('.')[0];
            
            // Genera alt text basato sul filename o contesto
            let altText = '';
            if (filename.includes('logo')) {
                altText = 'Logo Associazione Santa Barbara';
            } else if (filename.includes('event') || img.closest('.event-card')) {
                altText = 'Immagine evento Associazione Santa Barbara';
            } else if (img.closest('.gallery, .galleria')) {
                altText = 'Foto galleria Associazione Santa Barbara';
            } else {
                altText = 'Immagine Associazione Santa Barbara';
            }
            
            img.setAttribute('alt', altText);
        }
        
        // Aggiungi loading lazy per immagini non critiche
        if (!img.hasAttribute('loading') && !img.closest('.hero, .banner')) {
            img.setAttribute('loading', 'lazy');
        }
    });
}

// Implementazione di FAQ Schema
function addFAQStructuredData() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": []
        };
        
        faqItems.forEach(faqItem => {
            const question = faqItem.querySelector('.faq-question')?.textContent;
            const answer = faqItem.querySelector('.faq-answer')?.textContent;
            
            if (question && answer) {
                faqSchema.mainEntity.push({
                    "@type": "Question",
                    "name": question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": answer
                    }
                });
            }
        });
        
        if (faqSchema.mainEntity.length > 0) {
            const faqScript = document.createElement('script');
            faqScript.type = 'application/ld+json';
            faqScript.textContent = JSON.stringify(faqSchema, null, 2);
            document.head.appendChild(faqScript);
        }
    }
}

// Miglioramento della performance SEO
function improveSEOPerformance() {
    // Preload di risorse critiche
    const criticalResources = [
        '/assets/css/style.css',
        '/assets/js/script.js',
        '/assets/images/logo.svg'
    ];
    
    criticalResources.forEach(resource => {
        const existing = document.querySelector(`link[href="${resource}"]`);
        if (!existing && !document.querySelector(`link[rel="preload"][href="${resource}"]`)) {
            const preload = document.createElement('link');
            preload.rel = 'preload';
            preload.href = resource;
            
            if (resource.endsWith('.css')) {
                preload.as = 'style';
            } else if (resource.endsWith('.js')) {
                preload.as = 'script';
            } else if (resource.endsWith('.svg') || resource.includes('image')) {
                preload.as = 'image';
            }
            
            document.head.appendChild(preload);
        }
    });
    
    // Ottimizzazione del DOM per crawling
    const hiddenElements = document.querySelectorAll('[style*="display: none"], .hidden');
    hiddenElements.forEach(el => {
        if (el.textContent.trim() && !el.hasAttribute('aria-hidden')) {
            el.setAttribute('aria-hidden', 'true');
        }
    });
}

// Funzione principale di inizializzazione SEO
function initAdvancedSEO() {
    console.log('🎯 [SEO] Inizializzazione ottimizzazioni SEO avanzate...');
    
    try {
        initSEOBreadcrumbs();
        optimizeInternalLinks();
        addEventStructuredData();
        optimizeImagesForSEO();
        addFAQStructuredData();
        improveSEOPerformance();
        
        console.log('✅ [SEO] Ottimizzazioni SEO completate con successo!');
        
        // Report delle ottimizzazioni applicate
        setTimeout(() => {
            const report = {
                breadcrumbs: !!document.querySelector('script[type="application/ld+json"]'),
                internalLinks: document.querySelectorAll('a[title]').length,
                optimizedImages: document.querySelectorAll('img[alt]').length,
                structuredData: document.querySelectorAll('script[type="application/ld+json"]').length
            };
            
            console.log('📊 [SEO] Report ottimizzazioni:', report);
        }, 1000);
        
    } catch (error) {
        console.error('❌ [SEO] Errore durante le ottimizzazioni:', error);
    }
}

// Auto-inizializzazione
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdvancedSEO);
} else {
    initAdvancedSEO();
}

// Funzione per test manuale
window.testSEOOptimizations = function() {
    console.log('🧪 [SEO] Test manuale ottimizzazioni...');
    initAdvancedSEO();
};

console.log('🚀 [SEO] Sistema di ottimizzazioni SEO avanzate caricato!');
