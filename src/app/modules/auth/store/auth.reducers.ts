import { Actions, Type, LogIn, LogOut, Register } from './auth.actions';

export interface State {
    token: string;
    authenticated: boolean;
}

export const initialState: State = {
    token: null,
    authenticated: false
}

export function authReducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case Type.LogIn:
            return logIn(state, action);
         case Type.LogOut:
            return logOut(state, action);
        case Type.Register:
            return register(state, action);
        default:
            return state;
    }
}

function logIn(state: State, action: LogIn): State {
    return {...state, authenticated: true};
}

function logOut(state: State, action: LogOut): State {
    return {...state, authenticated: false, token: null};
}

function register(state: State, action: Register): State {
    return {...state, authenticated: true};
}