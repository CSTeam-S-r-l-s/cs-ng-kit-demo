import { Component } from '@angular/core';

@Component({
  selector: 'app-theming-tailwind-page',
  template: `
    <h1 style="font-size:1.5rem; font-weight:700; margin-bottom:1.5rem;">Theming — Tailwind 4</h1>

    <div class="docs">
      <p>La libreria <strong>cs-ng-kit</strong> utilizza internamente Tailwind CSS 4 con il
        prefix <code>cnk</code>. Se il tuo progetto usa Tailwind 4, puoi integrare il tema
        della libreria direttamente nella tua configurazione.</p>

      <h2>Come funziona</h2>
      <p>La libreria compila i propri stili con:</p>
      <pre><code>&#64;import "tailwindcss" prefix(cnk);</code></pre>
      <p>Questo significa che tutte le classi Tailwind interne alla libreria sono prefissate con
        <code>cnk:</code> (es. <code>cnk:flex</code>, <code>cnk:bg-accent</code>).
        Il tuo progetto può usare Tailwind normalmente senza conflitti.</p>

      <h2>Integrazione nel progetto</h2>
      <p>Se il tuo progetto usa Tailwind 4, puoi mappare i colori del tema della libreria
        nei tuoi token Tailwind per riutilizzarli nei tuoi componenti:</p>
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

      <h2>Override del tema</h2>
      <p>Per personalizzare i colori, sovrascrivi le CSS custom properties come nel theming Pure CSS:</p>
      <pre><code>:root {{ '{' }}
  --accent: #7c3aed;
  --accent-hover: #6d28d9;
{{ '}' }}</code></pre>
      <p>Sia i componenti della libreria (prefix <code>cnk:</code>) che i tuoi componenti
        (tramite i token <code>kit-*</code>) rifletteranno automaticamente le modifiche.</p>

      <h2>Struttura interna del tema</h2>
      <p>Il file <code>tailwind.css</code> della libreria mappa le CSS custom properties ai token Tailwind:</p>
      <pre><code>&#64;import "tailwindcss" prefix(cnk);
&#64;import "./theme.css";

&#64;theme {{ '{' }}
  --color-background: var(--background);
  --color-primary: var(--primary);
  --color-primary-pronunced: var(--primary-pronunced);
  --color-secondary: var(--secondary);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-danger: var(--danger);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-primary-text: var(--primary-text);
  --color-secondary-text: var(--secondary-text);
  /* ... */
{{ '}' }}</code></pre>

      <div class="demo-section" style="border-left:3px solid #3b82f6;">
        <p><strong>Importante:</strong> non è necessario installare Tailwind nel progetto consumer
          per usare la libreria. Gli stili compilati (<code>cs-ng-kit.css</code>) sono già
          auto-contenuti. Tailwind è necessario solo se vuoi usare le classi utility nel tuo codice.</p>
      </div>

      <h2>Esempio: progetto con Tailwind 4</h2>
      <pre><code>/* styles.css del progetto consumer */
&#64;import "&#64;fortawesome/fontawesome-free/css/all.min.css";
&#64;import "&#64;angular/cdk/overlay-prebuilt.css";
&#64;import "&#64;csteam/cs-ng-kit/styles/cs-ng-kit.css";
&#64;import "tailwindcss";

&#64;theme {{ '{' }}
  --color-kit-accent: var(--accent);
  --color-kit-danger: var(--danger);
  --color-kit-success: var(--success);
{{ '}' }}

/* Override del tema */
:root {{ '{' }}
  --accent: #7c3aed;
  --accent-hover: #6d28d9;
{{ '}' }}</code></pre>
    </div>
  `
})
export class ThemingTailwindPageComponent {}
