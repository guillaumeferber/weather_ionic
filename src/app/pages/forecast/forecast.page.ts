import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/weather.state';
import * as WeatherActions from 'src/app/store/actions/weather.actions';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})
export class ForecastPage implements OnInit {
  constructor(private store: Store<AppState>) { }
  ngOnInit() {
    this.store.dispatch(WeatherActions.getForecastDaily());
  }

}
