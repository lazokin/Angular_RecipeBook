import { Actions, Type, AddIngredient, AddIngredients, UpdateIngredient, IngredientSelected } from './shopping-list.actions';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

export interface State {
    ingredients: Ingredient[];
    selectedIngredient: Ingredient;
    selectedIndex: number;
}

export const initialState: State = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ],
    selectedIngredient: null,
    selectedIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case Type.AddIngredient:
            return addIngredient(state, action);
        case Type.AddIngredients:
            return addIngredients(state, action);
        case Type.UpdateIngredient:
            return updateIngredient(state, action);
        case Type.DeleteIngredient:
            return deleteIngredient(state);
        case Type.IngredientSelected:
            return ingredientSelected(state, action);
        case Type.IngredientUnselected:
            return ingredientUnselected(state);
        default:
            return state;
    }
}

function addIngredient(state: State, action: AddIngredient): State {
    const index = state.ingredients.findIndex(i => i.name === action.ingredient.name);
    if (index >= 0) {
        const ingredient = {...state.ingredients[index]};
        ingredient.amount += action.ingredient.amount;
        const ingredients = [...state.ingredients];
        ingredients[index] = ingredient;
        return {...state, ingredients: ingredients};
    } else {
        return {...state, ingredients: [...state.ingredients, action.ingredient]};
    }
}

function addIngredients(state: State, action: AddIngredients): State {
    return {...state, ingredients: [...state.ingredients, ...action.ingredients]};
}

function updateIngredient(state: State, action: UpdateIngredient): State {
    const ingredient = {...state.ingredients[state.selectedIndex], ...action.ingredient};
    const ingredients = [...state.ingredients];
    ingredients[state.selectedIndex] = ingredient;
    return {...state, ingredients: ingredients};
}

function deleteIngredient(state: State): State {
    const ingredients = [...state.ingredients];
    ingredients.splice(state.selectedIndex, 1);
    return {...state, ingredients: ingredients};
}

function ingredientSelected(state: State, action: IngredientSelected): State {
    return {...state, selectedIngredient: {...state.ingredients[action.index]}, selectedIndex: action.index};
}

function ingredientUnselected(state: State): State {
    return {...state, selectedIngredient: null, selectedIndex: -1};
}
