import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public projects;
  public dateInterval;
  public firstDay: any;
  public changeDetect = 0;
  public total;

  constructor(
    private projectService: ProjectsService
  ) { }

  setDateInterval() {
    const arr = [...Array(6)];
    this.dateInterval = arr.map((el, index) => ({Date: moment(this.firstDay).add(index, 'days'), LoggedTime: 0, Comment: '', Ticket: null}))
  }

  nextDay() {
    this.firstDay = moment(this.firstDay).add(1, 'days');
    this.setDateInterval();
    this.changeDetect++;
  }

  prevDay() {
    this.firstDay = moment(this.firstDay).subtract(1, 'day');
    this.setDateInterval();
    this.changeDetect++;
  }

  ngOnInit() {
    this.firstDay = moment().subtract(15, 'days');
    this.setDateInterval();
    this.projectService.getProjects().subscribe(data => this.projects = data);
  }
}