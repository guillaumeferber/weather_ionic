import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as WeatherReducer from './reducers/weather.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { WeatherEffects } from './effects/weather.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({ weather: WeatherReducer.reducer }),
    EffectsModule.forRoot([WeatherEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      features: {
        pause: false,
        lock: true,
        persist: true
      }
    })
  ],
  exports: [EffectsModule, StoreModule]
})
export class AppStoreModule { }
