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
    this.chargeStations = []
    // this.chargeStations = [
    //   {
    //     "intIdEstacionCarga": 1,
    //     "strNombre": "Universidad EAFIT",
    //     "dblLatitud": 6.20071428920212,
    //     "dblLongitud": -75.57818157583036,
    //     "blnActivo": true,
    //     "dtmActualiza": "2021-10-16T14:16:25"
    //   },
    //   {
    //     "intIdEstacionCarga": 2,
    //     "strNombre": "Centro Comercial Viva Envigado",
    //     "dblLatitud": 6.17725867798437,
    //     "dblLongitud": -75.59205623166483,
    //     "blnActivo": true,
    //     "dtmActualiza": "2021-10-16T14:16:25"
    //   },
    //   {
    //     "intIdEstacionCarga": 3,
    //     "strNombre": "EDS GNV EPM Exposiciones",
    //     "dblLatitud": 6.23764152517599,
    //     "dblLongitud": -75.57562209889146,
    //     "blnActivo": true,
    //     "dtmActualiza": "2021-10-16T14:16:25"
    //   },
    //   {
    //     "intIdEstacionCarga": 4,
    //     "strNombre": "Centro Comercial Los Molinos",
    //     "dblLatitud": 6.23217144479876,
    //     "dblLongitud": -75.60479671690884,
    //     "blnActivo": true,
    //     "dtmActualiza": "2021-10-16T14:16:25"
    //   },
    //   {
    //     "intIdEstacionCarga": 5,
    //     "strNombre": "Planta Transferencia SOCYA",
    //     "dblLatitud": 6.14189298641102,
    //     "dblLongitud": -75.63188653203966,
    //     "blnActivo": true,
    //     "dtmActualiza": "2021-10-16T14:16:25"
    //   },
    //   {
    //     "intIdEstacionCarga": 6,
    //     "strNombre": "Ciudad del Rio",
    //     "dblLatitud": 6.22383937876495,
    //     "dblLongitud": -75.57220223328183,
    //     "blnActivo": true,
    //     "dtmActualiza": "2021-10-16T14:16:25"
    //   },
    //   {
    //     "intIdEstacionCarga": 12,
    //     "strNombre": "testing",
    //     "dblLatitud": 5.324324,
    //     "dblLongitud": -7.123123,
    //     "blnActivo": true,
    //     "dtmActualiza": "2021-10-21T02:57:11"
    //   },
    //   {
    //     "intIdEstacionCarga": 13,
    //     "strNombre": "Testing2",
    //     "dblLatitud": 1.123123,
    //     "dblLongitud": -2.1231,
    //     "blnActivo": true,
    //     "dtmActualiza": "2021-10-21T03:03:18"
    //   }
    // ],
    this.getUserStatus();
  }

  ngOnInit(): void {
    this.getStation();
    // this.getVehiculos();
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
      console.log("fail")
      if (data != null) {
        this.chargeStations = data
        this.getVehiculos();
      }
    })
  }
}
