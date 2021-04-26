import { Injectable } from '@angular/core';
import { Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LocationService } from 'src/app/core/services/location.service';
import * as WeatherActions from '../actions/weather.actions';

@Injectable()
export class WeatherEffects {

  getGeoLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getGeoLocation),
      switchMap(() => {
        return this.locationService.getCurrentPosition()
          .pipe(
            map((resp: Geoposition) => {
              return WeatherActions.getGeoLocationSuccess({ coords: resp.coords })
            }),
            catchError((error: PositionError) => of(WeatherActions.getGeoLocationError({ error })))
          )
      }),
      catchError((error: PositionError) => of(WeatherActions.getGeoLocationError({ error })))
    )
  });

  constructor(
    private locationService: LocationService,
    private actions$: Actions) { }
}
