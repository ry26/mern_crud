import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    { path: 'login', component: UserLoginComponent },
    { path: 'register', component: UserDetailsComponent },    // Register route
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: '/login' }            
];
