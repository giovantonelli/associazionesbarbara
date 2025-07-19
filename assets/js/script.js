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
    initForms();
    initCalendar();
    initSocialFeeds();
    
    // Check if user is logged in
    checkUserSession();
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
        
        console.log('Cookies accepted - Analytics consent granted');
    });
    
    declineBtn?.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.classList.remove('show');
        
        // Keep Google Analytics consent denied (already set as default)
        console.log('Cookies declined - Analytics consent remains denied');
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
    
    if (!lightbox) return;
    
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
        
        switch(e.key) {
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

// Forms
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
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
            switch(formType) {
                case 'contact':
                    handleContactForm(formData);
                    break;
                case 'login':
                    handleLoginForm(formData);
                    break;
                case 'newsletter':
                    handleNewsletterForm(formData);
                    break;
                case 'register':
                case 'registration':
                    handleRegistrationForm(formData);
                    break;
            }
        });
    });
    
    // Initialize password validation for all password fields
    const passwordInputs = document.querySelectorAll('input[name="password"]');
    passwordInputs.forEach(passwordInput => {
        const confirmPasswordInput = passwordInput.form.querySelector('input[name="confirmPassword"], input[name="confirm_password"], input[name="passwordConfirm"]');
        attachPasswordValidation(passwordInput, confirmPasswordInput);
    });
}

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
            'weak': { width: '25%', color: '#f44336', text: 'Debole' },
            'medium': { width: '50%', color: '#ff9800', text: 'Media' },
            'strong': { width: '75%', color: '#4caf50', text: 'Forte' },
            'very-strong': { width: '100%', color: '#2e7d32', text: 'Molto Forte' }
        };
        
        const level = strengthLevels[validation.strength] || { width: '0%', color: '#e0e0e0', text: 'Inserisci password' };
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
    
    // Simple mock authentication
    if (email && password) {
        currentUser = { email: email, name: 'Socio' };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showNotification('Login effettuato con successo!', 'success');
        
        // Redirect to members area or show members content
        showMembersContent();
    } else {
        showNotification('Email e password sono obbligatori', 'error');
    }
}

function handleRegistrationForm(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    const name = formData.get('name') || formData.get('nome');
    const surname = formData.get('surname') || formData.get('cognome');
    const phone = formData.get('phone') || formData.get('telefono');
    const acceptTerms = formData.get('privacy');
    
    // Validate required fields
    if (!email || !password || !name || !surname) {
        showNotification('Tutti i campi obbligatori devono essere compilati', 'error');
        return;
    }
    
    // Validate password strength
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
    console.log('Registration data:', { email, name, surname, phone });
    
    // Optional: redirect to login page after a delay
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

function handleNewsletterForm(formData) {
    const email = formData.get('email');
    showNotification('Iscrizione alla newsletter completata!', 'success');
    console.log('Newsletter subscription:', email);
}

function showMembersContent() {
    const membersContent = document.getElementById('members-content');
    const loginForm = document.getElementById('login-form');
    
    if (membersContent && loginForm) {
        loginForm.style.display = 'none';
        membersContent.style.display = 'block';
        
        // Initialize calendar for members
        if (document.getElementById('events-calendar')) {
            initMembersCalendar();
        }
    }
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
    console.log('Caricando eventi per membri...');
}

// Social Media Integration
function initSocialFeeds() {
    // Mock social media integration
    // In a real implementation, you would use Facebook and Instagram APIs
    console.log('Inizializzando notizie dai social...');
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
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
            console.log('FAQ JSON not found, using HTML version');
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

// Initialize FAQ loading
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('faq-container')) {
        loadFAQ();
    }
});

// Export functions for global use
window.logout = logout;
window.showNotification = showNotification;
