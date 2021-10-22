import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Geo } from 'src/app/core/models/geo.model';
import { User } from 'src/app/core/models/user.model';
import { Vehiculo } from 'src/app/core/models/vehiculo.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { GeoService } from 'src/app/core/services/geo/geo.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { VehiculoService } from 'src/app/core/services/vehiculo/vehiculo.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  currentUser: any;
  isLogin: boolean = false;
  user: User;
  user_ID: any;
  userID: any;
  profileImage: any;

  grua: Geo
  listVehiculos: any[];
  vehiculo: Vehiculo;
  vehiculoId: any;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private userService: UserService,
    private vehiculoService: VehiculoService,
    private gruaService: GeoService,
  ) {
    this.user = {
      userID: '',
      _id: '',
      name: '',
      vehiculoId: '',
      cel: '',
      email: '',
    },
      this.vehiculo = {
        vehiculoId: '',
        latitude: 0,
        longitude: 0,
        color: '',
        modelo: '',
      },
      this.grua = {
        clientName: '',
        currentLocation: '',
        phoneNumber: ''
      }
    this.listVehiculos = [];
    this.vehiculoId = '',
      this.getUserStatus();
  }
  ngOnInit(): void {
  }

  getUserStatus() {
    this.authService.getUserStatus().subscribe((currentUser) => {
      if (currentUser) {
        this.currentUser = Object(currentUser.multiFactor).currentUser;
        this.user.userID = currentUser.uid || 'false';
        this.user.email = currentUser.email || '';
        this.user.name = currentUser.displayName || '';
        this.profileImage = currentUser.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREbUbUht8fgQDk5-RIP0k_7co1Y1rSlfzDYA&usqp=CAU';
        this.isLogin = true
        if (this.user.userID != 'false') {
          //encontrar usuario
          this.getUserID();
        }
      } else {
        this.isLogin = false
      }
    })
  }

  getUserID() {
    this.user_ID = this.user._id;
    this.userID = this.user.userID;
    this.getUser();
  }
  getUser() {
    this.userService.read().subscribe((user) => {
      let index = user.body.map((usuario: any) => usuario.userID).indexOf(this.userID)
      if (index != -1) {
        let element = user.body.splice(index, 1);
        this.user = element[0];
        localStorage.setItem("user_ID", element[0]._id);
        localStorage.setItem("name", element[0].name);
      } else {
        delete this.user['_id']
        this.createUser();
      }
    })
  }
  createUser() {
    this.userService.create(this.user).subscribe((response) => {
      alert(`El usuario: ${response.body.name} con el id: ${response.body.userID} fue creado con éxito`)
    })
  }
  updateUser() {
    this.userService.update(this.user).subscribe(() => {
      alert(`Información del usuario ${this.user.name} actualizado con éxito`)
    })
  }
  messaje() {
    this.grua.clientName = this.user.name;
    this.grua.phoneNumber = this.user.cel;
    if(this.grua.phoneNumber != ''){
      this.getVehiculoID();
    }else{
      alert(`Apreciado ${this.grua.clientName} debe disponer de una linea movil, para tener acceso al servicio de grúa, ya que es el medio que utilizaremos para mantenerlo informado`)
    }
  }
  getVehiculoID() {
    this.vehiculoId = this.user.vehiculoId;
    if (this.vehiculoId != (null || "")) {
      this.getVehiculo();
    } else {
      alert(`Actualmente no tiene ningun vehiculo alquilado, por ello no tiene acceso al servicio de grúa.`)
    }
  }
  getVehiculo() {
    this.vehiculoService.read().subscribe((data) => {
      this.listVehiculos = data.body
      let index = data.body.map((vehiculo: any) => vehiculo._id).indexOf(this.vehiculoId)
      if (index != -1) {
        let element = data.body.splice(index, 1);
        this.grua.currentLocation = `${element[0].latitude},${element[0].longitude}`
        this.gruaService.sendGrua(this.grua).subscribe((response) => {
          alert(`Revise su linea de celular para más detalles`);
        })
      }
    })
  }

  logIn() {
    this.authService.login();
    alert(`Bienvenido: ${this.user.name}`)
  }

  logOut() {
    alert(`Hasta Pronto: ${this.user.name}`)
    this.authService.logout();
    this.currentUser = ''
    localStorage.setItem("user_ID", '');
    localStorage.setItem("name", '');
  }

}
