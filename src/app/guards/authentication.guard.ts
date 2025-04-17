import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthenticationStoreService } from '../authentication-store/authentication-store.service';

export const authenticationGuard: CanActivateChildFn = (childRoute, state) => {
  const authenticationStoreService = inject(AuthenticationStoreService);
  const router = inject(Router);

  if (!authenticationStoreService.isAuthenticated()) {
    return router.parseUrl('/connection');
  }

  return true;
};
