

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



function improveSEOPerformance() {
	["/assets/css/style.css", "/assets/js/script.js", "/favicon.svg"].forEach(t => {
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
		optimizeInternalLinks();
		optimizeImagesForSEO();
		improveSEOPerformance();
		setTimeout(() => {
			let t = {
				internalLinks: document.querySelectorAll("a[title]").length,
				optimizedImages: document.querySelectorAll("img[alt]").length
			};
		}, 1e3);
	} catch (t) {}
}
"loading" === document.readyState ? document.addEventListener("DOMContentLoaded", initAdvancedSEO) : initAdvancedSEO(), window.testSEOOptimizations = function() {
	initAdvancedSEO()
};