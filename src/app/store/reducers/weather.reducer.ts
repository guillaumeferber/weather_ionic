import { Action, createReducer, on } from "@ngrx/store";
import { GeolocationCoordinates, WeatherAppState } from "../state/weather.state";
import * as WeatherActions from '../actions/weather.actions';
import { PositionError } from "@ionic-native/geolocation/ngx";
import { CurrentObs } from "src/app/core/models/currentObs.model";
const initialState: WeatherAppState = {
  currentGeoLocation: null,
  error: null,
  loading: false
};

const getGeoLocation = (state: WeatherAppState) => ({
  ...state,
  loading: true
});


const getGeoLocationSuccess = (state: WeatherAppState, coords: GeolocationCoordinates) => {
  return {
    ...state,
    currentGeoLocation: coords,
    error: initialState.error,
    loading: initialState.loading
  }
}

const getGeoLocationError = (state: WeatherAppState, error: PositionError) => ({
  ...state,
  error,
  loading: initialState.loading
});

const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.getGeoLocation,
    (state: WeatherAppState) => getGeoLocation(state)),
  on(WeatherActions.getGeoLocationSuccess,
    (state: WeatherAppState, { coords }: { coords: GeolocationCoordinates }) => getGeoLocationSuccess(state, coords)),
  on(WeatherActions.getGeoLocationError,
    (state: WeatherAppState, { error }: { error: PositionError }) => getGeoLocationError(state, error)),
);

export function reducer(state: WeatherAppState | undefined, action: Action) {
  return weatherReducer(state, action);
}
