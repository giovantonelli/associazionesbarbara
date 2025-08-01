function init404Detection() {
	let e = window.location.pathname,
		t = e.split("/").pop() || "";
	if ("404.html" === t) return;
	let i = ["", "index.html", "chi-siamo.html", "attivita.html", "eventi.html", "galleria.html", "faq.html", "contatti.html", "partner.html", "privacy.html", "area-soci.html", "login.html", "register.html", "404.html"].includes(t);
	if (!i) {
				let n = window.location.href;
		window.location.replace(`404.html?from=${encodeURIComponent(n)}`);
		return
	}
	window.location.search && !t.includes(".html") && checkPageExists(e)
}

function checkPageExists(e) {
	!("/" === e || "/index.html" === e || e.endsWith("404.html")) && fetch(window.location.href, {
		method: "HEAD"
	}).then(e => {
		if (404 === e.status) {
						let t = window.location.href;
			window.location.replace(`404.html?from=${encodeURIComponent(t)}`)
		}
	}).catch(e => {
			})
}

function checkHashRouting() {
	let e = window.location.hash;
	e && "#" !== e && setTimeout(() => {
		let t = document.querySelector(e);
			}, 500)
}

function initPhotoCarousel() {
	function e(e) {
		images[e] && (current = e, lightboxImage.src = images[e], lightbox.classList.add("active"), document.body.style.overflow = "hidden")
	}
}
window.addEventListener("hashchange", checkHashRouting);
let currentUser = null,
	currentLightboxImage = 0,
	lightboxImages = [],
	currentMonth = new Date().getMonth(),
	currentYear = new Date().getFullYear();

function updateCopyrightYear() {
	let e = document.getElementById("current-year");
	e && (e.textContent = new Date().getFullYear())
}

function checkExistingConsent() {
	let e = localStorage.getItem("cookieConsent");
	"accepted" === e && "function" == typeof gtag && gtag("consent", "update", {
		ad_storage: "granted",
		ad_user_data: "granted",
		ad_personalization: "granted",
		analytics_storage: "granted"
	})
}

function initNavigation() {
	let e = document.querySelector(".nav-toggle"),
		t = document.querySelector(".nav-menu");
	e && t && e.addEventListener("click", function() {
		t.classList.toggle("active"), e.classList.toggle("active")
	}), document.addEventListener("click", function(i) {
		i.target.closest(".navbar") || (t?.classList.remove("active"), e?.classList.remove("active"))
	}), document.querySelectorAll('a[href^="#"]').forEach(e => {
		e.addEventListener("click", function(e) {
			e.preventDefault();
			let t = document.querySelector(this.getAttribute("href"));
			t && t.scrollIntoView({
				behavior: "smooth",
				block: "start"
			})
		})
	})
}

function initCookieBanner() {
	let e = document.getElementById("cookie-banner"),
		t = document.getElementById("cookie-accept"),
		i = document.getElementById("cookie-decline");
	e && (localStorage.getItem("cookieConsent") || setTimeout(() => {
		e.classList.add("show")
	}, 1e3), t?.addEventListener("click", function() {
		localStorage.setItem("cookieConsent", "accepted"), e.classList.remove("show"), "function" == typeof gtag && gtag("consent", "update", {
			ad_storage: "granted",
			ad_user_data: "granted",
			ad_personalization: "granted",
			analytics_storage: "granted"
		})
	}), i?.addEventListener("click", function() {
		localStorage.setItem("cookieConsent", "declined"), e.classList.remove("show")
	}))
}

function initFAQ() {
	let e = document.querySelectorAll(".faq-item");
	e.forEach(t => {
		let i = t.querySelector(".faq-question");
		i?.addEventListener("click", function() {
			let i = t.classList.contains("active");
			e.forEach(e => {
				e !== t && e.classList.remove("active")
			}), t.classList.toggle("active", !i)
		})
	})
}

function initGallery() {
	let e = document.querySelectorAll(".gallery-item"),
		t = document.querySelector(".lightbox"),
		i = document.querySelector(".lightbox-image"),
		n = document.querySelector(".lightbox-close"),
		o = document.querySelector(".lightbox-prev"),
		a = document.querySelector(".lightbox-next");
	if (t) {
		function r() {
			if (0 === lightboxImages.length) return;
			let e = lightboxImages[currentLightboxImage];
			i.src = e.src, i.alt = e.alt, t.classList.add("active"), document.body.style.overflow = "hidden"
		}

		function l() {
			t.classList.remove("active"), document.body.style.overflow = ""
		}

		function s() {
			currentLightboxImage = (currentLightboxImage - 1 + lightboxImages.length) % lightboxImages.length, r()
		}

		function c() {
			currentLightboxImage = (currentLightboxImage + 1) % lightboxImages.length, r()
		}
		lightboxImages = Array.from(e).map(e => {
			let t = e.querySelector("img");
			return {
				src: t.src,
				alt: t.alt
			}
		}), e.forEach((e, t) => {
			e.addEventListener("click", function() {
				currentLightboxImage = t, r()
			})
		}), n?.addEventListener("click", l), o?.addEventListener("click", s), a?.addEventListener("click", c), t.addEventListener("click", function(e) {
			e.target === t && l()
		}), document.addEventListener("keydown", function(e) {
			if (t.classList.contains("active")) switch (e.key) {
				case "Escape":
					l();
					break;
				case "ArrowLeft":
					s();
					break;
				case "ArrowRight":
					c()
			}
		})
	}
	let d = document.querySelectorAll(".video-item"),
		u = document.getElementById("video-lightbox"),
		g = document.getElementById("video-player"),
		m = document.querySelector(".video-lightbox-close"),
		f = document.getElementById("video-lightbox-title"),
		p = document.getElementById("video-lightbox-desc");

	function h() {
		u && g && (u.classList.remove("active"), g.pause(), g.src = "", document.body.style.overflow = "")
	}
	d.forEach(e => {
		e.setAttribute("tabindex", "0"), e.addEventListener("click", function(t) {
			t.preventDefault();
			let i = e.getAttribute("data-video"),
				n = e.querySelector(".video-info h3")?.textContent || "",
				o = e.querySelector(".video-info p")?.textContent || "";
			i ? (g.src = i, g.currentTime = 0, g.play()) : g.src = "", f.textContent = n, p.textContent = o, u.classList.add("active"), u.focus(), document.body.style.overflow = "hidden"
		}), e.addEventListener("keydown", function(t) {
			("Enter" === t.key || " " === t.key) && (t.preventDefault(), e.click())
		})
	}), m && m.addEventListener("click", h), u?.addEventListener("click", function(e) {
		e.target === u && h()
	}), document.addEventListener("keydown", function(e) {
		u && u.classList.contains("active") && "Escape" === e.key && h()
	})
}

function initForms() {
	let e = document.querySelectorAll("form");
	e.forEach(e => {
		"loginForm" !== e.id && e.addEventListener("submit", function(t) {
			t.preventDefault();
			let i = new FormData(e),
				n = e.dataset.type || "contact";
			if (!validateForm(e)) return;
			let o = e.querySelector('input[name="password"]');
			if (o && ("register" === n || "registration" === n)) {
				let a = validatePassword(o.value);
				if (!a.isValid) {
					showNotification("Password non valida: " + a.errors.join(", "), "error");
					return
				}
			}
			switch (n) {
				case "login":
					handleLoginForm(i);
					break;
				case "registration":
					handleRegistrationForm(i)
			}
		})
	});
	let t = document.querySelectorAll('input[name="password"]');
	t.forEach(e => {
		let t = e.closest("form"),
			i = t?.getAttribute("data-form-type");
		if ("register" === i || "registration" === i || t?.id === "register-form" || t?.classList.contains("register-form")) {
			let n = e.form.querySelector('input[name="confirmPassword"], input[name="confirm_password"], input[name="passwordConfirm"]');
			attachPasswordValidation(e, n)
		}
	})
}

function validateForm(e) {
	let t = e.querySelectorAll("[required]"),
		i = !0;
	t.forEach(e => {
		e.value.trim() ? e.classList.remove("error") : (e.classList.add("error"), i = !1)
	});
	let n = e.querySelectorAll('input[type="email"]');
	return n.forEach(e => {
		e.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.value) && (e.classList.add("error"), i = !1)
	}), i
}

function validatePassword(e) {
	let t = [];
	return e.length < 8 && t.push("La password deve essere di almeno 8 caratteri"), /[a-z]/.test(e) || t.push("La password deve contenere almeno una lettera minuscola"), /[A-Z]/.test(e) || t.push("La password deve contenere almeno una lettera maiuscola"), /\d/.test(e) || t.push("La password deve contenere almeno un numero"), /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(e) || t.push("La password deve contenere almeno un simbolo (!@#$%^&* etc.)"), {
		isValid: 0 === t.length,
		errors: t,
		strength: calculatePasswordStrength(e)
	}
}

function calculatePasswordStrength(e) {
	let t = 0;
	return (e.length >= 8 && (t += 1), e.length >= 12 && (t += 1), e.length >= 16 && (t += 1), /[a-z]/.test(e) && (t += 1), /[A-Z]/.test(e) && (t += 1), /\d/.test(e) && (t += 1), /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(e) && (t += 1), t <= 2) ? "weak" : t <= 4 ? "medium" : t <= 6 ? "strong" : "very-strong"
}

function attachPasswordValidation(e, t = null) {
	if (!e) return;
	let i = e.parentNode.querySelector(".password-feedback");
	i || ((i = document.createElement("div")).className = "password-feedback", e.parentNode.appendChild(i));
	let n = e.parentNode.querySelector(".password-strength");
	n || ((n = document.createElement("div")).className = "password-strength", n.innerHTML = `
			<div class="strength-bar">
				<div class="strength-fill"></div>
			</div>
			<span class="strength-text">Inserisci password</span>
		`, e.parentNode.appendChild(n)), e.addEventListener("input", function() {
		let e = this.value,
			o = validatePassword(e),
			a = n.querySelector(".strength-fill"),
			r = n.querySelector(".strength-text");
		0 === e.length ? (i.innerHTML = "", r.textContent = "Inserisci password", a.className = "strength-fill", this.classList.remove("error", "success")) : o.isValid ? (i.innerHTML = '<span class="success">✓ Password valida</span>', this.classList.remove("error"), this.classList.add("success")) : (i.innerHTML = `
				<ul class="error-list">
					${o.errors.map(e=>`<li>${e}</li>`).join("")}
				</ul>
			`, this.classList.remove("success"), this.classList.add("error"));
		let l = {
			weak: {
				width: "25%",
				color: "#f44336",
				text: "Debole"
			},
			medium: {
				width: "50%",
				color: "#ff9800",
				text: "Media"
			},
			strong: {
				width: "75%",
				color: "#4caf50",
				text: "Forte"
			},
			"very-strong": {
				width: "100%",
				color: "#2e7d32",
				text: "Molto Forte"
			}
		} [o.strength] || {
			width: "0%",
			color: "#e0e0e0",
			text: "Inserisci password"
		};
		a.style.width = l.width, a.style.backgroundColor = l.color, r.textContent = `Sicurezza: ${l.text}`, t && t.value && validatePasswordConfirmation(t, e)
	}), t && t.addEventListener("input", function() {
		let t = e.value;
		this.value, validatePasswordConfirmation(this, t)
	})
}

function validatePasswordConfirmation(e, t) {
	let i = e.value;
	if (0 === i.length) {
		e.classList.remove("error", "success");
		return
	}
	i === t ? (e.classList.remove("error"), e.classList.add("success")) : (e.classList.remove("success"), e.classList.add("error"))
}

function handleLoginForm(e) {
	let t = e.get("email"),
		i = e.get("password");
	if (!t || !i) {
		showNotification("Email e password sono obbligatori", "error");
		return
	}
	currentUser = {
		email: t,
		name: "Socio"
	}, localStorage.setItem("currentUser", JSON.stringify(currentUser)), showNotification("Login effettuato con successo!", "success"), showMembersContent()
}

function handleRegistrationForm(e) {
	let t = e.get("name") || e.get("nome"),
		i = e.get("email"),
		n = e.get("password"),
		o = e.get("confirm-password"),
		a = e.get("surname") || e.get("cognome");
	e.get("phone") || e.get("telefono");
	let r = e.get("privacy");
	if (!i || !n || !t || !a) {
		showNotification("Tutti i campi obbligatori devono essere compilati", "error");
		return
	}
	let l = validatePassword(n);
	if (!l.isValid) {
		showNotification("Password non valida: " + l.errors.join(", "), "error");
		return
	}
	if (n !== o) {
		showNotification("Le password non coincidono", "error");
		return
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i)) {
		showNotification("Formato email non valido", "error");
		return
	}
	if (!r) {
		showNotification("\xc8 necessario accettare la privacy policy", "error");
		return
	}
	showNotification("Registrazione completata! Controlla la tua email per verificare l'account.", "success"), setTimeout(() => {
		window.location.href = "login.html"
	}, 2e3)
}

function handleNewsletterForm(e) {
	e.get("email"), showNotification("Iscrizione alla newsletter completata!", "success")
}

function showMembersContent() {
	let e = document.getElementById("members-content"),
		t = document.getElementById("auth-section");
	e && t && (t.style.display = "none", e.style.display = "block", document.getElementById("events-calendar") && initMembersCalendar())
}

function initMemberArea() {
	let e = document.getElementById("login-form"),
		t = document.getElementById("register-form"),
		i = document.getElementById("show-register"),
		n = document.getElementById("show-login"),
		o = document.getElementById("change-email-btn"),
		a = document.getElementById("email-change-form"),
		r = document.getElementById("password-change-form"),
		l = document.getElementById("profile-edit-form"),
		s = document.getElementById("update-email-form"),
		c = document.getElementById("cancel-email-btn"),
		d = document.getElementById("resend-email-verification-btn");
	o && a && o.addEventListener("click", function() {
		a.style.display = "block", r && (r.style.display = "none"), l && (l.style.display = "none");
		let e = document.getElementById("current-email");
		e && currentUser && currentUser.email && (e.value = currentUser.email)
	}), d && d.addEventListener("click", async function() {
		let e = document.getElementById("new-email").value.trim();
		if (!e) {
			showNotification("Inserisci prima la nuova email per poter reinviare la verifica.", "error");
			return
		}
		try {
			if ("undefined" == typeof supabaseClient) {
				showNotification("Supabase non inizializzato.", "error");
				return
			}
			let {
				error: t
			} = await supabaseClient.auth.resend({
				type: "email_change",
				email: e
			});
			t ? showNotification("Errore nell'invio della mail di verifica: " + t.message, "error") : showNotification("Email di verifica reinviata! Controlla la casella di posta.", "success")
		} catch (i) {
			showNotification("Errore imprevisto: " + i.message, "error")
		}
	}), c && a && c.addEventListener("click", function() {
		a.style.display = "none"
	}), s && s.addEventListener("submit", async function(e) {
		e.preventDefault();
		let t = document.getElementById("new-email").value.trim(),
			i = document.getElementById("confirm-new-email").value.trim();
		if (!t || !i) {
			showNotification("Inserisci la nuova email e la conferma", "error");
			return
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) {
			showNotification("Formato email non valido", "error");
			return
		}
		if (t !== i) {
			showNotification("Le email non coincidono", "error");
			return
		}
		try {
			if ("undefined" == typeof supabaseClient) {
				showNotification("Supabase non inizializzato.", "error");
				return
			}
			let {
				error: n
			} = await supabaseClient.auth.updateUser({
				email: t
			});
			n ? showNotification("Errore durante la richiesta di cambio email: " + n.message, "error") : showNotification("Controlla la nuova casella email per confermare il cambio. Il cambio sar\xe0 effettivo solo dopo la conferma!", "success")
		} catch (o) {
			showNotification("Errore imprevisto: " + o.message, "error")
		}
	}), i && i.addEventListener("click", function(i) {
		i.preventDefault(), e.style.display = "none", t.style.display = "block"
	}), n && n.addEventListener("click", function(i) {
		i.preventDefault(), t.style.display = "none", e.style.display = "block"
	}), checkUserSession()
}

function checkUserSession() {
	let e = localStorage.getItem("currentUser");
	e && (currentUser = JSON.parse(e), showMembersContent())
}

