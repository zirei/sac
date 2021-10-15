import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http: HttpClient) {
  }

  makeMarkers(map: any, latitude: any, lon: any): void {
    const marker = L.marker([latitude, lon]);
    marker.addTo(map);
  }
}