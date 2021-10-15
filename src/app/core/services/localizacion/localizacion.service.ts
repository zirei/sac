import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  constructor(private http: HttpClient) { }
  
  read() {
    console.log("i{m here")
    return this.http.get<any>(`${environment.vehiculoApi}/localizacion`);
  }
  // readGeo() {
  //   console.log("i{m GEOOO")
  //   return this.http.get<any>(`${environment.geoApi}/rbgeoback`);
  // }
}
