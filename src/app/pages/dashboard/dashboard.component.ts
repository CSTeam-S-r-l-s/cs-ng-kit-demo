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
    <h1 class="text-page-title">Dashboard</h1>
    <p class="text-muted" style="margin-bottom:2rem;">
      Panoramica dei componenti principali di <strong>cs-ng-kit</strong>.
    </p>

    <!-- Buttons -->
    <div class="demo-section">
      <h3>Buttons</h3>
      <div class="demo-row">
        <csui-button buttonType="PRIMARY">Primary</csui-button>
        <csui-button buttonType="SECONDARY">Secondary</csui-button>
        <csui-button buttonType="SUCCESS">Success</csui-button>
        <csui-button buttonType="WARNING">Warning</csui-button>
        <csui-button buttonType="DANGER">Danger</csui-button>
        <csui-button buttonType="LINK">Link</csui-button>
      </div>
      <div class="demo-row">
        <csui-button buttonType="PRIMARY" [stroke]="true">Primary Stroke</csui-button>
        <csui-button buttonType="DANGER" [stroke]="true">Danger Stroke</csui-button>
        <csui-button buttonType="PRIMARY" [disabled]="true">Disabled</csui-button>
      </div>
    </div>

    <!-- Form controls -->
    <div class="demo-section">
      <h3>Form Controls</h3>
      <form [formGroup]="form" style="display:flex; flex-wrap:wrap; gap:1rem;">
        <csui-label-group style="width:250px">
          <label formlabel label>Nome:</label>
          <input inputbox="text" formControlName="name" field />
        </csui-label-group>

        <csui-label-group style="width:250px">
          <label formlabel label>Email:</label>
          <input inputbox="email" formControlName="email" field />
        </csui-label-group>

        <csui-label-group style="width:200px">
          <label formlabel label>Data:</label>
          <csui-date-picker formControlName="date" field></csui-date-picker>
        </csui-label-group>

        <csui-label-group style="width:150px">
          <label formlabel label>Ora:</label>
          <csui-time-picker formControlName="time" format="HH:mm" field></csui-time-picker>
        </csui-label-group>
      </form>
    </div>

    <!-- Select -->
    <div class="demo-section">
      <h3>Select</h3>
      <div style="display:flex; gap:1rem; flex-wrap:wrap;">
        <csui-label-group style="width:250px">
          <label formlabel label>Lingua:</label>
          <csui-select [formControl]="langControl" placeholder="Seleziona la lingua" field>
            @for (lang of languages; track lang.codice) {
              <csui-option [value]="lang">{{ lang.descrizione }}</csui-option>
            }
          </csui-select>
        </csui-label-group>

        <csui-label-group style="width:250px">
          <label formlabel label>Con ricerca:</label>
          <csui-select [formControl]="searchLangControl" placeholder="Cerca..." [withSearch]="true" field>
            @for (lang of languages; track lang.codice) {
              <csui-option [value]="lang">{{ lang.descrizione }}</csui-option>
            }
          </csui-select>
        </csui-label-group>
      </div>
    </div>

    <!-- Switch & misc -->
    <div class="demo-section">
      <h3>Switch, Fieldset, Find by Text</h3>
      <div style="display:flex; gap:2rem; flex-wrap:wrap; align-items:start;">
        <div>
          <p style="font-size:0.875rem; margin-bottom:0.5rem;">Switch Box</p>
          <csui-switch-box [value]="false" />
        </div>

        <csui-fieldset legend="Dati personali" style="width:300px">
          <p class="text-muted" style="padding:0.5rem; font-size:0.875rem;">Contenuto del fieldset</p>
        </csui-fieldset>

        <div style="width:300px">
          <csui-find-by-text placeholder="Cerca per testo contenuto..." (find)="onSearch($event)"></csui-find-by-text>
          @if (searchText()) {
            <p class="text-muted" style="font-size:0.8rem; margin-top:0.5rem;">Cercato: "{{ searchText() }}"</p>
          }
        </div>
      </div>
    </div>

    <!-- Window & Dialog -->
    <div class="demo-section">
      <h3>Window & Dialog</h3>
      <div class="demo-row">
        <csui-button buttonType="PRIMARY" (click)="demoWindow.show()">Apri Window</csui-button>
        <csui-button buttonType="SECONDARY" (click)="demoDialog.show()">Apri Dialog</csui-button>
      </div>

      <csui-window [modal]="true" #demoWindow>
        <div title>Finestra di esempio</div>
        <div body>
          <p style="padding:1rem;">Questo è il contenuto della finestra.</p>
        </div>
        <div footer>
          <csui-button buttonType="PRIMARY" (click)="demoWindow.hide()">Chiudi</csui-button>
        </div>
      </csui-window>

      <csui-dialog [modal]="true" confirmLabel="Conferma" cancelLabel="Annulla"
        (onConfirm)="demoDialog.hide()" (onCancel)="demoDialog.hide()" #demoDialog>
        <p style="padding:1rem;">Sei sicuro di voler procedere?</p>
      </csui-dialog>
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
