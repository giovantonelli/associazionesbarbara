# Test Supabase Authentication System

## Sistema di Autenticazione Implementato

✅ **Pagine Create:**
- `login.html` - Accesso utenti registrati
- `register.html` - Registrazione nuovi utenti  
- `area-soci.html` - Area protetta solo per soci

## Configurazione Supabase

- **Project URL**: https://ciezrbsolxpjxswdkkpo.supabase.co
- **Public API Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpZXpyYnNvbHhwanhzd2Rra3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MjM1NjAsImV4cCI6MjA2ODQ5OTU2MH0.V-U8KhO8byObUW5kJ8XbLBkp9O9Efh98MdbKYFfbQJk

## Test Procedure

### 1. Test Registrazione
1. Vai su `/register.html`
2. Compila il form con:
   - Nome: Test
   - Cognome: Utente
   - Email: test@example.com
   - Password: test123
   - Conferma password: test123
   - ✅ Accetta termini
3. Clicca "Registrati"
4. **Risultato Atteso**: Messaggio di conferma email inviata

### 2. Test Conferma Email
1. Controlla la casella email `test@example.com`
2. Clicca sul link di conferma Supabase
3. **Risultato Atteso**: Email confermata, account attivo

### 3. Test Login
1. Vai su `/login.html`
2. Inserisci:
   - Email: test@example.com
   - Password: test123
3. Clicca "Accedi"
4. **Risultato Atteso**: Reindirizzamento ad `area-soci.html`

### 4. Test Accesso Limitato
1. Dovresti essere su `area-soci.html`
2. **Risultato Atteso**: Messaggio "Accesso Limitato" perché il ruolo è "utente"

### 5. Test Promozione a Socio
1. Vai nel dashboard Supabase: https://ciezrbsolxpjxswdkkpo.supabase.co
2. Authentication > Users
3. Trova l'utente `test@example.com`
4. Modifica `user_metadata` → aggiungi `"role": "socio"`
5. Salva modifiche

### 6. Test Accesso Area Soci
1. Ricarica `area-soci.html`
2. **Risultato Atteso**: Accesso completo con contenuti riservati

### 7. Test Logout
1. Clicca il pulsante "Logout" nell'area soci
2. **Risultato Atteso**: Reindirizzamento alla home, sessione terminata

## Gestione Ruoli

### Promuovere Utente a Socio

**Via Dashboard Supabase:**
1. Authentication > Users
2. Clicca sull'utente
3. Modifica `user_metadata`:
```json
{
  "first_name": "Nome",
  "last_name": "Cognome", 
  "full_name": "Nome Cognome",
  "role": "socio"
}
```

**Via SQL Console:**
```sql
UPDATE auth.users 
SET user_metadata = jsonb_set(user_metadata, '{role}', '"socio"')
WHERE email = 'test@example.com';
```

## Stati Possibili

### Utente Non Autenticato
- Accesso a `area-soci.html` → Reindirizza a `login.html`

### Utente Autenticato con Ruolo "utente"  
- Accesso a `area-soci.html` → Messaggio accesso limitato

### Utente Autenticato con Ruolo "socio"
- Accesso a `area-soci.html` → Contenuto completo area soci

### Email Non Confermata
- Login → Messaggio di conferma email richiesta

## Troubleshooting

### Login non funziona
- Verifica email confermata
- Controlla password corretta
- Verifica console browser per errori

### Registrazione fallisce
- Email già esistente
- Password troppo corta (min 6 caratteri)
- Termini non accettati

### Area soci sempre limitata
- Verifica ruolo utente nel dashboard Supabase
- Ricarica pagina dopo modifica ruolo
- Controlla console browser per errori di sessione

## File Modificati

1. **`login.html`** - NUOVO - Pagina di accesso
2. **`register.html`** - NUOVO - Pagina di registrazione  
3. **`area-soci.html`** - MODIFICATO - Rimosso Cloudflare, aggiunto Supabase
4. **`README.md`** - AGGIORNATO - Documentazione sistema Supabase

## Sicurezza

- ✅ Nessun secret nel frontend (solo public anon key)
- ✅ Email verification obbligatoria
- ✅ Gestione ruoli tramite metadata utente
- ✅ Session management automatico Supabase
- ✅ Logout sicuro con cleanup sessione
- ✅ Protezione CSRF tramite Supabase Auth

## Next Steps

1. **Test completo** del flusso di autenticazione
2. **Configurazione SMTP** in Supabase per email personalizzate
3. **Creazione utenti admin** per gestione soci
4. **Backup configurazioni** Supabase
5. **Monitoring** accessi e registrazioni
