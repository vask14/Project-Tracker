import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  public projectId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectId = id;
  }

}
