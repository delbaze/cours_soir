import { HttpInterceptorFn } from '@angular/common/http';
import { Loading } from '../services/loading';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(Loading);

  const skipLoading = req.headers.has('X-Skip-Loading');
  if (skipLoading) {
    const cleanReq = req.clone({
      headers: req.headers.delete('X-Skip-Loading'),
    });

    return next(cleanReq);
  }
  console.log("SHOW")
  loadingService.show();
  return next(req).pipe(finalize(() => {console.log("HIDE");loadingService.hide()})); // finalize s'exécute toujours (succès ou erreur)
};
