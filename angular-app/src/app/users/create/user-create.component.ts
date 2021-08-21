import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
      .subscribe(() => {
        this.dialogRef.close(true);    
      });
  }
}
