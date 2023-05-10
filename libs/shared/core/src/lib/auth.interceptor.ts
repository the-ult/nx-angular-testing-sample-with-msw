import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ENVIRONMENT } from '@ult/shared/data-access';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: add check if bearer exist, either in AuthService.store or something,
  // else show dialog
  const bearerToken = inject(ENVIRONMENT).bearer ?? 'PLEASE ADD BEARER TOKEN';

  if (req.url.startsWith('https://api.themoviedb.org/3/')) {
    const headers = req.headers
      // .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${bearerToken}`);

    req = req.clone({ headers });
  }

  return next(req);
};
