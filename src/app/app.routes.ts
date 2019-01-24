import { Routes } from '@angular/router';

import { HomeComponent } from './modules/core/components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'recipes',
        loadChildren: './modules/recipes/recipes.module#RecipesModule'
    },
    {
        path: 'shopping-list',
        loadChildren: './modules/shopping-list/shopping-list.module#ShoppingListModule'
    }
];

