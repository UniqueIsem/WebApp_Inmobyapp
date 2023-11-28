import { Component } from '@angular/core';
import { Tienda } from 'src/app/models/Tienda.model';
import { TiendaService } from 'src/app/services/Tienda.service';

interface Precios {
  [key: string]: number;
}

@Component({
  selector: 'app-crear-producto',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent {
  tienda: Tienda = new Tienda();
  submitted = false;
  precioPropiedad = 0;
  aireSalud = "";
  calidadAire = "";
  cotizacionExitosa = false;

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

  calcularPrecio(): void {
    const { domicilio, metros, pisos, cuartos, banios } = this.tienda;
  
    const precios: Precios = {
      guadalajara: 1000000,
      zapopan: 1200000,
      tlajomulco: 950000,
      tlaquepaque: 1100000,
      tonala: 900000,
      tesistan: 1050000,
      metrosCuadrados: 1500,
      porPiso: 50000,
      porCuarto: 75000,
      porBaño: 40000
    };
  
    // Comprueba si las propiedades tienen valores antes de usarlas
    if (domicilio && metros && pisos && cuartos && banios) {
      const precioDomicilio = precios[domicilio.toLowerCase()] || 0;
      const precioMetros = parseInt(metros.toString(), 10) || 0;
      const precioPisos = parseInt(pisos.toString(), 10) || 0;
      const precioCuartos = parseInt(cuartos.toString(), 10) || 0;
      const precioBanios = parseInt(banios.toString(), 10) || 0;
  
      this.precioPropiedad =
        precioDomicilio +
        precioMetros * precios['metrosCuadrados'] +
        precioPisos * precios['porPiso'] +
        precioCuartos * precios['porCuarto'] +
        precioBanios * precios['porBaño'];

        this.cotizacionExitosa = true;

      // No se llama a saveTienda() aquí para evitar cambiar submitted a true
    } else {
      console.error('Algunas propiedades no tienen valores definidos.');
    }

    switch(domicilio) {
      case "miravalle": this.aireSalud = "MEDIA"
      break;
      case "guadalajara": this.aireSalud = "MEDIA"
      break;
    }

  }
}
