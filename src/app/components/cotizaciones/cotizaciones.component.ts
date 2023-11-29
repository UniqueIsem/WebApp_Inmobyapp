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
export class CotizacionesComponent { //declaraciond de variables necesarias
  tienda: Tienda = new Tienda();
  submitted = false;
  precioPropiedad = 0;
  aireSalud = "";
  calidadAire = "";
  cotizacionExitosa = false;
  forms = true;
  info = false;

  constructor(private tiendaService: TiendaService) { }

  //crea una tienda en la bd y cambia la variable para que aparezca el html con *ngIf="!subbmited"
  saveTienda(): void {
    this.tiendaService.create(this.tienda).then(() => {
      this.submitted = true;
    });
  }

  //crea una nueva instancia de la propiedad
  newTienda(): void {
    this.submitted = false;
    this.tienda = new Tienda();
  }

  //cambia las variables para que desaparezcan los input fields y muestre la informacion 
  showInfo(): void {
    this.forms = false;
    this.info = true;
  }

  //cotiza el precio de la propiedad segun la informacion ingresada
  calcularPrecio(): void {
    this.cotizacionExitosa = true;
    const { domicilio, metros, pisos, cuartos, banios } = this.tienda;
    this.info = true;

    const precios: Precios = { //declaracion base de precios por municipio
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

      // No se llama a saveTienda() aquí para evitar cambiar submitted a true
    } else {
      console.error('Algunas propiedades no tienen valores definidos.');
    }

    switch (domicilio) { 
      case "miravalle" || "zapopan" || "tlaquepaque":
        this.aireSalud = "MALA"
        this.calidadAire = "MALA";
        break;
      case "guadalajara" || "tonala ":
        this.aireSalud = "ACEPTABLE";
        this.calidadAire = "ACEPTABLE"
        break;
      default:
        this.aireSalud = "BUENA";
        this.calidadAire = "BUENA";
    }

  }

  regresar() { //deja de mostrar la informacion y regresa a los input fields
    this.submitted = false;
    this.forms = true;
    this.info = false;    
  }
}
