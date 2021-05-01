import { PositionError } from "@ionic-native/geolocation/ngx";
import { createSelector } from "@ngrx/store";
import { CurrentObs } from "src/app/core/models/currentObs.model";
import { AppState, GeolocationCoordinates } from "../state/weather.state";

export const selectCurrentGeoLocation = createSelector(
  (state: AppState) => state.weather.currentGeoLocation,
  (location: GeolocationCoordinates) => location
);

export const selectError = createSelector(
  (state: AppState) => state.weather.error,
  (error: PositionError) => error
);

export const selectCurrentWeather = createSelector(
  (state: AppState) => state.weather.currentWeather,
  (weather: CurrentObs) => weather
);
