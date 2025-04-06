import { Routes } from '@angular/router';

// Definición de rutas principales para la aplicación
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',  // Redirige a la página de login al iniciar
    pathMatch: 'full'     // Coincidencia exacta con la URL vacía ('')
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)  // Carga perezosa del componente de login
  },
  {
    path: 'principal',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),    // Carga perezosa de las rutas de la sección principal (tabs)
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage)  // Carga perezosa del componente de registro
  },
];
