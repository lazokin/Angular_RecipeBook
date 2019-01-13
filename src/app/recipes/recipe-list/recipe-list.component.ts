import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe(
      'Chipotle chicken tacos',
      `Take your taste buds to Mexico with these flavoursome tacos. Succulent chicken breast fillets are coated in spicy Chipotle
       seasoning for a weeknight dinner your family will love!`,
      'https://img.taste.com.au/fF1NhAd6/w643-h428-cfill-q90/taste/2018/12/chipotle-chicken-tacos-144989-1.jpg'
    )
  ];

  constructor() {}

  ngOnInit() {}
}
