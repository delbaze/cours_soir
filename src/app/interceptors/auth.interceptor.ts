import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  console.log('TEST', req.url);
//   const publicUrls = ['https://jsonplaceholder.typicode.com'];
//   const isPublicUrl = publicUrls.some((url) => req.url.includes(url));

  if (!authService.isAuthenticated()) {
//   if (isPublicUrl || !authService.isAuthenticated()) {
    return next(req);
  }
  const token = authService.getToken();
  const authReq = req.clone({
    setHeaders: {
      Authorization: token!,
    },
  });
  console.log('Token ajouté', req.url);
  console.log('Headers', authReq.headers);
  return next(authReq);
};
