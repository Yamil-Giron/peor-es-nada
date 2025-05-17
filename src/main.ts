import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

// Importa addIcons y el ícono deseado
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Registra el icono arrow-back-outline
addIcons({
  'arrow-back-outline': arrowBackOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
