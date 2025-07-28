// Photo Gallery Swiper e Lightbox - DISABLED: Using inline version in galleria.html
function initPhotoCarousel() {
	// Disabled to prevent conflicts with galleria.html inline carousel
	return;
	const photoSwiper = document.querySelector('.photo-swiper');
	if (!photoSwiper || typeof Swiper === 'undefined') return;
	new Swiper('.photo-swiper', {
		effect: 'coverflow',
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
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

	// Lightbox per immagini
	const slides = document.querySelectorAll('.photo-slide');
	let current = 0;
	let images = Array.from(slides).map(slide => slide.getAttribute('data-image'));
	const lightbox = document.getElementById('photo-lightbox');
	const lightboxImage = lightbox.querySelector('.lightbox-image');
	const closeBtn = lightbox.querySelector('.lightbox-close');
	const prevBtn = lightbox.querySelector('.photo-lightbox-prev');
	const nextBtn = lightbox.querySelector('.photo-lightbox-next');
	function show(idx) {
		if (!images[idx]) return;
		current = idx;
		lightboxImage.src = images[idx];
		lightbox.classList.add('active');
		document.body.style.overflow = 'hidden';
	}
	slides.forEach((slide, idx) => {
		slide.addEventListener('click', () => show(idx));
	});
	closeBtn.addEventListener('click', () => {
		lightbox.classList.remove('active');
		document.body.style.overflow = '';
	});
	prevBtn.addEventListener('click', e => {
		e.stopPropagation();
		show((current - 1 + images.length) % images.length);
	});
	nextBtn.addEventListener('click', e => {
		e.stopPropagation();
		show((current + 1) % images.length);
	});
	lightbox.addEventListener('click', e => {
		if (e.target === lightbox) {
			lightbox.classList.remove('active');
			document.body.style.overflow = '';
		}
	});
	document.addEventListener('keydown', function(e) {
		if (!lightbox.classList.contains('active')) return;
		if (e.key === 'Escape') closeBtn.click();
		if (e.key === 'ArrowLeft') prevBtn.click();
		if (e.key === 'ArrowRight') nextBtn.click();
	});
}
// Global Variables
let currentUser = null;
let currentLightboxImage = 0;
let lightboxImages = [];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
	// Update copyright year automatically
	updateCopyrightYear();

	// Check and apply existing consent choice
	checkExistingConsent();

	   // Initialize all components
	   initNavigation();
	   initCookieBanner();
	   initFAQ();
	   initGallery();
	   initPhotoCarousel();
	   initVideoCarousel();
	   initForms();
	   initCalendar();
	   initSocialFeeds();
	   initMemberArea();

	// Check if user is logged in
	checkUserSession();

	// Render user bar
	renderUserBar();
});

// Update copyright year automatically
function updateCopyrightYear() {
	const currentYearElement = document.getElementById('current-year');
	if (currentYearElement) {
		currentYearElement.textContent = new Date().getFullYear();
	}
}

// Check existing consent and apply it
function checkExistingConsent() {
	const existingConsent = localStorage.getItem('cookieConsent');

	if (existingConsent === 'accepted' && typeof gtag === 'function') {
		// User previously accepted cookies, grant consent
		gtag('consent', 'update', {
			'ad_storage': 'granted',
			'ad_user_data': 'granted',
			'ad_personalization': 'granted',
			'analytics_storage': 'granted'
		});
	}
	// If no consent or declined, keep the default 'denied' state
}

// Navigation
function initNavigation() {
	const navToggle = document.querySelector('.nav-toggle');
	const navMenu = document.querySelector('.nav-menu');

	if (navToggle && navMenu) {
		navToggle.addEventListener('click', function() {
			navMenu.classList.toggle('active');
			navToggle.classList.toggle('active');
		});
	}

	// Close menu when clicking outside
	document.addEventListener('click', function(e) {
		if (!e.target.closest('.navbar')) {
			navMenu?.classList.remove('active');
			navToggle?.classList.remove('active');
		}
	});

	// Smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});
}

// Cookie Banner
function initCookieBanner() {
	const cookieBanner = document.getElementById('cookie-banner');
	const acceptBtn = document.getElementById('cookie-accept');
	const declineBtn = document.getElementById('cookie-decline');

	if (!cookieBanner) return;

	// Check if user has already made a choice
	if (!localStorage.getItem('cookieConsent')) {
		setTimeout(() => {
			cookieBanner.classList.add('show');
		}, 1000);
	}

	acceptBtn?.addEventListener('click', function() {
		localStorage.setItem('cookieConsent', 'accepted');
		cookieBanner.classList.remove('show');

		// Update Google Analytics consent
		if (typeof gtag === 'function') {
			gtag('consent', 'update', {
				'ad_storage': 'granted',
				'ad_user_data': 'granted',
				'ad_personalization': 'granted',
				'analytics_storage': 'granted'
			});
		}

	});

	declineBtn?.addEventListener('click', function() {
		localStorage.setItem('cookieConsent', 'declined');
		cookieBanner.classList.remove('show');

		// Keep Google Analytics consent denied (already set as default)
	});
}

// FAQ Functionality
function initFAQ() {
	const faqItems = document.querySelectorAll('.faq-item');

	faqItems.forEach(item => {
		const question = item.querySelector('.faq-question');
		question?.addEventListener('click', function() {
			const isActive = item.classList.contains('active');

			// Close all other FAQ items
			faqItems.forEach(otherItem => {
				if (otherItem !== item) {
					otherItem.classList.remove('active');
				}
			});

			// Toggle current item
			item.classList.toggle('active', !isActive);
		});
	});
}

// Gallery and Lightbox
function initGallery() {
	const galleryItems = document.querySelectorAll('.gallery-item');
	const lightbox = document.querySelector('.lightbox');
	const lightboxImage = document.querySelector('.lightbox-image');
	const lightboxClose = document.querySelector('.lightbox-close');
	const lightboxPrev = document.querySelector('.lightbox-prev');
	const lightboxNext = document.querySelector('.lightbox-next');

	if (lightbox) {
		// Collect all gallery images
		lightboxImages = Array.from(galleryItems).map(item => {
			const img = item.querySelector('img');
			return {
				src: img.src,
				alt: img.alt
			};
		});

		// Gallery item click handlers
		galleryItems.forEach((item, index) => {
			item.addEventListener('click', function() {
				currentLightboxImage = index;
				showLightbox();
			});
		});

		// Lightbox controls
		lightboxClose?.addEventListener('click', closeLightbox);
		lightboxPrev?.addEventListener('click', prevLightboxImage);
		lightboxNext?.addEventListener('click', nextLightboxImage);

		// Close lightbox on background click
		lightbox.addEventListener('click', function(e) {
			if (e.target === lightbox) {
				closeLightbox();
			}
		});

		// Keyboard navigation
		document.addEventListener('keydown', function(e) {
			if (!lightbox.classList.contains('active')) return;
			switch (e.key) {
				case 'Escape':
					closeLightbox();
					break;
				case 'ArrowLeft':
					prevLightboxImage();
					break;
				case 'ArrowRight':
					nextLightboxImage();
					break;
			}
		});

		function showLightbox() {
			if (lightboxImages.length === 0) return;
			const image = lightboxImages[currentLightboxImage];
			lightboxImage.src = image.src;
			lightboxImage.alt = image.alt;
			lightbox.classList.add('active');
			document.body.style.overflow = 'hidden';
		}

		function closeLightbox() {
			lightbox.classList.remove('active');
			document.body.style.overflow = '';
		}

		function prevLightboxImage() {
			currentLightboxImage = (currentLightboxImage - 1 + lightboxImages.length) % lightboxImages.length;
			showLightbox();
		}

		function nextLightboxImage() {
			currentLightboxImage = (currentLightboxImage + 1) % lightboxImages.length;
			showLightbox();
		}
	}

	// Video lightbox reale
	const videoItems = document.querySelectorAll('.video-item');
	const videoLightbox = document.getElementById('video-lightbox');
	const videoPlayer = document.getElementById('video-player');
	const videoLightboxClose = document.querySelector('.video-lightbox-close');
	const videoLightboxTitle = document.getElementById('video-lightbox-title');
	const videoLightboxDesc = document.getElementById('video-lightbox-desc');

	// Mappa video: ogni video-item deve avere data-video, data-title, data-desc
	videoItems.forEach(item => {
		item.setAttribute('tabindex', '0');
		item.addEventListener('click', function(e) {
			e.preventDefault();
			const videoSrc = item.getAttribute('data-video');
			const title = item.querySelector('.video-info h3')?.textContent || '';
			const desc = item.querySelector('.video-info p')?.textContent || '';
			if (videoSrc) {
				videoPlayer.src = videoSrc;
				videoPlayer.currentTime = 0;
				videoPlayer.play();
			} else {
				videoPlayer.src = '';
			}
			videoLightboxTitle.textContent = title;
			videoLightboxDesc.textContent = desc;
			videoLightbox.classList.add('active');
			videoLightbox.focus();
			document.body.style.overflow = 'hidden';
		});
		item.addEventListener('keydown', function(e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				item.click();
			}
		});
	});
	if (videoLightboxClose) {
		videoLightboxClose.addEventListener('click', closeVideoLightbox);
	}
	videoLightbox?.addEventListener('click', function(e) {
		if (e.target === videoLightbox) closeVideoLightbox();
	});
	document.addEventListener('keydown', function(e) {
		if (!videoLightbox || !videoLightbox.classList.contains('active')) return;
		if (e.key === 'Escape') closeVideoLightbox();
	});
	function closeVideoLightbox() {
		if (!videoLightbox || !videoPlayer) return;
		videoLightbox.classList.remove('active');
		videoPlayer.pause();
		videoPlayer.src = '';
		document.body.style.overflow = '';
	}
}

