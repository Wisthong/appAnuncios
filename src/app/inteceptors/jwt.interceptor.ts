import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    try {
      let req = request;
      req = request.clone({
        setHeaders: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return next.handle(req);
    } catch (error) {
      console.log('😡😡😡😡😡Se rompio😡😡😡😡😡');
    }
    return next.handle(request);
  }
}
