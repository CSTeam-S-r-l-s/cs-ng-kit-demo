import { Component } from '@angular/core';
import { ButtonComponent } from '@csteam/cs-ng-kit';

@Component({
  selector: 'app-button-page',
  imports: [ButtonComponent],
  template: `
    <h1 class="text-page-title">Button</h1>

    <div class="docs">
      <p>Modulo contenente i widget button da utilizzare nell'applicativo.</p>

      <h2>Esempio</h2>
    </div>

    <div class="demo-section">
      <h3>Tipi di pulsante</h3>
      <div class="demo-row">
        <csui-button buttonType="PRIMARY">Primary</csui-button>
        <csui-button buttonType="SECONDARY">Secondary</csui-button>
        <csui-button buttonType="SUCCESS">Success</csui-button>
        <csui-button buttonType="WARNING">Warning</csui-button>
        <csui-button buttonType="DANGER">Danger</csui-button>
        <csui-button buttonType="LINK">Link</csui-button>
      </div>
    </div>

    <div class="demo-section">
      <h3>Stroke (contornato)</h3>
      <div class="demo-row">
        <csui-button buttonType="PRIMARY" [stroke]="true">Primary</csui-button>
        <csui-button buttonType="SECONDARY" [stroke]="true">Secondary</csui-button>
        <csui-button buttonType="SUCCESS" [stroke]="true">Success</csui-button>
        <csui-button buttonType="WARNING" [stroke]="true">Warning</csui-button>
        <csui-button buttonType="DANGER" [stroke]="true">Danger</csui-button>
      </div>
    </div>

    <div class="demo-section">
      <h3>Disabled</h3>
      <div class="demo-row">
        <csui-button buttonType="PRIMARY" [disabled]="true">Disabled</csui-button>
        <csui-button buttonType="DANGER" [stroke]="true" [disabled]="true">Disabled Stroke</csui-button>
      </div>
    </div>

    <div class="docs">
      <h2>Utilizzo</h2>
      <pre><code>&lt;csui-button type="button" buttonType="PRIMARY" [stroke]="true" [disabled]="false"&gt;
  Contenuto
&lt;/csui-button&gt;</code></pre>

      <h2>Proprietà</h2>
      <ul>
        <li><code>buttonType</code> — tipo di pulsante: <code>PRIMARY</code>, <code>SECONDARY</code>, <code>SUCCESS</code>, <code>WARNING</code>, <code>DANGER</code>, <code>LINK</code></li>
        <li><code>stroke</code> — <code>boolean</code>, visualizza il pulsante contornato anziché pieno</li>
        <li><code>disabled</code> — <code>boolean</code>, abilita o disabilita il pulsante</li>
      </ul>
    </div>
  `
})
export class ButtonPageComponent {}
