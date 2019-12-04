import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'API_KEY': environment.api_key
    })
  };

  constructor(
    private http: HttpClient,
  ) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      //TODO: add error message to page using service for messages

      return of(result as T);
    }
  }


  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, this.httpOptions)
      .pipe(
        catchError(this.handleError('', []))
      )
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), this.httpOptions)
      .pipe(
        catchError(this.handleError('', []))
      )
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body), this.httpOptions)
      .pipe(
        catchError(this.handleError('', []))
      )
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, this.httpOptions)
    .pipe(
      catchError(this.handleError('', []))
    )
  }

}
