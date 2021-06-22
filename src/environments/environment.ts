// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    default: 'weatherbit',
    weatherbit: {
      keyProp: 'key',
      key: '5a8ea8f781bd4aadaa9d2c868abe0f06',
      baseUrl: 'https://api.weatherbit.io/v2.0/'
    },
    googleapis: {
      keyProp: 'key',
      key: 'AIzaSyCH9Y4o_SOUGHVOmV_05KA-Q0emg1WD3ho',
      baseUrl: 'api'
    },
    openWeatherMap: {
      keyProp: 'appid',
      key: '9113f85e772949f85e980bac5996f496',
      baseUrl: 'https://api.openweathermap.org/data/2.5/'
    }
  },

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
