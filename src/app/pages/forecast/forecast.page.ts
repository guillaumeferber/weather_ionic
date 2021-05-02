import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, GeolocationCoordinates } from 'src/app/store/state/weather.state';
import * as WeatherActions from 'src/app/store/actions/weather.actions';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
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
  constructor(private store: Store<AppState>) { }
  ngOnInit() {
    this.store.dispatch(WeatherActions.getForecastDaily());
  }

}
