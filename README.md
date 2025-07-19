# Sito Web Associazione Santa Barbara APS

Sito web statico ufficiale dell'Associazione Santa Barbara APS, sviluppato con HTML5, CSS3 e JavaScript vanilla.

## 🚀 Funzionalità Principali

- **Responsive Design**: Ottimizzato per tutti i dispositivi (desktop, tablet, mobile)
- **SEO Friendly**: Meta tags ottimizzati, sitemap.xml, robots.txt
- **GDPR Compliant**: Cookie banner, privacy policy completa
- **Area Soci**: Sistema di autenticazione per membri
- **Galleria**: Lightbox per foto e video
- **Calendario Eventi**: Sistema di gestione eventi
- **FAQ Dinamiche**: Sistema di FAQ con categorie
- **Formulario Contatti**: Con validazione e protezione CAPTCHA

## 📁 Struttura del Progetto

```
/
├── index.html              # Homepage
├── chi-siamo.html          # Chi siamo
├── attivita.html           # Attività
├── eventi.html             # Eventi
├── galleria.html           # Galleria
├── faq.html               # FAQ
├── contatti.html          # Contatti
├── partner.html           # Partner
├── area-soci.html         # Area soci
├── privacy.html           # Privacy policy
├── sitemap.xml            # Sitemap per SEO
├── robots.txt             # Robots.txt per SEO
├── README.md              # Documentazione
├── assets/
│   ├── css/
│   │   └── style.css      # Foglio di stile principale
│   ├── js/
│   │   └── script.js      # JavaScript principale
│   └── images/            # Immagini e risorse
└── data/
    └── faq.json           # Dati FAQ
```

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

L'area soci utilizza **Supabase** con autenticazione **OTP via email** per un accesso sicuro e senza password.

### 📋 Configurazione Supabase

```javascript
const supabase = supabase.createClient(
    'https://ciezrbsolxpjxswdkkpo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZXpyYnNvbHhwanhzd2Rra3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjM1NjAsImV4cCI6MjA2ODQ5OTU2MH0.V-U8KhO8byObUW5kJ8XbLBkp9O9Efh98MdbKYFfbQJk'
);
```

### 🏗️ Struttura del Sistema

```
/login.html              # Pagina di login con form email
/area-soci.html          # Area riservata (solo per utenti autenticati)
/chi-siamo.html          # Link per diventare socio
```

### 🔄 Flusso di Autenticazione

1. **Pagina Login** (`/login.html`):
   - Form di inserimento email
   - Invio OTP automatico tramite Supabase
   - Istruzioni per l'utente

2. **Email OTP**:
   - L'utente riceve email con link sicuro
   - Clic sul link = login automatico
   - Redirect automatico all'area soci

3. **Area Riservata** (`/area-soci.html`):
   - Verifica sessione automatica
   - Se non autenticato → redirect a login
   - Dashboard completo per i soci

### ✅ Vantaggi di Supabase

- 🔒 **Sicurezza**: Autenticazione enterprise-grade
- 📧 **Email OTP**: Nessuna password da ricordare
- 🚀 **Performance**: CDN globale di Supabase
- 🛠️ **Zero Maintenance**: Backend completamente gestito
- 📊 **Analytics**: Dashboard utenti integrato
- 🔧 **Scalabilità**: Automatic scaling fino a milioni di utenti

### �️ Implementazione JavaScript

#### Login (login.html):
```javascript
// Invio OTP
const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
        emailRedirectTo: `${window.location.origin}/area-soci.html`
    }
});
```

#### Verifica Sessione (area-soci.html):
```javascript
// Controllo automatico sessione
const { data: { session }, error } = await supabase.auth.getSession();

if (!session) {
    // Redirect a login se non autenticato
    window.location.href = 'login.html';
}
```

#### Logout:
```javascript
// Logout sicuro
const { error } = await supabase.auth.signOut();
window.location.href = 'login.html';
```

### 🎯 User Experience

1. **Accesso facilitato**: Un click dal menu → pagina login
2. **Processo veloce**: Email → Link → Accesso immediato  
3. **Sicurezza massima**: Token JWT con scadenza automatica
4. **Responsive**: Funziona perfettamente su mobile
5. **Feedback**: Messaggi chiari ad ogni step

### 🔧 Configurazione Supabase Dashboard

#### Auth Settings:
- **Email Provider**: Configurato con SMTP
- **Email Templates**: Personalizzati per l'associazione
- **Site URL**: `https://associazionesbarbara.it`
- **Redirect URLs**: `https://associazionesbarbara.it/area-soci.html`

#### Security:
- **RLS (Row Level Security)**: Abilitato
- **Email Confirmation**: Automatico
- **Session Timeout**: 24 ore (configurabile)

### 📊 Analytics e Monitoraggio

Supabase fornisce:
- Statistiche di utilizzo real-time
- Logs di autenticazione
- Metriche di performance
- Dashboard utenti attivi

### 🧪 Test dell'Implementazione

1. Vai su `https://associazionesbarbara.it/login.html`
2. Inserisci email autorizzata (es: `test@associazionesbarbara.it`)
3. Clicca "Invia Link di Accesso"
4. Controlla email ricevuta
5. Clicca link nell'email
6. Verifica redirect automatico ad area-soci.html
7. Conferma visualizzazione dashboard soci

### � Gestione Utenti

Gli utenti autorizzati vengono gestiti tramite:
- **Supabase Dashboard** → Auth → Users
- Inviti manuali via dashboard
- Blocco/sblocco utenti
- Reset password se necessario

### � Sicurezza

- **HTTPS Only**: Forzato su tutto il sito
- **JWT Tokens**: Con scadenza automatica
- **Email Verification**: Obbligatoria per primo accesso
- **Session Management**: Gestione automatica da Supabase
- **GDPR Compliant**: Supabase è conforme GDPR

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
