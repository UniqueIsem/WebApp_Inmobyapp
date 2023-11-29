import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Tienda } from 'src/app/models/Tienda.model';
import { TiendaService } from 'src/app/services/Tienda.service';

@Component({
  selector: 'app-info-propiedades',
  templateUrl: './info_propiedades.component.html',
  styleUrls: ['./info_propiedades.component.css']
})
export class InfoPropiedadesComponent implements OnInit { 
  @Input() tienda?: Tienda;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTienda: Tienda = { //declaracion de las variables necesarias
    title: '',
    metros: 0,
    domicilio: '',
    pisos: 0,
    cuartos: 0,
    banios: 0,
    published: false
  };

  message = '';

  constructor(private tiendaService: TiendaService) { }

  //se manda a llamar sola al cargar el componente, seteando el mensje como vacio
  ngOnInit(): void {
    this.message = '';
  }

  //pone los campos vacios y agrega la informacion de la propiedad seleccionada en la lista
  ngOnChanges(): void {
    this.message = '';
    this.currentTienda = { ...this.tienda };
  }

  //mandaria la informacion de la lista y agregaria la propiedad en componente propiedades (still on progress)
  updatePublished(status: boolean): void {
    if (this.currentTienda.key) { //detecta la propiedad seleccionada
      this.tiendaService.update(this.currentTienda.key, { published: status })
      .then(() => {
        this.currentTienda.published = status;
        this.message = 'La propiedad fue publicada con exito';
      })
      .catch(err => console.log(err));
    }
  }

  //modifica los valores de la propiedad en la bd que el usuario cambió
  updateTutorial(): void {
    const data = {
      title: this.currentTienda.title,
      metros: this.currentTienda.metros
    };

    if (this.currentTienda.key) { //detecta la propiedad seleccionada
      this.tiendaService.update(this.currentTienda.key, data)
        .then(() => this.message = 'La propiedad fue actualizada con exito')
        .catch(err => console.log(err));
    }
  }

  //elimina la propiedad seleccionada por el usuario de la bd
  deleteTutorial(): void {
    if (this.currentTienda.key) { //detecta la propiedad seleccionada
      this.tiendaService.delete(this.currentTienda.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'La propiedad fue eliminada con exito';
        })
        .catch(err => console.log(err));
    }
  }
}
