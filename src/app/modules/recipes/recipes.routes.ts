import { Routes } from '@angular/router';

import { RecipesMainComponent } from './components/recipes-main/recipes-main.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './components/recipe-start/recipe-start.component';
import { AuthGuard } from '../auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: RecipesMainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: RecipeStartComponent,
            },
            {
                path: 'new',
                component: RecipeEditComponent,
            },
            {
                path: ':id',
                component: RecipeDetailComponent,
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
            }
        ]
    }
];
