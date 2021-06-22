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
    const apiData = {
      keyProp: environment.api[environment.api.default].keyProp,
      key: environment.api[environment.api.default].key
    };
    let headers = request.headers.set('Content-Type', 'application/json');
    if (request.url.includes('api')) {
      apiData.key = environment.api.googleapis.key;
    }
    const reqWithHeaders = request.clone({
      headers,
      params: request.params.append(
        apiData.keyProp,
        apiData.key)
    });
    return next.handle(reqWithHeaders);
  }
}
