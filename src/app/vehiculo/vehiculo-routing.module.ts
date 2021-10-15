import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListVehiculosComponent } from './components/list-vehiculos/list-vehiculos.component';
import { DetailsVehiculoComponent } from './components/details-vehiculo/details-vehiculo.component';
import { UpdateVehiculoComponent } from './components/update-vehiculo/update-vehiculo.component';
import { NewVehiculoComponent } from './components/new-vehiculo/new-vehiculo.component';

const routes: Routes = [
  {
    path: '',
    component: ListVehiculosComponent
  },
  {
    path: 'new',
    component: NewVehiculoComponent
  },
  {
    path: ':id/update',
    component: UpdateVehiculoComponent
  },
  {
    path: ':id/details',
    component: DetailsVehiculoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VehiculoRoutingModule { }