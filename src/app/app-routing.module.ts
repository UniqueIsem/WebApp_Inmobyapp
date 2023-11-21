import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaPropiedadesComponent } from './components/super_user/lista_propiedades/lista_propiedades.component';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { PropiedadesComponent } from './components/propiedades/propiedades.component';
import { SignupSuperComponent } from './components/super_user/signup-super/signup-super.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'super', component: ListaPropiedadesComponent },
  { path: 'cotizaciones', component: CotizacionesComponent },
  { path: 'home', component: NosotrosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SigninComponent}, 
  { path: 'propiedades', component: PropiedadesComponent},
  { path: 'signup_super', component: SignupSuperComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }