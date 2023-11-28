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
  currentTienda: Tienda = {
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

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentTienda = { ...this.tienda };
  }

  updatePublished(status: boolean): void {
    if (this.currentTienda.key) {
      this.tiendaService.update(this.currentTienda.key, { published: status })
      .then(() => {
        this.currentTienda.published = status;
        this.message = 'La propiedad fue publicada con exito';
      })
      .catch(err => console.log(err));
    }
  }

  updateTutorial(): void {
    const data = {
      title: this.currentTienda.title,
      metros: this.currentTienda.metros
    };

    if (this.currentTienda.key) {
      this.tiendaService.update(this.currentTienda.key, data)
        .then(() => this.message = 'La propiedad fue actualizada con exito')
        .catch(err => console.log(err));
    }
  }

  deleteTutorial(): void {
    if (this.currentTienda.key) {
      this.tiendaService.delete(this.currentTienda.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'La propiedad fue eliminada con exito';
        })
        .catch(err => console.log(err));
    }
  }
}
