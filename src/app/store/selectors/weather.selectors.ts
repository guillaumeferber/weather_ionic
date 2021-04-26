import { PositionError } from "@ionic-native/geolocation/ngx";
import { createSelector } from "@ngrx/store";
import { AppState, GeolocationCoordinates } from "../state/weather.state";

export const selectCurrentGeoLocation = createSelector(
  (state: AppState) => state.weather.currentGeoLocation,
  (location: GeolocationCoordinates) => location
);

export const selectError = createSelector(
  (state: AppState) => state.weather.error,
  (error: PositionError) => error
);
