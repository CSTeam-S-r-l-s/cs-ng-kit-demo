import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  ContainerComponent, DropdownComponent, FieldsetComponent,
  LabelGroupComponent, FindByTextComponent, SwitchBoxComponent,
  ClickToEditInputBoxComponent, ClickToEditTextAreaComponent,
  EmailAddressComponent,
  ButtonComponent, InputBoxDirective, FormLabelDirective,
  CheckboxDirective, RadioButtonDirective
} from '@csteam/cs-ng-kit';

@Component({
  selector: 'app-widget-page',
  imports: [
    ReactiveFormsModule,
    ContainerComponent, DropdownComponent, FieldsetComponent,
    LabelGroupComponent, FindByTextComponent, SwitchBoxComponent,
    ClickToEditInputBoxComponent, ClickToEditTextAreaComponent,
    EmailAddressComponent,
    ButtonComponent, InputBoxDirective, FormLabelDirective,
    CheckboxDirective, RadioButtonDirective
  ],
  template: `
    <h1 class="text-page-title">Widget</h1>

    <div class="docs">
      <p>Modulo contenente i widget generici: componenti riutilizzabili senza dipendenze applicative.</p>
    </div>

    <!-- Container -->
    <div class="demo-section">
      <h3>Container</h3>
      <p class="text-muted" style="font-size:0.875rem; margin-bottom:0.5rem;">Un div con contorno arrotondato.</p>
      <csui-container style="display:flex; padding:1rem;">
        Contenuto del container
      </csui-container>
    </div>

    <!-- Fieldset -->
    <div class="demo-section">
      <h3>Fieldset</h3>
      <csui-fieldset legend="Dati personali" style="width:400px">
        <div style="padding:0.75rem;">
          <csui-label-group>
            <label formlabel label>Nome:</label>
            <input inputbox="text" [formControl]="nameCtrl" field />
          </csui-label-group>
        </div>
      </csui-fieldset>
    </div>

    <!-- Label Group + Input directives -->
    <div class="demo-section">
      <h3>Label Group &amp; Direttive Input</h3>
      <div style="display:flex; flex-wrap:wrap; gap:1rem;">
        <csui-label-group style="width:200px">
          <label formlabel label>Testo:</label>
          <input inputbox="text" [formControl]="nameCtrl" field />
        </csui-label-group>
        <csui-label-group style="width:200px">
          <label formlabel label>Numero:</label>
          <input inputbox="number" [formControl]="numberCtrl" field />
        </csui-label-group>
        <csui-label-group style="width:200px">
          <label formlabel label>Password:</label>
          <input inputbox="password" [formControl]="pwdCtrl" field />
        </csui-label-group>
        <csui-label-group style="width:200px">
          <label formlabel label>Email:</label>
          <input inputbox="email" [formControl]="emailCtrl" field />
        </csui-label-group>
      </div>
    </div>

    <!-- Checkbox & Radio -->
    <div class="demo-section">
      <h3>Checkbox &amp; Radio</h3>
      <div style="display:flex; gap:2rem;">
        <label style="display:flex; align-items:center; gap:0.5rem;">
          <input checkbox type="checkbox" /> Opzione A
        </label>
        <label style="display:flex; align-items:center; gap:0.5rem;">
          <input checkbox type="checkbox" checked /> Opzione B
        </label>
        <label style="display:flex; align-items:center; gap:0.5rem;">
          <input radio type="radio" name="demo" /> Radio 1
        </label>
        <label style="display:flex; align-items:center; gap:0.5rem;">
          <input radio type="radio" name="demo" /> Radio 2
        </label>
      </div>
    </div>

    <!-- Switch Box -->
    <div class="demo-section">
      <h3>Switch Box</h3>
      <div style="display:flex; gap:2rem; align-items:center;">
        <div>
          <p style="font-size:0.8rem; margin-bottom:0.5rem;">Attivo</p>
          <csui-switch-box [value]="true" (valueChange)="onSwitch($event)" />
        </div>
        <div>
          <p style="font-size:0.8rem; margin-bottom:0.5rem;">Disattivo</p>
          <csui-switch-box [value]="false" />
        </div>
      </div>
    </div>

    <!-- Email Address -->
    <div class="demo-section">
      <h3>Email Address</h3>
      <p class="text-muted" style="font-size:0.875rem; margin-bottom:0.5rem;">Digita un indirizzo e premi <strong>Enter</strong> per aggiungerlo. Backspace per rimuovere l'ultimo.</p>
      <csui-email-address
        [addresses]="emailAddresses"
        [suggestions]="emailSuggestions()"
        (textChange)="onEmailSearch($event)"
        (valueChange)="onEmailChange($event)"
        style="width:450px; display:block;" />
      @if (lastEmailAction()) {
        <p class="text-muted" style="font-size:0.8rem; margin-top:0.5rem;">{{ lastEmailAction() }}</p>
      }
    </div>

    <!-- Find by Text -->
    <div class="demo-section">
      <h3>Find by Text</h3>
      <csui-find-by-text placeholder="Cerca per testo contenuto..." (find)="onSearch($event)" style="width:350px; display:block;"></csui-find-by-text>
      @if (searchText()) {
        <p class="text-muted" style="font-size:0.8rem; margin-top:0.5rem;">Cercato: "{{ searchText() }}"</p>
      }
    </div>

    <!-- Dropdown -->
    <div class="demo-section">
      <h3>Dropdown</h3>
      <csui-dropdown direction="bottom-start">
        <ng-container button>
          <csui-button buttonType="PRIMARY">Apri Dropdown</csui-button>
        </ng-container>
        <div class="dropdown-panel" style="padding:1rem; width:200px;" dropdown>
          <p>Contenuto del dropdown</p>
        </div>
      </csui-dropdown>
    </div>

    <!-- Click to Edit -->
    <div class="demo-section">
      <h3>Click to Edit — Input Box</h3>
      <csui-click-to-edit-input-box type="text" [value]="'Clicca per modificare'" (valueChange)="onEditInput($event)"></csui-click-to-edit-input-box>
    </div>

    <div class="demo-section">
      <h3>Click to Edit — Text Area</h3>
      <csui-click-to-edit-text-area [rows]="3" [value]="'Clicca per modificare questo testo più lungo...'" (valueChange)="onEditTextArea($event)"></csui-click-to-edit-text-area>
    </div>

    <!-- Documentation -->
    <div class="docs">
      <h2>Componenti</h2>

      <h3>Container</h3>
      <pre><code>&lt;csui-container class="flex grow p-1"&gt;Contenuto&lt;/csui-container&gt;</code></pre>

      <h3>Fieldset</h3>
      <pre><code>&lt;csui-fieldset legend="Titolo"&gt;Contenuto&lt;/csui-fieldset&gt;</code></pre>

      <h3>Label Group</h3>
      <pre><code>&lt;csui-label-group&gt;
  &lt;label formlabel label&gt;Etichetta:&lt;/label&gt;
  &lt;input inputbox="text" formControlName="campo" field /&gt;
&lt;/csui-label-group&gt;</code></pre>

      <h3>Dropdown</h3>
      <p>Direzioni: <code>top-start</code>, <code>top-end</code>, <code>right-start</code>, <code>right-end</code>,
        <code>bottom-start</code>, <code>bottom-end</code>, <code>left-start</code>, <code>left-end</code>.</p>

      <h3>Switch Box</h3>
      <p>Compatibile con Reactive Forms. Proprietà: <code>value</code>, <code>disabled</code>, <code>readonly</code>.
        Evento: <code>valueChange</code>.</p>

      <h3>Find by Text</h3>
      <p>Proprietà: <code>placeholder</code>. Evento: <code>(find)</code> emesso su INVIO o cancellazione.</p>

      <h3>Click to Edit (Input Box / Text Area)</h3>
      <p>Proprietà: <code>value</code>, <code>readonly</code>, <code>saving</code>.
        Evento: <code>valueChange</code> emesso alla conferma.</p>

      <h3>Email Address</h3>
      <p>Campo per gestire un elenco di indirizzi email visualizzati come chip.
        Supporta suggerimenti tramite overlay.</p>
      <pre><code>&lt;csui-email-address
  [addresses]="destinatari"
  [suggestions]="suggerimenti"
  (textChange)="handleSearchEmail($event)"
  (valueChange)="handleDestinatariChange($event)" /&gt;</code></pre>
      <p>Proprietà:</p>
      <ul>
        <li><code>addresses</code> — <code>{{ '{' }} nome?, cognome?, email {{ '}' }}[]</code>, elenco degli indirizzi iniziali</li>
        <li><code>suggestions</code> — <code>{{ '{' }} nome?, cognome?, email {{ '}' }}[]</code>, suggerimenti mostrati nell'overlay</li>
      </ul>
      <p>Eventi:</p>
      <ul>
        <li><code>textChange</code> — emesso ad ogni modifica del testo digitato, utile per la ricerca dei suggerimenti</li>
        <li><code>valueChange</code> — emesso quando la lista degli indirizzi cambia (aggiunta o rimozione)</li>
      </ul>

      <h2>Direttive</h2>
      <ul>
        <li><code>inputbox</code> — standardizza l'aspetto di un input (<code>text</code>, <code>number</code>, <code>password</code>, <code>email</code>)</li>
        <li><code>formlabel</code> — standardizza l'aspetto delle label</li>
        <li><code>checkbox</code> — stili grafici standard per checkbox</li>
        <li><code>radio</code> — stili grafici standard per radio button</li>
      </ul>
    </div>
  `
})
export class WidgetPageComponent {
  searchText = signal('');
  lastEmailAction = signal('');
  nameCtrl = new FormControl('');
  numberCtrl = new FormControl('');
  pwdCtrl = new FormControl('');
  emailCtrl = new FormControl('');

