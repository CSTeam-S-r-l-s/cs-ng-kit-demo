import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideCsNgKitLabels } from '@csteam/cs-ng-kit';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideCsNgKitLabels({
      save: 'Salva',
      cancel: 'Annulla',
      filters: 'Filtri',
    })
  ]
};
