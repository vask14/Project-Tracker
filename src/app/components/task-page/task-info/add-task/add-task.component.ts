import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeUTCAdapter } from '@ng-bootstrap/ng-bootstrap';
import staticData from '../../../../shared/staticData';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter}]
})
export class AddTaskComponent implements OnInit {
  @Input() employees;
  @Input() task;
  @Input() tasks;
  @Input() project;
  myForm: FormGroup;
  EndDate: Date;
  StartDay: Date;
  staticData = staticData;
  ObjectKeys = Object.keys;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private taskService: TasksService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private submitOnDashboard() {
    this.taskService.addTask(Object.assign(this.myForm.value, {
      EndDate: this.EndDate,
      StartDate: this.StartDay,
      Estimate: Number(this.myForm.value.Estimate),
      StatusId: Number(this.myForm.value.StatusId),
      TypeId: Number(this.myForm.value.TypeId),
      ProjectId: this.project.Id
    })).subscribe()
    this.activeModal.close(this.myForm.value);
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      'Name': ['', Validators.required],
      'TypeId': ['1'],
      'StatusId': ['1'],
      'Estimate': ['', Validators.required],
      'Description': ['', Validators.required],
      'ReporterId': [''],
      'ResponsibleId': ['']
    });
  }

  private submitForm() {
    this.taskService.addTask(Object.assign(this.myForm.value, {
      EndDate: this.EndDate,
      StartDate: this.StartDay,
      Estimate: Number(this.myForm.value.Estimate),
      StatusId: Number(this.myForm.value.StatusId),
      TypeId: Number(this.myForm.value.TypeId),
      ProjectId: this.task.ProjectId
    })).subscribe(data => {
      if (data) {
        this.router.navigate([`/dashboard/${this.task.ProjectId}`])
      }
    });
    this.closeModal()
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
