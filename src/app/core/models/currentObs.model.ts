export interface CurrentObsGroup {
    count: number,
    data: CurrentObs[];
}
export interface Weather {
  code: number;
  description: string;
  icon: string;
}

export interface CurrentObs {
  city_name?: string; // City name (closest)
  state_code?: string; // State abbreviation
  country_code?: string; // Country abbreviation
  timezone?: string; // Local IANA time zone
  lat?: number; // Latitude
  lon?: number; // Longitude
  station?: string; // Source Station ID
  vis?: number; // Visibility - default (M)
  rh?: number; // Relative humidity (%)
  dewpt?: number; // Dew point temperature - default (C)
  wind_dir?: number; // Wind direction (degrees)
  wind_cdir?: string; // Cardinal wind direction
  wind_cdir_full?: string; // Cardinal wind direction (text)
  wind_spd?: number; // Wind speed - Default (m/s)
  temp?: number; // Temperature - Default (C)
  app_temp?: number; // Apparent temperature - Default (C)
  clouds?: number; // Cloud cover (%)
  weather?: Weather;
  datetime?: string; // Cycle Hour (UTC) of observation
  ob_time?: string; // Full time (UTC) of observation (YYYY-MM-DD HH:MM)
  ts?: number; // Unix Timestamp
  sunrise?: string; // Time (UTC) of Sunrise (HH:MM)
  sunset?: string; // Time (UTC) of Sunset (HH:MM)
  slp?: number; // Mean sea level pressure in millibars (mb)
  pres?: number; // Pressure (mb)
  aqi?: number; // Air quality index (US EPA standard 0 to +500)
  uv?: number; // UV Index
  solar_rad?: number; // Estimated solar radiation (W/m^2)
  ghi?: number; // Global horizontal irradiance (W/m^2)
  dni?: number; // Direct normal irradiance (W/m^2)
  dhi?: number; // Diffuse horizontal irradiance (W/m^2)
  elev_angle?: number; // Current solar elevation angle (Degrees)
  hour_angle?: number; // Current solar hour angle (Degrees)
  pod?: string; // Part of the day (d = day, n = night)
  precip?: number; // Precipitation in last hour - Default (mm)
  snow?: number; // Snowfall in last hour - Default (m
}
