import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private loginChangedSubject = new Subject<boolean>();
  loginChanged$ = this.loginChangedSubject.asObservable();

  //cambia el valor del flag que detecta si hay un susuario logeado
  emitLoginChanged(login: boolean) {
    this.loginChangedSubject.next(login);
  }

  emitSuperChanged(superlogin: boolean) {
    this.loginChangedSubject.next(superlogin)
  }

}
