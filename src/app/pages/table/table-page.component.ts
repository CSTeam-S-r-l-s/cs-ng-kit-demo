import { Component } from '@angular/core';
import {
  SimpleTableComponent, TableFilterBarComponent,
  TableTextFilterComponent, TableListFilterComponent,
  OrderableDirective, StickyColumnDirective,
  CodDes, Order
} from '@csteam/cs-ng-kit';

interface User {
  username: string;
  email: string;
  role: string;
  date: string;
}

@Component({
  selector: 'app-table-page',
  imports: [
    SimpleTableComponent, TableFilterBarComponent,
    TableTextFilterComponent, TableListFilterComponent,
    OrderableDirective, StickyColumnDirective
  ],
  template: `
    <h1 class="text-page-title">Table</h1>

    <div class="docs">
      <p>Modulo che contiene i componenti per la visualizzazione delle tabelle con header fisso,
        colonne ordinabili, colonne sticky e barra filtri.</p>
      <h2>Esempio</h2>
    </div>

    <div class="demo-section">
      <h3>Tabella con filtri e ordinamento</h3>

      <app-table-filter-bar windowTitle="Filtri" [clearFiltersButton]="true" style="margin-bottom:0.75rem; display:block;">
        <ng-container visibleFilters>
          <app-table-text-filter label="Username" (find)="onTextFilter($event)"></app-table-text-filter>
        </ng-container>
        <ng-container windowFilters>
          <app-table-list-filter label="Ruolo" [elements]="roleElements" (valuechange)="onRoleFilter($event)"></app-table-list-filter>
        </ng-container>
      </app-table-filter-bar>

      <app-simple-table twheight="h-[350px]">
        <tr thead>
          <th orderable="username" orderableGroup="users" (order)="onOrder($event)"><div>Username</div></th>
          <th orderable="email" orderableGroup="users" (order)="onOrder($event)"><div>Email</div></th>
          <th><div>Ruolo</div></th>
          <th orderable="date" orderableGroup="users" (order)="onOrder($event)"><div>Data</div></th>
          <th sticky="right"><div style="width:60px; text-align:center;">Azioni</div></th>
        </tr>
        @for (user of users; track user.username) {
          <tr tbody>
            <td><div>{{ user.username }}</div></td>
            <td><div>{{ user.email }}</div></td>
            <td><div>{{ user.role }}</div></td>
            <td><div>{{ user.date }}</div></td>
            <td sticky="right"><div style="width:60px; text-align:center;">⋯</div></td>
          </tr>
        }
        <div footer>
          <span class="text-muted" style="font-size:0.8rem;">{{ users.length }} risultati</span>
        </div>
      </app-simple-table>
    </div>

    <div class="docs">
      <h2>Utilizzo</h2>
      <pre><code>&lt;app-simple-table twheight="grow h-[400px] md:h-[500px]"&gt;
  &lt;tr thead&gt;
    &lt;th orderable="username" orderableGroup="login"
      (order)="handleOrderBy($event)"&gt;&lt;div&gt;User&lt;/div&gt;&lt;/th&gt;
    &lt;th sticky="right"&gt;&lt;div&gt;Azioni&lt;/div&gt;&lt;/th&gt;
  &lt;/tr&gt;

  &lt;tr *ngFor="let i of items" tbody&gt;
    &lt;td&gt;&lt;div&gt;{{ '{{' }} i.name {{ '}}' }}&lt;/div&gt;&lt;/td&gt;
    &lt;td sticky="right"&gt;&lt;div&gt;...&lt;/div&gt;&lt;/td&gt;
  &lt;/tr&gt;

  &lt;div footer&gt;Footer&lt;/div&gt;
&lt;/app-simple-table&gt;</code></pre>

      <h2>Struttura</h2>
      <ul>
        <li><strong>Header fisso</strong> — <code>&lt;tr thead&gt;</code> con <code>&lt;th&gt;</code></li>
        <li><strong>Body</strong> — <code>&lt;tr tbody&gt;</code> con <code>&lt;td&gt;</code></li>
        <li><strong>Footer scorrevole</strong> — <code>&lt;tr tfoot&gt;</code></li>
        <li><strong>Footer fisso</strong> — <code>&lt;div footer&gt;</code></li>
      </ul>

      <h2>Colonne sticky</h2>
      <p>Attributo <code>sticky</code> con valore <code>"left"</code> o <code>"right"</code>, da applicare sia al <code>&lt;th&gt;</code> che al <code>&lt;td&gt;</code>.</p>

      <h2>Colonne ordinabili</h2>
      <ul>
        <li><code>orderable</code> — nome della proprietà da ordinare</li>
        <li><code>orderableGroup</code> — nome del gruppo (utile con più tabelle nella stessa pagina)</li>
        <li><code>(order)</code> — evento che emette un oggetto <code>Order</code></li>
      </ul>

      <h2>Filtri</h2>
      <h3>app-table-text-filter</h3>
      <ul>
        <li><code>label</code> — etichetta del filtro</li>
        <li><code>column</code> — nome della colonna</li>
        <li><code>(find)</code> — emette <code>&#123; column, value &#125;</code></li>
      </ul>

      <h3>app-table-list-filter</h3>
      <ul>
        <li><code>elements</code> — lista di <code>CodDes</code></li>
        <li><code>label</code> — etichetta</li>
        <li><code>(valuechange)</code> — emette <code>&#123; column, value: CodDes[] &#125;</code></li>
      </ul>

      <h3>app-table-filter-bar</h3>
      <p>Barra orizzontale con filtri visibili e filtri in finestra (pulsante imbuto).
        Marcatori: <code>visibleFilters</code>, <code>windowFilters</code>, <code>preWindowFilters</code>,
        <code>postWindowFilters</code>, <code>windowFooter</code>.</p>
    </div>
  `
})
export class TablePageComponent {
  users: User[] = [
    { username: 'mario.rossi', email: 'mario@example.com', role: 'Admin', date: '2024-01-15' },
    { username: 'luigi.verdi', email: 'luigi@example.com', role: 'User', date: '2024-02-20' },
    { username: 'anna.bianchi', email: 'anna@example.com', role: 'Editor', date: '2024-03-10' },
    { username: 'paolo.neri', email: 'paolo@example.com', role: 'User', date: '2024-04-05' },
    { username: 'sara.gialli', email: 'sara@example.com', role: 'Admin', date: '2024-05-12' },
    { username: 'marco.blu', email: 'marco@example.com', role: 'Editor', date: '2024-06-18' },
  ];

  roleElements: CodDes[] = [
    { codice: 'admin', descrizione: 'Admin' },
    { codice: 'user', descrizione: 'User' },
    { codice: 'editor', descrizione: 'Editor' },
  ];

  onOrder(order: Order) { console.log('Order:', order); }
  onTextFilter(event: unknown) { console.log('Text filter:', event); }
  onRoleFilter(event: unknown) { console.log('Role filter:', event); }
}
