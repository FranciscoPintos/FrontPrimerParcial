import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import Swal from 'sweetalert2';

import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  hide = false;
  user!: Usuario | undefined;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }


  ngOnInit(): void {
    this.myForm = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get userName() {
    return this.myForm.get('userName') as FormControl;
  }

  get password() {
    return this.myForm.get('password') as FormControl;
  }

  getErrorMessagePassword() {

    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('email') ? 'Not a valid email' : '';

  }
  getErrorMessageUserName() {
    if (this.userName.hasError('required')) {
      return 'You must enter a value';
    }

    return this.userName.hasError('email') ? 'Not a valid email' : '';

  }

  login() {
    //Verificamos si es valido el formulario
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();

      Swal.fire({
        title: 'Advertencia',
        text: 'Debe completar todos los campos',
        icon: 'warning',
      });

      return;
    }

    //Obtenemos los datos del formulario
    const { userName } = this.myForm.value;

    //Obtenemos el usuario del sistema
    this.usuarioService.esUsuarioDelSistema(userName)
      .subscribe(
        (esUsuarioDelSistema: boolean) => {
          if (esUsuarioDelSistema) {
            this.localStorageService.setItem('usuario', userName);
            this.router.navigate(['/ficha_clinica']);
          } else {
            Swal.fire({
              title: 'Error',
              text: 'El usuario no existe en el sistema',
              icon: 'error',
            });
          }
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Error Comunicandose con el Servidor',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      );
  }

}
