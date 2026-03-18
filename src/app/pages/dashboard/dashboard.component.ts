import { Component, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonComponent, SelectComponent, OptionComponent,
  DatePickerComponent, TimePickerComponent, SwitchBoxComponent,
  LabelGroupComponent, FindByTextComponent, FieldsetComponent,
  WindowComponent, DialogComponent, InputBoxDirective, FormLabelDirective,
  CodDes
} from '@csteam/cs-ng-kit';

@Component({
  selector: 'app-dashboard',
  imports: [
    ReactiveFormsModule,
    ButtonComponent, SelectComponent, OptionComponent,
    DatePickerComponent, TimePickerComponent, SwitchBoxComponent,
    LabelGroupComponent, FindByTextComponent, FieldsetComponent,
    WindowComponent, DialogComponent, InputBoxDirective, FormLabelDirective
  ],
  template: `
    <h1 style="font-size:1.5rem; font-weight:700; margin-bottom:1.5rem;">Dashboard</h1>
    <p style="color:#64748b; margin-bottom:2rem;">
      Panoramica dei componenti principali di <strong>cs-ng-kit</strong>.
    </p>

    <!-- Buttons -->
    <div class="demo-section">
      <h3>Buttons</h3>
      <div class="demo-row">
        <app-button buttonType="PRIMARY">Primary</app-button>
        <app-button buttonType="SECONDARY">Secondary</app-button>
        <app-button buttonType="SUCCESS">Success</app-button>
        <app-button buttonType="WARNING">Warning</app-button>
        <app-button buttonType="DANGER">Danger</app-button>
        <app-button buttonType="LINK">Link</app-button>
      </div>
      <div class="demo-row">
        <app-button buttonType="PRIMARY" [stroke]="true">Primary Stroke</app-button>
        <app-button buttonType="DANGER" [stroke]="true">Danger Stroke</app-button>
        <app-button buttonType="PRIMARY" [disabled]="true">Disabled</app-button>
      </div>
    </div>

    <!-- Form controls -->
    <div class="demo-section">
      <h3>Form Controls</h3>
      <form [formGroup]="form" style="display:flex; flex-wrap:wrap; gap:1rem;">
        <app-label-group style="width:250px">
          <label formlabel label>Nome:</label>
          <input inputbox="text" formControlName="name" field />
        </app-label-group>

        <app-label-group style="width:250px">
          <label formlabel label>Email:</label>
          <input inputbox="email" formControlName="email" field />
        </app-label-group>

        <app-label-group style="width:200px">
          <label formlabel label>Data:</label>
          <app-date-picker formControlName="date" field></app-date-picker>
        </app-label-group>

        <app-label-group style="width:150px">
          <label formlabel label>Ora:</label>
          <app-time-picker formControlName="time" format="HH:mm" field></app-time-picker>
        </app-label-group>
      </form>
    </div>

    <!-- Select -->
    <div class="demo-section">
      <h3>Select</h3>
      <div style="display:flex; gap:1rem; flex-wrap:wrap;">
        <app-label-group style="width:250px">
          <label formlabel label>Lingua:</label>
          <app-select [formControl]="langControl" placeholder="Seleziona la lingua" field>
            @for (lang of languages; track lang.codice) {
              <app-option [value]="lang">{{ lang.descrizione }}</app-option>
            }
          </app-select>
        </app-label-group>

        <app-label-group style="width:250px">
          <label formlabel label>Con ricerca:</label>
          <app-select [formControl]="searchLangControl" placeholder="Cerca..." [withSearch]="true" field>
            @for (lang of languages; track lang.codice) {
              <app-option [value]="lang">{{ lang.descrizione }}</app-option>
            }
          </app-select>
        </app-label-group>
      </div>
    </div>

    <!-- Switch & misc -->
    <div class="demo-section">
      <h3>Switch, Fieldset, Find by Text</h3>
      <div style="display:flex; gap:2rem; flex-wrap:wrap; align-items:start;">
        <div>
          <p style="font-size:0.875rem; margin-bottom:0.5rem;">Switch Box</p>
          <app-switch-box [value]="false" />
        </div>

        <app-fieldset legend="Dati personali" style="width:300px">
          <p style="padding:0.5rem; color:#64748b; font-size:0.875rem;">Contenuto del fieldset</p>
        </app-fieldset>

        <div style="width:300px">
          <app-find-by-text placeholder="Cerca per testo contenuto..." (find)="onSearch($event)"></app-find-by-text>
          @if (searchText()) {
            <p style="font-size:0.8rem; color:#64748b; margin-top:0.5rem;">Cercato: "{{ searchText() }}"</p>
          }
        </div>
      </div>
    </div>

    <!-- Window & Dialog -->
    <div class="demo-section">
      <h3>Window & Dialog</h3>
      <div class="demo-row">
        <app-button buttonType="PRIMARY" (click)="demoWindow.show()">Apri Window</app-button>
        <app-button buttonType="SECONDARY" (click)="demoDialog.show()">Apri Dialog</app-button>
      </div>

      <app-window [modal]="true" #demoWindow>
        <div title>Finestra di esempio</div>
        <div body>
          <p style="padding:1rem;">Questo è il contenuto della finestra.</p>
        </div>
        <div footer>
          <app-button buttonType="PRIMARY" (click)="demoWindow.hide()">Chiudi</app-button>
        </div>
      </app-window>

      <app-dialog [modal]="true" confirmLabel="Conferma" cancelLabel="Annulla"
        (onConfirm)="demoDialog.hide()" (onCancel)="demoDialog.hide()" #demoDialog>
        <p style="padding:1rem;">Sei sicuro di voler procedere?</p>
      </app-dialog>
    </div>
  `
})
export class DashboardComponent {
  @ViewChild('demoWindow') demoWindow!: WindowComponent;
  @ViewChild('demoDialog') demoDialog!: DialogComponent;

  searchText = signal('');

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    date: new FormControl<Date | null>(null),
    time: new FormControl(''),
  });

  langControl = new FormControl<CodDes[] | null>(null);
  searchLangControl = new FormControl<CodDes[] | null>(null);

  languages: CodDes[] = [
    { codice: 'it', descrizione: 'Italiano' },
    { codice: 'en', descrizione: 'English' },
    { codice: 'de', descrizione: 'Deutsch' },
    { codice: 'fr', descrizione: 'Français' },
    { codice: 'es', descrizione: 'Español' },
  ];

  onSearch(text: string) {
    this.searchText.set(text);
  }
}
