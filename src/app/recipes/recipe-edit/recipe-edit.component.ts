import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from 'src/app/shared/service/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  private id: number;
  private editMode: boolean;
  
  private form: FormGroup;
  private nameFormControl: FormControl;
  private descriptionFormControl: FormControl;
  private imageUrlFormControl: FormControl;
  private ingredientsFormArray: FormArray;

  constructor(private service: RecipeService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.id = +paramMap.get('id');
        this.editMode = paramMap.has('id');
        this.initialiseForm();
      }
    );
  }

  onSubmit() {
    console.log(this.form);
  }

  ingredientsControls(): FormArray['controls'] {
    return this.ingredientsFormArray.controls;
  }

  hasIngredients() {
    return this.ingredientsFormArray.length > 0;
  }

  private initialiseForm() {

    this.nameFormControl = new FormControl('');
    this.descriptionFormControl = new FormControl('');
    this.imageUrlFormControl = new FormControl('');
    this.ingredientsFormArray = new FormArray([]);

    if (this.editMode) {
      let recipe = this.service.getRecipe(this.id);
      this.nameFormControl.setValue(recipe.name)
      this.descriptionFormControl.setValue(recipe.description);
      this.imageUrlFormControl.setValue(recipe.imageUrl);
      if (recipe['ingredients']) {
        recipe.ingredients.forEach(ingredient => {
          this.ingredientsFormArray.push(new FormGroup({
            'name': new FormControl(ingredient.name),
            'amount': new FormControl(ingredient.amount)
          }));
        })
      }
    }

    this.form = new FormGroup({
      'name': this.nameFormControl,
      'description': this.descriptionFormControl,
      'imageUrl': this.imageUrlFormControl,
      'ingredients': this.ingredientsFormArray
    });

  }

  onAddIngredient() {
    this.ingredientsFormArray.push(new FormGroup({
      'name': new FormControl(),
      'amount': new FormControl()
    }));
  }

}
