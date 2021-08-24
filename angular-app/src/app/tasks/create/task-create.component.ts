import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { TaskCreateModel } from './task-create-model';
import { TaskCreateViewModel } from './task-create-view-model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  public viewModel: TaskCreateViewModel;

  constructor(private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this.setViewModel();
  }

  public cancelClicked(): void {
    this.router.navigate(["../"], {
      relativeTo: this.activatedRoute
    });
  }

  public createTaskClicked(): void {
    var createModel = {
      userId: this.viewModel.detail.userId,
      name: this.viewModel.detail.name,
      notes: this.viewModel.detail.notes,
      reminderDate: this.viewModel.detail.reminderDate
    } as TaskCreateModel;

    this.taskService
      .createTask(createModel)
      .subscribe(taskId => {
        this.router.navigate(["../"], {
          relativeTo: this.activatedRoute
        });
        this.snackBar.open('Task Created', "", {
          duration: 3000
        });
      });
  }

  private setViewModel(): void {
    this.taskService
      .getTaskCreateView()
      .subscribe(viewModel => {
        this.viewModel = viewModel;
      });
  }
}
