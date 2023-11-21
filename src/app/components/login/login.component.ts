import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/Usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  loginUser(): void {
    this.errorMessage = ' ';
    this.usuarioService.getUserByUsername(this.username).subscribe((data: any[]) => {
      if (data && data.length > 0 && data[0].contrasena === this.password) {
        // Inicio de sesión exitoso, redireccionar a una página de bienvenida o dashboard
        // También puedes almacenar la información del usuario en el servicio o en LocalStorage para mostrarla después
        localStorage.setItem('currentUser', JSON.stringify(data[0])); // Almacenar en LocalStorage
        this.router.navigate(['/home']); // Redireccionar a una página de bienvenida
      } else {
        // Nombre de usuario o contraseña incorrectos, mostrar mensaje de error o manejarlo como desees
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }

}
