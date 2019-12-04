import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  @Input() projectId: number;
  public project: Project;

  constructor(
    private projectService: ProjectsService
  ) { }

  ngOnInit() {
    this.getProject()
  }

  getProject() {
    this.projectService.getProject(this.projectId)
      .subscribe(project => this.project = project);
  }

}
