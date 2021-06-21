import { PositionError } from "@ionic-native/geolocation/ngx";
import { CurrentObs } from "src/app/core/models/currentObs.model";
import { Forecast, ForecastDay } from "src/app/core/models/Forecast.model";

export interface GeolocationCoordinates {
  readonly latitude: number;
  readonly longitude: number;
}

export interface WeatherAppState {
  currentGeoLocation: GeolocationCoordinates;
  currentWeather: CurrentObs;
  forecastDaily: ForecastDay;
  selectedForecastDaily: Forecast;
  locations: CurrentObs[];
  selectedLocation: CurrentObs;
  error: PositionError | string;
  loading: boolean;
}
export interface AppState {
  weather: WeatherAppState
}
