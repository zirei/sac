import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ListVehiculosComponent } from './components/list-vehiculos/list-vehiculos.component';
import { DetailsVehiculoComponent } from './components/details-vehiculo/details-vehiculo.component';
import { UpdateVehiculoComponent } from './components/update-vehiculo/update-vehiculo.component';
import { NewVehiculoComponent } from './components/new-vehiculo/new-vehiculo.component';
import { VehiculoRoutingModule } from './vehiculo-routing.module';



@NgModule({
  declarations: [
    NewVehiculoComponent,
    UpdateVehiculoComponent,
    DetailsVehiculoComponent,
    ListVehiculosComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    VehiculoRoutingModule
  ]
})
export class vehiculoModule { }
