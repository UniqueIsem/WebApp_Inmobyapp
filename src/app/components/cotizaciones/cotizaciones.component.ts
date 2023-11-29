//cotizaciones.component.ts
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
  aireSalud = '';
  calidadAire = '';
  cotizacionExitosa = false;
  forms = true;
  info = false;

  constructor(private tiendaService: TiendaService) {}

  saveTienda(): void {
    this.tienda.precio = this.precioPropiedad; // Guardar el precio calculado en la propiedad
    this.tiendaService.create(this.tienda).then(() => {
      this.submitted = true;
      // Aquí puedes realizar cualquier otra acción después de guardar la propiedad, si es necesario
    });
  }

  newTienda(): void {
    this.submitted = false;
    this.tienda = new Tienda();
  }

  showInfo(): void {
    this.forms = false;
    this.info = true;
  }

  calcularPrecio(): void {
    this.cotizacionExitosa = true;
    const { domicilio, metros, pisos, cuartos, banios } = this.tienda;
    this.info = true;

    const precios: Precios = {
      guadalajara: 1000000,
      zapopan: 1200000,
      tlajomulco: 950000,
      tlaquepaque: 1100000,
      tonala: 900000,
      oblatos: 900000,
      tesistan: 1050000,
      metrosCuadrados: 1500,
      porPiso: 50000,
      porCuarto: 75000,
      porBaño: 40000
    };

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

      // Realizar la operación de guardar la propiedad después de calcular el precio
      this.saveTienda();
    } else {
      console.error('Algunas propiedades no tienen valores definidos.');
    }

    switch (domicilio) {
      case 'miravalle':
      case 'tlaquepaque':
        this.aireSalud = 'MALA';
        this.calidadAire = 'MALA';
        break;
      case 'guadalajara':
      case 'tonala':
        this.aireSalud = 'ACEPTABLE';
        this.calidadAire = 'ACEPTABLE';
        break;
      default:
        this.aireSalud = 'BUENA';
        this.calidadAire = 'BUENA';
    }
  }

  regresar() {
    this.submitted = false;
    this.forms = true;
    this.info = false;
  }
}
