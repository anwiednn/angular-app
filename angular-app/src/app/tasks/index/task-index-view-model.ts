export class TaskIndexViewModel {
    public predicate: TaskIndexViewModel_PredicateModel;
    public page: TaskIndexViewModel_PageModel;
}

export class TaskIndexViewModel_PredicateModel {
    public searchText: string;
}

export class TaskIndexViewModel_PageModel {
    public pageNumber: number;
    public pageSize: number;
    public tasks: TaskIndexViewModel_PageModel_TaskModel[]
}

export class TaskIndexViewModel_PageModel_TaskModel {
    public name: string;
    public reminderDate: Date;
}