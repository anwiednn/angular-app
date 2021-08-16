export class TaskCreateViewModel {
    public detail: TaskCreateViewModel_DetailModel;
    public userOptions: TaskCreateViewModel_UserOptionModel[];
}

export class TaskCreateViewModel_DetailModel {
    public userId: number;
    public name: string;
    public notes: string;
    public reminderDate: Date;
}

export class TaskCreateViewModel_UserOptionModel {
    public id: number;
    public name: string;
}