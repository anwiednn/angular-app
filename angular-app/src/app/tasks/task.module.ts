import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './task.service';
import { TaskCreateComponent } from './create/task-create.component';
import { TaskDetailComponent } from './detail/task-detail.component';
import { TaskIndexComponent } from './index/task-index.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TaskCreateComponent,
    TaskDetailComponent,
    TaskIndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
        path: "",
        component: TaskIndexComponent,
        children: [{
          path: "create",
          component: TaskCreateComponent
        }, {
          path: "detail/:id",
          component: TaskDetailComponent
        }]
    }])
  ],
  providers: [
    TaskService
  ]
})
export class TaskModule { }
