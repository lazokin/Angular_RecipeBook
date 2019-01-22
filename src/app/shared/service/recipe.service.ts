import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { Ingredient } from '../model/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {

    private recipesChangedSubject = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
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
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    subscribeRecipesChanged(callback: any): Subscription {
        return this.recipesChangedSubject.subscribe(callback);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(id: number) {
        this.shoppingListService.addIngredients(this.recipes[id].ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.notifyRecipesChanged();
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.notifyRecipesChanged();
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.notifyRecipesChanged();
    }

    private notifyRecipesChanged() {
        this.recipesChangedSubject.next(this.recipes.slice());
    }

}
