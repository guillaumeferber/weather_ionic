import { Component, Input, OnInit } from '@angular/core';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() results: CurrentObs[][];
  constructor() { }

  ngOnInit(): void {

  }

}
