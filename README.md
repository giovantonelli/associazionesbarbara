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

L'area soci utilizza **Supabase Authentication** per un sistema di login moderno, sicuro e facile da gestire.

### 📋 Configurazione Supabase

```javascript
const supabaseClient = createClient(
    'https://ciezrbsolxpjxswdkkpo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZXpyYnNvbHhwanhzd2Rra3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjM1NjAsImV4cCI6MjA2ODQ5OTU2MH0.V-U8KhO8byObUW5kJ8XbLBkp9O9Efh98MdbKYFfbQJk'
);
```

### 🎯 Funzionalità Implementate

#### ✅ **Autenticazione Email Magic Link**
- Login senza password tramite link temporaneo
- `supabaseClient.auth.signInWithOtp({ email })`
- Link valido per 1 ora, sicuro e user-friendly

#### ✅ **Autenticazione Social (Google + Facebook)**
- Login rapido con OAuth providers
- `supabaseClient.auth.signInWithOAuth({ provider: 'google' })`
- `supabaseClient.auth.signInWithOAuth({ provider: 'facebook' })`

#### ✅ **Registrazione Completa**
- Form dettagliato per nuovi soci
- Metadati utente completi (nome, telefono, tipo iscrizione)
- `supabaseClient.auth.signUp()` con user metadata

#### ✅ **Protezione Area Soci**
- Controllo automatico sessione su `area-soci.html`
- Reindirizzamento a `login.html` se non autenticato
- Content condizionale basato su stato autenticazione

#### ✅ **Logout Sicuro**
- `supabaseClient.auth.signOut()`
- Pulizia automatica della sessione
- Reindirizzamento a pagina login

### 🔄 Flusso di Autenticazione

```mermaid
sequenceDiagram
    participant U as Utente
    participant W as Website
    participant S as Supabase
    participant E as Email/OAuth

    U->>W: Visita area-soci.html
    W->>S: Verifica sessione
    S->>W: Sessione non valida
    W->>U: Redirect a login.html
    U->>W: Inserisce email
    W->>S: signInWithOtp(email)
    S->>E: Invia magic link
    E->>U: Email con link
    U->>S: Click magic link
    S->>W: Redirect ad area-soci.html
    W->>S: Verifica sessione
    S->>W: Sessione valida + user data
    W->>U: Mostra contenuto protetto
```

### 📁 Struttura File

```
├── login.html          # Pagina di accesso con email OTP e social login
├── register.html       # Registrazione nuovi soci con form completo
├── area-soci.html      # Area protetta con controllo autenticazione
```

### 🎨 Caratteristiche UI/UX

#### **login.html**
- 🔐 Form email magic link
- 🌐 Pulsanti social (Google/Facebook)
- ℹ️ Sezione help e istruzioni
- 📱 Design responsive e moderno

#### **register.html**
- 📝 Form completo registrazione
- 🎭 Selezione tipo iscrizione (Ordinario, Sostenitore, Onorario, Volontario)
- ✅ Checkbox privacy e newsletter
- 🌐 Opzioni social registration

#### **area-soci.html**
- 👋 Dashboard personalizzata
- 📋 Sezioni: Documenti, Eventi, Forum, Newsletter
- 👤 Profilo utente con metadati
- 🚪 Logout sicuro

### 🛡️ Sicurezza e Compliance

#### **Gestione Sessioni**
- JWT tokens gestiti automaticamente da Supabase
- Refresh automatico dei token
- Scadenza sessione configurabile

#### **Privacy e GDPR**
- Checkbox consenso privacy obbligatorio
- Gestione opt-in newsletter
- Dati utente crittografati in Supabase

#### **Protezione Dati**
- API Key public (anon) per frontend
- Service role key protetta (solo backend)
- RLS (Row Level Security) configurabile

### 🔧 Configurazione Provider OAuth

#### **Google OAuth**
Nel dashboard Supabase → Authentication → Providers:
```
Enabled: ✅
Client ID: [da Google Cloud Console]
Client Secret: [da Google Cloud Console]
Redirect URL: https://ciezrbsolxpjxswdkkpo.supabase.co/auth/v1/callback
```

#### **Facebook OAuth**
Nel dashboard Supabase → Authentication → Providers:
```
Enabled: ✅
App ID: [da Facebook Developers]
App Secret: [da Facebook Developers] 
Redirect URL: https://ciezrbsolxpjxswdkkpo.supabase.co/auth/v1/callback
```

### 📊 User Metadata Schema

```javascript
{
  full_name: "Mario Rossi",
  first_name: "Mario", 
  last_name: "Rossi",
  phone: "+39 333 123 4567",
  birth_date: "1985-06-15",
  city: "Grumo Appula",
  interests: "Corteo storico, tradizioni locali",
  membership_type: "socio-ordinario", // ordinario|sostenitore|onorario|volontario
  newsletter: true,
  organization: "Associazione Santa Barbara APS",
  registration_date: "2025-07-19T10:30:00Z",
  status: "pending_approval" // pending_approval|approved|suspended
}
```

### 🚀 Vantaggi Supabase vs Cloudflare Access

