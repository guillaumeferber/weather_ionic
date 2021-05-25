import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { AppState } from 'src/app/store/state/weather.state';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import { WeatherIconService } from 'src/app/core/services/weather-icon.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HomeHeaderComponent {
  @Input() direction?: string = 'column';
  public readonly weatherData$: Observable<CurrentObs> = this.store.pipe(select(WeatherSelectors.selectCurrentWeather));
  public dateTime: number = Date.now();
  public readonly weatherIcon$ = this.weatherIconService.getWeatherIconFromObservable(this.weatherData$);
  constructor(
    private weatherIconService: WeatherIconService,
    private store: Store<AppState>) { }

}
