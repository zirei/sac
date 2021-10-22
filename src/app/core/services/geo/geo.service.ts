import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Geo } from '../../models/geo.model';
import { Mail } from '../../models/mail.model';
import { Sms } from '../../models/sms.model';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  constructor(private http: HttpClient) { }

  sendGrua(userData: Geo) {
    return this.http.post<any>(`${environment.geoApi}/truck/request`, userData);
  }

  sendMail(mail: Mail) {
    return this.http.post<any>(`${environment.geoApi}/messages/sendMail`,  mail);
  }

  sendSms(sms: Sms) {
    return this.http.post<any>(`${environment.geoApi}/messages/sendSms`,  sms);
  }

  control() {
    return this.http.get<any>(`${environment.geoApi}/messages/`);
  }
}
