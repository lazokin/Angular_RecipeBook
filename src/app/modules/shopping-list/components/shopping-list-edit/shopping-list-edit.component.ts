import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/models/ingredient.model';

import * as fromShoppingListActions from '../../store/shopping-list.actions';
import * as fromShoppingListReducers from '../../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;
  selectedMode = false;

  private stateSubscription: Subscription;

  constructor(private store: Store<fromShoppingListReducers.FeatureState>) {}

  ngOnInit() {
    this.stateSubscription = this.store.select('shoppingList').subscribe(state => {
      if (state.selectedIndex > -1) {
        this.selectedMode = true;
        this.form.setValue({
          name: state.selectedIngredient.name,
          amount: state.selectedIngredient.amount
        });
      }
    });
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (this.form.invalid) {
      return;
    }
    const ingredient = new Ingredient(form.value.name, form.value.amount);
    if (this.selectedMode) {
      this.store.dispatch(new fromShoppingListActions.UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new fromShoppingListActions.AddIngredient(ingredient));
    }
    this.onClear();
  }

  onDelete() {
    this.store.dispatch(new fromShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear() {
    this.selectedMode = false;
    this.form.resetForm();
    this.store.dispatch(new fromShoppingListActions.IngredientUnselected());
  }

}
