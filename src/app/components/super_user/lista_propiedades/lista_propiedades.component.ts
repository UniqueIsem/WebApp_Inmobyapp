import { Component } from '@angular/core';
import { TiendaService } from 'src/app/services/Tienda.service';
import { Tienda } from 'src/app/models/Tienda.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lista-propiedades',
  templateUrl: './lista_propiedades.component.html',
  styleUrls: ['./lista_propiedades.component.css']
})
export class ListaPropiedadesComponent { //declaracion de variables necesarias
  tiendas?: Tienda[];
  currentTienda?: Tienda;
  currentIndex = -1;
  title = '';

  constructor(private tiendaService: TiendaService) { }

   //se manda a llamar solo cuando se carga el componente
  ngOnInit(): void { 
    this.retrieveTutorials();
  }

  //recarga la lista al eliminar todas las propiedades para que aparezca vacia
  refreshList(): void {
    this.currentTienda = undefined;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }

  //muestra todas las propiedades en una lista
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

  //le da una posicion a la tienda cuando se agrega
  setActiveTutorial(tienda: Tienda, index: number): void {
    this.currentTienda = tienda;
    this.currentIndex = index;
  }

  //remueve todas las propiedades y actualiza la lista 
  removeAllTutorials(): void {
    this.tiendaService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
}