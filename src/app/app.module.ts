import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

import { RecipeService } from './shared/service/recipe.service';
import { ShoppingListService } from './shared/service/shopping-list.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule
  ],
  providers: [
    RecipeService,
    ShoppingListService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