// Forms
function initForms() {
	const forms = document.querySelectorAll('form');

	forms.forEach(form => {
		// Skip forms that have their own specific handlers (like loginForm)
		if (form.id === 'loginForm') {
			return;
		}

		form.addEventListener('submit', function(e) {
			e.preventDefault();

			const formData = new FormData(form);
			const formType = form.dataset.type || 'contact';

			// Basic form validation
			if (!validateForm(form)) {
				return;
			}

			// Advanced password validation for registration/login forms
			const passwordInput = form.querySelector('input[name="password"]');
			if (passwordInput && (formType === 'register' || formType === 'registration')) {
				const validation = validatePassword(passwordInput.value);
				if (!validation.isValid) {
					showNotification('Password non valida: ' + validation.errors.join(', '), 'error');
					return;
				}
			}

			// Handle different form types
			switch (formType) {
				case 'login':
					handleLoginForm(formData);
					break;
				case 'registration':
					handleRegistrationForm(formData);
					break;
			}
		});
	});

	// Initialize password validation ONLY for registration forms
	const passwordInputs = document.querySelectorAll('input[name="password"]');
	passwordInputs.forEach(passwordInput => {
		const form = passwordInput.closest('form');
		const formType = form?.getAttribute('data-form-type');

		// Only apply password validation to registration forms, not login
		if (formType === 'register' || formType === 'registration' ||
			form?.id === 'register-form' || form?.classList.contains('register-form')) {
			const confirmPasswordInput = passwordInput.form.querySelector('input[name="confirmPassword"], input[name="confirm_password"], input[name="passwordConfirm"]');
			attachPasswordValidation(passwordInput, confirmPasswordInput);
		}
	});
}

// Registration form is handled inline in register.html to avoid conflicts

function validateForm(form) {
	const requiredFields = form.querySelectorAll('[required]');
	let isValid = true;

	requiredFields.forEach(field => {
		if (!field.value.trim()) {
			field.classList.add('error');
			isValid = false;
		} else {
			field.classList.remove('error');
		}
	});

	// Email validation
	const emailFields = form.querySelectorAll('input[type="email"]');
	emailFields.forEach(field => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (field.value && !emailRegex.test(field.value)) {
			field.classList.add('error');
			isValid = false;
		}
	});

	return isValid;
}

// Advanced Password Validation (matches Supabase requirements)
function validatePassword(password) {
	const errors = [];

	// Minimum length check (8 characters)
	if (password.length < 8) {
		errors.push('La password deve essere di almeno 8 caratteri');
	}

	// Lowercase letter check
	if (!/[a-z]/.test(password)) {
		errors.push('La password deve contenere almeno una lettera minuscola');
	}

	// Uppercase letter check
	if (!/[A-Z]/.test(password)) {
		errors.push('La password deve contenere almeno una lettera maiuscola');
	}

	// Digit check
	if (!/\d/.test(password)) {
		errors.push('La password deve contenere almeno un numero');
	}

	// Symbol check (special characters)
	if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) {
		errors.push('La password deve contenere almeno un simbolo (!@#$%^&* etc.)');
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
	if (/\d/.test(password)) strength += 1;
	if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) strength += 1;

	// Return strength level
	if (strength <= 2) return 'weak';
	if (strength <= 4) return 'medium';
	if (strength <= 6) return 'strong';
	return 'very-strong';
}

// Real-time password validation for input fields
function attachPasswordValidation(passwordInput, confirmPasswordInput = null) {
	if (!passwordInput) return;

	// Create or find password feedback container
	let feedbackContainer = passwordInput.parentNode.querySelector('.password-feedback');
	if (!feedbackContainer) {
		feedbackContainer = document.createElement('div');
		feedbackContainer.className = 'password-feedback';
		passwordInput.parentNode.appendChild(feedbackContainer);
	}

	// Create or find password strength indicator
	let strengthIndicator = passwordInput.parentNode.querySelector('.password-strength');
	if (!strengthIndicator) {
		strengthIndicator = document.createElement('div');
		strengthIndicator.className = 'password-strength';
		strengthIndicator.innerHTML = `
			<div class="strength-bar">
				<div class="strength-fill"></div>
			</div>
			<span class="strength-text">Inserisci password</span>
		`;
		passwordInput.parentNode.appendChild(strengthIndicator);
	}

	// Password input validation
	passwordInput.addEventListener('input', function() {
		const password = this.value;
		const validation = validatePassword(password);
		const strengthFill = strengthIndicator.querySelector('.strength-fill');
		const strengthText = strengthIndicator.querySelector('.strength-text');

		// Update feedback
		if (password.length === 0) {
			feedbackContainer.innerHTML = '';
			strengthText.textContent = 'Inserisci password';
			strengthFill.className = 'strength-fill';
			this.classList.remove('error', 'success');
		} else if (validation.isValid) {
			feedbackContainer.innerHTML = '<span class="success">✓ Password valida</span>';
			this.classList.remove('error');
			this.classList.add('success');
		} else {
			feedbackContainer.innerHTML = `
				<ul class="error-list">
					${validation.errors.map(error => `<li>${error}</li>`).join('')}
				</ul>
			`;
			this.classList.remove('success');
			this.classList.add('error');
		}

		// Update strength indicator
		const strengthLevels = {
			'weak': {
				width: '25%',
				color: '#f44336',
				text: 'Debole'
			},
			'medium': {
				width: '50%',
				color: '#ff9800',
				text: 'Media'
			},
			'strong': {
				width: '75%',
				color: '#4caf50',
				text: 'Forte'
			},
			'very-strong': {
				width: '100%',
				color: '#2e7d32',
				text: 'Molto Forte'
			}
		};

		const level = strengthLevels[validation.strength] || {
			width: '0%',
			color: '#e0e0e0',
			text: 'Inserisci password'
		};
		strengthFill.style.width = level.width;
		strengthFill.style.backgroundColor = level.color;
		strengthText.textContent = `Sicurezza: ${level.text}`;

		// Validate confirm password if present
		if (confirmPasswordInput && confirmPasswordInput.value) {
			validatePasswordConfirmation(confirmPasswordInput, password);
		}
	});

	// Confirm password validation
	if (confirmPasswordInput) {
		confirmPasswordInput.addEventListener('input', function() {
			const password = passwordInput.value;
			const confirmPassword = this.value;
			validatePasswordConfirmation(this, password);
		});
	}
}

