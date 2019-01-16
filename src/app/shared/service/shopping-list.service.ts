import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';

@Injectable()
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
        this.addIngredientInternal(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        ingredients.forEach(ingredient => {
            this.addIngredientInternal(ingredient);
        });
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    onIngredientsChanged(callback: any) {
        this.ingredientsChanged.subscribe(callback);
    }

    private addIngredientInternal(ingredient: Ingredient) {
        const index = this.ingredients.findIndex(i => i.name === ingredient.name);
        if (index >= 0) {
            this.ingredients[index].amount += ingredient.amount;
        } else {
            this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
        }
    }

}
