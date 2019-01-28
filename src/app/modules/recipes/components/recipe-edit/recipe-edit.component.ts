import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Recipe } from 'src/app/shared/models/recipe.model';

import * as fromRecipes from '../../store/recipes.reducers';
import * as fromRecipesActions from '../../store/recipes.actions';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  private recipe: Recipe;
  private index: number;

  private editMode: boolean;
  private submitted: boolean;

  form: FormGroup;
  private nameFormControl: FormControl;
  private descriptionFormControl: FormControl;
  private imageUrlFormControl: FormControl;
  private ingredientsFormArray: FormArray;

  private subscription: Subscription;

  constructor(private store: Store<fromRecipes.FeatureState>, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.subscription = this.store.subscribe(state => {
      this.index = +state.router.state.params['id'];
      if (this.index >= 0) {
        this.recipe = state.recipes.recipes[this.index];
        this.editMode = true;
      }
      this.initialiseForm();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (this.editMode) {
      this.store.dispatch(new fromRecipesActions.UpdateRecipe(this.index, this.form.value));
    } else {
      this.store.dispatch(new fromRecipesActions.AddRecipe(this.form.value));
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
      this.nameFormControl.setValue(this.recipe.name);
      this.descriptionFormControl.setValue(this.recipe.description);
      this.imageUrlFormControl.setValue(this.recipe.imageUrl);
      if (this.recipe['ingredients']) {
        this.recipe.ingredients.forEach(ingredient => {
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
