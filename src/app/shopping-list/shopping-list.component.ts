import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';
import { ShoppingListService } from '../shared/service/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  private ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.onIngredientsChanged((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

}
