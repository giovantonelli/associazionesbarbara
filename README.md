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

## 🔐 Autenticazione Area Soci (OIDC)

L'area soci utilizza **Cloudflare Access** con protocollo **OIDC (OpenID Connect)** per un'autenticazione sicura e moderna.

### 📋 Configurazione Attuale

```javascript
const OIDC_CONFIG = {
    client_id: '3b71a23f7628bed97c76249561ac3b6a8d549710e976a7ce908a0267dd82e934',
    redirect_uri: 'https://associazionesbarbara.it/area-soci.html',
    authorization_endpoint: 'https://associazionesbarbara.cloudflareaccess.com/cdn-cgi/access/sso/oidc/.../authorization',
    token_endpoint: 'https://associazionesbarbara.cloudflareaccess.com/cdn-cgi/access/sso/oidc/.../token',
    userinfo_endpoint: 'https://associazionesbarbara.cloudflareaccess.com/cdn-cgi/access/sso/oidc/.../userinfo',
    scope: 'openid email profile'
};
```

### 🔄 Flusso di Autenticazione

1. **Click su "Accedi all'Area Soci"** → Reindirizzamento a Cloudflare Access
2. **Inserimento credenziali** → L'utente si autentica tramite provider configurato
3. **Callback con codice** → Ritorno all'applicazione con authorization code
4. **Scambio token** → Il codice viene scambiato con access token
5. **Informazioni utente** → Recupero dei dati dell'utente autenticato

### ⚠️ Limitazioni Frontend

Il **token exchange** richiede il `client_secret` che **NON deve essere esposto nel frontend**. Attualmente:

- ✅ **Authorization flow**: Funziona completamente
- ✅ **Callback handling**: Gestisce codici e errori
- ❌ **Token exchange**: Richiede backend (CORS policy)
- ❌ **UserInfo access**: Richiede access token valido

### 🛠️ Implementazione Backend Necessaria

Per un'implementazione completa, crea un endpoint backend:

```javascript
// Backend endpoint: /auth/token
app.post('/auth/token', async (req, res) => {
    const { code } = req.body;
    
    // ⚠️ CLIENT SECRET: Conservare come variabile di ambiente
    const CLIENT_SECRET = 'f398ed6af69e6b6248b738270b1d4ed9ad41f5a2a8a49e5c9383b25a4a938645';
    
    const tokenResponse = await fetch(OIDC_CONFIG.token_endpoint, {
        method: 'POST',
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
