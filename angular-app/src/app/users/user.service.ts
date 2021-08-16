import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from 'fake-db/user';
import { UserCreateModel } from './create/user-create-model';
import { UserUpdateModel } from './detail/user-update-model';
import { UserIndexViewModel, UserIndexViewModel_PageModel, UserIndexViewModel_PageModel_UserModel, UserIndexViewModel_PredicateModel } from './index/user-index-view-model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  public createUser(createModel: UserCreateModel) : Observable<number> {
    var createUser = {
      name: createModel.name,
      email: createModel.email,
      active: createModel.active,
      taskManagement: createModel.taskManagement,
      userManagement: createModel.userManagement
    } as User;

    return this.httpClient
      .post<User>(`${environment.apiBaseUrl}/users`, createUser, httpOptions)
      .pipe(map(response => response.id));
  }

  public getUserIndexView() : Observable<UserIndexViewModel> {
    var queryOptions: string = `_page=1&_limit=25&active=true`;

    return this.httpClient
      .get<User[]>(`${environment.apiBaseUrl}/users?${queryOptions}`, httpOptions)
      .pipe(map(response => {
        return {
          predicate: {
            pageNumber: 1,
            pageSize: 25,
            active: true,
            searchText: ""
          } as UserIndexViewModel_PredicateModel,
          page: {
            users: response.map(u => {
              return {
                active: u.active,
                name: u.name
              } as UserIndexViewModel_PageModel_UserModel
            })
          } as UserIndexViewModel_PageModel
        } as UserIndexViewModel;
      }));
  }

  public getUserIndexViewPage(predicateModel: UserIndexViewModel_PredicateModel) : Observable<UserIndexViewModel_PageModel> {
    var queryOptions: string = `_page=${predicateModel.pageNumber}&_limit=${predicateModel.pageSize}`;
    
    if (predicateModel.active != null) {
      queryOptions += `&active=${predicateModel.active}`;
    }

    if (!predicateModel.searchText) {
      queryOptions += `&name_like=${predicateModel.searchText}`;
      queryOptions += `&email_like=${predicateModel.searchText}`;
    }
    
    return this.httpClient
      .get<User[]>(`${environment.apiBaseUrl}/users?${queryOptions}`, httpOptions)
      .pipe(map(response => {
        return {
            users: response.map(u => {
              return {
                active: u.active,
                name: u.name
              } as UserIndexViewModel_PageModel_UserModel
            })
          } as UserIndexViewModel_PageModel;
      }));
  }

  public deleteUser(id: number) : Observable<void> {
    return this.httpClient
      .delete<Task>(`${environment.apiBaseUrl}/users/${id}`, httpOptions)
      .pipe(map(() => {}));
  }

  public updateUser(id: number, updateModel: UserUpdateModel) :Observable<number> {
    var updateTask = {
      id: id,
      name: updateModel.name,
      email: updateModel.email,
      active: updateModel.active,
      taskManagement: updateModel.taskManagement,
      userManagement: updateModel.userManagement
    } as User;

    return this.httpClient
      .put<User>(`${environment.apiBaseUrl}/users/${id}`, updateTask, httpOptions)
      .pipe(map(response => response.id));
  }
}
