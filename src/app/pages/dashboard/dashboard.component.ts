import { Component, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonComponent,
  CardComponent, CardHeaderComponent,
  CheckboxDirective,
  ClickToEditInputBoxComponent,
  CodDes,
  ContainerComponent,
  DatePickerComponent,
  DialogComponent,
  DropdownComponent,
  EmailAddressComponent,
  FieldsetComponent,
  FormLabelDirective,
  InputBoxDirective,
  LabelGroupComponent,
  OptionComponent,
  Order,
  OrderableDirective,
  RadioButtonDirective,
  SelectComponent,
  SimpleTableComponent,
  StickyColumnDirective,
  SwitchBoxComponent,
  TableFilterBarComponent,
  TableListFilterComponent,
  TableTextFilterComponent,
  TimePickerComponent,
  WindowComponent
} from '@csteam/cs-ng-kit';

interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
  status: 'Attivo' | 'Sospeso' | 'Inattivo';
  registeredAt: string;
  lastLogin: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    ReactiveFormsModule,
    ButtonComponent, SelectComponent, OptionComponent,
    DatePickerComponent, TimePickerComponent, SwitchBoxComponent,
    LabelGroupComponent, FieldsetComponent,
    ContainerComponent, DropdownComponent, ClickToEditInputBoxComponent,
    CardComponent, CardHeaderComponent,
    EmailAddressComponent,
    WindowComponent, DialogComponent,
    SimpleTableComponent, TableFilterBarComponent,
    TableTextFilterComponent, TableListFilterComponent,
    OrderableDirective, StickyColumnDirective,
    InputBoxDirective, FormLabelDirective, CheckboxDirective, RadioButtonDirective
  ],
  template: `
    <h1 class="text-page-title">
      <i class="fa-solid fa-gauge fa-sm"></i> Pannello di Amministrazione
    </h1>

    <!-- KPI Cards -->
    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
      <csui-card>
        <csui-card-header header>
          <span style="display:flex; align-items:center; gap:0.5rem;">
            <i class="fa-solid fa-users"></i> Utenti totali
          </span>
        </csui-card-header>
        <div style="padding:1rem; text-align:center;">
          <span style="font-size:2rem; font-weight:700;">{{ users.length }}</span>
        </div>
      </csui-card>

      <csui-card>
        <csui-card-header header>
          <span style="display:flex; align-items:center; gap:0.5rem;">
            <i class="fa-solid fa-circle-check"></i> Attivi
          </span>
        </csui-card-header>
        <div style="padding:1rem; text-align:center;">
          <span style="font-size:2rem; font-weight:700; color:#16a34a;">{{ activeCount }}</span>
        </div>
      </csui-card>

      <csui-card>
        <csui-card-header header>
          <span style="display:flex; align-items:center; gap:0.5rem;">
            <i class="fa-solid fa-user-plus"></i> Nuovi (30gg)
          </span>
        </csui-card-header>
        <div style="padding:1rem; text-align:center;">
          <span style="font-size:2rem; font-weight:700; color:#2563eb;">{{ recentCount }}</span>
        </div>
      </csui-card>

      <csui-card>
        <csui-card-header header>
          <span style="display:flex; align-items:center; gap:0.5rem;">
            <i class="fa-solid fa-triangle-exclamation"></i> Sospesi
          </span>
        </csui-card-header>
        <div style="padding:1rem; text-align:center;">
          <span style="font-size:2rem; font-weight:700; color:#dc2626;">{{ suspendedCount }}</span>
        </div>
      </csui-card>
    </div>

    <!-- Quick settings -->
    <div style="margin-bottom:1.5rem;">
      <csui-container>
        <div style="display:flex; flex-wrap:wrap; gap:1.5rem; align-items:center; padding:1rem;">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span style="font-size:0.85rem; font-weight:600;">Notifiche email:</span>
            <csui-switch-box [value]="notificationsEnabled()" (valueChange)="notificationsEnabled.set($event)" />
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span style="font-size:0.85rem; font-weight:600;">Registrazione aperta:</span>
            <csui-switch-box [value]="registrationOpen()" (valueChange)="registrationOpen.set($event)" />
          </div>
          <div style="flex:1;"></div>
          <csui-button buttonType="PRIMARY" (click)="openUserForm()">
            <i class="fa-solid fa-plus"></i> Nuovo utente
          </csui-button>
        </div>
      </csui-container>
    </div>

    <!-- Users table -->
    <div class="demo-section">
      <h3><i class="fa-solid fa-table fa-sm"></i> Gestione Utenti</h3>

      <csui-table-filter-bar windowTitle="Filtri avanzati" [clearFiltersButton]="true" style="margin-bottom:0.75rem; display:block;">
        <ng-container visibleFilters>
          <csui-table-text-filter label="Cerca" (find)="onTextFilter($event)"></csui-table-text-filter>
        </ng-container>
        <ng-container windowFilters>
          <csui-table-list-filter label="Ruolo" [elements]="roleElements" (valuechange)="onRoleFilter($event)"></csui-table-list-filter>
          <csui-table-list-filter label="Stato" [elements]="statusElements" (valuechange)="onStatusFilter($event)"></csui-table-list-filter>
        </ng-container>
      </csui-table-filter-bar>

      <csui-simple-table twheight="h-[400px]">
        <tr thead>
          <th orderable="username" orderableGroup="dash" (order)="onOrder($event)"><div>Username</div></th>
          <th orderable="fullName" orderableGroup="dash" (order)="onOrder($event)"><div>Nome completo</div></th>
          <th orderable="email" orderableGroup="dash" (order)="onOrder($event)"><div>Email</div></th>
          <th><div>Ruolo</div></th>
          <th><div>Stato</div></th>
          <th orderable="registeredAt" orderableGroup="dash" (order)="onOrder($event)"><div>Registrato il</div></th>
          <th orderable="lastLogin" orderableGroup="dash" (order)="onOrder($event)"><div>Ultimo accesso</div></th>
          <th sticky="right"><div style="width:80px; text-align:center;">Azioni</div></th>
        </tr>
        @for (user of filteredUsers(); track user.id) {
          <tr tbody>
            <td><div>{{ user.username }}</div></td>
            <td><div>
              <csui-click-to-edit-input-box type="text" [value]="user.fullName" (valueChange)="onRenameUser(user, $event)"></csui-click-to-edit-input-box>
            </div></td>
            <td><div>{{ user.email }}</div></td>
            <td><div>
              <span [style.background]="roleBadgeColor(user.role)"
                style="padding:0.15rem 0.5rem; border-radius:9999px; font-size:0.75rem; color:#fff;">
                {{ user.role }}
              </span>
            </div></td>
            <td><div>
              <span [style.color]="statusColor(user.status)" style="font-weight:600; font-size:0.85rem;">
                ● {{ user.status }}
              </span>
            </div></td>
            <td><div>{{ user.registeredAt }}</div></td>
            <td><div>{{ user.lastLogin }}</div></td>
            <td sticky="right"><div style="width:80px; text-align:center;">
              <csui-dropdown direction="left-start">
                <ng-container button>
                  <csui-button buttonType="LINK">⋯</csui-button>
                </ng-container>
                <div class="dropdown-panel" style="padding:0.25rem 0; width:160px;" dropdown>
                  <button class="dropdown-item" (click)="editUser(user)">
                    <i class="fa-solid fa-pen fa-sm"></i> Modifica
                  </button>
                  <button class="dropdown-item" (click)="confirmDelete(user)">
                    <i class="fa-solid fa-trash fa-sm"></i> Elimina
                  </button>
                </div>
              </csui-dropdown>
            </div></td>
          </tr>
        }
        <div footer>
          <span class="text-muted" style="font-size:0.8rem;">{{ filteredUsers().length }} di {{ users.length }} utenti</span>
        </div>
      </csui-simple-table>
    </div>

    <!-- Invite section -->
    <div class="demo-section">
      <h3><i class="fa-solid fa-envelope fa-sm"></i> Invita utenti via email</h3>
      <p class="text-muted" style="font-size:0.85rem; margin-bottom:0.75rem;">
        Digita un indirizzo e premi <strong>Enter</strong> per aggiungerlo alla lista di inviti.
      </p>
      <div style="display:flex; gap:1rem; flex-wrap:wrap; align-items:end;">
        <csui-email-address
          [addresses]="inviteAddresses"
          [suggestions]="inviteSuggestions()"
          (textChange)="onInviteSearch($event)"
          (valueChange)="onInviteChange($event)"
          style="flex:1; min-width:300px; display:block;" />
        <csui-button buttonType="SUCCESS" [disabled]="inviteAddresses.length === 0">
          <i class="fa-solid fa-paper-plane"></i> Invia inviti
        </csui-button>
      </div>
    </div>

    <!-- User form window -->
    <csui-window [modal]="true" [footerVisible]="true" #userWindow>
      <div title>{{ editingUser ? 'Modifica utente' : 'Nuovo utente' }}</div>
      <div body style="padding:1rem; width:500px; max-width:90vw;">
        <form [formGroup]="userForm" style="display:flex; flex-direction:column; gap:1rem;">
          <csui-fieldset legend="Dati personali">
            <div style="display:flex; flex-wrap:wrap; gap:0.75rem; padding:0.75rem;">
              <csui-label-group style="flex:1; min-width:200px;">
                <label formlabel label>Username:</label>
                <input inputbox="text" formControlName="username" field />
              </csui-label-group>
              <csui-label-group style="flex:1; min-width:200px;">
                <label formlabel label>Nome completo:</label>
                <input inputbox="text" formControlName="fullName" field />
              </csui-label-group>
              <csui-label-group style="flex:1; min-width:200px;">
                <label formlabel label>Email:</label>
                <input inputbox="email" formControlName="email" field />
              </csui-label-group>
              <csui-label-group style="flex:1; min-width:200px;">
                <label formlabel label>Password:</label>
                <input inputbox="password" formControlName="password" field />
              </csui-label-group>
            </div>
          </csui-fieldset>

          <csui-fieldset legend="Ruolo e accesso">
            <div style="display:flex; flex-wrap:wrap; gap:0.75rem; padding:0.75rem; align-items:end;">
              <csui-label-group style="width:200px;">
                <label formlabel label>Ruolo:</label>
                <csui-select formControlName="role" placeholder="Seleziona ruolo" field>
                  @for (r of roleElements; track r.codice) {
                    <csui-option [value]="r">{{ r.descrizione }}</csui-option>
                  }
                </csui-select>
              </csui-label-group>
              <csui-label-group style="width:200px;">
                <label formlabel label>Data registrazione:</label>
                <csui-date-picker formControlName="registeredAt" field></csui-date-picker>
              </csui-label-group>
              <csui-label-group style="width:150px;">
                <label formlabel label>Ora registrazione:</label>
                <csui-time-picker formControlName="registeredTime" format="HH:mm" field></csui-time-picker>
              </csui-label-group>
            </div>
            <div style="display:flex; gap:1.5rem; padding:0 0.75rem 0.75rem; flex-wrap:wrap;">
              <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem;">
                <input radio type="radio" formControlName="status" value="Attivo" /> Attivo
              </label>
              <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem;">
                <input radio type="radio" formControlName="status" value="Sospeso" /> Sospeso
              </label>
              <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem;">
                <input radio type="radio" formControlName="status" value="Inattivo" /> Inattivo
              </label>
            </div>
            <div style="padding:0 0.75rem 0.75rem;">
              <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem;">
                <input checkbox type="checkbox" formControlName="sendWelcome" /> Invia email di benvenuto
              </label>
            </div>
          </csui-fieldset>
        </form>
      </div>
      <div footer style="display:flex; gap:0.5rem; justify-content:flex-end;">
        <csui-button buttonType="SECONDARY" (click)="userWindow.hide()">Annulla</csui-button>
        <csui-button buttonType="PRIMARY" (click)="saveUser()">
          <i class="fa-solid fa-floppy-disk"></i> Salva
        </csui-button>
      </div>
    </csui-window>

    <!-- Delete dialog -->
    <csui-dialog [modal]="true" confirmLabel="Elimina" cancelLabel="Annulla"
      (onConfirm)="deleteUser()" (onCancel)="deleteDialog.hide()" #deleteDialog>
      <p style="padding:1rem;">
        Sei sicuro di voler eliminare l'utente <strong>{{ userToDelete?.username }}</strong>?
        Questa azione è irreversibile.
      </p>
    </csui-dialog>
  `,
  styles: [`
    .dropdown-item {
      display: flex; align-items: center; gap: 0.5rem;
      width: 100%; padding: 0.5rem 1rem; border: none; background: none;
      font-size: 0.85rem; cursor: pointer; text-align: left;
    }
    .dropdown-item:hover { background: #f1f5f9; }
    :host-context(.dark) .dropdown-item:hover { background: #334155; }
  `]
})
export class DashboardComponent {
  @ViewChild('userWindow') userWindow!: WindowComponent;
  @ViewChild('deleteDialog') deleteDialog!: DialogComponent;

