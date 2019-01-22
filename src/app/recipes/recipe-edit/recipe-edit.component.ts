import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/shared/service/recipe.service';
import { Recipe } from 'src/app/shared/model/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  private index: number;
  private editMode: boolean;
  private submitted: boolean;
  form: FormGroup;
  private nameFormControl: FormControl;
  private descriptionFormControl: FormControl;
  private imageUrlFormControl: FormControl;
  private ingredientsFormArray: FormArray;

  constructor(private service: RecipeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.index = +paramMap.get('id');
        this.editMode = paramMap.has('id');
        this.initialiseForm();
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.editMode) {
      this.service.updateRecipe(this.index, this.form.value);
    } else {
      this.service.addRecipe(this.form.value);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ingredientsControls(): FormArray['controls'] {
    return this.ingredientsFormArray.controls;
  }

  hasIngredients(): boolean {
    return this.ingredientsFormArray.length > 0;
  }

  isSubmitted(): boolean {
    return this.submitted;
  }

  private initialiseForm() {

    this.nameFormControl = new FormControl('', [Validators.required]);
    this.descriptionFormControl = new FormControl('', [Validators.required]);
    this.imageUrlFormControl = new FormControl('', [Validators.required]);
    this.ingredientsFormArray = new FormArray([]);

    if (this.editMode) {
      const recipe = this.service.getRecipe(this.index);
      this.nameFormControl.setValue(recipe.name);
      this.descriptionFormControl.setValue(recipe.description);
      this.imageUrlFormControl.setValue(recipe.imageUrl);
      if (recipe['ingredients']) {
        recipe.ingredients.forEach(ingredient => {
          this.ingredientsFormArray.push(this.createIngredientFormGroup(ingredient.name, ingredient.amount));
        });
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

  onCancel() {
    this.form.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    this.ingredientsFormArray.removeAt(index);
  }

}
