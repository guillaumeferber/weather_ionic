import { AppState, GeolocationCoordinates } from './../../store/state/weather.state';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import * as WeatherActions from 'src/app/store/actions/weather.actions';
import { Observable } from 'rxjs';
import { OpenWeatherMapAPIService } from 'src/app/core/services/open-weather-map.service';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { Query } from 'src/app/core/models/query.model';
import { filter } from 'rxjs/operators';
import { PositionError } from '@ionic-native/geolocation/ngx';
import { LocalStorageItem, LocalStorageService } from 'src/app/core/services/localStorage.service';
import { GuidService } from 'src/app/core/services/guid.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public weatherData: CurrentObs;
  public readonly selectError$: Observable<PositionError> = this.store.select(WeatherSelectors.selectError);
  selectCurrentGeoLocation$: Observable<GeolocationCoordinates> = this.store.pipe(select(WeatherSelectors.selectCurrentGeoLocation));
  constructor(
    private guidService: GuidService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private weatherService: OpenWeatherMapAPIService) { }
  ngOnInit() {
    this.store.dispatch(WeatherActions.getGeoLocation());
    this.selectCurrentGeoLocation$
      .pipe(
        filter((location: GeolocationCoordinates) => !!location))
      .subscribe((location: GeolocationCoordinates) => {
        this.weatherService.getCurrentWeather({
          lat: location.latitude,
          lon: location.longitude
        } as Query)
          .subscribe((result: CurrentObs[]) => {
            this.weatherData = result[0];
            console.log(this.weatherData);
            this.localStorageService.insertItem('weather', {
              ...result[0],
              id: this.guidService.uuidv4()
            } as LocalStorageItem);
          });
      });
  }
  findPosition() {

  }
}
