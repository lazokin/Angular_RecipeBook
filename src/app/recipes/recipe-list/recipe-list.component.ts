import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/shared/model/recipe.model';
import { RecipeService } from '../../shared/service/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  private subscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.subscribeRecipesChanged(
      (recipes: Recipe[]) => { this.recipes = recipes; }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  get noRecipes() {
    return this.recipes.length === 0;
  }

}
