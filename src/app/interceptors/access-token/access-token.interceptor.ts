import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationStoreService } from '../../authentication-store/authentication-store.service';

export const accessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationStoreService = inject(AuthenticationStoreService);
  const accessToken = authenticationStoreService.accessToken();

  const newReq = req.clone();

  if (authenticationStoreService.isAuthenticated()) {
    newReq.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return next(newReq);
};
