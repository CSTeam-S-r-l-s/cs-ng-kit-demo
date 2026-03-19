import { Component } from '@angular/core';

@Component({
  selector: 'app-theming-scss-page',
  template: `
    <h1 class="text-page-title">Theming — SCSS</h1>

    <div class="docs">
      <p>Se il progetto utilizza SCSS, la libreria <strong>cs-ng-kit</strong> espone
        file SCSS importabili direttamente e un modulo di variabili mappate sulle CSS custom properties.</p>

      <h2>Setup</h2>
      <p>Importa gli stili della libreria nel file <code>styles.scss</code> globale:</p>
      <pre><code>&#64;use "&#64;csteam/cs-ng-kit/styles/cs-ng-kit";</code></pre>

      <div class="demo-section" style="border-left:3px solid #3b82f6;">
        <p><strong>Nota:</strong> usa <code>&#64;use</code> al posto di <code>&#64;import</code>.
          L'approccio SCSS è alternativo a quello CSS: non importare entrambi.</p>
      </div>

      <h2>Variabili SCSS</h2>
      <p>Il modulo <code>&#64;csteam/cs-ng-kit/styles/variables</code> espone variabili SCSS
        mappate sulle CSS custom properties del tema. Questo permette di riutilizzare i colori
        della libreria nei propri stili mantenendo la coerenza visiva.</p>
      <pre><code>&#64;use "&#64;csteam/cs-ng-kit/styles/variables";

.my-button {{ '{' }}
  background: variables.$accent;
  color: variables.$primary-text;
{{ '}' }}

.my-card {{ '{' }}
  border: 1px solid variables.$primary-pronunced;
  background: variables.$primary;
{{ '}' }}</code></pre>

      <h3>Variabili disponibili</h3>
      <div class="demo-section">
        <table style="width:100%; font-size:0.85rem; border-collapse:collapse;">
          <tr class="table-border-row">
            <th style="text-align:left; padding:0.4rem 0.5rem;">Variabile SCSS</th>
            <th style="text-align:left; padding:0.4rem 0.5rem;">CSS custom property</th>
            <th style="text-align:left; padding:0.4rem 0.5rem;">Categoria</th>
          </tr>
          @for (v of scssVars; track v.scss) {
            <tr class="table-border-row-light">
              <td style="padding:0.3rem 0.5rem;"><code>{{ v.scss }}</code></td>
              <td style="padding:0.3rem 0.5rem;"><code>{{ v.css }}</code></td>
              <td style="padding:0.3rem 0.5rem;">{{ v.category }}</td>
            </tr>
          }
        </table>
      </div>

      <p>Tutte le variabili sono dichiarate con <code>!default</code>, quindi possono essere
        sovrascritte prima dell'import se necessario.</p>

      <h2>Override del tema</h2>
      <p>Poiché le variabili SCSS puntano alle CSS custom properties, la personalizzazione
        del tema avviene sempre tramite override delle custom properties:</p>
      <pre><code>&#64;use "&#64;csteam/cs-ng-kit/styles/cs-ng-kit";

:root {{ '{' }}
  --accent: #e11d48;
  --accent-hover: #be123c;
  --success: #059669;
{{ '}' }}</code></pre>
      <p>In questo modo sia i componenti della libreria che i propri stili che usano
        <code>variables.$accent</code> rifletteranno automaticamente il nuovo colore.</p>

      <h2>Dark Mode</h2>
      <p>Il dark mode funziona esattamente come con CSS puro: la classe <code>dark</code>
        sull'elemento <code>&lt;html&gt;</code> attiva le variabili scure.</p>
      <pre><code>&#64;use "&#64;csteam/cs-ng-kit/styles/variables";

.my-card {{ '{' }}
  background: variables.$primary;
  color: variables.$primary-text;
  border: 1px solid variables.$primary-pronunced;
{{ '}' }}</code></pre>
      <p>Non serve scrivere regole <code>.dark</code> separate per i propri stili: le variabili
        puntano alle custom properties che cambiano automaticamente con il tema.</p>

      <h2>Mixin e composizione</h2>
      <p>Le variabili SCSS possono essere usate all'interno di mixin e funzioni per creare
        stili riutilizzabili nel progetto:</p>
      <pre><code>&#64;use "&#64;csteam/cs-ng-kit/styles/variables";

&#64;mixin status-badge($bg, $text) {{ '{' }}
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  background: $bg;
  color: $text;
{{ '}' }}

.badge-success {{ '{' }}
  &#64;include status-badge(variables.$success-lighter, variables.$success);
{{ '}' }}

.badge-danger {{ '{' }}
  &#64;include status-badge(variables.$danger-lighter, variables.$danger);
{{ '}' }}

.badge-warning {{ '{' }}
  &#64;include status-badge(variables.$warning-lighter, variables.$warning);
{{ '}' }}</code></pre>

      <h2>Esempio completo</h2>
      <pre><code>// styles.scss
&#64;use "&#64;fortawesome/fontawesome-free/css/all.min.css";
&#64;use "&#64;angular/cdk/overlay-prebuilt.css";
&#64;use "&#64;csteam/cs-ng-kit/styles/cs-ng-kit";

// Override tema light
:root {{ '{' }}
  --accent: #7c3aed;
  --accent-hover: #6d28d9;
{{ '}' }}

// Override tema dark
.dark {{ '{' }}
  --accent: #5b21b6;
  --accent-hover: #7c3aed;
{{ '}' }}</code></pre>

      <pre><code>// _my-theme.scss — stili applicativi
&#64;use "&#64;csteam/cs-ng-kit/styles/variables";

body {{ '{' }}
  background: variables.$background;
  color: variables.$primary-text;
{{ '}' }}

a {{ '{' }}
  color: variables.$hyperlink-text;
  &amp;:hover {{ '{' }} color: variables.$hyperlink-text-hover; {{ '}' }}
{{ '}' }}</code></pre>
    </div>
  `
})
export class ThemingScssPageComponent {
  scssVars = [
    { scss: '$background', css: '--background', category: 'Sfondo' },
    { scss: '$primary', css: '--primary', category: 'Sfondo' },
    { scss: '$primary-pronunced', css: '--primary-pronunced', category: 'Sfondo' },
    { scss: '$secondary', css: '--secondary', category: 'Sfondo' },
    { scss: '$disabled', css: '--disabled', category: 'Sfondo' },
    { scss: '$accent', css: '--accent', category: 'Accento' },
    { scss: '$accent-hover', css: '--accent-hover', category: 'Accento' },
    { scss: '$accent-lighter', css: '--accent-lighter', category: 'Accento' },
    { scss: '$faded', css: '--faded', category: 'Accento' },
    { scss: '$faded-hover', css: '--faded-hover', category: 'Accento' },
    { scss: '$faded-lighter', css: '--faded-lighter', category: 'Accento' },
    { scss: '$primary-text', css: '--primary-text', category: 'Testo' },
    { scss: '$secondary-text', css: '--secondary-text', category: 'Testo' },
    { scss: '$disabled-text', css: '--disabled-text', category: 'Testo' },
    { scss: '$hyperlink-text', css: '--hyperlink-text', category: 'Testo' },
    { scss: '$hyperlink-text-hover', css: '--hyperlink-text-hover', category: 'Testo' },
    { scss: '$hyperlink-text-visited', css: '--hyperlink-text-visited', category: 'Testo' },
    { scss: '$danger', css: '--danger', category: 'Stato' },
    { scss: '$danger-hover', css: '--danger-hover', category: 'Stato' },
    { scss: '$danger-lighter', css: '--danger-lighter', category: 'Stato' },
    { scss: '$warning', css: '--warning', category: 'Stato' },
    { scss: '$warning-hover', css: '--warning-hover', category: 'Stato' },
    { scss: '$warning-lighter', css: '--warning-lighter', category: 'Stato' },
    { scss: '$success', css: '--success', category: 'Stato' },
    { scss: '$success-hover', css: '--success-hover', category: 'Stato' },
    { scss: '$success-lighter', css: '--success-lighter', category: 'Stato' },
    { scss: '$white', css: '--white', category: 'Base' },
    { scss: '$black', css: '--black', category: 'Base' },
    { scss: '$primary-faded', css: '--primary-faded', category: 'Base' },
  ];
}
