import { GeolocationCoordinates, WeatherAppState } from './../../store/state/weather.state';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import { Observable } from 'rxjs';
import { OpenWeatherMapAPIService } from 'src/app/core/services/open-weather-map.service';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { Query } from 'src/app/core/models/query.model';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public weatherData: CurrentObs[];
  selectCurrentGeoLocation$: Observable<GeolocationCoordinates> = this.store.pipe(select(WeatherSelectors.selectCurrentGeoLocation));
  constructor(
    private store: Store<WeatherAppState>,
    private weatherService: OpenWeatherMapAPIService) { }
  ngOnInit() {
    this.selectCurrentGeoLocation$
      .pipe(
        filter((location: GeolocationCoordinates) => !!location))
      .subscribe((location: GeolocationCoordinates) => {
      this.weatherService.getCurrentWeather({
        lat: location.latitude,
        lon: location.longitude
      } as Query)
      .subscribe((result: CurrentObs[]) => {
        this.weatherData = result;
        console.log(result);

    })
    })

}
}
