import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/weather.state';
import * as WeatherActions from 'src/app/store/actions/weather.actions';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})
export class ForecastPage implements OnInit {
  public readonly weatherData$: Observable<CurrentObs> = this.store.pipe(select(WeatherSelectors.selectCurrentWeather));

  constructor(private store: Store<AppState>) { }
  ngOnInit() {
    this.store.dispatch(WeatherActions.getForecastDaily());
  }

}
