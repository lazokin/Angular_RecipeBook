import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-main',
  templateUrl: './shopping-list-main.component.html',
  styleUrls: ['./shopping-list-main.component.css']
})
export class ShoppingListMainComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.subscribeIngredientsChanged(
      (ingredients: Ingredient[]) => { this.ingredients = ingredients; }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onItemSelected(index: number) {
    this.shoppingListService.onIngredientSelected(index);
  }

}
