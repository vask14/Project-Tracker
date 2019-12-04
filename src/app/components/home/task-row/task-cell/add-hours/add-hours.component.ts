import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { TimesheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.css']
})
export class AddHoursComponent implements OnInit {
  public closeResult;
  @Input() loggedTime;
  @Input() comment;
  @Input() id;
  @Input() date;
  @Input() ticket;
  constructor(
    private modalService: NgbModal,
    private modalActice: NgbActiveModal,
    private timesheetService: TimesheetService
  ) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  close() {
    if(this.id) {
      this.timesheetService.updateTimesheet({ LoggedTime: this.loggedTime, Comment: this.comment, Id: this.id, Date: moment(this.date).format('YYYY-MM-DD'), TicketId: this.ticket}).subscribe();
    } else {
      this.timesheetService.createTimesheet({ LoggedTime: this.loggedTime, Comment: this.comment, Date: moment(this.date).format('YYYY-MM-DD'), TicketId: this.ticket}).subscribe();
    }
    this.modalActice.close('Modal Closed');
  }
}
