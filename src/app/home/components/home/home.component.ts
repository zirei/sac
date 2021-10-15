import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { LocalizacionService } from 'src/app/core/services/localizacion/localizacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogin: boolean = false
  vehiculos: any[] = []
  user: any;
  currentUser: any;
  
  constructor(
    private localizationService: LocalizacionService,
    private authService: AuthenticationService,
  ) {
    this.getUserStatus();
   }

  ngOnInit(): void {
    this.getVehiculos();
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

  getVehiculos() {
    this.localizationService.read().subscribe((data) => {
      this.vehiculos = data.body
      console.log("vehiculos ->", this.vehiculos)      
    })
    if(this.vehiculos.length >0){
    }else{
      console.log("agregar un loader en el mapa")
      // this.localizationService.readGeo().subscribe((data) => {
      //   this.vehiculos = data.body
      //   console.log("vehiculos ->", this.vehiculos)      
      // })
    }
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
  // makeMarkers(map: any, latitude: any, lon: any): void {


}
