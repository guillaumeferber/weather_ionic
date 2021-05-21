import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { AppState } from 'src/app/store/state/weather.state';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public readonly weatherData$: Observable<CurrentObs> = this.store.pipe(select(WeatherSelectors.selectCurrentWeather));
  public dateTime: number = Date.now();
  weatherIconStyle$ = this.weatherData$.pipe(map((value: CurrentObs) => `assets/icon/weather/${value.weather.icon}.png`));
  constructor(
    private store: Store<AppState>) { }

  ngOnInit(): void {
  }

}
