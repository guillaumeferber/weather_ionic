import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { ForecastDay } from 'src/app/core/models/Forecast.model';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import * as WeatherActions from 'src/app/store/actions/weather.actions';
import { AppState } from 'src/app/store/state/weather.state';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html',
  styleUrls: ['./forecast-list.component.scss']
})
export class ForecastListComponent {
  selectCurrentForecastDaily$: Observable<ForecastDay> = this.store.pipe(select(WeatherSelectors.selectCurrentForecastDaily));
  selectCurrentWeather$: Observable<CurrentObs> = this.store.pipe(select(WeatherSelectors.selectCurrentWeather));
  public dateTime: number = Date.now();
  public activeIndex: number;
  constructor(private store: Store<AppState>) { }

  select = (index: number) => {
    this.activeIndex = index;
    this.store.dispatch(WeatherActions.selectForecastDay({ id: index }));
  }

}
