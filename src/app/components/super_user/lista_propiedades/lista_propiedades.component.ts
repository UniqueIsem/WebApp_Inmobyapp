import { Component } from '@angular/core';
import { TiendaService } from 'src/app/services/Tienda.service';
import { Tienda } from 'src/app/models/Tienda.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lista-propiedades',
  templateUrl: './lista_propiedades.component.html',
  styleUrls: ['./lista_propiedades.component.css']
})
export class ListaPropiedadesComponent {
  tiendas?: Tienda[];
  currentTienda?: Tienda;
  currentIndex = -1;
  title = '';

  constructor(private tiendaService: TiendaService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  refreshList(): void {
    this.currentTienda = undefined;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tiendaService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tiendas = data;
    });
  }

  setActiveTutorial(tienda: Tienda, index: number): void {
    this.currentTienda = tienda;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tiendaService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
}