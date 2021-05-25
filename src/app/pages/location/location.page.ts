import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/weather.state';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';

@Component({
  selector: 'app-location',
  templateUrl: 'location.page.html',
  styleUrls: ['location.page.scss']
})
export class LocationPage {
  public readonly weatherData$: Observable<CurrentObs> = this.store.pipe(select(WeatherSelectors.selectCurrentWeather));
  constructor(private store: Store<AppState>) { }
}
