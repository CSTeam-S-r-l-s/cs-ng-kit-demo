import { Component } from '@angular/core';
import { ButtonComponent } from '@csteam/cs-ng-kit';

@Component({
  selector: 'app-button-page',
  imports: [ButtonComponent],
  template: `
    <h1 style="font-size:1.5rem; font-weight:700; margin-bottom:1.5rem;">Button</h1>

    <div class="docs">
      <p>Modulo contenente i widget button da utilizzare nell'applicativo.</p>

      <h2>Esempio</h2>
    </div>

    <div class="demo-section">
      <h3>Tipi di pulsante</h3>
      <div class="demo-row">
        <app-button buttonType="PRIMARY">Primary</app-button>
        <app-button buttonType="SECONDARY">Secondary</app-button>
        <app-button buttonType="SUCCESS">Success</app-button>
        <app-button buttonType="WARNING">Warning</app-button>
        <app-button buttonType="DANGER">Danger</app-button>
        <app-button buttonType="LINK">Link</app-button>
      </div>
    </div>

    <div class="demo-section">
      <h3>Stroke (contornato)</h3>
      <div class="demo-row">
        <app-button buttonType="PRIMARY" [stroke]="true">Primary</app-button>
        <app-button buttonType="SECONDARY" [stroke]="true">Secondary</app-button>
        <app-button buttonType="SUCCESS" [stroke]="true">Success</app-button>
        <app-button buttonType="WARNING" [stroke]="true">Warning</app-button>
        <app-button buttonType="DANGER" [stroke]="true">Danger</app-button>
      </div>
    </div>

    <div class="demo-section">
      <h3>Disabled</h3>
      <div class="demo-row">
        <app-button buttonType="PRIMARY" [disabled]="true">Disabled</app-button>
        <app-button buttonType="DANGER" [stroke]="true" [disabled]="true">Disabled Stroke</app-button>
      </div>
    </div>

    <div class="docs">
      <h2>Utilizzo</h2>
      <pre><code>&lt;app-button type="button" buttonType="PRIMARY" [stroke]="true" [disabled]="false"&gt;
  Contenuto
&lt;/app-button&gt;</code></pre>

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
