import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/models/project';
import { NgbModal, NgbDateAdapter, NgbDateNativeUTCAdapter } from '@ng-bootstrap/ng-bootstrap';
import { AddProjectComponent } from './add-project/add-project.component';

@Component({
  selector: 'app-projects-admin-page',
  templateUrl: './projects-admin-page.component.html',
  styleUrls: ['./projects-admin-page.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter}]
})
export class ProjectsAdminPageComponent implements OnInit {
  public projects: Project[];
  public editedProject;
  public searchString: string;
  public enableEdit = false;
  public enableEditIndex = null;

  constructor(
    private projectService: ProjectsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  openFormModal() {
    const modalRef = this.modalService.open(AddProjectComponent);
    
    modalRef.componentInstance.projects = this.projects;
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  enableEditMethod(i, projects) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    this.editedProject = this.projects.filter(project => project.Id === projects).map(el => {
      return {
        Name: el.Name,
        CustomerName: el.CustomerName,
        StartDate: el.StartDate,
        Description: el.Description,
      }
    })[0];
  }

  saveSagment(i) {
    const project = this.projects.find(pro => pro.Id === i);
    this.enableEditIndex = null;
    this.projectService.updateProject(Object.assign(project, this.editedProject, { StartDate: this.editedProject.StartDate }))
      .subscribe();
  }

  cancelEdit() {
    this.enableEditIndex = null;
    this.editedProject = { Name: '', CustomerName: '', Description: '', StartDate: '' };
  }

  deleteProject(project) {
    this.projects = this.projects.filter(h => h !== project)
    this.projectService.deleteEmployee(project).subscribe();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => {
        this.projects = projects
      });
  }

}
