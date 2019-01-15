import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {

    private recipeEmitter = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
          'Chipotle chicken tacos',
          `Take your taste buds to Mexico with these flavoursome tacos. Succulent chicken breast fillets are coated in spicy Chipotle
           seasoning for a weeknight dinner your family will love!`,
          'https://img.taste.com.au/fF1NhAd6/w643-h428-cfill-q90/taste/2018/12/chipotle-chicken-tacos-144989-1.jpg'
        ),
        new Recipe(
          'Fish tacos',
          'Fish makes a healthy taco filling, and it tastes absolutely delicious.',
          'https://img.taste.com.au/qqy4eglS/w643-h428-cfill-q90/taste/2016/11/fish-tacos-95173-1.jpeg'
        )
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    selectRecipe(recipe: Recipe) {
        this.recipeEmitter.emit(recipe);
    }

    onRecipeSelected(callback: any) {
        this.recipeEmitter.subscribe(callback);
    }

}