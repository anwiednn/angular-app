import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { UserDetailViewModel } from './user-detail-view-model';
import { UserUpdateModel } from './user-update-model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  public viewModel: UserDetailViewModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { userId: number },
    private dialogRef: MatDialogRef<UserDetailComponent>,
    private userService: UserService) { }

  public ngOnInit(): void {
    this.setViewModel();
  }

  public cancelClicked(): void {
    this.dialogRef.close(false);
  }

  public updateUserClicked(): void {
    var updateModel = {
      name: this.viewModel.detail.name,
      email: this.viewModel.detail.email,
      active: this.viewModel.detail.active
    } as UserUpdateModel;

    this.userService
      .updateUser(this.viewModel.id, updateModel)
      .subscribe(() => {
        this.dialogRef.close(true);    
      });
  }

  private setViewModel(): void {
    this.userService
      .getUserDetailView(this.data.userId)
      .subscribe(viewModel => {
        this.viewModel = viewModel;
      });
  }
}