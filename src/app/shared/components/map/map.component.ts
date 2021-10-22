import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../../core/services/marker/marker.service';

// const iconUrl = 'assets/marker-icon.png';
// const iconUrl2 = 'assets/images/estacion-de-carga.png';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/images/coche-electrico.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconCar = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
const iconStation = L.icon({
  iconRetinaUrl,
  iconUrl: 'assets/images/estacion-de-carga.png',
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
// L.Marker.prototype.options.icon = iconCar;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  @Input() myLocation: any[] = [];
  @Input() myChargeStation: any[] = [];
  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [6.232503732999733, -75.60400297398104],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this.addMarkers()
  }

  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
  }
  
  addMarker(latitude: any, longitude: any) {
    this.markerService.makeMarkers(this.map, latitude, longitude, iconCar);
  }
  addMarkerStation(latitude: any, longitude: any) {
    this.markerService.makeMarkers(this.map, latitude, longitude, iconStation);
  }

  addMarkers() {
    this.myLocation.map((point) => {
      this.addMarker(point.latitude, point.longitude)
    })
    this.myChargeStation.map((point) => {
      // console.log("stations ->" , point);
      this.addMarkerStation(point.dblLatitud, point.dblLongitud)
    })
  }
}