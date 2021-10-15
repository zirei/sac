import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    MapComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MapComponent,
    FormsModule,
  ],
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
