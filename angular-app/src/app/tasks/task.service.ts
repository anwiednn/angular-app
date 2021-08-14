import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TaskDetailViewModel } from './detail/task-detail-view-model';
import { map } from "rxjs/operators";

@Injectable()
export class TaskService {

  constructor(private httpClient: HttpClient) {
    this.httpClient.options(
      environment.apiBaseUrl, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  public getTaskDetail(id: number): Observable<TaskDetailViewModel> {
    return this.httpClient
      .get(`${environment.apiBaseUrl}/${id}`)
      //.pipe(map(response => response as TaskDetailViewModel));
  }
}
