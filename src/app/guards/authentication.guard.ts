import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthenticationStateService } from '../authentication-state/authentication-state.service';

export const authenticationGuard: CanActivateChildFn = (childRoute, state) => {
  const authenticationStateService = inject(AuthenticationStateService);
  const router = inject(Router);

  if (!authenticationStateService.isAuthenticated()) {
    return router.parseUrl('/connection');
  }

  return true;
};
