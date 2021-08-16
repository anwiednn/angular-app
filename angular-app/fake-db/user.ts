export interface User 
{
    id: number;
    name: string;
    email: string;
    passphrase: string;
    active: boolean;
    taskManagement: boolean;
    userManagement: boolean;
}