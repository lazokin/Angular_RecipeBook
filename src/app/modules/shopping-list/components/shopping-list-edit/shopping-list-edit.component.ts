import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { AddIngredient, UpdateIngredient, DeleteIngredient, IngredientUnselected } from '../../store/shopping-list.actions';
import { AppState } from '../../store/shopping-list.state';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;
  selectedMode = false;

  private stateSubscription: Subscription;

  constructor(private store: Store<AppState>) {}

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
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.selectedMode) {
      this.store.dispatch(new UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new AddIngredient(ingredient));
    }
    this.selectedMode = false;
    this.form.resetForm();
  }

  onClear() {
    this.selectedMode = false;
    this.form.resetForm();
    this.store.dispatch(new IngredientUnselected());
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredient());
    this.onClear();
  }

}
