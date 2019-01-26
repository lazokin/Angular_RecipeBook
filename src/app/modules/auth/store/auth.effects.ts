import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private router: Router) {}

    @Effect() register$ = this.actions$.pipe(
        ofType<authActions.Register>(authActions.Type.Register),
        map((action) => {
            return new authActions.Registered();
        })
    );

    @Effect({dispatch: false}) registered$ = this.actions$.pipe(
        ofType<authActions.Registered>(authActions.Type.Registered),
        tap((action) => {
            this.router.navigate(['/']);
        })
    );

    @Effect() logIn$ = this.actions$.pipe(
        ofType<authActions.LogIn>(authActions.Type.LogIn),
        map((action) => {
            return new authActions.LoggedIn();
        })
    );

    @Effect({dispatch: false}) loggedIn$ = this.actions$.pipe(
        ofType<authActions.LoggedIn>(authActions.Type.LoggedIn),
        tap((action) => {
            this.router.navigate(['/']);
        })
    );

    @Effect() logOut$ = this.actions$.pipe(
        ofType<authActions.LogOut>(authActions.Type.LogOut),
        map((action) => {
            return new authActions.LoggedOut();
        })
    );

    @Effect({dispatch: false}) loggedOut$ = this.actions$.pipe(
        ofType<authActions.LoggedOut>(authActions.Type.LoggedOut),
        tap((action) => {
            this.router.navigate(['/']);
        })
    );

}
