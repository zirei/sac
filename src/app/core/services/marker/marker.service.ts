import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from 'src/app/popup.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(
    private http: HttpClient,
    private popupService: PopupService
    ) {}

  makeMarkers(map: any, latitude: any, lon: any, icon: any, name: any): void {
    const marker = L.marker([latitude, lon], {icon});
    marker.bindPopup(this.popupService.makeNamePopup(name)).addTo(map);
  }
}