import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { tap, map } from 'rxjs/operators';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private apiService: ApiService
  ) { }

  getEmployees(): Observable<User[]> {
    return this.apiService.get('/api/employees')
      .pipe(
        tap(_ => console.log('fetched employees'))
      )
  }

  getEmployee(id: number): Observable<User> {
    const url = `/api/employees/${id}`;
    return this.apiService.get(url).pipe(
      tap(_ => `fetched employee id=${id}`)
    )
  }

  deleteEmployee(hero: User | number): Observable<User> {
    const id = typeof hero === 'number' ? hero : hero.Id;

    return this.apiService.delete(`/api/employees/${id}`).pipe(
      tap(_ => console.log(`deleted employee id=${id}`)),
    );
  }

  addEmployee(user: User): Observable<User> {
    return this.apiService.post('/api/employees', user).pipe(
      tap(_ => console.log(`added hero`))
    )
  }

  updateEmployee(user: User): Observable<User> {
    return this.apiService.put('/api/employees', user).pipe(
      tap(_ => console.log(`updated employee with id=${user.Id}`))
    )
  }

  getEmployeeProjects(id: number): Observable<Project[]> {
    return this.apiService.get(`/api/employees/${id}/projects`);
  }
}
