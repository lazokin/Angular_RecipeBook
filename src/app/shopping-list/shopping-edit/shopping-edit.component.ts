import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/model/ingredient.model';
import { ShoppingListService } from '../../shared/service/shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const value = form.value;
    this.shoppingListService.addIngredient(new Ingredient(value.name, value.amount));
  }

}
