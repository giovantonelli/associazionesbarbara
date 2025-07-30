/* ===== OTTIMIZZAZIONI IMMAGINI PER SEO =====
   Implementazione best practice Google per immagini
   ============================================== */

class ImageSEOOptimizer {
    constructor() {
        this.optimizedImages = 0;
        this.processedImages = 0;
    }

    // Ottimizza un'immagine specifica
    optimizeImage(img, context = '') {
        const originalAlt = img.getAttribute('alt') || '';
        const src = img.src || img.getAttribute('src') || '';
        const filename = src.split('/').pop().split('.')[0];

        // Genera alt text descrittivo basato sul contesto
        if (!originalAlt || originalAlt.trim() === '' || originalAlt === filename) {
            const newAlt = this.generateDescriptiveAlt(img, context, filename);
            if (newAlt) {
                img.setAttribute('alt', newAlt);
                this.optimizedImages++;
                console.log(`🖼️ [Image SEO] Alt text ottimizzato: "${newAlt}"`);
            }
        }

        // Aggiungi attributi per performance
        if (!img.hasAttribute('loading')) {
            const isAboveFold = img.getBoundingClientRect().top < window.innerHeight;
            img.setAttribute('loading', isAboveFold ? 'eager' : 'lazy');
        }

        // Aggiungi dimensioni se mancanti (aiuta LCP)
        if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
            if (img.naturalWidth && img.naturalHeight) {
                img.setAttribute('width', img.naturalWidth);
                img.setAttribute('height', img.naturalHeight);
            }
        }

