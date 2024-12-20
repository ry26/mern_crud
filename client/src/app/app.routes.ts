import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsEditComponent } from './user-details-edit/user-details-edit.component';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './guest.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    { path: 'login', component: UserLoginComponent ,canActivate: [GuestGuard] },
    { path: 'register', component: UserDetailsComponent, canActivate: [GuestGuard] },    // Register route
    { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
    { path: 'edit/:id', component: UserDetailsEditComponent,canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login' }            
];
