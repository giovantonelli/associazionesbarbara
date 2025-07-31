function initSEOBreadcrumbs() {
	let t = window.location.pathname,
		e = t.split("/").filter(t => t),
		a = {
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: "https://associazionesbarbara.it/"
			}]
		};
	if ("/" !== t && "/index.html" !== t) {
		let i = e[e.length - 1] || "index.html";
		a.itemListElement.push({
			"@type": "ListItem",
			position: 2,
			name: {
				"index.html": "Home",
				"chi-siamo.html": "Chi Siamo - Storia e Missione",
				"attivita.html": "Attività e Progetti Culturali",
				"eventi.html": "Eventi e Calendario Attività",
				"galleria.html": "Galleria Foto e Video",
				"faq.html": "Domande Frequenti",
				"contatti.html": "Contatti e Informazioni",
				"partner.html": "Partner e Collaborazioni",
				"area-soci.html": "Area Riservata Soci",
				"privacy.html": "Privacy Policy"
			} [i] || i,
			item: `https://associazionesbarbara.it${t}`
		})
	}
	let n = document.createElement("script");
	n.type = "application/ld+json", n.textContent = JSON.stringify(a, null, 2), document.head.appendChild(n)
}

function optimizeInternalLinks() {
	let t = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href$=".html"]');
	t.forEach(t => {
		let e = t.getAttribute("href"),
			a = t.textContent.trim();
		if (!t.getAttribute("title") && a) {
			let i = {
				"chi-siamo.html": "Scopri la storia dell'Associazione Santa Barbara",
				"attivita.html": "Esplora le nostre attività culturali e progetti",
				"eventi.html": "Calendario eventi e manifestazioni pubbliche",
				"galleria.html": "Foto e video delle nostre iniziative",
				"faq.html": "Risposte alle domande più frequenti",
				"contatti.html": "Come contattare l'Associazione Santa Barbara",
				"partner.html": "I nostri partner e collaboratori",
				"area-soci.html": "Accesso riservato ai soci dell'associazione"
			} [e] || `Vai alla sezione ${a}`;
			t.setAttribute("title", i)
		}
	})
}

function addEventStructuredData() {
	let t = document.querySelectorAll(".event-card, .enhanced-card[data-event-id]");
	t.forEach((t, e) => {
		let a = t.querySelector("h3, .card-title")?.textContent,
			i = t.querySelector("p, .card-text")?.textContent,
			n = t.querySelector("[data-event-date], .event-date"),
			r = t.querySelector(".location, .event-location");
		if (a && i) {
			let o = {
				"@context": "https://schema.org",
				"@type": "Event",
				name: a,
				description: i,
				organizer: {
					"@type": "Organization",
					name: "Associazione Santa Barbara",
					url: "https://associazionesbarbara.it"
				}
			};
			if (n) {
				let l = n.getAttribute("data-event-date") || n.textContent;
				l && (o.startDate = l)
			}
			r && (o.location = {
				"@type": "Place",
				name: r.textContent,
				address: "Grumo Appula, BA, Italia"
			});
			let s = document.createElement("script");
			s.type = "application/ld+json", s.textContent = JSON.stringify(o, null, 2), document.head.appendChild(s)
		}
	})
}

function optimizeImagesForSEO() {
	let t = document.querySelectorAll("img");
	t.forEach(t => {
		if (!t.getAttribute("alt") || "" === t.getAttribute("alt").trim()) {
			let e = t.src || t.getAttribute("src") || "",
				a = e.split("/").pop().split(".")[0],
				i = "";
			i = a.includes("logo") ? "Logo Associazione Santa Barbara" : a.includes("event") || t.closest(".event-card") ? "Immagine evento Associazione Santa Barbara" : t.closest(".gallery, .galleria") ? "Foto galleria Associazione Santa Barbara" : "Immagine Associazione Santa Barbara", t.setAttribute("alt", i)
		}
		t.hasAttribute("loading") || t.closest(".hero, .banner") || t.setAttribute("loading", "lazy")
	})
}

function addFAQStructuredData() {
	let t = document.querySelectorAll(".faq-item");
	if (t.length > 0) {
		let e = {
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: []
		};
		if (t.forEach(t => {
				let a = t.querySelector(".faq-question")?.textContent,
					i = t.querySelector(".faq-answer")?.textContent;
				a && i && e.mainEntity.push({
					"@type": "Question",
					name: a,
					acceptedAnswer: {
						"@type": "Answer",
						text: i
					}
				})
			}), e.mainEntity.length > 0) {
			let a = document.createElement("script");
			a.type = "application/ld+json", a.textContent = JSON.stringify(e, null, 2), document.head.appendChild(a)
		}
	}
}

function improveSEOPerformance() {
	["/assets/css/style.css", "/assets/js/script.js", "/assets/images/logo.svg"].forEach(t => {
		let e = document.querySelector(`link[href="${t}"]`);
		if (!e && !document.querySelector(`link[rel="preload"][href="${t}"]`)) {
			let a = document.createElement("link");
			a.rel = "preload", a.href = t, t.endsWith(".css") ? a.as = "style" : t.endsWith(".js") ? a.as = "script" : (t.endsWith(".svg") || t.includes("image")) && (a.as = "image"), document.head.appendChild(a)
		}
	});
	let t = document.querySelectorAll('[style*="display: none"], .hidden');
	t.forEach(t => {
		t.textContent.trim() && !t.hasAttribute("aria-hidden") && t.setAttribute("aria-hidden", "true")
	})
}

function initAdvancedSEO() {
	try {
		initSEOBreadcrumbs(), optimizeInternalLinks(), addEventStructuredData(), optimizeImagesForSEO(), addFAQStructuredData(), improveSEOPerformance(), setTimeout(() => {
			let t = {
				breadcrumbs: !!document.querySelector('script[type="application/ld+json"]'),
				internalLinks: document.querySelectorAll("a[title]").length,
				optimizedImages: document.querySelectorAll("img[alt]").length,
				structuredData: document.querySelectorAll('script[type="application/ld+json"]').length
			};
		}, 1e3)
	} catch (t) {}
}
"loading" === document.readyState ? document.addEventListener("DOMContentLoaded", initAdvancedSEO) : initAdvancedSEO(), window.testSEOOptimizations = function() {
	initAdvancedSEO()
};