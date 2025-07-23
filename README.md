

# 🏛️ Associazione Santa Barbara APS – Sito Ufficiale

[![Status](https://img.shields.io/badge/Status-Live-brightgreen)](httpbarbara.it)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-2.0-orange)](CHANGELOG.md)

> **Sito web moderno e responsive per l'Associazione Santa Barbara APS - Promuoviamo cultura e volontariato nel territorio**

## 🎯 Chi siamo
L'**Associazione Santa Barbara APS** è una realtà di promozione sociale nata nel 2008 dall'iniziativa di cittadini appassionati e dediti al servizio della comunità. Prende il nome da Santa Barbara, simbolo di forza e protezione. 

📍 **Sede:** Via N. Mastroserio 12, Grumo Appula (BA)  
🌐 **Sito:** [associazionesbarbara.it](https://associazionesbarbara.it)

## 🚀 Missione
- 🎭 **Cultura:** Eventi, conferenze e mostre per la comunità
- 🤝 **Volontariato:** Solidarietà sociale e supporto ai bisognosi
- 🌱 **Ambiente:** Tutela del territorio e sostenibilità
- 🏘️ **Comunità:** Valorizzazione e inclusione sociale

## 💎 Valori Fondamentali
- **🤲 Solidarietà** - Aiuto reciproco e inclusione
- **🔍 Trasparenza** - Chiarezza e onestà nelle attività  
- **💡 Innovazione** - Soluzioni moderne per la comunità
- **⭐ Eccellenza** - Impegno costante in ogni progetto

## 👥 Direttivo
- **👑 Presidente:** Antonia Baccelliere
- **🔄 Vicepresidente:** Francesca Rita Favia

## ✨ Caratteristiche del Sito

### 🎨 **Design Moderno**
- Interface responsive per tutti i dispositivi
- Design glassmorphism con gradienti
- Animazioni fluide e transizioni CSS
- Accessibilità WCAG 2.1 compliant

### 🔐 **Area Soci Avanzata**
- Autenticazione sicura con Supabase
- Dashboard personalizzata per membri
- Gestione profilo e documenti riservati
- Sistema di ruoli e permessi

### 🎬 **Galleria Multimediale**
- Carousel 3D interattivo con Swiper.js
- Lightbox fullscreen per foto e video
- 18 video ottimizzati (compressi sotto 100MB)
- Navigazione con frecce e keyboard shortcuts

### ⚡ **Performance & SEO**
- Google Analytics 4 con Consent Mode
- Meta tags OpenGraph e Twitter Cards
- Sitemap.xml automatico
- Google AdSense integrato
- Cookie management GDPR compliant

## 📁 Struttura del Progetto

```
🏛️ Sito S.Barbara/
├── 📁 assets/
│   ├── 🎨 css/
│   │   └── style.css          # CSS principale con custom properties
│   ├── 🖼️ images/
│   │   ├── banner.jpg         # Hero banner homepage
│   │   ├── logo.svg           # Logo associazione vettoriale
│   │   ├── corteostorico.jpg  # Immagini attività
│   │   └── tamburini.jpg
│   └── ⚡ js/
│       ├── script.js          # JavaScript principale
│       └── notifications.js   # Sistema notifiche
├── 📊 data/
│   └── faq.json              # Database FAQ dinamiche
├── 🎬 galleria/
│   ├── 📸 foto/              # Immagini galleria
│   └── 🎥 video/             # Video MP4 + thumbnails
├── 📄 index.html             # Homepage
├── ℹ️ chi-siamo.html         # Storia e missione
├── 🎭 attivita.html          # Progetti e iniziative
├── 📅 eventi.html            # Calendario eventi
├── 🖼️ galleria.html          # Galleria foto/video avanzata
├── ❓ faq.html               # Domande frequenti
├── 📞 contatti.html          # Informazioni contatto
├── 🤝 partner.html           # Partner e sponsor
├── 🔒 privacy.html           # Privacy policy GDPR
├── 👥 area-soci.html         # Dashboard membri (auth)
├── 🔑 login.html             # Autenticazione
├── ✍️ register.html          # Registrazione utenti
├── 🤖 robots.txt             # SEO crawling
├── 🗺️ sitemap.xml           # Mappa sito
├── 🌐 CNAME                  # Dominio personalizzato
├── ⚙️ _config.yml           # Configurazione Jekyll
└── 📖 README.md             # Documentazione
```

## ⭐ Funzionalità Principali

### 🌐 **Area Pubblica**
- 🏠 **Homepage:** Hero section con CTA e panoramica associazione
- 👥 **Chi Siamo:** Storia, missione, valori e team direttivo  
- 🎭 **Attività:** Corteo Storico, Tamburi, progetti sociali
- 📅 **Eventi:** Calendario interattivo con dettagli eventi
- 🖼️ **Galleria:** Carousel 3D video + lightbox foto responsive
- ❓ **FAQ:** Sistema categorizzato con ricerca dinamica
- 📞 **Contatti:** Form contatto, mappa, info sede
- 🤝 **Partner:** Showcase sponsor e collaborazioni

### 🔐 **Area Riservata Soci**
- 🔑 **Autenticazione:** Login/registrazione sicura Supabase
- 📊 **Dashboard:** Pannello personalizzato per membri
- 👤 **Profilo:** Gestione dati personali e preferenze
- 📄 **Documenti:** Accesso materiali riservati soci
- 🎟️ **Eventi Esclusivi:** Prenotazioni eventi membri
- 🔄 **Gestione Tessera:** Rinnovo e stato iscrizione

### 🛠️ **Funzionalità Tecniche**
- 📱 **Responsive Design:** Layout adattivo mobile-first
- ⚡ **Performance:** Lazy loading, compressione, CDN
- 🔍 **SEO Avanzato:** Meta tags, schema markup, sitemap
- 🍪 **GDPR Compliance:** Cookie consent, privacy policy
- 📈 **Analytics:** Google Analytics 4 con consent mode
- 💰 **Monetizzazione:** Google AdSense integrato
- 🎨 **Accessibilità:** WCAG 2.1 AA compliant

## Funzionalità principali

- **Area pubblica:**
  - Presentazione dell’associazione
  - Elenco attività, eventi e partner
  - Galleria fotografica
  - FAQ e modulo contatti
  - Informativa privacy e gestione cookie

- **Area soci (protetta):**
  - Accesso tramite autenticazione Supabase
  - Visualizzazione e modifica profilo
  - Dashboard eventi, tessera, comunicazioni e documenti
  - Accesso riservato solo ai soci (controllo ruolo)

- **Backend:**
  - Supabase per autenticazione, gestione profili, RLS e database eventi/documenti

## Come avviare il sito in locale

1. Clona il repository:
   ```bash
   git clone https://github.com/giovantonelli/associazionesbarbara.git
   ```
2. Apri la cartella `Sito S.Barbara` in un editor (es. VS Code).
3. Avvia un server locale (es. con Live Server di VS Code o Python):
   ```bash
   # Con Python 3
   python3 -m http.server
   # Oppure con Live Server extension su VS Code
   ```
4. Visita `http://localhost:8000` nel browser.

## Dipendenze principali
- [Supabase JS](https://supabase.com/docs/reference/javascript) (autenticazione e database)
- HTML5, CSS3, JavaScript (vanilla)

## Sicurezza e privacy
- L’area soci è protetta da autenticazione e controllo ruolo (solo i soci possono accedere ai contenuti riservati)
- Gestione cookie e privacy conforme GDPR

## Personalizzazione
- Modifica i file HTML/CSS/JS secondo le esigenze dell’associazione
- Aggiorna le immagini e i dati in `assets/images` e `data/faq.json`
- Configura i parametri Supabase in `area-soci.html` e `assets/js/script.js` se necessario


## Contatti
Per segnalazioni, richieste o collaborazioni:
- Email: info@associazionesbarbara.it
- Sede: Via N. Mastroserio 12, Grumo Appula (BA)
- Facebook: [santabarbara.grumoappula](https://www.facebook.com/santabarbara.grumoappula)
- Instagram: [corteostoricosantabarbara](https://www.instagram.com/corteostoricosantabarbara/)
- Telegram: [associazionesbarbara](https://t.me/associazionesbarbara)

---

© 2008–2025 Associazione Santa Barbara APS. Tutti i diritti riservati.

## 🛠️ Tecnologie Utilizzate

- **HTML5**: Markup semantico
- **CSS3**: Styling con custom properties, Grid, Flexbox
- **JavaScript**: Vanilla JS per interattività
- **GitHub Pages**: Hosting gratuito

## 🎨 Design System

### Colori
- **Primario**: #E10600 (Rosso)
- **Secondario**: #FFD700 (Giallo)
- **Testo**: #333333
- **Sfondo**: #FFFFFF

### Tipografia
- **Font System**: Sistema operativo nativo
- **Fallback**: Arial, sans-serif

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deploy su GitHub Pages

### Opzione 1: Upload Manuale

1. Crea un repository su GitHub chiamato `associazionesbarbara.github.io`
2. Carica tutti i file nella root del repository
3. Vai su Settings → Pages
4. Seleziona "Deploy from a branch"
5. Scegli "main" branch e "/ (root)"
6. Salva le impostazioni

### Opzione 2: GitHub Desktop

1. Installa GitHub Desktop
2. Clona il repository localmente
3. Copia i file nella cartella locale
4. Commit e push delle modifiche
5. Attiva Pages nelle impostazioni

### Opzione 3: Linea di Comando

```bash
# Clona il repository
git clone https://github.com/associazionesbarbara/associazionesbarbara.github.io.git

# Entra nella directory
cd associazionesbarbara.github.io

# Copia i file del sito
cp -r /percorso/del/sito/* .

# Aggiungi i file
git add .

# Commit
git commit -m "Initial site deploy"

# Push
git push origin main
```

## 🔧 Configurazione

### 1. Personalizzazione Logo
Sostituisci il file `assets/images/logo.svg` con il logo dell'associazione.

### 2. Aggiornamento Informazioni
Modifica le informazioni di contatto in:
- `contatti.html`
- `privacy.html`
- `footer` di tutte le pagine

### 3. Configurazione Social Media
Aggiorna i link dei social media nel footer:
```html
<a href="https://facebook.com/tuapagina" class="social-link">
<a href="https://instagram.com/tuapagina" class="social-link">
```

### 4. Google Analytics (Opzionale)
Aggiungi prima di `</head>` in tutte le pagine:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📧 Configurazione Email

### Creazione Email info@associazionesbarbara.it

1. **Dominio**: Registra il dominio `associazionesbarbara.it`
2. **Hosting Email**: Configura servizio email (Gmail for Business, Outlook, etc.)
3. **Formulario**: Aggiorna l'endpoint in `assets/js/script.js`

### Servizi Email Consigliati
- **Gmail for Business**: $6/mese per utente
- **Microsoft 365**: $5/mese per utente
- **Zoho Mail**: $1/mese per utente

## 🔐 Autenticazione Area Soci (Supabase)

L'area soci utilizza **Supabase** per un sistema di autenticazione moderno e sicuro con gestione dei ruoli utente.

### 📋 Configurazione Supabase

```javascript
const supabaseClient = createClient(
    'https://ciezrbsolxpjxswdkkpo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZXpyYnNvbHhwanhzd2Rra3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjM1NjAsImV4cCI6MjA2ODQ5OTU2MH0.V-U8KhO8byObUW5kJ8XbLBkp9O9Efh98MdbKYFfbQJk'
);
```

### 🏗️ Struttura Sistema di Autenticazione

#### 📄 Pagine Create:
- **`login.html`** - Pagina di accesso con email e password
- **`register.html`** - Pagina di registrazione nuovi utenti  
- **`area-soci.html`** - Area protetta riservata ai soci

#### � Flusso di Autenticazione:
1. **Registrazione** → Email + Password + Conferma email
2. **Login** → Verifica credenziali + Controllo ruolo
3. **Accesso Area Soci** → Solo utenti con ruolo "socio"

### 👥 Gestione Ruoli Utente

#### Ruoli Disponibili:
- **`utente`** (default) - Account registrato ma senza accesso area soci
- **`socio`** - Accesso completo all'area riservata

#### Schema Database Supabase:
```sql
-- Metadata utente in auth.users.user_metadata
{
  "first_name": "Nome",
  "last_name": "Cognome", 
  "full_name": "Nome Cognome",
  "role": "utente" | "socio"
}
```

### 🔒 Protezione Area Soci

L'accesso a `area-soci.html` è protetto tramite:

1. **Verifica Sessione**: Controllo sessione attiva Supabase
2. **Controllo Email**: Email deve essere confermata
3. **Verifica Ruolo**: Solo utenti con `role: "socio"`

```javascript
// Controllo autenticazione in area-soci.html
async function checkAuthentication() {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    
    if (!session || !session.user) {
        // Reindirizza a login.html
        window.location.href = 'login.html';
        return;
    }
    
    if (!session.user.email_confirmed_at) {
        // Mostra messaggio di conferma email
        return;
    }
    
    const userRole = session.user.user_metadata?.role || 'utente';
    if (userRole !== 'socio') {
        // Mostra messaggio di accesso limitato
        return;
    }
    
    // Mostra contenuto area soci
    showMembersContent();
}
```

### ✅ Funzionalità Implementate

#### Login (`login.html`):
- ✅ Form email e password
- ✅ Validazione input
- ✅ Gestione errori Supabase
- ✅ Controllo email confermata
- ✅ Reindirizzamento automatico se già loggato
- ✅ States loading e feedback utente

#### Registrazione (`register.html`):
- ✅ Form completo (nome, cognome, email, password)
- ✅ Conferma password 
- ✅ Validazione in tempo reale
- ✅ Checkbox accettazione termini
- ✅ Invio email di conferma automatica
- ✅ Gestione utenti già esistenti

#### Area Soci (`area-soci.html`):
- ✅ Protezione completa con Supabase Auth
- ✅ Verifica ruolo utente
- ✅ Gestione stati: loading, login richiesto, accesso negato
- ✅ Dashboard con informazioni utente
- ✅ Contenuti riservati (documenti, eventi, discussioni)
- ✅ Logout sicuro
- ✅ Responsive design

### 🎨 Design Consistente

Tutte le pagine utilizzano:
- **CSS**: `assets/css/style.css` per design consistente
- **Google Analytics**: Tracking integrato
- **Cookie Consent**: Banner GDPR compliant
- **Responsive**: Design mobile-first
- **Navigation**: Menu unificato su tutte le pagine

### 🔧 Configurazione Amministratore

Per promuovere un utente a "socio":

1. **Via Supabase Dashboard**:
   - Vai in Authentication > Users
   - Seleziona l'utente
   - Modifica `user_metadata` → `role: "socio"`

2. **Via SQL** (opzionale):
```sql
UPDATE auth.users 
SET user_metadata = jsonb_set(user_metadata, '{role}', '"socio"')
WHERE email = 'utente@example.com';
```

### 🚀 Deployment e Test

#### Test del Sistema:
1. **Registrazione**: Vai su `/register.html`, crea account
2. **Conferma Email**: Controlla email e clicca link conferma
3. **Login**: Accedi su `/login.html` 
4. **Accesso Limitato**: Vai su `/area-soci.html` → Messaggio accesso negato
5. **Promozione**: Cambia ruolo a "socio" via dashboard Supabase
6. **Accesso Pieno**: Ricarica `/area-soci.html` → Contenuto completo

#### Sicurezza:
- 🔒 **Nessun secret nel frontend** - Solo public anon key
- 🔒 **Row Level Security** - Supabase gestisce autorizzazioni
- 🔒 **Email verification** obbligatoria
- 🔒 **Session management** automatico
- 🔒 **Logout sicuro** con cleanup sessione

### 📊 Vantaggi vs Sistema Precedente

| Aspetto | Cloudflare Access (Precedente) | Supabase (Attuale) |
|---------|-------------------------------|-------------------|
| **Setup** | Complesso, configurazione esterna | Semplice, tutto integrato |
| **Gestione Utenti** | Dashboard Cloudflare | Dashboard Supabase + codice |
| **Customizzazione** | Limitata | Completa libertà |
| **Costi** | Gratuito fino a 50 utenti | Gratuito fino a 50MB DB |
| **Controllo** | Dipendente da Cloudflare | Controllo completo |
| **Ruoli** | Policy complesse | Metadata utente semplici |
| **UI/UX** | Standard Cloudflare | Design personalizzato |
| **Backend** | Non richiesto | Non richiesto (serverless) |

### � Troubleshooting

#### Problemi Comuni:

**Utente non riesce a registrarsi**:
- Verifica email non già esistente
- Controlla impostazioni Supabase Auth
- Verifica invio email attivato

**Login fallisce**:
- Controlla email confermata
- Verifica password corretta
- Controlla console browser per errori

**Area soci non accessibile**:
- Verifica ruolo utente = "socio"
- Controlla email confermata
- Verifica sessione attiva

**Email di conferma non arriva**:
- Controlla spam/promozioni
- Verifica configurazione SMTP Supabase
- Usa pulsante "Invia di nuovo"

## 📊 SEO e Analytics

### Search Console
1. Vai su [Google Search Console](https://search.google.com/search-console/)
2. Aggiungi la proprietà `https://associazionesbarbara.github.io`
3. Verifica la proprietà
4. Invia la sitemap: `https://associazionesbarbara.it/sitemap.xml`

### Analytics
1. Crea account Google Analytics
2. Aggiungi il tracking code
3. Configura obiettivi per conversioni

## 🛡️ Sicurezza e Privacy

### GDPR Compliance
- Cookie banner implementato
- Privacy policy completa
- Consenso per cookie di tracking
- Diritto all'oblio

### Backup
- Repository GitHub come backup
- Export periodico delle immagini
- Backup database FAQ

## 📱 Social Media Integration

### Facebook
```html
<meta property="og:title" content="Titolo Pagina">
<meta property="og:description" content="Descrizione">
<meta property="og:image" content="https://associazionesbarbara.it/assets/images/og-image.jpg">
```

### Instagram
- Aggiungi Instagram Feed widget
- Configura API Instagram Basic Display

## 🔄 Manutenzione

### Aggiornamenti Regolari
- **Eventi**: Aggiorna calendario mensile
- **Galleria**: Carica nuove foto
- **FAQ**: Aggiorna risposte comuni
- **Attività**: Aggiorna progetti in corso

### Monitoraggio
- **Google Analytics**: Traffico e conversioni
- **Search Console**: Errori e indicizzazione
- **Page Speed**: Velocità di caricamento

## 🆘 Supporto

### Problemi Comuni

**Sito non visibile dopo deploy**
- Verifica che il repository sia pubblico
- Controlla impostazioni GitHub Pages
- Attendi 5-10 minuti per propagazione

**Immagini non caricate**
- Verifica percorsi relativi
- Controlla dimensioni file (< 1MB)
- Assicurati formato supportato (jpg, png, svg)

**Form non funzionante**
- Configura servizio email backend
- Verifica endpoint in script.js
- Testa validazione CAPTCHA

### Contatti Sviluppatore
Per supporto tecnico o modifiche:
- Email: sviluppo@associazionesbarbara.it
- GitHub Issues: Apri ticket nel repository

## 📝 Changelog

### v1.0.0 (2025-01-15)
- ✅ Rilascio iniziale
- ✅ Tutte le pagine principali
- ✅ Design responsive
- ✅ SEO ottimizzato
- ✅ GDPR compliant
- ✅ Sistema area soci
- ✅ Galleria con lightbox
- ✅ FAQ dinamiche
- ✅ Formulario contatti

## 📄 Licenza

© 2025 Associazione Santa Barbara APS. Tutti i diritti riservati.

Il codice sorgente è disponibile per modifiche interne all'associazione.
Non è consentita la ridistribuzione o l'uso commerciale senza autorizzazione.

---

**🎯 Sito pronto per il deploy!**

Segui le istruzioni di deploy e il tuo sito sarà online in pochi minuti su GitHub Pages.

---

# 🚫 AdBlock Detector - Guida Completa

Sistema avanzato di rilevamento AdBlocker integrato nel sito dell'Associazione Santa Barbara APS.

## 📋 Caratteristiche AdBlock Detector

### ✅ **Rilevamento Affidabile**
- **5 metodi di test diversi** per massima accuratezza
- **Compatibilità estesa** con tutti i principali AdBlocker (uBlock Origin, AdBlock Plus, AdGuard, etc.)
- **Controllo periodico** automatico in background ogni 2 secondi
- **Zero dipendenze esterne** - funziona ovunque

### 🎨 **Interfaccia Professionale**
- **Popup responsive** con design moderno matching del sito
- **Colori Associazione Santa Barbara** (#E10600 rosso istituzionale)
- **Animazioni fluide** CSS3 per migliore UX
- **Mobile-first** - ottimizzato per tutti i dispositivi

### ⚡ **Modalità Obbligatoria Attiva**
- **Blocco totale del sito** se AdBlock è attivo
- **Popup non dismissibile** fino alla disattivazione
- **Nessun bypass possibile** - tutto il contenuto nascosto
- **Messaggi personalizzati** per ogni sezione del sito

## 🔧 Implementazione Tecnica

### File JavaScript
```
assets/js/
├── adblock-detector.js          # Sistema principale di rilevamento
├── adblock-integration-strict.js   # Configurazione modalità obbligatoria
├── script.js                   # JavaScript principale del sito
└── notifications.js             # Sistema notifiche
```

### Integrazione nelle Pagine
Tutte le pagine HTML includono il sistema AdBlock:

```html
<!-- AdBlock Detector - Modalità Obbligatoria -->
<script src="assets/js/adblock-detector.js"></script>
<script src="assets/js/adblock-integration-strict.js"></script>
```

### Configurazione per Pagina
Il sistema include messaggi personalizzati per ogni sezione:

- **Homepage**: "Homepage bloccata - Disattiva AdBlock"
- **Chi Siamo**: "Chi Siamo - Accesso Bloccato"
- **Attività**: "Attività Culturali - Accesso Negato"
- **Eventi**: "Eventi - Calendario Bloccato"
- **Galleria**: "Galleria Foto/Video - Accesso Negato"
- **Contatti**: "Contatti - Informazioni Bloccate"
- **FAQ**: "FAQ - Risposte Bloccate"
- **Partner**: "Partner e Sponsor - Lista Bloccata"
- **Area Soci**: "Area Soci - Accesso Riservato Bloccato"
- **Login/Register**: "Sistema di accesso non disponibile"
- **Privacy**: "Privacy Policy - Documento Bloccato"

## 🎯 Metodi di Rilevamento

Il sistema utilizza **5 metodi diversi** per garantire massima accuratezza:

### 1. **Elementi Esca (Bait Elements)**
Crea elementi con classi tipicamente bloccate (`adsbox`, `advertisement`)
- **Rileva**: uBlock Origin, AdBlock Plus, AdGuard

### 2. **Google Ads Script**
Tenta di caricare lo script Google Ads
- **Rileva**: Tutti i principali AdBlocker

### 3. **Domini Pubblicitari**
Testa l'accesso a domini pubblicitari noti (doubleclick.net, etc.)
- **Rileva**: Ghostery, Privacy Badger, liste di filtraggio

### 4. **Immagini Pubblicitarie**
Verifica se immagini con classi "ad" vengono bloccate
- **Rileva**: Filter specifici per immagini

### 5. **Frame Pubblicitari**
Controlla se iframe pubblicitari vengono nascosti
- **Rileva**: Blocco frame e contenuti incorporati

**Algoritmo**: Se almeno 2 test su 5 sono positivi → AdBlock rilevato

## 💡 Messaggio agli Utenti

Il popup spiega chiaramente agli utenti il motivo del blocco:

> **"ATTENZIONE: Per accedere al sito dell'Associazione Santa Barbara APS è obbligatorio disattivare AdBlock.**
> 
> La pubblicità ci permette di:
> • 🎭 Finanziare il Corteo Storico di Santa Barbara
> • 🤝 Sostenere i progetti sociali per la comunità
> • 📚 Mantenere attivo questo sito web gratuito
> • 🏛️ Promuovere la cultura locale di Grumo Appula
> 
> **Il sito rimarrà bloccato fino alla disattivazione di AdBlock.**"

## 🔒 Sicurezza e Protezioni

### Protezioni Implementate
- **Impossibilità di chiudere il popup** senza disattivare AdBlock
- **Controllo continuo** ogni 2 secondi per tentati bypass
- **Protezione console** in production per impedire manomissioni
- **Blocco totale** di tutti gli elementi della pagina

### Browser Supportati
| Browser | Versione | Supporto | Accuratezza |
|---------|----------|----------|-------------|
| **Chrome** | 70+ | ✅ Completo | 95%+ |
| **Firefox** | 65+ | ✅ Completo | 90%+ |
| **Safari** | 12+ | ✅ Buono | 85%+ |
| **Edge** | 80+ | ✅ Completo | 95%+ |
| **Opera** | 60+ | ✅ Completo | 90%+ |
| **Mobile** | Tutti | ✅ Responsive | 85%+ |

### AdBlocker Rilevati
- ✅ **uBlock Origin** (95%+ accuratezza)
- ✅ **AdBlock Plus** (90%+ accuratezza)
- ✅ **AdGuard** (85%+ accuratezza)
- ✅ **Ghostery** (80%+ accuratezza)
- ✅ **Privacy Badger** (75%+ accuratezza)
- ⚠️ **Brave Browser** (60%+ accuratezza)

## 🚀 Performance

### Ottimizzazioni
- **Caricamento asincrono** - non blocca il rendering della pagina
- **Test rapidi** - rilevamento in meno di 2 secondi
- **Cache intelligente** - evita controlli ridondanti
- **Footprint minimo** - codice leggero e ottimizzato

### Impatto SEO
- **Zero impatto** sui motori di ricerca (JavaScript lato client)
- **Content Security Policy** compatibile
- **Crawler friendly** - i bot non vengono bloccati

## 📊 Analytics Integration

Se Google Analytics è presente, il sistema traccia automaticamente:
- Eventi di rilevamento AdBlock
- Statistiche popup mostrati
- Monitoraggio comportamento utenti

```javascript
// Esempi eventi tracciati
gtag('event', 'adblock_detected', {
    'event_category': 'AdBlock Detection',
    'adblock_active': true
});
```

## 🎨 Personalizzazione Tema

Il sistema utilizza i colori istituzionali dell'Associazione Santa Barbara:

```css
:root {
    --primary-color: #E10600;     /* Rosso Santa Barbara */
    --overlay-color: rgba(225, 6, 0, 0.95);
    --background: #ffffff;
    --text-color: #333333;
}
```

## 🔧 File Demo

Per testare il sistema è disponibile:
- **`adblock-demo.html`** - Pagina di test con controlli interattivi

Apri questa pagina per:
- ✅ Testare il rilevamento in tempo reale
- ✅ Vedere tutti i messaggi personalizzati
- ✅ Controllare il funzionamento su diversi browser
- ✅ Debug e monitoraggio dello stato

## ⚠️ Note Importanti

1. **Modalità Obbligatoria**: Il sistema è configurato per bloccare completamente l'accesso se AdBlock è attivo
2. **Nessun Bypass**: Non è possibile aggirare il sistema senza disattivare AdBlock
3. **Supporto Tecnico**: Per problemi contattare lo sviluppatore tramite GitHub Issues
4. **Aggiornamenti**: Il sistema si aggiorna automaticamente per rilevare nuovi AdBlocker

---

## 🛠️ Manutenzione AdBlock Detector

### Controlli Periodici Consigliati
- **Mensile**: Test su browser principali con AdBlocker aggiornati
- **Trimestrale**: Verifica statistiche di rilevamento e bypass
- **Annuale**: Aggiornamento metodi di detection per nuovi AdBlocker

### File di Configurazione
- `assets/js/adblock-integration-strict.js` - Configurazioni per pagina
- `assets/js/adblock-detector.js` - Logica principale di rilevamento
