import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherAppState } from './store/state/weather.state';
import * as WeatherActions from 'src/app/store/actions/weather.actions';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private store: Store<WeatherAppState>) { }
  ngOnInit() {

  }

}
