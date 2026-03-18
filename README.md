# cs-ng-kit-demo

Applicazione Angular di esempio e documentazione interattiva per la libreria **@csteam/cs-ng-kit**.

Il progetto mostra l'utilizzo dei vari componenti della libreria attraverso:

- Una **Dashboard** con panoramica dei componenti principali in azione
- Guide **Getting Started** per installazione e configurazione
- Guide **Theming** per la personalizzazione del tema con CSS puro e Tailwind 4
- Una **pagina per componente** con esempi interattivi e documentazione delle proprietà, eventi e metodi

## Prerequisiti

- Node.js 22+
- Angular CLI 21+
- AWS CLI (per autenticazione su CodeArtifact)

## Setup

Autenticarsi su AWS CodeArtifact:

```bash
aws codeartifact login \
  --tool npm \
  --domain csteam \
  --domain-owner <AWS_ACCOUNT_ID> \
  --repository npm-packages
```

Installare le dipendenze:

```bash
npm install
```

### Sviluppo locale con yalc

Per lavorare con una versione locale della libreria:

```bash
# Dal progetto cs-ng-kit
./publish-dev.sh

# Dal progetto demo
yalc add @csteam/cs-ng-kit
npm install
```

## Sviluppo

```bash
ng serve
```

L'applicazione sarà disponibile su `http://localhost:4200/`.

## Build

```bash
ng build
```

Gli artefatti di build saranno nella directory `dist/`.

## Deploy su GitHub Pages

Il progetto include un workflow GitHub Actions (`.github/workflows/deploy.yml`) che
esegue automaticamente build e deploy su GitHub Pages ad ogni push sul branch `main`.

Il workflow si autentica su AWS CodeArtifact per scaricare `@csteam/cs-ng-kit`.

### Configurazione

1. Nel repository GitHub, vai su **Settings → Secrets and variables → Actions → Variables** e configura:
   - `AWS_REGION` — regione AWS (es. `eu-west-1`)
   - `AWS_ACCOUNT_ID` — ID dell'account AWS
   - `AWS_ROLE_ARN` — ARN del ruolo IAM per GitHub Actions (con permessi CodeArtifact)
2. Vai su **Settings → Pages → Source** e seleziona **GitHub Actions**
3. Pusha sul branch `main`

La demo sarà disponibile su `https://<org>.github.io/cs-ng-kit-demo/`.

### Build GitHub Pages in locale

```bash
npm run build:ghpages
```
