import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Skill } from '../models/skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(
    public apiService: ApiService
  ) { }

  getEmployeeSkills(id: number): Observable<Skill[]> {
    return this.apiService.get(`/api/skills/${id}`)
  }

  addSkill(skill): Observable<Skill[]> {
    return this.apiService.post('/api/skills', skill);
  }

  updateSkill(skill): Observable<Skill[]> {
    return this.apiService.put('/api/skills', skill);
  }

  deleteSkill({ id, empId }): Observable<any> {
    return this.apiService.delete(`/api/skills?id=${id}&empId=${empId}`);
  }
}
