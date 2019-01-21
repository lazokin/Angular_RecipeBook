import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';
import { ShoppingListService } from '../shared/service/shopping-list.service';
import { Subscription } from 'rxjs';

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
