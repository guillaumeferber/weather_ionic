import { AppState, GeolocationCoordinates } from './../../store/state/weather.state';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import * as WeatherActions from 'src/app/store/actions/weather.actions';
import * as HydrateActions from 'src/app/store/actions/hydration.actions';
import { Observable } from 'rxjs';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { PositionError } from '@ionic-native/geolocation/ngx';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html'
})
export class HomePage implements OnInit {
  public readonly weatherData$: Observable<CurrentObs> = this.store.pipe(select(WeatherSelectors.selectCurrentWeather));
  public readonly selectError$: Observable<PositionError> = this.store.select(WeatherSelectors.selectError);
  selectCurrentGeoLocation$: Observable<GeolocationCoordinates> = this.store.pipe(select(WeatherSelectors.selectCurrentGeoLocation));
  selectedLocation$: Observable<CurrentObs> = this.store.pipe(select(WeatherSelectors.selectSelectedLocation));
  constructor(
    private store: Store<AppState>) { }

  ngOnInit() {
    this.selectedLocation$
      .pipe(filter((location: CurrentObs) => !!location))
      .subscribe((location: CurrentObs) => {
        if (!!location) {
          this.store.dispatch(WeatherActions.getGeoLocation());
        }
      });
      this.store.dispatch(WeatherActions.getGeoLocation());
      this.store.dispatch(HydrateActions.hydrate());
  }
}
