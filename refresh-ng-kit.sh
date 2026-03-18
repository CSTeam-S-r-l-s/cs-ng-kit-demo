#!/bin/bash

# --- CONFIGURAZIONE ---
PROFILO="csteam"
REGIONE="eu-central-1"
ACCOUNT_ID="849448200135"
DOMINIO="csteam"                  # es. "mycompany"
REPOSITORY="npm-packages"         # es. "my-pypi-repo"
TOOL="npm"                        # pip | npm | twine | maven | gradle | nuget | swift

# --- AUTENTICAZIONE CODEARTIFACT ---
echo "Login a CodeArtifact..."
aws codeartifact login \
  --tool "$TOOL" \
  --domain "$DOMINIO" \
  --domain-owner "$ACCOUNT_ID" \
  --repository "$REPOSITORY" \
  --region "$REGIONE" \
  --profile "$PROFILO"

echo "Autenticazione completata. Ora aggiorno la libreria per $TOOL con CodeArtifact."

# Script per aggiornare la libreria nel consumer

echo "🔄 Aggiornamento libreria @csteam/cs-ng-kit"
echo ""

# 1. Aggiorna nel consumer
echo ""
echo "🔄 Aggiornamento..."

# Rimuovi vecchia installazione
echo "🗑️  Rimozione vecchia installazione..."
rm -rf node_modules/@csteam 2>/dev/null
rm -rf .angular 2>/dev/null
rm -rf node_modules/.cache 2>/dev/null

# Reinstalla dipendenze
echo ""
echo "📦 Reinstallazione dipendenze..."
npm install

# Pulisci cache Angular
echo ""
echo "🧹 Pulizia cache Angular..."
npx ng cache clean 2>/dev/null || echo "Cache già pulita"

echo ""
echo "✅ Aggiornamento completato!"
echo ""
echo "🚀 Ora puoi avviare il server con:"
echo "   ng serve"
echo ""