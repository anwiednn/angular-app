export class TaskIndexViewModel {
    public predicate: TaskIndexViewModel_PredicateModel;
    public page: TaskIndexViewModel_PageModel;
}

export class TaskIndexViewModel_PredicateModel {
    public pageNumber: number;
    public pageSize: number;
    public searchText: string | null;
}

export class TaskIndexViewModel_PageModel {
    public tasks: TaskIndexViewModel_PageModel_TaskModel[]
}

export class TaskIndexViewModel_PageModel_TaskModel {
    public name: string;
    public reminderDate: Date;
}