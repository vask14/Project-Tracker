import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/tasks';
import staticData from '../../../shared/staticData';
import { Location } from '@angular/common';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/models/project';
import { NgbDateAdapter, NgbDateNativeUTCAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesService } from 'src/app/services/employees.service';
import { User } from 'src/app/models/user';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter}]
})
export class TaskInfoComponent implements OnInit {
  public task: Task;
  public project: Project;
  public employees: User[];
  public TicketTypes;
  public TicketStatus;
  public SelectedTicketStatus;
  public SelectedTicketType;
  public SelectedReporter;
  public selectedResponsible;
  @Input() taskId;
  editing = false;
  staticData = staticData;

  constructor(
    private taskService: TasksService,
    private projectService: ProjectsService,
    private employeeService: EmployeesService,
    private location: Location,
    private modalService: NgbModal
  ) {
   }


  ngOnInit() {
    this.TicketTypes = Object.keys(staticData.ticketType).map(el => ({ Id: +el, Name: staticData.ticketType[el] }));
    this.TicketStatus =  Object.keys(staticData.ticketStatus).map(el => ({ Id: +el, Name: staticData.ticketStatus[el] }));
    this.getTask();
  }

  openFormModal() {
    const modalRef = this.modalService.open(AddTaskComponent);

    modalRef.componentInstance.employees = this.employees;
    modalRef.componentInstance.task = this.task;

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }


  toggleEdit() {
    this.editing = !this.editing;
  }

  compareFn(a, b) {
    return a && b && a.Id == b.Id;
  }

  cancelEdit() {
    this.editing = false;
  }

  submitEdit(task) {
    const updatedTask = Object.assign(task, 
      {
        TypeId: this.SelectedTicketType.Id,
        ReporterId: this.SelectedReporter.Id,
        StatusId: this.SelectedTicketStatus.Id,
        ResponsibleId: this.selectedResponsible.Id,
        TicketType: this.SelectedTicketType, 
        Status: this.SelectedTicketStatus,
        Reporter: this.SelectedReporter
      }
    );
    this.taskService.updateSkill(updatedTask).subscribe();
  }

  getTask() {
    this.taskService.getTask(this.taskId)
      .subscribe(data => {
        this.task = data;
        this.SelectedTicketType = data.TicketType;
        this.SelectedTicketStatus = data.Status;
        this.SelectedReporter = data.Reporter;
        this.selectedResponsible = data.Responsible;
        this.employeeService.getEmployees().subscribe(data => this.employees = data);
        this.projectService.getProject(this.task.ProjectId)
          .subscribe(project => this.project = project)
      });
  }

  deleteTask(id) {
    this.taskService.deleteTask(id).subscribe(() => this.location.back());
  }

}
