import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class OpenWeatherMapAPIService {

  constructor(private httpClient: HttpClient) {}

  private response = { coord: { lon: -0.13, lat: 51.51 }, weather: [{ id: 741, main: 'Fog', description: 'fog', icon: '50n' }], base: 'stations', main: { temp: 284.04, pressure: 1011, humidity: 93, tempmin: 280.93, tempmax: 287.04 }, visibility: 10000, wind: { speed: 1.5 }, clouds: { all: 20 }, dt: 1570234102, sys: { type: 1, id: 1417, message: 0.0102, country: 'GB', sunrise: 1570255614, sunset: 1570296659 }, timezone: 3600, id: 2643743, name: 'London', cod: 200 };

  private qParams = {
    q: 'London,uk',
  };
  public getCurrentWeather = (): Observable<any> => {
    let params = new HttpParams();
    Object.keys(this.qParams).map(key => {
      params = params.append(key, this.qParams[key]);
    });

    return this.httpClient.get<any>(`${environment.openWeatherMapApi.baseUrl}weather`, { params });

  }


}
