import { tap } from 'rxjs';
import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AuthenticationStoreService } from '../../authentication-store/authentication-store.service';
import { inject } from '@angular/core';
import { differenceInSeconds } from 'date-fns';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);
  const authenticationStoreService = inject(AuthenticationStoreService);

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        const now = new Date();
        const expiresAt = new Date(authenticationStoreService.expiresAt());
        const isTimeToRefreshToken = differenceInSeconds(expiresAt, now) < 60;

        if (isTimeToRefreshToken) {
          const refreshToken = authenticationStoreService.refreshToken();
          authenticationService
            .refreshToken({ refresh_token: refreshToken })
            .subscribe({
              next: ({ data }) => authenticationStoreService.login(data),
              error: (error) => {
                console.error('Error refreshing token', error);
              },
            });
        }
      }
    })
  );
};
