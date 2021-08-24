import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppEventChangedModel } from './app-event-changed-model';

@Injectable()
export class AppEventService {
  public taskChanged: Subject<AppEventChangedModel>;
  public userChanged: Subject<AppEventChangedModel>;

  constructor() { 
    this.taskChanged = new Subject<AppEventChangedModel>();
    this.userChanged = new Subject<AppEventChangedModel>();
  }
}