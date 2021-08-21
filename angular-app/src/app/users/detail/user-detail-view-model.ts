export class UserDetailViewModel {
    public id: number;
    public detail: UserDetailViewModel_DetailModel;
}

export class UserDetailViewModel_DetailModel {
    public name: string;
    public email: string;
    public active: boolean;
}
