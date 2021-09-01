import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from "rxjs/operators";
import { Task } from 'dev-db/task';
import { User } from 'dev-db/user';
import { TaskCreateModel } from './create/task-create-model';
import { TaskCreateViewModel, TaskCreateViewModel_DetailModel, TaskCreateViewModel_UserOptionModel } from './create/task-create-view-model';
import { TaskUpdateModel } from './detail/task-update-model';
import { TaskDetailViewModel, TaskDetailViewModel_DetailModel, TaskDetailViewModel_UserOptionModel } from './detail/task-detail-view-model';
import { TaskIndexViewModel, TaskIndexViewModel_PageModel, TaskIndexViewModel_PageModel_TaskModel, TaskIndexViewModel_PredicateModel } from './index/task-index-view-model';

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
      reminderDate: createModel.reminderDate,
      completed: false     
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

  public getTaskCreateView(): Observable<TaskCreateViewModel> {
    return forkJoin(
      {
        taskDetailView: of(new TaskCreateViewModel_DetailModel()),
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
      })
      .pipe(map(value => {
        return {
          detail: value.taskDetailView,
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
                reminderDate: task.reminderDate,
                completed: task.completed
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
          }))
      })
      .pipe(map(value => {
        return {
          id: id,
          detail: value.taskDetailView,
          userOptions: value.userOptions
        } as TaskDetailViewModel;
      }));
  }

  public getTaskIndexView() : Observable<TaskIndexViewModel> {
    var pagingOptions: string = `_page=1&_limit=9999`;
    var queryOptions: string = `&completed=false`;

    return this.httpClient
      .get<Task[]>(`${environment.apiBaseUrl}/tasks?${pagingOptions}${queryOptions}`, httpOptions)
      .pipe(map(response => {
        return {
          predicate: {
            pageNumber: 0,
            pageSize: 25,
            searchText: null,
            completed: false
          } as TaskIndexViewModel_PredicateModel,
          page: {
            total: response.length,
            tasks: response.map(t => {
              return {
                id: t.id,
                userId: t.userId,
                name: t.name,
                notes: t.notes,
                reminderDate: t.reminderDate,
                completed: t.completed
              } as TaskIndexViewModel_PageModel_TaskModel
            })
          } as TaskIndexViewModel_PageModel
        } as TaskIndexViewModel;
      }));
  }
  
  public getTaskIndexViewPage(predicateModel: TaskIndexViewModel_PredicateModel) : Observable<TaskIndexViewModel_PageModel> {
    var pagingOptions: string = `_page=${predicateModel.pageNumber+1}&_limit=${predicateModel.pageSize}`;
    var queryOptions: string = ``;
    
    if (predicateModel.completed != null) {
      queryOptions += `&completed=${predicateModel.completed}`;
    }

    if (predicateModel.searchText) {
      queryOptions += `&q=${predicateModel.searchText}`;
    }

    return forkJoin({
      totalTasks: this.httpClient
        .get<Task[]>(`${environment.apiBaseUrl}/tasks?_limit=9999${queryOptions}`, httpOptions)
        .pipe(map(response => {
          return response.length
        })),
      tasks:  this.httpClient
        .get<Task[]>(`${environment.apiBaseUrl}/tasks?${pagingOptions}${queryOptions}`, httpOptions)
        .pipe(map(response => {
          return response.map(t => {
                return {
                  id: t.id,
                  userId: t.userId,
                  name: t.name,
                  notes: t.notes,
                  reminderDate: t.reminderDate,
                  completed: t.completed
                } as TaskIndexViewModel_PageModel_TaskModel
              });
        }))
      })
      .pipe(map(value => {
        return {
          total: value.totalTasks,
          tasks: value.tasks
        } as TaskIndexViewModel_PageModel;
      }));
  }

  public getTaskUserName(userId: number): Observable<string> {
    return this.httpClient
      .get<User>(`${environment.apiBaseUrl}/users/${userId}`, httpOptions)
      .pipe(map(response => {
        return response.name;
      }));
  }

  public updateTask(id: number, updateModel: TaskUpdateModel): Observable<number> {
    var updateTask = {
      id: id,
      userId: updateModel.userId,
      name: updateModel.name,
      notes: updateModel.notes,
      reminderDate: updateModel.reminderDate  ,
      completed: updateModel.completed  
    } as Task;

    return this.httpClient
      .put<Task>(`${environment.apiBaseUrl}/tasks/${id}`, updateTask, httpOptions)
      .pipe(map(response => response.id));
  }
}