function logout() {
	currentUser = null, localStorage.removeItem("currentUser");
	let e = document.getElementById("members-content"),
		t = document.getElementById("login-form");
	e && t && (e.style.display = "none", t.style.display = "block"), showNotification("Logout effettuato con successo", "info")
}

function initCalendar() {
	let e = document.getElementById("calendar-grid");
	if (!e) return;
	renderCalendar();
	let t = document.getElementById("calendar-prev"),
		i = document.getElementById("calendar-next");
	t?.addEventListener("click", function() {
		--currentMonth < 0 && (currentMonth = 11, currentYear--), renderCalendar()
	}), i?.addEventListener("click", function() {
		++currentMonth > 11 && (currentMonth = 0, currentYear++), renderCalendar()
	})
}

function initMembersCalendar() {
	initCalendar(), loadEvents()
}

function renderCalendar() {
	let e = document.getElementById("calendar-grid"),
		t = document.getElementById("calendar-month");
	if (!e) return;
	t && (t.textContent = `${["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"][currentMonth]} ${currentYear}`), e.innerHTML = "", ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"].forEach(t => {
		let i = document.createElement("div");
		i.className = "calendar-day-header", i.textContent = t, e.appendChild(i)
	});
	let i = new Date(currentYear, currentMonth, 1).getDay(),
		n = new Date(currentYear, currentMonth + 1, 0).getDate();
	for (let o = 0; o < i; o++) {
		let a = document.createElement("div");
		a.className = "calendar-day", e.appendChild(a)
	}
	for (let r = 1; r <= n; r++) {
		let l = document.createElement("div");
		l.className = "calendar-day", l.textContent = r, hasEvent(r) && (l.classList.add("has-event"), l.addEventListener("click", () => showEventDetails(r))), e.appendChild(l)
	}
}

function hasEvent(e) {
	return [5, 12, 18, 25].includes(e)
}

function showEventDetails(e) {
	showNotification(`${e} ${getMonthName(currentMonth)}: ${{5:"Riunione mensile del direttivo",12:"Evento di raccolta fondi",18:"Conferenza sulla storia locale",25:"Festa di Santa Barbara"}[e]||"Evento"}`, "info")
}

function getMonthName(e) {
	return ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"][e]
}

function loadEvents() {}

function initSocialFeeds() {}

function showNotification(e, t = "info") {
	if (window.notify) switch (t) {
		case "success":
			return window.notify.success(e);
		case "error":
		case "danger":
			return window.notify.error(e);
		case "warning":
			return window.notify.warning(e);
		default:
			return window.notify.info(e)
	}
	let i = document.createElement("div");
	if (i.className = `notification notification-${t}`, i.innerHTML = `
		<div class="notification-content">
			<span class="notification-message">${e}</span>
			<button class="notification-close">&times;</button>
		</div>
	`, !document.querySelector("#notification-styles")) {
		let n = document.createElement("style");
		n.id = "notification-styles", n.textContent = `
			.notification {
				position: fixed;
				top: 20px;
				right: 20px;
				background: white;
				border-radius: 5px;
				box-shadow: 0 4px 20px rgba(0,0,0,0.15);
				z-index: 1001;
				max-width: 400px;
				transform: translateX(100%);
				transition: transform 0.3s ease;
			}
			.notification.show {
				transform: translateX(0);
			}
			.notification-success {
				border-left: 4px solid #28a745;
			}
			.notification-error {
				border-left: 4px solid #dc3545;
			}
			.notification-info {
				border-left: 4px solid #17a2b8;
			}
			.notification-content {
				padding: 15px;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.notification-close {
				background: none;
				border: none;
				font-size: 18px;
				cursor: pointer;
				margin-left: 10px;
			}
		`, document.head.appendChild(n)
	}
	document.body.appendChild(i), setTimeout(() => {
		i.classList.add("show")
	}, 100), setTimeout(() => {
		hideNotification(i)
	}, 5e3), i.querySelector(".notification-close").addEventListener("click", () => {
		hideNotification(i)
	})
}

function hideNotification(e) {
	e.classList.remove("show"), setTimeout(() => {
		e.remove()
	}, 300)
}

function loadFAQ() {
	fetch("data/faq.json").then(e => e.json()).then(e => {
		let t = document.getElementById("faq-container");
		t && (t.innerHTML = "", e.forEach(e => {
			let i = createFAQElement(e.question, e.answer);
			t.appendChild(i)
		}), initFAQ())
	}).catch(e => {})
}

function createFAQElement(e, t) {
	let i = document.createElement("div");
	return i.className = "faq-item", i.innerHTML = `
		<button class="faq-question">
			${e}
			<span class="faq-icon">▼</span>
		</button>
		<div class="faq-answer">
			<p>${t}</p>
		</div>
	`, i
}

function initVideoCarousel() {
	function e(e) {
		e < 0 && (e = videoList.length - 1), e >= videoList.length && (e = 0), currentVideoIndex = e, overlayVideo.src = videoList[currentVideoIndex], overlayVideo.currentTime = 0, overlayVideo.play().catch(e => {})
	}

	function t() {
		videoOverlay.classList.remove("active"), overlayVideo.pause(), overlayVideo.src = "", document.body.style.overflow = "auto", swiper.autoplay.start()
	}
}

function toggleTimelineExpand(e) {
	let t = e.nextElementSibling,
		i = t.classList.contains("show");
	i ? (t.classList.remove("show"), e.innerHTML = "Scopri di pi\xf9 ▼", e.classList.remove("expanded")) : (t.classList.add("show"), e.innerHTML = "Mostra meno ▲", e.classList.add("expanded"))
}

function initTimeline() {
	let e = document.querySelectorAll(".timeline-item");
	if (e.length > 0) {
		let t = new IntersectionObserver(e => {
			e.forEach(e => {
				e.isIntersecting && e.target.classList.add("active")
			})
		}, {
			threshold: .3
		});
		e.forEach((e, i) => {
			e.style.transitionDelay = `${.2*i}s`, t.observe(e)
		});
		let i = document.querySelectorAll(".timeline-icon");
		i.forEach(e => {
			e.addEventListener("click", () => {
				let t = e.closest(".timeline-item"),
					i = t.querySelector(".expand-btn");
				i && !i.classList.contains("expanded") && i.click()
			})
		})
	}
}

function renderUserBar() {
	let e = document.getElementById("user-bar");

	function t() {
		let e = localStorage.getItem("cookieConsent"),
			t = confirm("Gestione Cookie:\n\nCookie Analytics (Google Analytics): " + ("accepted" === e ? "ATTIVATI" : "DISATTIVATI") + "\n\nVuoi modificare le impostazioni?\n\nOK = Attiva Analytics\nAnnulla = Disattiva Analytics");
		t ? (localStorage.setItem("cookieConsent", "accepted"), "function" == typeof gtag && gtag("consent", "update", {
			analytics_storage: "granted"
		}), showNotification("Cookie analytics attivati. La pagina verr\xe0 ricaricata.", "success"), setTimeout(() => location.reload(), 1500)) : (localStorage.setItem("cookieConsent", "denied"), "function" == typeof gtag && gtag("consent", "update", {
			analytics_storage: "denied"
		}), showNotification("Cookie analytics disattivati. La pagina verr\xe0 ricaricata.", "info"), setTimeout(() => location.reload(), 1500))
	}
	e && (JSON.parse(localStorage.getItem("currentUser")), window.location.pathname.endsWith("area-soci.html"), document.addEventListener("DOMContentLoaded", renderUserBar), document.addEventListener("DOMContentLoaded", function() {
		document.getElementById("faq-container") && loadFAQ()
	}), window.logout = logout, window.showNotification = showNotification, window.manageCookies = t, window.cookieConsent = {
		open: function() {
			t()
		}
	})
}

function initBidVertiserAds() {
	var e, t, i, n, o, a, r, l, s, c;
	document.getElementById("ntv_2101043") && (e = document, (t = {
		bvwidgetid: "ntv_2101043",
		bvlinksownid: 2101043,
		rows: 1,
		cols: 2,
		textpos: "below",
		imagewidth: 225,
		mobilecols: 2,
		cb: new Date().getTime()
	}).bvwidgetid = "ntv_2101043" + t.cb, e.getElementById("ntv_2101043").id = t.bvwidgetid, i = Object.keys(t).reduce(function(e, i) {
		return e.push(i + "=" + encodeURIComponent(t[i])), e
	}, []).join("&"), (n = e.createElement("script")).type = "text/javascript", n.async = !0, o = "https:" == document.location.protocol ? "https" : "http", n.src = o + "://cdn.hyperpromote.com/bidvertiser/tags/active/bdvws.js?" + i, e.getElementById(t.bvwidgetid).appendChild(n)), document.getElementById("ntv_2101043_mobile") && (a = document, (r = {
		bvwidgetid: "ntv_2101043_mobile",
		bvlinksownid: 2101043,
		rows: 1,
		cols: 2,
		textpos: "below",
		imagewidth: 225,
		mobilecols: 1,
		cb: new Date().getTime()
	}).bvwidgetid = "ntv_2101043_mobile" + r.cb, a.getElementById("ntv_2101043_mobile").id = r.bvwidgetid, l = Object.keys(r).reduce(function(e, t) {
		return e.push(t + "=" + encodeURIComponent(r[t])), e
	}, []).join("&"), (s = a.createElement("script")).type = "text/javascript", s.async = !0, c = "https:" == document.location.protocol ? "https" : "http", s.src = c + "://cdn.hyperpromote.com/bidvertiser/tags/active/bdvws.js?" + l, a.getElementById(r.bvwidgetid).appendChild(s))
}
document.addEventListener("DOMContentLoaded", function() {
	init404Detection(), checkHashRouting(), updateCopyrightYear(), checkExistingConsent(), initNavigation(), initCookieBanner(), initFAQ(), initGallery(), initPhotoCarousel(), initVideoCarousel(), initForms(), initCalendar(), initSocialFeeds(), initMemberArea(), checkUserSession(), renderUserBar()
}), document.addEventListener("DOMContentLoaded", function() {
	setTimeout(initBidVertiserAds, 100)
});
const SUPABASE_URL = "https://ciezrbsolxpjxswdkkpo.supabase.co",
	SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZXpyYnNvbHhwanhzd2Rra3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjM1NjAsImV4cCI6MjA2ODQ5OTU2MH0.V-U8KhO8byObUW5kJ8XbLBkp9O9Efh98MdbKYFfbQJk";
async function getEventsCount() {
	try {
		let e = await fetch(`${SUPABASE_URL}/rest/v1/events?select=count`, {
			headers: {
				apikey: SUPABASE_ANON_KEY,
				Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
				"Content-Type": "application/json",
				Prefer: "count=exact"
			}
		});
		if (e.ok) {
			let t = e.headers.get("content-range");
			if (t) {
				let i = parseInt(t.split("/")[1]);
				return i || 0
			}
		}
		return 0
	} catch (n) {
		return 0
	}
}
async function getAttivitaCount() {
	try {
		let e = await fetch(`${SUPABASE_URL}/rest/v1/attivita?select=count`, {
			headers: {
				apikey: SUPABASE_ANON_KEY,
				Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
				"Content-Type": "application/json",
				Prefer: "count=exact"
			}
		});
		if (e.ok) {
			let t = e.headers.get("content-range");
			if (t) {
				let i = parseInt(t.split("/")[1]);
				return i || 0
			}
		}
		return 0
	} catch (n) {
		return 0
	}
}
async function initChiSiamoPage() {
	let e = document.querySelector(".team-member") || document.querySelector("#eventi-counter") || document.querySelector(".chi-siamo-header");
	if (!e) return;
	let t = await getEventsCount(),
		i = document.getElementById("eventi-counter");
	i && (i.dataset.target = t);
	let n = new Date().getFullYear(),
		o = document.getElementById("anni-counter");
	o && (o.dataset.target = n - 2008);
	let a = await getAttivitaCount(),
		r = document.getElementById("progetti-counter");
	r && (r.dataset.target = a);
	let l = new IntersectionObserver(e => {
		e.forEach(e => {
			if (e.isIntersecting) {
				let t = e.target,
					i = t.dataset.delay || 0;
				setTimeout(() => {
					t.style.animationDelay = i + "ms", t.classList.add("animate")
				}, i), l.unobserve(t)
			}
		})
	}, {
		threshold: .1,
		rootMargin: "0px 0px -50px 0px"
	});
	document.querySelectorAll(".animate-fade-up, .animate-slide-left, .animate-slide-right").forEach(e => {
		l.observe(e)
	});
	let s = new IntersectionObserver(e => {
			e.forEach(e => {
				if (e.isIntersecting) {
					let t = e.target.querySelectorAll(".counter");
					t.forEach(e => {
						let t = parseInt(e.dataset.target);
						! function e(t, i, n = 2e3) {
							let o = 0,
								a = i / (n / 16),
								r = setInterval(() => {
									o += a, t.textContent = Math.floor(o), o >= i && (t.textContent = i + (i >= 100 ? "+" : ""), clearInterval(r))
								}, 16)
						}(e, t)
					}), s.unobserve(e.target)
				}
			})
		}, {
			threshold: .5
		}),
		c = document.querySelector(".stats-section");
	c && s.observe(c), document.querySelectorAll('a[href^="#"]').forEach(e => {
		e.addEventListener("click", function(e) {
			e.preventDefault();
			let t = document.querySelector(this.getAttribute("href"));
			t && t.scrollIntoView({
				behavior: "smooth",
				block: "start"
			})
		})
	}), window.addEventListener("scroll", () => {
		let e = window.pageYOffset,
			t = document.querySelector(".chi-siamo-header");
		t && e < t.offsetHeight && (t.style.transform = `translateY(${.25*e}px)`)
	}), document.querySelectorAll(".enhanced-card, .value-card, .enhanced-stat").forEach((e, t) => {
		e.style.animationDelay = 100 * t + "ms"
	})
}

function showActivityDetails(e) {
	document.querySelectorAll(".activity-details").forEach(function(e) {
		e.classList.remove("active")
	});
	var t = document.getElementById(e);
	if (t && t.classList.add("active"), document.querySelectorAll(".card[onclick]").forEach(function(e) {
			e.classList.remove("card-active")
		}), "dettagli-corteo" === e) {
		let i = document.querySelector('.card[onclick*="dettagli-corteo"]');
		i && i.classList.add("card-active")
	} else if ("dettagli-tamburi" === e) {
		let n = document.querySelector('.card[onclick*="dettagli-tamburi"]');
		n && n.classList.add("card-active")
	} else if ("dettagli-inarrivo" === e) {
		let o = document.querySelector('.card[onclick*="dettagli-inarrivo"]');
		o && o.classList.add("card-active")
	}
	t && window.scrollTo({
		top: t.offsetTop - 80,
		behavior: "smooth"
	})
}
async function loadAttivita() {
	try {
		let e = await fetch(`${SUPABASE_URL}/rest/v1/attivita?select=*`, {
			headers: {
				apikey: SUPABASE_ANON_KEY,
				"Content-Type": "application/json"
			}
		});
		if (!e.ok) throw Error("Errore nel caricamento delle attivit\xe0");
		let t = await e.json();
		renderAttivita(t), renderActivityDetails(t)
	} catch (i) {
				let n = document.getElementById("attivita-container");
		n && (n.innerHTML = "<p>Errore nel caricamento delle attivit\xe0</p>")
	}
}

function renderAttivita(e) {
	let t = document.getElementById("attivita-container");
	t && (t.innerHTML = "", e.forEach((e, i) => {
		let n = document.createElement("div");
		n.className = "col-md-4 animate-fade-up", n.setAttribute("data-delay", 100 * i), n.innerHTML = `
      <div class="enhanced-card" onclick="showActivityDetails('dettagli-${e.id}')">
        <div class="card-img-container">
          <img src="${e.image_url}" alt="${e.title}" class="card-img">
          <div class="card-overlay">
            <div class="overlay-icon">${e.emoji}</div>
          </div>
        </div>
        <div class="enhanced-card-content">
          <h3>${e.title}</h3>
          <p>${e.short_description}</p>
        </div>
      </div>
    `, t.appendChild(n)
	}))
}

