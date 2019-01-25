import { Ingredient } from 'src/app/shared/models/ingredient.model';

export interface AppState {
    shoppingList: ShoppingListState;
}

export interface ShoppingListState {
    ingredients: Ingredient[];
    selectedIngredient: Ingredient;
    selectedIndex: number;
}

export const initialShoppingListState: ShoppingListState = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ],
    selectedIngredient: null,
    selectedIndex: -1
};
