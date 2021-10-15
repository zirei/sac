import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { vehiculoModule } from './vehiculo/vehiculo.module';
import { MarkerService } from './core/services/marker/marker.service';
import { HomeModule } from './home/home.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { CoreModule } from './core/core.module';
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { DefaultModule } from './default/default.module';
import { PerfilModule } from './perfil/perfil.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    vehiculoModule,
    HttpClientModule,
    CoreModule,
    DefaultModule,
    PerfilModule
  ],
  providers: [
    MarkerService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
