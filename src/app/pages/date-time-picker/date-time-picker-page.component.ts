import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  DatePickerComponent, TimePickerComponent, DateTimePickerComponent,
  LabelGroupComponent, FormLabelDirective
} from '@csteam/cs-ng-kit';

@Component({
  selector: 'app-date-time-picker-page',
  imports: [
    ReactiveFormsModule,
    DatePickerComponent, TimePickerComponent, DateTimePickerComponent,
    LabelGroupComponent, FormLabelDirective
  ],
  template: `
    <h1 class="text-page-title">Date &amp; Time Picker</h1>

    <div class="docs">
      <p>Il modulo implementa i componenti <code>app-date-picker</code>, <code>app-time-picker</code>
        e <code>app-date-time-picker</code> per la selezione di data, ora o data/ora.</p>
      <h2>Esempi</h2>
    </div>

    <div class="demo-section">
      <h3>DatePicker</h3>
      <form [formGroup]="form" style="display:flex; flex-wrap:wrap; gap:1rem;">
        <app-label-group style="width:250px">
          <label formlabel label>Data di registrazione:</label>
          <app-date-picker formControlName="date" field></app-date-picker>
        </app-label-group>

        <app-label-group style="width:250px">
          <label formlabel label>Data (readonly):</label>
          <app-date-picker formControlName="dateReadonly" [readonly]="true" field></app-date-picker>
        </app-label-group>
      </form>
    </div>

    <div class="demo-section">
      <h3>TimePicker</h3>
      <form [formGroup]="form" style="display:flex; flex-wrap:wrap; gap:1rem;">
        <app-label-group style="width:200px">
          <label formlabel label>Ora:</label>
          <app-time-picker formControlName="time" format="HH:mm" field></app-time-picker>
        </app-label-group>
      </form>
    </div>

    <div class="demo-section">
      <h3>DateTimePicker</h3>
      <form [formGroup]="form" style="display:flex; flex-wrap:wrap; gap:1rem;">
        <app-label-group style="width:300px">
          <label formlabel label>Data e ora:</label>
          <app-date-time-picker formControlName="dateTime" field></app-date-time-picker>
        </app-label-group>
      </form>
    </div>

    <div class="docs">
      <h2>Utilizzo — DatePicker</h2>
      <pre><code>&lt;app-date-picker formControlName="dataRegistrazione"
  [valid]="..." [readonly]="false"&gt;&lt;/app-date-picker&gt;</code></pre>

      <h3>Proprietà</h3>
      <ul>
        <li><code>value</code> — oggetto <code>Date</code></li>
        <li><code>disabled</code> — disabilita il controllo</li>
        <li><code>readonly</code> — sola lettura</li>
        <li><code>format</code> — formato della data (default: locale del browser)</li>
        <li><code>direction</code> — <code>'auto' | 'top' | 'bottom'</code> (default: <code>auto</code>)</li>
        <li><code>valid</code> — stato di validità</li>
        <li><code>required</code> — campo obbligatorio</li>
        <li><code>showControls</code> — mostra/nasconde i controlli <em>clear</em> e <em>today</em></li>
      </ul>

      <h2>Utilizzo — TimePicker</h2>
      <pre><code>&lt;app-time-picker formControlName="ora" format="HH:mm"&gt;&lt;/app-time-picker&gt;</code></pre>

      <h3>Proprietà</h3>
      <ul>
        <li><code>value</code> — oggetto <code>TimeString</code></li>
        <li><code>disabled</code>, <code>readonly</code>, <code>format</code>, <code>direction</code>, <code>valid</code>, <code>required</code>, <code>showControls</code> — come DatePicker</li>
      </ul>

      <h2>Utilizzo — DateTimePicker</h2>
      <pre><code>&lt;app-date-time-picker formControlName="dataRegistrazione"&gt;&lt;/app-date-time-picker&gt;</code></pre>

      <h3>Proprietà</h3>
      <p>Stesse proprietà di DatePicker e TimePicker combinate.</p>

      <h2>Eventi (comuni)</h2>
      <ul>
        <li><code>directionChange</code> — emesso all'apertura quando direction è <code>auto</code></li>
        <li><code>valueChange</code> — emesso ad ogni cambio di valore</li>
      </ul>
    </div>
  `
})
export class DateTimePickerPageComponent {
  form = new FormGroup({
    date: new FormControl<Date | null>(null),
    dateReadonly: new FormControl<Date | null>(new Date()),
    time: new FormControl(''),
    dateTime: new FormControl<Date | null>(null),
  });
}
