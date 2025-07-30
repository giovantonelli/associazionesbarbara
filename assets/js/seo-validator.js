/* ===== VALIDATORE SEO AUTOMATICO =====
   Sistema di controllo e validazione SEO
   ===================================== */

class SEOValidator {
    constructor() {
        this.issues = [];
        this.warnings = [];
        this.successes = [];
        this.score = 0;
        this.maxScore = 100;
    }

    // Valida meta tag essenziali
    validateMetaTags() {
        const title = document.querySelector('title');
        const description = document.querySelector('meta[name="description"]');
        const robots = document.querySelector('meta[name="robots"]');
        const canonical = document.querySelector('link[rel="canonical"]');
        const viewport = document.querySelector('meta[name="viewport"]');

        // Title tag
        if (!title || title.textContent.trim() === '') {
            this.issues.push('❌ Title tag mancante');
        } else {
            const titleLength = title.textContent.length;
            if (titleLength < 30) {
                this.warnings.push('⚠️ Title troppo corto (< 30 caratteri)');
            } else if (titleLength > 60) {
                this.warnings.push('⚠️ Title troppo lungo (> 60 caratteri)');
            } else {
                this.successes.push('✅ Title tag ottimizzato');
                this.score += 15;
            }
        }

        // Meta description
        if (!description || description.content.trim() === '') {
            this.issues.push('❌ Meta description mancante');
        } else {
            const descLength = description.content.length;
            if (descLength < 120) {
                this.warnings.push('⚠️ Meta description troppo corta (< 120 caratteri)');
            } else if (descLength > 160) {
                this.warnings.push('⚠️ Meta description troppo lunga (> 160 caratteri)');
            } else {
                this.successes.push('✅ Meta description ottimizzata');
                this.score += 15;
            }
        }

        // Canonical URL
        if (!canonical) {
            this.warnings.push('⚠️ Canonical URL mancante');
        } else {
            this.successes.push('✅ Canonical URL presente');
            this.score += 10;
        }

        // Robots meta
        if (!robots) {
            this.warnings.push('⚠️ Robots meta mancante');
        } else if (robots.content.includes('noindex')) {
            this.issues.push('❌ Pagina bloccata dall\'indicizzazione');
        } else {
            this.successes.push('✅ Robots meta configurato');
            this.score += 5;
        }

        // Viewport
        if (!viewport) {
            this.issues.push('❌ Viewport meta mancante');
        } else {
            this.successes.push('✅ Viewport meta presente');
            this.score += 5;
        }
    }

    // Valida struttura dei heading
    validateHeadingStructure() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const h1Elements = document.querySelectorAll('h1');

        if (h1Elements.length === 0) {
            this.issues.push('❌ Nessun H1 trovato');
        } else if (h1Elements.length > 1) {
            this.warnings.push('⚠️ Multipli H1 rilevati (SEO: meglio uno solo)');
        } else {
            this.successes.push('✅ Un singolo H1 presente');
            this.score += 10;
        }

