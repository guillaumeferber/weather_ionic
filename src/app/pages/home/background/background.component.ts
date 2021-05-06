import { Component, OnInit } from '@angular/core';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import { AppState } from 'src/app/store/state/weather.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentObs } from 'src/app/core/models/currentObs.model';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  public readonly weather$: Observable<CurrentObs> = this.store.pipe(select(WeatherSelectors.selectCurrentWeather));
  iconUrl: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.weather$.subscribe((obs: CurrentObs) => this.iconUrl = `https://www.weatherbit.io/static/img/icons/${obs.weather.icon}.png`);
  }
}
