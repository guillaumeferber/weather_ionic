import { Injectable } from '@angular/core';
import { CurrentObs } from '../models/currentObs.model';
export interface LocalStorageItem {
  id: string;
  city_name?: string;
  values?: any | CurrentObs[];
}
@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() { }

  getItem = async (key: string) => await Promise.resolve().then(() => JSON.parse(localStorage.getItem(key)) || null);

  getItemPlain = (key: string) => {
    return JSON.parse(localStorage.getItem(key)) || null;
  }

  setItem = async (key: string, value: LocalStorageItem | LocalStorageItem[]) => {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  delete = async (key: string) => {
    localStorage.removeItem(key);
  }

  insertItem = async (key: string, value: LocalStorageItem | LocalStorageItem[]) => {
    this.delete(key);
    this.setItem(key, value);
  }

  clear = async () => {
    localStorage.clear();
  }

}
