import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';

import { RecipeService } from './services/recipe.service';
import { ShoppingListService } from './services/shopping-list.service';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        CoreRoutingModule
    ],
    providers: [
        RecipeService,
        ShoppingListService
    ],
    exports: [
        HeaderComponent,
        CoreRoutingModule
    ]
})
export class CoreModule {}
