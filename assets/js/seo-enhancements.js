









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
		improveSEOPerformance();
		setTimeout(() => {
		}, 1e3);
	} catch (t) {}
}
"loading" === document.readyState ? document.addEventListener("DOMContentLoaded", initAdvancedSEO) : initAdvancedSEO(), window.testSEOOptimizations = function() {
	initAdvancedSEO()
};