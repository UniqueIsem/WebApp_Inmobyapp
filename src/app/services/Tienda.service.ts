import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Tienda } from '../models/Tienda.model';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private dbPath = '/Tiendas';

  tiendasRef: AngularFireList<Tienda>;

  constructor(private db: AngularFireDatabase) {
    this.tiendasRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Tienda> {
    return this.tiendasRef;
  }

  create(tienda: Tienda): any {
    return this.tiendasRef.push(tienda);
  }

  update(key: string, value: any): Promise<void> {
    return this.tiendasRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.tiendasRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.tiendasRef.remove();
  }
}