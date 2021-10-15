import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../../models/vehiculo.model'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }

  create(vehiculo: Vehiculo) {
    return this.http.post<any>(`${environment.vehiculoApi}/localizacion`, vehiculo);
  }

  read() {
    return this.http.get<any>(`${environment.vehiculoApi}/localizacion`);
  }

  readById(vehiculoId: String) {
    return this.http.get<any>(`${environment.vehiculoApi}/localizacion/${vehiculoId}`);
  }

  update(vehiculo: Vehiculo) {
    return this.http.put<any>(`${environment.vehiculoApi}/localizacion/${vehiculo._id}`, vehiculo)
  }

  delete(id: String) {
    return this.http.delete<any>(`${environment.vehiculoApi}/localizacion/${id}`);
  }
}
