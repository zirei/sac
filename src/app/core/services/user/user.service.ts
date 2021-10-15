import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  create(user: User) {
    return this.http.post<any>(`${environment.userApi}/user`, user);
  }

  read() {
    return this.http.get<any>(`${environment.userApi}/user`);
  }

  readById(userID: String) {
    return this.http.get<any>(`${environment.userApi}/user/${userID}`);
  }

  update(user: User) {
    return this.http.put<any>(`${environment.userApi}/user/${user._id}`, user)
  }

  delete(id: String) {
    return this.http.delete<any>(`${environment.userApi}/user/${id}`);
  }
}
