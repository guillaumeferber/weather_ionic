import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/weather.state';
import * as WeatherActions from 'src/app/store/actions/weather.actions';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  constructor(private fb: FormBuilder, private store: Store<AppState>) { }
  @HostListener('document:keyup.enter') onKeyUp() {
    console.log(this.searchGroup.value);

    this.validate();
  }
  ngOnInit() {
    this.store.dispatch(WeatherActions.getLocation({ query: null }));
  }
  searchGroup = this.fb.group({
    city: ['']
  });
  private validate = () => {
    this.searchGroup.value && this.store.dispatch(WeatherActions.getLocation({ query: this.searchGroup.value }));
  }


}
