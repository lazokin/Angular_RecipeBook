import { Actions, Type, Registered, LoggedIn, LoggedOut } from './auth.actions';

export interface State {
    token: string;
    authenticated: boolean;
}

export const initialState: State = {
    token: null,
    authenticated: false
};

export function authReducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case Type.Registered:
            return registered(state, action);
        case Type.LoggedIn:
            return loggedIn(state, action);
         case Type.LoggedOut:
            return loggedOut(state, action);
        default:
            return state;
    }
}

function registered(state: State, action: Registered): State {
    return {...state, authenticated: true};
}

function loggedIn(state: State, action: LoggedIn): State {
    return {...state, authenticated: true};
}

function loggedOut(state: State, action: LoggedOut): State {
    return {...state, authenticated: false, token: null};
}