function renderActivityDetails(e) {
	let t = document.getElementById("activity-details-container");
	t && (t.innerHTML = "", e.forEach(e => {
		let i = document.createElement("div");
		i.id = `dettagli-${e.id}`, i.className = "activity-details";
		let n = "";
		e.photo1_url && (n += `<img src="${e.photo1_url}" alt="${e.title} foto 1" onclick="openActivityLightbox('${e.photo1_url}', '${e.title} - Foto 1')">`), e.photo2_url && (n += `<img src="${e.photo2_url}" alt="${e.title} foto 2" onclick="openActivityLightbox('${e.photo2_url}', '${e.title} - Foto 2')">`);
		let o = "";
		(e.cubital1 || e.cubital2 || e.cubital3) && (o = "<ul>", e.cubital1 && (o += `<li>${e.cubital1}</li>`), e.cubital2 && (o += `<li>${e.cubital2}</li>`), e.cubital3 && (o += `<li>${e.cubital3}</li>`), o += "</ul>"), i.innerHTML = `
      <h3>${e.title}</h3>
      <div class="activity-content">
        <div class="activity-images">
          ${n}
        </div>
        <div class="activity-text">
          <p>${e.long_description}</p>
          ${o}
        </div>
      </div>
    `, t.appendChild(i)
	}))
}

