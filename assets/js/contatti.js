// Typewriter effect for contact page
document.addEventListener('DOMContentLoaded', function() {
  const typewriterText = document.getElementById('typewriter-text');
  const phrases = [
    'Siamo qui per aiutarti! 💬',
    'Rispondiamo entro 24 ore ⏰',
    'Vieni a trovarci in sede 🏢',
    'Seguici sui social 📱',
    'Unisciti alla nostra famiglia! 👥'
  ];
  
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  
  function typeWriter() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
      typewriterText.innerHTML = currentPhrase.substring(0, currentCharIndex - 1) + '<span class="cursor"></span>';
      currentCharIndex--;
    } else {
      typewriterText.innerHTML = currentPhrase.substring(0, currentCharIndex + 1) + '<span class="cursor"></span>';
      currentCharIndex++;
    }
    
    let typingSpeed = isDeleting ? 75 : 100;
    
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      typingSpeed = 300;
    }
    
    setTimeout(typeWriter, typingSpeed);
  }
  
  typeWriter();

  // Form validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Reset validation classes
      document.querySelectorAll('.form-control').forEach(field => {
        field.classList.remove('is-valid', 'is-invalid');
      });
      
      let isValid = true;
      
      // Name validation
      if (name.length < 2) {
        document.getElementById('name').classList.add('is-invalid');
        isValid = false;
      } else {
        document.getElementById('name').classList.add('is-valid');
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        document.getElementById('email').classList.add('is-invalid');
        isValid = false;
      } else {
        document.getElementById('email').classList.add('is-valid');
      }
      
      // Phone validation (only if filled)
      if (phone && !/^[0-9+\-\s()]+$/.test(phone)) {
        document.getElementById('phone').classList.add('is-invalid');
        isValid = false;
      } else if (phone) {
        document.getElementById('phone').classList.add('is-valid');
      }
      
      // Subject validation
      if (subject.length < 3) {
        document.getElementById('subject').classList.add('is-invalid');
        isValid = false;
      } else {
        document.getElementById('subject').classList.add('is-valid');
      }
      
      // Message validation
      if (message.length < 10) {
        document.getElementById('message').classList.add('is-invalid');
        isValid = false;
      } else {
        document.getElementById('message').classList.add('is-valid');
      }
      
      if (isValid) {
        // Here you would normally send the form data
        if (window.showNotification) {
          window.showNotification('✅ Messaggio inviato con successo! Ti contatteremo presto.', 'success');
        } else {
          alert('Messaggio inviato con successo! Ti contatteremo presto.');
        }
        contactForm.reset();
        document.querySelectorAll('.form-control').forEach(field => {
          field.classList.remove('is-valid', 'is-invalid');
        });
      } else {
        if (window.showNotification) {
          window.showNotification('❌ Controlla i campi evidenziati e riprova.', 'error');
        } else {
          alert('Controlla i campi evidenziati e riprova.');
        }
      }
    });
  }
  
  // Set current year
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});