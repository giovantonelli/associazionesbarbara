# Copilot Instruction: Associazione Santa Barbara APS

## Scopo del sito
Il sito dell'Associazione Santa Barbara APS è una piattaforma informativa e gestionale per soci e visitatori. Offre pagine pubbliche (chi siamo, attività, eventi, partner, privacy, ecc.) e aree riservate ai soci per la gestione di profili, eventi e comunicazioni.

## Struttura principale
- **HTML**: Ogni sezione del sito è una pagina HTML dedicata (es. `index.html`, `chi-siamo.html`, `attivita.html`, `eventi.html`, `area-soci.html`, ecc.).
- **CSS**: Lo stile è gestito principalmente da `assets/css/style.css`.
- **JS**: La logica interattiva e la gestione dei dati sono in `assets/js/script.js` e altri file JS specifici.
- **Dati**: Alcuni contenuti dinamici (es. FAQ) sono gestiti tramite file JSON (`data/faq.json`).

## Funzionalità chiave
- **Gestione eventi**: I soci possono creare, modificare ed eliminare eventi tramite form dedicati. I dati evento includono titolo, data, orario, luogo, descrizione, immagine, ecc.
- **Gestione profili**: I soci possono aggiornare i propri dati personali e visualizzare informazioni riservate.
- **Cookie e privacy**: Banner e link per la gestione dei cookie e la consultazione della privacy policy sono presenti in tutte le pagine.
- **Accessibilità**: Il sito è pensato per essere responsivo e accessibile.

## Convenzioni di sviluppo
- **Footer**: Tutte le pagine hanno un footer uniforme con link a privacy e gestione cookie.
- **Form**: I form usano id e name coerenti con la logica JS (es. `event-date`, `event-title`, ecc.).
- **Errori HTML**: Prestare attenzione alla chiusura corretta dei tag, in particolare `<span>` nei footer.
- **Commit**: Usare messaggi descrittivi e chiari, ad esempio "Correzione errori HTML nei footer".

## Best practice per Copilot
- Mantenere la coerenza tra HTML, CSS e JS.
- Validare sempre la sintassi HTML e JS dopo modifiche.
- Seguire la struttura e le convenzioni esistenti per aggiungere nuove funzionalità.
- Commentare il codice dove necessario per facilitare la manutenzione.
- Testare le modifiche su tutte le pagine interessate.

## Note aggiuntive
- Il sito utilizza Supabase per alcune funzionalità di autenticazione e gestione dati.
- Alcuni script JS sono dedicati all'integrazione con servizi esterni (adblock, notifiche, ecc.).
- Le immagini e i contenuti multimediali sono organizzati in `assets/images/`.

---

**Queste istruzioni servono a guidare Copilot e gli sviluppatori nella manutenzione e nell'estensione del sito, garantendo coerenza, qualità e facilità di collaborazione.**
