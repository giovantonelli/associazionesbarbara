/* ===== MOBILE COUNTER FIX =====
   Fix per i contatori "I nostri numeri" che non funzionano su mobile
   Migliora l'IntersectionObserver per dispositivi mobile
   ================================ */

// Fix per i contatori sui dispositivi mobile
function fixMobileCounters() {
	// Configurazione migliorata per mobile
	const observerOptions = {
		threshold: [0.1, 0.3, 0.5], // Multiple thresholds per migliore rilevamento
		rootMargin: '0px 0px -20px 0px' // Trigger prima per mobile
	};

	// Funzione animazione contatore migliorata
	function animateCounter(element, target, duration = 2000) {
		const start = 0;
		const increment = target / (duration / 16);
		let current = 0;

		const timer = setInterval(() => {
			current += increment;
			if (current >= target) {
				element.textContent = target + (target >= 100 ? '+' : '');
				clearInterval(timer);
			} else {
				element.textContent = Math.floor(current);
			}
		}, 16);
	}

	// Observer migliorato per mobile
	const mobileStatsObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			// Trigger su qualsiasi threshold raggiunto
			if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
				const counters = entry.target.querySelectorAll('.counter');

				console.log(`🔢 [Counter Fix] Sezione visibile al ${Math.round(entry.intersectionRatio * 100)}%`);
				console.log(`🔢 [Counter Fix] Trovati ${counters.length} contatori`);

				counters.forEach((counter, index) => {
					const target = parseInt(counter.dataset.target) || 0;

					console.log(`🔢 [Counter Fix] Animando contatore ${index + 1}: target = ${target}`);

					// Delay progressivo per effetto più fluido
					setTimeout(() => {
						animateCounter(counter, target);
					}, index * 200);
				});

				// Rimuovi observer dopo l'animazione
				mobileStatsObserver.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// Applica l'observer migliorato
	const statsSection = document.querySelector('.stats-section');
	if (statsSection) {
		console.log('🔢 [Counter Fix] Sezione stats trovata, applicando observer mobile');
		mobileStatsObserver.observe(statsSection);

		// Fallback per dispositivi molto lenti o problematici
		setTimeout(() => {
			const counters = statsSection.querySelectorAll('.counter');
			counters.forEach(counter => {
				if (counter.textContent === '0' || counter.textContent === '') {
					const target = parseInt(counter.dataset.target) || 0;
					console.log('🔢 [Counter Fix] Fallback attivato per contatore con target:', target);
					animateCounter(counter, target);
				}
			});
		}, 5000); // Fallback dopo 5 secondi
	} else {
		console.log('🔢 [Counter Fix] Sezione stats NON trovata');
	}
}

// Fix specifico per contatori che dipendono da API
async function fixDynamicCounters() {
	try {
		console.log('🔢 [Counter Fix] Inizializzazione contatori dinamici...');

		// Verifica se siamo su index.html o chi-siamo.html
		const currentPage = window.location.pathname.split('/').pop() || 'index.html';
		const isCounterPage = currentPage === 'index.html' || currentPage === 'chi-siamo.html';

		if (!isCounterPage) {
			console.log('🔢 [Counter Fix] Pagina non rilevante per i contatori');
			return;
		}

		console.log(`🔢 [Counter Fix] Pagina rilevante: ${currentPage}`);

		// Fix per eventi counter
		const eventiCounter = document.getElementById('eventi-counter');
		if (eventiCounter && eventiCounter.dataset.target === '0') {
			console.log('🔢 [Counter Fix] Fixing eventi counter...');
			try {
				const eventsCount = await getEventsCount();
				eventiCounter.dataset.target = eventsCount;
				console.log(`🔢 [Counter Fix] Eventi counter aggiornato: ${eventsCount}`);
			} catch (error) {
				console.log('🔢 [Counter Fix] Errore nel caricamento eventi, usando valore di default');
				eventiCounter.dataset.target = '15'; // Valore di fallback
			}
		}

		// Fix per anni counter  
		const anniCounter = document.getElementById('anni-counter');
		if (anniCounter && anniCounter.dataset.target === '0') {
			const currentYear = new Date().getFullYear();
			const yearsActive = currentYear - 2008;
			anniCounter.dataset.target = yearsActive;
			console.log(`🔢 [Counter Fix] Anni counter aggiornato: ${yearsActive}`);
		}

		// Fix per progetti counter
		const progettiCounter = document.getElementById('progetti-counter');
		if (progettiCounter && progettiCounter.dataset.target === '0') {
			console.log('🔢 [Counter Fix] Fixing progetti counter...');
			try {
				const attivitaCount = await getAttivitaCount();
				progettiCounter.dataset.target = attivitaCount;
				console.log(`🔢 [Counter Fix] Progetti counter aggiornato: ${attivitaCount}`);
			} catch (error) {
				console.log('🔢 [Counter Fix] Errore nel caricamento attivita, usando valore di default');
				progettiCounter.dataset.target = '8'; // Valore di fallback
			}
		}

	} catch (error) {
		console.error('🔢 [Counter Fix] Errore nell\'inizializzazione contatori dinamici:', error);
	}
}

