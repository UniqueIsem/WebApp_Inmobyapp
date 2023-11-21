import { Component } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/Usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private usuarioService: UsuarioService) {}

  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

}
