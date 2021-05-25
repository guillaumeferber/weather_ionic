import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { AppState } from 'src/app/store/state/weather.state';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  public readonly weatherData$: Observable<CurrentObs> = this.store.pipe(select(WeatherSelectors.selectCurrentWeather));
  sunTime$ = this.weatherData$.pipe(map((value: CurrentObs) => this.getSunTime(value.sunset, value.sunrise)));
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(
    private store: Store<AppState>) { }

  getSunTime(sunset: string, sunrise: string) {
    const sunsetDate = sunset.split(':');
    const sunriseDate = sunrise.split(':');
    return {
      sunset: {
        hour: (sunsetDate[0] === '00' ? 24 : +sunsetDate[0]) - 4,
        minutes: +sunsetDate[1]
      },
      sunrise: {
        hour: (sunriseDate[0] === '00' ? 24 : +sunriseDate[0]) - 4,
        minutes: +sunriseDate[1]
      }
    }
  }

}
