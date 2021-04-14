import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as WeatherActions from '../actions/weather.actions';
import { GeolocationCoordinates } from '../state/weather.state';

@Injectable()
export class WeatherEffects {

  getGeoLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.getGeoLocation),
      switchMap(() => this.geolocation.getCurrentPosition()),
      map((position: Geoposition) => {
        if (position) {
          return WeatherActions.getGeoLocationSuccess({coords: position.coords  as GeolocationCoordinates} );
        }
      })
      // catchError(error => of(WeatherActions.getGeoLocationError({ error }))),
    );
  });
  constructor(private geolocation: Geolocation, private actions$: Actions) { }
}
