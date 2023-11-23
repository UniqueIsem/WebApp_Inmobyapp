import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { ListaPropiedadesComponent } from './components/super_user/lista_propiedades/lista_propiedades.component';
import { InfoPropiedadesComponent } from './components/super_user/info_propiedades/info_propiedades.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';
import { PropiedadesComponent } from './components/propiedades/propiedades.component';
import { SignupSuperComponent } from './components/super_user/signup-super/signup-super.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from './services/Usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    InfoPropiedadesComponent, 
    ListaPropiedadesComponent,
    CotizacionesComponent,
    NosotrosComponent,
    LoginComponent,
    SigninComponent,
    CarruselComponent,
    PropiedadesComponent,
    SigninComponent,
    SignupSuperComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase())
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