function openLightbox(e) {
	let t = document.getElementById("photo-lightbox");
	t || ((t = document.createElement("div")).id = "photo-lightbox", t.className = "photo-lightbox", t.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
        <img id="lightbox-image" src="" alt="Foto ingrandita">
      </div>
    `, document.body.appendChild(t)), document.getElementById("lightbox-image").src = e, t.style.display = "flex", document.body.style.overflow = "hidden"
}

function closeLightbox() {
	let e = document.getElementById("photo-lightbox");
	e && (e.style.display = "none", document.body.style.overflow = "auto")
}

function openActivityLightbox(e, t = "") {
	let i = document.getElementById("activity-lightbox"),
		n = document.getElementById("lightbox-image"),
		o = document.querySelector("#activity-lightbox .lightbox-caption");
	i && n && (n.src = e, n.alt = t, o && (o.textContent = t), i.classList.add("active"), document.body.style.overflow = "hidden")
}

function closeActivityLightbox() {
	let e = document.getElementById("activity-lightbox");
	e && (e.classList.remove("active"), document.body.style.overflow = "")
}
async function initAttivitaPage() {
	let e = document.getElementById("attivita-container") || document.querySelector(".activity-details");
	if (!e) return;
	await loadAttivita(), document.addEventListener("click", function(e) {
		e.target.classList.contains("photo-lightbox") && closeLightbox()
	}), document.addEventListener("keydown", function(e) {
		"Escape" === e.key && closeLightbox()
	}), window.openLightbox = openLightbox, window.closeLightbox = closeLightbox, window.openActivityLightbox = openActivityLightbox, window.closeActivityLightbox = closeActivityLightbox, window.showActivityDetails = showActivityDetails;
	let t = document.getElementById("activity-lightbox");
	if (t) {
		let i = t.querySelector(".lightbox-close");
		i && i.addEventListener("click", closeActivityLightbox), t.addEventListener("click", function(e) {
			e.target === t && closeActivityLightbox()
		}), document.addEventListener("keydown", function(e) {
			"Escape" === e.key && t.classList.contains("active") && closeActivityLightbox()
		})
	}
	let n = new IntersectionObserver(e => {
		e.forEach(e => {
			if (e.isIntersecting) {
				let t = e.target,
					i = t.dataset.delay || 0;
				setTimeout(() => {
					t.style.animationDelay = i + "ms", t.classList.add("animate")
				}, i), n.unobserve(t)
			}
		})
	}, {
		threshold: .1,
		rootMargin: "0px 0px -50px 0px"
	});
	document.querySelectorAll(".animate-fade-up").forEach(e => {
		n.observe(e)
	}), document.querySelectorAll(".enhanced-card").forEach(e => {
		e.addEventListener("mouseenter", function() {
			this.classList.contains("card-active") || (this.style.transform = "translateY(-15px) scale(1.03)")
		}), e.addEventListener("mouseleave", function() {
			this.classList.contains("card-active") || (this.style.transform = "translateY(0) scale(1)")
		})
	}), window.addEventListener("scroll", () => {
		let e = window.pageYOffset,
			t = document.querySelector(".page-header");
		t && (t.style.transform = `translateY(${.3*e}px)`)
	});
	let o = window.showActivityDetails;
	window.showActivityDetails = function(e) {
		document.querySelectorAll(".enhanced-card").forEach(e => {
			e.classList.remove("card-active"), e.style.transform = ""
		}), o(e);
		let t = null;
		"dettagli-corteo" === e ? t = document.querySelector('.enhanced-card[onclick*="dettagli-corteo"]') : "dettagli-tamburi" === e ? t = document.querySelector('.enhanced-card[onclick*="dettagli-tamburi"]') : "dettagli-inarrivo" === e && (t = document.querySelector('.enhanced-card[onclick*="dettagli-inarrivo"]')), t && (t.classList.add("card-active"), t.style.transform = "translateY(-15px) scale(1.05)"), setTimeout(() => {
			let t = document.getElementById(e);
			t && t.classList.contains("active") && (t.style.animation = "fadeIn 0.6s ease, slideUp 0.6s ease", t.style.transform = "translateY(0)")
		}, 100)
	}, document.querySelectorAll(".enhanced-card").forEach((e, t) => {
		e.style.animationDelay = 100 * t + "ms"
	})
}
document.addEventListener("DOMContentLoaded", function() {
	initChiSiamoPage()
}), document.addEventListener("DOMContentLoaded", function() {
	initChiSiamoPage(), initAttivitaPage(), initEventiPage(), initGalleriaPage(), initFaqPage(), initPartnerPage(), initPrivacyPage()
});
// Single global Supabase client instance
window.globalSupabaseClient = null;

// Initialize once and only once
function initializeSupabaseClient() {
	if (!window.globalSupabaseClient && typeof supabase !== 'undefined' && supabase.createClient) {
		const { createClient } = supabase;
		window.globalSupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
	}
	return window.globalSupabaseClient;
}

// Initialize when DOM is ready and supabase is available
document.addEventListener('DOMContentLoaded', function() {
	if (typeof supabase !== 'undefined') {
		initializeSupabaseClient();
	}
});

// Getter function that never creates, only returns existing
function getSupabaseClient() {
	return window.globalSupabaseClient || initializeSupabaseClient();
}

// Expose globally
window.getSupabaseClient = getSupabaseClient;
async function initEventiPage() {
	let e = document.getElementById("public-events-list") || document.getElementById("future-events-list") || document.querySelector(".eventi-header");
	e && (await loadPublicEvents(), setupEventiParallax(), setupEventiModal(), checkLoggedInUser(), addEventiStyles(), setTimeout(() => {
		document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-slide-right").forEach(e => {
			e.classList.add("animate")
		})
	}, 100))
}
async function loadPublicEvents() {
	const supabaseClient = getSupabaseClient();
	if (!supabaseClient) return;
	document.getElementById("public-events-list");
	let e = document.getElementById("future-events-list"),
		t = document.getElementById("past-events-list");
	e && (e.innerHTML = '<div style="text-align:center;color:#E10600;font-size:1.1em;"><span class="loading-spinner"></span>Caricamento eventi...</div>'), t && (t.innerHTML = "");
	let {
		data: i,
		error: n
	} = await supabaseClient.from("events").select("*").eq("is_public", !0).order("event_date", {
		ascending: !0
	});
	if (n) {
		e && (e.innerHTML = `<div style="color:red;text-align:center;">Errore nel caricamento eventi: ${n.message}</div>`);
		return
	}
	if (!i || 0 === i.length) {
		e && (e.innerHTML = '<div style="text-align:center;color:#444;">Nessun evento pubblico disponibile al momento.</div>');
		return
	}
	let o = new Date,
		a = [],
		r = [];
	i.forEach(e => {
		let t = e.event_date ? new Date(e.event_date) : null;
		t && t.setHours(0, 0, 0, 0) >= o.setHours(0, 0, 0, 0) ? a.push(e) : r.push(e)
	}), a.sort((e, t) => new Date(e.event_date) - new Date(t.event_date)), r.sort((e, t) => new Date(t.event_date) - new Date(e.event_date)), e && (e.innerHTML = a.length ? a.map(e => renderEventCard(e, !1)).join("") : '<div style="text-align:center;color:#444;">Nessun evento futuro.</div>'), t && (t.innerHTML = r.length ? renderPastEventsByYear(r) : '<div style="text-align:center;color:#888;">Nessun evento passato.</div>'), setTimeout(() => {
		initializeEventiAnimations(), setupEventiHoverEffects(), updateYearEventCounts(), setupEventCountObserver()
	}, 100)
}

function renderEventCard(e, t = !1) {
	let i = e.image_url ? `
    <div class="card-img-container" onclick="event.stopPropagation(); openImageLightbox('${e.image_url}');" style="cursor: pointer;">
      <img src="${e.image_url}" alt="Locandina evento" class="card-img" ${t?'style="filter:grayscale(0.7) contrast(0.95);"':""}>
      <div class="card-overlay">
        <span style="color: white; font-weight: 600;">🔍 Ingrandisci immagine</span>
      </div>
      ${t?"":'<div class="event-date-badge">'+(e.event_date?new Date(e.event_date).getDate()+"/"+(new Date(e.event_date).getMonth()+1):"TBD")+"</div>"}
    </div>
  ` : "",
		n = e.event_date ? new Date(e.event_date).toLocaleDateString("it-IT") : "",
		o = e.event_time ? `Ore ${e.event_time}` : "",
		a = e.location ? `<span style="font-size:1.05em;">${e.location}</span>` : "",
		s = e.created_at && new Date - new Date(e.created_at) < 6048e5;
	return `
    <article class="card enhanced-card event-card ${t?"past-event":""} ${s&&!t?"pulse-glow":""}" data-event-id="${e.id}" onclick="openEventModal('${e.id}')" style="cursor: pointer;">
      ${i}
      <div class="card-content">
        <h3 style="color:${t?"#b0b0b0":"#E10600"};font-size:1.4em;margin-bottom:0.8em;font-weight:600;">${e.title||"Evento"}</h3>
        <div style="font-size:1.1em;color:${t?"#888":"#333"};margin-bottom:1em;">
          <div style="margin-bottom:0.5em;"><strong style="color:${t?"#999":"#E10600"};">${n}</strong></div>
          ${o?`<div style="font-size:1em;color:${t?"#b0b0b0":"#666"};margin-bottom:0.5em;">${o}</div>`:""}
          ${a?`<div style="color:${t?"#aaa":"#555"};">${a}</div>`:""}
        </div>
        <p style="font-size:1em;color:${t?"#aaa":"#555"};line-height:1.6;margin-bottom:1em;">${e.description||""}</p>
        ${e.external_link&&!t?`<a href="${e.external_link}" target="_blank" onclick="event.stopPropagation();" style="display:inline-block;background:linear-gradient(135deg, #E10600, #FF4500);color:#fff;padding:0.6em 1.5em;border-radius:20px;font-size:1em;text-decoration:none;box-shadow:0 4px 15px rgba(225,6,0,0.3);transition:all 0.3s ease;font-weight:600;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(225,6,0,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(225,6,0,0.3)'">🔗 Info evento</a>`:""}
      </div>
    </article>
  `
}

function createImageLightbox() {
	let e = document.createElement("div");
	return e.id = "image-lightbox", e.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.9);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    overflow: hidden;
  `, e.innerHTML = `
    <div id="lightbox-container" style="position: relative; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden;">
      <img id="lightbox-img" src="" alt="Immagine evento" style="
        max-width: 95vw;
        max-height: 95vh;
        width: auto;
        height: auto;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        cursor: grab;
        transition: transform 0.3s ease;
        transform-origin: center center;
      ">
      
      <!-- Close button -->
      <button onclick="closeImageLightbox()" style="
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(225, 6, 0, 0.8);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 28px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 10001;
      " onmouseover="this.style.transform='scale(1.1)';this.style.background='#E10600'" onmouseout="this.style.transform='scale(1)';this.style.background='rgba(225, 6, 0, 0.8)'">&times;</button>
      
      <!-- Zoom controls -->
      <div id="zoom-controls" style="
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        background: rgba(0,0,0,0.7);
        padding: 10px 15px;
        border-radius: 25px;
        z-index: 10001;
      ">
        <button onclick="zoomImage(-0.2)" style="
          background: rgba(225, 6, 0, 0.8);
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        " title="Riduci zoom">−</button>
        
        <button onclick="resetZoom()" style="
          background: rgba(225, 6, 0, 0.8);
          color: white;
          border: none;
          border-radius: 20px;
          padding: 8px 12px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        " title="Reset zoom">RESET</button>
        
        <button onclick="zoomImage(0.2)" style="
          background: rgba(225, 6, 0, 0.8);
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        " title="Aumenta zoom">+</button>
      </div>
      
      <!-- Zoom info -->
      <div id="zoom-info" style="
        position: absolute;
        top: 20px;
        left: 20px;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 8px 12px;
        border-radius: 15px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10001;
      ">100%</div>
    </div>
  `, document.body.appendChild(e), setupLightboxInteractions(), e
}

function setupLightboxInteractions() {
	window.currentZoom = 1, window.isDragging = !1, window.dragStart = {
		x: 0,
		y: 0
	}, window.imgPosition = {
		x: 0,
		y: 0
	};
	let e = document.getElementById("lightbox-img"),
		t = document.getElementById("lightbox-container"),
		i = document.getElementById("zoom-info");
	if (!e || !t || !i) return;

	function n() {
		e.style.transform = `translate(${window.imgPosition.x}px, ${window.imgPosition.y}px) scale(${window.currentZoom})`, e.style.cursor = window.currentZoom > 1 ? "grab" : "default"
	}

	function o() {
		i.textContent = Math.round(100 * window.currentZoom) + "%"
	}
	window.zoomImage = function(e) {
		window.currentZoom = Math.max(.5, Math.min(5, window.currentZoom + e)), n(), o()
	}, window.resetZoom = function() {
		window.currentZoom = 1, window.imgPosition = {
			x: 0,
			y: 0
		}, n(), o()
	}, t.addEventListener("wheel", function(e) {
		e.preventDefault();
		let t = e.deltaY > 0 ? -.1 : .1;
		window.zoomImage(t)
	}), e.addEventListener("dblclick", function(e) {
		if (1 === window.currentZoom) window.currentZoom = 2;
		else {
			window.resetZoom();
			return
		}
		n(), o()
	}), e.addEventListener("mousedown", function(t) {
		window.currentZoom > 1 && (window.isDragging = !0, e.style.cursor = "grabbing", window.dragStart.x = t.clientX - window.imgPosition.x, window.dragStart.y = t.clientY - window.imgPosition.y, t.preventDefault())
	}), document.addEventListener("mousemove", function(e) {
		window.isDragging && window.currentZoom > 1 && (window.imgPosition.x = e.clientX - window.dragStart.x, window.imgPosition.y = e.clientY - window.dragStart.y, n())
	}), document.addEventListener("mouseup", function() {
		window.isDragging && (window.isDragging = !1, e.style.cursor = window.currentZoom > 1 ? "grab" : "default")
	});
	let a = document.getElementById("image-lightbox");
	a && a.addEventListener("click", function(e) {
		e.target === a && closeImageLightbox()
	}), document.addEventListener("keydown", function(e) {
		"Escape" === e.key && a && "none" !== a.style.display && closeImageLightbox()
	})
}

function initializeEventiAnimations() {
	let e = new IntersectionObserver(t => {
		t.forEach(t => {
			if (t.isIntersecting) {
				let i = t.target,
					n = i.dataset.delay || 0;
				setTimeout(() => {
					i.style.animationDelay = n + "ms", i.classList.add("animate")
				}, n), e.unobserve(i)
			}
		})
	}, {
		threshold: .1,
		rootMargin: "0px 0px -50px 0px"
	});
	document.querySelectorAll(".animate-slide-up, .animate-slide-left, .animate-slide-right, .event-card").forEach((t, i) => {
		t.dataset.delay = 100 * i, e.observe(t)
	})
}

function setupEventiHoverEffects() {
	document.querySelectorAll(".event-card").forEach((e, t) => {
		e.style.animationDelay = 150 * t + "ms", e.addEventListener("mouseenter", function() {
			let e = document.createElement("div");
			e.style.cssText = `
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: radial-gradient(circle, rgba(225,6,0,0.1) 0%, transparent 70%);
        pointer-events: none;
        animation: ripple 0.6s ease-out;
        border-radius: 20px;
      `, this.appendChild(e), setTimeout(() => {
				e.parentNode && e.remove()
			}, 600)
		})
	})
}

function setupEventiParallax() {
	window.addEventListener("scroll", () => {
		let e = window.pageYOffset,
			t = document.querySelector(".eventi-header");
		t && (t.style.transform = `translateY(${.5*e}px)`)
	})
}

function checkLoggedInUser() {
	let e = localStorage.getItem("currentUser");
	if (e) {
		let t = document.getElementById("login-required"),
			i = document.getElementById("members-calendar"),
			n = document.getElementById("members-events");
		t && (t.style.display = "none"), i && (i.style.display = "block"), n && (n.style.display = "block")
	}
}

function addEventiStyles() {
	let e = document.createElement("style");
	e.textContent = `
    @keyframes ripple {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(1); opacity: 0; }
    }
  `, document.head.appendChild(e)
}

function showNotification(e, t = "info", i = 3e3) {
	let n = document.querySelectorAll(".ux-notification");
	n.forEach(e => e.remove());
	let o = document.createElement("div");
	o.className = "ux-notification";
	let a, r, l;
	switch (t) {
		case "success":
			a = "linear-gradient(135deg, #4CAF50, #45a049)", r = "white", l = "✅";
			break;
		case "error":
			a = "linear-gradient(135deg, #E10600, #d32f2f)", r = "white", l = "❌";
			break;
		case "warning":
			a = "linear-gradient(135deg, #FF9800, #f57c00)", r = "white", l = "⚠️";
			break;
		default:
			a = "linear-gradient(135deg, #2196F3, #1976d2)", r = "white", l = "ℹ️"
	}
	o.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${a};
    color: ${r};
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    z-index: 10001;
    font-weight: 500;
    font-size: 0.95rem;
    max-width: 350px;
    transform: translateX(400px);
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    cursor: pointer;
    backdrop-filter: blur(10px);
  `, o.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="font-size: 1.2rem;">${l}</span>
      <span>${e}</span>
    </div>
  `, document.body.appendChild(o), requestAnimationFrame(() => {
		o.style.transform = "translateX(0)"
	});
	let s = setTimeout(() => {
		c(o)
	}, i);

	function c(e) {
		e.style.transform = "translateX(400px)", e.style.opacity = "0", setTimeout(() => {
			e.parentNode && e.parentNode.removeChild(e)
		}, 400)
	}
	o.addEventListener("click", () => {
		clearTimeout(s), c(o)
	})
}

function setupEventiModal() {
	setTimeout(() => {
		let e = document.getElementById("close-modal"),
			t = document.getElementById("event-modal");

		function i() {
			t && (t.style.transition = "opacity 0.3s ease", t.style.opacity = "0", setTimeout(() => {
				t.style.display = "none", t.classList.remove("active"), document.body.style.overflow = ""
			}, 300))
		}
		e && (e.addEventListener("click", function() {
			i()
		}), e.addEventListener("mouseenter", function() {
			this.style.transform = "rotate(90deg) scale(1.1)", this.style.color = "#E10600"
		}), e.addEventListener("mouseleave", function() {
			this.style.transform = "rotate(0deg) scale(1)", this.style.color = "#999"
		})), t && t.addEventListener("click", function(e) {
			e.target === this && i()
		}), document.addEventListener("keydown", function(e) {
			"Escape" === e.key && t && (t.classList.contains("active") && i(), "function" == typeof closeImageLightbox && closeImageLightbox())
		})
	}, 500)
}

function initGalleriaPage() {
	if (!document.body.classList.contains("galleria-page") && !window.location.pathname.includes("galleria")) return;
		let {
		createClient: e
	} = supabase, t = e("https://ciezrbsolxpjxswdkkpo.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZXpyYnNvbHhwanhzd2Rra3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjM1NjAsImV4cCI6MjA2ODQ5OTU2MH0.V-U8KhO8byObUW5kJ8XbLBkp9O9Efh98MdbKYFfbQJk");
	async function i() {
		try {
			let e = document.getElementById("loadingPhotos"),
				i = document.getElementById("photoSwiper"),
				n = document.getElementById("photoSwiperWrapper"),
				{
					data: o,
					error: a
				} = await t.storage.from("gallery").list("foto", {
					limit: 100,
					offset: 0,
					sortBy: {
						column: "name",
						order: "asc"
					}
				});
			if (a) {
				e.innerHTML = `<p>Errore nel caricamento delle foto: ${a.message}</p>`;
				return
			}
			if (!o || 0 === o.length) {
				e.innerHTML = "<p>Nessuna foto trovata nella cartella foto/</p>";
				let {
					data: r,
					error: l
				} = await t.storage.from("gallery").list("", {
					limit: 100,
					offset: 0
				});
				r && r.length > 0 && (e.innerHTML = `<p>Trovati ${r.length} file nella root del bucket. Controlla la struttura delle cartelle.</p>`);
				return
			}
			n.innerHTML = "", e.style.display = "none", i.style.display = "block";
			let s = 0;
			for (let c = 0; c < o.length; c++) {
				let d = o[c],
					u = [".jpg", ".jpeg", ".png", ".gif", ".webp"],
					g = u.some(e => d.name.toLowerCase().endsWith(e));
				if (!g) continue;
				let {
					data: m
				} = t.storage.from("gallery").getPublicUrl(`foto/${d.name}`);
				if (m && m.publicUrl) {
					s++;
					let f = document.createElement("div");
					f.className = "swiper-slide photo-slide", f.setAttribute("data-image", m.publicUrl);
					let p = d.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
					f.innerHTML = `
            <div class="photo-thumbnail">
              <img src="${m.publicUrl}" alt="${p}" loading="lazy" onerror="this.parentElement.parentElement.style.display='none'">
            </div>
          `, n.appendChild(f)
				}
			}
			if (0 === s) {
				e.innerHTML = "<p>Nessuna foto valida trovata nella cartella</p>";
				return
			}(function e() {
				let t = document.querySelectorAll(".photo-slide").length;
				new Swiper(".photo-swiper", {
					effect: "coverflow",
					grabCursor: !0,
					centeredSlides: !0,
					slidesPerView: 3,
					spaceBetween: 30,
					loop: t >= 6,
					speed: 600,
					coverflowEffect: {
						rotate: 30,
						stretch: 0,
						depth: 200,
						modifier: 1,
						slideShadows: !0
					},
					navigation: {
						nextEl: ".photo-swiper .swiper-button-next",
						prevEl: ".photo-swiper .swiper-button-prev"
					},
					pagination: {
						el: ".photo-swiper .swiper-pagination",
						clickable: !0
					},
					breakpoints: {
						0: {
							slidesPerView: 1
						},
						768: {
							slidesPerView: 2
						},
						1200: {
							slidesPerView: 3
						}
					}
				})
			})(),
			function e() {
				let t = document.querySelectorAll(".photo-slide"),
					i = 0,
					n = Array.from(t).map(e => e.getAttribute("data-image")),
					o = document.getElementById("photo-lightbox"),
					a = o.querySelector(".lightbox-image"),
					r = o.querySelector(".lightbox-close"),
					l = o.querySelector(".photo-lightbox-prev"),
					s = o.querySelector(".photo-lightbox-next"),
					c = null,
					d = 1,
					u = !1,
					g = {
						x: 0,
						y: 0
					},
					m = {
						x: 0,
						y: 0
					},
					f = document.getElementById("zoom-info");

				function p() {
					a.style.transform = `translate(${m.x}px, ${m.y}px) scale(${d})`, a.style.cursor = d > 1 ? "grab" : "default"
				}

				function h() {
					f && (f.textContent = Math.round(100 * d) + "%")
				}

				function y(e) {
					n[e] && (i = e, d = 1, m = {
						x: 0,
						y: 0
					}, a.src = n[e], o.classList.add("active"), document.body.style.overflow = "hidden", p(), h(), function e(t, i) {
						let n = document.getElementById("imageCounter");
						n && (n.textContent = `${t+1} / ${i}`)
					}(i, n.length), document.body.addEventListener("touchmove", E, {
						passive: !1
					}), setTimeout(() => r.focus(), 50), x((i + 1) % n.length), x((i - 1 + n.length) % n.length))
				}

				function v() {
					o.classList.remove("active"), document.body.style.overflow = "", a.src = "", document.body.removeEventListener("touchmove", E)
				}

				function $() {
					y(i = (i + 1) % n.length)
				}

				function b() {
					y(i = (i - 1 + n.length) % n.length)
				}

				function E(e) {
					e.preventDefault()
				}

				function x(e) {
					let t = n[e];
					if (!t) return;
					let i = new window.Image;
					i.src = t
				}
				window.zoomImage = function(e) {
					d = Math.max(.5, Math.min(5, d + e)), p(), h()
				}, window.resetZoom = function() {
					d = 1, m = {
						x: 0,
						y: 0
					}, p(), h()
				}, t.forEach((e, t) => {
					e.addEventListener("click", e => {
						e.preventDefault(), y(t)
					})
				}), r.addEventListener("click", v), s.addEventListener("click", e => {
					e.stopPropagation(), $()
				}), l.addEventListener("click", e => {
					e.stopPropagation(), b()
				}), a.addEventListener("click", e => {
					if (d > 1) return;
					let t = a.getBoundingClientRect(),
						i = e.clientX - t.left;
					i < .3 * t.width ? b() : i > .7 * t.width && $()
				}), o.addEventListener("wheel", function(e) {
					if (!o.classList.contains("active")) return;
					e.preventDefault();
					let t = e.deltaY > 0 ? -.1 : .1;
					zoomImage(t)
				}), a.addEventListener("dblclick", function(e) {
					if (e.stopPropagation(), 1 === d) d = 2;
					else {
						resetZoom();
						return
					}
					p(), h()
				}), a.addEventListener("mousedown", function(e) {
					d > 1 && (u = !0, a.style.cursor = "grabbing", g.x = e.clientX - m.x, g.y = e.clientY - m.y, e.preventDefault())
				}), document.addEventListener("mousemove", function(e) {
					u && d > 1 && (m.x = e.clientX - g.x, m.y = e.clientY - g.y, p())
				}), document.addEventListener("mouseup", function() {
					u && (u = !1, a.style.cursor = d > 1 ? "grab" : "default")
				}), document.addEventListener("keydown", e => {
					o.classList.contains("active") && ("Escape" === e.key && v(), "ArrowRight" === e.key && $(), "ArrowLeft" === e.key && b())
				}), o.addEventListener("click", e => {
					e.target === o && v()
				});
				let w = 0,
					_ = 1;
				a.addEventListener("touchstart", e => {
					if (2 === e.touches.length) {
						let t = e.touches[0],
							i = e.touches[1];
						w = Math.hypot(i.clientX - t.clientX, i.clientY - t.clientY), _ = d, e.preventDefault()
					} else if (1 === e.touches.length) {
						if (d > 1) {
							u = !0;
							let n = e.touches[0];
							g.x = n.clientX - m.x, g.y = n.clientY - m.y
						} else c = e.touches[0].clientY
					}
				}), a.addEventListener("touchmove", e => {
					if (2 === e.touches.length) {
						e.preventDefault();
						let t = e.touches[0],
							i = e.touches[1],
							n = Math.hypot(i.clientX - t.clientX, i.clientY - t.clientY),
							o = n / w;
						d = Math.max(.5, Math.min(5, _ * o)), p(), h()
					} else if (1 === e.touches.length) {
						if (u && d > 1) {
							e.preventDefault();
							let a = e.touches[0];
							m.x = a.clientX - g.x, m.y = a.clientY - g.y, p()
						} else if (null !== c && 1 === d) {
							let r = e.touches[0].clientY - c;
							r > 60 && (v(), c = null)
						}
					}
				}), a.addEventListener("touchend", e => {
					0 === e.touches.length && (u = !1, c = null)
				})
			}(),
			function e() {
				let t = document.getElementById("photoCount"),
					i = document.querySelectorAll(".photo-slide");
				if (t && i.length > 0) {
					let n = 0,
						o = i.length,
						a = Math.ceil(o / 20),
						r = setInterval(() => {
							(n += a) >= o && (n = o, clearInterval(r)), t.textContent = n
						}, 50)
				}
			}()
		} catch (h) {
			document.getElementById("loadingPhotos").innerHTML = "<p>Errore nel caricamento delle foto</p>"
		}
	}

	function n(e, t) {
		let i = document.getElementById("videoTitle"),
			n = document.getElementById("videoCounter");
		i && (i.textContent = `Video ${e+1}`), n && (n.textContent = `${e+1} / ${t}`)
	}

	function o(e, t = 3e3) {
		let i = document.getElementById(e);
		if (!i) return;
		let n = i.querySelector(".progress-bar");
		n && (n.style.animation = "none", n.offsetHeight, n.style.animation = `progressSlide ${t/1e3}s ease-in-out`, setTimeout(() => {
			n.style.width = "100%", n.style.animation = "none", n.style.background = "linear-gradient(90deg, #28a745, #20c997)"
		}, t - 200))
	}! function e() {
		let t = new IntersectionObserver(e => {
			e.forEach(e => {
				e.isIntersecting && e.target.classList.add("visible")
			})
		}, {
			threshold: .1,
			rootMargin: "0px 0px -50px 0px"
		});
		document.querySelectorAll(".animate-on-scroll").forEach(e => {
			t.observe(e)
		})
	}(), o("loadingPhotos", 2e3), o("loadingVideos", 2500), setTimeout(() => {
		i(),
			function e() {
				let t = document.getElementById("loadingVideos"),
					i = document.getElementById("videoSwiper"),
					o = document.getElementById("videoSwiperWrapper"),
					a = Array.from({
						length: 18
					}, (e, t) => `${t+1}.mp4`);
				o.innerHTML = "", t.style.display = "none", i.style.display = "block";
				let r = 0;
				for (let l = 0; l < a.length; l++) {
					let s = a[l],
						c = `https://archive.org/download/17_20250722/${s}`,
						d = s.replace(/\.[^/.]+$/, ""),
						u = `https://ciezrbsolxpjxswdkkpo.supabase.co/storage/v1/object/public/gallery/thumbnail/${d}.png`;
					r++;
					let g = document.createElement("div");
					g.className = "swiper-slide video-slide", g.setAttribute("data-video", c);
					let m = d.replace(/[_-]/g, " ");
					g.innerHTML = `
        <div class="video-thumbnail">
          <img src="${u}" alt="${m}" loading="lazy" onerror="this.style.display='none'">
          <div class="play-button"></div>
        </div>
      `, o.appendChild(g)
				}
				if (0 === r) {
					t.innerHTML = "<p>Nessun video valido trovato su archive.org</p>";
					return
				}(function e() {
					let t = document.querySelectorAll(".video-slide").length;
					new Swiper(".video-swiper", {
							effect: "coverflow",
							grabCursor: !0,
							centeredSlides: !0,
							slidesPerView: 3,
							spaceBetween: 30,
							loop: t >= 6,
							speed: 600,
							coverflowEffect: {
								rotate: 30,
								stretch: 0,
								depth: 200,
								modifier: 1,
								slideShadows: !0
							},
							navigation: {
								nextEl: ".video-swiper .swiper-button-next",
								prevEl: ".video-swiper .swiper-button-prev"
							},
							pagination: {
								el: ".video-swiper .swiper-pagination",
								clickable: !0
							},
							breakpoints: {
								0: {
									slidesPerView: 1
								},
								768: {
									slidesPerView: 2
								},
								1200: {
									slidesPerView: 3
								}
							}
						}),
						function e() {
							let t = document.getElementById("videoOverlay"),
								i = document.getElementById("overlayVideo"),
								o = document.getElementById("closeButton"),
								a = document.querySelectorAll(".video-slide"),
								r = 0,
								l = Array.from(a).map(e => e.getAttribute("data-video"));
							a.forEach((e, o) => {
								e.addEventListener("click", a => {
									let s = e.getAttribute("data-video");
									s && (r = o, i.src = s, t.classList.add("active"), document.body.style.overflow = "hidden", n(r, l.length), setTimeout(() => {
										i.play().catch(e => {})
									}, 300))
								})
							});
							let s = document.querySelector(".video-lightbox-prev"),
								c = document.querySelector(".video-lightbox-next");

							function d(e) {
								e < 0 && (e = l.length - 1), e >= l.length && (e = 0), r = e, i.src = l[r], i.currentTime = 0, n(r, l.length), i.play().catch(e => {})
							}

							function u() {
								t.classList.remove("active"), i.pause(), i.src = "", document.body.style.overflow = "auto"
							}
							s && c && (s.addEventListener("click", function(e) {
								e.stopPropagation(), d(r - 1)
							}), c.addEventListener("click", function(e) {
								e.stopPropagation(), d(r + 1)
							})), document.addEventListener("keydown", function(e) {
								t.classList.contains("active") && ("ArrowLeft" === e.key ? d(r - 1) : "ArrowRight" === e.key ? d(r + 1) : "Escape" === e.key && u())
							}), o && o.addEventListener("click", u), t && t.addEventListener("click", function(e) {
								e.target === t && u()
							})
						}()
				})()
			}()
	}, 1e3), setTimeout(function e() {
		setTimeout(() => {
			let e = document.querySelectorAll(".video-slide");
			e.forEach(e => {
				let t = e.getAttribute("data-video");
				t && fetch(t, {
					method: "GET",
					mode: "no-cors"
				}).then(() => {}).catch(() => {})
			})
		}, 2500)
	}, 5e3)
}

function initGalleriaAnimations() {
	let e = document.querySelector(".galleria-header-particles");
	if (e)
		for (let t = 0; t < 9; t++) {
			let i = document.createElement("div");
			i.className = "galleria-particle", i.style.left = `${10+10*t}%`, i.style.animationDelay = `-${2*t}s`, e.appendChild(i)
		}
	let n = document.querySelectorAll(".photo-thumbnail, .video-thumbnail");
	n.forEach((e, t) => {
		e.style.animationDelay = `${.1*t}s`
	})
}

function initGalleriaPhotoCarousel() {
	"undefined" != typeof Swiper && new Swiper(".photo-swiper", {
		effect: "coverflow",
		grabCursor: !0,
		centeredSlides: !0,
		slidesPerView: "auto",
		spaceBetween: 30,
		loop: !0,
		speed: 800,
		coverflowEffect: {
			rotate: 20,
			stretch: 0,
			depth: 200,
			modifier: 1,
			slideShadows: !0
		},
		navigation: {
			nextEl: ".photo-nav-next",
			prevEl: ".photo-nav-prev"
		},
		pagination: {
			el: ".photo-swiper .swiper-pagination",
			type: "progressbar"
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 25
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 30
			}
		}
	})
}

