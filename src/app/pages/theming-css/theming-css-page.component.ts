import { Component } from '@angular/core';

@Component({
  selector: 'app-theming-css-page',
  template: `
    <h1 class="text-page-title">Theming — Pure CSS</h1>

    <div class="docs">
      <p>Gli stili di <strong>cs-ng-kit</strong> sono basati su CSS custom properties.
        Per personalizzare il tema è sufficiente eseguire l'override delle variabili desiderate.</p>

      <h2>Override base</h2>
      <p>Dopo l'import degli stili della libreria, ridefinisci le variabili in <code>:root</code>:</p>
      <pre><code>&#64;import "&#64;csteam/cs-ng-kit/styles/cs-ng-kit.css";

:root {{ '{' }}
  --accent: #e11d48;
  --accent-hover: #be123c;
  --success: #059669;
{{ '}' }}</code></pre>

      <h2>Variabili disponibili</h2>

      <h3>Light theme (default)</h3>
      <div class="demo-section">
        <table style="width:100%; font-size:0.85rem; border-collapse:collapse;">
          <tr class="table-border-row">
            <th style="text-align:left; padding:0.4rem 0.5rem;">Variabile</th>
            <th style="text-align:left; padding:0.4rem 0.5rem;">Default</th>
            <th style="text-align:left; padding:0.4rem 0.5rem;">Anteprima</th>
          </tr>
          @for (v of lightVars; track v.name) {
            <tr class="table-border-row-light">
              <td style="padding:0.3rem 0.5rem;"><code>{{ v.name }}</code></td>
              <td style="padding:0.3rem 0.5rem;">{{ v.value }}</td>
              <td style="padding:0.3rem 0.5rem;">
                <span class="color-swatch" [style.background]="v.value"></span>
              </td>
            </tr>
          }
        </table>
      </div>

      <h2>Dark Mode</h2>
      <p>La libreria include un set completo di variabili per il tema scuro, definite nel selettore
        <code>.dark</code>. Per attivare la dark mode è sufficiente aggiungere la classe
        <code>dark</code> all'elemento <code>&lt;html&gt;</code>.</p>

      <h3>Attivazione</h3>
      <pre><code>// Toggle dark mode
document.documentElement.classList.toggle('dark');</code></pre>

      <p>In un componente Angular:</p>
      <pre><code>import {{ '{' }} DOCUMENT {{ '}' }} from '&#64;angular/common';
import {{ '{' }} inject {{ '}' }} from '&#64;angular/core';

export class MyComponent {{ '{' }}
  private document = inject(DOCUMENT);

  toggleDark() {{ '{' }}
    this.document.documentElement.classList.toggle('dark');
  {{ '}' }}
{{ '}' }}</code></pre>

      <h3>Variabili dark theme</h3>
      <p>Quando la classe <code>dark</code> è presente, le variabili vengono sovrascritte automaticamente.
        I valori di default sono:</p>
      <div class="demo-section">
        <table style="width:100%; font-size:0.85rem; border-collapse:collapse;">
          <tr class="table-border-row">
            <th style="text-align:left; padding:0.4rem 0.5rem;">Variabile</th>
            <th style="text-align:left; padding:0.4rem 0.5rem;">Default (dark)</th>
            <th style="text-align:left; padding:0.4rem 0.5rem;">Anteprima</th>
          </tr>
          @for (v of darkVars; track v.name) {
            <tr class="table-border-row-light">
              <td style="padding:0.3rem 0.5rem;"><code>{{ v.name }}</code></td>
              <td style="padding:0.3rem 0.5rem;">{{ v.value }}</td>
              <td style="padding:0.3rem 0.5rem;">
                <span class="color-swatch" [style.background]="v.value"></span>
              </td>
            </tr>
          }
        </table>
      </div>

      <h3>Override del dark theme</h3>
      <p>Per personalizzare i colori del tema scuro, sovrascrivi le variabili nel selettore <code>.dark</code>:</p>
      <pre><code>.dark {{ '{' }}
  --accent: #7c3aed;
  --accent-hover: #6d28d9;
  --background: #18181b;
{{ '}' }}</code></pre>

      <h3>Adattare gli stili dell'app</h3>
      <p>Oltre ai componenti della libreria, anche gli stili della tua applicazione devono
        reagire alla classe <code>dark</code>:</p>
      <pre><code>body {{ '{' }}
  background: #f5f5f5;
  color: #1a1a1a;
{{ '}' }}

.dark body {{ '{' }}
  background: #0f172a;
  color: #e5e7eb;
{{ '}' }}

.my-card {{ '{' }}
  background: #fff;
  border: 1px solid #e5e7eb;
{{ '}' }}

.dark .my-card {{ '{' }}
  background: #1e293b;
  border-color: #334155;
{{ '}' }}</code></pre>

      <div class="demo-section" style="border-left:3px solid #3b82f6;">
        <p><strong>Prova:</strong> usa il pulsante <i class="fa-solid fa-moon"></i> /
          <i class="fa-solid fa-sun"></i> nella sidebar per vedere la dark mode in azione.</p>
      </div>

      <h2>Esempio completo</h2>
      <pre><code>&#64;import "&#64;csteam/cs-ng-kit/styles/cs-ng-kit.css";

/* Tema personalizzato light */
:root {{ '{' }}
  --accent: #dc2626;
  --accent-hover: #b91c1c;
  --accent-lighter: #fef2f2;
{{ '}' }}

/* Tema personalizzato dark */
.dark {{ '{' }}
  --accent: #991b1b;
  --accent-hover: #dc2626;
  --accent-lighter: #450a0a;
{{ '}' }}

/* Stili app */
body {{ '{' }} background: #f5f5f5; color: #1a1a1a; {{ '}' }}
.dark body {{ '{' }} background: #0f172a; color: #e5e7eb; {{ '}' }}</code></pre>
    </div>
  `,
  styles: [`
    .color-swatch {
      display: inline-block; width: 1.25rem; height: 1.25rem;
      border-radius: 3px; border: 1px solid #d1d5db; vertical-align: middle;
    }
  `]
})
export class ThemingCssPageComponent {
  lightVars = [
    { name: '--background', value: '#f9fafb' },
    { name: '--primary', value: '#f9fafb' },
    { name: '--primary-pronunced', value: '#cbd5e1' },
    { name: '--secondary', value: '#e2e8f0' },
    { name: '--disabled', value: '#d0d0d0' },
    { name: '--accent', value: '#0ea5e9' },
    { name: '--accent-hover', value: '#0284c7' },
    { name: '--accent-lighter', value: '#f0f9ff' },
    { name: '--faded', value: '#a1a1aa' },
    { name: '--faded-hover', value: '#71717a' },
    { name: '--primary-text', value: '#1e293b' },
    { name: '--secondary-text', value: '#94a3b8' },
    { name: '--disabled-text', value: '#fafafa' },
    { name: '--hyperlink-text', value: '#0ea5e9' },
    { name: '--danger', value: '#dc2626' },
    { name: '--danger-hover', value: '#b91c1c' },
    { name: '--danger-lighter', value: '#fef2f2' },
    { name: '--warning', value: '#fbbf24' },
    { name: '--warning-hover', value: '#f59e0b' },
    { name: '--warning-lighter', value: '#fffbeb' },
    { name: '--success', value: '#16a34a' },
    { name: '--success-hover', value: '#15803d' },
    { name: '--success-lighter', value: '#f0fdf4' },
  ];

