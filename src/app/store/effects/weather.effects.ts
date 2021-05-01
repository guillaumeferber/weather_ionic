import { Injectable } from '@angular/core';
import { Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
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
@Injectable()
export class WeatherEffects {

  getGeoLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getGeoLocation),
      switchMap(() => {
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
                  map((observer: CurrentObs[]) => {
                    const obs = observer[0];
                    this.localStorageService.insertItem('weather', {...obs,id: this.guidService.uuidv4()} as LocalStorageItem);
                    return WeatherActions.getCurrentWeatherSuccess({ value: obs })
                  }));
            }),
            catchError((error: PositionError) => of(WeatherActions.getGeoLocationError({ error })))
          )
      }),
      catchError((error: PositionError) => of(WeatherActions.getGeoLocationError({ error })))
    )
  });

  getForecastDaily$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getForecastDaily),
      concatMap(() => of([]).pipe(withLatestFrom(this.store.pipe(select(WeatherSelectors.selectCurrentGeoLocation))))),
      map(([action, resp]: [any[], GeolocationCoordinates]) => {
        console.log(resp);

        this.weatherService.getDailyForecast({
          lat: resp.latitude,
          lon: resp.longitude
        } as Query)
          .pipe(
            map((forecast: ForecastDay) => {
              this.localStorageService.insertItem('forecast', { ...forecast, id: this.guidService.uuidv4() } as LocalStorageItem);
              return WeatherActions.getForecastDailySuccess({ forecast });
            }));
        return WeatherActions.getGeoLocationSuccess({
          coords: {
            longitude: resp.longitude,
            latitude: resp.latitude
          }
        })
      }),
      catchError((error: string) => of(WeatherActions.getForecastDailyError({ error })))
    )
  });

  constructor(
    private store: Store<AppState>,
    private guidService: GuidService,
    private localStorageService: LocalStorageService,
    private weatherService: OpenWeatherMapAPIService,
    private locationService: LocationService,
    private actions$: Actions) { }
}
