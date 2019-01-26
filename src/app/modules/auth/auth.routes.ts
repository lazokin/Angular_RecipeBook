import { Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LogInComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];
