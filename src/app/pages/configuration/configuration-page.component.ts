import { Component } from '@angular/core';

@Component({
  selector: 'app-configuration-page',
  template: `
    <h1 class="text-page-title">Configurazione</h1>

    <div class="docs">
      <h2>Labels / i18n</h2>
      <p>Tutti i testi dei componenti (buttons, placeholders, messages, ecc.) sono forniti di default
        in lingua inglese e possono essere personalizzati.</p>

      <h3>Label statiche</h3>
      <p>Usa <code>provideCsNgKitLabels</code> per sovrascrivere solo le chiavi necessarie:</p>
      <pre><code>import {{ '{' }} provideCsNgKitLabels {{ '}' }} from '&#64;csteam/cs-ng-kit';

export const appConfig: ApplicationConfig = {{ '{' }}
  providers: [
    provideCsNgKitLabels({{ '{' }}
      save: 'Salva',
      cancel: 'Annulla',
      filters: 'Filtri',
      clear: 'Pulisci',
      // solo le chiavi che vuoi sovrascrivere
    {{ '}' }})
  ]
{{ '}' }};</code></pre>

      <h3>Con Transloco (o altra libreria i18n)</h3>
      <p>Per integrare con una libreria di traduzione, usa direttamente il token <code>CS_NG_KIT_LABELS</code>:</p>
      <pre><code>import {{ '{' }} CS_NG_KIT_LABELS, CS_NG_KIT_DEFAULT_LABELS {{ '}' }} from '&#64;csteam/cs-ng-kit';
import {{ '{' }} TranslocoService {{ '}' }} from '&#64;jsverse/transloco';

export const appConfig: ApplicationConfig = {{ '{' }}
  providers: [
    {{ '{' }}
      provide: CS_NG_KIT_LABELS,
      useFactory: (t: TranslocoService) => ({{ '{' }}
        ...CS_NG_KIT_DEFAULT_LABELS,
        save: t.translate('save'),
        cancel: t.translate('cancel'),
      {{ '}' }}),
      deps: [TranslocoService]
    {{ '}' }}
  ]
{{ '}' }};</code></pre>

      <h2>Chiavi disponibili</h2>
      <p>L'interfaccia <code>CsNgKitLabels</code> espone tutte le chiavi personalizzabili, raggruppate per area:</p>

      <h3>Comuni</h3>
      <div class="demo-section">
        <table style="width:100%; font-size:0.85rem; border-collapse:collapse;">
          <tr class="table-border-row">
            <th style="text-align:left; padding:0.4rem 0.5rem;">Chiave</th>
            <th style="text-align:left; padding:0.4rem 0.5rem;">Default</th>
          </tr>
          @for (item of commonLabels; track item.key) {
            <tr class="table-border-row-light">
              <td style="padding:0.3rem 0.5rem;"><code>{{ item.key }}</code></td>
              <td style="padding:0.3rem 0.5rem;">{{ item.value }}</td>
            </tr>
          }
        </table>
      </div>

      <h3>Calendario</h3>
      <p>Giorni della settimana (<code>mon</code>...<code>sun</code>) e mesi (<code>january</code>...<code>december</code>).</p>

      <h3>Tabella</h3>
      <div class="demo-section">
        <table style="width:100%; font-size:0.85rem; border-collapse:collapse;">
          @for (item of tableLabels; track item.key) {
            <tr class="table-border-row-light">
              <td style="padding:0.3rem 0.5rem;"><code>{{ item.key }}</code></td>
              <td style="padding:0.3rem 0.5rem;">{{ item.value }}</td>
            </tr>
          }
        </table>
      </div>

      <h3>File Upload, Avatar, Preview, Stepper</h3>
      <p>Consulta l'interfaccia <code>CsNgKitLabels</code> per l'elenco completo delle chiavi.</p>
    </div>
  `
})
export class ConfigurationPageComponent {
  commonLabels = [
    { key: 'save', value: 'Save' },
    { key: 'cancel', value: 'Cancel' },
    { key: 'clear', value: 'Clear' },
    { key: 'now', value: 'Now' },
    { key: 'ok', value: 'OK' },
    { key: 'apply', value: 'Apply' },
    { key: 'previous', value: 'Previous' },
    { key: 'next', value: 'Next' },
    { key: 'find', value: 'Find' },
    { key: 'remove', value: 'Remove' },
    { key: 'loading', value: 'Loading' },
    { key: 'download', value: 'Download' },
    { key: 'browse', value: 'Browse' },
  ];

  tableLabels = [
    { key: 'filters', value: 'Filters' },
    { key: 'clear_filters', value: 'Clear filters' },
    { key: 'clear_selections', value: 'Clear selections' },
    { key: 'unselected', value: 'Unselected' },
  ];
}
