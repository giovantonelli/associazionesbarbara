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

  if (user && user.name) {
	userBar.innerHTML = `
	  <span>Ciao, <strong>${user.name}</strong></span>
	  <button id="logout-btn" class="btn btn-outline btn-sm">\uD83D\uDEA9 Logout</button>
	`;
	document.getElementById('logout-btn').onclick = function() {
	  localStorage.removeItem('currentUser');
	  location.href = isAreaSoci ? 'login.html' : window.location.pathname;
	};
  } else {
	if (!isAreaSoci) {
	  userBar.innerHTML = `<a href="area-soci.html" class="btn btn-outline btn-sm">Area Soci</a>`;
	} else {
	  userBar.innerHTML = '';
	  // window.location.href = 'login.html';
	}
  }
}

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