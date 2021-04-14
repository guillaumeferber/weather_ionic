import { Action, createReducer, on } from "@ngrx/store";
import { GeolocationCoordinates, WeatherAppState } from "../state/weather.state";
import * as WeatherActions from '../actions/weather.actions';
const initialState: WeatherAppState = {
  currentGeoLocation: null,
  error: null
};


const addGeoLocation = (state: WeatherAppState, coords: GeolocationCoordinates) => {
  console.log(coords);
  return {
    ...state,
    currentGeoLocation: coords as GeolocationCoordinates,
    error: initialState.error
  }
}

const errorGeoLocation = (state: WeatherAppState) => ({
  ...state,
  error: 'Geo location could not be found'
});

const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.getGeoLocationSuccess, (state: WeatherAppState, {coords}: {coords: GeolocationCoordinates}) => addGeoLocation(state, coords)),
  on(WeatherActions.getGeoLocationError, (state: WeatherAppState) => errorGeoLocation(state)),
);

export function reducer(state: WeatherAppState | undefined, action: Action) {
  return weatherReducer(state, action);
}
