import { PositionError } from "@ionic-native/geolocation/ngx";
import { createAction, props } from "@ngrx/store";
import { CurrentObs } from "src/app/core/models/currentObs.model";
import { ForecastDay } from "src/app/core/models/Forecast.model";
import { GeolocationCoordinates } from '../state/weather.state';

const WEATHER_ACTIONS = {
  GET_GEOLOCATION: '[Weather] Get Geolocation',
  GET_GEOLOCATION_SUCCESS: '[Weather] Get Geolocation Success',
  GET_GEOLOCATION_ERROR: '[Weather] Get Geolocation Error',

  GET_CURRENT_WEATHER: '[Weather] Get Current Weather',
  GET_CURRENT_WEATHER_SUCCESS: '[Weather] Get Current Weather Success',
  GET_CURRENT_WEATHER_ERROR: '[Weather] Get Current Weather Error',

  GET_CURRENT_FORECAST: '[Weather] Get Current Forecast',
  GET_CURRENT_FORECAST_SUCCESS: '[Weather] Get Current WeatForecasther Success',
  GET_CURRENT_FORECAST_ERROR: '[Weather] Get Current Forecast Error',

  SELECT_FORECAST_DAY: '[Weather] Select Forecast Day'
};

export const getGeoLocation = createAction(
  WEATHER_ACTIONS.GET_GEOLOCATION
);

export const getGeoLocationSuccess = createAction(
  WEATHER_ACTIONS.GET_GEOLOCATION_SUCCESS,
  props<{coords: GeolocationCoordinates}>()
);

export const getGeoLocationError = createAction(
  WEATHER_ACTIONS.GET_GEOLOCATION_ERROR,
  props<{error: PositionError}>()
);

export const getCurrentWeather = createAction(
  WEATHER_ACTIONS.GET_CURRENT_WEATHER
);

export const getCurrentWeatherSuccess = createAction(
  WEATHER_ACTIONS.GET_CURRENT_WEATHER_SUCCESS,
  props<{ value: CurrentObs }>()
);

export const getCurrentWeatherError = createAction(
  WEATHER_ACTIONS.GET_CURRENT_WEATHER_ERROR,
  props<{error: string}>()
);


export const getForecastDaily = createAction(
  WEATHER_ACTIONS.GET_CURRENT_FORECAST
);

export const getForecastDailySuccess = createAction(
  WEATHER_ACTIONS.GET_CURRENT_FORECAST_SUCCESS,
  props<{forecast: ForecastDay}>()
);

export const getForecastDailyError = createAction(
  WEATHER_ACTIONS.GET_CURRENT_FORECAST_ERROR,
  props<{error: string}>()
);

export const selectForecastDay = createAction(
  WEATHER_ACTIONS.SELECT_FORECAST_DAY,
  props<{id: number}>()
);
