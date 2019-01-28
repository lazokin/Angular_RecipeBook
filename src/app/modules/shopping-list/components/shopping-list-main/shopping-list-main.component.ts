import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromShoppingListActions from '../../store/shopping-list.actions';
import * as fromShoppingListReducers from '../../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list-main',
  templateUrl: './shopping-list-main.component.html',
  styleUrls: ['./shopping-list-main.component.css']
})
export class ShoppingListMainComponent implements OnInit, OnDestroy {

  shoppingListState$: Observable<fromShoppingListReducers.State>;

  constructor(private store: Store<fromShoppingListReducers.FeatureState>) {}

  ngOnInit(): void {
    this.shoppingListState$ = this.store.pipe(select('shoppingList'));
  }

  ngOnDestroy() {
    this.store.dispatch(new fromShoppingListActions.IngredientUnselected());
  }

  onIngredientSelected(index: number) {
    this.store.dispatch(new fromShoppingListActions.IngredientSelected(index));
  }

}
