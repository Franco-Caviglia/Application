import { Routes } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { GlobalMonitorComponent } from './components/global-monitor/global-monitor.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'monitorGlobal',
    component: GlobalMonitorComponent,
    canActivateChild: [authGuard],
  },
  {
    path: '',
    redirectTo: '/monitorGlobal',
    pathMatch: 'full',
  },
];
