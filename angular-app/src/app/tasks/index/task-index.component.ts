import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TaskService } from '../task.service';
import { TaskIndexViewModel } from './task-index-view-model';

@Component({
  selector: 'app-task-index',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.scss']
})
export class TaskIndexComponent implements OnInit {
  public viewModel: TaskIndexViewModel;
  public showCreateTask: boolean;
  public showEditTask: boolean;

  constructor(private taskService: TaskService) {
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
        console.log(viewModel);
      });
  }
  
  private setViewModelPage() : void {
    this.taskService
      .getTaskIndexViewPage(this.viewModel.predicate)
      .subscribe(pageModel => {
        this.viewModel.page = pageModel;
      });
  }

  public ngOnInit(): void {
    this.setViewModel();
  }

}
