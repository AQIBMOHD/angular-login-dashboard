
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';
import { redirectGuard } from './guards/redirect.guard';
import { EmployeeDepartmentComponent } from './employee-department/employee-department.component';


export const routes: Routes = [
  {path:'employee-department',
    component:EmployeeDepartmentComponent,
    canActivate:[authGuard,adminGuard]
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [redirectGuard]
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [authGuard, userGuard]
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard, adminGuard]
  },
  { path: '**', redirectTo: 'login' }
];
