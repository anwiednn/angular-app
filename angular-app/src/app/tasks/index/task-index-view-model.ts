export class TaskIndexViewModel {
    public predicate: TaskIndexViewModel_PredicateModel;
    public page: TaskIndexViewModel_PageModel;
}

export class TaskIndexViewModel_PredicateModel {
    public pageNumber: number;
    public pageSize: number;
    public searchText: string | null;
    public completed: boolean | null;
}

export class TaskIndexViewModel_PageModel {
    public total: number;
    public tasks: TaskIndexViewModel_PageModel_TaskModel[]
}

export class TaskIndexViewModel_PageModel_TaskModel {
    public id: number;
    public userId: number;
    public name: string;
    public notes: string;
    public reminderDate: Date;
    public completed: boolean;
    public userName: string;
}