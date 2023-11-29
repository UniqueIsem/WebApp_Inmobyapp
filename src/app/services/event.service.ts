import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private loginChangedSubject = new Subject<boolean>();
  loginChanged$ = this.loginChangedSubject.asObservable();

  emitLoginChanged(login: boolean) {
    this.loginChangedSubject.next(login);
  }

  emitSuperChanged(superlogin: boolean) {
    this.loginChangedSubject.next(superlogin)
  }

}
