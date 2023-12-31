import { Component } from '@angular/core';
import { usuario } from 'src/app/models/Tienda.model';
import { UsuarioService } from 'src/app/services/Usuario.service';
import { Observable } from 'rxjs'; // Importar Observable desde 'rxjs'
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-super',
  templateUrl: './signup-super.component.html',
  styleUrls: ['./signup-super.component.css']
})
export class SignupSuperComponent { //declaracion de las variables necesarias
  User: usuario = new usuario();
  submitted = false;
  passwordsMatch = true;
  userExists = false;
  userEmpty = false;

  constructor(private usuarioService: UsuarioService) { }

  signupFormSuper = new FormGroup({
    newSuperUser: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmNewPassword: new FormControl('', Validators.required)
  })

  //guardar el nombre de ususario y verificacion de campos en login form
  saveUsuario(): void {
    //Verifica si las contraseñas coinciden y si el usuario ya existe
    if (this.User.contrasena === this.User.confirmNewPassword) {
      this.passwordsMatch = true;
  
      const username = this.User.usuario; //Almacenar el nombre de usuario en el service Usuario
  
      if (username) { //si la variable username no es null
        this.userEmpty = false;
        this.usuarioService.getUserByUsername(username).subscribe((data: any[]) => {
          if (data && data.length > 0) {
            // El usuario ya existe
            this.userExists = true;
          } else {
            // El usuario no existe, crearlo
            this.userExists = false;
            this.User.su = true;
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
  
  //cambia el valor de las variables y crea un usuario en la bd 
  newUsuario(): void { //
    this.submitted = false;
    this.passwordsMatch = true;
    this.userExists = false;
    this.User = new usuario();
  }

  //se manda a llamar al hacer submit del login form
  onSubmit(event: Event): void {
    event.preventDefault();
    this.saveUsuario();
  }
}
