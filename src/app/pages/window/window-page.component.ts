import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  WindowComponent, DialogComponent, ButtonComponent,
  LabelGroupComponent, FormLabelDirective, InputBoxDirective
} from '@csteam/cs-ng-kit';

@Component({
  selector: 'app-window-page',
  imports: [
    ReactiveFormsModule,
    WindowComponent, DialogComponent, ButtonComponent,
    LabelGroupComponent, FormLabelDirective, InputBoxDirective
  ],
  template: `
    <h1 class="text-page-title">Window &amp; Dialog</h1>

    <div class="docs">
      <p>Modulo contenente le finestre: <code>csui-window</code> (finestra generica con barra superiore)
        e <code>csui-dialog</code> (finestra di dialogo con pulsanti conferma/annulla).</p>
      <h2>Esempi</h2>
    </div>

    <!-- Window demo -->
    <div class="demo-section">
      <h3>Window</h3>
      <csui-button buttonType="PRIMARY" (click)="simpleWindow.show()">Apri Window</csui-button>

      <csui-window [modal]="true" [footerVisible]="true" #simpleWindow>
        <div title>Finestra di esempio</div>
        <div body style="padding:1rem;">
          <p>Questo è il contenuto della finestra.</p>
        </div>
        <div footer style="display:flex; gap:0.5rem; justify-content:flex-end;">
          <csui-button buttonType="SECONDARY" (click)="simpleWindow.hide()">Annulla</csui-button>
          <csui-button buttonType="PRIMARY" (click)="simpleWindow.hide()">Salva</csui-button>
        </div>
      </csui-window>
    </div>

    <!-- Window with form -->
    <div class="demo-section">
      <h3>Window con Reactive Form</h3>
      <csui-button buttonType="PRIMARY" (click)="formWindow.show()">Apri Form Window</csui-button>

      <csui-window [modal]="true" [footerVisible]="true" #formWindow>
        <div title>Modifica utente</div>
        <div body style="padding:1rem;">
          <form [formGroup]="form" style="display:flex; flex-direction:column; gap:0.75rem;">
            <csui-label-group>
              <label formlabel label>Nome:</label>
              <input inputbox="text" formControlName="name" field />
            </csui-label-group>
            <csui-label-group>
              <label formlabel label>Email:</label>
              <input inputbox="email" formControlName="email" field />
            </csui-label-group>
          </form>
        </div>
        <div footer style="display:flex; gap:0.5rem; justify-content:flex-end;">
          <csui-button buttonType="SECONDARY" (click)="formWindow.hide()">Annulla</csui-button>
          <csui-button buttonType="PRIMARY" (click)="onSave()">Salva</csui-button>
        </div>
      </csui-window>
    </div>

    <!-- Dialog demo -->
    <div class="demo-section">
      <h3>Dialog</h3>
      <csui-button buttonType="DANGER" (click)="confirmDialog.show()">Elimina elemento</csui-button>

      <csui-dialog [modal]="true" confirmLabel="Conferma" cancelLabel="Annulla"
        (onConfirm)="onConfirm()" (onCancel)="confirmDialog.hide()" #confirmDialog>
        <p style="padding:1rem;">Sei sicuro di voler eliminare questo elemento?</p>
      </csui-dialog>
    </div>

    <!-- Non-modal window -->
    <div class="demo-section">
      <h3>Window non modale</h3>
      <csui-button buttonType="SECONDARY" (click)="nonModalWindow.show()">Apri (non modale)</csui-button>

      <csui-window [modal]="false" [footerVisible]="false" #nonModalWindow>
        <div title>Finestra non modale</div>
        <div body style="padding:1rem;">
          <p>Questa finestra non oscura lo sfondo.</p>
        </div>
      </csui-window>
    </div>

    <div class="docs">
      <h2>Utilizzo — Window</h2>
      <pre><code>&lt;csui-window [modal]="true" [footerVisible]="true" #myWindow&gt;
  &lt;div title&gt;Titolo&lt;/div&gt;
  &lt;div body&gt;Contenuto&lt;/div&gt;
  &lt;div footer&gt;
    &lt;csui-button (click)="myWindow.hide()"&gt;Chiudi&lt;/csui-button&gt;
  &lt;/div&gt;
&lt;/csui-window&gt;</code></pre>

      <h3>Proprietà</h3>
      <ul>
        <li><code>title</code> — titolo da mostrare</li>
        <li><code>modal</code> — attiva/disattiva la visualizzazione modale</li>
        <li><code>footerVisible</code> — mostra/nasconde il footer</li>
      </ul>

      <h3>Eventi</h3>
      <ul>
        <li><code>onShow</code> — scatenato all'apertura</li>
        <li><code>onHide</code> — scatenato alla chiusura</li>
      </ul>

      <h3>Metodi</h3>
      <ul>
        <li><code>show(fireEvent?)</code> — visualizza la finestra</li>
        <li><code>hide(fireEvent?)</code> — nasconde la finestra</li>
      </ul>

      <h2>Utilizzo — Dialog</h2>
      <pre><code>&lt;csui-dialog [modal]="true" confirmLabel="Conferma" cancelLabel="Annulla"
  (onConfirm)="onConfirm()" (onCancel)="onCancel()" #myDialog&gt;
  &lt;p&gt;Sei sicuro?&lt;/p&gt;
&lt;/csui-dialog&gt;</code></pre>

      <h3>Proprietà</h3>
      <ul>
        <li><code>modal</code> — attiva/disattiva la visualizzazione modale</li>
        <li><code>confirmLabel</code> — etichetta del pulsante di conferma</li>
        <li><code>cancelLabel</code> — etichetta del pulsante di chiusura</li>
      </ul>

      <h3>Eventi</h3>
      <ul>
        <li><code>onConfirm</code> — emesso alla conferma</li>
        <li><code>onCancel</code> — emesso alla chiusura</li>
      </ul>

      <h2>Window e Reactive Forms</h2>
      <p>Poiché <code>csui-window</code> è diviso in header, body e footer, il form va gestito così:</p>
      <pre><code>&lt;div body&gt;
  &lt;form [formGroup]="formGroup" (ngSubmit)="handleSubmit()" #formEl="ngForm"&gt;
    ...
  &lt;/form&gt;
&lt;/div&gt;
&lt;div footer&gt;
  &lt;button (click)="formEl.onSubmit($event); $event.stopPropagation()"&gt;Salva&lt;/button&gt;
&lt;/div&gt;</code></pre>
    </div>
  `
})
export class WindowPageComponent {
  @ViewChild('confirmDialog') confirmDialog!: DialogComponent;
  @ViewChild('formWindow') formWindow!: WindowComponent;

  form = new FormGroup({
    name: new FormControl('Mario Rossi'),
    email: new FormControl('mario@example.com'),
  });

  onSave() {
    console.log('Form value:', this.form.value);
    this.formWindow.hide();
  }

  onConfirm() {
    console.log('Confirmed!');
    this.confirmDialog.hide();
  }
}
