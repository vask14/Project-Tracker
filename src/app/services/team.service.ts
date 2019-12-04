import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(
    public apiService: ApiService
  ) { }

  getTeamByProjectId(id: number): Observable<User[]> {
    return this.apiService.get(`/api/team/${id}`);
  }

  addTeamMember(teamMember): Observable<User> {
    return this.apiService.post(`/api/team`, teamMember);
  }

  removeTeamMember({ projectId, employeeId }): Observable<any> {
    return this.apiService.delete(`/api/team?model.projectId=${projectId}&model.employeeId=${employeeId}`);
  }
}
