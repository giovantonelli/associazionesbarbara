









function improveSEOPerformance() {
	// Precarica style.css
	["/assets/css/style.css", "/assets/js/script.js"].forEach(t => {
		if (!document.querySelector(`link[rel="preload"][href="${t}"]`)) {
			let a = document.createElement("link");
			a.rel = "preload";
			a.href = t;
			a.as = t.endsWith(".css") ? "style" : "script";
			document.head.appendChild(a);
		}
	});
	// Precarica lo script JS corrispondente alla pagina HTML
	let page = location.pathname.split("/").pop();
	if (page.endsWith(".html")) {
		let jsName = page.replace(".html", ".js");
		let jsPath = `/assets/js/${jsName}`;
		if (!document.querySelector(`link[rel="preload"][href="${jsPath}"]`)) {
			let a = document.createElement("link");
			a.rel = "preload";
			a.href = jsPath;
			a.as = "script";
			document.head.appendChild(a);
		}
	}
}

function initAdvancedSEO() {
	try {
		improveSEOPerformance();
	} catch (t) {}
}
"loading" === document.readyState ? document.addEventListener("DOMContentLoaded", initAdvancedSEO) : initAdvancedSEO(), window.testSEOOptimizations = function() {
	initAdvancedSEO()
};