| Caratteristica | Supabase | Cloudflare Access |
|----------------|----------|-------------------|
| **Setup Complexity** | ✅ Semplice | ❌ Complesso |
| **Frontend Only** | ✅ Sì | ❌ Richiede backend |
| **User Management** | ✅ Dashboard completo | ❌ Limitato |
| **Social Providers** | ✅ 10+ providers | ✅ Providers limitati |
| **Custom Metadata** | ✅ Completo | ❌ Limitato |
| **Email Templates** | ✅ Personalizzabili | ❌ Standard |
| **Cost** | ✅ Free tier generoso | 💰 $3/user/month |
| **Analytics** | ✅ Built-in | ❌ Esterno |

### 📈 Analytics e Tracking

Eventi Google Analytics implementati:
- `login_attempt` (method: email_otp|google|facebook)
- `sign_up` (method: email|google|facebook, membership_type)
- `logout` (method: supabase)
- `page_view` (Area Soci authenticated)

### 🔍 Troubleshooting

#### **Magic Link non arriva**
1. Controlla cartella spam
2. Verifica configurazione SMTP in Supabase
3. Controlla rate limiting (max 1 email/minuto)

#### **OAuth providers non funzionano**
1. Verifica configurazione provider nel dashboard
2. Controlla redirect URL
3. Verifica domini autorizzati

#### **Sessione non persiste**
1. Controlla localStorage del browser
2. Verifica JWT token validity
3. Controlla configurazione sessione timeout

### 📝 TODO Future

- [ ] Implementare RLS policies per user data
- [ ] Aggiungere tabelle custom per forum e documenti
- [ ] Implementare notifiche real-time
- [ ] Aggiungere sistema di ruoli/permissions
- [ ] Implementare password recovery (opzionale)
- [ ] Aggiungere MFA (Multi-Factor Authentication)
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: '3b71a23f7628bed97c76249561ac3b6a8d549710e976a7ce908a0267dd82e934',
            client_secret: CLIENT_SECRET, // ← Dal server, MAI nel frontend!
            code: code,
            redirect_uri: 'https://associazionesbarbara.it/area-soci.html'
        })
    });
    
    const tokens = await tokenResponse.json();
    res.json(tokens);
});
```

#### Variabili di Ambiente (.env)
```bash
# File .env (MAI committare nel repository!)
CLOUDFLARE_CLIENT_ID=3b71a23f7628bed97c76249561ac3b6a8d549710e976a7ce908a0267dd82e934
CLOUDFLARE_CLIENT_SECRET=f398ed6af69e6b6248b738270b1d4ed9ad41f5a2a8a49e5c9383b25a4a938645
REDIRECT_URI=https://associazionesbarbara.it/area-soci.html
```

#### Implementazione Sicura
```javascript
// Usa variabili di ambiente per sicurezza
const CLIENT_SECRET = process.env.CLOUDFLARE_CLIENT_SECRET;

// Validazione endpoint
app.post('/auth/token', async (req, res) => {
    try {
        const { code, state } = req.body;
        
        // Validazioni di sicurezza
        if (!code) {
            return res.status(400).json({ error: 'Authorization code required' });
        }
        
        // Scambio codice con token
        const tokenData = {
            grant_type: 'authorization_code',
            client_id: process.env.CLOUDFLARE_CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            redirect_uri: process.env.REDIRECT_URI
        };
        
        const response = await fetch('https://associazionesbarbara.cloudflareaccess.com/cdn-cgi/access/sso/oidc/3b71a23f7628bed97c76249561ac3b6a8d549710e976a7ce908a0267dd82e934/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: new URLSearchParams(tokenData)
        });
        
        if (!response.ok) {
            throw new Error(`Token exchange failed: ${response.status}`);
        }
        
        const tokens = await response.json();
        
        // Log per debug (rimuovere in produzione)
        console.log('Token exchange successful:', { 
            access_token: tokens.access_token ? '***EXISTS***' : null,
            token_type: tokens.token_type,
            expires_in: tokens.expires_in
        });
        
        res.json(tokens);
        
    } catch (error) {
        console.error('Token exchange error:', error);
        res.status(500).json({ 
            error: 'Token exchange failed',
            message: error.message 
        });
    }
});

// Endpoint per UserInfo
app.get('/auth/userinfo', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Bearer token required' });
        }
        
        const accessToken = authHeader.substring(7);
        
        const response = await fetch('https://associazionesbarbara.cloudflareaccess.com/cdn-cgi/access/sso/oidc/3b71a23f7628bed97c76249561ac3b6a8d549710e976a7ce908a0267dd82e934/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`UserInfo failed: ${response.status}`);
        }
        
        const userInfo = await response.json();
        res.json(userInfo);
        
    } catch (error) {
        console.error('UserInfo error:', error);
        res.status(500).json({ 
            error: 'UserInfo failed',
            message: error.message 
        });
    }
});
```

### 🔧 Debug Mode

L'implementazione include una **modalità debug** che mostra:
- Parametri URL ricevuti
- Stato dell'autenticazione
- Codici di autorizzazione
- Errori di rete

Utile per test e sviluppo.

### 🚀 Deployment Cloudflare Access

1. **Configura Access Policy** in Cloudflare Dashboard
2. **Aggiungi applicazione** per `associazionesbarbara.it/area-soci.html`
3. **Imposta regole di accesso** (email specifiche, gruppi, etc.)
4. **Genera client credentials** e aggiorna la configurazione
5. **Testa il flusso** di autenticazione completo

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
