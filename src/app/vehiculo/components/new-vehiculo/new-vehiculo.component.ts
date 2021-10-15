import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Vehiculo } from 'src/app/core/models/vehiculo.model';
import { Geo } from 'src/app/core/models/geo.model';
import { VehiculoService } from 'src/app/core/services/vehiculo/vehiculo.service';
import { GeoService } from 'src/app/core/services/geo/geo.service';

@Component({
  selector: 'app-new-vehiculo',
  templateUrl: './new-vehiculo.component.html',
  styleUrls: ['./new-vehiculo.component.css']
})
export class NewVehiculoComponent implements OnInit {

  vehiculo: Vehiculo;
  // geo: Geo;

  colors: any[] = [
    {
      text: 'Azul'
    },
    {
      text: 'Blanco'
    },
    {
      text: 'Negro'
    },
    {
      text: 'Plateado'
    },
    {
      text: 'Rojo'
    },
    {
      text: 'Rosa'
    },
  ]
  models: any[] = [
    {
      text: 'Tesla'
    },
    {
      text: 'Ferrari'
    },
    {
      text: 'Audi'
    },
    {
      text: 'Mazda'
    },
    {
      text: 'Toyota'
    },
    {
      text: 'Chinito'
    },
  ]
  constructor(
    private route: ActivatedRoute,
    private vehiculoService: VehiculoService,
    // private geoService: GeoService
  ) {
    this.vehiculo = {
      vehiculoId: '',
      color: '',
      modelo: '',
      latitude: 0,
      longitude: 0,
    }
    // this.geo = {
    //   vehiculoId: '',
    //   latitude: 0,
    //   longitude: 0,
    // }
  }

  ngOnInit(): void {
  }
  createVehiculo() {
    this.vehiculoService.create(this.vehiculo).subscribe((response) => {
      alert(`El Vehiculo: ${response.body.vehiculoId} con el id: ${response.body._id} fue creado con éxito`)
    })
    // this.geoService.create(this.vehiculo).subscribe((response) => {})
  }
  

}
