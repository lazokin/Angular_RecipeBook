import { Action } from '@ngrx/store';

export enum Type {
    LogIn = '[Auth] Login',
    LoggedIn = '[Auth] LoggedIn',
    LogOut = '[Auth] LogOut',
    LoggedOut = '[Auth] LoggedOut',
    Register = '[Auth] Register',
    Registered = '[Auth] Registered'
}

export class Register implements Action {
    readonly type = Type.Register;
    constructor(readonly username: string, readonly email: string) {}
}

export class Registered implements Action {
    readonly type = Type.Registered;
}

export class LogIn implements Action {
    readonly type = Type.LogIn;
    constructor(readonly username: string, readonly email: string) {}
}

export class LoggedIn implements Action {
    readonly type = Type.LoggedIn;
}

export class LogOut implements Action {
    readonly type = Type.LogOut;
}

export class LoggedOut implements Action {
    readonly type = Type.LoggedOut;
}

export type Actions = Register | Registered | LogIn | LoggedIn | LogOut | LoggedOut;
