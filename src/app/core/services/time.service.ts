import { Injectable } from '@angular/core';
import { CurrentObs } from '../models/currentObs.model';

@Injectable({providedIn: 'root'})
export class TimeService {
  constructor() { }
  static getUTCTimeFromDate(data: CurrentObs, time: string): string {
    const _d = data.datetime.split(':')[0].split('-');
    const _t = time.split(':');
    const y = _d[0];
    const m = _d[1];
    const d = _d[2];
    return y.toString();
  }

}
