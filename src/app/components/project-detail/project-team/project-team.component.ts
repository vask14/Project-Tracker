import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.css']
})
export class ProjectTeamComponent implements OnInit {
  @Input() projectId: number;
  chosenUserId: number;
  addUser = false;
  disableButton = false;
  public teamMembers: User[];

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.getTeam();
  }

  chooseUser(id) {
    this.chosenUserId = Number(id);
  }

  isEmpty(length) {
    this.disableButton = !length;
  }

  toggleAddUser() {
    if (!this.addUser) {
      this.addUser = true;
      return;
    }
    this.teamService.addTeamMember({ projectId: this.projectId, employeeId: this.chosenUserId })
      .subscribe(data => {
        this.teamMembers = this.teamMembers.concat(data).sort((a, b) => a.PositionId- b.PositionId);
      })
  }

  cancelAddUser() {
    this.addUser = false;
    this.disableButton = false;
  }

  deleteUser(employeeId) {
    const { projectId } = this;
    this.teamService.removeTeamMember({ employeeId, projectId })
      .subscribe(data => {
        this.teamMembers = this.teamMembers.filter(member => member.Id !== data.EmployeeId)
      })
  }

  getTeam() {
    this.teamService.getTeamByProjectId(this.projectId)
      .subscribe(teamMembers => this.teamMembers = teamMembers);
  }

}
