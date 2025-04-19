import {
  HttpEventType,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthenticationStoreService } from '../../authentication-store/authentication-store.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const logoutOnUnauthorizedInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const authenticationStoreService = inject(AuthenticationStoreService);
  const router = inject(Router);

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        if (event.status === HttpStatusCode.Unauthorized) {
          authenticationStoreService.logout();
          router.navigateByUrl('/connection');
        }
      }
    })
  );
};
