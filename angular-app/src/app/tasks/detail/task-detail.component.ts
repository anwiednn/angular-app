import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppEventChangeType } from 'src/app/appEvent/app-event-changed-model';
import { AppEventService } from 'src/app/appEvent/app-event.service';
import { TaskService } from '../task.service';
import { TaskDetailViewModel } from './task-detail-view-model';
import { TaskUpdateModel } from './task-update-model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  public viewModel: TaskDetailViewModel;
  
  private taskId: number;
  private taskChangedSubscription: Subscription;

  constructor(
    private appEventService: AppEventService,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        this.taskId = params.id;
        this.setViewModel();
      });
    
      this.taskChangedSubscription = this.appEventService
        .taskChanged
        .subscribe(model => {
          if (model.id == this.taskId) {     
            if (model.type == AppEventChangeType.Delete) {
              this.router.navigate(["../.."], {
                relativeTo: this.activatedRoute
              });
            } else {
              this.setViewModel();
            }      
          }
        })
    }
  
    public ngOnDestroy(): void {
      this.taskChangedSubscription.unsubscribe();
    }

  public cancelClicked(): void {
    this.router.navigate(["../.."], {
      relativeTo: this.activatedRoute
    });
  }

  public updateTaskClicked(): void {
    var updateModel = {
      userId: this.viewModel.detail.userId,
      name: this.viewModel.detail.name,
      notes: this.viewModel.detail.notes,
      reminderDate: this.viewModel.detail.reminderDate
    } as TaskUpdateModel;

    this.taskService
      .updateTask(this.taskId, updateModel)
      .subscribe(() => {
        this.appEventService.taskChanged.next({
          id: this.taskId,
          type: AppEventChangeType.Create
        });
        this.router.navigate(["../.."], {
          relativeTo: this.activatedRoute
        });
        this.snackBar.open('Task Updated', "", {
          duration: 3000
        });
      });
  }

  private setViewModel(): void {
    this.taskService
      .getTaskDetailView(this.taskId)
      .subscribe(viewModel => {
        this.viewModel = viewModel;
      });
  }
}