        this.processedImages++;
    }

    // Genera alt text descrittivo intelligente
    generateDescriptiveAlt(img, context, filename) {
        const containerClasses = img.closest('div, section, article')?.className || '';
        const nearbyText = this.getNearbyText(img);
        
        // Mappa dei pattern per diversi tipi di immagini
        const patterns = {
            logo: 'Logo Associazione Santa Barbara',
            hero: 'Banner principale Associazione Santa Barbara',
            evento: 'Evento culturale dell\'Associazione Santa Barbara',
            galleria: 'Fotografia delle attività dell\'Associazione Santa Barbara',
            team: 'Membro del team Associazione Santa Barbara',
            attivita: 'Attività e progetti dell\'Associazione Santa Barbara',
            corteo: 'Corteo storico di Santa Barbara a Grumo Appula',
            tradizione: 'Tradizioni e cultura di Grumo Appula',
            volontariato: 'Attività di volontariato dell\'Associazione Santa Barbara'
        };

        // Identifica il tipo di immagine
        for (const [key, description] of Object.entries(patterns)) {
            if (filename.toLowerCase().includes(key) || 
                containerClasses.toLowerCase().includes(key) ||
                context.toLowerCase().includes(key)) {
                return description;
            }
        }

        // Usa il testo vicino se disponibile
        if (nearbyText) {
            return `Immagine: ${nearbyText}`;
        }

        // Fallback generico ma descrittivo
        return 'Immagine dell\'Associazione Santa Barbara - Cultura e tradizioni';
    }

    // Trova testo descrittivo vicino all'immagine
    getNearbyText(img) {
        // Cerca nell'elemento genitore
        const parent = img.closest('figure, div, section, article');
        if (parent) {
            // Cerca caption o descrizione
            const caption = parent.querySelector('figcaption, .caption, .description');
            if (caption && caption.textContent.trim()) {
                return caption.textContent.trim().substring(0, 100);
            }

            // Cerca heading vicino
            const heading = parent.querySelector('h1, h2, h3, h4, h5, h6');
            if (heading && heading.textContent.trim()) {
                return heading.textContent.trim().substring(0, 50);
            }
        }

        return null;
    }

    // Implementa structured data per immagini
    addImageStructuredData() {
        const galleryImages = document.querySelectorAll('.gallery img, .galleria img, [class*="photo"] img');
        
        if (galleryImages.length > 0) {
            const imageGallerySchema = {
                "@context": "https://schema.org",
                "@type": "ImageGallery",
                "name": "Galleria Associazione Santa Barbara",
                "description": "Foto e immagini delle attività e eventi dell'Associazione Santa Barbara",
                "publisher": {
                    "@type": "Organization",
                    "name": "Associazione Santa Barbara",
                    "url": "https://associazionesbarbara.it"
                },
                "image": []
            };

            galleryImages.forEach((img, index) => {
                if (index < 20) { // Limita a 20 immagini per performance
                    const alt = img.getAttribute('alt') || '';
                    const src = img.src || img.getAttribute('src') || '';
                    
                    if (src && alt) {
                        imageGallerySchema.image.push({
                            "@type": "ImageObject",
                            "url": src.startsWith('http') ? src : `https://associazionesbarbara.it${src}`,
                            "description": alt,
                            "name": alt
                        });
                    }
                }
            });

            if (imageGallerySchema.image.length > 0) {
                const script = document.createElement('script');
                script.type = 'application/ld+json';
                script.textContent = JSON.stringify(imageGallerySchema, null, 2);
                document.head.appendChild(script);
                console.log(`📊 [Image SEO] Structured data aggiunto per ${imageGallerySchema.image.length} immagini`);
            }
        }
    }

    // Ottimizza immagini responsive
    optimizeResponsiveImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Aggiungi sizes per immagini responsive
            if (!img.hasAttribute('sizes') && img.hasAttribute('srcset')) {
                img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw');
            }

            // Ottimizza per diverse risoluzioni se possibile
            if (!img.hasAttribute('srcset') && img.src) {
                // Qui potresti aggiungere logica per creare srcset se hai immagini multiple
                console.log(`💡 [Image SEO] Considera di aggiungere srcset per: ${img.src}`);
            }
        });
    }

    // Controlla e corregge errori comuni
    fixCommonImageIssues() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Correggi immagini senza src
            if (!img.src && !img.getAttribute('src')) {
                console.warn('⚠️ [Image SEO] Immagine senza src trovata:', img);
                img.style.display = 'none';
                return;
            }

            // Controlla aspect ratio per CLS
            if (!img.style.aspectRatio && img.naturalWidth && img.naturalHeight) {
                const ratio = img.naturalWidth / img.naturalHeight;
                img.style.aspectRatio = ratio.toFixed(2);
            }

            // Aggiungi error handling
            img.addEventListener('error', function() {
                console.warn('❌ [Image SEO] Errore caricamento:', this.src);
                this.style.display = 'none';
            });

            // Ottimizza per accessibilità
            if (img.getAttribute('alt') && img.closest('a')) {
                const link = img.closest('a');
                if (!link.getAttribute('aria-label') && !link.textContent.trim()) {
                    link.setAttribute('aria-label', img.getAttribute('alt'));
                }
            }
        });
    }

    // Esegui tutte le ottimizzazioni
    runAllOptimizations() {
        console.log('🖼️ [Image SEO] Avvio ottimizzazioni immagini...');
        
        // Ottimizza tutte le immagini
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            const context = this.getImageContext(img);
            this.optimizeImage(img, context);
        });

        // Ottimizzazioni aggiuntive
        this.addImageStructuredData();
        this.optimizeResponsiveImages();
        this.fixCommonImageIssues();

        // Report finale
        setTimeout(() => {
            console.log(`📊 [Image SEO] Ottimizzazioni completate:`);
            console.log(`  📷 ${this.processedImages} immagini processate`);
            console.log(`  ✅ ${this.optimizedImages} alt text ottimizzati`);
            console.log(`  📋 Structured data per gallerie aggiunto`);
        }, 100);
    }

    // Determina il contesto dell'immagine
    getImageContext(img) {
        const section = img.closest('section, article, main');
        if (section) {
            const heading = section.querySelector('h1, h2, h3');
            if (heading) {
                return heading.textContent.trim();
            }
        }
        return '';
    }

    // Genera report delle ottimizzazioni
    generateImageReport() {
        const images = document.querySelectorAll('img');
        const report = {
            total: images.length,
            withAlt: 0,
            withLoading: 0,
            withDimensions: 0,
            responsive: 0,
            issues: []
        };

        images.forEach(img => {
            if (img.getAttribute('alt')) report.withAlt++;
            if (img.hasAttribute('loading')) report.withLoading++;
            if (img.hasAttribute('width') || img.hasAttribute('height')) report.withDimensions++;
            if (img.hasAttribute('srcset')) report.responsive++;

            // Controlla problemi
            if (!img.getAttribute('alt')) {
                report.issues.push(`Alt text mancante: ${img.src}`);
            }
        });

        console.log('📊 [Image SEO] Report immagini:', report);
        return report;
    }
}

// Inizializzazione automatica
function initImageSEOOptimizations() {
    const optimizer = new ImageSEOOptimizer();
    optimizer.runAllOptimizations();
    return optimizer;
}

// Esposizione globale
if (typeof window !== 'undefined') {
    window.ImageSEOOptimizer = ImageSEOOptimizer;
    window.optimizeImages = initImageSEOOptimizations;
}

// Auto-inizializzazione
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initImageSEOOptimizations, 1500);
    });
} else {
    setTimeout(initImageSEOOptimizations, 1500);
}

console.log('🖼️ [Image SEO] Sistema di ottimizzazione immagini caricato!');

// Export per moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageSEOOptimizer;
}