// Validate password confirmation
function validatePasswordConfirmation(confirmInput, originalPassword) {
	const confirmPassword = confirmInput.value;

	if (confirmPassword.length === 0) {
		confirmInput.classList.remove('error', 'success');
		return;
	}

	if (confirmPassword === originalPassword) {
		confirmInput.classList.remove('error');
		confirmInput.classList.add('success');
	} else {
		confirmInput.classList.remove('success');
		confirmInput.classList.add('error');
	}
}

function handleLoginForm(formData) {
	const email = formData.get('email');
	const password = formData.get('password');

	// Simple login validation - no password requirements check
	if (!email || !password) {
		showNotification('Email e password sono obbligatori', 'error');
		return;
	}

	// Simple mock authentication for login
	currentUser = {
		email: email,
		name: 'Socio'
	};
	localStorage.setItem('currentUser', JSON.stringify(currentUser));
	showNotification('Login effettuato con successo!', 'success');

	// Redirect to members area or show members content
	showMembersContent();
}

function handleRegistrationForm(formData) {
	const userName = formData.get('name') || formData.get('nome');
	const email = formData.get('email');
	const password = formData.get('password');
	const confirmPassword = formData.get('confirm-password');
	const surname = formData.get('surname') || formData.get('cognome');
	const phone = formData.get('phone') || formData.get('telefono');
	const acceptTerms = formData.get('privacy');

	// Validate required fields
	if (!email || !password || !userName || !surname) {
		showNotification('Tutti i campi obbligatori devono essere compilati', 'error');
		return;
	}

	// Validate password strength ONLY for registration
	const passwordValidation = validatePassword(password);
	if (!passwordValidation.isValid) {
		showNotification('Password non valida: ' + passwordValidation.errors.join(', '), 'error');
		return;
	}

	// Check password confirmation
	if (password !== confirmPassword) {
		showNotification('Le password non coincidono', 'error');
		return;
	}

	// Validate email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		showNotification('Formato email non valido', 'error');
		return;
	}

	// Check terms acceptance
	if (!acceptTerms) {
		showNotification('È necessario accettare la privacy policy', 'error');
		return;
	}

	// Registration successful
	showNotification('Registrazione completata! Controlla la tua email per verificare l\'account.', 'success');

	// Optional: redirect to login page after a delay
	setTimeout(() => {
		window.location.href = 'login.html';
	}, 2000);
}

function handleNewsletterForm(formData) {
	const email = formData.get('email');
	showNotification('Iscrizione alla newsletter completata!', 'success');
}

function showMembersContent() {
	const membersContent = document.getElementById('members-content');
	const authSection = document.getElementById('auth-section');

	if (membersContent && authSection) {
		authSection.style.display = 'none';
		membersContent.style.display = 'block';

		// Initialize calendar for members
		if (document.getElementById('events-calendar')) {
			initMembersCalendar();
		}
	}
}

// Initialize member area functionality
function initMemberArea() {
	const loginForm = document.getElementById('login-form');
	const registerForm = document.getElementById('register-form');
	const showRegisterBtn = document.getElementById('show-register');
	const showLoginBtn = document.getElementById('show-login');

	// Cambio Email
	const changeEmailBtn = document.getElementById('change-email-btn');
	const emailChangeForm = document.getElementById('email-change-form');
	const passwordChangeForm = document.getElementById('password-change-form');
	const profileEditForm = document.getElementById('profile-edit-form');
	const updateEmailForm = document.getElementById('update-email-form');
	const cancelEmailBtn = document.getElementById('cancel-email-btn');
	const resendEmailVerificationBtn = document.getElementById('resend-email-verification-btn');

	if (changeEmailBtn && emailChangeForm) {
		changeEmailBtn.addEventListener('click', function() {
			// Mostra il form cambio email, nasconde altri
			emailChangeForm.style.display = 'block';
			if (passwordChangeForm) passwordChangeForm.style.display = 'none';
			if (profileEditForm) profileEditForm.style.display = 'none';
			// Precompila email attuale
			const currentEmailInput = document.getElementById('current-email');
			if (currentEmailInput && currentUser && currentUser.email) {
				currentEmailInput.value = currentUser.email;
			}
		});
	}

	if (resendEmailVerificationBtn) {
		resendEmailVerificationBtn.addEventListener('click', async function() {
			const newEmail = document.getElementById('new-email').value.trim();
			if (!newEmail) {
				showNotification('Inserisci prima la nuova email per poter reinviare la verifica.', 'error');
				return;
			}
			try {
				if (typeof supabaseClient === 'undefined') {
					showNotification('Supabase non inizializzato.', 'error');
					return;
				}
				const { error } = await supabaseClient.auth.resend({
					type: 'email_change',
					email: newEmail
				});
				if (error) {
					showNotification('Errore nell\'invio della mail di verifica: ' + error.message, 'error');
				} else {
					showNotification('Email di verifica reinviata! Controlla la casella di posta.', 'success');
				}
			} catch (err) {
				showNotification('Errore imprevisto: ' + err.message, 'error');
			}
		});
	}

	if (cancelEmailBtn && emailChangeForm) {
		cancelEmailBtn.addEventListener('click', function() {
			emailChangeForm.style.display = 'none';
		});
	}

if (updateEmailForm) {
	updateEmailForm.addEventListener('submit', async function(e) {
		e.preventDefault();
		const newEmail = document.getElementById('new-email').value.trim();
		const confirmNewEmail = document.getElementById('confirm-new-email').value.trim();

		if (!newEmail || !confirmNewEmail) {
			showNotification('Inserisci la nuova email e la conferma', 'error');
			return;
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(newEmail)) {
			showNotification('Formato email non valido', 'error');
			return;
		}
		if (newEmail !== confirmNewEmail) {
			showNotification('Le email non coincidono', 'error');
			return;
		}

		// Cambio email reale con Supabase
		try {
			if (typeof supabaseClient === 'undefined') {
				showNotification('Supabase non inizializzato.', 'error');
				return;
			}
			const { error } = await supabaseClient.auth.updateUser({
				email: newEmail
			});
			if (error) {
				showNotification('Errore durante la richiesta di cambio email: ' + error.message, 'error');
			} else {
				showNotification('Controlla la nuova casella email per confermare il cambio. Il cambio sarà effettivo solo dopo la conferma!', 'success');
			}
		} catch (err) {
			showNotification('Errore imprevisto: ' + err.message, 'error');
		}
	});
}

	if (showRegisterBtn) {
		showRegisterBtn.addEventListener('click', function(e) {
			e.preventDefault();
			loginForm.style.display = 'none';
			registerForm.style.display = 'block';
		});
	}

	if (showLoginBtn) {
		showLoginBtn.addEventListener('click', function(e) {
			e.preventDefault();
			registerForm.style.display = 'none';
			loginForm.style.display = 'block';
		});
	}

	// Check if user is already logged in
	checkUserSession();
}

function checkUserSession() {
	const savedUser = localStorage.getItem('currentUser');
	if (savedUser) {
		currentUser = JSON.parse(savedUser);
		showMembersContent();
	}
}

function logout() {
	currentUser = null;
	localStorage.removeItem('currentUser');

	const membersContent = document.getElementById('members-content');
	const loginForm = document.getElementById('login-form');

	if (membersContent && loginForm) {
		membersContent.style.display = 'none';
		loginForm.style.display = 'block';
	}

	showNotification('Logout effettuato con successo', 'info');
}

// Calendar
function initCalendar() {
	const calendar = document.getElementById('calendar-grid');
	if (!calendar) return;

	renderCalendar();

	// Navigation buttons
	const prevBtn = document.getElementById('calendar-prev');
	const nextBtn = document.getElementById('calendar-next');

	prevBtn?.addEventListener('click', function() {
		currentMonth--;
		if (currentMonth < 0) {
			currentMonth = 11;
			currentYear--;
		}
		renderCalendar();
	});

	nextBtn?.addEventListener('click', function() {
		currentMonth++;
		if (currentMonth > 11) {
			currentMonth = 0;
			currentYear++;
		}
		renderCalendar();
	});
}

function initMembersCalendar() {
	// This would be called only for logged-in members
	initCalendar();

	// Load events from server (mock data for now)
	loadEvents();
}

