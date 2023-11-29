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
export class UsuarioService { //declaracion de variables necesarias
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

  //obtenemos una lista de todos los usuarios registrados
  getAll(): AngularFireList<usuario> { 
    return this.usuariosRef;
  }

  //crea un usuario y lo manda a la bd
  create(tienda: usuario): any {
    return this.usuariosRef.push(tienda);
  }

  //modifica el valor del ususario especificado
  update(key: string, value: any): Promise<void> {
    return this.usuariosRef.update(key, value);
  }

  //elimina un usuario asignado
  delete(key: string): Promise<void> {
    return this.usuariosRef.remove(key);
  }


  //elimina a todos los usuarios
  deleteAll(): Promise<void> {
    return this.usuariosRef.remove();
  }

  //retorna el usuario buscandolo con el nombre de usuario
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
