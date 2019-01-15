import { Component, OnInit, Input, Output } from '@angular/core';
import { RecipeService } from '../../../shared/service/recipe.service';
import { Recipe } from 'src/app/shared/model/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {}

  onSelected() {
    this.recipeService.changeRecipe(this.recipe);
  }

}
