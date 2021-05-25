import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentObs } from '../models/currentObs.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherIconService {

  getWeatherIconFromObservable = (weatherData: Observable<CurrentObs>): Observable<string> => (
    weatherData.pipe(map((value: CurrentObs) => `assets/icon/weather/${value?.weather.icon}.png`))
  )

  getWeatherIcon = (value: CurrentObs): string => (
    `assets/icon/weather/${value?.weather.icon}.png`
  )
}
