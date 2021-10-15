import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/core/models/vehiculo.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { VehiculoService } from 'src/app/core/services/vehiculo/vehiculo.service';

@Component({
  selector: 'app-list-vehiculos',
  templateUrl: './list-vehiculos.component.html',
  styleUrls: ['./list-vehiculos.component.css']
})
export class ListVehiculosComponent implements OnInit {

  listVehiculos: any[];
  user: any;
  currentData: any;
  isLogin: boolean = false;
  responseSelected: boolean = true;
  responseUnSelected: boolean = true;
  currentUserID: any = {
    userId: ""
  };

  constructor(
    private vehiculoService: VehiculoService,
    private authService: AuthenticationService,
  ) {
    this.listVehiculos = []
    this.getUserStatus();
  }

  ngOnInit(): void {
    this.getVehiculo()
  }
  getUserStatus() {
    this.authService.getUserStatus().subscribe((user) => {
      if (user) {
        this.user = Object(user.multiFactor).user;
        console.log("list ->", user);
        this.currentUserID.userId = user.email
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    })
  }

  getVehiculo() {
    this.vehiculoService.read().subscribe((data) => {
      this.listVehiculos = data.body
      console.log(this.listVehiculos)
    })
  }

  seleccionarVehiculo(vehiculoId: any) {
    this.listVehiculos.map((vehiculo) => {
      if (vehiculo._id === vehiculoId) {
        console.log("DONE")
        let vehiculoData = vehiculo;
        this.currentData = Object.assign(vehiculoData, this.currentUserID);
        this.vehiculoService.update(this.currentData).subscribe(() => {
          alert(`Vehiculo ${this.currentData.vehiculoId} reservado con éxito al user: ${this.currentData.userId}`)
        })
        this.responseSelected = false;
      }
    })
    if (this.responseSelected) {
      alert(`Vehiculo ${vehiculoId} no se pudo reservar ya que pertenecer a un usuario diferente actualmente`)
    }
  }
  unSeleccionarVehiculo(vehiculoId: any) {
    this.listVehiculos.map((vehiculo) => {
      if (vehiculo._id === vehiculoId && vehiculo.userId === this.currentUserID.userId) {
        console.log("remove")
        let vehiculoData = vehiculo;
        vehiculoData.userId = ""
        console.log("remove ->", vehiculoData)
        this.vehiculoService.update(vehiculoData).subscribe(() => {
          alert(`Vehiculo ${vehiculo.vehiculoId} ha sido entregado con exito gracias: ${this.currentUserID.userId}`)
        })
        this.responseUnSelected = false;
      }
    })
    if (this.responseUnSelected) {
      alert(`Vehiculo ${vehiculoId} no se pudo entregar ya que se encuentra reservado actualmente`)
    }
  }

  deleteVehiculo(vehiculoId: any) {
    this.vehiculoService.delete(vehiculoId).subscribe((response) => {
      this.ngOnInit()
      alert('Vehiculo eliminada correctamente')
    })
  }

}