function initGalleriaVideoGallery() {
	"undefined" != typeof Swiper && new Swiper(".video-swiper", {
		slidesPerView: 3,
		spaceBetween: 30,
		loop: !0,
		speed: 600,
		navigation: {
			nextEl: ".video-nav-next",
			prevEl: ".video-nav-prev"
		},
		pagination: {
			el: ".video-swiper .swiper-pagination",
			clickable: !0
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 15
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 30
			}
		}
	})
}

function initGalleriaLightbox() {
	let e = document.querySelectorAll(".photo-thumbnail");
	e.forEach((e, t) => {
		e.addEventListener("click", () => {
			openPhotoLightbox(t)
		})
	});
	let t = document.querySelectorAll(".video-thumbnail");
	t.forEach(e => {
		e.addEventListener("click", () => {
			let t = e.dataset.video;
			t && openVideoLightbox(t)
		})
	})
}

function openPhotoLightbox(e = 0) {
	let t = document.getElementById("photo-lightbox"),
		i = document.getElementById("lightbox-image"),
		n = document.querySelectorAll(".photo-thumbnail img");
	if (!t || !i || 0 === n.length) return;
	let o = e;

	function a(e) {
		e < 0 && (e = n.length - 1), e >= n.length && (e = 0), o = e, i.src = n[e].src, i.alt = n[e].alt || "Foto della galleria"
	}
	a(o), t.classList.add("active"), document.body.style.overflow = "hidden";
	let r = t.querySelector(".photo-prev"),
		l = t.querySelector(".photo-next");
	r && (r.onclick = () => a(o - 1)), l && (l.onclick = () => a(o + 1));
	let s = e => {
		"ArrowLeft" === e.key && a(o - 1), "ArrowRight" === e.key && a(o + 1), "Escape" === e.key && closeLightbox()
	};
	document.addEventListener("keydown", s), window.closeLightbox = function() {
		t.classList.remove("active"), document.body.style.overflow = "", document.removeEventListener("keydown", s)
	}
}

function openVideoLightbox(e) {
	let t = document.getElementById("video-lightbox"),
		i = document.getElementById("lightbox-video");
	t && i && (i.src = e, t.classList.add("active"), document.body.style.overflow = "hidden", window.closeVideoLightbox = function() {
		t.classList.remove("active"), i.src = "", document.body.style.overflow = ""
	})
}

function initGalleriaScrollAnimations() {
	let e = new IntersectionObserver(e => {
		e.forEach(e => {
			e.isIntersecting && e.target.classList.add("visible")
		})
	}, {
		threshold: .1,
		rootMargin: "0px 0px -100px 0px"
	});
	document.querySelectorAll(".galleria-animate-on-scroll").forEach(t => {
		e.observe(t)
	})
}

function initFaqPage() {
	(document.body.classList.contains("faq-page") || window.location.pathname.includes("faq")) && (initFaqAnimations(), initFaqCategoryFiltering(), initFaqAccordion(), initFaqParallax())
}

function initFaqAnimations() {
	let e = new IntersectionObserver(e => {
		e.forEach(e => {
			if (e.isIntersecting) {
				let t = e.target.dataset.animationDelay || 0;
				setTimeout(() => {
					e.target.classList.add("animate")
				}, 1e3 * t)
			}
		})
	}, {
		threshold: .1,
		rootMargin: "0px 0px -50px 0px"
	});
	document.querySelectorAll(".slide-up, .fade-in").forEach(t => {
		e.observe(t)
	}), setTimeout(() => {
		document.querySelectorAll(".animate-badge").forEach(e => {
			e.classList.add("animate")
		})
	}, 500), setTimeout(() => {
		document.querySelectorAll(".animate-title").forEach(e => {
			e.classList.add("animate")
		})
	}, 700), setTimeout(() => {
		document.querySelectorAll(".animate-subtitle").forEach(e => {
			e.classList.add("animate")
		})
	}, 900)
}

function initFaqCategoryFiltering() {
	let e = document.querySelectorAll(".category-btn"),
		t = document.querySelectorAll(".faq-item");
	! function e() {
		let i = {
			all: t.length,
			iscrizione: 0,
			volontariato: 0,
			eventi: 0,
			generale: 0
		};
		t.forEach(e => {
			let t = e.dataset.category;
			void 0 !== i[t] && i[t]++
		}), Object.keys(i).forEach(e => {
			let t = document.getElementById(`count-${e}`);
			t && (t.textContent = i[e])
		})
	}(), e.forEach(i => {
		i.addEventListener("click", function() {
			let i = this.dataset.category;
			e.forEach(e => {
				e.classList.remove("active"), e.style.transform = "scale(1)"
			}), this.classList.add("active"), this.style.transform = "scale(1.05)", t.forEach((e, t) => {
				"all" === i || e.dataset.category === i ? setTimeout(() => {
					e.style.display = "block", e.style.opacity = "0", e.style.transform = "translateY(20px)", setTimeout(() => {
						e.style.opacity = "1", e.style.transform = "translateY(0)", e.style.transition = "all 0.3s ease"
					}, 50)
				}, 100 * t) : (e.style.opacity = "0", e.style.transform = "translateY(-20px)", setTimeout(() => {
					e.style.display = "none"
				}, 300))
			})
		})
	})
}

function initFaqAccordion() {
	let e = document.querySelectorAll(".faq-question");
	e.forEach(t => {
		t.addEventListener("click", function() {
			let t = this.closest(".faq-item"),
				i = t.querySelector(".faq-answer"),
				n = this.querySelector(".faq-icon"),
				o = t.classList.contains("active");
			e.forEach(e => {
				let i = e.closest(".faq-item"),
					n = i.querySelector(".faq-answer"),
					o = e.querySelector(".faq-icon");
				i !== t && (i.classList.remove("active"), n.style.maxHeight = "0px", o.style.transform = "rotate(0deg)")
			}), o ? (t.classList.remove("active"), i.style.maxHeight = "0px", n.style.transform = "rotate(0deg)") : (t.classList.add("active"), i.style.maxHeight = i.scrollHeight + "px", n.style.transform = "rotate(180deg)", setTimeout(() => {
				t.scrollIntoView({
					behavior: "smooth",
					block: "center"
				})
			}, 300))
		})
	})
}

function initFaqParallax() {
	let e = document.querySelector("[data-parallax]");
	e && window.addEventListener("scroll", () => {
		let t = window.pageYOffset;
		e.style.transform = `translateY(${-.5*t}px)`
	})
}

function initPartnerPage() {
	(document.body.classList.contains("partner-page") || window.location.pathname.includes("partner")) && (initPartnerAnimations(), initPartnerCardInteractions(), initPartnerParallax())
}

function initPartnerAnimations() {
	let e = new IntersectionObserver(t => {
		t.forEach(t => {
			if (t.isIntersecting) {
				let i = t.target,
					n = i.dataset.delay || 0;
				setTimeout(() => {
					i.style.animationDelay = n + "ms", i.classList.add("animate")
				}, n), e.unobserve(i)
			}
		})
	}, {
		threshold: .1,
		rootMargin: "0px 0px -50px 0px"
	});
	document.querySelectorAll(".animate-fade-in, .animate-fade-up").forEach(t => {
		e.observe(t)
	})
}

function initPartnerCardInteractions() {
	document.querySelectorAll(".partner-card").forEach((e, t) => {
		e.style.animationDelay = 100 * t + "ms", e.addEventListener("mouseenter", function() {
			this.style.boxShadow = "0 20px 60px rgba(225, 6, 0, 0.2), 0 0 0 1px rgba(225, 6, 0, 0.1)", this.style.transition = "box-shadow 0.3s ease"
		}), e.addEventListener("mouseleave", function() {
			this.style.boxShadow = ""
		})
	})
}

function initPartnerParallax() {
	window.addEventListener("scroll", () => {
		let e = window.pageYOffset,
			t = document.querySelector(".page-header");
		t && (t.style.transform = `translateY(${.5*e}px)`)
	})
}

function initPrivacyPage() {
	(document.body.classList.contains("privacy-page") || window.location.pathname.includes("privacy")) && (initPrivacyAnimations(), initPrivacySectionInteractions(), initPrivacyParallax())
}

function initPrivacyAnimations() {
	let e = new IntersectionObserver(t => {
		t.forEach(t => {
			t.isIntersecting && (t.target.classList.add("animate"), e.unobserve(t.target))
		})
	}, {
		threshold: .1,
		rootMargin: "0px 0px -50px 0px"
	});
	document.querySelectorAll(".animate-fade-in").forEach(t => {
		e.observe(t)
	})
}

function initPrivacySectionInteractions() {
	document.querySelectorAll(".privacy-section").forEach((e, t) => {
		e.style.animationDelay = 200 * t + "ms", e.classList.add("animate-fade-in"), e.addEventListener("mouseenter", function() {
			this.style.transform = "translateX(10px)", this.style.borderLeftWidth = "6px", this.style.transition = "all 0.3s ease"
		}), e.addEventListener("mouseleave", function() {
			this.style.transform = "translateX(0)", this.style.borderLeftWidth = "4px"
		})
	})
}

function initPrivacyParallax() {
	window.addEventListener("scroll", () => {
		let e = window.pageYOffset,
			t = document.querySelector(".page-header");
		t && (t.style.transform = `translateY(${.5*e}px)`)
	})
}
window.openEventModal = async function(e) {
	const supabaseClient = getSupabaseClient();
	if (!supabaseClient) {
		showNotification("Errore di connessione al database", "error");
		return
	}
	let t = document.getElementById("event-modal"),
		i = document.getElementById("modal-html-content");
	if (!t || !i) {
		showNotification("Errore nell'interfaccia del modale", "error");
		return
	}
	i.innerHTML = `
    <div style="text-align:center;color:#E10600;padding:3rem;">
      <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #E10600; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1rem;"></div>
      <div style="font-size: 1.1rem; font-weight: 500;">Caricamento evento...</div>
    </div>
  `, t.style.display = "flex", t.style.opacity = "0", t.classList.add("active"), requestAnimationFrame(() => {
		t.style.transition = "opacity 0.3s ease", t.style.opacity = "1"
	}), document.body.style.overflow = "hidden";
	try {
		let {
			data: n,
			error: o
		} = await supabaseClient.from("events").select("title, description, content, event_date, event_time, location, image_url").eq("id", e).single();
		if (o) throw Error(`Errore recupero evento: ${o.message}`);
		if (!n) throw Error("Evento non trovato");
		let a = "";
		if (n.image_url && (a += `
        <div style="margin-bottom: 1.5rem; text-align: center;">
          <img src="${n.image_url}" alt="Locandina evento" 
               style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 8px 25px rgba(0,0,0,0.15);"
               onclick="openImageLightbox('${n.image_url}')" 
               onmouseover="this.style.cursor='pointer'; this.style.transform='scale(1.02)'; this.style.transition='transform 0.3s ease'"
               onmouseout="this.style.transform='scale(1)'">
          <div style="font-size: 0.9rem; color: #888; margin-top: 0.5rem; font-style: italic;">📸 Clicca per ingrandire</div>
        </div>
      `), a += `
      <h2 style="color: #E10600; margin-bottom: 1rem; font-size: 1.8rem; font-weight: 700; line-height: 1.3; text-align: center;">
        ${n.title||"Evento"}
      </h2>
    `, n.event_date || n.event_time || n.location) {
			if (a += `
        <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border-left: 4px solid #E10600;">
          <h4 style="color: #E10600; margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600;">📅 Dettagli Evento</h4>
      `, n.event_date) {
				let r = new Date(n.event_date).toLocaleDateString("it-IT", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric"
				});
				a += `<div style="margin-bottom: 0.8rem;"><strong style="color: #333;">📆 Data:</strong> <span style="color: #555;">${r}</span></div>`
			}
			n.event_time && (a += `<div style="margin-bottom: 0.8rem;"><strong style="color: #333;">🕐 Orario:</strong> <span style="color: #555;">${n.event_time}</span></div>`), n.location && (a += `<div><strong style="color: #333;">📍 Luogo:</strong> <span style="color: #555;">${n.location}</span></div>`), a += "</div>"
		}
		n.description && (a += `
        <div style="background: #fff; padding: 1.5rem; border-radius: 12px; border: 1px solid #e0e0e0; margin-bottom: 1.5rem;">
          <h4 style="color: #E10600; margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600;">📝 Descrizione</h4>
          <p style="color: #555; line-height: 1.7; margin: 0; font-size: 1rem;">${n.description}</p>
        </div>
      `), n.content ? a += `
        <div style="margin-top: 1.5rem; padding: 1.5rem; background: #fff; border-radius: 12px; border: 1px solid #e0e0e0;">
          <h4 style="color: #E10600; margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600;">📄 Contenuto Completo</h4>
          <div style="line-height: 1.6;">${n.content}</div>
        </div>
      ` : a += `
        <div style="color: #999; font-style: italic; text-align: center; padding: 2rem; background: #f8f9fa; border-radius: 12px; border: 2px dashed #ddd;">
          <div style="font-size: 2rem; margin-bottom: 1rem;">📋</div>
          <div>Contenuto dettagliato non ancora disponibile per questo evento.</div>
        </div>
      `, i.style.opacity = "0", i.style.transition = "opacity 0.3s ease", setTimeout(() => {
			i.innerHTML = a, i.style.opacity = "1", showNotification("Evento caricato con successo!", "success")
		}, 150)
	} catch (l) {
		i.style.opacity = "0", setTimeout(() => {
			i.innerHTML = `
        <div style="color: #E10600; text-align: center; padding: 3rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
          <h3 style="margin-bottom: 1rem; font-weight: 600;">Ops! Qualcosa \xe8 andato storto</h3>
          <p style="color: #666; margin-bottom: 2rem; line-height: 1.6;">${l.message}</p>
          <button onclick="openEventModal('${e}')" 
                  style="background: linear-gradient(135deg, #E10600, #FF4500); color: white; border: none; padding: 0.8rem 2rem; border-radius: 25px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;"
                  onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(225,6,0,0.3)'"
                  onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
            🔄 Riprova
          </button>
        </div>
      `, i.style.opacity = "1"
		}, 150), showNotification(`Errore: ${l.message}`, "error")
	}
}, window.openImageLightbox = function(e) {
	let t = document.getElementById("image-lightbox");
	t || (t = createImageLightbox()), void 0 !== window.currentZoom && (window.currentZoom = 1, window.imgPosition = {
		x: 0,
		y: 0
	});
	let i = document.getElementById("lightbox-img");
	i && (i.src = e, i.style.transform = "translate(0px, 0px) scale(1)");
	let n = document.getElementById("zoom-info");
	n && (n.textContent = "100%"), t.style.display = "flex", setTimeout(() => {
		t.style.opacity = "1"
	}, 10), document.body.style.overflow = "hidden"
}, window.closeImageLightbox = function() {
	let e = document.getElementById("image-lightbox");
	e && (void 0 !== window.currentZoom && (window.currentZoom = 1, window.imgPosition = {
		x: 0,
		y: 0
	}), e.style.opacity = "0", setTimeout(() => {
		e.style.display = "none", document.body.style.overflow = "auto"
	}, 300))
}, document.querySelector(".timeline-container") && ("loading" === document.readyState ? document.addEventListener("DOMContentLoaded", initTimeline) : initTimeline());

