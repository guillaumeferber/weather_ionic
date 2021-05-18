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

  getItem = async (key: string) => {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem(key)) || null;
  });
  }

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

   insertItem = async (key: string, value: LocalStorageItem) => {
     const item = this.getItem(key);
     item.then((localItem: LocalStorageItem[]) => {
       const localObject = localItem as LocalStorageItem[] || [];
       const index = localObject.findIndex((val: LocalStorageItem) => val.city_name === value.city_name);
       if (index > -1) {
        localObject[index] = value;
       } else {
        localObject.push(value);
       }
       this.setItem(key, localObject);
     })
  }

  clear = async () => {
    localStorage.clear();
  }

}
