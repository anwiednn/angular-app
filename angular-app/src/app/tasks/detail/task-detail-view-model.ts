export class TaskDetailViewModel {
    public detail: TaskDetailViewModel_DetailModel;
    public userOptions: TaskDetailViewModel_UserOptionModel[];
}

export class TaskDetailViewModel_DetailModel {
    public userId: number;
    public name: string;
    public notes: string;
    public reminderDate: Date;
}

export class TaskDetailViewModel_UserOptionModel {
    public id: number;
    public name: string;
}