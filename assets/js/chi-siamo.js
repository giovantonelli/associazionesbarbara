// Chi Siamo JavaScript
(function() {
'use strict';

// Supabase configuration (scoped to this module)
const CHISIAMO_SUPABASE_URL = 'https://ciezrbsolxpjxswdkkpo.supabase.co';
const CHISIAMO_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZXpyYnNvbHhwanhzd2Rra3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjM1NjAsImV4cCI6MjA2ODQ5OTU2MH0.V-U8KhO8byObUW5kJ8XbLBkp9O9Efh98MdbKYFfbQJk';

// Function to get events count from Supabase
async function getEventsCount() {
  try {
    const response = await fetch(`${CHISIAMO_SUPABASE_URL}/rest/v1/events?select=count`, {
      headers: {
        'apikey': CHISIAMO_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${CHISIAMO_SUPABASE_ANON_KEY}`,
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
    const response = await fetch(`${CHISIAMO_SUPABASE_URL}/rest/v1/attivita?select=count`, {
      headers: {
        'apikey': CHISIAMO_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${CHISIAMO_SUPABASE_ANON_KEY}`,
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
document.addEventListener('DOMContentLoaded', async function() {
  
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
  
  // Counter animation - more fluid
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
  
});

})(); // End of IIFE