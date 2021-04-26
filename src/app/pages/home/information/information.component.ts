import { Component, Input, OnInit } from '@angular/core';
import { CurrentObs } from 'src/app/core/models/currentObs.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  @Input() weatherData: CurrentObs;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor() { }

  ngOnInit(): void {
  }

}
