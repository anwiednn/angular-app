import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../task.service';
import { TaskIndexViewModel } from './task-index-view-model';

@Component({
  selector: 'app-task-index',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.scss']
})
export class TaskIndexComponent implements OnInit {
  public viewModel: TaskIndexViewModel;

  constructor(private taskService: TaskService,
    private snackBar: MatSnackBar) {
  }

  public ngOnInit(): void {
    this.setViewModel();
  }

  public deleteTaskClicked(taskId: number, event: Event): void {
    event.preventDefault();
    this.taskService
      .deleteTask(taskId)
      .subscribe(() => {
        this.setViewModel();
        this.snackBar.open('Task Deleted', "", {
          duration: 3000
        });
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
      });
  }
  
  private setViewModelPage() : void {
    this.taskService
      .getTaskIndexViewPage(this.viewModel.predicate)
      .subscribe(pageModel => {
        this.viewModel.page = pageModel;
      });
  }
}
