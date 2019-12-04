import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-to-team',
  templateUrl: './add-to-team.component.html',
  styleUrls: ['./add-to-team.component.css']
})
export class AddToTeamComponent implements OnInit {
  allUsers: User[];
  users: User[];
  chosenUser: User;
  isSubmitting = false;
  @Input() employeeId: number;
  @Input() chooseUser: any;
  @Input() filters: User[];
  @Input() isEmpty: any;
  constructor(
    private employeeService: EmployeesService
  ) { }

  ngOnInit() {
    this.isSubmitting = true;
    this.employeeService.getEmployees()
    .subscribe(data => {
      this.allUsers = data;
      this.users = data;
      if (this.filters) {
        this.users = this.filterUsers(data);
      }
      if (this.isEmpty) {
        this.isEmpty(this.users.length);
      }
      if (this.employeeId) {
        this.chosenUser = this.allUsers.filter((user) => user.Id === this.employeeId)[0];
      } else if (this.users.length) {
        this.chosenUser = this.users[0];
        this.chooseUser(this.chosenUser.Id);
      }
      this.isSubmitting = false;
    });
  }

  filterUsers(data) {
    return data.filter((user) => {
      return this.filters.findIndex(filter => filter.Id === user.Id) === -1;
    });
  }

  updateUser(id) {
    this.chooseUser(id);
  }

  ngOnChanges(changes: any) {
    if (changes.filters && this.allUsers && this.allUsers.length) {
      this.users = this.filterUsers(this.allUsers);
      if (this.isEmpty) {
        this.isEmpty(this.users.length);
      }
      if (this.users.length) {
        this.chosenUser = this.users[0];
        this.chooseUser(this.chosenUser.Id);
      }
    }
  }
}
