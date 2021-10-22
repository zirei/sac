import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http: HttpClient) {
  }

  makeMarkers(map: any, latitude: any, lon: any, icon: any): void {
    const marker = L.marker([latitude, lon], {icon});
    marker.addTo(map);
  }
}