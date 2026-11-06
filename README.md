# C & V Broker s.r.l. – sito web

Sito statico di C & V Broker s.r.l. (gadget promozionali, regali aziendali e abbigliamento personalizzato – Refrontolo, TV).
È fatto solo di HTML, CSS e JavaScript: nessuna installazione, nessuna fase di build. Per vederlo in locale basta aprire `index.html` nel browser.

Il pacchetto funziona sia su **GitHub Pages** sia su un hosting **IONOS** con spazio web.

## Struttura

```
index.html            Chi siamo (home)
servizi.html          Servizi
configuratore.html    Istruzioni e link al configuratore on-line esterno
lavora-con-noi.html   Ricerca agenti plurimandatari
contatti.html         Recapiti e mappa
privacy.html          Informativa privacy e cookie
404.html              Pagina di errore
servizi/, shop-on-line/, ricerca-agenti/, contatti/, sitemap/
                      Reindirizzano i vecchi indirizzi del sito alle nuove pagine
assets/css/style.css  Stili (colori in :root, in cima al file)
assets/js/main.js     Menu mobile ed effetti dinamici
assets/img/           Illustrazioni delle testate (hero-*.svg) e immagine social (og-image.jpg)
CNAME                 Dominio personalizzato per GitHub Pages
.nojekyll             Dice a GitHub di pubblicare i file così come sono
.htaccess             Solo per IONOS: reindirizzamenti 301, HTTPS, cache, sicurezza
favicon.svg, favicon-32.png, apple-touch-icon.png, robots.txt, sitemap.xml
```

## Palette

| Ruolo | Colore |
|---|---|
| Blu principale | `#1F3A5F` |
| Blu scuro (footer, sfondi) | `#152a46` / `#0e1d31` |
| Verde acqua (decorazioni, icone) | `#2A9D8F` |
| Verde acqua scuro (pulsanti, testo) | `#1B7A70` |
| Verde acqua chiaro (sfondi icone) | `#DDF1EE` |
| Azzurro chiaro (testate) | `#F3F8FB` → `#E4EEF5` |
| Testo / testo secondario | `#1C1C1C` / `#5B6472` |

## Effetti dinamici

- Header che si compatta con un'ombra quando si scorre la pagina.
- Sottolineatura animata delle voci di menu.
- Testi, schede e sezioni che compaiono con una dissolvenza mentre si scorre.
- Illustrazioni delle testate con entrata animata e leggero movimento continuo.
- Nella home: parola che cambia ("stampa", "ricamo", "incisione"…) e contatori animati, con gli anni di esperienza calcolati automaticamente dal 1980.
- Schede che si sollevano al passaggio del mouse, con icona animata.
- Pulsante WhatsApp con pulsazione discreta e pulsante "torna su".

Chi ha attivato nel sistema operativo l'opzione "riduci movimento" vede il sito senza animazioni. Senza JavaScript tutti i contenuti restano visibili.

## Pubblicare su GitHub Pages

### 1. Creare il repository

1. Accedi a GitHub e clicca **New repository**.
2. Dai un nome (ad esempio `cevbroker-sito`), lascialo **Public** e clicca **Create repository**.

### 2. Caricare i file

1. Nella pagina del repository clicca **uploading an existing file**.
2. Trascina **il contenuto** della cartella del sito (non la cartella stessa): `index.html` deve trovarsi nella radice del repository.
3. Il caricamento dal browser non prende sempre i file che iniziano con il punto (`.nojekyll`, `.htaccess`). Se mancano, crea `.nojekyll` con **Add file → Create new file**, nome `.nojekyll`, contenuto vuoto. `.htaccess` su GitHub non serve.
4. Clicca **Commit changes**.

In alternativa, da terminale:

```bash
cd cevbroker-site
git init
git add .
git commit -m "Nuovo sito C & V Broker"
git branch -M main
git remote add origin https://github.com/<utente>/cevbroker-sito.git
git push -u origin main
```

