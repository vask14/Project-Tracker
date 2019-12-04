import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() projectId;
  @Input() dateInterval;
  @Input() changeDetect;
  @Input() total;
  public tasks;
  constructor(
    private projectService: ProjectsService
  ) { }

  ngOnInit() {
    // this.appService.getTasksByProjectId(this.projectId).subscribe(data => this.tasks = data.filter(({ start_date, end_date }) => {
    //   return moment().isBetween(start_date, end_date)
    // }));
    this.projectService.getTaskByProjectId(this.projectId).subscribe(data => this.tasks = data);
    this.total = this.dateInterval.map(({ Date, LoggedTime }) => ({ Date, LoggedTime }));
  }
  
  ngOnChanges(changes) {
    if ((changes.changeDetect || {}).currentValue) {
      this.total = this.dateInterval.map(({ Date, LoggedTime }) => ({ Date, LoggedTime }));
    }
  }
}