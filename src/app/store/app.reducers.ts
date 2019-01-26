import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../modules/auth/store/auth.reducers';
import * as fromShoppingList from '../modules/shopping-list/store/shopping-list.reducers';

export interface State {
    auth: fromAuth.State;
    shoppingList: fromShoppingList.State;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.authReducer,
    shoppingList: fromShoppingList.shoppingListReducer
}