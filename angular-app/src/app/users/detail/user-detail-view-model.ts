export class UserDetailViewModel {
    public detail: UserDetailViewModel_DetailModel;
}

export class UserDetailViewModel_DetailModel {
    public name: string;
    public email: string;
    public passphrase: string;
    public active: boolean;
    public taskManagement: boolean;
    public userManagement: boolean;
}
