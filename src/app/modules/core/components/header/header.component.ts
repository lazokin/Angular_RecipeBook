import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducers';
import * as fromAuthReducers from 'src/app/modules/auth/store/auth.reducers';
import * as fromAuthActions from 'src/app/modules/auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    authState: Observable<fromAuthReducers.State>;

    constructor(private store: Store<fromApp.State>, private router: Router) { }

    ngOnInit(): void {
        this.authState = this.store.select('auth');
    }

    onLogOut() {
        this.store.dispatch(new fromAuthActions.LogOut());
    }

}
