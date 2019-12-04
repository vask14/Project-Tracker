import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/tasks';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-employee-tasks',
  templateUrl: './employee-tasks.component.html',
  styleUrls: ['./employee-tasks.component.css']
})
export class EmployeeTasksComponent implements OnInit {
  public tasks: Task[];
  @Input() projectId: number;
  @Input() employeeId: number;
  constructor(
    private projectsService: ProjectsService
  ) {}

  ngOnInit() {
    this.projectsService.getTaskByProjectId(this.projectId)
      .subscribe(tasks => this.tasks = tasks.filter(task => task.ResponsibleId === Number(this.employeeId)))
  }
}
