import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { from, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LocationService {
  constructor(private geolocation: Geolocation) { }

    public getCurrentPosition(): Observable<Geoposition>{
        return from<Promise<Geoposition>>(this.geolocation.getCurrentPosition());
    }

    public watchPosition = () => this.geolocation.watchPosition();

}
