import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

export enum Type {
    AddIngredient = '[ShoppingList] Add Ingredient',
    AddIngredients = '[ShoppingList] Add Ingredients',
    UpdateIngredient = '[ShoppingList] Update Ingredient',
    DeleteIngredient = '[ShoppingList] Delete Ingredient',
    IngredientSelected = '[ShoppingList] Ingredient Selected',
    IngredientUnselected = '[ShoppingList] Ingredient Unselected'
}

export class AddIngredient implements Action {
    readonly type = Type.AddIngredient;
    constructor(readonly ingredient: Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type = Type.AddIngredients;
    constructor(readonly ingredients: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
    readonly type = Type.UpdateIngredient;
    constructor(readonly ingredient: Ingredient) {}
}

export class DeleteIngredient implements Action {
    readonly type = Type.DeleteIngredient;
}

export class IngredientSelected implements Action {
    readonly type = Type.IngredientSelected;
    constructor(readonly index: number) {}
}

export class IngredientUnselected implements Action {
    readonly type = Type.IngredientUnselected;
}

export type Actions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | IngredientSelected | IngredientUnselected;
