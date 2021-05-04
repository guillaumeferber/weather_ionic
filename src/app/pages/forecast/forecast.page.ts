import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/state/weather.state';
import * as WeatherActions from 'src/app/store/actions/weather.actions';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import { ForecastDay } from 'src/app/core/models/Forecast.model';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})
export class ForecastPage implements OnInit {
  public forecastDay: ForecastDay;
  selectCurrentForecastDaily$: Observable<ForecastDay> = this.store.pipe(select(WeatherSelectors.selectCurrentForecastDaily));
  constructor(private store: Store<AppState>) { }
  ngOnInit() {
    this.store.dispatch(WeatherActions.getForecastDaily());
  }

}
