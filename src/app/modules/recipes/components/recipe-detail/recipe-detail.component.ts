import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromRecipes from '../../store/recipes.reducers';
import * as fromRecipesActions from '../../store/recipes.actions';

import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  index: number;

  subscription: Subscription;

  constructor(private store: Store<fromRecipes.FeatureState>, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.subscription = this.store.subscribe(state => {
      this.index = +state.router.state.params['id'];
      this.recipe = state.recipes.recipes[this.index];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.index);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new fromRecipesActions.DeleteRecipe(this.index));
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
