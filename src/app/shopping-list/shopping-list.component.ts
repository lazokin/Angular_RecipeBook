import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../core/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

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
