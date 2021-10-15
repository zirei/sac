import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilRoutingModule } from './perfil-routing.module';


@NgModule({
  declarations: [
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule { }
