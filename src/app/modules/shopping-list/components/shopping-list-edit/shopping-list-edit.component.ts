import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;
  selectedMode = false;
  selectedIndex = -1;

  private ingredientSelectedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredientSelectedSubscription = this.shoppingListService.subscribeIngredientSelected(
      (index: number) => {
        const ingredient = this.shoppingListService.getIngredient(index);
        this.selectedMode = true;
        this.selectedIndex = index;
        this.form.setValue({
          name: ingredient.name,
          amount: ingredient.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.ingredientSelectedSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (this.form.invalid) {
      return;
    }
    const value = form.value;
    if (this.selectedMode) {
      this.shoppingListService.editIngredient(this.selectedIndex, new Ingredient(value.name, value.amount));
    } else {
      this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount));
    }
    this.selectedMode = false;
    this.form.resetForm();
    console.log(form);
  }

  onClear() {
    this.selectedMode = false;
    this.form.resetForm();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.selectedIndex);
    this.onClear();
  }

}
