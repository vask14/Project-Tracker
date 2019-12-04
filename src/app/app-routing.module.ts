import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { EmployeesAdminPageComponent } from './components/employees-admin-page/employees-admin-page.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { ProjectsAdminPageComponent } from './components/projects-admin-page/projects-admin-page.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { TaskPageComponent } from './components/task-page/task-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard] },
  { path: 'admin/employees', component: EmployeesAdminPageComponent, canActivate: [AuthGuard]},
  { path: 'admin/projects', component: ProjectsAdminPageComponent, canActivate: [AuthGuard] },
  { path: 'employee/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard] },
  { path: 'project/:id', component: ProjectDetailComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:id', component: ProjectDashboardComponent, canActivate: [AuthGuard] },
  { path: 'task/:id', component: TaskPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
