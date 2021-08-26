import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppEventChangeType } from '../../shared/app-event-changed-model';
import { AppEventService } from '../../shared/app-event.service';
import { UserService } from '../user.service';
import { UserCreateModel } from './user-create-model';
import { UserCreateViewModel, UserCreateViewModel_DetailModel } from './user-create-view-model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  public viewModel: UserCreateViewModel;

  constructor(
    private appEventService: AppEventService,
    private dialogRef: MatDialogRef<UserCreateComponent>,
    private userService: UserService) { }

  public ngOnInit(): void {
    this.viewModel = new UserCreateViewModel();
    this.viewModel.detail = new UserCreateViewModel_DetailModel()
    this.viewModel.detail.active= true;
  }

  public cancelClicked(): void {
    this.dialogRef.close(false);
  }

  public createUserClicked(): void {
    var createModel = {
      name: this.viewModel.detail.name,
      email: this.viewModel.detail.email,
      active: this.viewModel.detail.active
    } as UserCreateModel;

    this.userService
      .createUser(createModel)
      .subscribe(userId => {
        this.appEventService.userChanged
          .next({
            id: userId,
            type: AppEventChangeType.Create
          });
        this.dialogRef.close(true);    
      });
  }
}
