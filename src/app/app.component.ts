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
  loginsup: boolean = false;

  constructor(private userService: UsuarioService, private eventService: EventService) { }

  //funcion que se llama sola al iniciar el componente, modifica el nav bar si el login está activo
  ngOnInit() { 
    this.eventService.loginChanged$.subscribe((login) => {
      this.login = login;
      this.verificarLogin();
    });
  }

  //si detecta un login exitoso, cambia los btns de login y signup por el logout
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

  //se llama en btnLogout y confirma el logout del usuario
  logout(): void {
    const resultado = confirm('¿Estás seguro de que quieres salir de la sesion?');
    if (resultado) {
      this.login = false;
      this.userService.clearUsuarioGlobal();
      this.verificarLogin();
    } 
  }

  loginsuper(): void {
    this.loginsup = true;
  }

}