  darkVars = [
    { name: '--background', value: '#0f172a' },
    { name: '--primary', value: '#0f172a' },
    { name: '--primary-pronunced', value: '#475569' },
    { name: '--secondary', value: '#1e293b' },
    { name: '--disabled', value: '#e4e4e7' },
    { name: '--accent', value: '#075985' },
    { name: '--accent-hover', value: '#0369a1' },
    { name: '--accent-lighter', value: '#1e293b' },
    { name: '--faded', value: '#155e75' },
    { name: '--faded-hover', value: '#0e7490' },
    { name: '--primary-text', value: '#e5e7eb' },
    { name: '--secondary-text', value: '#9ca3af' },
    { name: '--disabled-text', value: '#fafafa' },
    { name: '--hyperlink-text', value: '#0ea5e9' },
    { name: '--danger', value: '#b91c1c' },
    { name: '--danger-hover', value: '#dc2626' },
    { name: '--danger-lighter', value: '#991b1b' },
    { name: '--warning', value: '#d97706' },
    { name: '--warning-hover', value: '#f59e0b' },
    { name: '--warning-lighter', value: '#92400e' },
    { name: '--success', value: '#14532d' },
    { name: '--success-hover', value: '#15803d' },
    { name: '--success-lighter', value: '#166534' },
  ];
}
