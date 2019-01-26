import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromApp from 'src/app/store/app.reducers';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private store: Store<fromApp.State>, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        if (authState.authenticated) {
          return true;
        } else {
          return this.router.parseUrl('/');
        }
      })
    );
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        if (authState.authenticated) {
          return true;
        } else {
          return this.router.parseUrl('/');
        }
      })
    );
  }

}
