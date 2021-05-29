import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const reqWithHeaders = request.clone({
      headers: request.headers.set('Content-Type', 'application/json'),
      params: request.params.append(
        environment.api[environment.api.default].keyProp,
        environment.api[environment.api.default].key)
    });
    return next.handle(reqWithHeaders);
  }
}
