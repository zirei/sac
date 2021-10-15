import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Vehiculo } from 'src/app/core/models/vehiculo.model';
import { VehiculoService } from 'src/app/core/services/vehiculo/vehiculo.service';

@Component({
  selector: 'app-details-vehiculo',
  templateUrl: './details-vehiculo.component.html',
  styleUrls: ['./details-vehiculo.component.css']
})
export class DetailsVehiculoComponent implements OnInit {

  vehiculo: Vehiculo;
  vehiculoId: String;

  constructor(
    private route: ActivatedRoute,
    private vehiculoService: VehiculoService
  ) {
    this.vehiculo = {
      vehiculoId: '',
      color: '',
      modelo: '',
      latitude: 0,
      longitude: 0,
    }
    this.vehiculoId = ''
  }


  ngOnInit(): void {
    this.getVehiculoID()
  }

  getVehiculoID() {
    this.route.params.subscribe((params: Params) => {
      this.vehiculoId = params.id;
      console.log("here", params)
      this.getVehiculo();

    });
  }
  getVehiculo() {
    this.vehiculoService.readById(this.vehiculoId).subscribe((vehiculo) => {
      this.vehiculo = vehiculo.body[0];
      console.log("here2", vehiculo)
    })
  }
}
