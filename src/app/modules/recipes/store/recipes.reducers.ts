import { Actions, Type, AddRecipe, AddRecipes, UpdateRecipe, DeleteRecipe } from './recipes.actions';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

import * as App from 'src/app/store/app.reducers';

export interface FeatureState extends App.State {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

export const initialState: State = {
    recipes: [
        new Recipe(
            'Chipotle chicken tacos',
            'Take your taste buds to Mexico with these flavoursome tacos. Succulent chicken breast fillets are coated in ' +
            'spicy Chipotle seasoning for a weeknight dinner your family will love!',
            'https://img.taste.com.au/fF1NhAd6/w643-h428-cfill-q90/taste/2018/12/chipotle-chicken-tacos-144989-1.jpg',
            [
                new Ingredient('Chicken', 1),
                new Ingredient('Avocado', 1)
            ]
        ),
        new Recipe(
            'Fish tacos',
            'Fish makes a healthy taco filling, and it tastes absolutely delicious.',
            'https://img.taste.com.au/qqy4eglS/w643-h428-cfill-q90/taste/2016/11/fish-tacos-95173-1.jpeg',
            [
                new Ingredient('Fish', 1),
                new Ingredient('Corn', 2)
            ]
        )
    ]
};

export function recipeReducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case Type.AddRecipe:
            return addRecipe(state, action);
        case Type.AddRecipes:
            return addRecipes(state, action);
        case Type.UpdateRecipe:
            return updateRecipe(state, action);
        case Type.DeleteRecipe:
            return deleteRecipe(state, action);
        default:
            return state;
    }
}

function addRecipe(state: State, action: AddRecipe): State {
    return {...state, recipes: [...state.recipes, action.recipe]};
}

function addRecipes(state: State, action: AddRecipes): State {
    return {...state, recipes: [...state.recipes, ...action.recipes]};
}

function updateRecipe(state: State, action: UpdateRecipe): State {
    const recipe = {...state.recipes[action.index], ...action.recipe};
    const recipes = [...state.recipes];
    recipes[action.index] = recipe;
    return {...state, recipes: recipes};
}

function deleteRecipe(state: State, action: DeleteRecipe): State {
    const recipes = [...state.recipes];
    recipes.splice(action.index, 1);
    return {...state, recipes: recipes};
}
