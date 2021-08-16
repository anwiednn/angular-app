export class UserCreateViewModel {
    public detail: UserCreateViewModel_DetailModel;
}

export class UserCreateViewModel_DetailModel {
    public name: string;
    public email: string;
    public passphrase: string;
    public active: boolean;
    public taskManagement: boolean;
    public userManagement: boolean;
}
