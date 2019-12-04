import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from '../models/tasks';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private apiService: ApiService
  ) { }

  getTask(id: number): Observable<Task> {
    return this.apiService.get(`/api/tasks/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.apiService.post('/api/tasks', task);
  }

  getTimeSheetsByTaskId(id): Observable<any> {
    return this.apiService.get(`/api/tasks/${id}/timesheets`)
  }

  updateSkill(task): Observable<Task> {
    return this.apiService.put('/api/tasks', task);
  }

  deleteTask(taskId: number): Observable<Task> {
    return this.apiService.delete(`/api/tasks/${taskId}`)
  }
}
