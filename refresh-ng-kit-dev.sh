#!/bin/bash

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

# Aggiorna con yalc
echo "📥 Aggiornamento con yalc..."
yalc remove @csteam/cs-ng-kit
yalc add @csteam/cs-ng-kit

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