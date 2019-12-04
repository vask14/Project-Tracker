import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/project';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-projects',
  templateUrl: './employee-projects.component.html',
  styleUrls: ['./employee-projects.component.css']
})
export class EmployeeProjectsComponent implements OnInit {
  public projects: Project[];
  @Input() employeeId: number;
  constructor(
    private employeeService: EmployeesService
  ) { }

  ngOnInit() {
    this.employeeService.getEmployeeProjects(this.employeeId)
      .subscribe(projects => this.projects = projects);
  }

}
