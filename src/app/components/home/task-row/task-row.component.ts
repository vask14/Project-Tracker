import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.css']
})
export class TaskRowComponent implements OnInit {
  @Input() taskId;
  @Input() dateInterval;
  @Input() changeDetect;
  @Input() projectId;
  public timesheets;
  public row;
  @Input() total;
  
  constructor(
    private taskService: TasksService,
  ) { }

  ngOnInit() {
    this.taskService.getTimeSheetsByTaskId(this.taskId).subscribe(data => {
      this.timesheets = data
      this.parseShownDate(data);
    });
  }


  parseShownDate(data) {
    // this.total = this.dateInterval.map(({ date, logged_time }) => ({ date, logged_time }));
    this.row = this.dateInterval.map(el => ({...el}))
    data.forEach(el => {
      const foundDateInterval = this.row.find(({ Date: taskDate }) => moment(taskDate).isSame(el.Date, 'day'))
      if (foundDateInterval) {
        el.Date = moment(el.Date);
        Object.assign(foundDateInterval, el);
      }
    });
    this.total = this.total.map(el => { 
      const found = this.row.find(({ Date: taskDate }) => moment(taskDate).isSame(el.Date, 'day'));
      if (found) {
        el.LoggedTime += found.LoggedTime;
      }
      return el;
     });
    // this.total.sort((a, b) => { 
    //   const firstDay = moment(a.date).dayOfYear();
    //   const lastDay = moment(b.date).dayOfYear();
    //   return lastDay - firstDay;
    // });
    console.log(this.total);
  }

  ngOnChanges(changes) {
    if ((changes.changeDetect || {}).currentValue) {
      setTimeout(() => this.parseShownDate(this.timesheets), 0);
    }
  }

}
