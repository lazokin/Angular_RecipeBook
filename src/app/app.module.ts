import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from './modules/core/core.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { ShoppingListModule } from './modules/shopping-list/shopping-list.module';

import { AppComponent } from './app.component';

import { RecipeService } from './shared/services/recipe.service';

import { routes } from './app.routes';
import { shoppingListReducer } from './modules/shopping-list/store/shopping-list.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RecipesModule,
    ShoppingListModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({shoppingList: shoppingListReducer})
  ],
  exports: [
    RouterModule
  ],
  providers: [
    RecipeService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
