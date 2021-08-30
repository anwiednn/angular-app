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
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { AppEventService } from '../shared/app-event.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    UserCreateComponent,
    UserDetailComponent,
    UserIndexComponent,
    UserEmailAvailableDirectiveDirective
  ],
  entryComponents: [
    UserCreateComponent,
    UserDetailComponent    
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSelectModule,
    RouterModule.forChild([{
        path: "",
        component: UserIndexComponent
    }])
  ],
  providers: [
    AppEventService,
    UserService
  ]
})
export class UserModule { }