function renderCalendar() {
	const calendar = document.getElementById('calendar-grid');
	const monthTitle = document.getElementById('calendar-month');

	if (!calendar) return;

	const monthNames = [
		'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
		'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
	];

	const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];

	// Update month title
	if (monthTitle) {
		monthTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;
	}

	// Clear calendar
	calendar.innerHTML = '';

	// Add day headers
	dayNames.forEach(day => {
		const dayHeader = document.createElement('div');
		dayHeader.className = 'calendar-day-header';
		dayHeader.textContent = day;
		calendar.appendChild(dayHeader);
	});

	// Get first day of month and number of days
	const firstDay = new Date(currentYear, currentMonth, 1).getDay();
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

	// Add empty cells for days before month starts
	for (let i = 0; i < firstDay; i++) {
		const emptyDay = document.createElement('div');
		emptyDay.className = 'calendar-day';
		calendar.appendChild(emptyDay);
	}

	// Add days of month
	for (let day = 1; day <= daysInMonth; day++) {
		const dayElement = document.createElement('div');
		dayElement.className = 'calendar-day';
		dayElement.textContent = day;

		// Check if day has events (mock data)
		if (hasEvent(day)) {
			dayElement.classList.add('has-event');
			dayElement.addEventListener('click', () => showEventDetails(day));
		}

		calendar.appendChild(dayElement);
	}
}

function hasEvent(day) {
	// Mock event data - in real app, this would check against actual events
	const eventDays = [5, 12, 18, 25];
	return eventDays.includes(day);
}

function showEventDetails(day) {
	// Mock event details
	const events = {
		5: 'Riunione mensile del direttivo',
		12: 'Evento di raccolta fondi',
		18: 'Conferenza sulla storia locale',
		25: 'Festa di Santa Barbara'
	};

	const eventTitle = events[day] || 'Evento';
	showNotification(`${day} ${getMonthName(currentMonth)}: ${eventTitle}`, 'info');
}

function getMonthName(monthIndex) {
	const months = [
		'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
		'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
	];
	return months[monthIndex];
}

function loadEvents() {
	// Mock function to load events from server
}

// Social Media Integration
function initSocialFeeds() {
	// Mock social media integration
	// In a real implementation, you would use Facebook and Instagram APIs
}

// Utility Functions
function showNotification(message, type = 'info') {
	// Use the new notification system if available, fallback to old system
	if (window.notify) {
		switch(type) {
			case 'success':
				return window.notify.success(message);
			case 'error':
			case 'danger':
				return window.notify.error(message);
			case 'warning':
				return window.notify.warning(message);
			case 'info':
			default:
				return window.notify.info(message);
		}
	}
	
	// Fallback - Create notification element (old system)
	const notification = document.createElement('div');
	notification.className = `notification notification-${type}`;
	notification.innerHTML = `
		<div class="notification-content">
			<span class="notification-message">${message}</span>
			<button class="notification-close">&times;</button>
		</div>
	`;

	// Add styles if not already present
	if (!document.querySelector('#notification-styles')) {
		const styles = document.createElement('style');
		styles.id = 'notification-styles';
		styles.textContent = `
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
		`;
		document.head.appendChild(styles);
	}

	// Add to page
	document.body.appendChild(notification);

	// Show notification
	setTimeout(() => {
		notification.classList.add('show');
	}, 100);

	// Auto-hide after 5 seconds
	setTimeout(() => {
		hideNotification(notification);
	}, 5000);

	// Close button handler
	notification.querySelector('.notification-close').addEventListener('click', () => {
		hideNotification(notification);
	});
}

function hideNotification(notification) {
	notification.classList.remove('show');
	setTimeout(() => {
		notification.remove();
	}, 300);
}

// Load FAQ from JSON (if exists)
function loadFAQ() {
	fetch('data/faq.json')
		.then(response => response.json())
		.then(data => {
			const faqContainer = document.getElementById('faq-container');
			if (faqContainer) {
				faqContainer.innerHTML = '';
				data.forEach(item => {
					const faqElement = createFAQElement(item.question, item.answer);
					faqContainer.appendChild(faqElement);
				});
				initFAQ();
			}
		})
		.catch(error => {
		});
}

function createFAQElement(question, answer) {
	const faqItem = document.createElement('div');
	faqItem.className = 'faq-item';
	faqItem.innerHTML = `
		<button class="faq-question">
			${question}
			<span class="faq-icon">▼</span>
		</button>
		<div class="faq-answer">
			<p>${answer}</p>
		</div>
	`;
	return faqItem;
}

// Video Carousel 3D Coverflow - DISABLED: Using inline version in galleria.html
function initVideoCarousel() {
	// Disabled to prevent conflicts with galleria.html inline carousel
	return;
	// Check if video carousel exists on current page
	const videoSwiper = document.querySelector('.video-swiper');
	if (!videoSwiper) return;

	// Ensure Swiper CSS is loaded
	if (typeof Swiper === 'undefined') {
		console.error('Swiper library not loaded');
		return;
	}

	const nextButton = document.querySelector('.swiper-button-next');
	const prevButton = document.querySelector('.swiper-button-prev');
	
	// Ensure arrows are properly set up
	if (nextButton) {
		nextButton.style.pointerEvents = 'auto';
		nextButton.style.cursor = 'pointer';
	}
	if (prevButton) {
		prevButton.style.pointerEvents = 'auto';
		prevButton.style.cursor = 'pointer';
	}

	// Inizializzazione Swiper con effetto Coverflow
	const swiper = new Swiper('.video-swiper', {
		effect: 'coverflow',
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		speed: 600,
		initialSlide: 2, // Inizia dalla terza slide (indice 2) per avere una slide centrale
		// Configurazione Coverflow
		coverflowEffect: {
			rotate: 30,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows: true,
		},
		// Breakpoints responsive
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
				coverflowEffect: {
					rotate: 45,
					stretch: 0,
					depth: 100,
					modifier: 1,
				},
			},
			640: {
				slidesPerView: 2,
				spaceBetween: 20,
				coverflowEffect: {
					rotate: 35,
					stretch: 0,
					depth: 100,
					modifier: 1,
				},
			},
			768: {
				slidesPerView: 2.5,
				spaceBetween: 30,
				coverflowEffect: {
					rotate: 30,
					stretch: 0,
					depth: 100,
					modifier: 1,
				},
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 30,
				coverflowEffect: {
					rotate: 30,
					stretch: 0,
					depth: 100,
					modifier: 1,
				},
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
			1400: {
				slidesPerView: 5,
				spaceBetween: 30,
			}
		},
		// Navigazione
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
			disabledClass: 'swiper-button-disabled',
		},
		// Paginazione
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true,
		},
		// Controlli touch
		touchRatio: 1,
		touchAngle: 45,
		simulateTouch: true,
		allowTouchMove: true,
		// Autoplay opzionale
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		// Transizioni fluide
		on: {
			slideChange: function () {
				document.querySelectorAll('.swiper-slide').forEach(slide => {
					slide.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
				});
			},
			init: function() {
				// Animazione iniziale
				setTimeout(() => {
					this.autoplay.start();
				}, 1000);
				// Assicura che la slide iniziale sia centrata
				setTimeout(() => {
					this.slideTo(2, 0);
				}, 100);
			}
		}
	});

	// Gestione Video Overlay/Lightbox
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
				// Pausa autoplay dello swiper
				swiper.autoplay.stop();
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
		}
	});

	// Chiusura video overlay
	function closeVideoOverlay() {
		videoOverlay.classList.remove('active');
		overlayVideo.pause();
		overlayVideo.src = '';
		document.body.style.overflow = 'auto';
		
		// Riprende autoplay dello swiper
		swiper.autoplay.start();
	}

	if (closeButton) {
		closeButton.addEventListener('click', closeVideoOverlay);
	}

	// Chiusura con click sull'overlay
	if (videoOverlay) {
		videoOverlay.addEventListener('click', (e) => {
			if (e.target === videoOverlay) {
				closeVideoOverlay();
			}
		});
	}

	// Chiusura con tasto ESC
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && videoOverlay && videoOverlay.classList.contains('active')) {
			closeVideoOverlay();
		}
	});

	// Gestione controlli video avanzati
	if (overlayVideo) {
		overlayVideo.addEventListener('loadedmetadata', function() {
			// Video caricato, possibili controlli aggiuntivi
		});
	}

	// Effetti hover aggiuntivi
	slides.forEach(slide => {
		const playButton = slide.querySelector('.play-button');
		
		slide.addEventListener('mouseenter', () => {
			if (playButton && !slide.classList.contains('swiper-slide-active')) {
				playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
			}
		});
		
		slide.addEventListener('mouseleave', () => {
			if (playButton && !slide.classList.contains('swiper-slide-active')) {
				playButton.style.transform = 'translate(-50%, -50%) scale(1)';
			}
		});
	});

	// Ottimizzazione performance per mobile
	if (window.innerWidth <= 768) {
		// Disabilita alcune animazioni pesanti su mobile
		swiper.autoplay.delay = 7000;
	}

	// Gestione resize finestra
	window.addEventListener('resize', () => {
		swiper.update();
	});

	// Preload delle immagini per performance migliori
	const images = document.querySelectorAll('.video-thumbnail img');
	images.forEach(img => {
		const imageUrl = img.src;
		const preloadImage = new Image();
		preloadImage.src = imageUrl;
	});
}

