import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';

import { AppComponent } from './app.component';

import { routes } from './app.routes';
import { reducers, effects } from './store/app.reducers';
import { CustomSerializer } from './store/custom-route-serializer';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    CoreModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
