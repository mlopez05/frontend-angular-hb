import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./features/auth/registro/registro.component').then(m => m.RegistroComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      { path: '', redirectTo: 'mis-citas', pathMatch: 'full' },
      {
        path: 'mis-citas',
        loadComponent: () => import('./features/citas/mis-citas/mis-citas.component').then(m => m.MisCitasComponent)
      },
      {
        path: 'solicitar-cita',
        loadComponent: () => import('./features/citas/solicitar-cita/solicitar-cita.component').then(m => m.SolicitarCitaComponent)
      },
      {
        path: 'reprogramar-cita/:id',
        loadComponent: () => import('./features/citas/reprogramar-cita/reprogramar-cita.component').then(m => m.ReprogramarCitaComponent)
      },
      {
        path: 'notificaciones',
        loadComponent: () => import('./features/notificaciones/notificaciones.component').then(m => m.NotificacionesComponent)
      },
      {
        path: 'historial',
        loadComponent: () => import('./features/historial/historial.component').then(m => m.HistorialComponent)
      },
      {
        path: 'cambiar-contrasena',
        loadComponent: () => import('./features/auth/cambiar-contrasena/cambiar-contrasena.component').then(m => m.CambiarContrasenaComponent)
      },
      {
        path: 'registrar-medico',
        loadComponent: () => import('./features/medicos/registrar-medico.component').then(m => m.RegistrarMedicoComponent)
      }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
