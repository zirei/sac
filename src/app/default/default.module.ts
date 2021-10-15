import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultWebComponent } from './components/default-web/default-web.component';
import { SharedModule } from '../shared/shared.module';
import { defaultRoutingModule } from './default-routing.module';



@NgModule({
  declarations: [
    DefaultWebComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    defaultRoutingModule,
  ]
})
export class DefaultModule { }
