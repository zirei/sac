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
  isRdy: boolean = false
  vehiculos: any[] = []
  chargeStations: any[] = []
  user: any;
  currentUser: any;

  constructor(
    private localizationService: LocalizacionService,
    private authService: AuthenticationService,
  ) {
    this.chargeStations = [],
    this.getUserStatus();
  }

  ngOnInit(): void {
    this.getStation();
  }
  
  getUserStatus() {
    this.authService.getUserStatus().subscribe((user) => {
      if (user) {
        this.user = Object(user.multiFactor).user;
        this.currentUser = user.displayName;
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    })
  }

  getVehiculos() {
    this.localizationService.read().subscribe((data) => {
      this.vehiculos = data.body
      this.isRdy = true;
    })
  }
  getStation() {
    this.localizationService.searchChargeStation().subscribe((data) => {
      this.chargeStations = data
      this.getVehiculos();
    })
  }
}
