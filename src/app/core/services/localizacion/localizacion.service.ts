import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  constructor(private http: HttpClient) { }
  
  read() {
    return this.http.get<any>(`${environment.vehiculoApi}/localizacion`);
  }
  // Quedo como una solicitud tipo http y los cors la bloquean.
  searchChargeStation(){
    return this.http.get<any>(`${environment.chargeStationApi}/api/EstacionCarga/Consultar`);
  }
}
