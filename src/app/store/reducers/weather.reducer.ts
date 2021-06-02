import { Action, createReducer, on } from "@ngrx/store";
import { GeolocationCoordinates, WeatherAppState } from "../state/weather.state";
import * as WeatherActions from '../actions/weather.actions';
import { PositionError } from "@ionic-native/geolocation/ngx";
import { CurrentObs } from "src/app/core/models/currentObs.model";
import { ForecastDay } from "src/app/core/models/Forecast.model";
import { of, timer } from "rxjs";
import { filter } from "rxjs/operators";
import { STORAGE } from "src/app/core/constants/storage.constants";

const initialState: WeatherAppState = {
  currentGeoLocation: null,
  currentWeather: null,
  forecastDaily: null,
  locations: [],
  selectedForecastDaily: null,
  error: null,
  loading: false
};

const getGeoLocation = (state: WeatherAppState) => ({
  ...state,
  loading: true
});

const getLocationSuccess = (state: WeatherAppState, location: CurrentObs[]) => {
  let udpatedLocations = [...state.locations, ...location] as CurrentObs[];
  const localLocations = localStorage.getItem(STORAGE.END_POINTS.LOCATIONS);
  console.log(localLocations);

  if (!localLocations) {
    return {
      ...state,
      locations: udpatedLocations
    }
  }
  const parsedLocs = JSON.parse(localLocations);
  if (parsedLocs?.length) {
    udpatedLocations = [...parsedLocs[0].values, location];
  }
  return {
    ...state,
    locations: udpatedLocations
  }
};

const getLocationError = (state: WeatherAppState, error: string) => ({
  ...state,
  error,
  loading: initialState.loading
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

const getCurrentWeatherSuccess = (state: WeatherAppState, value: CurrentObs) => ({
  ...state,
  currentWeather: value,
  currentGeoLocation: {
    longitude: value.lon,
    latitude: value.lat
  },
  error: initialState.error,
  loading: initialState.loading
});

const getForecastDailySuccess = (state: WeatherAppState, forecast: ForecastDay) => ({
  ...state,
  forecastDaily: forecast,
  error: initialState.error,
  loading: initialState.loading
});

const selectForecastDay = (state: WeatherAppState, id: number) => ({
  ...state,
  selectedForecastDaily: state.forecastDaily.data[id]
})

const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.getGeoLocation,
    (state: WeatherAppState) => getGeoLocation(state)),
  on(WeatherActions.getGeoLocationSuccess,
    (state: WeatherAppState, { coords }: { coords: GeolocationCoordinates }) => getGeoLocationSuccess(state, coords)),
  on(WeatherActions.getGeoLocationError,
    (state: WeatherAppState, { error }: { error: PositionError }) => getGeoLocationError(state, error)),
  on(WeatherActions.getCurrentWeatherSuccess,
    (state: WeatherAppState, { value }: { value: CurrentObs }) => getCurrentWeatherSuccess(state, value)),
  on(WeatherActions.getForecastDailySuccess,
    (state: WeatherAppState, { forecast }: { forecast: ForecastDay }) => getForecastDailySuccess(state, forecast)),
  on(WeatherActions.selectForecastDay,
    (state: WeatherAppState, { id }: { id: number }) => selectForecastDay(state, id)),
  on(WeatherActions.getLocationSuccess,
    (state: WeatherAppState, { location }: { location: CurrentObs[] }) => getLocationSuccess(state, location)),
  on(WeatherActions.getLocationError,
    (state: WeatherAppState, { error }: { error: string }) => getLocationError(state, error)),
);

export function reducer(state: WeatherAppState | undefined, action: Action) {
  return weatherReducer(state, action);
}