// Funzione per raggruppare eventi passati per anno
function renderPastEventsByYear(pastEvents) {
	if (!pastEvents || pastEvents.length === 0) {
		return '<div style="text-align:center;color:#888;">Nessun evento passato.</div>';
	}

	// Raggruppa eventi per anno
	const eventsByYear = {};
	pastEvents.forEach(event => {
		const eventDate = new Date(event.event_date);
		const year = eventDate.getFullYear();

		if (!eventsByYear[year]) {
			eventsByYear[year] = [];
		}
		eventsByYear[year].push(event);
	});

	// Ordina gli anni in ordine decrescente (più recenti prima)
	const sortedYears = Object.keys(eventsByYear).sort((a, b) => b - a);

	let html = '';
	sortedYears.forEach((year, index) => {
		const yearEvents = eventsByYear[year];
		const isFirstYear = index === 0; // Il primo anno (più recente) è aperto di default

		html += `
      <div class="year-section" style="margin-bottom: 2rem;">
        <div style="text-align: center;">
          <span class="section-badge year-badge" 
                onclick="showYearFullscreen('${year}')" 
                id="badge-${year}"
                style="cursor: pointer; transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1rem; padding: 0.8rem 1.5rem; user-select: none; opacity: 0.8; margin: 0.5rem;"
                onmouseover="this.style.opacity='1'; this.style.transform='scale(1.1)'"
                onmouseout="this.style.opacity='0.8'; this.style.transform='scale(1)'">
            <span class="year-text">${year}</span> <span class="year-count" id="count-${year}">(${yearEvents.length})</span>
            <span style="font-size: 0.8rem; margin-left: 0.3rem;">👁</span>
          </span>
        </div>
        <div class="year-events-data" id="events-${year}" style="display: none;">
          ${yearEvents.map(event => renderEventCard(event, true)).join('')}
        </div>
      </div>
    `;
	});

	return html;
}

