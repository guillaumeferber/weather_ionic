import { Component } from '@angular/core';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { Query } from 'src/app/core/models/query.model';
import { OpenWeatherMapAPIService } from 'src/app/core/services/open-weather-map.service';

@Component({
  selector: 'app-location',
  templateUrl: 'location.page.html',
  styleUrls: ['location.page.scss']
})
export class LocationPage {
  public weatherData: CurrentObs[][] = [];
  constructor(private weatherService: OpenWeatherMapAPIService) {}

  getCurrentWeather = (query: Query) => {
    this.weatherService.getCurrentWeather(query)
      .subscribe((result: CurrentObs[]) => {
        this.weatherData.push(result);
    })
  }
}
