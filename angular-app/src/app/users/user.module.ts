import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UserCreateComponent } from './create/user-create.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserIndexComponent } from './index/user-index.component';
import { UserEmailAvailableDirectiveDirective } from './shared/user-email-available-directive.directive';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserCreateComponent,
    UserDetailComponent,
    UserIndexComponent,
    UserEmailAvailableDirectiveDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forChild([{
        path: "",
        component: UserIndexComponent,
        children: [{
          path: "create",
          component: UserCreateComponent
        }, {
          path: "detail/:id",
          component: UserDetailComponent
        }]
    }])
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
