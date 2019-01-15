import { Ingredient } from '../model/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {

    private ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    onIngredientsChanged(callback: any) {
        this.ingredientsChanged.subscribe(callback);
    }

}