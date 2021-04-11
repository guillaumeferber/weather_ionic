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
    console.log(request);

    const reqWithHeaders = request.clone({
      // url: 'https://cors-anywhere.herokuapp.com/' + request.url,
      headers: request.headers.set('Content-Type', 'application/json'),
      params: request.params.append('appid', environment.openWeatherMapApi.key)
    });

    console.log(reqWithHeaders);
    return next.handle(reqWithHeaders);
  }
}
