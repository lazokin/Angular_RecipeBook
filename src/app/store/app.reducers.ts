import { ActionReducerMap } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from './custom-route-serializer';
import * as fromAuthReducers from '../modules/auth/store/auth.reducers';
import * as fromAuthEffects from '../modules/auth/store/auth.effects';

export interface State {
    auth: fromAuthReducers.State;
    router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuthReducers.authReducer,
    router: routerReducer
};

export const effects = [
    fromAuthEffects.AuthEffects
];