// Touch-specific improvements per mobile
function addMobileCounterEnhancements() {
	// Migliora performance su dispositivi touch
	if ('ontouchstart' in window) {
		console.log('🔢 [Counter Fix] Dispositivo touch rilevato, applicando ottimizzazioni');

		// Riduce threshold per dispositivi touch
		const statsSection = document.querySelector('.stats-section');
		if (statsSection) {
			// Aggiunge una classe per styling specifico mobile
			statsSection.classList.add('mobile-counters');

			// CSS injection per migliorare visibilità
			const mobileCounterCSS = `
                <style id="mobile-counter-css">
                @media (max-width: 768px) {
                    .stats-section.mobile-counters {
                        padding: 40px 0 !important;
                        min-height: auto !important;
                    }
                    
                    .enhanced-stat {
                        margin-bottom: 20px !important;
                        padding: 20px !important;
                    }
                    
                    .stat-number {
                        font-size: 2.5rem !important;
                        font-weight: 700 !important;
                        color: #FFD700 !important;
                    }
                    
                    .mobile-counters .counter {
                        animation: mobileCounterPulse 2s ease-in-out !important;
                    }
                    
                    @keyframes mobileCounterPulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }
                }
                </style>
            `;

			if (!document.getElementById('mobile-counter-css')) {
				document.head.insertAdjacentHTML('beforeend', mobileCounterCSS);
			}
		}
	}
}

// Inizializzazione principale
function initMobileCounterFix() {
	console.log('🔢 [Counter Fix] Inizializzazione fix contatori mobile...');

	// Applica fix immediato se la pagina è già caricata
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => {
			setTimeout(async () => {
				await fixDynamicCounters();
				fixMobileCounters();
				addMobileCounterEnhancements();
			}, 100);
		});
	} else {
		// Esegui immediatamente se DOM già pronto
		setTimeout(async () => {
			await fixDynamicCounters();
			fixMobileCounters();
			addMobileCounterEnhancements();
		}, 100);
	}
}

// Funzioni di utilità già esistenti (fallback se non disponibili)
if (typeof getEventsCount === 'undefined') {
	console.log('🔢 [Counter Fix] Funzione getEventsCount non trovata, usando fallback');
	window.getEventsCount = async function() {
		return 15; // Valore di fallback ragionevole
	}
}

if (typeof getAttivitaCount === 'undefined') {
	console.log('🔢 [Counter Fix] Funzione getAttivitaCount non trovata, usando fallback');
	window.getAttivitaCount = async function() {
		return 8; // Valore di fallback ragionevole
	}
}

// Debug function per testing
window.testMobileCounters = function() {
	console.log('🔢 [Counter Fix] Test manuale contatori mobile...');
	const counters = document.querySelectorAll('.counter');
	console.log(`🔢 [Counter Fix] Trovati ${counters.length} contatori:`);

	counters.forEach((counter, index) => {
		const target = counter.dataset.target;
		const current = counter.textContent;
		console.log(`🔢 [Counter Fix] Contatore ${index + 1}: target=${target}, current="${current}"`);
	});

	// Force animation per test
	fixMobileCounters();
}

// Avvia il fix
initMobileCounterFix();

console.log('🔢 [Counter Fix] Sistema di fix contatori mobile caricato!')