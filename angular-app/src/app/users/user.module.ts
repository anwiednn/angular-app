import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UserCreateComponent } from './create/user-create.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserIndexComponent } from './index/user-index.component';

@NgModule({
  declarations: [
    UserCreateComponent,
    UserDetailComponent,
    UserIndexComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
