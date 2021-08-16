import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from "rxjs/operators";
import { Task } from 'fake-db/task';
import { User } from 'fake-db/user';
import { TaskCreateModel } from './create/task-create-model';
import { TaskCreateViewModel, TaskCreateViewModel_DetailModel, TaskCreateViewModel_UserOptionModel } from './create/task-create-view-model';
import { TaskUpdateModel } from './detail/task-update-model';
import { TaskDetailViewModel, TaskDetailViewModel_DetailModel, TaskDetailViewModel_UserOptionModel } from './detail/task-detail-view-model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class TaskService {
  constructor(private httpClient: HttpClient) {
  }

  public createTask(createModel: TaskCreateModel) : Observable<number> {
    var createTask = {
      userId: createModel.userId,
      name: createModel.name,
      notes: createModel.notes,
      reminderDate: createModel.reminderDate      
    } as Task;

    return this.httpClient
      .post<Task>(`${environment.apiBaseUrl}/tasks`, createTask, httpOptions)
      .pipe(map(response => response.id));
  }

  public deleteTask(id: number) : Observable<void> {
    return this.httpClient
      .delete<Task>(`${environment.apiBaseUrl}/tasks/${id}`, httpOptions)
      .pipe(map(() => {}));
  }

  public getTaskCreateView(id: number): Observable<TaskCreateViewModel> {
    return forkJoin(
      {
        taskCreateView: of(new TaskCreateViewModel_DetailModel()),
        userOptions: this.httpClient
        .get<User[]>(`${environment.apiBaseUrl}/users`, httpOptions)
        .pipe(map(response => {
          return response.map<TaskCreateViewModel_UserOptionModel>(u => {
            return { 
              id: u.id,
              name: u.name
            } as TaskCreateViewModel_UserOptionModel;
          });
        })),
      }
    ).pipe(map(value => {
      return {
        detail: value.taskCreateView,
        userOptions: value.userOptions
      } as TaskCreateViewModel;
    }));
  }

  public getTaskDetailView(id: number): Observable<TaskDetailViewModel> {
    return forkJoin(
      {
        taskDetailView: this.httpClient
        .get<Task>(`${environment.apiBaseUrl}/tasks/${id}`, httpOptions)
        .pipe(map(task => {
          return {
              userId: task.userId,
              name: task.name,
              notes: task.notes,
              reminderDate: task.reminderDate
            } as TaskDetailViewModel_DetailModel;
        })),
        userOptions: this.httpClient
        .get<User[]>(`${environment.apiBaseUrl}/users`, httpOptions)
        .pipe(map(response => {
          return response.map<TaskDetailViewModel_UserOptionModel>(u => {
            return { 
              id: u.id,
              name: u.name
            } as TaskDetailViewModel_UserOptionModel;
          });
        })),
      }
    ).pipe(map(value => {
      return {
        detail: value.taskDetailView,
        userOptions: value.userOptions
      } as TaskDetailViewModel;
    }));
  }

  public updateTask(id: number, updateModel: TaskUpdateModel) :Observable<number> {
    var updateTask = {
      id: id,
      userId: updateModel.userId,
      name: updateModel.name,
      notes: updateModel.notes,
      reminderDate: updateModel.reminderDate      
    } as Task;

    return this.httpClient
      .put<Task>(`${environment.apiBaseUrl}/tasks/${id}`, updateTask, httpOptions)
      .pipe(map(response => response.id));
  }
}
