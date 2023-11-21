import { Component } from '@angular/core';
import { usuario } from 'src/app/models/Tienda.model';
import { UsuarioService } from 'src/app/services/Usuario.service';
import { Observable } from 'rxjs'; // Importar Observable desde 'rxjs'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  User: usuario = new usuario();
  submitted = false;
  passwordsMatch = true;
  userExists = false;

  constructor(private usuarioService: UsuarioService) { }

  saveUsuario(): void {
    // Verificar si las contraseñas coinciden y si el usuario ya existe
    if (this.User.contrasena === this.User.confirmNewPassword) {
      this.passwordsMatch = true;
  
      const username = this.User.usuario; // Almacenar el nombre de usuario
  
      if (username) {
        this.usuarioService.getUserByUsername(username).subscribe((data: any[]) => {
          if (data && data.length > 0) {
            // El usuario ya existe
            this.userExists = true;
          } else {
            // El usuario no existe, crearlo
            this.userExists = false;
            this.User.su = false;
            this.usuarioService.create(this.User).then(() => {
              this.submitted = true;
            });
          }
        });
      } else {
        // Manejar el caso cuando el nombre de usuario es indefinido
        console.error('El nombre de usuario no puede ser indefinido');
      }
    } else {
      // Las contraseñas no coinciden
      this.passwordsMatch = false;
    }
  }

  newUsuario(): void {
    this.submitted = false;
    this.passwordsMatch = true;
    this.userExists = false;
    this.User = new usuario();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.saveUsuario();
  }
}
