export enum AppEventChangeType {
    Create = 1,
    Update = 2,
    Delete = 3
}

export class AppEventChangedModel {
    public id: number;
    public type: AppEventChangeType;
}
