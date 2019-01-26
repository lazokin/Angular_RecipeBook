import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAppReducers from 'src/app/store/app.reducers';
import * as fromShoppingListActions from '../../store/shopping-list.actions';
import * as fromShoppingListReducers from '../../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list-main',
  templateUrl: './shopping-list-main.component.html',
  styleUrls: ['./shopping-list-main.component.css']
})
export class ShoppingListMainComponent implements OnInit {

  observable: Observable<fromShoppingListReducers.State>;

  constructor(private store: Store<fromAppReducers.State>) {}

  ngOnInit(): void {
    this.observable = this.store.pipe(select('shoppingList'));
  }

  onIngredientSelected(index: number) {
    this.store.dispatch(new fromShoppingListActions.IngredientSelected(index));
  }

}
