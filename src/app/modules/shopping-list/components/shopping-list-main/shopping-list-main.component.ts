import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, ShoppingListState } from '../../store/shopping-list.state';
import { IngredientSelected } from '../../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list-main',
  templateUrl: './shopping-list-main.component.html',
  styleUrls: ['./shopping-list-main.component.css']
})
export class ShoppingListMainComponent implements OnInit {

  observable: Observable<ShoppingListState>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.observable = this.store.pipe(select('shoppingList'));
  }

  onIngredientSelected(index: number) {
    this.store.dispatch(new IngredientSelected(index));
  }

}
