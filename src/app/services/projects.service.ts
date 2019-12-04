import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Task } from '../models/tasks';
import { Project } from '../models/project';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    public apiService: ApiService
  ) { }

  getProjects(): Observable<Project[]> {
    return this.apiService.get('/api/projects');
  }

  getProject(id: number): Observable<Project> {
    return this.apiService.get(`/api/projects/${id}`);
  }

  addProject(project: Project): Observable<Project> {
    return this.apiService.post('/api/projects', project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.apiService.put('/api/projects', project);
  }

  deleteEmployee(hero: Project | number): Observable<Project> {
    const id = typeof hero === 'number' ? hero : hero.Id;

    return this.apiService.delete(`/api/projects/${id}`).pipe(
      tap(_ => console.log(`deleted project id=${id}`)),
    );
  }

  getTaskByProjectId(id: number): Observable<Task[]> {
    return this.apiService.get(`/api/projects/${id}/tickets`);
  }
}