// --- User Bar Centralizzata ---
function renderUserBar() {
  const userBar = document.getElementById('user-bar');
  if (!userBar) return;

  // Recupera utente loggato (coerente con il resto del sito)
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const isAreaSoci = window.location.pathname.endsWith('area-soci.html');

document.addEventListener('DOMContentLoaded', renderUserBar);
// --- Fine User Bar Centralizzata ---

// Initialize FAQ loading
document.addEventListener('DOMContentLoaded', function() {
	if (document.getElementById('faq-container')) {
		loadFAQ();
	}
});

// Export functions for global use
window.logout = logout;
window.showNotification = showNotification;

// Cookie management function - available globally
function manageCookies() {
	// Simple cookie consent management
	const currentConsent = localStorage.getItem('cookieConsent');

	const userChoice = confirm(
		'Gestione Cookie:\n\n' +
		'Cookie Analytics (Google Analytics): ' + (currentConsent === 'accepted' ? 'ATTIVATI' : 'DISATTIVATI') + '\n\n' +
		'Vuoi modificare le impostazioni?\n\n' +
		'OK = Attiva Analytics\n' +
		'Annulla = Disattiva Analytics'
	);

	if (userChoice) {
		// User clicked OK - enable analytics
		localStorage.setItem('cookieConsent', 'accepted');
		if (typeof gtag === 'function') {
			gtag('consent', 'update', {
				'analytics_storage': 'granted'
			});
		}
		showNotification('Cookie analytics attivati. La pagina verrà ricaricata.', 'success');
		setTimeout(() => location.reload(), 1500);
	} else {
		// User clicked Cancel - disable analytics
		localStorage.setItem('cookieConsent', 'denied');
		if (typeof gtag === 'function') {
			gtag('consent', 'update', {
				'analytics_storage': 'denied'
			});
		}
		showNotification('Cookie analytics disattivati. La pagina verrà ricaricata.', 'info');
		setTimeout(() => location.reload(), 1500);
	}
}

// Make manageCookies globally available
window.manageCookies = manageCookies;

// Create global cookieConsent object for compatibility
window.cookieConsent = {
	open: function() {
		manageCookies();
	}
};
}

// BidVertiser Ad Scripts - Moved from inline in index.html
function initBidVertiserAds() {
  // Primary ad (desktop and tablet)
  if (document.getElementById('ntv_2101043')) {
    (function(d) {
      var params = {
        bvwidgetid: "ntv_2101043",
        bvlinksownid: 2101043,
        rows: 1,
        cols: 2,
        textpos: "below",
        imagewidth: 225,
        mobilecols: 2,
        cb: (new Date()).getTime()
      };
      params.bvwidgetid = "ntv_2101043" + params.cb;
      d.getElementById("ntv_2101043").id = params.bvwidgetid;
      var qs = Object.keys(params).reduce(function(a, k) {
        a.push(k + '=' + encodeURIComponent(params[k])); return a;
      }, []).join(String.fromCharCode(38));
      var s = d.createElement('script'); s.type='text/javascript';s.async=true;
      var p = 'https:' == document.location.protocol ? 'https' : 'http';
      s.src = p + "://cdn.hyperpromote.com/bidvertiser/tags/active/bdvws.js?" + qs;
      d.getElementById(params.bvwidgetid).appendChild(s);
    })(document);
  }

  // Mobile ad
  if (document.getElementById('ntv_2101043_mobile')) {
    (function(d) {
      var params = {
        bvwidgetid: "ntv_2101043_mobile",
        bvlinksownid: 2101043,
        rows: 1,
        cols: 2,
        textpos: "below",
        imagewidth: 225,
        mobilecols: 1,
        cb: (new Date()).getTime()
      };
      params.bvwidgetid = "ntv_2101043_mobile" + params.cb;
      d.getElementById("ntv_2101043_mobile").id = params.bvwidgetid;
      var qs = Object.keys(params).reduce(function(a, k) {
        a.push(k + '=' + encodeURIComponent(params[k])); return a;
      }, []).join(String.fromCharCode(38));
      var s = d.createElement('script'); s.type='text/javascript';s.async=true;
      var p = 'https:' == document.location.protocol ? 'https' : 'http';
      s.src = p + "://cdn.hyperpromote.com/bidvertiser/tags/active/bdvws.js?" + qs;
      d.getElementById(params.bvwidgetid).appendChild(s);
    })(document);
  }

}

// Initialize BidVertiser ads when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Add small delay to ensure elements are ready
  setTimeout(initBidVertiserAds, 100);
});

// ============= CHI SIAMO PAGE SPECIFIC FUNCTIONALITY =============
// Supabase configuration
const SUPABASE_URL = 'https://ciezrbsolxpjxswdkkpo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZXpyYnNvbHhwanhzd2Rra3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjM1NjAsImV4cCI6MjA2ODQ5OTU2MH0.V-U8KhO8byObUW5kJ8XbLBkp9O9Efh98MdbKYFfbQJk';

// Function to get events count from Supabase
async function getEventsCount() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/events?select=count`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
      }
    });
    
    if (response.ok) {
      const countHeader = response.headers.get('content-range');
      if (countHeader) {
        const count = parseInt(countHeader.split('/')[1]);
        return count || 0;
      }
    }
    return 0;
  } catch (error) {
    console.error('Errore nel recupero del conteggio eventi:', error);
    return 0;
  }
}

// Function to get activities count from Supabase
async function getAttivitaCount() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/attivita?select=count`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
      }
    });
    
    if (response.ok) {
      const countHeader = response.headers.get('content-range');
      if (countHeader) {
        const count = parseInt(countHeader.split('/')[1]);
        return count || 0;
      }
    }
    return 0;
  } catch (error) {
    console.error('Errore nel recupero del conteggio attività:', error);
    return 0;
  }
}

