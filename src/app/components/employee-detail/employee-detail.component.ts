import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  public employeeId: number;
  public employee: User;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeId = id;
    this.employeeService.getEmployee(id).subscribe(data => this.employee = data);
  }
}
