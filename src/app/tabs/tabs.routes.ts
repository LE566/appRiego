import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

// Definición de rutas internas del componente de pestañas (Tabs)
export const routes: Routes = [
  {
    path: 'tabs',  // Ruta principal de las pestañas
    component: TabsPage,  // Componente contenedor de las pestañas
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),  // Carga perezosa del componente de la pestaña 1
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),  // Carga perezosa del componente de la pestaña 2
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),  // Carga perezosa del componente de la pestaña 3
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',  // Redirección por defecto a la pestaña 1
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',  // Redirección global por defecto a /tabs/tab1
    pathMatch: 'full',
  },
];
