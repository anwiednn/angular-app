import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { TaskCreateViewModel } from './task-create-view-model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  public viewModel: TaskCreateViewModel;

  constructor(private taskService: TaskService) { }

  public ngOnInit(): void {
    this.setViewModel();
  }

  public createTaskClicked(): void {

  }

  private setViewModel(): void {
    this.taskService
    .getTaskCreateView()
    .subscribe(viewModel => {
      this.viewModel = viewModel;
    });
  }

}
