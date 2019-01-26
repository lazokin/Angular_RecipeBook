import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from 'src/app/store/app.reducers';
import * as fromAuth from 'src/app/modules/auth/store/auth.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.State>) { }

  ngOnInit(): void {
    this.authState = this.store.pipe(select('auth'));
  }

}
