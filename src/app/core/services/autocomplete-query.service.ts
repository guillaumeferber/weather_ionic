import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AutocompleteQueryService {
  constructor(private http: HttpClient) { }
  public getAutocompleteQueryResult = (query: string): Observable<any> => {
    const params = new HttpParams()
      .append('input', encodeURIComponent(query))
      .append('type', '(cities)');
    return this.http.get<any>(environment.api.googleapis.baseUrl, { params })
  }

}
