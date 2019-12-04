import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';
import staticData from '../../shared/staticData';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { TasksService } from 'src/app/services/tasks.service';
import { Project } from 'src/app/models/project';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskComponent } from '../task-page/task-info/add-task/add-task.component';
import { EmployeesService } from 'src/app/services/employees.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {
  public tasks;
  public project: Project;
  public employees: User[];
  staticData = staticData;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectsService,
    private taskService: TasksService,
    private modalService: NgbModal,
    private employeeService: EmployeesService,
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  openFormModal() {
    const modalRef = this.modalService.open(AddTaskComponent);
    modalRef.componentInstance.tasks = this.tasks;
    modalRef.componentInstance.employees = this.employees;
    modalRef.componentInstance.project = this.project
    modalRef.result.then((result) => {
      console.log(this.tasks);
      this.tasks.find(el => el.id === result.StatusId).tasks.push(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectService.getTaskByProjectId(id).subscribe(tasks => {
      this.tasks = Object.entries(this.staticData.ticketStatus)
        .map(el1 => (
          { 
            title: el1[1], 
            tasks: tasks.filter(el => el.StatusId === +el1[0]),
            name: `task-${el1[0]}`, 
            id: +el1[0]}
        ))
    });
    this.projectService.getProject(id).subscribe(data => this.project = data);
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
  }


  get getTaskIds(): string[] {
    console.log(this.tasks);
    return this.tasks.map(task => task.name);
  }

  drop(event: CdkDragDrop<string[]>, task) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    const updateTask = Object.assign(event.container.data[event.currentIndex], { StatusId: task.id });
    this.taskService.updateSkill(updateTask).subscribe();
  }
}
