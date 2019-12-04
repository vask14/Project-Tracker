import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(
    private apiService: ApiService
  ) { }

  updateTimesheet(timesheet): Observable<any> {
    return this.apiService.put('/api/timesheets', timesheet)
  }

  createTimesheet(timesheet): Observable<any> {
    return this.apiService.post('/api/timesheets', timesheet);
  }
}