// Funzione per mostrare gli eventi di un anno in fullscreen
function showYearFullscreen(year) {
	const eventsData = document.getElementById(`events-${year}`);
	if (!eventsData) return;
	
	// Crea o trova l'overlay fullscreen
	let overlay = document.getElementById('year-fullscreen-overlay');
	if (!overlay) {
		overlay = document.createElement('div');
		overlay.id = 'year-fullscreen-overlay';
		overlay.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(255, 255, 255, 0.98);
			backdrop-filter: blur(10px);
			z-index: 10000;
			display: flex;
			flex-direction: column;
			opacity: 0;
			transition: opacity 0.4s ease;
		`;
		document.body.appendChild(overlay);
	}
	
	// Conta il numero di eventi
	const eventCount = eventsData.children.length;
	
	// Contenuto dell'overlay
	overlay.innerHTML = `
		<div style="padding: 3rem 1.5rem 1.5rem; text-align: center; position: relative;">
			<button onclick="closeYearFullscreen()" style="
				position: absolute;
				top: 2rem;
				right: 2rem;
				background: none;
				border: none;
				font-size: 2rem;
				color: #999;
				cursor: pointer;
				transition: all 0.2s ease;
				width: 40px;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
			" onmouseover="this.style.color='#E10600'; this.style.background='rgba(225,6,0,0.1)'" onmouseout="this.style.color='#999'; this.style.background='none'">
				×
			</button>
			<h1 style="margin: 0 0 0.5rem; font-size: 2rem; font-weight: 300; color: #333; letter-spacing: -0.02em;">
				${year}
			</h1>
			<p style="margin: 0 0 2rem; font-size: 1.1rem; color: #666; font-weight: 400;">
				${eventCount} event${eventCount !== 1 ? 'i' : 'o'}
			</p>
		</div>
		<div style="flex: 1; overflow-y: auto; padding: 0 2rem 4rem;">
			<div class="public-events-grid" style="max-width: 1200px; margin: 0 auto;" id="fullscreen-events-grid">
				${eventsData.innerHTML}
			</div>
		</div>
	`;
	
	// Mostra l'overlay
	overlay.style.display = 'flex';
	setTimeout(() => {
		overlay.style.opacity = '1';
	}, 10);
	
	// Blocca lo scroll del body
	document.body.style.overflow = 'hidden';
	
	// Aggiungi listener per ESC
	document.addEventListener('keydown', handleEscapeKey);
	
	// Intercetta i click sulle card nell'overlay per gestire il comportamento
	setTimeout(() => {
		const eventCards = overlay.querySelectorAll('.event-card');
		eventCards.forEach(card => {
			const originalOnclick = card.getAttribute('onclick');
			const eventId = originalOnclick.match(/openEventModal\('(.+?)'\)/)?.[1];
			
			if (eventId) {
				// Rimuovi il click handler originale
				card.removeAttribute('onclick');
				
				// Aggiungi il nuovo handler
				card.addEventListener('click', (e) => {
					e.preventDefault();
					e.stopPropagation();
					// Chiudi l'overlay dell'anno
					closeYearFullscreen();
					// Aspetta che l'overlay si chiuda, poi apri la modal dell'evento
					setTimeout(() => {
						window.openEventModal(eventId);
					}, 350);
				});
				
				// Aggiungi anche un indicatore visivo che è cliccabile
				card.style.cursor = 'pointer';
			}
		});
	}, 50);
}

// Funzione per chiudere l'overlay fullscreen
function closeYearFullscreen() {
	const overlay = document.getElementById('year-fullscreen-overlay');
	if (overlay) {
		overlay.style.opacity = '0';
		setTimeout(() => {
			overlay.style.display = 'none';
		}, 300);
	}
	
	// Ripristina lo scroll del body
	document.body.style.overflow = 'auto';
	
	// Rimuovi listener per ESC
	document.removeEventListener('keydown', handleEscapeKey);
}

// Gestione tasto ESC
function handleEscapeKey(event) {
	if (event.key === 'Escape') {
		closeYearFullscreen();
	}
}

// Funzione per aggiornare i contatori degli eventi per anno
function updateYearEventCounts() {
	// Trova tutti i badge degli anni
	const yearBadges = document.querySelectorAll('.year-badge');
	
	yearBadges.forEach(badge => {
		const year = badge.id.replace('badge-', '');
		const eventsContainer = document.getElementById(`events-${year}`);
		const countSpan = document.getElementById(`count-${year}`);
		
		if (eventsContainer && countSpan) {
			// Conta gli eventi effettivamente presenti nel DOM
			const eventCards = eventsContainer.querySelectorAll('.event-card');
			const eventCount = eventCards.length;
			
			// Aggiorna il contatore
			countSpan.textContent = `(${eventCount})`;
			
			// Se non ci sono eventi, nascondi la sezione
			if (eventCount === 0) {
				badge.style.display = 'none';
			} else {
				badge.style.display = 'inline-flex';
			}
		}
	});
}

// Funzione per osservare i cambiamenti nel DOM e aggiornare i contatori
function setupEventCountObserver() {
	// Osserva i cambiamenti nella lista degli eventi passati
	const pastEventsList = document.getElementById('past-events-list');
	if (pastEventsList) {
		const observer = new MutationObserver(() => {
			// Aspetta un po' per permettere al DOM di aggiornarsi completamente
			setTimeout(updateYearEventCounts, 100);
		});
		
		observer.observe(pastEventsList, {
			childList: true,
			subtree: true
		});
	}
}

// Rendi le funzioni disponibili globalmente
window.showYearFullscreen = showYearFullscreen;
window.closeYearFullscreen = closeYearFullscreen;
window.updateYearEventCounts = updateYearEventCounts;
window.setupEventCountObserver = setupEventCountObserver;

// === GALLERY-SPECIFIC FUNCTIONS ===

// Enhanced Gallery Functions for galleria.html
function initializeGalleryPage() {
	// Only run on gallery page
	if (!document.getElementById('photoSwiper') && !document.getElementById('videoSwiper')) {
		return;
	}

	// Use global Supabase client (already initialized)
	const supabaseClient = getSupabaseClient();

	// Carica i video da archive.org
	function loadVideosFromArchive() {
		const loadingElement = document.getElementById('loadingVideos');
		const videoSwiper = document.getElementById('videoSwiper');
		const swiperWrapper = document.getElementById('videoSwiperWrapper');
		const videoFiles = Array.from({length: 18}, (_, i) => `${i+1}.mp4`);
		// Clear existing content and hide loading
		swiperWrapper.innerHTML = '';
		loadingElement.style.display = 'none';
		videoSwiper.style.display = 'block';
		let videoCount = 0;
		for (let i = 0; i < videoFiles.length; i++) {
			const file = videoFiles[i];
			const videoSrc = `https://archive.org/download/17_20250722/${file}`;
			const videoBaseName = file.replace(/\.[^/.]+$/, "");
			// Use Supabase storage for thumbnails
			const thumbnailUrl = `https://ciezrbsolxpjxswdkkpo.supabase.co/storage/v1/object/public/gallery/thumbnail/${videoBaseName}.png`;
			videoCount++;
			const slide = document.createElement('div');
			slide.className = 'swiper-slide video-slide';
			slide.setAttribute('data-video', videoSrc);
			const videoTitle = videoBaseName.replace(/[_-]/g, ' ');
			slide.innerHTML = `
				<div class="video-thumbnail">
					<img src="${thumbnailUrl}" alt="${videoTitle}" loading="lazy" onerror="this.style.display='none'">
					<div class="play-button"></div>
				</div>
			`;
			swiperWrapper.appendChild(slide);
		}
		if (videoCount === 0) {
			loadingElement.innerHTML = '<p>Nessun video valido trovato su archive.org</p>';
			return;
		}
		initializeVideoSwiper();
	}

	// Initialize Video Swiper
	function initializeVideoSwiper() {
		const videoSlides = document.querySelectorAll('.video-slide').length;
		const swiper = new Swiper('.video-swiper', {
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 3,
			spaceBetween: 30,
			loop: videoSlides >= 6, // Only enable loop if we have enough slides
			speed: 600,
			coverflowEffect: {
				rotate: 30,
				stretch: 0,
				depth: 200,
				modifier: 1,
				slideShadows: true,
			},
			navigation: {
				nextEl: '.video-swiper .swiper-button-next',
				prevEl: '.video-swiper .swiper-button-prev',
			},
			pagination: {
				el: '.video-swiper .swiper-pagination',
				clickable: true,
			},
			breakpoints: {
				0: { slidesPerView: 1 },
				768: { slidesPerView: 2 },
				1200: { slidesPerView: 3 }
			}
		});

		// Initialize video lightbox after swiper is ready
		initializeVideoLightbox();
	}

	// Initialize Video Lightbox
	function initializeVideoLightbox() {
		const videoOverlay = document.getElementById('videoOverlay');
		const overlayVideo = document.getElementById('overlayVideo');
		const closeButton = document.getElementById('closeButton');
		const slides = document.querySelectorAll('.video-slide');
		let currentVideoIndex = 0;
		const videoList = Array.from(slides).map(slide => slide.getAttribute('data-video'));

		// Apertura video overlay
		slides.forEach((slide, idx) => {
			slide.addEventListener('click', (e) => {
				const videoSrc = slide.getAttribute('data-video');
				if (videoSrc) {
					currentVideoIndex = idx;
					overlayVideo.src = videoSrc;
					videoOverlay.classList.add('active');
					document.body.style.overflow = 'hidden';
					
					// Update video info
					updateVideoInfo(currentVideoIndex, videoList.length);
					
					// Auto-play del video
					setTimeout(() => {
						overlayVideo.play().catch(e => {
						});
					}, 300);
				}
			});
		});

		// Navigazione prev/next nella video lightbox
		const prevBtn = document.querySelector('.video-lightbox-prev');
		const nextBtn = document.querySelector('.video-lightbox-next');
		
		function showVideo(idx) {
			if (idx < 0) idx = videoList.length - 1;
			if (idx >= videoList.length) idx = 0;
			currentVideoIndex = idx;
			overlayVideo.src = videoList[currentVideoIndex];
			overlayVideo.currentTime = 0;
			// Update video info
			updateVideoInfo(currentVideoIndex, videoList.length);
			overlayVideo.play().catch(e => {});
		}

		if (prevBtn && nextBtn) {
			prevBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				showVideo(currentVideoIndex - 1);
			});
			nextBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				showVideo(currentVideoIndex + 1);
			});
		}

		// Navigazione con frecce tastiera
		document.addEventListener('keydown', function(e) {
			if (!videoOverlay.classList.contains('active')) return;
			if (e.key === 'ArrowLeft') {
				showVideo(currentVideoIndex - 1);
			} else if (e.key === 'ArrowRight') {
				showVideo(currentVideoIndex + 1);
			} else if (e.key === 'Escape') {
				closeVideoOverlay();
			}
		});

		// Chiusura video overlay
		function closeVideoOverlay() {
			videoOverlay.classList.remove('active');
			overlayVideo.pause();
			overlayVideo.src = '';
			document.body.style.overflow = 'auto';
		}

		// Event listeners per chiusura
		if (closeButton) {
			closeButton.addEventListener('click', closeVideoOverlay);
		}

		if (videoOverlay) {
			videoOverlay.addEventListener('click', function(e) {
				if (e.target === videoOverlay) {
					closeVideoOverlay();
				}
			});
		}
	}

	async function loadPhotosFromSupabase() {
		try {
			const loadingElement = document.getElementById('loadingPhotos');
			const photoSwiper = document.getElementById('photoSwiper');
			const swiperWrapper = document.getElementById('photoSwiperWrapper');
			
			// Get list of files from the 'gallery' bucket
			const { data: files, error } = await supabaseClient.storage
				.from('gallery')
				.list('foto', {
					limit: 100,
					offset: 0,
					sortBy: { column: 'name', order: 'asc' }
				});

			if (error) {
								loadingElement.innerHTML = `<p>Errore nel caricamento delle foto: ${error.message}</p>`;
				return;
			}

			if (!files || files.length === 0) {
				loadingElement.innerHTML = '<p>Nessuna foto trovata nella cartella foto/</p>';
				
				// Prova a cercare nella root del bucket
				const { data: rootFiles, error: rootError } = await supabaseClient.storage
					.from('gallery')
					.list('', {
						limit: 100,
						offset: 0
					});
				
				if (rootFiles && rootFiles.length > 0) {
					loadingElement.innerHTML = `<p>Trovati ${rootFiles.length} file nella root del bucket. Controlla la struttura delle cartelle.</p>`;
				}
				return;
			}

			// Clear existing content and hide loading
			swiperWrapper.innerHTML = '';
			loadingElement.style.display = 'none';
			photoSwiper.style.display = 'block';

			// Create slides for each photo
			let photoCount = 0;
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				
				// Filter only image files
				const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
				const isImage = imageExtensions.some(ext => 
					file.name.toLowerCase().endsWith(ext)
				);
				
				if (!isImage) continue;
				
				// Get public URL for the image
				const { data } = supabaseClient.storage
					.from('gallery')
					.getPublicUrl(`foto/${file.name}`);
				
				if (data && data.publicUrl) {
					photoCount++;
					const slide = document.createElement('div');
					slide.className = 'swiper-slide photo-slide';
					slide.setAttribute('data-image', data.publicUrl);
					
					// Extract name without extension for alt text
					const altText = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ');
					
					slide.innerHTML = `
						<div class="photo-thumbnail">
							<img src="${data.publicUrl}" alt="${altText}" loading="lazy" onerror="this.parentElement.parentElement.style.display='none'">
						</div>
					`;
					
					swiperWrapper.appendChild(slide);
				}
			}

			if (photoCount === 0) {
				loadingElement.innerHTML = '<p>Nessuna foto valida trovata nella cartella</p>';
				return;
			}

			// Initialize Swiper after photos are loaded
			initializePhotoSwiper();
			
			// Initialize lightbox functionality
			initializePhotoLightbox();
			
			// Update photo counter with animation
			updatePhotoCounter();

		} catch (error) {
						document.getElementById('loadingPhotos').innerHTML = '<p>Errore nel caricamento delle foto</p>';
		}
	}

	// Initialize Photo Swiper
	function initializePhotoSwiper() {
		const photoSlides = document.querySelectorAll('.photo-slide').length;
		new Swiper('.photo-swiper', {
			effect: 'coverflow',
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 3,
			spaceBetween: 30,
			loop: photoSlides >= 6, // Only enable loop if we have enough slides
			speed: 600,
			coverflowEffect: {
				rotate: 30,
				stretch: 0,
				depth: 200,
				modifier: 1,
				slideShadows: true,
			},
			navigation: {
				nextEl: '.photo-swiper .swiper-button-next',
				prevEl: '.photo-swiper .swiper-button-prev',
			},
			pagination: {
				el: '.photo-swiper .swiper-pagination',
				clickable: true,
			},
			breakpoints: {
				0: { slidesPerView: 1 },
				768: { slidesPerView: 2 },
				1200: { slidesPerView: 3 }
			}
		});
	}

	// Initialize Photo Lightbox
	function initializePhotoLightbox() {
		const slides = document.querySelectorAll('.photo-slide');
		let current = 0;
		let images = Array.from(slides).map(slide => slide.getAttribute('data-image'));
		const lightbox = document.getElementById('photo-lightbox');
		const lightboxImage = lightbox.querySelector('.lightbox-image');
		const closeBtn = lightbox.querySelector('.lightbox-close');
		const prevBtn = lightbox.querySelector('.photo-lightbox-prev');
		const nextBtn = lightbox.querySelector('.photo-lightbox-next');
		let touchStartY = null;
		
		// Zoom variables
		let currentZoom = 1;
		let isDragging = false;
		let dragStart = { x: 0, y: 0 };
		let imgPosition = { x: 0, y: 0 };
		const zoomInfo = document.getElementById('zoom-info');

		// Zoom functions
		window.zoomImage = function(delta) {
			currentZoom = Math.max(0.5, Math.min(5, currentZoom + delta));
			updateImageTransform();
			updateZoomInfo();
		};

		window.resetZoom = function() {
			currentZoom = 1;
			imgPosition = { x: 0, y: 0 };
			updateImageTransform();
			updateZoomInfo();
		};

		function updateImageTransform() {
			lightboxImage.style.transform = `translate(${imgPosition.x}px, ${imgPosition.y}px) scale(${currentZoom})`;
			lightboxImage.style.cursor = currentZoom > 1 ? 'grab' : 'default';
		}

		function updateZoomInfo() {
			if (zoomInfo) {
				zoomInfo.textContent = Math.round(currentZoom * 100) + '%';
			}
		}

		function show(idx) {
			if (!images[idx]) return;
			current = idx;
			
			// Reset zoom state when showing new image
			currentZoom = 1;
			imgPosition = { x: 0, y: 0 };
			
			lightboxImage.src = images[idx];
			lightbox.classList.add('active');
			document.body.style.overflow = 'hidden';
			
			// Update image transform and zoom info
			updateImageTransform();
			updateZoomInfo();
			
			// Update image counter
			updateImageCounter(current, images.length);
			// Blocca scroll su iOS
			document.body.addEventListener('touchmove', preventScroll, { passive: false });
			// Focus sulla X
			setTimeout(() => closeBtn.focus(), 50);
			// Precarica immagini vicine
			preloadImage((current + 1) % images.length);
			preloadImage((current - 1 + images.length) % images.length);
		}

		function hide() {
			lightbox.classList.remove('active');
			document.body.style.overflow = '';
			lightboxImage.src = '';
			document.body.removeEventListener('touchmove', preventScroll);
		}

		function next() {
			current = (current + 1) % images.length;
			show(current);
		}

		function prev() {
			current = (current - 1 + images.length) % images.length;
			show(current);
		}

		function preventScroll(e) {
			e.preventDefault();
		}

		function preloadImage(idx) {
			const url = images[idx];
			if (!url) return;
			const img = new window.Image();
			img.src = url;
		}

		// Event listeners
		slides.forEach((slide, idx) => {
			slide.addEventListener('click', (e) => {
				e.preventDefault();
				show(idx);
			});
		});

		closeBtn.addEventListener('click', hide);
		nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });
		prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); });

		// Navigazione con click su bordo destro/sinistro dell'immagine (solo se non è zoomata)
		lightboxImage.addEventListener('click', (e) => {
			if (currentZoom > 1) return; // Don't navigate when zoomed
			const rect = lightboxImage.getBoundingClientRect();
			const x = e.clientX - rect.left;
			if (x < rect.width * 0.3) prev();
			else if (x > rect.width * 0.7) next();
		});

		// Mouse wheel zoom
		lightbox.addEventListener('wheel', function(e) {
			if (!lightbox.classList.contains('active')) return;
			e.preventDefault();
			const delta = e.deltaY > 0 ? -0.1 : 0.1;
			zoomImage(delta);
		});

		// Double click to zoom
		lightboxImage.addEventListener('dblclick', function(e) {
			e.stopPropagation();
			if (currentZoom === 1) {
				currentZoom = 2;
			} else {
				resetZoom();
				return;
			}
			updateImageTransform();
			updateZoomInfo();
		});

		// Mouse drag functionality
		lightboxImage.addEventListener('mousedown', function(e) {
			if (currentZoom > 1) {
				isDragging = true;
				lightboxImage.style.cursor = 'grabbing';
				dragStart.x = e.clientX - imgPosition.x;
				dragStart.y = e.clientY - imgPosition.y;
				e.preventDefault();
			}
		});

		document.addEventListener('mousemove', function(e) {
			if (isDragging && currentZoom > 1) {
				imgPosition.x = e.clientX - dragStart.x;
				imgPosition.y = e.clientY - dragStart.y;
				updateImageTransform();
			}
		});

		document.addEventListener('mouseup', function() {
			if (isDragging) {
				isDragging = false;
				lightboxImage.style.cursor = currentZoom > 1 ? 'grab' : 'default';
			}
		});

		// Keyboard navigation
		document.addEventListener('keydown', (e) => {
			if (!lightbox.classList.contains('active')) return;
			if (e.key === 'Escape') hide();
			if (e.key === 'ArrowRight') next();
			if (e.key === 'ArrowLeft') prev();
		});

		// Click outside per chiudere
		lightbox.addEventListener('click', (e) => {
			if (e.target === lightbox) hide();
		});

		// Enhanced touch support with pinch-to-zoom
		let initialDistance = 0;
		let initialZoom = 1;

		lightboxImage.addEventListener('touchstart', (e) => {
			if (e.touches.length === 2) {
				// Pinch to zoom start
				const touch1 = e.touches[0];
				const touch2 = e.touches[1];
				initialDistance = Math.hypot(
					touch2.clientX - touch1.clientX,
					touch2.clientY - touch1.clientY
				);
				initialZoom = currentZoom;
				e.preventDefault();
			} else if (e.touches.length === 1) {
				if (currentZoom > 1) {
					// Single touch drag start when zoomed
					isDragging = true;
					const touch = e.touches[0];
					dragStart.x = touch.clientX - imgPosition.x;
					dragStart.y = touch.clientY - imgPosition.y;
				} else {
					// Swipe to close gesture
					touchStartY = e.touches[0].clientY;
				}
			}
		});

		lightboxImage.addEventListener('touchmove', (e) => {
			if (e.touches.length === 2) {
				// Pinch to zoom
				e.preventDefault();
				const touch1 = e.touches[0];
				const touch2 = e.touches[1];
				const currentDistance = Math.hypot(
					touch2.clientX - touch1.clientX,
					touch2.clientY - touch1.clientY
				);
				const scale = currentDistance / initialDistance;
				currentZoom = Math.max(0.5, Math.min(5, initialZoom * scale));
				updateImageTransform();
				updateZoomInfo();
			} else if (e.touches.length === 1) {
				if (isDragging && currentZoom > 1) {
					// Single touch drag when zoomed
					e.preventDefault();
					const touch = e.touches[0];
					imgPosition.x = touch.clientX - dragStart.x;
					imgPosition.y = touch.clientY - dragStart.y;
					updateImageTransform();
				} else if (touchStartY !== null && currentZoom === 1) {
					// Swipe down to close when not zoomed
					const deltaY = e.touches[0].clientY - touchStartY;
					if (deltaY > 60) {
						hide();
						touchStartY = null;
					}
				}
			}
		});

		lightboxImage.addEventListener('touchend', (e) => {
			if (e.touches.length === 0) {
				isDragging = false;
				touchStartY = null;
			}
		});
	}

	// Enhanced Intersection Observer for scroll animations
	function initScrollAnimations() {
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		};
		
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
				}
			});
		}, observerOptions);
		
		document.querySelectorAll('.animate-on-scroll').forEach(el => {
			observer.observe(el);
		});
	}
	
	// Enhanced photo counter update
	function updatePhotoCounter() {
		const photoCountElement = document.getElementById('photoCount');
		const photoSlides = document.querySelectorAll('.photo-slide');
		if (photoCountElement && photoSlides.length > 0) {
			// Animate counter
			let currentCount = 0;
			const targetCount = photoSlides.length;
			const increment = Math.ceil(targetCount / 20);
			
			const countAnimation = setInterval(() => {
				currentCount += increment;
				if (currentCount >= targetCount) {
					currentCount = targetCount;
					clearInterval(countAnimation);
				}
				photoCountElement.textContent = currentCount;
			}, 50);
		}
	}
	
	// Enhanced lightbox with counter updates
	function updateImageCounter(current, total) {
		const counterElement = document.getElementById('imageCounter');
		if (counterElement) {
			counterElement.textContent = `${current + 1} / ${total}`;
		}
	}
	
	// Enhanced video overlay with info updates
	function updateVideoInfo(current, total) {
		const titleElement = document.getElementById('videoTitle');
		const counterElement = document.getElementById('videoCounter');
		
		if (titleElement) {
			titleElement.textContent = `Video ${current + 1}`;
		}
		
		if (counterElement) {
			counterElement.textContent = `${current + 1} / ${total}`;
		}
	}
	
	// Enhanced loading progress animation
	function showLoadingProgress(elementId, duration = 3000) {
		const loadingElement = document.getElementById(elementId);
		if (!loadingElement) return;
		
		const progressBar = loadingElement.querySelector('.progress-bar');
		if (progressBar) {
			progressBar.style.animation = 'none';
			progressBar.offsetHeight; // Trigger reflow
			progressBar.style.animation = `progressSlide ${duration / 1000}s ease-in-out`;
			
			setTimeout(() => {
				progressBar.style.width = '100%';
				progressBar.style.animation = 'none';
				progressBar.style.background = 'linear-gradient(90deg, #28a745, #20c997)';
			}, duration - 200);
		}
	}

	// Load photos and videos when page loads
	document.addEventListener('DOMContentLoaded', () => {
		// Initialize scroll animations
		initScrollAnimations();
		
		// Start loading animations
		showLoadingProgress('loadingPhotos', 2000);
		showLoadingProgress('loadingVideos', 2500);
		
		setTimeout(() => {
			loadPhotosFromSupabase();
			loadVideosFromArchive();
		}, 1000);
	});

	// Precarica i video dello slider dopo il caricamento
	function preloadSliderVideos() {
		// Attendi che le slide siano pronte
		setTimeout(() => {
			const slides = document.querySelectorAll('.video-slide');
			slides.forEach(slide => {
				const videoUrl = slide.getAttribute('data-video');
				if (videoUrl) {
					// Precarica il video in background (senza inserirlo nel DOM)
					fetch(videoUrl, { method: 'GET', mode: 'no-cors' })
						.then(() => {
							// Precaricato OK (nessuna azione visibile)
						})
						.catch(() => {
							// Ignora errori di CORS o fetch
						});
				}
			});
		}, 2500); // Attendi che lo slider sia popolato
	}

	// Avvia il pre-caricamento dopo il caricamento dei video (ritardato per performance)
	document.addEventListener('DOMContentLoaded', () => {
		setTimeout(preloadSliderVideos, 5000);
	});
}

// Initialize gallery page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGalleryPage);

