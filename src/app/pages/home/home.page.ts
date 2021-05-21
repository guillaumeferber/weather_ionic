import { AppState, GeolocationCoordinates } from './../../store/state/weather.state';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import * as WeatherActions from 'src/app/store/actions/weather.actions';
import { Observable } from 'rxjs';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { PositionError } from '@ionic-native/geolocation/ngx';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public readonly weatherData$: Observable<CurrentObs> = this.store.pipe(select(WeatherSelectors.selectCurrentWeather));
  public readonly selectError$: Observable<PositionError> = this.store.select(WeatherSelectors.selectError);
  selectCurrentGeoLocation$: Observable<GeolocationCoordinates> = this.store.pipe(select(WeatherSelectors.selectCurrentGeoLocation));
  isAtNight$ = this.weatherData$.pipe(map((value: CurrentObs) => {
    const date = value.sunset.split(':');
    const sunset = {
      hour: (date[0] === '00' ? 24 : +date[0]) - 4,
      minutes: +date[1]
    };
    console.log(sunset);

    console.log(new Date().getHours(), new Date().getMinutes());

  }))
  constructor(
    private store: Store<AppState>) { }
  ngOnInit() {
    this.store.dispatch(WeatherActions.getGeoLocation());
  }

}
