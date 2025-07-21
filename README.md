

# Associazione Santa Barbara APS – Sito Ufficiale

Benvenuto nel repository del sito ufficiale dell’Associazione Santa Barbara APS!

## Chi siamo
L’Associazione Santa Barbara APS è una realtà di promozione sociale nata nel 2010 dall’iniziativa di cittadini appassionati e dediti al servizio della comunità. Prende il nome da Santa Barbara, simbolo di forza e protezione. La sede principale è in Via N. Mastroserio 12, Grumo Appula (BA).

## Missione
- Promuovere la cultura attraverso eventi, conferenze e mostre
- Sostenere il volontariato e la solidarietà sociale
- Tutelare l’ambiente e il territorio
- Valorizzare la comunità e favorire l’inclusione sociale

## Valori
- **Solidarietà**: Aiuto reciproco e inclusione
- **Trasparenza**: Chiarezza e onestà nelle attività
- **Innovazione**: Nuove soluzioni per la comunità
- **Eccellenza**: Impegno costante in ogni progetto

## Direttivo
- **Presidente:** Tonia Baccelliere
- **Vicepresidente:** Francesca Rita Favia

## Descrizione sito
Questo sito web è il punto di riferimento online per i soci, i volontari e tutti coloro che vogliono conoscere le attività, gli eventi e i servizi dell’Associazione. Offre:
- Informazioni sull’associazione, la sua storia e i suoi valori
- Calendario eventi e attività
- Area riservata ai soci (con autenticazione e gestione profilo)
- Galleria fotografica
- FAQ e contatti
- Gestione privacy, cookie e iscrizione newsletter

## Struttura del progetto

```
Sito S.Barbara/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   ├── banner.jpg
│   │   ├── logo.svg
│   │   └── ...
│   └── js/
│       └── script.js
├── data/
│   └── faq.json
├── index.html
├── chi-siamo.html
├── attivita.html
├── eventi.html
├── galleria.html
├── faq.html
├── contatti.html
├── partner.html
├── privacy.html
├── area-soci.html
├── login.html
├── register.html
├── robots.txt
├── sitemap.xml
├── CNAME
├── _config.yml
└── README.md
```

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
