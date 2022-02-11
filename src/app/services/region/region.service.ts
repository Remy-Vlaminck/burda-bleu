import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private UrlPrefix: string;
  private UrlBase: string;

  constructor(private httpClient: HttpClient) {
    this.UrlPrefix = 'https://';
    this.UrlBase = 'geo.api.gouv.fr';
  }

  getRegionListFromApi() {
    let regionsPath: string = '/regions';
    let url = this.UrlPrefix + this.UrlBase + regionsPath;
    let list: Observable<any> = this.httpClient.get(url);
    return list;
  }
}
