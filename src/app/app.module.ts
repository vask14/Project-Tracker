import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { EmployeesAdminPageComponent } from './components/employees-admin-page/employees-admin-page.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AddEmployeeComponent } from './components/employees-admin-page/add-employee/add-employee.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeProjectsComponent } from './components/employee-detail/employee-projects/employee-projects.component';
import { EmployeeTasksComponent } from './components/employee-detail/employee-projects/employee-tasks/employee-tasks.component';
import { EmployeeInfoComponent } from './components/employee-detail/employee-info/employee-info.component';
import { EmployeeSkillsComponent } from './components/employee-detail/employee-skills/employee-skills.component';
import { ProjectsAdminPageComponent } from './components/projects-admin-page/projects-admin-page.component';
import { AddProjectComponent } from './components/projects-admin-page/add-project/add-project.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectInfoComponent } from './components/project-detail/project-info/project-info.component';
import { ProjectTeamComponent } from './components/project-detail/project-team/project-team.component';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddToTeamComponent } from './components/project-detail/project-team/add-to-team/add-to-team.component';
import { TaskPageComponent } from './components/task-page/task-page.component';
import { TaskInfoComponent } from './components/task-page/task-info/task-info.component';
import { AddTaskComponent } from './components/task-page/task-info/add-task/add-task.component';
import { TaskRowComponent } from './components/home/task-row/task-row.component';
import { TasksComponent } from './components/home/projects/tasks/tasks.component';
import { TaskCellComponent } from './components/home/task-row/task-cell/task-cell.component';
import { ProjectsComponent } from './components/home/projects/projects.component';
import { AddHoursComponent } from './components/home/task-row/task-cell/add-hours/add-hours.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProjectsComponent,
    AdminPageComponent,
    EmployeesAdminPageComponent,
    FilterPipe,
    AddEmployeeComponent,
    EmployeeDetailComponent,
    EmployeeProjectsComponent,
    EmployeeTasksComponent,
    EmployeeInfoComponent,
    EmployeeSkillsComponent,
    ProjectsAdminPageComponent,
    AddProjectComponent,
    ProjectDetailComponent,
    ProjectInfoComponent,
    ProjectTeamComponent,
    ProjectDashboardComponent,
    AddToTeamComponent,
    TaskPageComponent,
    TaskInfoComponent,
    AddTaskComponent,
    TaskRowComponent,
    TasksComponent,
    TaskCellComponent,
    AddHoursComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  entryComponents: [AddEmployeeComponent, AddProjectComponent, AddTaskComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
