import { Component } from '@angular/core';
import { Tienda } from 'src/app/models/Tienda.model';
import { TiendaService } from 'src/app/services/Tienda.service';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  tienda: Tienda = new Tienda();
  submitted = false;

  constructor(private tiendaService: TiendaService) { }

  saveTienda(): void {
    this.tiendaService.create(this.tienda).then(() => {

      this.submitted = true;
    });
  }

  newTienda(): void {
    this.submitted = false;
    this.tienda = new Tienda();
  }
}