// Enhanced UX JavaScript for Chi Siamo
async function initChiSiamoPage() {
  // Only run if chi-siamo specific elements exist
  const chiSiamoElements = document.querySelector('.team-member') || document.querySelector('#eventi-counter') || document.querySelector('.chi-siamo-header');
  if (!chiSiamoElements) {
    return;
  }
  
  // Load events count
  const eventsCount = await getEventsCount();
  const eventiCounter = document.getElementById('eventi-counter');
  if (eventiCounter) {
    eventiCounter.dataset.target = eventsCount;
  }
  
  // Calculate years of activity (current year - 2008)
  const currentYear = new Date().getFullYear();
  const foundationYear = 2008;
  const yearsOfActivity = currentYear - foundationYear;
  const anniCounter = document.getElementById('anni-counter');
  if (anniCounter) {
    anniCounter.dataset.target = yearsOfActivity;
  }
  
  // Load activities count
  const attivitaCount = await getAttivitaCount();
  const progettiCounter = document.getElementById('progetti-counter');
  if (progettiCounter) {
    progettiCounter.dataset.target = attivitaCount;
  }
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.dataset.delay || 0;
        
        setTimeout(() => {
          element.style.animationDelay = delay + 'ms';
          element.classList.add('animate');
        }, delay);
        
        observer.unobserve(element);
      }
    });
  }, observerOptions);
  
  // Observe all animated elements
  document.querySelectorAll('.animate-fade-up, .animate-slide-left, .animate-slide-right').forEach(el => {
    observer.observe(el);
  });
  
  // Counter animation
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      element.textContent = Math.floor(start);
      
      if (start >= target) {
        element.textContent = target + (target >= 100 ? '+' : '');
        clearInterval(timer);
      }
    }, 16);
  }
  
  // Stats counter observer
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => {
          const target = parseInt(counter.dataset.target);
          animateCounter(counter, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
  
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.chi-siamo-header');
    if (header && scrolled < header.offsetHeight) {
      header.style.transform = `translateY(${scrolled * 0.25}px)`;
    }
  });
  
  // Add loading animation
  document.querySelectorAll('.enhanced-card, .value-card, .enhanced-stat').forEach((card, index) => {
    card.style.animationDelay = (index * 100) + 'ms';
  });
}

// Initialize Chi Siamo functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initChiSiamoPage();
});

// ============= ATTIVITA PAGE SPECIFIC FUNCTIONALITY =============
// Activity details function
function showActivityDetails(id) {
  document.querySelectorAll('.activity-details').forEach(function(sec) { 
    sec.classList.remove('active'); 
  });
  
  var el = document.getElementById(id);
  if (el) el.classList.add('active');
  
  // Gestione effetto card
  document.querySelectorAll('.card[onclick]').forEach(function(card) { 
    card.classList.remove('card-active'); 
  });
  
  if (id === 'dettagli-corteo') {
    const card = document.querySelector('.card[onclick*="dettagli-corteo"]');
    if (card) card.classList.add('card-active');
  } else if (id === 'dettagli-tamburi') {
    const card = document.querySelector('.card[onclick*="dettagli-tamburi"]');
    if (card) card.classList.add('card-active');
  } else if (id === 'dettagli-inarrivo') {
    const card = document.querySelector('.card[onclick*="dettagli-inarrivo"]');
    if (card) card.classList.add('card-active');
  }
  
  if (el) {
    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }
}

// Supabase configuration for activities
async function loadAttivita() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/attivita?select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Errore nel caricamento delle attività');
    
    const attivita = await response.json();
    renderAttivita(attivita);
    renderActivityDetails(attivita);
    
  } catch (error) {
    console.error('Errore:', error);
    const container = document.getElementById('attivita-container');
    if (container) {
      container.innerHTML = '<p>Errore nel caricamento delle attività</p>';
    }
  }
}

// Render activity cards
function renderAttivita(attivita) {
  const container = document.getElementById('attivita-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  attivita.forEach((activity, index) => {
    const col = document.createElement('div');
    col.className = 'col-md-4 animate-fade-up';
    col.setAttribute('data-delay', index * 100);
    
    col.innerHTML = `
      <div class="enhanced-card" onclick="showActivityDetails('dettagli-${activity.id}')">
        <div class="card-img-container">
          <img src="${activity.image_url}" alt="${activity.title}" class="card-img">
          <div class="card-overlay">
            <div class="overlay-icon">${activity.emoji}</div>
          </div>
        </div>
        <div class="enhanced-card-content">
          <h3>${activity.title}</h3>
          <p>${activity.short_description}</p>
        </div>
      </div>
    `;
    
    container.appendChild(col);
  });
}

// Render activity details
function renderActivityDetails(attivita) {
  const container = document.getElementById('activity-details-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  attivita.forEach(activity => {
    const detailDiv = document.createElement('div');
    detailDiv.id = `dettagli-${activity.id}`;
    detailDiv.className = 'activity-details';
    
    let photosHtml = '';
    if (activity.photo1_url) {
      photosHtml += `<img src="${activity.photo1_url}" alt="${activity.title} foto 1" onclick="openLightbox('${activity.photo1_url}')" style="cursor: pointer;">`;
    }
    if (activity.photo2_url) {
      photosHtml += `<img src="${activity.photo2_url}" alt="${activity.title} foto 2" onclick="openLightbox('${activity.photo2_url}')" style="cursor: pointer;">`;
    }
    
    let cubitalList = '';
    if (activity.cubital1 || activity.cubital2 || activity.cubital3) {
      cubitalList = '<ul>';
      if (activity.cubital1) cubitalList += `<li>${activity.cubital1}</li>`;
      if (activity.cubital2) cubitalList += `<li>${activity.cubital2}</li>`;
      if (activity.cubital3) cubitalList += `<li>${activity.cubital3}</li>`;
      cubitalList += '</ul>';
    }
    
    detailDiv.innerHTML = `
      <h3>${activity.title}</h3>
      <div style="display:flex;align-items:flex-start;flex-wrap:wrap;">
        ${photosHtml}
        <div>
          <p>${activity.long_description}</p>
          ${cubitalList}
        </div>
      </div>
    `;
    
    container.appendChild(detailDiv);
  });
}

