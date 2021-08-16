export class UserIndexViewModel {
    public predicate: UserIndexViewModel_PredicateModel;
    public page: UserIndexViewModel_PageModel;
}

export class UserIndexViewModel_PredicateModel {
    public searchText: string;
    public active: boolean;
}

export class UserIndexViewModel_PageModel {
    public pageNumber: number;
    public pageSize: number;
    public users: UserIndexViewModel_PageModel_UserModel[]
}

export class UserIndexViewModel_PageModel_UserModel {
    public firstName: string;
    public lastName: string;
    public active: boolean;
}