  notificationsEnabled = signal(true);
  registrationOpen = signal(true);

  users: User[] = [
    { id: 1, username: 'mario.rossi', fullName: 'Mario Rossi', email: 'mario@example.com', role: 'Admin', status: 'Attivo', registeredAt: '2024-01-15', lastLogin: '2025-06-10' },
    { id: 2, username: 'luigi.verdi', fullName: 'Luigi Verdi', email: 'luigi@example.com', role: 'Editor', status: 'Attivo', registeredAt: '2024-02-20', lastLogin: '2025-06-09' },
    { id: 3, username: 'anna.bianchi', fullName: 'Anna Bianchi', email: 'anna@example.com', role: 'Utente', status: 'Attivo', registeredAt: '2024-03-10', lastLogin: '2025-06-08' },
    { id: 4, username: 'paolo.neri', fullName: 'Paolo Neri', email: 'paolo@example.com', role: 'Utente', status: 'Sospeso', registeredAt: '2024-04-05', lastLogin: '2025-05-20' },
    { id: 5, username: 'sara.gialli', fullName: 'Sara Gialli', email: 'sara@example.com', role: 'Admin', status: 'Attivo', registeredAt: '2024-05-12', lastLogin: '2025-06-10' },
    { id: 6, username: 'marco.blu', fullName: 'Marco Blu', email: 'marco@example.com', role: 'Editor', status: 'Inattivo', registeredAt: '2024-06-18', lastLogin: '2025-03-01' },
    { id: 7, username: 'elena.rosa', fullName: 'Elena Rosa', email: 'elena@example.com', role: 'Utente', status: 'Attivo', registeredAt: '2025-05-22', lastLogin: '2025-06-10' },
    { id: 8, username: 'giorgio.viola', fullName: 'Giorgio Viola', email: 'giorgio@example.com', role: 'Editor', status: 'Attivo', registeredAt: '2025-06-01', lastLogin: '2025-06-09' },
  ];

