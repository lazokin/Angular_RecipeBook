import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/model/ingredient.model';
import { ShoppingListService } from '../../shared/service/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;
  selectedMode = false;
  selectedIndex = -1;

  private ingredientSelectedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredientSelectedSubscription = this.shoppingListService.subscribeIngredientSelected(
      (index: number) => {
        let ingredient = this.shoppingListService.getIngredient(index);
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
    const value = form.value;
    if (this.selectedMode) {
      this.shoppingListService.editIngredient(this.selectedIndex, new Ingredient(value.name, value.amount));
    } else {
      this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount));
    }
    this.selectedMode = false;
    this.form.reset();
    console.log(form)
  }

  onClear() {
    this.selectedMode = false;
    this.form.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.selectedIndex)
    this.onClear();
  }

}
