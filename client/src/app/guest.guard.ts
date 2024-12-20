import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if 'window' is defined to confirm we are in a browser environment
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const isAuthenticated = !!localStorage.getItem('userToken'); // Check if the token exists
      if (isAuthenticated) {
        // If user is authenticated, redirect to the home page
        this.router.navigate(['/home']);
        return false;
      }
    }
    return true; // Allow access for unauthenticated users or SSR environments
  }
}
