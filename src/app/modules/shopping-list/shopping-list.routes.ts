import { Routes } from '@angular/router';

import { ShoppingListMainComponent } from './components/shopping-list-main/shopping-list-main.component';
import { AuthGuard } from '../auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'shopping-list',
        component: ShoppingListMainComponent,
        canActivate: [AuthGuard]
    }
];
