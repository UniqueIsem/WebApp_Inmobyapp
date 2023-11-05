import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Tienda } from 'src/app/models/Tienda.model';
import { TiendaService } from 'src/app/services/Tienda.service';

@Component({
  selector: 'app-datalles-de-producto',
  templateUrl: './datalles-de-producto.component.html',
  styleUrls: ['./datalles-de-producto.component.css']
})
export class DatallesDeProductoComponent implements OnInit {
  @Input() tienda?: Tienda;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTienda: Tienda = {
    title: '',
    description: '',
    domicilio: '',
    pisos: '',
    cuartos: '',
    banios: '',

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
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  updateTutorial(): void {
    const data = {
      title: this.currentTienda.title,
      description: this.currentTienda.description
    };

    if (this.currentTienda.key) {
      this.tiendaService.update(this.currentTienda.key, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteTutorial(): void {
    if (this.currentTienda.key) {
      this.tiendaService.delete(this.currentTienda.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}
