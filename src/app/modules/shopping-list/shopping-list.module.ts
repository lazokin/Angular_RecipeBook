import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ShoppingListEditComponent } from './components/shopping-list-edit/shopping-list-edit.component';
import { ShoppingListMainComponent } from './components/shopping-list-main/shopping-list-main.component';

import { routes } from './shopping-list.routes';


@NgModule({
    declarations: [
        ShoppingListEditComponent,
        ShoppingListMainComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ShoppingListModule {}
