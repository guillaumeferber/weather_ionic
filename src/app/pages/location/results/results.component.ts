import { Component, OnInit } from '@angular/core';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { AppState } from 'src/app/store/state/weather.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as WeatherSelectors from 'src/app/store/selectors/weather.selectors';
import {Countries} from 'src/app/core/classes/country-codes.class';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  locations$: Observable<CurrentObs[]> = this.store.select(WeatherSelectors.selectLocations);
  public countries = Countries;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

  }

}
