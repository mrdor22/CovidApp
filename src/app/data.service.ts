import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
url = 'https://covid19.mathdro.id/api';
  constructor(private http: HttpClient) { }

  getAllData() {
    return this.http.get(this.url)
  }

  getDataByCountry(country: string) {
    return this.http.get(this.url + '/countries/' + country);
  }

  getDailyData() {
    return this.http.get(this.url + '/daily');

  }

  getCountry() {
    return this.http.get(this.url + '/countries')
  }
}
