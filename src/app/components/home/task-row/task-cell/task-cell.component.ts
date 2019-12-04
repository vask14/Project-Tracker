import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-cell',
  templateUrl: './task-cell.component.html',
  styleUrls: ['./task-cell.component.css']
})
export class TaskCellComponent implements OnInit {
  @Input() loggedTime;
  @Input() comment;
  @Input() id;
  @Input() date;
  @Input() ticket;
  constructor() { }

  ngOnInit() {
  }

}