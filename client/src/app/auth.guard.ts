import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined') {
      const isAuthenticated = !!localStorage.getItem('userToken'); // Check token
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } else {
      // For SSR environments, deny access
      return false;
    }
  }
  
}
