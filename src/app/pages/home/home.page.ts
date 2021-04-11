import { OpenWeatherMapAPIService } from './../../core/services/open-weather-map.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  constructor(private weatherService: OpenWeatherMapAPIService) {}

  ngOnInit(): void {
    this.getCurrentWeather()
  }
  getCurrentWeather = () => {
    this.weatherService.getCurrentWeather().subscribe(result => {
      console.log(result);

    })
  }
}
