import { Action } from '@ngrx/store';

export enum Type {
    LogIn = '[Auth] Login',
    LogOut = '[Auth] Logout',
    Register = '[Auth] Register'
}

export class LogIn implements Action {
    readonly type = Type.LogIn;
    constructor(readonly username: string, readonly email: string) {}
}

export class LogOut implements Action {
    readonly type = Type.LogOut;
}

export class Register implements Action {
    readonly type = Type.Register;
    constructor(readonly username: string, readonly email: string) {}
}

export type Actions = LogIn | LogOut | Register
