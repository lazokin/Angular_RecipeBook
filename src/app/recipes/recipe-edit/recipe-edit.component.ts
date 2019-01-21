import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
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

  constructor(private service: RecipeService, private route: ActivatedRoute) { }

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

  private initialiseForm() {
    
    let name = '';
    let description = '';
    let imageUrl = '';

    if (this.editMode) {
      let recipe = this.service.getRecipe(this.id);
      name = recipe.name;
      description = recipe.description;
      imageUrl = recipe.imageUrl;
    }

    this.form = new FormGroup({
      'name': new FormControl(name),
      'description': new FormControl(description),
      'imageUrl': new FormControl(imageUrl)
    });
  }

}
