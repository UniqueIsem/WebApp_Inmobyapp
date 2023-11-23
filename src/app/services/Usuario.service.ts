import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { usuario } from '../models/Tienda.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private dbPath = '/Usuarios';
  usuariosRef: AngularFireList<usuario>;
  afAuth: any;
  usuarioGlobal: string ="";
  login: boolean = false

  constructor(
    private db: AngularFireDatabase,
    private eventService: EventService
  ) {
    this.usuariosRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<usuario> {
    return this.usuariosRef;
  }

  create(tienda: usuario): any {
    return this.usuariosRef.push(tienda);
  }

  update(key: string, value: any): Promise<void> {
    return this.usuariosRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.usuariosRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.usuariosRef.remove();
  }
  getUserByUsername(username: string): Observable<any[]> {
    return this.db.list('/Usuarios', ref => ref.orderByChild('usuario').equalTo(username)).valueChanges();
  }

  getToken(): Observable<any> {
    return new Observable(observer => {
      this.afAuth.idToken.subscribe((token: any) => {
        observer.next(token);
        observer.complete();
      }, (error: any) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  setUsuarioGlobal(data: string): void {
    this.usuarioGlobal = data;
  }

  getUsurioGlobal(): string{
    return this.usuarioGlobal;
  }

  clearUsuarioGlobal(): string{
    return this.usuarioGlobal= " ";
  }

  loginConfirmation(login: boolean) {
    if (login === true){
      this.eventService.emitLoginChanged(login);
      return true;
    } else {
      console.log("LOGIN FALLO...");
      return false;
    }
  }

}
