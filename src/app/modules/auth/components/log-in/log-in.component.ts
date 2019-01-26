import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from 'src/app/store/app.reducers';
import * as fromAuth from '../../store/auth.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private store: Store<fromApp.State>, private router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.store.dispatch(new fromAuth.LogIn(form.value.username, form.value.password));
  }

}
