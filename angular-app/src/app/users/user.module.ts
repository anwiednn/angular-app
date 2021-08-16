import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { UserCreateComponent } from './create/user-create.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserIndexComponent } from './index/user-index.component';
import { UserEmailAvailableDirectiveDirective } from './shared/user-email-available-directive.directive';

@NgModule({
  declarations: [
    UserCreateComponent,
    UserDetailComponent,
    UserIndexComponent,
    UserEmailAvailableDirectiveDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
