import { Component, OnInit } from '@angular/core';
import { EventService } from './services/event.service';
import { UsuarioService } from './services/Usuario.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BdTienda';
  usuarioGlobal: string = '';
  login: boolean = false;
  mostrarBtns: boolean = true;

  constructor(private userService: UsuarioService, private eventService: EventService) { }

  ngOnInit() {
    this.eventService.loginChanged$.subscribe((login) => {
      this.login = login;
      this.verificarLogin();
    });
  }

  verificarLogin(): void {
    if (this.login) {
      this.usuarioGlobal = this.userService.getUsurioGlobal();
      this.login = true;
      this.mostrarBtns = false;
    } else {
      console.log("fallo en app")
      this.mostrarBtns = true;
    }
  }

  logout(): void {
    const resultado = confirm('¿Estás seguro de que quieres salir de la sesion?');
    if (resultado) {
      this.userService.clearUsuarioGlobal();
      this.verificarLogin();
      this.login = false;
    } 
  }

}
