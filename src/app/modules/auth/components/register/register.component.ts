import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducers';
import * as fromAuth from '../../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.store.dispatch(new fromAuth.Register(form.value.username, form.value.password));
  }

}
