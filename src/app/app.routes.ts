import { Routes } from '@angular/router';
import { Home } from './home/home';
import { UserList } from './users/user-list/user-list';
import { NotFound } from './not-found/not-found';
import { UserDetails } from './users/user-details/user-details';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { AdminSettings } from './admin/admin-settings/admin-settings';
import { authGuard } from './guards/auth.gard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'users', component: UserList },
  { path: 'user/:id', component: UserDetails }, //http://localhost:4200/user/123456
  {
    path: 'admin', 
    canActivate: [authGuard],
    component: AdminLayout,// http://localhost:4200/admin avec le router-outlet
    children: [
      { path: '', component: AdminDashboard }, // http://localhost:4200/admin toujours puisque le path est ''
      { path: 'settings', component: AdminSettings }, // http://localhost:4200/admin/settings
    ],
  },
  { path: '**', component: NotFound },
]; // "" revient à dire : http://localhost:4200
