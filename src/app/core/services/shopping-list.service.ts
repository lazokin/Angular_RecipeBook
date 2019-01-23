import { Injectable } from '@angular/core';
import { Ingredient } from '../../shared/model/ingredient.model';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class ShoppingListService {

    private ingredientsChangedSubject = new Subject<Ingredient[]>();
    private ingredientSelectedSubject = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ];

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    getIngredient(index: number): Ingredient {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.addIngredientInternal(ingredient);
        this.ingredientsChangedSubject.next(this.ingredients.slice());
    }

    editIngredient(index: number, ingredient: Ingredient) {
        this.editIngredientInternal(index, ingredient);
        this.ingredientsChangedSubject.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        ingredients.forEach(ingredient => {
            this.addIngredientInternal(ingredient);
        });
        this.ingredientsChangedSubject.next(this.ingredients.slice());
    }

    subscribeIngredientsChanged(callback: any): Subscription {
        return this.ingredientsChangedSubject.subscribe(callback);
    }

    subscribeIngredientSelected(callback: any): Subscription {
        return this.ingredientSelectedSubject.subscribe(callback);
    }

    onIngredientSelected(index: number): void {
        this.ingredientSelectedSubject.next(index);
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChangedSubject.next(this.ingredients.slice());
    }

    private addIngredientInternal(ingredient: Ingredient): void {
        const index = this.ingredients.findIndex(i => i.name === ingredient.name);
        if (index >= 0) {
            this.ingredients[index].amount += ingredient.amount;
        } else {
            this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
        }
    }

    private editIngredientInternal(index: number, ingredient: Ingredient): void {
        this.ingredients[index].name = ingredient.name;
        this.ingredients[index].amount = ingredient.amount;
    }

}
