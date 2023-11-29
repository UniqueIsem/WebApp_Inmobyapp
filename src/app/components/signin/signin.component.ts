import { Component } from '@angular/core';
import { usuario } from 'src/app/models/Tienda.model';
import { UsuarioService } from 'src/app/services/Usuario.service';
import { Observable } from 'rxjs'; // Importar Observable desde 'rxjs'
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent { //declaracion de las variables necesarias
  User: usuario = new usuario();
  submitted = false;
  passwordsMatch = true;
  userExists = false;
  userEmpty = false;

  constructor(private usuarioService: UsuarioService) { }

  signupForm = new FormGroup({ //valores del sign up form
    usuario: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmNewPassword: new FormControl('', Validators.required)
  })

  //agrega un usuario a la base de datos
  saveUsuario(): void {
    // Verificar si las contraseñas coinciden y si el usuario ya existe
    if (this.User.contrasena === this.User.confirmNewPassword) {
      this.passwordsMatch = true;
  
      const username = this.User.usuario; // Almacenar el nombre de usuario
  
      if (username) { //si la variable username no esta vacia
        this.userEmpty = false;
        this.usuarioService.getUserByUsername(username).subscribe((data: any[]) => {
          if (data && data.length > 0) { // El usuario ya existe
            this.userExists = true;
          } else { // El usuario no existe, asi que se crea
            this.userExists = false;
            this.User.su = false;
            this.usuarioService.create(this.User).then(() => {
              this.submitted = true;
            });
          }
        });
      } else { // Manejar el caso cuando el nombre de usuario es indefinido
        console.error('El nombre de usuario no puede ser indefinido');
        this.userEmpty = true;
      }
    } else { // Las contraseñas no coinciden
      console.error("La contraseña no coincide")
      this.passwordsMatch = false;
    }
  }

  //cambia las variables de confirmacion de los campos y crea un nuevo usuario
  newUsuario(): void {
    this.submitted = false;
    this.passwordsMatch = true;
    this.userExists = false;
    this.User = new usuario();
  }

  //manda a llamar la funcion saveUsuario al llamar el evento onSubmit del form
  onSubmit(event: Event): void {
    event.preventDefault();
    this.saveUsuario();
  }
}
