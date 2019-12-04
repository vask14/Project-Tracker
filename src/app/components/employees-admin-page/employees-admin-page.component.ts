import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import { User } from 'src/app/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

@Component({
  selector: 'app-employees-admin-page',
  templateUrl: './employees-admin-page.component.html',
  styleUrls: ['./employees-admin-page.component.css']
})
export class EmployeesAdminPageComponent implements OnInit {
  public employees: User[];
  public editedEmployee; //TODO add interface for this object
  public searchString: string;
  public enableEdit = false;
  public enableEditIndex = null;
  
  constructor(
    private employeesService: EmployeesService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getEmployees();
  }

  openFormModal() {
    const modalRef = this.modalService.open(AddEmployeeComponent);
    
    modalRef.componentInstance.employees = this.employees;
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  enableEditMethod(i, employeeId) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    this.editedEmployee = this.employees.filter(user => user.Id === employeeId).map(el => {
      return {
        First: el.First,
        Last: el.Last,
        Email: el.Email,
        Skype: el.Skype,
        Phone: el.Phone
      }
    })[0];  
  }

  cancelEdit() {
    this.enableEditIndex = null;
    this.editedEmployee = { First: '', Last: '', Email: '', Skype: '', Phone: '' };
  }

  saveSagment(id) {
    const employee = this.employees.find(pro => pro.Id === id);
    this.enableEditIndex = null;
    this.employeesService.updateEmployee(Object.assign(employee, this.editedEmployee)).subscribe();
  }

  getEmployees(): void {
    this.employeesService.getEmployees()
      .subscribe(employees => {
        this.employees = employees;
      });
  }

  deleteUser(employee): void {
    this.employees = this.employees.filter(h => h !== employee)
    this.employeesService.deleteEmployee(employee).subscribe();
  }
}
