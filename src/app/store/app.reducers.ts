import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthReducers from '../modules/auth/store/auth.reducers';
import * as fromAuthEffects from '../modules/auth/store/auth.effects';
import * as fromShoppingListReducers from '../modules/shopping-list/store/shopping-list.reducers';

export interface State {
    auth: fromAuthReducers.State;
    shoppingList: fromShoppingListReducers.State;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuthReducers.authReducer,
    shoppingList: fromShoppingListReducers.shoppingListReducer
};

export const effects = [
    fromAuthEffects.AuthEffects
];
