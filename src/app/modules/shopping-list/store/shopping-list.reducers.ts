import { ShoppingListState, initialShoppingListState } from './shopping-list.state';
import { Actions, Type, AddIngredient, AddIngredients, UpdateIngredient, IngredientSelected } from './shopping-list.actions';

export function shoppingListReducer(state: ShoppingListState = initialShoppingListState, action: Actions): ShoppingListState {
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

function addIngredient(state: ShoppingListState, action: AddIngredient): ShoppingListState {
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

function addIngredients(state: ShoppingListState, action: AddIngredients): ShoppingListState {
    return {...state, ingredients: [...state.ingredients, ...action.ingredients]};
}

function updateIngredient(state: ShoppingListState, action: UpdateIngredient): ShoppingListState {
    const ingredient = {...state.ingredients[state.selectedIndex], ...action.ingredient};
    const ingredients = [...state.ingredients];
    ingredients[state.selectedIndex] = ingredient;
    return {...state, ingredients: ingredients, selectedIngredient: null, selectedIndex: -1};
}

function deleteIngredient(state: ShoppingListState): ShoppingListState {
    const ingredients = [...state.ingredients];
    ingredients.splice(state.selectedIndex, 1);
    return {...state, ingredients: ingredients, selectedIngredient: null, selectedIndex: -1};
}

function ingredientSelected(state: ShoppingListState, action: IngredientSelected): ShoppingListState {
    return {...state, selectedIngredient: {...state.ingredients[action.index]}, selectedIndex: action.index};
}

function ingredientUnselected(state: ShoppingListState): ShoppingListState {
    return {...state, selectedIngredient: null, selectedIndex: -1};
}
