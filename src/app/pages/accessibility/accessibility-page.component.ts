import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accessibility-page',
  imports: [RouterLink],
  template: `
    <h1 class="text-page-title">Accessibilità</h1>

    <div class="docs">
      <p>Tutti i componenti di <strong>cs-ng-kit</strong> includono attributi ARIA di default
        per garantire la compatibilità con screen reader e tecnologie assistive.</p>

      <!-- Attributi built-in -->
      <h2>Attributi built-in</h2>
      <p>I seguenti componenti espongono automaticamente ruoli e stati ARIA senza configurazione aggiuntiva:</p>
      <div class="demo-section">
        <table style="width:100%; font-size:0.85rem; border-collapse:collapse;">
          <tr class="table-border-row">
            <th style="text-align:left; padding:0.4rem 0.5rem;">Componente</th>
            <th style="text-align:left; padding:0.4rem 0.5rem;">Attributi ARIA</th>
          </tr>
          @for (item of builtInAria; track item.component) {
            <tr class="table-border-row-light">
              <td style="padding:0.3rem 0.5rem;"><code>{{ item.component }}</code></td>
              <td style="padding:0.3rem 0.5rem;">{{ item.attrs }}</td>
            </tr>
          }
        </table>
      </div>

      <!-- Input ariaLabel -->
      <h2>Input ariaLabel</h2>
      <p>Alcuni componenti accettano un input <code>ariaLabel</code> opzionale per personalizzare
        l'etichetta accessibile. Se non fornito, viene usata una label di default dal sistema i18n.</p>
      <div class="demo-section">
        <table style="width:100%; font-size:0.85rem; border-collapse:collapse;">
          <tr class="table-border-row">
            <th style="text-align:left; padding:0.4rem 0.5rem;">Componente</th>
            <th style="text-align:left; padding:0.4rem 0.5rem;">Selector</th>
          </tr>
          @for (c of ariaLabelComponents; track c.selector) {
            <tr class="table-border-row-light">
              <td style="padding:0.3rem 0.5rem;"><code>{{ c.name }}</code></td>
              <td style="padding:0.3rem 0.5rem;"><code>{{ c.selector }}</code></td>
            </tr>
          }
        </table>
      </div>
      <h3>Pulsante con solo icona</h3>
      <p>Quando un pulsante non ha testo visibile, <code>ariaLabel</code> è fondamentale
        per comunicare l'azione allo screen reader:</p>
      <pre><code>&lt;csui-button buttonType="DANGER" ariaLabel="Elimina riga"&gt;
  &lt;i class="fa-solid fa-trash"&gt;&lt;/i&gt;
&lt;/csui-button&gt;

&lt;csui-button buttonType="PRIMARY" ariaLabel="Modifica profilo"&gt;
  &lt;i class="fa-solid fa-pen"&gt;&lt;/i&gt;
&lt;/csui-button&gt;</code></pre>

      <h3>Form con date picker</h3>
      <pre><code>&lt;csui-label-group&gt;
  &lt;label formlabel label&gt;Data di nascita:&lt;/label&gt;
  &lt;csui-date-picker [formControl]="birthDate" field /&gt;
&lt;/csui-label-group&gt;

&lt;!-- Senza label-group, usa ariaLabel --&gt;
&lt;csui-date-picker [formControl]="birthDate"
  ariaLabel="Data di nascita" /&gt;

&lt;csui-date-range-picker [formControl]="period"
  ariaLabel="Periodo di validità" /&gt;

&lt;csui-date-time-picker [formControl]="appointment"
  ariaLabel="Data e ora appuntamento" /&gt;

&lt;csui-time-picker [formControl]="startTime"
  ariaLabel="Ora di inizio" /&gt;</code></pre>

      <h3>Tabella</h3>
      <pre><code>&lt;csui-simple-table ariaLabel="Elenco ordini cliente"&gt;
  &lt;thead thead&gt;
    &lt;tr&gt;&lt;th&gt;ID&lt;/th&gt;&lt;th&gt;Prodotto&lt;/th&gt;&lt;th&gt;Totale&lt;/th&gt;&lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody tbody&gt;
    &lt;tr&gt;&lt;td&gt;001&lt;/td&gt;&lt;td&gt;Widget A&lt;/td&gt;&lt;td&gt;€ 120&lt;/td&gt;&lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/csui-simple-table&gt;</code></pre>

      <h3>Switch box</h3>
      <pre><code>&lt;csui-switch-box [formControl]="notifications"
  ariaLabel="Attiva notifiche email" /&gt;</code></pre>

      <div class="demo-section" style="border-left:3px solid #3b82f6;">
        <p><strong>Nota:</strong> per i componenti form già associati a un <code>&lt;label&gt;</code> tramite
          <code>csui-label-group</code>, l'attributo <code>ariaLabel</code> non è necessario
          poiché lo screen reader leggerà il testo della label.</p>
      </div>

      <!-- Chiavi i18n per ARIA -->
      <h2>Chiavi i18n per ARIA</h2>
      <p>Le label ARIA di default possono essere personalizzate tramite il sistema i18n della libreria
        (vedi <a routerLink="/getting-started/configuration">Configurazione</a>).</p>
      <div class="demo-section">
        <table style="width:100%; font-size:0.85rem; border-collapse:collapse;">
          <tr class="table-border-row">
            <th style="text-align:left; padding:0.4rem 0.5rem;">Chiave</th>
            <th style="text-align:left; padding:0.4rem 0.5rem;">Default</th>
            <th style="text-align:left; padding:0.4rem 0.5rem;">Usata in</th>
          </tr>
          @for (item of ariaI18nKeys; track item.key) {
            <tr class="table-border-row-light">
              <td style="padding:0.3rem 0.5rem;"><code>{{ item.key }}</code></td>
              <td style="padding:0.3rem 0.5rem;">{{ item.defaultValue }}</td>
              <td style="padding:0.3rem 0.5rem;">{{ item.usedIn }}</td>
            </tr>
          }
        </table>
      </div>
      <p>Esempio di override:</p>
      <pre><code>provideCsNgKitLabels({{ '{' }}
  select_date: 'Seleziona data',
  increase_hours: 'Aumenta ore',
  decrease_hours: 'Diminuisci ore',
  go_back: 'Torna indietro',
{{ '}' }})</code></pre>

      <!-- Navigazione da tastiera -->
      <h2>Navigazione da tastiera</h2>
      <p>I componenti interattivi supportano la navigazione da tastiera:</p>
      <ul>
        <li><strong>Switch box</strong> — <code>Enter</code> e <code>Space</code> per attivare/disattivare</li>
        <li><strong>Date/time picker</strong> — <code>Tab</code> per raggiungere il trigger, <code>Enter</code>/click per aprire</li>
        <li><strong>Calendar</strong> — tutti i pulsanti di navigazione (mese, anno) e le celle giorno sono <code>&lt;button&gt;</code> nativi</li>
        <li><strong>Time spinner</strong> — tutti i pulsanti incremento/decremento sono <code>&lt;button&gt;</code> nativi</li>
        <li><strong>Back button</strong> — <code>&lt;button&gt;</code> nativo con <code>aria-label</code></li>
      </ul>
    </div>
  `
})
export class AccessibilityPageComponent {
  builtInAria = [
    { component: 'csui-date-picker', attrs: 'role="combobox", aria-expanded, aria-haspopup="dialog"' },
    { component: 'csui-date-range-picker', attrs: 'role="combobox", aria-expanded, aria-haspopup="dialog"' },
    { component: 'csui-date-time-picker', attrs: 'role="combobox", aria-expanded, aria-haspopup="dialog"' },
    { component: 'csui-time-picker', attrs: 'role="combobox", aria-expanded, aria-haspopup="dialog"' },
    { component: 'csui-select', attrs: 'role="combobox", aria-expanded, aria-haspopup="listbox"' },
    { component: 'csui-option', attrs: 'role="option", aria-selected' },
    { component: 'csui-switch-box', attrs: 'role="switch", aria-checked, aria-disabled, aria-readonly' },
    { component: 'csui-calendar / csui-calendar-range', attrs: 'role="grid", role="row", role="gridcell", aria-selected' },
    { component: 'csui-progress-bar', attrs: 'role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax' },
    { component: 'csui-toast', attrs: 'aria-live="polite", role="status"' },
    { component: 'csui-toast-message', attrs: 'role dinamico (alert per error/warning, status per gli altri)' },
    { component: 'csui-dropdown', attrs: 'aria-haspopup, aria-expanded' },
    { component: 'csui-window', attrs: 'role="dialog", aria-modal' },
    { component: 'csui-file-uploader / csui-simple-file-uploader', attrs: 'role="region" sulla drop zone' },
    { component: 'csui-time (spinner)', attrs: 'aria-live="polite" sui valori visualizzati' },
  ];

