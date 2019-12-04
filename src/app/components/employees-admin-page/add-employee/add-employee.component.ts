import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateNativeUTCAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import staticData from '../../../shared/staticData';
import { EmployeesService } from 'src/app/services/employees.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter}]
})
export class AddEmployeeComponent implements OnInit {
  @Input() employees: User[];
  myForm: FormGroup;
  ObjectKeys = Object.keys;
  Birthday: Date;
  staticData = staticData;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeesService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.myForm = this.formBuilder.group({
      'First': ['', Validators.required],
      'Last': ['', Validators.required],
      'Email': ['', Validators.email],
      'LocationId': ['1', Validators.required],
      'Address': ['', Validators.required],
      'Skype': ['', Validators.required],
      'Phone': ['', Validators.required],
      'PositionId': ['1', Validators.required],
      'Password': ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  private submitForm() {
    this.employeeService.addEmployee(
      Object.assign(this.myForm.value,
        {
          Birthday: this.Birthday,
          Projects: [],
          ImageUrl: '',
          Roles: [],
          LocationId: Number(this.myForm.value.LocationId),
          PositionId: Number(this.myForm.value.PositionId)
        }))
      .subscribe();
    this.activeModal.close(this.myForm.value);
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
