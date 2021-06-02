import { PositionError } from "@ionic-native/geolocation/ngx";
import { createSelector } from "@ngrx/store";
import { STORAGE } from "src/app/core/constants/storage.constants";
import { CurrentObs } from "src/app/core/models/currentObs.model";
import { Forecast, ForecastDay } from "src/app/core/models/Forecast.model";
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

export const selectCurrentForecastDaily = createSelector(
  (state: AppState) => state.weather.forecastDaily,
  (forecast: ForecastDay) => forecast
);

export const selectSelectedForecastDay = createSelector(
  (state: AppState) => state.weather.selectedForecastDaily,
  (forecast: Forecast) => forecast
);

export const selectLocations = createSelector(
  (state: AppState) => state.weather.locations,
  (locations: CurrentObs[]) => {
    const locs = localStorage.getItem(STORAGE.END_POINTS.LOCATIONS);
    if (locs) {
      const parsedLocs = JSON.parse(locs);
      if (parsedLocs?.length) {
        return locations.length ? [...parsedLocs[0].values, locations] : parsedLocs[0].values;
      }
    }
    return locations;
  }
);
