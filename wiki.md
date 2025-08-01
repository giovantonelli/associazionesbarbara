
# Wiki Associazione Santa Barbara APS

## Indice
- [Introduzione](#introduzione)
- [Struttura del progetto](#struttura-del-progetto)
- [Funzionalità principali](#funzionalità-principali)
- [Guida Area Soci](#guida-area-soci)
- [Sicurezza e Privacy](#sicurezza-e-privacy)
- [Deploy e Manutenzione](#deploy-e-manutenzione)
- [FAQ](#faq)
- [Contatti e Supporto](#contatti-e-supporto)

---

## Introduzione
Questa wiki raccoglie tutte le informazioni tecniche e operative per la gestione, sviluppo e manutenzione del sito ufficiale dell'Associazione Santa Barbara APS.

## Struttura del progetto
- HTML5, CSS3, JavaScript
- Supabase per autenticazione soci
- Galleria foto/video, FAQ dinamiche, SEO ottimizzato
- Privacy policy e gestione cookie
- Sistema AdBlock per protezione contenuti

### File e cartelle principali
- Pagina errore: 404.html
- Dashboard soci: area-soci.html
- Attività e progetti: attivita.html
- Storia e missione: chi-siamo.html
- Informazioni e form contatto: contatti.html
- Calendario eventi: eventi.html
- Domande frequenti: faq.html
- Galleria foto/video: galleria.html
- Homepage: index.html
- Accesso soci: login.html
- Partner e sponsor: partner.html
- Privacy policy GDPR: privacy.html
- Registrazione soci: register.html
- SEO crawling: robots.txt
- Mappa sito: sitemap.xml
- assets/css/style.css, assets/images/logo.png, assets/js/script.js
- data/faq.json

## Funzionalità principali
- Area soci protetta (Supabase)
- Galleria foto/video avanzata
- FAQ categorizzate e ricercabili
- SEO ottimizzato (meta tag, sitemap, robots.txt)
- Privacy policy e gestione cookie
- Sistema AdBlock (protezione contenuti)

## Guida Area Soci
L'area soci è protetta tramite Supabase:
- Registrazione: email, password, conferma email
- Login: verifica credenziali e ruolo
- Accesso: solo utenti con ruolo "socio"
- Dashboard: informazioni utente, documenti, eventi
- Logout sicuro

### Promozione a socio
- Modifica ruolo utente via Supabase Dashboard o SQL

## Sicurezza e Privacy
- Autenticazione e controllo ruolo
- Gestione cookie e privacy GDPR
- Row Level Security su Supabase
- Email verification obbligatoria
- Logout sicuro

## Deploy e Manutenzione
- Hosting su GitHub Pages
- Aggiornamenti regolari: eventi, galleria, FAQ, attività
- Backup repository e database FAQ
- Monitoraggio con Google Analytics e Search Console

### Deploy rapido
- Clona il repository
- Carica i file nella root
- Attiva GitHub Pages

## FAQ
- Problemi di registrazione: verifica email e impostazioni Supabase
- Login fallisce: controlla email confermata e password
- Area soci non accessibile: verifica ruolo e sessione
- Email di conferma non arriva: controlla spam e configurazione SMTP
- Immagini non caricate: verifica percorsi e dimensioni
- Form non funzionante: configura servizio email backend

## Contatti e Supporto
- Email: info@associazionesbarbara.it
- Sede: Via N. Mastroserio 12, Grumo Appula (BA)
- Facebook: santabarbara.grumoappula
- Instagram: corteostoricosantabarbara
- Telegram: associazionesbarbara
- Supporto tecnico: sviluppo@associazionesbarbara.it

---

© 2008–2025 Associazione Santa Barbara APS. Tutti i diritti riservati.
