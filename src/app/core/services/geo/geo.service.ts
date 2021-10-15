import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Geo } from '../../models/geo.model';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  constructor(private http: HttpClient) { }

  create(vehiculo: Geo) {
    return this.http.post<any>(`${environment.geoApi}/rbgeoback`, vehiculo);
  }

  read() {
    return this.http.get<any>(`${environment.geoApi}/rbgeoback`);
  }

  readById(vehiculoId: String) {
    return this.http.get<any>(`${environment.geoApi}/rbgeoback/${vehiculoId}`);
  }

  update(vehiculo: Geo) {
    return this.http.put<any>(`${environment.geoApi}/rbgeoback/${vehiculo._id}`, vehiculo)
  }

  delete(id: String) {
    return this.http.delete<any>(`${environment.geoApi}/rbgeoback/${id}`);
  }
}
