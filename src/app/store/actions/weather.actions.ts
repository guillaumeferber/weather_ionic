import { PositionError } from "@ionic-native/geolocation/ngx";
import { createAction, props } from "@ngrx/store";
import { CurrentObs } from "src/app/core/models/currentObs.model";
import { GeolocationCoordinates } from '../state/weather.state';

const WEATHER_ACTIONS = {
  GET_GEOLOCATION: '[Weather] Get Geolocation',
  GET_GEOLOCATION_SUCCESS: '[Weather] Get Geolocation Success',
  GET_GEOLOCATION_ERROR: '[Weather] Get Geolocation Error',
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
