import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from './task.service';
import { TaskCreateComponent } from './create/task-create.component';
import { TaskDetailComponent } from './detail/task-detail.component';
import { TaskIndexComponent } from './index/task-index.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    TaskCreateComponent,
    TaskDetailComponent,
    TaskIndexComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatMomentDateModule,
    RouterModule.forChild([{
        path: "",
        component: TaskIndexComponent,
        // children: [{
        //   path: "create",
        //   component: TaskCreateComponent
        // }, {
        //   path: "detail/:id",
        //   component: TaskDetailComponent
        // }]
    }])
  ],
  providers: [
    TaskService
  ]
})
export class TaskModule { }