// Lightbox functions
function openLightbox(imageSrc) {
  let lightbox = document.getElementById('photo-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'photo-lightbox';
    lightbox.className = 'photo-lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
        <img id="lightbox-image" src="" alt="Foto ingrandita">
      </div>
    `;
    document.body.appendChild(lightbox);
  }
  
  document.getElementById('lightbox-image').src = imageSrc;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('photo-lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Initialize Attivita page functionality
async function initAttivitaPage() {
  // Only run if attivita specific elements exist
  const attivitaElements = document.getElementById('attivita-container') || document.querySelector('.activity-details');
  if (!attivitaElements) {
    return;
  }
  
  // Load activities from Supabase
  await loadAttivita();
  
  // Lightbox event listeners
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('photo-lightbox')) {
      closeLightbox();
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
  
  // Make functions global
  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;
  window.showActivityDetails = showActivityDetails;
  
  // Enhanced UX for Attivita page
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.dataset.delay || 0;
        
        setTimeout(() => {
          element.style.animationDelay = delay + 'ms';
          element.classList.add('animate');
        }, delay);
        
        observer.unobserve(element);
      }
    });
  }, observerOptions);
  
  // Observe animated elements
  document.querySelectorAll('.animate-fade-up').forEach(el => {
    observer.observe(el);
  });
  
  // Enhanced card interaction
  document.querySelectorAll('.enhanced-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      if (!this.classList.contains('card-active')) {
        this.style.transform = 'translateY(-15px) scale(1.03)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('card-active')) {
        this.style.transform = 'translateY(0) scale(1)';
      }
    });
  });
  
  // Parallax effect for page header
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.page-header');
    if (header) {
      header.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });
  
  // Enhanced showActivityDetails override
  const originalShowActivityDetails = window.showActivityDetails;
  window.showActivityDetails = function(id) {
    // Remove active state from all cards first
    document.querySelectorAll('.enhanced-card').forEach(card => {
      card.classList.remove('card-active');
      card.style.transform = '';
    });
    
    // Call original function
    originalShowActivityDetails(id);
    
    // Add enhanced styling to clicked card
    let activeCard = null;
    if (id === 'dettagli-corteo') {
      activeCard = document.querySelector('.enhanced-card[onclick*="dettagli-corteo"]');
    } else if (id === 'dettagli-tamburi') {
      activeCard = document.querySelector('.enhanced-card[onclick*="dettagli-tamburi"]');
    } else if (id === 'dettagli-inarrivo') {
      activeCard = document.querySelector('.enhanced-card[onclick*="dettagli-inarrivo"]');
    }
    
    if (activeCard) {
      activeCard.classList.add('card-active');
      activeCard.style.transform = 'translateY(-15px) scale(1.05)';
    }
    
    // Add enhanced animation to active details
    setTimeout(() => {
      const activeDetail = document.getElementById(id);
      if (activeDetail && activeDetail.classList.contains('active')) {
        activeDetail.style.animation = 'fadeIn 0.6s ease, slideUp 0.6s ease';
        activeDetail.style.transform = 'translateY(0)';
      }
    }, 100);
  };
  
  // Add staggered loading animation for cards
  document.querySelectorAll('.enhanced-card').forEach((card, index) => {
    card.style.animationDelay = (index * 100) + 'ms';
  });
}

// Initialize both Chi Siamo and Attivita functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initChiSiamoPage();
  initAttivitaPage();
  initEventiPage();
});

// ============= EVENTI PAGE SPECIFIC FUNCTIONALITY =============
// Supabase client for eventi page
let supabaseEventiClient = null;

// Initialize eventi page functionality
async function initEventiPage() {
  // Only run if eventi specific elements exist
  const eventiElements = document.getElementById('public-events-list') || document.getElementById('future-events-list') || document.querySelector('.eventi-header');
  if (!eventiElements) {
    return;
  }
  
  // Initialize Supabase client if not already initialized
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    supabaseEventiClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  
  // Load public events
  await loadPublicEvents();
  
  // Setup parallax effect
  setupEventiParallax();
  
  // Setup modal events
  setupEventiModal();
  
  // Check for logged in user
  checkLoggedInUser();
  
  // Add ripple animation keyframes
  addEventiStyles();
  
  // Initialize page animations
  setTimeout(() => {
    document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-slide-right').forEach(el => {
      el.classList.add('animate');
    });
  }, 100);
}

// Load public events from Supabase
async function loadPublicEvents() {
  if (!supabaseEventiClient) return;
  
  const eventsList = document.getElementById('public-events-list');
  const futureEventsList = document.getElementById('future-events-list');
  const pastEventsList = document.getElementById('past-events-list');
  
  if (futureEventsList) {
    futureEventsList.innerHTML = '<div style="text-align:center;color:#E10600;font-size:1.1em;"><span class="loading-spinner"></span>Caricamento eventi...</div>';
  }
  if (pastEventsList) {
    pastEventsList.innerHTML = '';
  }
  
  const { data, error } = await supabaseEventiClient.from('events').select('*').eq('is_public', true).order('event_date', { ascending: true });
  
  if (error) {
    if (futureEventsList) {
      futureEventsList.innerHTML = `<div style="color:red;text-align:center;">Errore nel caricamento eventi: ${error.message}</div>`;
    }
    return;
  }
  
  if (!data || data.length === 0) {
    if (futureEventsList) {
      futureEventsList.innerHTML = '<div style="text-align:center;color:#444;">Nessun evento pubblico disponibile al momento.</div>';
    }
    return;
  }
  
  // Divide events into future and past
  const now = new Date();
  const futureEvents = [];
  const pastEvents = [];
  
  data.forEach(ev => {
    const eventDate = ev.event_date ? new Date(ev.event_date) : null;
    if (eventDate && eventDate.setHours(0,0,0,0) >= now.setHours(0,0,0,0)) {
      futureEvents.push(ev);
    } else {
      pastEvents.push(ev);
    }
  });
  
  // Sort future events ascending, past events descending
  futureEvents.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
  pastEvents.sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
  
  // Render events
  if (futureEventsList) {
    futureEventsList.innerHTML = futureEvents.length ? futureEvents.map(ev => renderEventCard(ev, false)).join('') : '<div style="text-align:center;color:#444;">Nessun evento futuro.</div>';
  }
  
  if (pastEventsList) {
    pastEventsList.innerHTML = pastEvents.length ? pastEvents.map(ev => renderEventCard(ev, true)).join('') : '<div style="text-align:center;color:#888;">Nessun evento passato.</div>';
  }
  
  // Initialize animations after DOM update
  setTimeout(() => {
    initializeEventiAnimations();
    setupEventiHoverEffects();
  }, 100);
}

// Render event card
function renderEventCard(ev, isPast = false) {
  const img = ev.image_url ? `
    <div class="card-img-container" onclick="event.stopPropagation(); openImageLightbox('${ev.image_url}');" style="cursor: pointer;">
      <img src="${ev.image_url}" alt="Locandina evento" class="card-img" ${isPast ? 'style="filter:grayscale(0.7) contrast(0.95);"' : ''}>
      <div class="card-overlay">
        <span style="color: white; font-weight: 600;">🔍 Ingrandisci immagine</span>
      </div>
      ${!isPast ? '<div class="event-date-badge">' + (ev.event_date ? new Date(ev.event_date).getDate() + '/' + (new Date(ev.event_date).getMonth() + 1) : 'TBD') + '</div>' : ''}
    </div>
  ` : '';
  
  const date = ev.event_date ? new Date(ev.event_date).toLocaleDateString('it-IT') : '';
  const time = ev.event_time ? `Ore ${ev.event_time}` : '';
  const location = ev.location ? `<span style="font-size:1.05em;">${ev.location}</span>` : '';
  
  // Determine event type for badge
  const eventType = ev.category || 'generale';
  const typeBadge = `<span class="event-type-badge ${eventType.toLowerCase()}">${eventType}</span>`;
  
  // Check if event is recent (within 7 days)
  const isRecent = ev.created_at && new Date() - new Date(ev.created_at) < 7 * 24 * 60 * 60 * 1000;
  
  return `
    <article class="card enhanced-card event-card ${isPast ? 'past-event' : ''} ${isRecent && !isPast ? 'pulse-glow' : ''}" data-event-id="${ev.id}" onclick="openEventModal('${ev.id}')" style="cursor: pointer;">
      ${img}
      <div class="card-content">
        ${!isPast ? typeBadge : ''}
        <h3 style="color:${isPast ? '#b0b0b0' : '#E10600'};font-size:1.4em;margin-bottom:0.8em;font-weight:600;">${ev.title || 'Evento'}</h3>
        <div style="font-size:1.1em;color:${isPast ? '#888' : '#333'};margin-bottom:1em;">
          <div style="margin-bottom:0.5em;"><strong style="color:${isPast ? '#999' : '#E10600'};">${date}</strong></div>
          ${time ? `<div style="font-size:1em;color:${isPast ? '#b0b0b0' : '#666'};margin-bottom:0.5em;">${time}</div>` : ''}
          ${location ? `<div style="color:${isPast ? '#aaa' : '#555'};">${location}</div>` : ''}
        </div>
        <p style="font-size:1em;color:${isPast ? '#aaa' : '#555'};line-height:1.6;margin-bottom:1em;">${ev.description || ''}</p>
        ${ev.external_link && !isPast ? `<a href="${ev.external_link}" target="_blank" onclick="event.stopPropagation();" style="display:inline-block;background:linear-gradient(135deg, #E10600, #FF4500);color:#fff;padding:0.6em 1.5em;border-radius:20px;font-size:1em;text-decoration:none;box-shadow:0 4px 15px rgba(225,6,0,0.3);transition:all 0.3s ease;font-weight:600;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(225,6,0,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(225,6,0,0.3)'">🔗 Info evento</a>` : ''}
      </div>
    </article>
  `;
}

// Global functions for modal and lightbox
window.openEventModal = async function(eventId) {
  if (!supabaseEventiClient) return;
  
  const modal = document.getElementById('event-modal');
  const modalContent = document.getElementById('modal-html-content');
  
  if (!modal || !modalContent) {
    console.error('Modal elements not found');
    return;
  }
  
  modalContent.innerHTML = '<div style="text-align:center;color:#E10600;padding:2rem;">Caricamento...</div>';
  modal.style.display = 'flex';
  modal.classList.add('active');
  
  try {
    // Get event basic info first
    const { data: eventData, error: eventError } = await supabaseEventiClient
      .from('events')
      .select('title, description')
      .eq('id', eventId)
      .single();
    
    if (eventError) {
      throw new Error(`Errore recupero evento: ${eventError.message}`);
    }
    
    // Get HTML content from content table using eventId as reference
    const { data: contentData, error: contentError } = await supabaseEventiClient
      .from('content')
      .select('html_content')
      .eq('event_id', eventId)
      .single();
    
    if (contentError && contentError.code !== 'PGRST116') {
      throw new Error(`Errore recupero contenuto: ${contentError.message}`);
    }
    
    // Build modal content
    let modalHtml = '';
    
    if (eventData) {
      modalHtml += `<h2 style="color: #E10600; margin-bottom: 1rem;">${eventData.title || 'Evento'}</h2>`;
      if (eventData.description) {
        modalHtml += `<p style="color: #666; margin-bottom: 1.5rem; line-height: 1.6;">${eventData.description}</p>`;
      }
    }
    
    if (contentData && contentData.html_content) {
      modalHtml += `<div style="margin-top: 1rem;">${contentData.html_content}</div>`;
    } else {
      modalHtml += `<div style="color: #999; font-style: italic; text-align: center; padding: 2rem;">Contenuto dettagliato non disponibile per questo evento.</div>`;
    }
    
    modalContent.innerHTML = modalHtml;
    
  } catch (error) {
    console.error('Error loading event modal:', error);
    modalContent.innerHTML = `
      <div style="color: #E10600; text-align: center; padding: 2rem;">
        <h3>Errore di caricamento</h3>
        <p style="color: #666; margin-top: 1rem;">${error.message}</p>
      </div>
    `;
  }
};

// Image lightbox functionality
window.openImageLightbox = function(imageUrl) {
  // Create or get image lightbox
  let lightbox = document.getElementById('image-lightbox');
  if (!lightbox) {
    lightbox = createImageLightbox();
  }
  
  // Reset zoom state when opening new image
  if (typeof window.currentZoom !== 'undefined') {
    window.currentZoom = 1;
    window.imgPosition = { x: 0, y: 0 };
  }
  
  // Show image
  const img = document.getElementById('lightbox-img');
  if (img) {
    img.src = imageUrl;
    img.style.transform = 'translate(0px, 0px) scale(1)';
  }
  
  const zoomInfo = document.getElementById('zoom-info');
  if (zoomInfo) {
    zoomInfo.textContent = '100%';
  }
  
  lightbox.style.display = 'flex';
  setTimeout(() => {
    lightbox.style.opacity = '1';
  }, 10);
  document.body.style.overflow = 'hidden';
};

window.closeImageLightbox = function() {
  const lightbox = document.getElementById('image-lightbox');
  if (lightbox) {
    // Reset zoom state
    if (typeof window.currentZoom !== 'undefined') {
      window.currentZoom = 1;
      window.imgPosition = { x: 0, y: 0 };
    }
    
    lightbox.style.opacity = '0';
    setTimeout(() => {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
};

// Create image lightbox element
function createImageLightbox() {
  const lightbox = document.createElement('div');
  lightbox.id = 'image-lightbox';
  lightbox.style.cssText = `
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
  `;
  
  lightbox.innerHTML = `
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
  `;
  
  document.body.appendChild(lightbox);
  setupLightboxInteractions();
  
  return lightbox;
}

// Setup lightbox zoom and drag interactions
function setupLightboxInteractions() {
  // Initialize zoom variables
  window.currentZoom = 1;
  window.isDragging = false;
  window.dragStart = { x: 0, y: 0 };
  window.imgPosition = { x: 0, y: 0 };
  
  const img = document.getElementById('lightbox-img');
  const container = document.getElementById('lightbox-container');
  const zoomInfo = document.getElementById('zoom-info');
  
  if (!img || !container || !zoomInfo) return;
  
  // Zoom functions
  window.zoomImage = function(delta) {
    window.currentZoom = Math.max(0.5, Math.min(5, window.currentZoom + delta));
    updateImageTransform();
    updateZoomInfo();
  };
  
  window.resetZoom = function() {
    window.currentZoom = 1;
    window.imgPosition = { x: 0, y: 0 };
    updateImageTransform();
    updateZoomInfo();
  };
  
  function updateImageTransform() {
    img.style.transform = `translate(${window.imgPosition.x}px, ${window.imgPosition.y}px) scale(${window.currentZoom})`;
    img.style.cursor = window.currentZoom > 1 ? 'grab' : 'default';
  }
  
  function updateZoomInfo() {
    zoomInfo.textContent = Math.round(window.currentZoom * 100) + '%';
  }
  
  // Mouse wheel zoom
  container.addEventListener('wheel', function(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    window.zoomImage(delta);
  });
  
  // Double click to zoom
  img.addEventListener('dblclick', function(e) {
    if (window.currentZoom === 1) {
      window.currentZoom = 2;
    } else {
      window.resetZoom();
      return;
    }
    updateImageTransform();
    updateZoomInfo();
  });
  
  // Mouse drag functionality
  img.addEventListener('mousedown', function(e) {
    if (window.currentZoom > 1) {
      window.isDragging = true;
      img.style.cursor = 'grabbing';
      window.dragStart.x = e.clientX - window.imgPosition.x;
      window.dragStart.y = e.clientY - window.imgPosition.y;
      e.preventDefault();
    }
  });
  
  document.addEventListener('mousemove', function(e) {
    if (window.isDragging && window.currentZoom > 1) {
      window.imgPosition.x = e.clientX - window.dragStart.x;
      window.imgPosition.y = e.clientY - window.dragStart.y;
      updateImageTransform();
    }
  });
  
  document.addEventListener('mouseup', function() {
    if (window.isDragging) {
      window.isDragging = false;
      img.style.cursor = window.currentZoom > 1 ? 'grab' : 'default';
    }
  });
  
  // Close on background click
  const lightbox = document.getElementById('image-lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeImageLightbox();
      }
    });
  }
  
  // Close on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox && lightbox.style.display !== 'none') {
      closeImageLightbox();
    }
  });
}

// Initialize animations for eventi
function initializeEventiAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = element.dataset.delay || 0;
        
        setTimeout(() => {
          element.style.animationDelay = delay + 'ms';
          element.classList.add('animate');
        }, delay);
        
        observer.unobserve(element);
      }
    });
  }, observerOptions);
  
  // Observe all animated elements
  document.querySelectorAll('.animate-slide-up, .animate-slide-left, .animate-slide-right, .event-card').forEach((el, index) => {
    el.dataset.delay = index * 100;
    observer.observe(el);
  });
}

// Enhanced hover effects for event cards
function setupEventiHoverEffects() {
  document.querySelectorAll('.event-card').forEach((card, index) => {
    // Staggered animation delay
    card.style.animationDelay = (index * 150) + 'ms';
    
    card.addEventListener('mouseenter', function() {
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: radial-gradient(circle, rgba(225,6,0,0.1) 0%, transparent 70%);
        pointer-events: none;
        animation: ripple 0.6s ease-out;
        border-radius: 20px;
      `;
      this.appendChild(ripple);
      
      setTimeout(() => {
        if (ripple.parentNode) ripple.remove();
      }, 600);
    });
  });
}