  get activeCount() { return this.users.filter(u => u.status === 'Attivo').length; }
  get suspendedCount() { return this.users.filter(u => u.status === 'Sospeso').length; }
  get recentCount() { return this.users.filter(u => new Date(u.registeredAt) > new Date(Date.now() - 30 * 86400000)).length; }

  filteredUsers = signal<User[]>(this.users);

  roleElements: CodDes[] = [
    { codice: 'admin', descrizione: 'Admin' },
    { codice: 'editor', descrizione: 'Editor' },
    { codice: 'utente', descrizione: 'Utente' },
  ];

  statusElements: CodDes[] = [
    { codice: 'attivo', descrizione: 'Attivo' },
    { codice: 'sospeso', descrizione: 'Sospeso' },
    { codice: 'inattivo', descrizione: 'Inattivo' },
  ];

  // User form
  editingUser: User | null = null;
  userToDelete: User | null = null;

  userForm = new FormGroup({
    username: new FormControl(''),
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl<CodDes[] | null>(null),
    registeredAt: new FormControl<Date | null>(new Date()),
    registeredTime: new FormControl(''),
    status: new FormControl('Attivo'),
    sendWelcome: new FormControl(true),
  });

  // Invite
  inviteAddresses: { nome?: string; cognome?: string; email: string }[] = [];
  private allInviteSuggestions = [
    { nome: 'Luca', cognome: 'Marini', email: 'luca.marini@example.com' },
    { nome: 'Chiara', cognome: 'Conti', email: 'chiara.conti@example.com' },
  ];
  inviteSuggestions = signal<{ nome?: string; cognome?: string; email: string }[]>([]);

