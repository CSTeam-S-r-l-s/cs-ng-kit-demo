import { Component } from '@angular/core';

@Component({
  selector: 'app-theming-tailwind-page',
  template: `
    <h1 class="text-page-title">Theming — Tailwind 4</h1>

    <div class="docs">
      <p>La libreria <strong>cs-ng-kit</strong> utilizza internamente Tailwind CSS 4 con il
        prefix <code>cnk</code>. Se il tuo progetto usa Tailwind 4, puoi integrare il tema
        della libreria direttamente nella tua configurazione.</p>

      <h2>Come funziona</h2>
      <p>La libreria compila i propri stili con:</p>
      <pre><code>&#64;import "tailwindcss" prefix(cnk);</code></pre>
      <p>Tutte le classi Tailwind interne alla libreria sono prefissate con
        <code>cnk:</code> (es. <code>cnk:flex</code>, <code>cnk:bg-accent</code>).
        Il tuo progetto può usare Tailwind normalmente senza conflitti.</p>

      <h2>Integrazione nel progetto</h2>
      <p>Mappa i colori del tema della libreria nei tuoi token Tailwind:</p>
      <pre><code>&#64;import "tailwindcss";

&#64;theme {{ '{' }}
  --color-kit-accent: var(--accent);
  --color-kit-accent-hover: var(--accent-hover);
  --color-kit-danger: var(--danger);
  --color-kit-success: var(--success);
  --color-kit-warning: var(--warning);
  --color-kit-primary-text: var(--primary-text);
  --color-kit-secondary-text: var(--secondary-text);
  --color-kit-background: var(--background);
{{ '}' }}</code></pre>
      <p>Ora puoi usare classi come <code>bg-kit-accent</code>, <code>text-kit-primary-text</code>, ecc.</p>

      <h2>Dark Mode</h2>
      <p>La libreria usa internamente la variante <code>cnk:dark:</code> che si attiva tramite
        <code>prefers-color-scheme: dark</code>. Tuttavia, il meccanismo consigliato per il toggle
        manuale è la <strong>classe <code>dark</code></strong> sull'elemento <code>&lt;html&gt;</code>.</p>

      <h3>Configurazione con Tailwind 4</h3>
      <p>Per usare il dark mode basato su classe nel tuo progetto Tailwind 4, aggiungi la
        custom variant <code>dark</code>:</p>
      <pre><code>&#64;import "tailwindcss";
&#64;custom-variant dark (&amp;:where(.dark, .dark *));</code></pre>
      <p>Ora puoi usare le classi <code>dark:</code> nei tuoi template:</p>
      <pre><code>&lt;div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"&gt;
  ...
&lt;/div&gt;</code></pre>

      <h3>Toggle in Angular</h3>
      <pre><code>import {{ '{' }} DOCUMENT {{ '}' }} from '&#64;angular/common';
import {{ '{' }} inject, signal {{ '}' }} from '&#64;angular/core';

export class MyComponent {{ '{' }}
  private document = inject(DOCUMENT);
  dark = signal(false);

  toggleDark() {{ '{' }}
    this.dark.update(d => !d);
    this.document.documentElement.classList.toggle('dark', this.dark());
  {{ '}' }}
{{ '}' }}</code></pre>

      <h3>Override dei colori dark</h3>
      <p>Le CSS custom properties della libreria cambiano automaticamente quando la classe
        <code>dark</code> è presente. Per personalizzarle:</p>
      <pre><code>.dark {{ '{' }}
  --accent: #7c3aed;
  --accent-hover: #6d28d9;
  --background: #18181b;
{{ '}' }}</code></pre>
      <p>Sia i componenti della libreria che i tuoi token <code>kit-*</code> rifletteranno
        automaticamente le modifiche, perché puntano alle stesse CSS custom properties.</p>

      <h2>Struttura interna del tema</h2>
      <p>Il file <code>tailwind.css</code> della libreria mappa le CSS custom properties ai token Tailwind:</p>
      <pre><code>&#64;import "tailwindcss" prefix(cnk);
&#64;import "./theme.css";

&#64;theme {{ '{' }}
  --color-background: var(--background);
  --color-primary: var(--primary);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-danger: var(--danger);
  --color-success: var(--success);
  --color-primary-text: var(--primary-text);
  --color-secondary-text: var(--secondary-text);
  /* ... */
{{ '}' }}</code></pre>

      <div class="demo-section" style="border-left:3px solid #3b82f6;">
        <p><strong>Importante:</strong> non è necessario installare Tailwind nel progetto consumer
          per usare la libreria. Gli stili compilati (<code>cs-ng-kit.css</code>) sono già
          auto-contenuti. Tailwind è necessario solo se vuoi usare le classi utility nel tuo codice.</p>
      </div>

      <h2>Esempio completo</h2>
      <pre><code>/* styles.css del progetto consumer con Tailwind 4 */
&#64;import "&#64;fortawesome/fontawesome-free/css/all.min.css";
&#64;import "&#64;angular/cdk/overlay-prebuilt.css";
&#64;import "&#64;csteam/cs-ng-kit/styles/cs-ng-kit.css";
&#64;import "tailwindcss";

&#64;custom-variant dark (&amp;:where(.dark, .dark *));

&#64;theme {{ '{' }}
  --color-kit-accent: var(--accent);
  --color-kit-danger: var(--danger);
  --color-kit-success: var(--success);
{{ '}' }}

/* Override light */
:root {{ '{' }}
  --accent: #7c3aed;
  --accent-hover: #6d28d9;
{{ '}' }}

/* Override dark */
.dark {{ '{' }}
  --accent: #5b21b6;
  --accent-hover: #7c3aed;
{{ '}' }}</code></pre>
    </div>
  `
})
export class ThemingTailwindPageComponent {}