// Parallax effect for eventi hero section
function setupEventiParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.eventi-header');
    if (header) {
      header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// Check if user is logged in for member events
function checkLoggedInUser() {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    const loginRequired = document.getElementById('login-required');
    const membersCalendar = document.getElementById('members-calendar');
    const membersEvents = document.getElementById('members-events');
    
    if (loginRequired) loginRequired.style.display = 'none';
    if (membersCalendar) membersCalendar.style.display = 'block';
    if (membersEvents) membersEvents.style.display = 'block';
  }
}

// Add eventi specific styles
function addEventiStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(1); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// Setup modal close events
function setupEventiModal() {
  setTimeout(() => {
    const closeModal = document.getElementById('close-modal');
    const eventModal = document.getElementById('event-modal');
    
    if (closeModal) {
      closeModal.addEventListener('click', function() {
        if (eventModal) {
          eventModal.style.display = 'none';
          eventModal.classList.remove('active');
        }
      });
    }
    
    if (eventModal) {
      eventModal.addEventListener('click', function(e) {
        if (e.target === this) {
          this.style.display = 'none';
          this.classList.remove('active');
        }
      });
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && eventModal) {
        if (eventModal.classList.contains('active')) {
          eventModal.style.display = 'none';
          eventModal.classList.remove('active');
        }
        // Also close image lightbox if open
        if (typeof closeImageLightbox === 'function') {
          closeImageLightbox();
        }
      }
    });
  }, 500);
}