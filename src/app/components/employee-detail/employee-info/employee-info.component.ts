import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  @Input() employee: User;

  constructor(
  ) { }

  ngOnInit() {
  }

}
