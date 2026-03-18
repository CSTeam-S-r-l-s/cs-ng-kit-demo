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
- [yalc](https://github.com/wclr/yalc) (per lo sviluppo locale della libreria)

## Setup

Pubblicare la libreria con yalc dal progetto `cs-ng-kit`:

```bash
cd ../cs-ng-kit
./publish-dev.sh
```

Installare le dipendenze del progetto demo:

```bash
cd ../cs-ng-kit-demo
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
