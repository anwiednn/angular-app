import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserCreateComponent } from '../create/user-create.component';
import { UserDetailComponent } from '../detail/user-detail.component';
import { UserService } from '../user.service';
import { UserIndexViewModel } from './user-index-view-model';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {
  public displayedColumns: string[] = [
    'name', 
    'email', 
    'active', 
    'actions'
  ];
  public viewModel: UserIndexViewModel;

  constructor(private dialog: MatDialog,
    private snackBar: MatSnackBar, 
    private userService: UserService) { }

  public ngOnInit(): void {
    this.setViewModel();
  }

  public createUserClicked(): void {    
    this.dialog
    .open(UserCreateComponent, {
      disableClose: true,
      width: '250px'
    })
    .afterClosed()
    .subscribe(result => {
      if (result) {
        this.setViewModelPage();
      }
    });
  }

  public detailUserClicked(id: number): void {
    this.dialog
    .open(UserDetailComponent, {
      data: { 
        userId: id 
      },
      disableClose: true,
      width: '250px'
    })
    .afterClosed()
    .subscribe(result => {
      if (result) {
        this.setViewModelPage();
      }
    });
  }

  public pageChanged(event : PageEvent) : void {
    this.viewModel.predicate.pageNumber = event.pageIndex;
    this.viewModel.predicate.pageSize = event.pageSize;

    this.setViewModelPage();
  }

  private setViewModel() : void {
    this.userService
      .getUserIndexView()
      .subscribe(viewModel => {
        this.viewModel = viewModel;
      });
  }

  private setViewModelPage() : void {
    this.userService
      .getUserIndexViewPage(this.viewModel.predicate)
      .subscribe(pageModel => {
        this.viewModel.page = pageModel;
      });
  }
}
