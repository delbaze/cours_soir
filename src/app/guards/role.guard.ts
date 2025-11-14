import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard = (requiredRole: 'admin' | 'user'): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated() && authService.role() === requiredRole) {
      return true;
    } else {
      return router.createUrlTree(['/unauthorized'], {});
    }
  };
};
