import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import { RecipesModule } from './modules/recipes/recipes.module';
import { ShoppingListModule } from './modules/shopping-list/shopping-list.module';

import { AppComponent } from './app.component';

import { RecipeService } from './shared/services/recipe.service';

import { routes } from './app.routes';
import { reducers } from './store/app.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    CoreModule,
    RecipesModule,
    ShoppingListModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers)
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
