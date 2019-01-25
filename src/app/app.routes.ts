import { Routes } from '@angular/router';

import { HomeComponent } from './modules/core/components/home/home.component';
import { RecipesMainComponent } from './modules/recipes/components/recipes-main/recipes-main.component';
import { ShoppingListMainComponent } from './modules/shopping-list/components/shopping-list-main/shopping-list-main.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'recipes',
        component: RecipesMainComponent
    },
    {
        path: 'shopping-list',
        component: ShoppingListMainComponent
    }
];

