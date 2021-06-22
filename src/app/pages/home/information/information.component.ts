import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { AppState } from 'src/app/store/state/weather.state';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import { filter, map } from 'rxjs/operators';
import { SunTime } from 'src/app/core/models/sunTime.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  public readonly weatherData$: Observable<CurrentObs> = this.store.pipe(select(WeatherSelectors.selectCurrentWeather));
  public sunTime$: Observable<SunTime>;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.sunTime$ = this.weatherData$.pipe(
      filter(value => !!value),
      map((value: CurrentObs) => this.getSunTime(value.sunset, value.sunrise)));
  }

  getSunTime(sunset: string, sunrise: string): SunTime {
    const sunsetDate = sunset.split(':');
    const sunriseDate = sunrise.split(':');

    return {
      sunset: {
        hour: (sunsetDate[0] === '00' ? 24 : +sunsetDate[0]),
        minutes: +sunsetDate[1]
      },
      sunrise: {
        hour: (sunriseDate[0] === '00' ? 24 : +sunriseDate[0]),
        minutes: +sunriseDate[1]
      }
    } as SunTime;
  }

}
