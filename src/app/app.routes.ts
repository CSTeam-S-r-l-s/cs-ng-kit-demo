import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },

      // Getting Started
      { path: 'getting-started/installation', loadComponent: () => import('./pages/installation/installation-page.component').then(m => m.InstallationPageComponent) },
      { path: 'getting-started/configuration', loadComponent: () => import('./pages/configuration/configuration-page.component').then(m => m.ConfigurationPageComponent) },

      // Theming
      { path: 'theming/pure-css', loadComponent: () => import('./pages/theming-css/theming-css-page.component').then(m => m.ThemingCssPageComponent) },
      { path: 'theming/tailwind', loadComponent: () => import('./pages/theming-tailwind/theming-tailwind-page.component').then(m => m.ThemingTailwindPageComponent) },

      // Componenti
      { path: 'components/button', loadComponent: () => import('./pages/button/button-page.component').then(m => m.ButtonPageComponent) },
      { path: 'components/select', loadComponent: () => import('./pages/select/select-page.component').then(m => m.SelectPageComponent) },
      { path: 'components/date-time-picker', loadComponent: () => import('./pages/date-time-picker/date-time-picker-page.component').then(m => m.DateTimePickerPageComponent) },
      { path: 'components/table', loadComponent: () => import('./pages/table/table-page.component').then(m => m.TablePageComponent) },
      { path: 'components/widget', loadComponent: () => import('./pages/widget/widget-page.component').then(m => m.WidgetPageComponent) },
      { path: 'components/window', loadComponent: () => import('./pages/window/window-page.component').then(m => m.WindowPageComponent) },
    ]
  }
];
