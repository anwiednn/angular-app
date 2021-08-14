import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './task.service';
import { TaskCreateComponent } from './create/task-create.component';
import { TaskDetailComponent } from './detail/task-detail.component';
import { TaskIndexComponent } from './index/task-index.component';



@NgModule({
  declarations: [
    TaskCreateComponent,
    TaskDetailComponent,
    TaskIndexComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TaskService
  ]
})
export class TaskModule { }
