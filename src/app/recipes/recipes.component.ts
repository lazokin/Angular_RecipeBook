import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/service/recipe.service';
import { Recipe } from '../shared/model/recipe.model';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

    selectedRecipe: Recipe;

    constructor(private recipeService: RecipeService) { }

    ngOnInit() {
        this.recipeService.onRecipeChanged((recipe: Recipe) => {
            this.selectedRecipe = recipe;
        });
    }

}