        if (headings.length > 0) {
            this.successes.push(`✅ ${headings.length} heading strutturati trovati`);
            this.score += 5;
        }
    }

    // Valida immagini
    validateImages() {
        const images = document.querySelectorAll('img');
        let imagesWithAlt = 0;
        let imagesWithoutAlt = 0;

        images.forEach(img => {
            const alt = img.getAttribute('alt');
            if (!alt || alt.trim() === '') {
                imagesWithoutAlt++;
            } else {
                imagesWithAlt++;
            }
        });

        if (imagesWithoutAlt > 0) {
            this.warnings.push(`⚠️ ${imagesWithoutAlt} immagini senza alt text`);
        }

        if (imagesWithAlt > 0) {
            this.successes.push(`✅ ${imagesWithAlt} immagini con alt text`);
            this.score += Math.min(10, imagesWithAlt * 2);
        }
    }

    // Valida link interni
    validateInternalLinks() {
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href$=".html"]:not([href^="http"])');
        let linksWithTitle = 0;

        internalLinks.forEach(link => {
            if (link.getAttribute('title')) {
                linksWithTitle++;
            }
        });

        if (internalLinks.length > 0) {
            this.successes.push(`✅ ${internalLinks.length} link interni trovati`);
            this.score += 5;

            if (linksWithTitle > 0) {
                this.successes.push(`✅ ${linksWithTitle} link con title ottimizzati`);
                this.score += 5;
            }
        }
    }

    // Valida contenuto
    validateContent() {
        const mainContent = document.querySelector('main, .main-content, .content');
        if (mainContent) {
            const textContent = mainContent.textContent.trim();
            const wordCount = textContent.split(/\s+/).length;

            if (wordCount < 300) {
                this.warnings.push('⚠️ Contenuto principale sotto 300 parole');
            } else if (wordCount < 500) {
                this.warnings.push('⚠️ Contenuto principale sotto 500 parole (raccomandato per SEO)');
            } else {
                this.successes.push(`✅ Contenuto sostanzioso (${wordCount} parole)`);
                this.score += 10;
            }
        } else {
            this.warnings.push('⚠️ Contenuto principale non identificato');
        }
    }

    // Valida structured data
    validateStructuredData() {
        const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
        
        if (jsonLdScripts.length === 0) {
            this.warnings.push('⚠️ Nessun structured data trovato');
        } else {
            this.successes.push(`✅ ${jsonLdScripts.length} structured data implementati`);
            this.score += 10;

            jsonLdScripts.forEach((script, index) => {
                try {
                    const data = JSON.parse(script.textContent);
                    this.successes.push(`✅ Schema ${data['@type'] || 'Unknown'} valido`);
                } catch (e) {
                    this.issues.push(`❌ Schema ${index + 1} non valido: ${e.message}`);
                }
            });
        }
    }

    // Valida performance
    validatePerformance() {
        // Controlla risorse critiche
        const criticalCSS = document.querySelectorAll('link[rel="stylesheet"]');
        const scripts = document.querySelectorAll('script[src]');
        
        let lazyImages = document.querySelectorAll('img[loading="lazy"]').length;
        let totalImages = document.querySelectorAll('img').length;

        if (lazyImages > 0) {
            this.successes.push(`✅ ${lazyImages}/${totalImages} immagini con lazy loading`);
            this.score += 5;
        }

        // Controlla preload
        const preloadLinks = document.querySelectorAll('link[rel="preload"]');
        if (preloadLinks.length > 0) {
            this.successes.push(`✅ ${preloadLinks.length} risorse precaricate`);
            this.score += 5;
        }
    }

    // Esegui tutti i controlli
    runAllValidations() {
        console.log('🔍 [SEO Validator] Avvio validazione completa...');
        
        this.validateMetaTags();
        this.validateHeadingStructure();
        this.validateImages();
        this.validateInternalLinks();
        this.validateContent();
        this.validateStructuredData();
        this.validatePerformance();

        this.generateReport();
    }

    // Genera report dettagliato
    generateReport() {
        const finalScore = Math.min(this.score, this.maxScore);
        const percentage = Math.round((finalScore / this.maxScore) * 100);

        console.log('📊 === REPORT VALIDAZIONE SEO ===');
        console.log(`🎯 Punteggio SEO: ${finalScore}/${this.maxScore} (${percentage}%)`);
        
        if (this.successes.length > 0) {
            console.log('\n✅ SUCCESSI:');
            this.successes.forEach(success => console.log(`  ${success}`));
        }

        if (this.warnings.length > 0) {
            console.log('\n⚠️ AVVERTIMENTI:');
            this.warnings.forEach(warning => console.log(`  ${warning}`));
        }

        if (this.issues.length > 0) {
            console.log('\n❌ PROBLEMI CRITICI:');
            this.issues.forEach(issue => console.log(`  ${issue}`));
        }

        // Raccomandazioni
        console.log('\n💡 RACCOMANDAZIONI:');
        if (finalScore >= 90) {
            console.log('  🎉 Eccellente! SEO molto ben ottimizzato');
        } else if (finalScore >= 75) {
            console.log('  👍 Buono! Alcuni miglioramenti minori possibili');
        } else if (finalScore >= 60) {
            console.log('  📈 Discreto, ma necessari miglioramenti');
        } else {
            console.log('  🚨 Necessari miglioramenti SEO sostanziali');
        }

        // Mostra il report anche nella console del browser per debug
        if (typeof window !== 'undefined') {
            const reportData = {
                score: finalScore,
                percentage: percentage,
                successes: this.successes.length,
                warnings: this.warnings.length,
                issues: this.issues.length,
                details: {
                    successes: this.successes,
                    warnings: this.warnings,
                    issues: this.issues
                }
            };

            window.seoReport = reportData;
            console.log('📋 Report completo salvato in window.seoReport');
        }

        return {
            score: finalScore,
            percentage: percentage,
            successes: this.successes,
            warnings: this.warnings,
            issues: this.issues
        };
    }
}

// Funzione di inizializzazione automatica
function initSEOValidation() {
    const validator = new SEOValidator();
    validator.runAllValidations();
    return validator;
}

// Esposizione globale per test manuali
if (typeof window !== 'undefined') {
    window.SEOValidator = SEOValidator;
    window.validateSEO = initSEOValidation;
}

// Auto-validazione dopo il caricamento della pagina
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initSEOValidation, 2000); // Aspetta che tutti gli script SEO si siano caricati
    });
} else {
    setTimeout(initSEOValidation, 2000);
}

console.log('🔍 [SEO Validator] Sistema di validazione SEO caricato!');

// Export per utilizzo come modulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEOValidator;
}