  ariaLabelComponents = [
    { name: 'ButtonComponent', selector: 'csui-button' },
    { name: 'SimpleTableComponent', selector: 'csui-simple-table' },
    { name: 'DatePickerComponent', selector: 'csui-date-picker' },
    { name: 'DateRangePickerComponent', selector: 'csui-date-range-picker' },
    { name: 'DateTimePickerComponent', selector: 'csui-date-time-picker' },
    { name: 'TimePickerComponent', selector: 'csui-time-picker' },
    { name: 'SwitchBoxComponent', selector: 'csui-switch-box' },
  ];

  ariaI18nKeys = [
    { key: 'select_date', defaultValue: 'Select date', usedIn: 'date-picker' },
    { key: 'select_date_range', defaultValue: 'Select date range', usedIn: 'date-range-picker' },
    { key: 'select_date_and_time', defaultValue: 'Select date and time', usedIn: 'date-time-picker' },
    { key: 'select_time', defaultValue: 'Select time', usedIn: 'time-picker' },
    { key: 'increase_hours', defaultValue: 'Increase hours', usedIn: 'time spinner' },
    { key: 'decrease_hours', defaultValue: 'Decrease hours', usedIn: 'time spinner' },
    { key: 'increase_minutes', defaultValue: 'Increase minutes', usedIn: 'time spinner' },
    { key: 'decrease_minutes', defaultValue: 'Decrease minutes', usedIn: 'time spinner' },
    { key: 'increase_seconds', defaultValue: 'Increase seconds', usedIn: 'time spinner' },
    { key: 'decrease_seconds', defaultValue: 'Decrease seconds', usedIn: 'time spinner' },
    { key: 'toggle_meridiem', defaultValue: 'Toggle AM/PM', usedIn: 'time spinner' },
    { key: 'previous_month', defaultValue: 'Previous month', usedIn: 'calendar' },
    { key: 'next_month', defaultValue: 'Next month', usedIn: 'calendar' },
    { key: 'previous_years', defaultValue: 'Previous years', usedIn: 'calendar' },
    { key: 'next_years', defaultValue: 'Next years', usedIn: 'calendar' },
    { key: 'go_back', defaultValue: 'Go back', usedIn: 'back-button' },
    { key: 'add_email', defaultValue: 'Add email address', usedIn: 'email-address' },
    { key: 'drop_zone', defaultValue: 'File drop zone', usedIn: 'file-uploader' },
  ];
}
