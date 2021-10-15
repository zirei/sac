import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  user: any;
  isLogin: boolean = false;
  currentUser: any;

  constructor(
    private authService: AuthenticationService,
  ) {
    this.getUserStatus();
  }

  ngOnInit(): void {
  }
  getUserStatus() {
    this.authService.getUserStatus().subscribe((user) => {
      if (user) {
        this.user = Object(user.multiFactor).user;
        this.currentUser = user.displayName;
        console.log(user);
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    })
  }
  logIn() {
    this.authService.login();
    alert(`Bienvenido: ${this.currentUser}`)
  }

  logOut() {
    alert(`Hasta Pronto: ${this.currentUser}`)
    this.authService.logout();
    this.user = ''
  }

}
