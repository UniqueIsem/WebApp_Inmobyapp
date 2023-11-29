import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
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

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  loginUser(): void {
    this.errorMessage = ' ';
    const userString = localStorage.getItem('currentUser');

    if (userString === "root") {
      this.usuarioService.superLoginConfirmation(true)
    } else {

    if (userString) {
      const user = JSON.parse(userString);
      this.usuarioService.getUserByUsername(this.username).subscribe((data: any[]) => {
        if (data && data.length > 0 && data[0].contrasena === this.password) {
          // Inicio de sesión exitoso, redireccionar a una página de bienvenida o dashboard
          // También puedes almacenar la información del usuario en el servicio o en LocalStorage para mostrarla después
          localStorage.setItem('currentUser', JSON.stringify(data[0])); // Almacenar en LocalStorage
          this.usuarioService.setUsuarioGlobal(this.username);
          this.usuarioService.loginConfirmation(true);
          const naviationExtras: NavigationExtras = { state: { reload: true } };
          if (user.su) {
            this.router.navigate(['/super']); // Redirigir al componente de superusuario
          } else {
            this.router.navigate(['/home']); // Redirigir a la página de inicio normal
          }
        } else {
          // Nombre de usuario o contraseña incorrectos, mostrar mensaje de error o manejarlo como desees
          this.usuarioService.loginConfirmation(false);
          this.errorMessage = 'Usuario o contraseña inc orrectos';
        }
      });
    }
  }

  }
}
