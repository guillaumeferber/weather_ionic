import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Forecast } from 'src/app/core/models/Forecast.model';
import { AppState } from 'src/app/store/state/weather.state';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';

@Component({
  selector: 'app-forecast-information',
  templateUrl: './forecast-information.component.html',
  styleUrls: ['./forecast-information.component.scss']
})
export class ForecastInformationComponent {
  selectSelectedForecastDay$: Observable<Forecast> = this.store.pipe(select(WeatherSelectors.selectSelectedForecastDay));

  constructor(private store: Store<AppState>) { }

}