// Registration functionality for register.html
function initializeRegistrationPage() {
	// Only run on register.html page
	if (!window.location.pathname.includes('register.html')) return;

	// Use global Supabase client instance
	const supabaseClient = window.getSupabaseClient();
	
	// DOM Elements
	const registerForm = document.getElementById('registerForm');
	const firstNameInput = document.getElementById('firstName');
	const lastNameInput = document.getElementById('lastName');
	const emailInput = document.getElementById('email');
	const passwordInput = document.getElementById('password');
	const confirmPasswordInput = document.getElementById('confirmPassword');
	const acceptTermsInput = document.getElementById('acceptTerms');
	const registerButton = document.getElementById('registerButton');
	const statusMessage = document.getElementById('statusMessage');
	const btnText = registerButton?.querySelector('.btn-text');
	const loadingSpinner = registerButton?.querySelector('.loading-spinner');
	
	// Additional form elements
	const dateOfBirthInput = document.getElementById('dateOfBirth');
	const placeOfBirthInput = document.getElementById('placeOfBirth');
	const genderInput = document.getElementById('gender');
	const fiscalCodeInput = document.getElementById('fiscalCode');
	const phoneNumberInput = document.getElementById('phoneNumber');
	const addressInput = document.getElementById('address');
	const cityInput = document.getElementById('city');
	const zipCodeInput = document.getElementById('zipCode');
	const provinceInput = document.getElementById('province');

	// Return early if required elements don't exist
	if (!registerForm || !firstNameInput || !lastNameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
		return;
	}

	// Utility Functions
	function showStatus(message, type = 'info') {
		if (!statusMessage) return;
		statusMessage.className = `status-message ${type}`;
		statusMessage.innerHTML = message;
		statusMessage.style.display = 'block';
		statusMessage.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest'
		});
	}

	function hideStatus() {
		if (statusMessage) {
			statusMessage.style.display = 'none';
		}
	}

	function setLoading(isLoading) {
		if (!registerButton || !btnText || !loadingSpinner) return;
		
		if (isLoading) {
			btnText.style.display = 'none';
			loadingSpinner.style.display = 'block';
			registerButton.disabled = true;
		} else {
			btnText.style.display = 'block';
			loadingSpinner.style.display = 'none';
			registerButton.disabled = false;
		}
	}

	// Password validation
	function validatePassword(password) {
		const errors = [];
		if (password.length < 8) {
			errors.push('La password deve essere di almeno 8 caratteri');
		}
		if (!/[a-z]/.test(password)) {
			errors.push('La password deve contenere almeno una lettera minuscola');
		}
		if (!/[A-Z]/.test(password)) {
			errors.push('La password deve contenere almeno una lettera maiuscola');
		}
		if (!/[0-9]/.test(password)) {
			errors.push('La password deve contenere almeno un numero');
		}
		if (!/[!@#$%^&*()_+\-=\[\]{}|;':".,<>?~`]/.test(password)) {
			errors.push('La password deve contenere almeno un simbolo (!@#$%^&* ecc.)');
		}
		return {
			isValid: errors.length === 0,
			errors: errors,
			strength: calculatePasswordStrength(password)
		};
	}

	// Calculate password strength for visual feedback
	function calculatePasswordStrength(password) {
		let strength = 0;
		// Length scoring
		if (password.length >= 8) strength += 1;
		if (password.length >= 12) strength += 1;
		if (password.length >= 16) strength += 1;
		// Character variety scoring
		if (/[a-z]/.test(password)) strength += 1;
		if (/[A-Z]/.test(password)) strength += 1;
		if (/[0-9]/.test(password)) strength += 1;
		if (/[!@#$%^&*()_+\-=\[\]{}|;':".,<>?~`]/.test(password)) strength += 1;
		// Return strength level (0-4)
		return Math.min(strength, 4);
	}

	// Email validation
	function validateEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return 'Inserisci un indirizzo email valido.';
		}
		return null;
	}

	// Fiscal Code API functions
	const FISCAL_CODE_API_KEY = '15ba6b0df94ce0a6ad015ec6dc268365943838c2aea7ed7e94a5f1deda14e6ad68e';
	
	async function calculateFiscalCode(firstName, lastName, gender, dateOfBirth, placeOfBirth) {
		if (!firstName || !lastName || !gender || !dateOfBirth || !placeOfBirth) {
			return null;
		}
		try {
			const date = new Date(dateOfBirth);
			const day = date.getDate();
			const month = date.getMonth() + 1; // JavaScript months are 0-based
			const year = date.getFullYear();
			const url = `https://api.miocodicefiscale.com/calculate?` + 
				`lname=${encodeURIComponent(lastName)}&` + 
				`fname=${encodeURIComponent(firstName)}&` + 
				`gender=${gender}&` + 
				`city=${encodeURIComponent(placeOfBirth)}&` + 
				`day=${day}&` + 
				`month=${month}&` + 
				`year=${year}&` + 
				`access_token=${FISCAL_CODE_API_KEY}`;
			
			const response = await fetch(url);
			const data = await response.json();
			
			if (data.status && data.data && data.data.cf) {
				return data.data.cf;
			} else {
				console.error('Errore calcolo codice fiscale:', data.message);
				return null;
			}
		} catch (error) {
			console.error('Errore nella chiamata API:', error);
			return null;
		}
	}

	async function updateFiscalCode() {
		if (!fiscalCodeInput) return;
		
		const firstName = firstNameInput.value.trim();
		const lastName = lastNameInput.value.trim();
		const gender = genderInput?.value;
		const dateOfBirth = dateOfBirthInput?.value;
		const placeOfBirth = placeOfBirthInput?.value.trim();
		const helpElement = document.getElementById('fiscalCodeHelp');

		if (!firstName || !lastName || !gender || !dateOfBirth || !placeOfBirth) {
			fiscalCodeInput.value = '';
			fiscalCodeInput.placeholder = 'Compila tutti i campi per il calcolo automatico';
			if (helpElement) {
				helpElement.textContent = 'Compila tutti i campi sopra per il calcolo automatico';
				helpElement.style.color = '#666';
			}
			return;
		}

		if (helpElement) {
			helpElement.textContent = 'Calcolo in corso...';
			helpElement.style.color = '#007bff';
		}

		const fiscalCode = await calculateFiscalCode(firstName, lastName, gender, dateOfBirth, placeOfBirth);
		
		if (fiscalCode) {
			fiscalCodeInput.value = fiscalCode;
			fiscalCodeInput.placeholder = '';
			if (helpElement) {
				helpElement.textContent = 'Codice fiscale calcolato automaticamente ✓';
				helpElement.style.color = '#28a745';
			}
		} else {
			fiscalCodeInput.value = '';
			fiscalCodeInput.placeholder = 'Errore nel calcolo automatico';
			if (helpElement) {
				helpElement.textContent = 'Errore nel calcolo. Verifica i dati inseriti o inserisci manualmente';
				helpElement.style.color = '#dc3545';
			}
			// Allow manual input if API fails
			fiscalCodeInput.removeAttribute('readonly');
		}
	}

	// Check if user is already logged in
	async function checkExistingSession() {
		try {
			const { data: { session }, error } = await supabaseClient.auth.getSession();
			
			if (error) {
				console.error('Error checking session:', error);
				return;
			}
			
			if (session) {
				// User is already logged in, redirect to area soci
				showStatus('Sessione esistente trovata, reindirizzamento...', 'success');
				setTimeout(() => {
					window.location.href = 'area-soci.html';
				}, 1000);
			}
		} catch (error) {
			console.error('Error checking existing session:', error);
		}
	}

	// Registration Function
	async function handleRegistration(event) {
		event.preventDefault();
		hideStatus();

		// Get form values - Required fields
		const firstName = firstNameInput.value.trim();
		const lastName = lastNameInput.value.trim();
		const email = emailInput.value.trim();
		const password = passwordInput.value;
		const confirmPassword = confirmPasswordInput.value;
		const acceptTerms = acceptTermsInput.checked;
		const dateOfBirth = dateOfBirthInput?.value || null;
		const placeOfBirth = placeOfBirthInput?.value.trim() || null;
		const gender = genderInput?.value || null;

		// Get form values - Optional fields (convert empty strings to null)
		const fiscalCode = fiscalCodeInput?.value.trim().toUpperCase() || null;
		const phoneNumber = phoneNumberInput?.value.trim() || null;
		const address = addressInput?.value.trim() || null;
		const city = cityInput?.value.trim() || 'Grumo Appula';
		const zipCode = zipCodeInput?.value.trim() || null;
		const province = provinceInput?.value.trim().toUpperCase() || 'BA';

		// Validation - Required fields
		const missingFields = [
			{ label: 'Nome', value: firstName },
			{ label: 'Cognome', value: lastName },
			{ label: 'Email', value: email },
			{ label: 'Password', value: password },
			{ label: 'Conferma Password', value: confirmPassword },
			{ label: 'Data di nascita', value: dateOfBirth },
			{ label: 'Luogo di nascita', value: placeOfBirth },
			{ label: 'Sesso', value: gender }
		].filter(f => !f.value || (typeof f.value === 'string' && f.value.trim() === ''));

		if (missingFields.length > 0 || !(gender === 'M' || gender === 'F')) {
			showStatus('Compila tutti i campi obbligatori (contrassegnati con *).', 'error');
			return;
		}

		const emailError = validateEmail(email);
		if (emailError) {
			showStatus(emailError, 'error');
			return;
		}

		const passwordValidation = validatePassword(password);
		if (!passwordValidation.isValid) {
			showStatus('Password non valida: ' + passwordValidation.errors.join(', '), 'error');
			return;
		}

		if (password !== confirmPassword) {
			showStatus('Le password non coincidono.', 'error');
			return;
		}

		if (!acceptTerms) {
			showStatus('Devi accettare i Termini e Condizioni e l\'Informativa sulla Privacy per procedere.', 'error');
			return;
		}

		// Additional field validation
		if (zipCode && !/^\d{5}$/.test(zipCode)) {
			showStatus('Il CAP deve essere di 5 cifre.', 'error');
			return;
		}

		if (province && !/^[A-Z]{2}$/.test(province)) {
			showStatus('La provincia deve essere di 2 lettere maiuscole (es. BA).', 'error');
			return;
		}

		if (fiscalCode && !/^[A-Z0-9]{16}$/.test(fiscalCode)) {
			showStatus('Il codice fiscale deve essere di 16 caratteri alfanumerici.', 'error');
			return;
		}

		if (phoneNumber && !/^\+?[\d\s\-\(\)]{7,20}$/.test(phoneNumber.replace(/\s/g, ''))) {
			showStatus('Formato numero di telefono non valido. Usa un formato come +39 320 123 4567.', 'error');
			return;
		}

		setLoading(true);
		
		try {
			// Helper function to convert empty strings to null
			function toNullIfEmpty(value) {
				if (value === undefined || value === null) return null;
				if (typeof value === 'string' && value.trim() === '') return null;
				return typeof value === 'string' ? value.trim() : value;
			}

			// Helper function for date conversion
			function formatDateForDB(dateStr) {
				if (!dateStr || typeof dateStr !== 'string') return null;
				// Ensure YYYY-MM-DD format
				const date = new Date(dateStr);
				if (isNaN(date.getTime())) return null;
				return dateStr; // HTML date input already provides YYYY-MM-DD format
			}

			// Sign up with Supabase Auth
			const { data: authData, error: authError } = await supabaseClient.auth.signUp({
				email: email,
				password: password,
				options: {
					data: {
						first_name: firstName,
						last_name: lastName,
						full_name: `${firstName} ${lastName}`,
						date_of_birth: dateOfBirth,
						place_of_birth: placeOfBirth,
						gender: gender,
						fiscal_code: fiscalCode,
						phone_number: phoneNumber,
						address: address,
						city: city,
						zip_code: zipCode,
						province: province,
						privacy_accepted: true,
						registration_completed: true,
						role: 'utente'
					},
					emailRedirectTo: `${window.location.origin}/index.html?email_verified=true`
				}
			});

			if (authError) {
				throw authError;
			}

			if (authData.user) {
				// Build profile data using ONLY existing database columns
				const profileData = {
					id: authData.user.id,
					user_id: authData.user.id, // Required for RLS policies
					email: email // Required field
				};

				// Add optional fields that exist in the database
				if (firstName) profileData.first_name = firstName;
				if (lastName) profileData.last_name = lastName;
				// full_name is a generated column in the database, don't set it manually
				if (dateOfBirth) profileData.date_of_birth = formatDateForDB(dateOfBirth);
				if (placeOfBirth) profileData.place_of_birth = placeOfBirth;
				if (gender) profileData.gender = gender; // Now exists in database
				if (fiscalCode) profileData.fiscal_code = fiscalCode;
				if (phoneNumber) profileData.phone_number = phoneNumber;
				if (address) profileData.address = address;
				if (city) profileData.city = city; // Has default 'Grumo Appula'
				if (zipCode) profileData.zip_code = zipCode;
				if (province) profileData.province = province;
				
				// Set privacy accepted to true (user checked the checkbox)
				profileData.privacy_accepted = true;
				
				// Note: created_at and updated_at have default values (now()) so we don't set them
				// Note: role, membership_type, membership_status have defaults so we don't override them
				
				// Profile data will be created automatically after email confirmation
				// via Supabase trigger or in the auth verification process
				console.log('User registered with metadata:', profileData);
				
				showStatus(`
					<strong>Registrazione completata!</strong><br>
					Ti abbiamo inviato un'email di conferma all'indirizzo <strong>${email}</strong>.<br>
					Controlla la tua casella di posta e clicca sul link di conferma per attivare il tuo account.<br>
					<small>I tuoi dati sono stati salvati e saranno disponibili dopo la conferma email.</small>
				`, 'success');

				// Reset form and clear all fields
				registerForm.reset();
				// Clear all input fields explicitly
				firstNameInput.value = '';
				lastNameInput.value = '';
				emailInput.value = '';
				passwordInput.value = '';
				confirmPasswordInput.value = '';
				if (dateOfBirthInput) dateOfBirthInput.value = '';
				if (placeOfBirthInput) placeOfBirthInput.value = '';
				if (genderInput) genderInput.value = '';
				if (fiscalCodeInput) fiscalCodeInput.value = '';
				if (phoneNumberInput) phoneNumberInput.value = '';
				if (addressInput) addressInput.value = '';
				if (cityInput) cityInput.value = '';
				if (zipCodeInput) zipCodeInput.value = '';
				if (provinceInput) provinceInput.value = '';
				acceptTermsInput.checked = false;
				
				// Reset fiscal code field
				if (fiscalCodeInput) {
					fiscalCodeInput.placeholder = 'Verrà calcolato automaticamente';
					fiscalCodeInput.setAttribute('readonly', 'readonly');
				}
				const helpElement = document.getElementById('fiscalCodeHelp');
				if (helpElement) {
					helpElement.textContent = 'Compila i campi sopra per il calcolo automatico';
					helpElement.style.color = '#666';
				}
			} else if (authData.user && authData.user.identities && authData.user.identities.length === 0) {
				// User already exists
				showStatus('Un account con questa email esiste già.', 'warning');
			} else {
				throw new Error('Errore durante la registrazione');
			}
		} catch (error) {
			console.error('Registration error:', error);
			let errorMessage = 'Errore durante la registrazione. ';
			
			if (error.message.includes('User already registered') || error.message.includes('already been registered')) {
				errorMessage = 'Un account con questa email esiste già.';
			} else if (error.message.includes('Password should be at least')) {
				errorMessage = 'La password deve essere di almeno 8 caratteri con lettere maiuscole, minuscole, numeri e simboli.';
			} else if (error.message.includes('Invalid email')) {
				errorMessage = 'Indirizzo email non valido.';
			} else if (error.message.includes('signup disabled')) {
				errorMessage = 'La registrazione è temporaneamente disabilitata. Riprova più tardi.';
			} else if (error.message.includes('confirmation email')) {
				errorMessage = 'Registrazione completata! Controlla la tua email per il link di conferma.';
				showStatus(errorMessage, 'success');
				registerForm.reset();
				if (cityInput) cityInput.value = 'Grumo Appula';
				if (provinceInput) provinceInput.value = 'BA';
				return;
			} else if (error.message.includes('fiscal_code')) {
				errorMessage = 'Codice fiscale non valido. Controlla il formato.';
			} else if (error.message.includes('phone_number')) {
				errorMessage = 'Numero di telefono non valido. Usa il formato corretto.';
			} else if (error.message.includes('Unable to validate email address')) {
				errorMessage = 'Indirizzo email non valido o già in uso.';
			} else if (error.message.includes('Email not confirmed')) {
				errorMessage = 'Account creato! Controlla la tua email per il link di conferma prima di accedere.';
				showStatus(errorMessage, 'warning');
				registerForm.reset();
				if (cityInput) cityInput.value = 'Grumo Appula';
				if (provinceInput) provinceInput.value = 'BA';
				return;
			} else {
				// For email confirmation errors, treat as success
				if (error.status === 500 && error.message.includes('Error sending')) {
					errorMessage = 'Registrazione completata! Account creato con successo.';
					showStatus(errorMessage, 'success');
					registerForm.reset();
					if (cityInput) cityInput.value = 'Grumo Appula';
					if (provinceInput) provinceInput.value = 'BA';
					return;
				}
				errorMessage += error.message;
			}
			showStatus(errorMessage, 'error');
		} finally {
			setLoading(false);
		}
	}

	// Real-time password validation
	if (passwordInput) {
		passwordInput.addEventListener('input', function() {
			const password = this.value;
			const helpText = this.nextElementSibling;
			if (helpText) {
				if (password.length > 0 && password.length < 8) {
					helpText.textContent = 'Password troppo corta (minimo 8 caratteri)';
					helpText.style.color = '#d32f2f';
				} else if (password.length >= 8) {
					helpText.textContent = 'Password valida ✓';
					helpText.style.color = '#2e7d32';
				} else {
					helpText.textContent = 'Minimo 8 caratteri';
					helpText.style.color = '#666';
				}
			}
		});
	}

	// Real-time confirm password validation
	if (confirmPasswordInput) {
		confirmPasswordInput.addEventListener('input', function() {
			const password = passwordInput.value;
			const confirmPassword = this.value;
			if (confirmPassword.length > 0) {
				if (password === confirmPassword) {
					this.style.borderColor = '#2e7d32';
				} else {
					this.style.borderColor = '#d32f2f';
				}
			} else {
				this.style.borderColor = '#e1e1e1';
			}
		});
	}

	// Event Listeners
	if (registerForm) {
		registerForm.addEventListener('submit', handleRegistration);
	}

	// Fiscal code auto-calculation
	if (firstNameInput) firstNameInput.addEventListener('input', updateFiscalCode);
	if (lastNameInput) lastNameInput.addEventListener('input', updateFiscalCode);
	if (genderInput) genderInput.addEventListener('change', updateFiscalCode);
	if (dateOfBirthInput) dateOfBirthInput.addEventListener('change', updateFiscalCode);
	if (placeOfBirthInput) placeOfBirthInput.addEventListener('input', updateFiscalCode);

	// Check for existing session on page load
	checkExistingSession();

	// Auto-focus first name field
	if (firstNameInput) {
		firstNameInput.focus();
	}
}

// Initialize registration page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeRegistrationPage);