import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  SelectComponent, OptionComponent, LabelGroupComponent,
  FormLabelDirective, CodDes
} from '@csteam/cs-ng-kit';

@Component({
  selector: 'app-select-page',
  imports: [ReactiveFormsModule, SelectComponent, OptionComponent, LabelGroupComponent, FormLabelDirective],
  template: `
    <h1 class="text-page-title">Select</h1>

    <div class="docs">
      <p>Modulo che implementa i componenti <code>app-select</code> e <code>app-option</code>,
        un'estensione dei TAG <em>select</em> e <em>option</em> di HTML.</p>
      <h2>Esempi</h2>
    </div>

    <div class="demo-section">
      <h3>Select base</h3>
      <app-label-group style="width:300px">
        <label formlabel label>Lingua:</label>
        <app-select [formControl]="singleCtrl" placeholder="Seleziona la lingua" field>
          @for (lang of languages; track lang.codice) {
            <app-option [value]="lang">{{ lang.descrizione }}</app-option>
          }
        </app-select>
      </app-label-group>
    </div>

    <div class="demo-section">
      <h3>Select con ricerca</h3>
      <app-label-group style="width:300px">
        <label formlabel label>Lingua:</label>
        <app-select [formControl]="searchCtrl" placeholder="Cerca..." [withSearch]="true" field>
          @for (lang of languages; track lang.codice) {
            <app-option [value]="lang">{{ lang.descrizione }}</app-option>
          }
        </app-select>
      </app-label-group>
    </div>

    <div class="demo-section">
      <h3>Select multipla</h3>
      <app-label-group style="width:300px">
        <label formlabel label>Lingue:</label>
        <app-select [formControl]="multiCtrl" placeholder="Seleziona..." [multiple]="true" field>
          @for (lang of languages; track lang.codice) {
            <app-option [value]="lang" [multiple]="true">{{ lang.descrizione }}</app-option>
          }
        </app-select>
      </app-label-group>
    </div>

    <div class="demo-section">
      <h3>Select disabilitata</h3>
      <app-label-group style="width:300px">
        <label formlabel label>Lingua:</label>
        <app-select [formControl]="disabledCtrl" placeholder="Disabilitata" [disabled]="true" field>
          @for (lang of languages; track lang.codice) {
            <app-option [value]="lang">{{ lang.descrizione }}</app-option>
          }
        </app-select>
      </app-label-group>
    </div>

    <div class="docs">
      <h2>Utilizzo</h2>
      <pre><code>&lt;app-select formControlName="codLingua" placeholder="Seleziona la lingua"
  [multiple]="false" [withSearch]="false"&gt;
  &lt;app-option *ngFor="let l of languages" [value]="l" [multiple]="false"&gt;
    {{ '{{' }} l.descrizione {{ '}}' }}
  &lt;/app-option&gt;
&lt;/app-select&gt;</code></pre>

      <h2>Proprietà di app-select</h2>
      <ul>
        <li><code>multiple</code> — selezione multipla</li>
        <li><code>native</code> — usa il select nativo HTML (ignora <code>multiple</code> e <code>withSearch</code>)</li>
        <li><code>placeholder</code> — testo quando il valore è vuoto</li>
        <li><code>disabled</code> — disabilita il controllo</li>
        <li><code>valid</code> — stato di validità</li>
        <li><code>withSearch</code> — mostra campo di ricerca testuale</li>
        <li><code>direction</code> — <code>top</code> o <code>bottom</code> (default)</li>
        <li><code>nullable</code> — consente di impostare il value a <code>null</code> (default <code>true</code>)</li>
      </ul>

      <h2>Proprietà di app-option</h2>
      <ul>
        <li><code>value</code> — oggetto di tipo <code>CodDes</code></li>
        <li><code>visible</code> — rende visibile o no l'opzione</li>
        <li><code>multiple</code> — abilita la modalità a selezione multipla</li>
      </ul>

      <h2>Eventi</h2>
      <ul>
        <li><code>directionChange</code> — emesso ogni volta che si apre il dropdown con direction <code>auto</code></li>
      </ul>
    </div>
  `
})
export class SelectPageComponent {
  languages: CodDes[] = [
    { codice: 'it', descrizione: 'Italiano' },
    { codice: 'en', descrizione: 'English' },
    { codice: 'de', descrizione: 'Deutsch' },
    { codice: 'fr', descrizione: 'Français' },
    { codice: 'es', descrizione: 'Español' },
  ];

  singleCtrl = new FormControl<CodDes[] | null>(null);
  searchCtrl = new FormControl<CodDes[] | null>(null);
  multiCtrl = new FormControl<CodDes[] | null>(null);
  disabledCtrl = new FormControl<CodDes[] | null>(null);
}
