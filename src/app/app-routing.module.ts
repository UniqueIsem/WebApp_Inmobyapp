import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaPropiedadesComponent } from './components/super_user/lista_propiedades/lista_propiedades.component';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'propiedades', component: ListaPropiedadesComponent },
  { path: 'cotizaciones', component: CotizacionesComponent },
  { path: 'home', component: NosotrosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }