export class UserIndexViewModel {
    public predicate: UserIndexViewModel_PredicateModel;
    public page: UserIndexViewModel_PageModel;
}

export class UserIndexViewModel_PredicateModel {
    public pageNumber: number;
    public pageSize: number;
    public searchText: string;
    public active: boolean | null;
}

export class UserIndexViewModel_PageModel {
    public users: UserIndexViewModel_PageModel_UserModel[]
}

export class UserIndexViewModel_PageModel_UserModel {
    public active: boolean;
    public name: string;
}