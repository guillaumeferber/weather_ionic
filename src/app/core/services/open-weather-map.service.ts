import { Forecast, ForecastDay } from './../models/Forecast.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Query } from '../models/query.model';
import { CurrentObs, CurrentObsGroup } from '../models/currentObs.model';

@Injectable({ providedIn: 'root' })
export class OpenWeatherMapAPIService {

  constructor(private httpClient: HttpClient) {}

  public getCurrentWeather = (query: Query): Observable<CurrentObs[]> => {
    let params = new HttpParams();
    Object.keys(query).map(key => {
      params = params.append(key, query[key]);
    });
    // params = params.append('include', 'minutely');
    return this.httpClient.get<CurrentObsGroup>(`${environment.api[environment.api.default].baseUrl}current`, { params }).pipe(map(results => results.data));
  }

  public getDailyForecast = (query: Query): Observable<ForecastDay> => {
    let params = new HttpParams();
    Object.keys(query).map(key => {
      params = params.append(key, query[key]);
    });
    return this.httpClient.get<ForecastDay>(`${environment.api[environment.api.default].baseUrl}forecast/daily`,
      { params });
  }


}
