import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AppEventChangeType } from 'src/app/appEvents/app-event-changed-model';
import { AppEventService } from 'src/app/appEvents/app-event.service';
import { DialogConfirmComponent } from 'src/app/shared/dialog/dialog-confirm.component';
import { TaskService } from '../task.service';
import { TaskIndexViewModel } from './task-index-view-model';

@Component({
  selector: 'app-task-index',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.scss']
})
export class TaskIndexComponent implements OnInit, OnDestroy {
  public viewModel: TaskIndexViewModel;

  private taskChangedSubscription: Subscription;

  constructor(
    private appEventService: AppEventService,
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  public ngOnInit(): void {
    this.setViewModel();
    
    this.taskChangedSubscription = this.appEventService
      .taskChanged
      .subscribe(() => {
        this.setViewModel();
      })
  }

  public ngOnDestroy(): void {
    this.taskChangedSubscription.unsubscribe();
  }

  public deleteTaskClicked(taskId: number, event: Event): void {
    event.preventDefault();

    this.dialog
      .open(DialogConfirmComponent)
      .afterClosed()
      .subscribe((result: Boolean) => {
        if (result) {
          this.taskService
            .deleteTask(taskId)
            .subscribe(() => {
              this.appEventService.taskChanged.next({
                id: taskId,
                type: AppEventChangeType.Delete
              });
              this.snackBar.open('Task Deleted', "", {
                duration: 3000
              });
              this.setViewModel();
            });
        }
      });
  }
  
  public pageChanged(event : PageEvent) : void {
    this.viewModel.predicate.pageNumber = event.pageIndex;
    this.viewModel.predicate.pageSize = event.pageSize;

    this.setViewModelPage();
  }

  public searchChanged(): void {
    this.setViewModelPage();
  }

  private setViewModel() : void {
    this.taskService
      .getTaskIndexView()
      .subscribe(viewModel => {
        this.viewModel = viewModel;
        this.setTaskUserName();
      });
  }
  
  private setViewModelPage() : void {
    this.taskService
      .getTaskIndexViewPage(this.viewModel.predicate)
      .subscribe(pageModel => {
        this.viewModel.page = pageModel;
        this.setTaskUserName();
      });
  }

  private setTaskUserName(): void {
    this.viewModel.page.tasks.forEach(t => {
      this.taskService
        .getTaskUserName(t.id)
        .subscribe(userName => {
          t.userName = userName;
        });
    })
  }
}