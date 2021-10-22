import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Vehiculo } from 'src/app/core/models/vehiculo.model';
import { Geo } from 'src/app/core/models/geo.model';
import { VehiculoService } from 'src/app/core/services/vehiculo/vehiculo.service';
import { GeoService } from 'src/app/core/services/geo/geo.service';

@Component({
  selector: 'app-update-vehiculo',
  templateUrl: './update-vehiculo.component.html',
  styleUrls: ['./update-vehiculo.component.css']
})
export class UpdateVehiculoComponent implements OnInit {
  vehiculo: Vehiculo;
  vehiculoId: String;
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
      latitude: 0,
      longitude: 0,
      color: '',
      modelo: '',
    },
      // this.geo = {
      //   vehiculoId: '',
      //   latitude: 0,
      //   longitude: 0,
      // },
      this.vehiculoId = ''
  }

  ngOnInit(): void {
    this.getVehiculoID()
  }
  getVehiculoID() {
    this.route.params.subscribe((params: Params) => {
      this.vehiculoId = params.id;
      this.getVehiculo();

    });
  }
  getVehiculo() {
    this.vehiculoService.read().subscribe((vehiculo) => {
      let index = vehiculo.body.map((vehiculo: any) => vehiculo._id).indexOf(this.vehiculoId)
      if (index != -1) {
        let element = vehiculo.body.splice(index, 1);
        this.vehiculo = element[0];
      } else {
        alert("No se ha encontrado el vehiculo que busca en nuestro catalogo");
      }

    })
  }
  updateVehiculo() {
    this.vehiculoService.update(this.vehiculo).subscribe(() => {
      alert(`Vehiculo ${this.vehiculo.vehiculoId} actualizado con éxito`)
    })
    // this.geoService.update(this.vehiculo).subscribe(() => {})
  }
}
