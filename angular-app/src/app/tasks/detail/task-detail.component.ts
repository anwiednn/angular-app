import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        this.taskId = params.id;
        this.setViewModel();
      });
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