### 3. Attivare GitHub Pages

1. Vai su **Settings → Pages**.
2. In **Build and deployment** scegli **Deploy from a branch**, branch `main`, cartella `/ (root)`, poi **Save**.
3. Il campo **Custom domain** si compila da solo con `www.cevbroker.it` grazie al file `CNAME`.

> Vuoi vedere il sito su `https://<utente>.github.io/cevbroker-sito/` prima di cambiare i DNS? Elimina temporaneamente il file `CNAME` dal repository e rimettilo quando sei pronto a collegare il dominio.

### 4. Collegare il dominio www.cevbroker.it (DNS su IONOS)

Nel pannello DNS di IONOS imposta:

| Tipo  | Host | Valore                |
|-------|------|-----------------------|
| A     | @    | 185.199.108.153       |
| A     | @    | 185.199.109.153       |
| A     | @    | 185.199.110.153       |
| A     | @    | 185.199.111.153       |
| CNAME | www  | `<utente>.github.io`  |

`<utente>` è il nome del tuo account GitHub. Rimuovi i record A/AAAA/CNAME precedenti che puntano al vecchio sito.
**Non toccare i record MX**: così la posta su info@cevbroker.it continua a funzionare.
Quando i DNS sono attivi (da pochi minuti a 48 ore), torna su **Settings → Pages** e spunta **Enforce HTTPS**.

> Su GitHub Pages i vecchi indirizzi (`/servizi/`, `/shop-on-line/`, `/ricerca-agenti/`, `/contatti/`) vengono reindirizzati con le pagine nelle cartelle omonime. Su IONOS lo stesso lavoro lo fa `.htaccess` con veri redirect 301, che per Google sono la soluzione migliore.

## Pubblicare su IONOS (alternativa)

Serve un pacchetto **IONOS Web Hosting** con accesso SFTP (non l'editor MyWebsite).

1. Con FileZilla (protocollo SFTP, dati da **Hosting → SFTP e SSH**) attiva *Server → Forza la visualizzazione dei file nascosti*.
2. Crea una cartella sul server (es. `cevbroker`) e copiaci **il contenuto** della cartella del sito, compreso `.htaccess`.
3. **Domini e SSL** → `cevbroker.it` e `www.cevbroker.it` → *Utilizzo del dominio* → *Webspace* → cartella `/cevbroker`.
4. Attiva il certificato SSL per entrambi.

## Dopo la pubblicazione

- `http://cevbroker.it` deve portare a `https://www.cevbroker.it/`.
- I vecchi indirizzi devono aprire le nuove pagine.
- Un indirizzo inesistente (es. `/prova`) deve mostrare la pagina 404.
- Registra il sito su [Google Search Console](https://search.google.com/search-console) e invia `https://www.cevbroker.it/sitemap.xml`.
- Aggiorna il link al sito nella scheda **Google Business Profile**.
- Controlla l'anteprima social con il [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).

## Modifiche comuni

- **Colori**: variabili in cima a `assets/css/style.css`.
- **Illustrazioni in testata**: ogni pagina usa un file `assets/img/hero-*.svg`. Per sostituirle con una foto, metti la foto (es. `hero-home.jpg`, circa 1200×960 px) in `assets/img/` e cambia il `src` dell'elemento `<img class="hero-art">` nella pagina, aggiornando anche il testo `alt`.
- **Logo**: metti il file in `assets/img/` e sostituisci il testo nell'elemento `<a class="brand">` di ogni pagina con `<img src="assets/img/logo.svg" alt="C & V Broker" height="40">`.
- **Testi e recapiti**: si modificano direttamente nei file `.html`. Header e footer sono ripetuti in ogni pagina: se cambi un recapito, aggiornalo in tutte, compreso il blocco JSON-LD nella home.
- Se modifichi una pagina, aggiorna la data `<lastmod>` in `sitemap.xml`.
