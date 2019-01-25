import { Routes } from '@angular/router';

import { RecipesMainComponent } from './components/recipes-main/recipes-main.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './components/recipe-start/recipe-start.component';

export const routes: Routes = [
    {
        path: 'recipes',
        component: RecipesMainComponent,
        children: [
            {
                path: '',
                component: RecipeStartComponent
            },
            {
                path: 'new',
                component: RecipeEditComponent
            },
            {
                path: ':id',
                component: RecipeDetailComponent
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent
            }
        ]
    }
];
