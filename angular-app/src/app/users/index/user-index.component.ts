import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
    'action'
  ];
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public viewModel: UserIndexViewModel;

  constructor(private userService: UserService) { }

  public ngOnInit(): void {
    this.setViewModel();
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
