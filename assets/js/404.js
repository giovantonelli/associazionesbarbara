// 404 Page JavaScript
// Registra che siamo arrivati qui tramite 404 redirect
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const originalUrl = urlParams.get('from');
  
  if (originalUrl) {
    const description = document.querySelector('.error-description');
    description.textContent = '';
    // Crea il messaggio in modo sicuro
    description.append(
      'Sembra che la pagina "',
      (() => { const strong = document.createElement('strong'); strong.textContent = decodeURIComponent(originalUrl); return strong; })(),
      '" sia andata a fare una passeggiata nel centro storico di Grumo Appula e si sia persa!',
      document.createElement('br'),
      document.createElement('br'),
      'Non preoccuparti, ti aiutiamo noi a ritrovare la strada.'
    );
  }
  
  // Aggiorna l'anno nel footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
});