import { createSelector } from "@ngrx/store";
import { GeolocationCoordinates, WeatherAppState } from "../state/weather.state";

export const selectCurrentGeoLocation = createSelector(
  (state: WeatherAppState) => state.currentGeoLocation,
  (location: GeolocationCoordinates) => location
);

export const selectError = createSelector(
  (state: WeatherAppState) => state.error,
  (error: string) => error
);
