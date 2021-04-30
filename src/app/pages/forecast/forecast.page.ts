import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, GeolocationCoordinates } from 'src/app/store/state/weather.state';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import { filter } from 'rxjs/operators';
import { Query } from 'src/app/core/models/query.model';
import { ForecastDay } from 'src/app/core/models/Forecast.model';

import { OpenWeatherMapAPIService } from 'src/app/core/services/open-weather-map.service';
@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})
export class ForecastPage implements OnInit {
  public forecastDay: ForecastDay;
  selectCurrentGeoLocation$: Observable<GeolocationCoordinates> = this.store.pipe(select(WeatherSelectors.selectCurrentGeoLocation));
  constructor(private store: Store<AppState>,
    private weatherService: OpenWeatherMapAPIService) { }
  ngOnInit() {
    this.selectCurrentGeoLocation$
      .pipe(
        filter((location: GeolocationCoordinates) => !!location))
      .subscribe((location: GeolocationCoordinates) => {
        this.weatherService.getDailyForecast({
          lat: location.latitude,
          lon: location.longitude
        } as Query)
          .subscribe((result: ForecastDay) => {
            this.forecastDay = result;
            console.log(this.forecastDay);
          });
      });
  }

}
