import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="layout">
      <header class="mobile-header">
        <button class="hamburger" (click)="sidebarOpen.set(true)" aria-label="Apri menu">
          <i class="fa-solid fa-bars"></i>
        </button>
        <span class="mobile-title">cs-ng-kit</span>
        <button class="dark-toggle" (click)="toggleDark()" [attr.title]="dark() ? 'Light mode' : 'Dark mode'">
          <i [class]="dark() ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
        </button>
      </header>
      @if (sidebarOpen()) {
        <div class="sidebar-overlay" (click)="sidebarOpen.set(false)"></div>
      }
      <aside class="sidebar" [class.open]="sidebarOpen()">
        <div class="sidebar-header">
          <div class="sidebar-title-row">
            <div>
              <h1>cs-ng-kit</h1>
              <span class="version">v21.3.0</span>
            </div>
            <button class="dark-toggle" (click)="toggleDark()" [attr.title]="dark() ? 'Light mode' : 'Dark mode'">
              <i [class]="dark() ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
            </button>
          </div>
        </div>
        <nav>
          <a routerLink="/dashboard" routerLinkActive="active">
            <i class="fa-solid fa-house fa-sm"></i> Dashboard
          </a>

          <!-- Getting Started -->
          <button class="nav-group" (click)="toggle('gettingStarted')">
            <span><i class="fa-solid fa-rocket fa-sm"></i> Getting Started</span>
            <i class="fa-solid fa-chevron-down chevron" [class.open]="sections().gettingStarted"></i>
          </button>
          @if (sections().gettingStarted) {
            <a routerLink="/getting-started/installation" routerLinkActive="active" class="sub">Installazione</a>
            <a routerLink="/getting-started/configuration" routerLinkActive="active" class="sub">Configurazione</a>
            <a routerLink="/getting-started/accessibility" routerLinkActive="active" class="sub">Accessibilità</a>
          }

          <!-- Theming -->
          <button class="nav-group" (click)="toggle('theming')">
            <span><i class="fa-solid fa-palette fa-sm"></i> Theming</span>
            <i class="fa-solid fa-chevron-down chevron" [class.open]="sections().theming"></i>
          </button>
          @if (sections().theming) {
            <a routerLink="/theming/pure-css" routerLinkActive="active" class="sub">Pure CSS</a>
            <a routerLink="/theming/scss" routerLinkActive="active" class="sub">SCSS</a>
            <a routerLink="/theming/tailwind" routerLinkActive="active" class="sub">Tailwind</a>
          }

          <!-- Componenti -->
          <button class="nav-group" (click)="toggle('components')">
            <span><i class="fa-solid fa-cubes fa-sm"></i> Componenti</span>
            <i class="fa-solid fa-chevron-down chevron" [class.open]="sections().components"></i>
          </button>
          @if (sections().components) {
            <a routerLink="/components/button" routerLinkActive="active" class="sub">Button</a>
            <a routerLink="/components/select" routerLinkActive="active" class="sub">Select</a>
            <a routerLink="/components/date-time-picker" routerLinkActive="active" class="sub">Date/Time Picker</a>
            <a routerLink="/components/table" routerLinkActive="active" class="sub">Table</a>
            <a routerLink="/components/widget" routerLinkActive="active" class="sub">Widget</a>
            <a routerLink="/components/window" routerLinkActive="active" class="sub">Window</a>
          }
        </nav>
      </aside>
      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .mobile-header {
      display: none; position: fixed; top: 0; left: 0; right: 0; z-index: 40;
      height: 3rem; background: #1e293b; color: #e2e8f0;
      padding: 0 1rem; align-items: center; justify-content: space-between;
    }
    .hamburger {
      background: none; border: none; color: #e2e8f0; font-size: 1.25rem; cursor: pointer;
      padding: 0.25rem; display: flex; align-items: center;
    }
    .mobile-title { font-weight: 700; font-size: 1rem; }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 49;
    }
    .layout { display: flex; min-height: 100vh; }
    .sidebar {
      width: 250px; background: #1e293b; color: #e2e8f0;
      padding: 1.5rem 0; flex-shrink: 0; position: fixed;
      top: 0; left: 0; bottom: 0; overflow-y: auto;
    }
    .sidebar-header { padding: 0 1.25rem 1.25rem; border-bottom: 1px solid #334155; }
    .sidebar-title-row { display: flex; align-items: center; justify-content: space-between; }
    .sidebar-header h1 { font-size: 1.25rem; font-weight: 700; }
    .version { font-size: 0.75rem; color: #94a3b8; }

    .dark-toggle {
      background: #334155; border: 1px solid #475569; color: #e2e8f0;
      width: 2rem; height: 2rem; border-radius: 6px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.85rem; transition: background 0.15s;
    }
    .dark-toggle:hover { background: #475569; }

    nav { display: flex; flex-direction: column; padding: 0.5rem 0; }
    nav a {
      padding: 0.5rem 1.25rem; color: #cbd5e1; font-size: 0.875rem;
      transition: background 0.15s; display: flex; align-items: center; gap: 0.5rem;
    }
    nav a:hover { background: #334155; }
    nav a.active { background: #334155; color: #fff; border-left: 3px solid #3b82f6; }
    nav a.sub { padding-left: 2.5rem; font-size: 0.8125rem; color: #94a3b8; }
    nav a.sub:hover { color: #e2e8f0; }
    nav a.sub.active { color: #fff; }

    .nav-group {
      display: flex; align-items: center; justify-content: space-between;
      width: 100%; padding: 0.6rem 1.25rem; margin-top: 0.25rem;
      background: none; border: none; color: #e2e8f0; font-size: 0.8125rem;
      font-weight: 600; cursor: pointer; text-transform: uppercase;
      letter-spacing: 0.03em; transition: background 0.15s;
    }
    .nav-group span { display: flex; align-items: center; gap: 0.5rem; }
    .nav-group:hover { background: #334155; }
    .chevron { font-size: 0.6rem; transition: transform 0.2s; color: #64748b; }
    .chevron.open { transform: rotate(180deg); }

    .content { margin-left: 250px; padding: 2rem; flex: 1; min-width: 0; }

    @media (max-width: 768px) {
      .mobile-header { display: flex; }
      .sidebar-overlay { display: block; }
      .sidebar {
        transform: translateX(-100%); transition: transform 0.25s ease;
        z-index: 50;
      }
      .sidebar.open { transform: translateX(0); }
      .content { margin-left: 0; padding: 1rem; padding-top: 4rem; }
    }
    @media (min-width: 769px) and (max-width: 1024px) {
      .sidebar { width: 220px; }
      .content { margin-left: 220px; padding: 1.5rem; }
    }
  `]
})
export class LayoutComponent {
  private document = inject(DOCUMENT);
  private router = inject(Router);

  sections = signal({ gettingStarted: true, theming: false, components: true });
  dark = signal(false);
  sidebarOpen = signal(false);

  constructor() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.sidebarOpen.set(false);
    });
  }

  toggle(key: 'gettingStarted' | 'theming' | 'components') {
    this.sections.update(s => ({ ...s, [key]: !s[key] }));
  }

  toggleDark() {
    this.dark.update(d => !d);
    this.document.documentElement.classList.toggle('dark', this.dark());
  }
}
