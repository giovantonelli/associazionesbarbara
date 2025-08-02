/**
 * Index.js - JavaScript specifico per la homepage
 * Associazione Santa Barbara
 */

// Supabase configuration
const INDEX_SUPABASE_URL = 'https://ciezrbsolxpjxswdkkpo.supabase.co';
const INDEX_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZXpyYnNvbHhwanhzd2Rra3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjM1NjAsImV4cCI6MjA2ODQ5OTU2MH0.V-U8KhO8byObUW5kJ8XbLBkp9O9Efh98MdbKYFfbQJk';

/**
 * Function to get events count from Supabase
 * @returns {Promise<number>} Number of events
 */
async function getEventsCount() {
  try {
    const response = await fetch(`${INDEX_SUPABASE_URL}/rest/v1/events?select=count`, {
      headers: {
        'apikey': INDEX_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${INDEX_SUPABASE_ANON_KEY}`,
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
    // Errore silenzioso
    return 0;
  }
}

/**
 * Function to get activities count from Supabase
 * @returns {Promise<number>} Number of activities
 */
async function getAttivitaCount() {
  try {
    const response = await fetch(`${INDEX_SUPABASE_URL}/rest/v1/attivita?select=count`, {
      headers: {
        'apikey': INDEX_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${INDEX_SUPABASE_ANON_KEY}`,
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
    // Errore silenzioso
    return 0;
  }
}

/**
 * Counter animation with easing
 * @param {HTMLElement} element - Element to animate
 * @param {number} target - Target number
 * @param {number} duration - Animation duration in ms
 */
function animateCounter(element, target, duration = 1500) {
  let start = 0;
  const startTime = performance.now();
  
  function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
  }
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    
    const current = Math.floor(easedProgress * target);
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + (target >= 100 ? '+' : '');
    }
  }
  
  requestAnimationFrame(updateCounter);
}

/**
 * Initialize animations and observers
 */
function initializeAnimations() {
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
}

/**
 * Initialize stats counters
 */
function initializeStatsCounters() {
  // Stats counter observer with mobile-friendly settings
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => {
          const target = parseInt(counter.dataset.target);
          if (target > 0) {
            animateCounter(counter, target);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: window.innerWidth <= 768 ? 0.1 : 0.5,
    rootMargin: '0px 0px -10px 0px'
  });
  
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
  
  // Fallback for mobile - trigger counter after delay if not already triggered
  setTimeout(() => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      if (counter.textContent === '0' && parseInt(counter.dataset.target) > 0) {
        const target = parseInt(counter.dataset.target);
        animateCounter(counter, target);
      }
    });
  }, 3000);
}

/**
 * Initialize smooth scrolling for internal links
 */
function initializeSmoothScrolling() {
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

/**
 * Initialize parallax effects
 */
function initializeParallaxEffects() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

/**
 * Initialize card animations
 */
function initializeCardAnimations() {
  // Add staggered loading animation for cards
  document.querySelectorAll('.enhanced-card').forEach((card, index) => {
    card.style.animationDelay = (index * 100) + 'ms';
  });
}

/**
 * Initialize button hover effects
 */
function initializeButtonEffects() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

/**
 * Handle email verification success
 */
function handleEmailVerification() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('email_verified') === 'true') {
    // Show success notification
    if (window.showNotification) {
      window.showNotification('✅ Email verificata con successo! Ora puoi accedere al tuo account.', 'success');
    }
    // Auto-redirect to login after 3 seconds
    setTimeout(() => {
      window.location.href = 'login.html?verified=true';
    }, 3000);
    // Remove the parameter from URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

/**
 * Load and update counters from Supabase
 */
async function loadAndUpdateCounters() {
  try {
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
  } catch (error) {
    // Errore silenzioso
  }
}

/**
 * Initialize all homepage functionality
 */
async function initializeHomepage() {
  try {
    // Load data from Supabase
    await loadAndUpdateCounters();
    
    // Initialize all components
    initializeAnimations();
    initializeStatsCounters();
    initializeSmoothScrolling();
    initializeParallaxEffects();
    initializeCardAnimations();
    initializeButtonEffects();
    handleEmailVerification();
  } catch (error) {
    // Errore silenzioso
  }
}

// Enhanced UX JavaScript for Index - Main initialization
document.addEventListener('DOMContentLoaded', initializeHomepage);

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getEventsCount,
    getAttivitaCount,
    animateCounter,
    initializeHomepage
  };
}
