import { Injectable } from '@angular/core';
import { Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
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
@Injectable()
export class WeatherEffects {

  getGeoLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getGeoLocation),
      switchMap(() => {
        const localItem = this.localStorageService.getItemPlain('weather') as CurrentObs[];
        if (localItem && localItem.length && Math.floor(Date.now() / 1000) < (localItem[0].ts + BUSINESS.DEFAULT_TIMEOUT_REQUEST)) {
          return [WeatherActions.getCurrentWeatherSuccess({ value: localItem[0] })];
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
                  tap((resp: CurrentObs[]) => this.localStorageService.insertItem('weather', {...resp[0], id: this.guidService.uuidv4()} as LocalStorageItem)),
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
        const localItem = this.localStorageService.getItemPlain('weather') as CurrentObs[];
        if (localItem && localItem.length && Math.floor(Date.now() / 1000) < (localItem[0].ts + BUSINESS.DEFAULT_TIMEOUT_REQUEST)) {
          _resp = { latitude: localItem[0].lat, longitude: localItem[0].lon };
        }
      }
      return this.weatherService.getDailyForecast({ lat: _resp.latitude, lon: _resp.longitude } as Query)
        .pipe(
          tap((forecast: ForecastDay) => this.localStorageService.insertItem('forecast', { ...forecast, id: this.guidService.uuidv4() } as LocalStorageItem)),
          map((forecast: ForecastDay) => WeatherActions.getForecastDailySuccess({ forecast })),
          catchError((error: string) => of(WeatherActions.getForecastDailyError({ error })))
        )
      }),
      catchError((error: string) => of(WeatherActions.getForecastDailyError({ error })))
  ));

  getLocation$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.getLocation),
    switchMap((action: { query?: Query }) => {
      const currentLocations = this.localStorageService.getItemPlain('locations') as LocalStorageItem[];
      if (currentLocations.length) {
        currentLocations.map((currentLocation: LocalStorageItem) => {
          currentLocation.values.map((value: CurrentObs) => {
            return this.weatherService.getCurrentWeather({'city': `${value.city_name}, ${value.country_code}`} as Query)
            .pipe(
              tap((result: CurrentObs[]) => this.storeInLocationStorage(result)),
              map((result: CurrentObs[]) => WeatherActions.getLocationSuccess({ location: result })),
              catchError((error: string) => of(WeatherActions.getLocationError({ error })))
              );
            });
          });
      } else {
        return this.weatherService.getCurrentWeather(action.query)
        .pipe(
          tap((result: CurrentObs[]) => this.storeInLocationStorage(result)),
          map((result: CurrentObs[]) => WeatherActions.getLocationSuccess({ location: result })),
          catchError((error: string) => of(WeatherActions.getLocationError({ error })))
        );
      }
      }),
    catchError((error: string) => of(WeatherActions.getLocationError({ error })))
  ));


  storeInLocationStorage = (result: CurrentObs[]): void => {
    let updatedCurrentLocations: LocalStorageItem;
    const currentLocations = this.localStorageService.getItemPlain('locations') as LocalStorageItem;
    if (!currentLocations) {
      updatedCurrentLocations = {
        values: [...result],
        id: this.guidService.uuidv4()
      }
    } else {
      const newValues = currentLocations.values as CurrentObs[];
      const newResult = result[0] as CurrentObs;
      const index = newValues.findIndex(item => item.city_name === newResult.city_name);
      if (index > -1) {
        newValues[index] = newResult;
      } else {
        newValues.push(newResult);
      }
      updatedCurrentLocations = {
        ...currentLocations,
        values: newValues
      } as LocalStorageItem;
    }
    this.localStorageService.insertItem('locations', updatedCurrentLocations);
  }

  constructor(
    private store: Store<AppState>,
    private guidService: GuidService,
    private localStorageService: LocalStorageService,
    private weatherService: OpenWeatherMapAPIService,
    private locationService: LocationService,
    private actions$: Actions) { }
}
