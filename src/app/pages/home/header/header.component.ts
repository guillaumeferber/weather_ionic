import { Component, Input, OnInit } from '@angular/core';
import { CurrentObs } from 'src/app/core/models/currentObs.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() weather: CurrentObs;
  public dateTime: number = Date.now();
  constructor() { }

  ngOnInit(): void {
  }

}
