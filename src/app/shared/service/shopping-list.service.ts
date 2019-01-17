import { Injectable } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class ShoppingListService {

    private ingredientsChangedSubject = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.addIngredientInternal(ingredient);
        this.ingredientsChangedSubject.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        ingredients.forEach(ingredient => {
            this.addIngredientInternal(ingredient);
        });
        this.ingredientsChangedSubject.next(this.ingredients.slice());
    }

    subscribeIngredientsChanged(callback: any) : Subscription {
        return this.ingredientsChangedSubject.subscribe(callback);
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
