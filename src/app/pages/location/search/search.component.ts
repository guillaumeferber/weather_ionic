import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Query } from 'src/app/core/models/query.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchValidated: EventEmitter<Query> = new EventEmitter();
  constructor(private fb: FormBuilder) { }
  searchGroup = this.fb.group({
    city: ['']
  });
  ngOnInit() {
  }

  validate = () => {
    this.searchValidated.emit(this.searchGroup.value);
  }

}
