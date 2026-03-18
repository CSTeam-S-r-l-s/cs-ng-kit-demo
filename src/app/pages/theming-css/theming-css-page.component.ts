import { Component } from '@angular/core';

@Component({
  selector: 'app-theming-css-page',
  template: `
    <h1 style="font-size:1.5rem; font-weight:700; margin-bottom:1.5rem;">Theming — Pure CSS</h1>

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
          <tr style="border-bottom:1px solid #e5e7eb;">
            <th style="text-align:left; padding:0.4rem 0.5rem;">Variabile</th>
            <th style="text-align:left; padding:0.4rem 0.5rem;">Default</th>
            <th style="text-align:left; padding:0.4rem 0.5rem;">Anteprima</th>
          </tr>
          @for (v of lightVars; track v.name) {
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:0.3rem 0.5rem;"><code>{{ v.name }}</code></td>
              <td style="padding:0.3rem 0.5rem;">{{ v.value }}</td>
              <td style="padding:0.3rem 0.5rem;">
                <span class="color-swatch" [style.background]="v.value"></span>
              </td>
            </tr>
          }
        </table>
      </div>

      <h3>Dark theme</h3>
      <p>Per il tema scuro, sovrascrivi le variabili nel selettore <code>.dark</code>:</p>
      <pre><code>.dark {{ '{' }}
  --background: #0f172a;
  --primary: #0f172a;
  --accent: #075985;
  --accent-hover: #0369a1;
  /* ... */
{{ '}' }}</code></pre>

      <div class="demo-section" style="border-left:3px solid #3b82f6;">
        <p><strong>Nota:</strong> il tema dark si attiva aggiungendo la classe <code>dark</code>
          all'elemento <code>&lt;html&gt;</code> o <code>&lt;body&gt;</code>.</p>
      </div>

      <h2>Esempio completo</h2>
      <p>Un tema personalizzato con colori rossi:</p>
      <pre><code>&#64;import "&#64;csteam/cs-ng-kit/styles/cs-ng-kit.css";

:root {{ '{' }}
  --accent: #dc2626;
  --accent-hover: #b91c1c;
  --accent-lighter: #fef2f2;
  --success: #059669;
  --success-hover: #047857;
  --warning: #d97706;
  --warning-hover: #b45309;
{{ '}' }}

.dark {{ '{' }}
  --accent: #991b1b;
  --accent-hover: #dc2626;
{{ '}' }}</code></pre>
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
}
