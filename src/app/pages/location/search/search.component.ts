import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { AppState } from 'src/app/store/state/weather.state';
import * as WeatherActions from 'src/app/store/actions/weather.actions';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  viewForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private fb: FormBuilder, private store: Store<AppState>) { }
  ngOnInit() {
    this.store.dispatch(WeatherActions.getLocation({ query: null }));
  }
  searchGroup = this.fb.group({
    city: ['']
  });
  validate = () => {
    this.store.dispatch(WeatherActions.getLocation({ query: this.searchGroup.value }));
  }

  addCity() {
    this.viewForm.next(true);
  }

}
