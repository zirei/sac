import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    public auth: AngularFireAuth
  ) { }
  async login() {
    const res = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    let token = Object(res.credential).accessToken;
    localStorage.setItem('user', JSON.stringify(res.user))
    localStorage.setItem('accessToken', token)
  }

  async logout() {
    await this.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  }

  getUserStatus() {
    return this.auth.authState
  }
}
