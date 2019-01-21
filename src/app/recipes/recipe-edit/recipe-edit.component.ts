import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/service/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  private id: number;
  private editMode: boolean;
  private submitted: boolean;
  
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
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form);
    }
  }

  ingredientsControls(): FormArray['controls'] {
    return this.ingredientsFormArray.controls;
  }

  hasIngredients() {
    return this.ingredientsFormArray.length > 0;
  }

  private initialiseForm() {

    this.nameFormControl = new FormControl('', [Validators.required]);
    this.descriptionFormControl = new FormControl('', [Validators.required]);
    this.imageUrlFormControl = new FormControl('', [Validators.required]);
    this.ingredientsFormArray = new FormArray([]);

    if (this.editMode) {
      let recipe = this.service.getRecipe(this.id);
      this.nameFormControl.setValue(recipe.name)
      this.descriptionFormControl.setValue(recipe.description);
      this.imageUrlFormControl.setValue(recipe.imageUrl);
      if (recipe['ingredients']) {
        recipe.ingredients.forEach(ingredient => {
          this.ingredientsFormArray.push(this.createIngredientFormGroup(ingredient.name, ingredient.amount));
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

  private createIngredientFormGroup(name?: string, amount?: number): FormGroup {
    return new FormGroup({
      'name': new FormControl(name, [Validators.required]),
      'amount': new FormControl(amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  onAddIngredient() {
    this.ingredientsFormArray.push(this.createIngredientFormGroup());
  }

}
