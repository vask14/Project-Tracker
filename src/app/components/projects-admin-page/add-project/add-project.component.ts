import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeUTCAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter}]
})
export class AddProjectComponent implements OnInit {
  @Input() projects: Project[];
  myForm: FormGroup;
  StartDate: Date;
  EndDate: Date;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private projectService: ProjectsService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      'Name': [''],
      'Description': [''],
      'CustomerName': [''],
      'StartDate': [''],
      'EndDate': [''],
    });
  }

  private submitForm() {
    this.projectService.addProject(
      Object.assign(this.myForm.value,
        {
          StartDate: this.StartDate,
          EndDate: this.EndDate
        }))
      .subscribe(project => this.projects.push(project))
    this.activeModal.close(this.myForm.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
