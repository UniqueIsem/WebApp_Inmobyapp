import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Tienda } from '../models/Tienda.model';

@Injectable({
  providedIn: 'root'
})
export class TiendaService { //declaramos las variables necesarias
  private dbPath = '/Tiendas';

  tiendasRef: AngularFireList<Tienda>;

  constructor(private db: AngularFireDatabase) {
    this.tiendasRef = db.list(this.dbPath);
  }

  //retorna una lista de todas las propiedades
  getAll(): AngularFireList<Tienda> {
    return this.tiendasRef;
  }

  //crea una propiedad
  create(tienda: Tienda): any {
    return this.tiendasRef.push(tienda);
  }

  //modifica el valor de la propiedad asignada
  update(key: string, value: any): Promise<void> {
    return this.tiendasRef.update(key, value);
  }

  //elimina una propiedad seleccionada de la bd
  delete(key: string): Promise<void> {
    return this.tiendasRef.remove(key);
  }

  //elimina todas las propiedades de la bd
  deleteAll(): Promise<void> {
    return this.tiendasRef.remove();
  }
}