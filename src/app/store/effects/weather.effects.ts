import { Injectable } from '@angular/core';
import { Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CurrentObs } from 'src/app/core/models/currentObs.model';
import { ForecastDay } from 'src/app/core/models/Forecast.model';
import { Query } from 'src/app/core/models/query.model';
import { GuidService } from 'src/app/core/services/guid.service';
import { LocalStorageItem, LocalStorageService } from 'src/app/core/services/localStorage.service';
import { LocationService } from 'src/app/core/services/location.service';
import { OpenWeatherMapAPIService } from 'src/app/core/services/open-weather-map.service';
import * as WeatherActions from '../actions/weather.actions';
import * as WeatherSelectors from '../selectors/weather.selectors';
import { AppState, GeolocationCoordinates } from '../state/weather.state';
import { BUSINESS } from 'src/app/core/constants/business.constants';
import { STORAGE } from 'src/app/core/constants/storage.constants';
@Injectable()
export class WeatherEffects {

  getGeoLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getGeoLocation),
      switchMap(() => {
        const localItem = this.localStorageService.getItemPlain(STORAGE.END_POINTS.WEATHER) as CurrentObs;
        if (localItem && Math.floor(Date.now() / 1000) < (localItem.ts + BUSINESS.DEFAULT_TIMEOUT_REQUEST)) {
          return [WeatherActions.getCurrentWeatherSuccess({ value: localItem })];
        }
        return this.locationService.getCurrentPosition()
          .pipe(
            map((resp: Geoposition) => WeatherActions.getGeoLocationSuccess({
                coords: {
                  longitude: resp.coords.longitude,
                  latitude: resp.coords.latitude
                }
            })),
            switchMap((resp: {coords: GeolocationCoordinates}) => {
              return this.weatherService.getCurrentWeather({
                lat: resp.coords.latitude,
                lon: resp.coords.longitude
              } as Query)
                .pipe(
                  tap((resp: CurrentObs[]) => this.localStorageService.insertItem(STORAGE.END_POINTS.WEATHER, {...resp[0], id: this.guidService.uuidv4()} as LocalStorageItem)),
                  map((observer: CurrentObs[]) => WeatherActions.getCurrentWeatherSuccess({ value: observer[0] })));
            }),
            catchError((error: PositionError) => of(WeatherActions.getGeoLocationError({ error })))
          )
      }),
      catchError((error: PositionError) => of(WeatherActions.getGeoLocationError({ error })))
    )
  });

  getDailyForecast = createEffect(() => this.actions$.pipe(
      ofType(WeatherActions.getForecastDaily),
      concatLatestFrom(() => this.store.select(WeatherSelectors.selectCurrentGeoLocation)),
      switchMap(([action, resp]: [TypedAction<string>, GeolocationCoordinates]) => {
        let _resp = resp as GeolocationCoordinates;
        if (!_resp) {
          const localItem = this.localStorageService.getItemPlain(STORAGE.END_POINTS.WEATHER) as CurrentObs[];
          if (localItem && localItem.length && Math.floor(Date.now() / 1000) < (localItem[0].ts + BUSINESS.DEFAULT_TIMEOUT_REQUEST)) {
            _resp = { latitude: localItem[0].lat, longitude: localItem[0].lon };
          }
        }
        return this.weatherService.getDailyForecast({ lat: _resp.latitude, lon: _resp.longitude } as Query)
          .pipe(
            tap((forecast: ForecastDay) => this.localStorageService.insertItem(STORAGE.END_POINTS.FORECAST, { ...forecast, id: this.guidService.uuidv4() } as LocalStorageItem)),
            map((forecast: ForecastDay) => WeatherActions.getForecastDailySuccess({ forecast })),
            catchError((error: string) => of(WeatherActions.getForecastDailyError({ error })))
          )
      }),
      catchError((error: string) => of(WeatherActions.getForecastDailyError({ error })))
  ));

  getLocation$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.getLocation),
    mergeMap((action: { query?: Query }) => {
      if (!!action.query) {
        return this.weatherService.getCurrentWeather(action.query)
        .pipe(
          tap((result: CurrentObs[]) => this.storeInLocationStorage(result)),
          map((result: CurrentObs[]) => WeatherActions.getLocationSuccess({ location: result })),
          catchError((error: string) => of(WeatherActions.getLocationError({ error })))
          );
      } else {
        const currentLocationList = this.localStorageService.getItem(STORAGE.END_POINTS.LOCATIONS);
        currentLocationList.then((currentLocations: LocalStorageItem[]) => {
          return currentLocations.map((location: LocalStorageItem) => {
            return location.values.map((value: CurrentObs) => {
              return this.weatherService.getCurrentWeather({
                lat: value.lat,
                lon: value.lon,
              } as Query)
                .pipe(
                  tap((result: CurrentObs[]) => this.storeInLocationStorage(result)),
                  map((result: CurrentObs[]) => WeatherActions.getLocationSuccess({ location: result })),
                  catchError((error: string) => of(WeatherActions.getLocationError({ error })))
                );
            });
          })
        }).catch((error) => console.warn(error));
      }
    }),
    catchError((error: string) => of(WeatherActions.getLocationError({ error })))
  ));


  private _storeInLocationStorage = (result: CurrentObs[]): void => {
    let updatedCurrentLocations: LocalStorageItem[] = [];
    const currentLocations = this.localStorageService.getItemPlain(STORAGE.END_POINTS.LOCATIONS) as LocalStorageItem[];
    if (!currentLocations || !currentLocations.length) {
      updatedCurrentLocations.push({
        values: [...result],
        id: this.guidService.uuidv4()
      });
    } else {
      const newCurrentLocations = currentLocations.map((currentLocation: LocalStorageItem) => {
        const newValues = currentLocation.values as CurrentObs[];
        const newResult = result[0] as CurrentObs;

        const index = newValues.findIndex(item => item.city_name === newResult.city_name);
        if (index > -1) {
          newValues[index] = newResult;
        } else {
          newValues.push(newResult);
        }
        return {
          ...currentLocation,
          values: newValues
        }
      });
      updatedCurrentLocations = [...newCurrentLocations] as LocalStorageItem[];
    }
    this.localStorageService.insertItem('locations', updatedCurrentLocations);
  };
  public get storeInLocationStorage() {
    return this._storeInLocationStorage;
  }
  public set storeInLocationStorage(value) {
    this._storeInLocationStorage = value;
  }

  constructor(
    private store: Store<AppState>,
    private guidService: GuidService,
    private localStorageService: LocalStorageService,
    private weatherService: OpenWeatherMapAPIService,
    private locationService: LocationService,
    private actions$: Actions) { }
}