  onInviteSearch(text: string) {
    const q = text.toLowerCase();
    this.inviteSuggestions.set(q ? this.allInviteSuggestions.filter(s => s.email.includes(q) || s.cognome.toLowerCase().includes(q)) : []);
  }

  onInviteChange(addresses: { nome?: string; cognome?: string; email: string }[]) {
    this.inviteAddresses = addresses;
  }

  // Table actions
  onTextFilter(event: { column?: string; value: string }) {
    const q = (event.value || '').toLowerCase();
    this.filteredUsers.set(q ? this.users.filter(u =>
      u.username.includes(q) || u.fullName.toLowerCase().includes(q) || u.email.includes(q)
    ) : this.users);
  }

  onRoleFilter(event: unknown) { console.log('Role filter:', event); }
  onStatusFilter(event: unknown) { console.log('Status filter:', event); }
  onOrder(order: Order) { console.log('Order:', order); }

  onRenameUser(user: User, newName: string) {
    user.fullName = newName;
  }

  // CRUD
  openUserForm(user?: User) {
    this.editingUser = user ?? null;
    if (user) {
      this.userForm.patchValue({
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        password: '',
        status: user.status,
        registeredAt: new Date(user.registeredAt),
      });
    } else {
      this.userForm.reset({ status: 'Attivo', sendWelcome: true, registeredAt: new Date() });
    }
    this.userWindow.show();
  }

  editUser(user: User) { this.openUserForm(user); }

  saveUser() {
    console.log('Save:', this.userForm.value);
    this.userWindow.hide();
  }

  confirmDelete(user: User) {
    this.userToDelete = user;
    this.deleteDialog.show();
  }

  deleteUser() {
    if (this.userToDelete) {
      this.users = this.users.filter(u => u.id !== this.userToDelete!.id);
      this.filteredUsers.set([...this.users]);
      this.userToDelete = null;
    }
    this.deleteDialog.hide();
  }

  // Helpers
  roleBadgeColor(role: string): string {
    return role === 'Admin' ? '#7c3aed' : role === 'Editor' ? '#2563eb' : '#6b7280';
  }

  statusColor(status: string): string {
    return status === 'Attivo' ? '#16a34a' : status === 'Sospeso' ? '#dc2626' : '#94a3b8';
  }
}
