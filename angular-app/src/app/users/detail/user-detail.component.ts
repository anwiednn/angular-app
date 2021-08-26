import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AppEventChangeType } from 'src/app/appEvents/app-event-changed-model';
import { AppEventService } from 'src/app/appEvents/app-event.service';
import { UserService } from '../user.service';
import { UserDetailViewModel } from './user-detail-view-model';
import { UserUpdateModel } from './user-update-model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  public viewModel: UserDetailViewModel;

  private userChangedSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { userId: number },
    private dialogRef: MatDialogRef<UserDetailComponent>,
    private appEventService: AppEventService,
    private userService: UserService) { }

  public ngOnInit(): void {
    this.setViewModel();

    this.userChangedSubscription = this.appEventService.userChanged
      .subscribe(model => {
        if (model.id == this.data.userId) {     
          this.setViewModel();  
        }
      });
  }

  public ngOnDestroy(): void {
    this.userChangedSubscription.unsubscribe();
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
        this.appEventService.userChanged
          .next({
            id: this.viewModel.id,
            type: AppEventChangeType.Update
          });
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