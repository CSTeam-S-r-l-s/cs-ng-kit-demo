import { Component } from '@angular/core';

@Component({
  selector: 'app-installation-page',
  template: `
    <h1 class="text-page-title">Installazione</h1>

    <div class="docs">
      <h2>1. Installa il pacchetto</h2>
      <pre><code>npm install &#64;csteam/cs-ng-kit</code></pre>

      <h2>2. Peer dependencies</h2>
      <p>La libreria richiede le seguenti peer dependencies che devono essere presenti nel progetto:</p>
      <ul>
        <li><code>&#64;angular/core</code> ^21.0.0</li>
        <li><code>&#64;angular/common</code> ^21.0.0</li>
        <li><code>&#64;angular/forms</code> ^21.0.0</li>
        <li><code>&#64;angular/cdk</code> ^21.0.0</li>
        <li><code>&#64;angular/platform-browser</code> ^21.0.0</li>
        <li><code>&#64;angular/router</code> ^21.0.0</li>
        <li><code>rxjs</code> ^7.8.0</li>
      </ul>
      <p>Se non sono già presenti, installale:</p>
      <pre><code>npm install &#64;angular/cdk</code></pre>

      <h2>3. Font Awesome</h2>
      <p>Alcuni componenti utilizzano icone di <strong>Font Awesome 6</strong>. Installa e importa gli stili:</p>
      <pre><code>npm install &#64;fortawesome/fontawesome-free</code></pre>

      <h2>4. Importa gli stili</h2>
      <p>Aggiungi i seguenti import nel file <code>styles.css</code> globale (oppure in <code>angular.json</code>):</p>
      <pre><code>&#64;import "&#64;fortawesome/fontawesome-free/css/all.min.css";
&#64;import "&#64;angular/cdk/overlay-prebuilt.css";
&#64;import "&#64;csteam/cs-ng-kit/styles/cs-ng-kit.css";</code></pre>

      <div class="demo-section" style="border-left:3px solid #3b82f6;">
        <p><strong>Nota:</strong> l'ordine degli import è importante. Il CSS della libreria include un reset
          Tailwind base, quindi va importato per ultimo per evitare conflitti.</p>
      </div>

      <h2>5. Verifica</h2>
      <p>Importa un componente nel tuo modulo o componente standalone per verificare che tutto funzioni:</p>
      <pre><code>import {{ '{' }} ButtonComponent {{ '}' }} from '&#64;csteam/cs-ng-kit';

&#64;Component({{ '{' }}
  imports: [ButtonComponent],
  template: \`&lt;app-button buttonType="PRIMARY"&gt;Ciao!&lt;/app-button&gt;\`
{{ '}' }})
export class MyComponent {{ '{' }}{{ '}' }}</code></pre>
    </div>
  `
})
export class InstallationPageComponent {}
