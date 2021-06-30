import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/weather.state';
import * as WeatherActions from 'src/app/store/actions/weather.actions';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Query } from 'src/app/core/models/query.model';
import { AutocompleteQueryService } from 'src/app/core/services/autocomplete-query.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
interface Prediction {
  description: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  predictions: BehaviorSubject<any[]> = new BehaviorSubject([]);
  predictions$: Observable<any[]> = this.predictions.asObservable();
  searchText: string;
  @ViewChild('input') input: ElementRef;
  constructor(
    private autocompleteQueryService: AutocompleteQueryService,
    private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.searchGroup.valueChanges
      .pipe(
        distinctUntilChanged(),
        filter((values: Query) => values.city.length > 3)
      )
      .subscribe((values: Query) => {
        this.getAutocompleteQueryResult(values.city);
      });
  }

  searchGroup = this.fb.group({
    city: ['']
  });

  public addFocus() {
    console.log('focus');
  }

  public removeFocus() {
    console.log('removeFocus');
  }

  public addValue(value: any) {
    console.log(value);
    this.store.dispatch(WeatherActions.getLocation({ query: {city: value} }));
  }

  public validate = (): void => {
    this.searchGroup.value && this.store.dispatch(WeatherActions.getLocation({ query: this.searchGroup.value }));
  }

  public delete = () => {
    this.searchGroup.patchValue({city: ''});
  }

  private getAutocompleteQueryResult = (value: string) => {
    this.autocompleteQueryService.getAutocompleteQueryResult(value)
      // .pipe(map((results: any[]) => results['predictions'].map(item => item.description)))
      .subscribe((result: Prediction[]) => this.predictions.next(result['predictions']));
  }
}
