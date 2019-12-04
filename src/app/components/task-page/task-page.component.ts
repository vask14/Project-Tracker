import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {
  public taskId: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskId = id;
  }

}
