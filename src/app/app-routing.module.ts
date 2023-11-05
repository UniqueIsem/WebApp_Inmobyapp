import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaDeProductosComponent } from './components/lista-de-productos/lista-de-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
const routes: Routes = [
  { path: '', redirectTo: 'tiendas', pathMatch: 'full' },
  { path: 'propiedades', component: ListaDeProductosComponent },
  { path: 'cotizaciones', component: CrearProductoComponent },
  { path: 'home', component: NosotrosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }