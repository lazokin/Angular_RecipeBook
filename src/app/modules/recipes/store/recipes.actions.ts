import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/shared/models/recipe.model';

export enum Type {
    AddRecipe = '[Recipes] Add Recipe',
    AddRecipes = '[Recipes] Add Recipes',
    UpdateRecipe = '[Recipes] Update Recipe',
    DeleteRecipe = '[Recipes] Delete Recipe'
}

export class AddRecipe implements Action {
    readonly type = Type.AddRecipe;
    constructor(readonly recipe: Recipe) {}
}

export class AddRecipes implements Action {
    readonly type = Type.AddRecipes;
    constructor(readonly recipes: Recipe[]) {}
}

export class UpdateRecipe implements Action {
    readonly type = Type.UpdateRecipe;
    constructor(readonly index: number, readonly recipe: Recipe) {}
}

export class DeleteRecipe implements Action {
    readonly type = Type.DeleteRecipe;
    constructor(readonly index: number) {}
}

export type Actions = AddRecipe | AddRecipes | UpdateRecipe | DeleteRecipe;
