import { Component, OnInit } from '@angular/core';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { AppState } from 'src/app/store/state/weather.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import * as WeatherActions from 'src/app/store/actions/weather.actions';
import {Countries} from 'src/app/core/classes/country-codes.class';
import { PositionError } from '@ionic-native/geolocation';
import { WeatherIconService } from 'src/app/core/services/weather-icon.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  locations$: Observable<CurrentObs[]> = this.store.select(WeatherSelectors.selectLocations);
  error$: Observable<PositionError | string> = this.store.select(WeatherSelectors.selectError);
  public countries = Countries;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private weatherIconService: WeatherIconService) { }

  ngOnInit(): void {
  }

  getWeatherIcon(value: CurrentObs): string {
    return this.weatherIconService.getWeatherIcon(value);
  }

  selectLocation = (location: CurrentObs) => {
    this.store.dispatch(WeatherActions.getCurrentWeatherSuccess({ value: location }));
    this.router.navigate(['/tabs/home', {location: location.lat+'&'+location.lon}]);
  }

}