  emailAddresses = [
    { nome: 'Mario', cognome: 'Rossi', email: 'mario.rossi@example.com' },
  ];

  private allSuggestions = [
    { nome: 'Luigi', cognome: 'Verdi', email: 'luigi.verdi@example.com' },
    { nome: 'Anna', cognome: 'Bianchi', email: 'anna.bianchi@example.com' },
    { nome: 'Paolo', cognome: 'Neri', email: 'paolo.neri@example.com' },
  ];

  emailSuggestions = signal<{ nome?: string; cognome?: string; email: string }[]>([]);

  onEmailSearch(text: string) {
    const q = text.toLowerCase();
    this.emailSuggestions.set(q ? this.allSuggestions.filter(s => s.email.includes(q) || s.cognome.toLowerCase().includes(q)) : []);
  }

  onEmailChange(addresses: { nome?: string; cognome?: string; email: string }[]) {
    this.lastEmailAction.set(`Indirizzi: ${addresses.map(a => a.email).join(', ')}`);
  }

  onSearch(text: string) { this.searchText.set(text); }
  onSwitch(val: boolean) { console.log('Switch:', val); }
  onEditInput(val: string) { console.log('Edit input:', val); }
  onEditTextArea(val: string) { console.log('Edit textarea:', val); }
}
