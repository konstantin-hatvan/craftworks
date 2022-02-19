import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Task } from './task';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'api/tasks';

  constructor(
    private http: HttpClient,
  ) { }

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.tasksUrl)
      .pipe(
        map(tasks => tasks.map(task => ({...task, dueDate: new Date(task.dueDate)})).sort((current, next) => current.dueDate.getTime() - next.dueDate.getTime())),
        catchError(this.handleError<Task[]>([])),
      );
  }

  getTask(id: number): Observable<Task> {
    return this.http
      .get<Task>(`${this.tasksUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Task>()),
      );
  }

  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(this.tasksUrl, task, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .pipe(
        catchError(this.handleError<Task>()),
      );
  }

  updateTask(task: Task): Observable<any> {
    return this.http
      .put(this.tasksUrl, task, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .pipe(
        catchError(this.handleError<any>()),
      );
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http
      .delete<Task>(`${this.tasksUrl}/${task.id}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .pipe(
        catchError(this.handleError<Task>()),
      );
  }

  resolveTask(task: Task): Observable<Task> {
    return this.http
      .put<Task>(this.tasksUrl, task, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .pipe(
        catchError(this.handleError<Task>()),
      );
  }

  handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
