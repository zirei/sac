import { Component, OnInit } from '@angular/core';
import { Mail } from 'src/app/core/models/mail.model';
import { Sms } from 'src/app/core/models/sms.model';
import { User } from 'src/app/core/models/user.model';
import { Vehiculo } from 'src/app/core/models/vehiculo.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { GeoService } from 'src/app/core/services/geo/geo.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { VehiculoService } from 'src/app/core/services/vehiculo/vehiculo.service';

@Component({
  selector: 'app-list-vehiculos',
  templateUrl: './list-vehiculos.component.html',
  styleUrls: ['./list-vehiculos.component.css']
})
export class ListVehiculosComponent implements OnInit {

  listVehiculos: any[];
  user: User;
  mail: Mail;
  sms: Sms;
  currentData: any;
  isLogin: boolean = false;
  isAdmin: boolean = false;
  isSendMessage: boolean = false;
  responseSelected: boolean = true;
  responseUnSelected: boolean = true;
  currentUserID: any = {
    userID: ""
  };
  userName: string = '';


  constructor(
    private vehiculoService: VehiculoService,
    private userService: UserService,
    private messageServices: GeoService,
    private authService: AuthenticationService,
  ) {
    this.user = {
      userID: '',
      _id: '',
      name: '',
      vehiculoId: '',
      cel: '',
      email: '',
    }
    this.listVehiculos = [];
    this.mail = {
      to: '',
      subject: '',
      text: '',
    };
    this.sms = {
      sendTo: '',
      message: ''
    };
    this.getUserStatus();
  }

  ngOnInit(): void {
    this.getVehiculo()
  }
  getUserStatus() {
    this.authService.getUserStatus().subscribe((user) => {
      if (user) {
        this.currentUserID.userID = localStorage.getItem("user_ID") || '';
        this.userName = localStorage.getItem("name") || '';
        this.isLogin = true;
        if (this.currentUserID.userID == "6171359a94420ff3561248b9") {
          this.isAdmin = true;
        }
      } else {
        this.isLogin = false;
      }
    })
  }

  getVehiculo() {
    this.vehiculoService.read().subscribe((data) => {
      this.listVehiculos = data.body
    })
  }

  getUserByID(V_ID: any, seleccion: boolean) {
    this.userService.readById(this.currentUserID.userID).subscribe((user) => {
      this.user = user.body[0];
      if(seleccion){
        this.user.vehiculoId = V_ID;
        this.updateUser();
      }else{
        this.user.vehiculoId = "";
        this.updateUser();
      }
    })
  }

  updateUser() {
    console.log("update ->", this.user)
    this.userService.update(this.user).subscribe(() => {})
  }

  seleccionarVehiculo(vehiculoId: any) {
    this.isSendMessage = false;
    let index = this.listVehiculos.map((vehiculo: any) => vehiculo.userID).indexOf(this.currentUserID.userID)
    this.listVehiculos.map((vehiculo) => {
      if (index != -1 && this.isSendMessage == false) {      
        alert(`Apreciado ${this.userName}, solo puede alquilar un vehiculo a la vez.`)
        this.isSendMessage = true;
      } else {
        if (vehiculo._id === vehiculoId && this.isSendMessage == false) {
          this.getUserByID(vehiculo._id, true);
          let vehiculoData = vehiculo;
          this.currentData = Object.assign(vehiculoData, this.currentUserID);
          this.vehiculoService.update(this.currentData).subscribe(() => {
            alert(`Vehiculo ${this.currentData.vehiculoId} reservado con éxito al user: ${this.userName} con el id: ${this.currentData.userID}`)
          })
          this.mail.to = this.user.email;
          this.mail.subject = `Solicitud de prestamo del vehiculo: ${vehiculo.vehiculoId} aceptada`;
          this.mail.text = `El vehiculo: ${vehiculo.vehiculoId}, modelo: ${vehiculo.modelo} esta a su disposición,  gracias por utilizar nuestros servicios`;    
          this.messageServices.sendMail(this.mail).subscribe(() => {
          })
          if(this.user.cel != ''){
            this.sms.sendTo = this.user.cel;
            this.sms.message = `Solicitud de prestamo del vehiculo: ${vehiculo.vehiculoId} aceptada`;
            this.messageServices.sendSms(this.sms).subscribe(() => {
            })
          }
          this.responseSelected = false;
        }
      }
    })
    if (this.responseSelected && this.isSendMessage == false) {
      alert(`Vehiculo ${vehiculoId} no se pudo reservar ya que pertenecer a un usuario diferente actualmente`)
    }
  }
  unSeleccionarVehiculo(vehiculoId: any) {
    this.listVehiculos.map((vehiculo) => {
      if (vehiculo._id === vehiculoId && vehiculo.userID === this.currentUserID.userID) {
        this.getUserByID(vehiculo._id, false);
        let vehiculoData = vehiculo;
        vehiculoData.userID = ""
        this.vehiculoService.update(vehiculoData).subscribe(() => {
          alert(`Vehiculo ${vehiculo.vehiculoId} ha sido entregado con exito gracias: ${this.userName}`)
        })
        this.mail.to = this.user.email;
        this.mail.subject = `Solicitud de entrega del vehiculo: ${vehiculo.vehiculoId} aceptada`;
        this.mail.text = `El vehiculo: ${vehiculo.vehiculoId}, modelo: ${vehiculo.modelo} ha sido entregado satisfactoriamente, gracias por utilizar nuestros servicios`;
        this.messageServices.sendMail(this.mail).subscribe(() => {})
        if(this.user.cel != ''){
          this.sms.sendTo = this.user.cel;
          this.sms.message = `El vehiculo: ${vehiculo.vehiculoId} ha sido regresado satisfactoriamente`;
          this.messageServices.sendSms(this.sms).subscribe(() => {})
        }
        this.responseUnSelected = false;
      }
    })
    if (this.responseUnSelected) {
      alert(`Vehiculo ${vehiculoId} no se pudo entregar ya que se encuentra reservado actualmente`)
    }
  }

  deleteVehiculo(vehiculoId: any) {
    if (this.isAdmin) {
      this.vehiculoService.delete(vehiculoId).subscribe((response) => {
        this.ngOnInit()
        alert('Vehiculo eliminada correctamente')
      })
    } else {
      alert(`Apreciado ${this.userName} usted no tiene permisos para realizar esta acción`)
    }
  }

  beAdmin(){
    this.isAdmin = true;
  }
}
